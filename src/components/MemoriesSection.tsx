import { useEffect, useRef } from 'react';

interface Memory {
  src: string;
  caption: string;
  date: string;
  tag: string;
  fit?: 'cover' | 'contain';
  objectPosition?: string;
}

const memories: Memory[] = [
  {
    src: '/images/photo1.jpg',
    caption: 'Our Golden Sunrise',
    date: 'The Celebration with full of respect🌸',
    tag: '✨ First Chapter',
  },
  {
    src: '/images/photo2.jpg',
    caption: 'Coffee & Conversations',
    date: 'A Afternoon Full Of Love 💕💕',
    tag: '☕ Sweet Moments',
  },
  {
    src: '/images/photo3.jpg',
    caption: 'Cherry Blossom Dreams',
    date: 'Spring of Our Love',
    tag: '🌸 Blooming Together',
  },
  {
    src: '/images/photo4.jpg',
    caption: 'Worshipping Under Stars',
    date: 'A Night to Remember',
    tag: '⭐ Starlit Memories',
    fit: 'contain',
  },
  {
    src: '/images/photo5.jpg',
    caption: 'Above the Clouds',
    date: 'Our Great Adventure',
    tag: '🎈 Soaring Together',
    objectPosition: 'bottom',
  },
  {
    src: '/images/photo6.jpg',
    caption: 'Moonlit Dinner',
    date: 'Our Lovely 16 Hours in a Day ❤️',
    tag: '🌙 Forever Moments',
    objectPosition: 'center 25%',
  },
];

const MemoriesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.memory-reveal').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0) scale(1)';
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

  return (
    <section
      id="memories"
      ref={sectionRef}
      className="section-memories"
      style={{
        position: 'relative',
        padding: 'clamp(60px, 10vw, 120px) 20px',
        overflow: 'hidden',
      }}
    >
      {/* Section glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 80px)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '16px',
              padding: '6px 20px',
              background: 'rgba(212,175,55,0.07)',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: '50px',
            }}
          >
            <span style={{ color: 'rgba(212,175,55,0.8)', fontSize: '0.65rem', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: "'Lato', sans-serif" }}>
              ✦ Our Precious Memories ✦
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              background: 'linear-gradient(135deg, #f5e07c, #d4af37, #f5e07c)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 5s linear infinite',
              marginBottom: '16px',
              lineHeight: 1.2,
            }}
          >
            Moments Frozen in Time
          </h2>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              color: 'rgba(200,230,245,0.7)',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              maxWidth: '500px',
              margin: '0 auto',
            }}
          >
            Each photo holds a universe of feelings only we can understand
          </p>
        </div>

        {/* Memory Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(20px, 4vw, 36px)',
          }}
        >
          {memories.map((memory, i) => (
            <div
              key={i}
              className="memory-reveal"
              style={{
                opacity: 0,
                transform: 'translateY(40px) scale(0.95)',
                transition: 'all 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            >
              <div
                className="memory-card"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(212,175,55,0.25)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                  position: 'relative',
                }}
              >
                {/* Golden corner accents */}
                <div style={{
                  position: 'absolute', top: '10px', left: '10px', zIndex: 2,
                  width: '20px', height: '20px',
                  borderTop: '2px solid rgba(212,175,55,0.6)',
                  borderLeft: '2px solid rgba(212,175,55,0.6)',
                  borderRadius: '3px 0 0 0',
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute', top: '10px', right: '10px', zIndex: 2,
                  width: '20px', height: '20px',
                  borderTop: '2px solid rgba(212,175,55,0.6)',
                  borderRight: '2px solid rgba(212,175,55,0.6)',
                  borderRadius: '0 3px 0 0',
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute', bottom: '80px', left: '10px', zIndex: 2,
                  width: '20px', height: '20px',
                  borderBottom: '2px solid rgba(212,175,55,0.6)',
                  borderLeft: '2px solid rgba(212,175,55,0.6)',
                  borderRadius: '0 0 0 3px',
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute', bottom: '80px', right: '10px', zIndex: 2,
                  width: '20px', height: '20px',
                  borderBottom: '2px solid rgba(212,175,55,0.6)',
                  borderRight: '2px solid rgba(212,175,55,0.6)',
                  borderRadius: '0 0 3px 0',
                  pointerEvents: 'none',
                }} />

                {/* Tag badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 3,
                    padding: '4px 14px',
                    background: 'rgba(10,22,40,0.85)',
                    border: '1px solid rgba(212,175,55,0.4)',
                    borderRadius: '50px',
                    backdropFilter: 'blur(10px)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{ color: 'rgba(212,175,55,0.9)', fontSize: '0.65rem', letterSpacing: '1px', fontFamily: "'Lato', sans-serif" }}>
                    {memory.tag}
                  </span>
                </div>

                {/* Image */}
                <div style={{ overflow: 'hidden', aspectRatio: '4/3', position: 'relative' }}>
                  <img
                    src={memory.src}
                    alt={memory.caption}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: memory.fit || 'cover',
                      objectPosition: memory.objectPosition || 'center',
                      display: 'block',
                      transition: 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
                    }}
                    onError={(e) => {
                      // Fallback gradient if image not found
                      const gradients = [
                        'linear-gradient(135deg, #1a3a5c, #2a6fa8, #d4af37)',
                        'linear-gradient(135deg, #2a1a3c, #6b2fa8, #d4af37)',
                        'linear-gradient(135deg, #1a3c2a, #2a8a6f, #7ec8e3)',
                        'linear-gradient(135deg, #3c1a1a, #8a2a2a, #d4af37)',
                        'linear-gradient(135deg, #1a2a3c, #2a5a8a, #f5e07c)',
                        'linear-gradient(135deg, #2a3c1a, #5a8a2a, #7ec8e3)',
                      ];
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent) {
                        parent.style.background = gradients[i % gradients.length];
                        (e.target as HTMLImageElement).style.display = 'none';
                        // Add a heart placeholder
                        const placeholder = document.createElement('div');
                        placeholder.style.cssText = `
                          width:100%;height:100%;display:flex;align-items:center;
                          justify-content:center;font-size:60px;opacity:0.5;
                        `;
                        placeholder.textContent = ['💛', '💙', '💕', '✨', '🌹', '💫'][i % 6];
                        parent.appendChild(placeholder);
                      }
                    }}
                  />
                  {/* Image overlay gradient */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to bottom, transparent 50%, rgba(10,22,40,0.7) 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>

                {/* Caption */}
                <div
                  style={{
                    padding: '20px 24px',
                    background: 'rgba(10,22,40,0.8)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 600,
                      fontSize: '1.2rem',
                      color: '#f5e07c',
                      marginBottom: '6px',
                      fontStyle: 'italic',
                    }}
                  >
                    {memory.caption}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '20px', height: '1px', background: 'rgba(126,200,227,0.5)' }} />
                    <p
                      style={{
                        fontFamily: "'Lato', sans-serif",
                        fontWeight: 300,
                        fontSize: '0.75rem',
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        color: 'rgba(126,200,227,0.7)',
                      }}
                    >
                      {memory.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemoriesSection;
