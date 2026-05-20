import { useEffect, useRef, useState } from 'react';

const FinalSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [heartClicked, setHeartClicked] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const floatingHearts = Array.from({ length: 20 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 4}s`,
    animationDuration: `${3 + Math.random() * 4}s`,
    size: `${15 + Math.random() * 20}px`,
    color: ['rgba(255,107,138,0.5)', 'rgba(212,175,55,0.4)', 'rgba(126,200,227,0.4)', 'rgba(245,224,124,0.4)'][Math.floor(Math.random() * 4)],
    id: i,
  }));

  return (
    <section
      id="final"
      ref={sectionRef}
      className="section-final"
      style={{
        position: 'relative',
        padding: 'clamp(80px, 15vw, 160px) 20px',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Animated floating hearts */}
      {floatingHearts.map((h) => (
        <div
          key={h.id}
          style={{
            position: 'absolute',
            left: h.left,
            bottom: '-20px',
            fontSize: h.size,
            color: h.color,
            animation: `particleFloat ${h.animationDuration} ease-out infinite ${h.animationDelay}`,
            '--tx': `${(Math.random() - 0.5) * 60}px`,
            pointerEvents: 'none',
            zIndex: 0,
          } as React.CSSProperties}
        >
          ❤️
        </div>
      ))}

      {/* Central glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,107,138,0.08) 0%, rgba(212,175,55,0.06) 40%, transparent 70%)',
          pointerEvents: 'none',
          animation: 'gentlePulse 4s ease-in-out infinite',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '800px',
        }}
      >
        {/* Decorative element */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
            marginBottom: '32px',
          }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            color: 'rgba(212,175,55,0.6)',
            fontSize: '1.2rem',
          }}>
            ✦ ✦ ✦
          </div>
        </div>

        {/* Main message */}
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 800,
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            lineHeight: 1.15,
            marginBottom: '32px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s ease 0.2s',
          }}
        >
          <span
            style={{
              display: 'block',
              background: 'linear-gradient(135deg, #f5e07c 0%, #d4af37 40%, #ffffff 55%, #d4af37 70%, #f5e07c 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 4s linear infinite',
            }}
          >
            You Are My
          </span>
          <span
            style={{
              display: 'block',
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #ff6b8a 0%, #ff4d6d 30%, #d4af37 60%, #ff6b8a 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 4s linear infinite 0.5s',
            }}
          >
            Greatest Love ❤️
          </span>
        </h2>

        {/* Emotional paragraph */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease 0.4s',
          }}
        >
          <div
            style={{
              padding: 'clamp(24px, 5vw, 48px)',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: '24px',
              marginBottom: '40px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
                color: 'rgba(220,235,248,0.9)',
                lineHeight: 1.9,
                letterSpacing: '0.3px',
              }}
            >
              "If I could live a thousand lives, I would choose you in every single one.
              Not because there isn't anyone else in the universe — but because, to me,
              there is no universe without you. You are not just the love of my life.
              You are the reason I believe in love at all."
            </p>

            <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5))' }} />
              <span style={{ color: 'rgba(212,175,55,0.7)', fontSize: '0.85rem', fontFamily: "'Dancing Script', cursive" }}>
                With endless love
              </span>
              <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.5))' }} />
            </div>
          </div>
        </div>

        {/* Big heart interaction */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease 0.6s',
            marginBottom: '40px',
          }}
        >
          <button
            onClick={() => setHeartClicked(!heartClicked)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 'clamp(4rem, 10vw, 7rem)',
              display: 'block',
              margin: '0 auto',
              animation: heartClicked ? 'heartPulse 0.6s ease-out' : 'glowPulse 2s ease-in-out infinite',
              filter: heartClicked
                ? 'drop-shadow(0 0 40px rgba(255,50,100,0.9)) drop-shadow(0 0 80px rgba(255,50,100,0.6))'
                : 'drop-shadow(0 0 20px rgba(255,107,138,0.6)) drop-shadow(0 0 40px rgba(255,107,138,0.3))',
              transition: 'filter 0.5s ease',
            }}
          >
            ❤️
          </button>
          {heartClicked && (
            <p
              style={{
                fontFamily: "'Dancing Script', cursive",
                color: '#ff6b8a',
                fontSize: '1.2rem',
                marginTop: '16px',
                animation: 'fadeInUp 0.5s ease',
                textShadow: '0 0 20px rgba(255,107,138,0.5)',
              }}
            >
              I feel it too, my love Maru Batuu 🥰💕😘
            </p>
          )}
        </div>

        {/* Final CTA */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease 0.8s',
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            className="btn-romantic"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              padding: '18px 48px',
              borderRadius: '50px',
              fontSize: '0.95rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              boxShadow: '0 8px 30px rgba(212,175,55,0.4), 0 0 60px rgba(212,175,55,0.15)',
            }}
          >
            ↑ Back to the Beginning
          </button>
        </div>

        {/* Footer signature */}
        <div
          style={{
            marginTop: '80px',
            opacity: visible ? 0.6 : 0,
            transition: 'opacity 1s ease 1.2s',
          }}
        >
          <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.3), transparent)', marginBottom: '24px' }} />
          <p style={{
            fontFamily: "'Dancing Script', cursive",
            color: 'rgba(212,175,55,0.7)',
            fontSize: '1.3rem',
            letterSpacing: '1px',
          }}>
            Made with every piece of my heart, just for you 💛
          </p>
          <p style={{
            fontFamily: "'Lato', sans-serif",
            fontWeight: 300,
            color: 'rgba(200,220,240,0.3)',
            fontSize: '0.7rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginTop: '8px',
          }}>
            Forever & Always Yours ✦
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalSection;
