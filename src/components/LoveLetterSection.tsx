import { useState, useEffect, useRef } from 'react';

const letterText = `Maru Batuu🥰😘,

If I could gather every star in the night sky and place them at your feet, it still wouldn't compare to the light you bring into my world every single day.

From the very first moment I saw you, something inside me shifted — like the universe rearranged itself just to make room for you. You walked into my life and turned it into poetry.

Every morning I wake up grateful that out of all the billions of souls on this earth, I get to call you mine. Your laughter is my favorite song, your eyes my favorite view, and your love — my greatest treasure.

I love how you care for everything with such tenderness. I love how you laugh at little things, how you dream so beautifully, how you make even the ordinary feel extraordinary just by being present.

This page is not enough to hold everything I feel for you. But know this — every heartbeat, every breath, every moment of every day... it's all for you.

You are my home, my heart, my forever.
 1 Hata 1 Che 1 Rahisu, 7 Thee Hata 7 Thee che Ane 7 Thee J Rahisu, 13 Thaa 13 Hu 13 hi Rahuga.. 
With all my love and more,
Your Pt Sir 💛`;

const LoveLetterSection = () => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indexRef = useRef(0);

  const startTyping = () => {
    if (hasStarted) return;
    setHasStarted(true);
    setIsTyping(true);
    indexRef.current = 0;

    const type = () => {
      if (indexRef.current < letterText.length) {
        setDisplayText(letterText.slice(0, indexRef.current + 1));
        indexRef.current++;
        const char = letterText[indexRef.current - 1];
        const delay = char === '\n' ? 80 : char === ',' || char === '.' ? 60 : char === ' ' ? 30 : 25;
        typingRef.current = setTimeout(type, delay);
      } else {
        setIsTyping(false);
      }
    };
    type();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startTyping();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, []);

  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <section
      id="letter"
      ref={sectionRef}
      className="section-letter"
      style={{
        position: 'relative',
        padding: 'clamp(60px, 10vw, 120px) 20px',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '-100px',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '-100px',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(126,200,227,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 60px)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '16px',
            padding: '6px 20px', background: 'rgba(126,200,227,0.07)',
            border: '1px solid rgba(126,200,227,0.2)', borderRadius: '50px',
          }}>
            <span style={{ color: 'rgba(126,200,227,0.8)', fontSize: '0.65rem', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: "'Lato', sans-serif" }}>
              ✦ Words from the Heart ✦
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            background: 'linear-gradient(135deg, #7ec8e3, #d4af37, #7ec8e3)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 5s linear infinite',
            marginBottom: '16px',
          }}>
            A Letter Just For You
          </h2>
        </div>

        {/* Letter Paper */}
        <div
          className="letter-paper"
          style={{
            borderRadius: '20px',
            padding: 'clamp(32px, 6vw, 60px)',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,175,55,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          {/* Letter decorations */}
          <div style={{
            position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)',
            fontSize: '1.5rem', opacity: 0.5, pointerEvents: 'none',
          }}>
            💌
          </div>

          {/* Horizontal lines like real paper */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '60px',
                right: '60px',
                height: '1px',
                background: 'rgba(212,175,55,0.04)',
                top: `${80 + i * 38}px`,
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Red vertical line like real letter paper */}
          <div style={{
            position: 'absolute',
            left: '72px',
            top: '60px',
            bottom: '40px',
            width: '1px',
            background: 'rgba(255,100,130,0.1)',
            pointerEvents: 'none',
          }} />

          {/* Letter text */}
          <div style={{ paddingLeft: '20px' }}>
            <p
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                lineHeight: 2,
                color: 'rgba(220, 235, 248, 0.88)',
                whiteSpace: 'pre-line',
                letterSpacing: '0.3px',
                minHeight: '200px',
              }}
            >
              {formatText(displayText)}
              {isTyping && (
                <span style={{ display: 'inline-block', animation: 'blink 1s step-end infinite', color: '#d4af37', marginLeft: '2px' }}>|</span>
              )}
            </p>
          </div>

          {/* Wax seal decoration */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '32px',
            opacity: displayText.length > letterText.length * 0.9 ? 1 : 0,
            transition: 'opacity 1s ease',
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #8b0000, #5c0000)',
              border: '2px solid rgba(212,175,55,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              boxShadow: '0 4px 15px rgba(139,0,0,0.4)',
            }}>
              ♥
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveLetterSection;
