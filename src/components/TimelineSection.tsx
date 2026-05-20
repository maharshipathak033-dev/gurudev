import { useEffect, useRef } from 'react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: string;
  side: 'left' | 'right';
}

const events: TimelineEvent[] = [
  {
    date: 'The Beginning',
    title: 'First Hello',
    description: 'The universe conspired to bring us together. I still remember the exact moment I first saw you — time slowed, the world went quiet, and everything just... made sense.',
    icon: '✨',
    side: 'left',
  },
  {
    date: 'First Month',
    title: 'Our First Date',
    description: 'Nervous laughter, shared silences, and the realization that this was something extraordinary. We talked for hours and it still wasn\'t enough.',
    icon: '🌹',
    side: 'right',
  },
  {
    date: 'Season of Us',
    title: 'I Knew It Was You',
    description: 'There was a quiet moment when I looked at you and just knew. No doubt, no question. You were the one I had been waiting for all along.',
    icon: '💛',
    side: 'left',
  },
  {
    date: 'Our Adventures',
    title: 'Exploring Together',
    description: 'New cities, new experiences, new memories — every adventure became a thousand times better just because you were beside me.',
    icon: '🌍',
    side: 'right',
  },
  {
    date: 'Hard Times',
    title: 'We Chose Each Other',
    description: 'When life got difficult, we didn\'t run. We held each other tighter. Those moments showed me the strength of what we have.',
    icon: '🤝',
    side: 'left',
  },
  {
    date: 'Right Now',
    title: 'Today & Forever',
    description: 'Every day with you is a gift I don\'t take for granted. I am so grateful for us — for everything we were, are, and will be.',
    icon: '💫',
    side: 'right',
  },
];

const TimelineSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.timeline-reveal').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateX(0) translateY(0)';
              }, i * 200);
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
      id="journey"
      ref={sectionRef}
      className="section-timeline"
      style={{
        position: 'relative',
        padding: 'clamp(60px, 10vw, 120px) 20px',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(50px, 10vw, 80px)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '16px',
            padding: '6px 20px', background: 'rgba(212,175,55,0.07)',
            border: '1px solid rgba(212,175,55,0.2)', borderRadius: '50px',
          }}>
            <span style={{ color: 'rgba(212,175,55,0.8)', fontSize: '0.65rem', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: "'Lato', sans-serif" }}>
              ✦ Our Beautiful Journey ✦
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            background: 'linear-gradient(135deg, #f5e07c, #7ec8e3, #f5e07c)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 5s linear infinite',
            marginBottom: '16px',
          }}>
            Our Story So Far
          </h2>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            color: 'rgba(200,230,245,0.7)',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          }}>
            Every chapter of us has been worth every word
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }} className="timeline-container">
          {/* Center line - hidden on mobile, shown on desktop */}
          <div
            className="timeline-line-desktop"
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '2px',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.6), rgba(126,200,227,0.6), rgba(212,175,55,0.6), transparent)',
            }}
          />

          {/* Mobile left line */}
          <div
            className="timeline-line-mobile"
            style={{
              position: 'absolute',
              left: '27px',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.6), rgba(126,200,227,0.6), rgba(212,175,55,0.6), transparent)',
              display: 'none',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(30px, 6vw, 60px)' }}>
            {events.map((event, i) => (
              <div
                key={i}
                className="timeline-reveal timeline-item"
                style={{
                  opacity: 0,
                  transform: `translateX(${event.side === 'left' ? '-40px' : '40px'})`,
                  transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto 1fr',
                  gap: '20px',
                  alignItems: 'center',
                }}
              >
                {/* Left content */}
                <div style={{ textAlign: event.side === 'left' ? 'right' : 'left', order: event.side === 'left' ? 0 : 2 }} className="timeline-left-cell">
                  {event.side === 'left' ? (
                    <TimelineCard event={event} />
                  ) : (
                    <div />
                  )}
                </div>

                {/* Center node */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '60px',
                    height: '60px',
                    order: 1,
                    flexShrink: 0,
                  }}
                  className="timeline-node-wrapper"
                >
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(10,22,40,0.9), rgba(20,40,70,0.9))',
                      border: '2px solid rgba(212,175,55,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.4rem',
                      boxShadow: '0 0 20px rgba(212,175,55,0.3), 0 0 40px rgba(212,175,55,0.15)',
                      zIndex: 2,
                      position: 'relative',
                    }}
                  >
                    {event.icon}
                  </div>
                </div>

                {/* Right content */}
                <div style={{ textAlign: event.side === 'right' ? 'left' : 'right', order: event.side === 'right' ? 2 : 0 }} className="timeline-right-cell">
                  {event.side === 'right' ? (
                    <TimelineCard event={event} />
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile timeline styles */}
        <style>{`
          @media (max-width: 700px) {
            .timeline-line-desktop { display: none !important; }
            .timeline-line-mobile { display: block !important; }
            .timeline-item {
              grid-template-columns: 56px 1fr !important;
              gap: 12px !important;
            }
            .timeline-left-cell { display: none !important; }
            .timeline-right-cell {
              display: block !important;
              text-align: left !important;
              order: 1 !important;
            }
            .timeline-node-wrapper {
              order: 0 !important;
              width: 56px !important;
            }
            .timeline-reveal {
              transform: translateX(-20px) !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

const TimelineCard = ({ event }: { event: TimelineEvent }) => (
  <div
    style={{
      padding: 'clamp(16px, 3vw, 28px)',
      background: 'rgba(255,255,255,0.04)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(212,175,55,0.2)',
      borderRadius: '16px',
      textAlign: 'left',
      position: 'relative',
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      transition: 'all 0.4s ease',
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(212,175,55,0.4)';
      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.3), 0 0 20px rgba(212,175,55,0.15)';
      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(212,175,55,0.2)';
      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
    }}
  >
    {/* Date tag */}
    <div style={{
      display: 'inline-block',
      padding: '3px 12px',
      background: 'rgba(212,175,55,0.1)',
      border: '1px solid rgba(212,175,55,0.25)',
      borderRadius: '50px',
      marginBottom: '12px',
    }}>
      <span style={{
        color: 'rgba(212,175,55,0.8)',
        fontSize: '0.65rem',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        fontFamily: "'Lato', sans-serif",
        fontWeight: 300,
      }}>
        {event.date}
      </span>
    </div>

    {/* Title */}
    <h3 style={{
      fontFamily: "'Playfair Display', serif",
      fontWeight: 600,
      fontSize: 'clamp(1rem, 2vw, 1.25rem)',
      color: '#f5e07c',
      marginBottom: '10px',
      fontStyle: 'italic',
    }}>
      {event.title}
    </h3>

    {/* Description */}
    <p style={{
      fontFamily: "'Lato', sans-serif",
      fontWeight: 300,
      fontSize: '0.85rem',
      color: 'rgba(200,220,240,0.72)',
      lineHeight: 1.8,
    }}>
      {event.description}
    </p>
  </div>
);

export default TimelineSection;
