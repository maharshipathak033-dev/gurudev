import { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import HeartModal from './components/HeartModal';
import MusicPlayer from './components/MusicPlayer';
import HeroSection from './components/HeroSection';
import MemoriesSection from './components/MemoriesSection';
import LoveLetterSection from './components/LoveLetterSection';
import ReasonsSection from './components/ReasonsSection';
import TimelineSection from './components/TimelineSection';
import FinalSection from './components/FinalSection';

// Navigation items
const navItems = [
  { label: 'Home', href: '#top' },
  { label: 'Memories', href: '#memories' },
  { label: 'Letter', href: '#letter' },
  { label: 'Reasons', href: '#reasons' },
  { label: 'Journey', href: '#journey' },
];

const SectionDivider = () => (
  <div style={{
    width: '100%',
    padding: '0 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    margin: '0',
    position: 'relative',
    zIndex: 2,
  }}>
    <div style={{
      flex: 1,
      height: '1px',
      background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.25))',
    }} />
    <span style={{ fontSize: '0.7rem', color: 'rgba(212,175,55,0.4)', letterSpacing: '3px' }}>✦</span>
    <span style={{ fontSize: '0.5rem', color: 'rgba(126,200,227,0.35)', letterSpacing: '3px' }}>♥</span>
    <span style={{ fontSize: '0.7rem', color: 'rgba(212,175,55,0.4)', letterSpacing: '3px' }}>✦</span>
    <div style={{
      flex: 1,
      height: '1px',
      background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.25))',
    }} />
  </div>
);

export default function App() {
  const [showModal, setShowModal] = useState(true);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [showModal]);

  return (
    <div
      id="top"
      style={{
        background: '#0a1628',
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Particle Background */}
      <ParticleBackground />

      {/* Heart Modal */}
      {showModal && <HeartModal onClose={() => setShowModal(false)} />}

      {/* Navigation */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          padding: navScrolled ? '12px 40px' : '20px 40px',
          background: navScrolled
            ? 'rgba(10,22,40,0.92)'
            : 'transparent',
          backdropFilter: navScrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: navScrolled ? 'blur(20px)' : 'none',
          borderBottom: navScrolled ? '1px solid rgba(212,175,55,0.15)' : 'none',
          transition: 'all 0.4s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="#top"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
        >
          <span style={{ fontSize: '1.4rem' }}>💛</span>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: '1.2rem',
              background: 'linear-gradient(135deg, #f5e07c, #d4af37)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontStyle: 'italic',
            }}
          >
            Forever Yours
          </span>
        </a>

        {/* Desktop Nav */}
        <div
          style={{
            display: 'flex',
            gap: '32px',
            alignItems: 'center',
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                color: 'rgba(200,220,240,0.7)',
                textDecoration: 'none',
                fontFamily: "'Lato', sans-serif",
                fontWeight: 300,
                fontSize: '0.8rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                transition: 'color 0.3s ease',
                position: 'relative',
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(212,175,55,0.9)';
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(200,220,240,0.7)';
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            flexDirection: 'column',
            gap: '5px',
          }}
          className="mobile-nav-btn"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '24px',
                height: '1.5px',
                background: 'rgba(212,175,55,0.8)',
                transition: 'all 0.3s ease',
                transform: mobileNavOpen
                  ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                  : i === 1 ? 'opacity: 0'
                  : 'rotate(-45deg) translate(5px, -5px)'
                  : 'none',
                opacity: mobileNavOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile Nav Drawer */}
      {mobileNavOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(10,22,40,0.97)',
            backdropFilter: 'blur(20px)',
            zIndex: 490,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileNavOpen(false)}
              style={{
                color: 'rgba(212,175,55,0.9)',
                textDecoration: 'none',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 600,
                fontSize: '1.8rem',
                fontStyle: 'italic',
                transition: 'all 0.3s ease',
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* Main Content */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
        <SectionDivider />
        <MemoriesSection />
        <SectionDivider />
        <LoveLetterSection />
        <SectionDivider />
        <ReasonsSection />
        <SectionDivider />
        <TimelineSection />
        <SectionDivider />
        <FinalSection />
      </main>

      {/* Music Player */}
      <MusicPlayer />

      {/* Inline Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav-btn {
            display: flex !important;
          }
          nav {
            padding: 16px 20px !important;
          }
          .music-btn {
            width: 48px !important;
            height: 48px !important;
            bottom: 20px !important;
            right: 20px !important;
          }
        }

        @keyframes particleFloat {
          0% {
            opacity: 1;
            transform: translateY(0) translateX(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-120px) translateX(var(--tx, 30px)) scale(0.3);
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(212,175,55,0.3), 0 0 40px rgba(212,175,55,0.15);
          }
          50% {
            box-shadow: 0 0 30px rgba(212,175,55,0.5), 0 0 60px rgba(212,175,55,0.3), 0 0 90px rgba(212,175,55,0.15);
          }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(70px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(70px) rotate(-360deg); }
        }

        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(2deg); }
          66% { transform: translateY(-8px) rotate(-1deg); }
        }

        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        @keyframes heartPulse {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.2); }
          30% { transform: scale(1); }
          45% { transform: scale(1.1); }
          60% { transform: scale(1); }
        }

        @keyframes gentlePulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.85; }
        }
      `}</style>
    </div>
  );
}
