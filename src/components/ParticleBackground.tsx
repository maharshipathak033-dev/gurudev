import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  type: 'star' | 'sparkle' | 'dust';
  twinkleSpeed: number;
  twinkleOffset: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = [
      'rgba(212,175,55,', // gold
      'rgba(126,200,227,', // blue
      'rgba(255,255,255,', // white
      'rgba(245,224,124,', // gold light
      'rgba(91,168,208,',  // blue mid
    ];

    const initParticles = () => {
      particlesRef.current = Array.from({ length: 120 }, (_, i) => {
        const type = i < 60 ? 'star' : i < 100 ? 'sparkle' : 'dust';
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: type === 'dust' ? -Math.random() * 0.5 - 0.1 : (Math.random() - 0.5) * 0.1,
          size: type === 'star' ? Math.random() * 2 + 0.5 : type === 'sparkle' ? Math.random() * 3 + 1 : Math.random() * 1.5 + 0.3,
          opacity: Math.random(),
          color: colors[Math.floor(Math.random() * colors.length)],
          type,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
        };
      });
    };
    initParticles();

    let frame = 0;

    const drawSparkle = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = opacity;

      const points = 4;
      const outerR = size;
      const innerR = size * 0.3;

      ctx.beginPath();
      for (let i = 0; i < points * 2; i++) {
        const angle = (i * Math.PI) / points;
        const r = i % 2 === 0 ? outerR : innerR;
        if (i === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
        else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
      }
      ctx.closePath();
      ctx.fillStyle = color + '0.8)';
      ctx.shadowBlur = 8;
      ctx.shadowColor = color + '0.6)';
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.twinkleOffset += p.twinkleSpeed;
        const twinkle = (Math.sin(p.twinkleOffset) + 1) / 2;
        const currentOpacity = p.type === 'star' ? twinkle * 0.8 + 0.1 : p.type === 'sparkle' ? twinkle * 0.6 + 0.1 : twinkle * 0.4 + 0.05;

        // Wrap around
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        if (p.type === 'star') {
          ctx.save();
          ctx.globalAlpha = currentOpacity;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color + '1)';
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color + '0.8)';
          ctx.fill();
          ctx.restore();
        } else if (p.type === 'sparkle') {
          drawSparkle(ctx, p.x, p.y, p.size, currentOpacity, p.color);
        } else {
          ctx.save();
          ctx.globalAlpha = currentOpacity;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color + '0.5)';
          ctx.fill();
          ctx.restore();
        }
      });

      // Occasional shooting star
      if (frame % 300 === 0) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height * 0.5;
        const length = Math.random() * 100 + 50;
        const gradient = ctx.createLinearGradient(startX, startY, startX + length, startY + length);
        gradient.addColorStop(0, 'rgba(255,255,255,0.8)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + length, startY + length);
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particles-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default ParticleBackground;
