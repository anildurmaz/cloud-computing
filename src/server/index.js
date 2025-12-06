import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import { readWishes, saveWish } from './storage.js';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 4000;
const rateLimitWindow = 60 * 1000; // 1 minute
const rateLimitCount = 3;
const recentSubmissions = new Map();

app.use(cors());
app.use(express.json());

const sanitize = (value = '') => value.toString().trim().replace(/</g, '&lt;').slice(0, 500);

function isSpam(ip, message) {
  const now = Date.now();
  const record = recentSubmissions.get(ip) || { timestamps: [], lastMessage: '' };
  record.timestamps = record.timestamps.filter((t) => now - t < rateLimitWindow);
  if (record.timestamps.length >= rateLimitCount) {
    return true;
  }
  if (record.lastMessage && record.lastMessage === message) {
    return true;
  }
  record.timestamps.push(now);
  record.lastMessage = message;
  recentSubmissions.set(ip, record);
  return false;
}

app.get('/api/wishes', (_req, res) => {
  res.json(readWishes());
});

app.post('/api/wishes', (req, res) => {
  const name = sanitize(req.body?.name);
  const message = sanitize(req.body?.message);
  if (!name || !message || message.length < 5) {
    return res.status(400).json({ error: 'Please provide a thoughtful message (at least 5 characters) and your name.' });
  }

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'anonymous';
  if (isSpam(ip, message)) {
    return res.status(429).json({ error: 'Please wait a moment before sending another wish.' });
  }

  const wish = {
    id: nanoid(),
    name,
    message,
    createdAt: new Date().toISOString()
  };
  saveWish(wish);
  res.status(201).json(wish);
});

const distPath = path.resolve(process.cwd(), 'dist');
app.use(express.static(distPath));
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Wishes API listening on http://localhost:${PORT}`);
});
