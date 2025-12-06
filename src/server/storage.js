import fs from 'fs';
import path from 'path';

const dataPath = path.resolve(process.cwd(), 'src/server/data/wishes.json');

function ensureFile() {
  if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(path.dirname(dataPath), { recursive: true });
    fs.writeFileSync(dataPath, JSON.stringify([]));
  }
}

export function readWishes() {
  ensureFile();
  const raw = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw);
}

export function saveWish(entry) {
  const current = readWishes();
  current.unshift(entry);
  fs.writeFileSync(dataPath, JSON.stringify(current, null, 2));
  return entry;
}
