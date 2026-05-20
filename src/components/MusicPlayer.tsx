import { useState, useRef, useEffect } from 'react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume] = useState(0.25);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fadeIn = (audio: HTMLAudioElement) => {
    audio.volume = 0;
    let vol = 0;
    fadeRef.current = setInterval(() => {
      vol = Math.min(vol + 0.01, volume);
      audio.volume = vol;
      if (vol >= volume) {
        if (fadeRef.current) clearInterval(fadeRef.current);
      }
    }, 100);
  };

  const fadeOut = (audio: HTMLAudioElement, callback?: () => void) => {
    let vol = audio.volume;
    fadeRef.current = setInterval(() => {
      vol = Math.max(vol - 0.02, 0);
      audio.volume = vol;
      if (vol <= 0) {
        if (fadeRef.current) clearInterval(fadeRef.current);
        audio.pause();
        if (callback) callback();
      }
    }, 80);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Try autoplay after a small delay
    const timer = setTimeout(() => {
      audio.volume = 0;
      const promise = audio.play();
      if (promise !== undefined) {
        promise.then(() => {
          setIsPlaying(true);
          fadeIn(audio);
        }).catch(() => {
          // Autoplay blocked, user must click
        });
      }
    }, 1500);

    return () => {
      clearTimeout(timer);
      if (fadeRef.current) clearInterval(fadeRef.current);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeRef.current) clearInterval(fadeRef.current);

    if (isPlaying) {
      fadeOut(audio, () => setIsPlaying(false));
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        fadeIn(audio);
      }).catch(() => {});
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/romantic.mp3"
        loop
        preload="auto"
      />
      <button
        onClick={toggle}
        className={`music-btn ${isPlaying ? 'playing' : ''}`}
        title={isPlaying ? 'Pause Music' : 'Play Music'}
        aria-label={isPlaying ? 'Pause romantic music' : 'Play romantic music'}
        style={{ zIndex: 1000 }}
      >
        {isPlaying ? (
          // Pause icon with music notes vibe
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect x="6" y="4" width="4" height="16" rx="1" fill="#0a1628" />
            <rect x="14" y="4" width="4" height="16" rx="1" fill="#0a1628" />
          </svg>
        ) : (
          // Music note icon
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18V5l12-2v13"
              stroke="#0a1628"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="6" cy="18" r="3" fill="#0a1628" />
            <circle cx="18" cy="16" r="3" fill="#0a1628" />
          </svg>
        )}
      </button>

      {/* Volume indicator label */}
      <div
        style={{
          position: 'fixed',
          bottom: '96px',
          right: '30px',
          zIndex: 999,
          color: 'rgba(212,175,55,0.7)',
          fontSize: '0.65rem',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          fontFamily: "'Lato', sans-serif",
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        {isPlaying ? '♪ Playing' : 'Music'}
      </div>
    </>
  );
};

export default MusicPlayer;
