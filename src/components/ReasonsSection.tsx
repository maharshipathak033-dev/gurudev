import { useEffect, useRef } from 'react';

interface Reason {
  icon: string;
  title: string;
  description: string;
  color: string;
}

const reasons: Reason[] = [
  {
    icon: '🌟',
    title: 'Your Beautiful Soul',
    description: 'The way you light up every room you enter, bringing warmth and joy to everyone around you — it\'s pure magic.',
    color: 'rgba(212,175,55,0.15)',
  },
  {
    icon: '💙',
    title: 'Your Endless Kindness',
    description: 'Your heart is so full of compassion and tenderness. You make the world softer just by being in it.',
    color: 'rgba(126,200,227,0.15)',
  },
  {
    icon: '😂',
    title: 'The Way You Laugh',
    description: 'Your laugh is the most beautiful sound I\'ve ever heard. It turns even the hardest days into something worth smiling about.',
    color: 'rgba(212,175,55,0.12)',
  },
  {
    icon: '🌸',
    title: 'Your Quiet Strength',
    description: 'The way you carry yourself through storms, never losing your grace — you inspire me every single day.',
    color: 'rgba(255,107,138,0.12)',
  },
  {
    icon: '✨',
    title: 'How You Make Me Better',
    description: 'You push me to grow, to dream bigger, to love deeper. With you, I am the best version of myself.',
    color: 'rgba(126,200,227,0.15)',
  },
  {
    icon: '🌙',
    title: 'Your Midnight Thoughts',
    description: 'The conversations we have at 3am, the dreams we share, the secrets only we know — those are my most treasured memories.',
    color: 'rgba(212,175,55,0.12)',
  },
  {
    icon: '🎵',
    title: 'The Songs We Share',
    description: 'Every melody now has your name written in it. You\'ve turned my world into a love song that never ends.',
    color: 'rgba(255,107,138,0.12)',
  },
  {
    icon: '🏠',
    title: 'You Are My Home',
    description: 'No matter where I am in the world, being with you feels like coming home. You are my safest place.',
    color: 'rgba(126,200,227,0.15)',
  },
  {
    icon: '💫',
    title: 'Your Unique Wonder',
    description: 'There is nobody in this universe quite like you. Your quirks, your passions, your little ways — I love every single one.',
    color: 'rgba(212,175,55,0.15)',
  },
];

const ReasonsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reason-reveal').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0) scale(1)';
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="reasons"
      ref={sectionRef}
      className="section-reasons"
      style={{
        position: 'relative',
        padding: 'clamp(60px, 10vw, 120px) 20px',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 80px)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '16px',
            padding: '6px 20px', background: 'rgba(255,107,138,0.07)',
            border: '1px solid rgba(255,107,138,0.2)', borderRadius: '50px',
          }}>
            <span style={{ color: 'rgba(255,107,138,0.8)', fontSize: '0.65rem', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: "'Lato', sans-serif" }}>
              ✦ From the Depths of My Heart ✦
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            background: 'linear-gradient(135deg, #ff6b8a, #d4af37, #ff6b8a)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 5s linear infinite',
            marginBottom: '16px',
          }}>
            Why I Love You
          </h2>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            color: 'rgba(200,230,245,0.7)',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            maxWidth: '500px',
            margin: '0 auto',
          }}>
            These are just a few of the ten thousand reasons why you are everything to me
          </p>
        </div>

        {/* Reasons Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(16px, 3vw, 28px)',
        }}>
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="reason-reveal reason-card"
              style={{
                opacity: 0,
                transform: 'translateY(30px) scale(0.95)',
                transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                padding: 'clamp(20px, 4vw, 32px)',
                background: reason.color,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '20px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
              }}
            >
              {/* Top border accent */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '20%',
                right: '20%',
                height: '2px',
                background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5), transparent)',
                borderRadius: '0 0 4px 4px',
              }} />

              {/* Number badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'rgba(212,175,55,0.1)',
                border: '1px solid rgba(212,175,55,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(212,175,55,0.6)',
                fontSize: '0.65rem',
                fontFamily: "'Lato', sans-serif",
                fontWeight: 300,
                letterSpacing: '0.5px',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '16px',
                display: 'block',
                filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.3))',
              }}>
                {reason.icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 600,
                fontSize: '1.15rem',
                color: '#f5e07c',
                marginBottom: '10px',
                fontStyle: 'italic',
              }}>
                {reason.title}
              </h3>

              {/* Description */}
              <p style={{
                fontFamily: "'Lato', sans-serif",
                fontWeight: 300,
                fontSize: '0.88rem',
                color: 'rgba(200,220,240,0.75)',
                lineHeight: 1.8,
                letterSpacing: '0.3px',
              }}>
                {reason.description}
              </p>

              {/* Bottom heart */}
              <div style={{
                marginTop: '16px',
                color: 'rgba(212,175,55,0.3)',
                fontSize: '0.9rem',
              }}>
                ♥
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReasonsSection;
