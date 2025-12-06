import React, { useEffect, useState } from 'react';

function formatRemaining(targetDate) {
  const diff = new Date(targetDate).getTime() - Date.now();
  const clamp = Math.max(diff, 0);
  const days = Math.floor(clamp / (1000 * 60 * 60 * 24));
  const hours = Math.floor((clamp / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((clamp / (1000 * 60)) % 60);
  const seconds = Math.floor((clamp / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function Countdown({ targetDate }) {
  const [remaining, setRemaining] = useState(() => formatRemaining(targetDate));

  useEffect(() => {
    const timer = setInterval(() => setRemaining(formatRemaining(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countdown">
      {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
        <div key={unit} className="countdown-segment">
          <span className="count-number">{String(remaining[unit]).padStart(2, '0')}</span>
          <span className="count-label">{unit}</span>
        </div>
      ))}
    </div>
  );
}
