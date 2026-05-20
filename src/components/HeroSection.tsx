import { useEffect, useRef } from 'react';

const FloatingHeart = ({ style }: { style: React.CSSProperties }) => (
  <div style={{ position: 'absolute', pointerEvents: 'none', ...style }}>
    <svg viewBox="0 0 30 28" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 26 C15 26 2 16 2 9 C2 4.5 5.5 2 9.5 2 C12 2 14 3.5 15 5 C16 3.5 18 2 20.5 2 C24.5 2 28 4.5 28 9 C28 16 15 26 15 26Z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  </div>
);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.hero-animate').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)';
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const floatingHearts = [
    { size: 22, color: 'rgba(255,107,138,0.5)', top: '15%', left: '8%', animDuration: '4.5s', animDelay: '0s' },
    { size: 15, color: 'rgba(212,175,55,0.4)', top: '25%', left: '90%', animDuration: '3.8s', animDelay: '1s' },
    { size: 28, color: 'rgba(126,200,227,0.35)', top: '70%', left: '5%', animDuration: '5.2s', animDelay: '0.5s' },
    { size: 18, color: 'rgba(255,107,138,0.4)', top: '80%', left: '88%', animDuration: '4s', animDelay: '1.5s' },
    { size: 12, color: 'rgba(245,224,124,0.5)', top: '45%', left: '3%', animDuration: '3.5s', animDelay: '2s' },
    { size: 20, color: 'rgba(255,107,138,0.35)', top: '60%', left: '93%', animDuration: '4.8s', animDelay: '0.8s' },
    { size: 10, color: 'rgba(212,175,55,0.5)', top: '10%', left: '50%', animDuration: '3.2s', animDelay: '1.2s' },
    { size: 16, color: 'rgba(126,200,227,0.4)', top: '90%', left: '45%', animDuration: '4.2s', animDelay: '0.3s' },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '80px 20px',
      }}
    >
      {/* Background image overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.08,
        }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(126,200,227,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating Hearts */}
      {floatingHearts.map((h, i) => (
        <FloatingHeart
          key={i}
          style={{
            width: h.size,
            height: h.size,
            top: h.top,
            left: h.left,
            color: h.color,
            animation: `float ${h.animDuration} ease-in-out infinite ${h.animDelay}`,
          }}
        />
      ))}

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '900px',
          width: '100%',
        }}
      >
        {/* Pre-heading tag */}
        <div
          className="hero-animate"
          style={{
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'all 0.8s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '24px',
            padding: '8px 24px',
            background: 'rgba(212,175,55,0.08)',
            border: '1px solid rgba(212,175,55,0.25)',
            borderRadius: '50px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span style={{ fontSize: '1rem' }}>✦</span>
          <span
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 300,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontSize: '0.7rem',
              color: 'rgba(212,175,55,0.9)',
            }}
          >
            A Love Story Written in Stars
          </span>
          <span style={{ fontSize: '1rem' }}>✦</span>
        </div>

        {/* Main heading */}
        <h1
          className="hero-animate"
          style={{
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'all 0.8s ease',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 800,
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            lineHeight: 1.1,
            marginBottom: '12px',
          }}
        >
          <span
            style={{
              display: 'block',
              background: 'linear-gradient(135deg, #f5e07c 0%, #d4af37 30%, #ffffff 50%, #d4af37 70%, #f5e07c 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 5s linear infinite',
              textShadow: 'none',
            }}
          >
            Forever
          </span>
          <span
            style={{
              display: 'block',
              background: 'linear-gradient(135deg, #7ec8e3 0%, #5ba8d0 30%, #d4af37 60%, #7ec8e3 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 5s linear infinite 1s',
              textShadow: 'none',
              fontStyle: 'italic',
            }}
          >
            & Always
          </span>
          <span
            style={{
              display: 'block',
              background: 'linear-gradient(135deg, #f5e07c 0%, #d4af37 50%, #f5e07c 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 5s linear infinite 0.5s',
              textShadow: 'none',
            }}
          >
            Yours ❤️
          </span>
        </h1>

        {/* Decorative line */}
        <div
          className="hero-animate"
          style={{
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'all 0.8s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            margin: '24px 0',
          }}
        >
          <div style={{ height: '1px', width: '80px', background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.7))' }} />
          <span style={{ fontSize: '1.4rem' }}>💛</span>
          <div style={{ height: '1px', width: '80px', background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.7))' }} />
        </div>

        {/* Subheading */}
        <p
          className="hero-animate"
          style={{
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'all 0.8s ease',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
            color: 'rgba(200,230,245,0.85)',
            lineHeight: 1.8,
            marginBottom: '40px',
            maxWidth: '650px',
            margin: '0 auto 40px',
          }}
        >
          Every moment with you is a chapter in the most beautiful love story ever written.
          This page is my heart — open, honest, and entirely yours.
        </p>

        {/* CTA Buttons */}
        <div
          className="hero-animate"
          style={{
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'all 0.8s ease',
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="#memories"
            className="btn-romantic"
            style={{
              padding: '16px 44px',
              borderRadius: '50px',
              fontSize: '0.95rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 4px 20px rgba(212,175,55,0.4)',
            }}
          >
            Our Memories ✨
          </a>
          <a
            href="#letter"
            style={{
              padding: '16px 44px',
              borderRadius: '50px',
              fontSize: '0.95rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-block',
              background: 'transparent',
              border: '1px solid rgba(126,200,227,0.6)',
              color: 'rgba(126,200,227,0.9)',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600,
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = 'rgba(126,200,227,0.1)';
              el.style.boxShadow = '0 0 20px rgba(126,200,227,0.3)';
              el.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = 'transparent';
              el.style.boxShadow = 'none';
              el.style.transform = 'translateY(0)';
            }}
          >
            Read My Letter 💌
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="hero-animate"
          style={{
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'all 0.8s ease',
            marginTop: '60px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ color: 'rgba(212,175,55,0.5)', fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: "'Lato', sans-serif" }}>
            Scroll to explore
          </span>
          <div
            style={{
              width: '22px',
              height: '36px',
              border: '1.5px solid rgba(212,175,55,0.35)',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '6px',
            }}
          >
            <div
              style={{
                width: '3px',
                height: '8px',
                background: 'rgba(212,175,55,0.7)',
                borderRadius: '2px',
                animation: 'float 1.5s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
