import React, { useEffect, useRef, useState } from 'react';

const trackUrl = 'https://cdn.pixabay.com/download/audio/2023/02/02/audio_bf2325b2df.mp3?filename=romantic-piano-140150.mp3';

export default function AudioToggle() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = new Audio(trackUrl);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;
    audio.addEventListener('canplaythrough', () => setReady(true), { once: true });
    const play = async () => {
      try {
        await audio.play();
      } catch (err) {
        console.info('Autoplay awaits user gesture.');
      }
    };
    play();
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggle = async () => {
    if (!audioRef.current) return;
    if (muted) {
      await audioRef.current.play();
      audioRef.current.muted = false;
      setMuted(false);
    } else {
      audioRef.current.muted = true;
      audioRef.current.pause();
      setMuted(true);
    }
  };

  return (
    <button className="ghost" onClick={toggle} disabled={!ready}>
      {muted ? 'Play melody' : 'Mute melody'}
    </button>
  );
}
