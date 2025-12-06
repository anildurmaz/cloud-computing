import React, { useEffect, useMemo, useState } from 'react';

const formatDate = (iso) => new Date(iso).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

export default function WishWall() {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const vibeAdjectives = useMemo(() => ['glowing', 'gentle', 'radiant', 'joyful', 'warm'], []);

  const fetchWishes = async () => {
    try {
      const res = await fetch('/api/wishes');
      const data = await res.json();
      setWishes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError('We could not load wishes right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Unable to send your wish.');
      }
      setWishes((prev) => [data, ...prev]);
      setForm({ name: '', message: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="wish-wall">
      <form className="wish-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Your Name</label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            required
            placeholder="Amelia Laurent"
          />
        </div>
        <div className="form-row">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={form.message}
            onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
            required
            minLength={5}
            placeholder="Your heartfelt wish..."
          />
        </div>
        {error && <p className="form-error">{error}</p>}
        <button className="primary" type="submit" disabled={submitting}>
          {submitting ? 'Sending...' : 'Share a Wish'}
        </button>
      </form>

      <div className="wish-list" role="list" aria-busy={loading}>
        {loading ? (
          <p className="muted">Gently gathering wishes...</p>
        ) : wishes.length === 0 ? (
          <p className="muted">Be the very first to leave a note for the couple.</p>
        ) : (
          wishes.map((wish, index) => (
            <article key={wish.id} className="wish-card" role="listitem" style={{ animationDelay: `${index * 60}ms` }}>
              <div className="wish-meta">
                <span className="pill">{vibeAdjectives[index % vibeAdjectives.length]}</span>
                <span className="pill pill-soft">{formatDate(wish.createdAt)}</span>
              </div>
              <p className="wish-message">{wish.message}</p>
              <p className="wish-name">— {wish.name}</p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
