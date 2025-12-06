import React, { useEffect, useState } from 'react';
import Countdown from './components/Countdown.jsx';
import WishWall from './components/WishWall.jsx';
import GiftModal from './components/GiftModal.jsx';
import AudioToggle from './components/AudioToggle.jsx';

const weddingDate = '2025-06-14T15:00:00';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const listener = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', listener);
    return () => window.removeEventListener('scroll', listener);
  }, []);

  return (
    <div className="page">
      <div className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-brand">A ✧ C</div>
        <div className="nav-actions">
          <button className="ghost" onClick={() => document.getElementById('story').scrollIntoView({ behavior: 'smooth' })}>
            Our Story
          </button>
          <button className="ghost" onClick={() => document.getElementById('details').scrollIntoView({ behavior: 'smooth' })}>
            Details
          </button>
          <button className="ghost" onClick={() => document.getElementById('wishes').scrollIntoView({ behavior: 'smooth' })}>
            Wishes
          </button>
          <button className="primary" onClick={() => setModalOpen(true)}>
            Send a Wedding Gift
          </button>
        </div>
      </div>

      <section className="hero">
        <div className="ornament ornament-top" aria-hidden>
          <span className="flourish">❦</span>
        </div>
        <div className="hero-content">
          <p className="eyebrow">With joyful hearts</p>
          <h1>Adrian &amp; Celeste</h1>
          <p className="date">June 14, 2025 · Villa Aurelia · Lake Como</p>
          <Countdown targetDate={weddingDate} />
          <AudioToggle />
        </div>
        <div className="ornament ornament-bottom" aria-hidden>
          <span className="flourish">❧</span>
        </div>
        <div className="parallax" aria-hidden></div>
      </section>

      <section id="story" className="section story">
        <div className="section-header">
          <p className="eyebrow">Two souls, one path</p>
          <h2>Our Story</h2>
          <p className="lede">
            From a serendipitous meeting in a Parisian bookshop to sunsets along the Amalfi coast, Adrian and Celeste have
            collected memories like heirloom pearls. We cannot wait to celebrate this new chapter with you.
          </p>
        </div>
        <div className="story-grid">
          <div className="story-card">
            <h3>First Look</h3>
            <p>A whispered hello between aisles of poetry. A shared smile that lingered longer than the summer rain.</p>
          </div>
          <div className="story-card">
            <h3>Adventures</h3>
            <p>They chased auroras in Iceland, danced under lanterns in Kyoto, and found quiet mornings brewing coffee together.</p>
          </div>
          <div className="story-card">
            <h3>Promise</h3>
            <p>On a balcony overlooking Lake Como, Adrian asked; Celeste said yes. Champagne, tears, and laughter followed.</p>
          </div>
        </div>
      </section>

      <section id="details" className="section details">
        <div className="section-header">
          <p className="eyebrow">The Celebration</p>
          <h2>Wedding Weekend</h2>
          <p className="lede">An intimate gathering wrapped in soft gold and rose. Your presence is the greatest gift.</p>
        </div>
        <div className="details-grid">
          <div className="detail-card">
            <p className="label">Ceremony</p>
            <h3>Villa Aurelia Gardens</h3>
            <p>Saturday, June 14 · 3:00 PM</p>
            <p>Under olive trees with sweeping lake views. Shuttle service from the Grand Hotel at 2:15 PM.</p>
          </div>
          <div className="detail-card">
            <p className="label">Reception</p>
            <h3>Lakeview Ballroom</h3>
            <p>Dinner, toasts, and a midnight gelato cart. Attire: Black-tie optional, in a palette of champagne and blush.</p>
          </div>
          <div className="detail-card">
            <p className="label">Sunday Brunch</p>
            <h3>Rosé Terrace</h3>
            <p>June 15 · 11:00 AM</p>
            <p>Farewell brunch with fresh pastries, jazz trio, and an optional boat ride to Bellagio.</p>
          </div>
        </div>
      </section>

      <section id="wishes" className="section wishes">
        <div className="section-header">
          <p className="eyebrow">Words from the heart</p>
          <h2>Wishes Wall</h2>
          <p className="lede">Leave a note for the couple. Your message appears instantly, wrapped in silk-inspired cards.</p>
        </div>
        <WishWall />
      </section>

      <div className="cta-bar">
        <div>
          <p className="eyebrow">Gifts</p>
          <h3>Send a Wedding Gift</h3>
          <p className="lede">We are grateful for your generosity and presence.</p>
        </div>
        <button className="primary" onClick={() => setModalOpen(true)}>
          Open Details
        </button>
      </div>

      <GiftModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <footer className="footer">
        <p>Adrian &amp; Celeste · June 14, 2025 · With love and gratitude</p>
      </footer>
    </div>
  );
}
