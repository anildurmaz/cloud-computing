import React, { useState } from 'react';

export default function GiftModal({ open, onClose }) {
  const [copied, setCopied] = useState(false);
  const details = `Bank: Aurora Private Bank\nAccount Name: Adrian & Celeste Wedding\nIBAN: IT60 X054 2811 1010 0000 0123 456\nSWIFT: BPPIITRRXXX`;

  if (!open) return null;

  const copyDetails = async () => {
    try {
      await navigator.clipboard.writeText(details);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch (err) {
      setCopied(false);
      console.error('Copy failed', err);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <p className="eyebrow">With gratitude</p>
        <h3>Send a Wedding Gift</h3>
        <p className="lede">Your kindness means the world. Thank you for celebrating with us.</p>

        <div className="gift-details">
          <p>Bank: <strong>Aurora Private Bank</strong></p>
          <p>Account Name: <strong>Adrian &amp; Celeste Wedding</strong></p>
          <p>IBAN: <strong>IT60 X054 2811 1010 0000 0123 456</strong></p>
          <p>SWIFT: <strong>BPPIITRRXXX</strong></p>
        </div>

        <div className="modal-actions">
          <button className="ghost" onClick={onClose}>Close</button>
          <button className="primary" onClick={copyDetails}>{copied ? 'Copied — thank you!' : 'Copy Details'}</button>
        </div>
      </div>
    </div>
  );
}
