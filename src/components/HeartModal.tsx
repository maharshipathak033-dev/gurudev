import { useState, useEffect, useRef } from 'react';

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  tx: number;
  size: number;
  color: string;
  duration: number;
}

const loveMessages = [
  "You are the most beautiful part of my life ❤️",
  "Every heartbeat whispers your name, my love 💕",
  "In a world full of chaos, you are my peace 🌹",
  "You are my forever and always, my darling ✨",
  "With you, every moment feels like a beautiful dream 💫",
];

const HeartModal = ({ onClose }: { onClose: () => void }) => {
  const [clicked, setClicked] = useState(false);
  const [message, setMessage] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');
  const [particles, setParticles] = useState<HeartParticle[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleHeartClick = () => {
    if (clicked) return;
    setClicked(true);
    setPulsing(true);

    // Pick random message
    const msg = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    setMessage(msg);

    // Play audio
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(() => {});
    }

    // Generate particles
    const newParticles: HeartParticle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
      tx: Math.random() * 200 - 100,
      size: Math.random() * 20 + 10,
      color: ['#ff6b8a', '#d4af37', '#7ec8e3', '#ff4d6d', '#f5e07c', '#5ba8d0'][Math.floor(Math.random() * 6)],
      duration: Math.random() * 1000 + 800,
    }));
    setParticles(newParticles);

    // Typing animation
    setTimeout(() => {
      setShowMessage(true);
      let i = 0;
      const typeNext = () => {
        if (i < msg.length) {
          setDisplayMessage(msg.slice(0, i + 1));
          i++;
          typingRef.current = setTimeout(typeNext, 60);
        }
      };
      typeNext();
    }, 600);
  };

  useEffect(() => {
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, []);

  const heartColors = clicked
    ? ['#ff2d55', '#ff6b8a', '#ff4d6d']
    : ['#ff6b8a', '#ff4d6d', '#c9184a'];

  return (
    <div className="heart-overlay" onClick={!clicked ? handleHeartClick : undefined}>
      <audio ref={audioRef} src="/audio/message.mp3" preload="auto" />

      {/* Background dim particles */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(255,107,138,0.1) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
        {/* Heart container */}
        <div style={{ position: 'relative', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Ripple rings */}
          {clicked && (
            <>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    inset: `-${i * 20}px`,
                    borderRadius: '50%',
                    border: `1px solid rgba(255,107,138,${0.4 - i * 0.12})`,
                    animation: `ripple 2s ease-out infinite ${i * 0.4}s`,
                  }}
                />
              ))}
            </>
          )}

          {/* Floating heart particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                fontSize: `${p.size}px`,
                left: '50%',
                top: '50%',
                transform: `translate(${p.x}px, ${p.y}px)`,
                animation: `particleFloat ${p.duration}ms ease-out forwards`,
                '--tx': `${p.tx}px`,
                color: p.color,
                pointerEvents: 'none',
              } as React.CSSProperties}
            >
              ❤️
            </div>
          ))}

          {/* The Main Heart SVG */}
          <div
            onClick={handleHeartClick}
            className={`heart-click ${pulsing ? 'animate-heartPulse' : 'animate-gentlePulse'}`}
            style={{
              cursor: clicked ? 'default' : 'pointer',
              filter: clicked
                ? 'drop-shadow(0 0 30px rgba(255,107,138,0.9)) drop-shadow(0 0 60px rgba(255,107,138,0.6))'
                : 'drop-shadow(0 0 20px rgba(255,107,138,0.6)) drop-shadow(0 0 40px rgba(255,107,138,0.3))',
              transition: 'filter 0.5s ease',
            }}
          >
            <svg
              width="160"
              height="150"
              viewBox="0 0 160 150"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="heartGrad" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor={heartColors[0]} />
                  <stop offset="50%" stopColor={heartColors[1]} />
                  <stop offset="100%" stopColor={heartColors[2]} />
                </radialGradient>
                <filter id="heartGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M80 135 C80 135 15 90 15 50 C15 25 35 10 55 10 C65 10 73 15 80 22 C87 15 95 10 105 10 C125 10 145 25 145 50 C145 90 80 135 80 135Z"
                fill="url(#heartGrad)"
                filter="url(#heartGlow)"
              />
              {/* Shine */}
              <ellipse cx="55" cy="38" rx="18" ry="12" fill="rgba(255,255,255,0.25)" style={{ transform: 'rotate(-20deg)', transformOrigin: '55px 38px' }} />
            </svg>
          </div>

          {/* Orbiting small hearts */}
          {!clicked && (
            <>
              {[0, 120, 240].map((_deg, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: '20px',
                    height: '20px',
                    animation: `orbit ${3 + i * 0.5}s linear infinite ${i * 0.5}s`,
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: ['#ff6b8a', '#d4af37', '#7ec8e3'][i],
                  }}
                >
                  ♥
                </div>
              ))}
            </>
          )}
        </div>

        {/* Click hint */}
        {!clicked && (
          <div
            style={{
              color: 'rgba(212,175,55,0.9)',
              fontFamily: "'Dancing Script', cursive",
              fontSize: '1.5rem',
              animation: 'gentlePulse 2s ease-in-out infinite',
              textShadow: '0 0 20px rgba(212,175,55,0.5)',
              textAlign: 'center',
            }}
          >
            ✨ Click the heart to begin ✨
          </div>
        )}

        {/* Love message */}
        {showMessage && (
          <div
            style={{
              maxWidth: '500px',
              padding: '24px 36px',
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: '20px',
              textAlign: 'center',
              animation: 'fadeInUp 0.6s ease-out',
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                color: '#f5e07c',
                fontStyle: 'italic',
                letterSpacing: '0.5px',
                lineHeight: 1.6,
                textShadow: '0 0 20px rgba(212,175,55,0.5)',
                minHeight: '2em',
              }}
            >
              "{displayMessage}"
              {displayMessage.length < message.length && (
                <span style={{ animation: 'blink 1s step-end infinite', color: '#d4af37' }}>|</span>
              )}
            </div>
          </div>
        )}

        {/* Skip button */}
        {clicked && displayMessage.length >= message.length && (
          <button
            onClick={onClose}
            style={{
              padding: '12px 40px',
              background: 'linear-gradient(135deg, rgba(212,175,55,0.9), rgba(126,200,227,0.7))',
              border: 'none',
              borderRadius: '50px',
              color: '#0a1628',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              letterSpacing: '1px',
              animation: 'fadeInUp 0.6s ease-out',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(212,175,55,0.4)',
            }}
            onMouseOver={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(-3px)';
              (e.target as HTMLButtonElement).style.boxShadow = '0 8px 30px rgba(212,175,55,0.6)';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.target as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(212,175,55,0.4)';
            }}
          >
            Enter Our Love Story ✨
          </button>
        )}

        {/* Skip without clicking */}
        {!clicked && (
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255,255,255,0.3)',
              cursor: 'pointer',
              fontFamily: "'Lato', sans-serif",
              fontSize: '0.85rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginTop: '8px',
              transition: 'color 0.3s',
            }}
            onMouseOver={(e) => { (e.target as HTMLButtonElement).style.color = 'rgba(255,255,255,0.6)'; }}
            onMouseOut={(e) => { (e.target as HTMLButtonElement).style.color = 'rgba(255,255,255,0.3)'; }}
          >
            Skip Intro
          </button>
        )}
      </div>
    </div>
  );
};

export default HeartModal;
