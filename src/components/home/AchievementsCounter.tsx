'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Users, Medal, Calendar, GitBranch } from 'lucide-react';

const stats = [
  { icon: Users, number: 500, suffix: '+', label: 'Students Trained', color: '#E10600' },
  { icon: Medal, number: 30, suffix: '+', label: 'State Medals', color: '#FFD400' },
  { icon: Calendar, number: 10, suffix: '+', label: 'Years Experience', color: '#C0C0C0' },
  { icon: GitBranch, number: 5, suffix: '', label: 'Branches', color: '#E10600' },
];

function Counter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span>{count}{suffix}</span>;
}

export default function AchievementsCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="counters" ref={ref}>
      <div className="counters__bg" />
      <div className="container">
        <div className="counters__grid">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="counters__item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="counters__icon" style={{ color: stat.color }}>
                <stat.icon size={28} strokeWidth={1.5} />
              </div>
              <div className="counters__number" style={{ color: stat.color }}>
                <Counter target={stat.number} suffix={stat.suffix} inView={isInView} />
              </div>
              <div className="counters__label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .counters {
          position: relative;
          padding: var(--space-10) 0;
          overflow: hidden;
        }

        .counters__bg {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(225,6,0,0.08), transparent 50%),
            linear-gradient(315deg, rgba(255,212,0,0.05), transparent 50%),
            var(--bg-primary);
        }

        .counters__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-4);
          position: relative;
          z-index: 1;
        }

        .counters__item {
          text-align: center;
          padding: var(--space-5) var(--space-3);
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: var(--radius-lg);
          transition: all var(--transition-base);
        }

        .counters__item:hover {
          background: rgba(255,255,255,0.04);
          border-color: rgba(225,6,0,0.3);
          box-shadow: 0 0 40px rgba(225,6,0,0.1);
          transform: translateY(-4px);
        }

        .counters__icon {
          margin-bottom: var(--space-2);
        }

        .counters__number {
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          line-height: 1;
          margin-bottom: var(--space-1);
        }

        .counters__label {
          font-size: 0.85rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        @media (max-width: 768px) {
          .counters__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .counters__grid {
            grid-template-columns: 1fr 1fr;
            gap: var(--space-2);
          }
        }
      `}</style>
    </section>
  );
}
