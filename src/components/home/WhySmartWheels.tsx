'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Trophy, Zap, Target } from 'lucide-react';

const features = [
  {
    icon: Trophy,
    title: 'Certified Coaches',
    description: 'Learn from nationally certified skating professionals with decades of competition experience.',
    color: '#FFD400',
  },
  {
    icon: Zap,
    title: 'Professional Training',
    description: 'Structured training programs designed for speed, technique, and competitive edge.',
    color: '#E10600',
  },
  {
    icon: Target,
    title: 'Competition Coaching',
    description: 'Focused preparation for state, national, and international skating championships.',
    color: '#C0C0C0',
  },
];

export default function WhySmartWheels() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="why section-padding" ref={ref}>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>
            Why <span className="gradient-text">Smart Wheels</span>
          </h2>
          <div className="divider" />
          <p>What makes us the leading skating academy in the region</p>
        </motion.div>

        <div className="why__grid">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              className="why__card card"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="why__icon" style={{ color: feat.color }}>
                <feat.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="why__card-title">{feat.title}</h3>
              <p className="why__card-desc">{feat.description}</p>
              <div className="why__card-accent" style={{ background: feat.color }} />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .why {
          background: var(--bg-secondary);
          position: relative;
          overflow: hidden;
        }

        .why::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(225,6,0,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .why__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-4);
        }

        .why__card {
          text-align: center;
          padding: var(--space-6) var(--space-4);
          position: relative;
          overflow: hidden;
        }

        .why__icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto var(--space-3);
          border: 1px solid rgba(255,255,255,0.08);
          transition: all var(--transition-base);
        }

        .why__card:hover .why__icon {
          transform: scale(1.1);
          border-color: var(--accent-red);
          box-shadow: 0 0 30px rgba(225,6,0,0.2);
        }

        .why__card-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          letter-spacing: 0.08em;
          margin-bottom: var(--space-2);
          color: var(--text-primary);
        }

        .why__card-desc {
          font-size: 0.9rem;
          line-height: 1.7;
          color: var(--text-muted);
        }

        .why__card-accent {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          border-radius: 3px;
          opacity: 0;
          transition: all var(--transition-base);
        }

        .why__card:hover .why__card-accent {
          opacity: 1;
          width: 100px;
        }

        @media (max-width: 768px) {
          .why__grid {
            grid-template-columns: 1fr;
            gap: var(--space-3);
          }
        }
      `}</style>
    </section>
  );
}
