'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string }[] = [];
    const streaks: { x: number; y: number; width: number; speed: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        color: ['#E10600', '#FFD400', '#C0C0C0'][Math.floor(Math.random() * 3)],
      });
    }

    // Create speed streaks
    for (let i = 0; i < 5; i++) {
      streaks.push({
        x: -200,
        y: Math.random() * canvas.height,
        width: Math.random() * 200 + 100,
        speed: Math.random() * 4 + 2,
        alpha: Math.random() * 0.15 + 0.05,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      // Draw speed streaks
      streaks.forEach((s) => {
        s.x += s.speed;
        if (s.x > canvas.width + s.width) {
          s.x = -s.width;
          s.y = Math.random() * canvas.height;
        }

        const grad = ctx.createLinearGradient(s.x, s.y, s.x + s.width, s.y);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.5, `rgba(225, 6, 0, ${s.alpha})`);
        grad.addColorStop(1, 'transparent');
        ctx.globalAlpha = 1;
        ctx.fillStyle = grad;
        ctx.fillRect(s.x, s.y, s.width, 1.5);
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="hero" id="hero">
      {/* Animated Background */}
      <div className="hero__bg">
        <div className="hero__bg-pattern" />
        <div className="hero__bg-gradient" />
      </div>

      <canvas ref={canvasRef} className="hero__canvas" />

      <div className="hero__content container">
        <motion.div
          className="hero__text"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
          >
            🏆 #1 Skating Academy
          </motion.div>

          <h1 className="hero__title">
            Train Like a <span className="gradient-text">Champion.</span>
            <br />
            Skate Like a <span className="gradient-text">Pro.</span>
          </h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0 }}
          >
            Professional skating training for all ages with certified coaches
            and world-class facilities.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
          >
            <a href="/contact" className="btn btn-primary hero__btn">
              Join Academy
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="/branches" className="btn btn-secondary hero__btn">
              View Branches
            </a>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            className="hero__stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.4 }}
          >
            <div className="hero__stat">
              <span className="hero__stat-number">500+</span>
              <span className="hero__stat-label">Students</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">30+</span>
              <span className="hero__stat-label">Medals</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">10+</span>
              <span className="hero__stat-label">Years</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">5</span>
              <span className="hero__stat-label">Branches</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
      >
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </motion.div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero__bg-pattern {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 20% 50%, rgba(225, 6, 0, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 212, 0, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, rgba(192, 192, 192, 0.03) 0%, transparent 40%);
        }

        .hero__bg-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, 
            rgba(10,10,10,0.3) 0%, 
            rgba(10,10,10,0.6) 50%, 
            rgba(10,10,10,0.95) 100%
          );
        }

        .hero__canvas {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        .hero__content {
          position: relative;
          z-index: 2;
          padding-top: var(--space-12);
        }

        .hero__text {
          max-width: 800px;
        }

        .hero__badge {
          display: inline-block;
          padding: 6px 16px;
          background: rgba(225, 6, 0, 0.15);
          border: 1px solid rgba(225, 6, 0, 0.3);
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          margin-bottom: var(--space-4);
          color: var(--accent-yellow);
        }

        .hero__title {
          font-size: clamp(3rem, 7vw, 5.5rem);
          line-height: 1.05;
          margin-bottom: var(--space-3);
          letter-spacing: 0.03em;
        }

        .hero__subtitle {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: var(--text-secondary);
          max-width: 550px;
          margin-bottom: var(--space-5);
          line-height: 1.6;
        }

        .hero__actions {
          display: flex;
          gap: var(--space-2);
          margin-bottom: var(--space-8);
          flex-wrap: wrap;
        }

        .hero__btn {
          padding: var(--space-2) var(--space-4);
          font-size: 0.9rem;
        }

        .hero__stats {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-3) var(--space-4);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: var(--radius-lg);
          backdrop-filter: blur(10px);
          width: fit-content;
        }

        .hero__stat {
          text-align: center;
        }

        .hero__stat-number {
          display: block;
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: var(--accent-red);
          letter-spacing: 0.05em;
        }

        .hero__stat-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .hero__stat-divider {
          width: 1px;
          height: 30px;
          background: rgba(255,255,255,0.1);
        }

        .hero__scroll {
          position: absolute;
          bottom: var(--space-5);
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .hero__scroll span {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-muted);
        }

        .hero__scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(180deg, var(--accent-red), transparent);
          animation: bounceArrow 2s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .hero__stats {
            flex-wrap: wrap;
            gap: var(--space-3);
          }
          .hero__stat-divider {
            display: none;
          }
          .hero__actions {
            flex-direction: column;
          }
          .hero__btn {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
