'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const medals = [
  {
    type: 'Gold',
    color: '#FFD400',
    glow: 'rgba(255,212,0,0.4)',
    count: 12,
    competition: 'State Championship 2024',
    event: 'Speed Skating',
    icon: '🥇',
  },
  {
    type: 'Silver',
    color: '#C0C0C0',
    glow: 'rgba(192,192,192,0.4)',
    count: 18,
    competition: 'District Championship 2024',
    event: 'Freestyle Skating',
    icon: '🥈',
  },
  {
    type: 'Bronze',
    color: '#CD7F32',
    glow: 'rgba(205,127,50,0.4)',
    count: 25,
    competition: 'National Championship 2023',
    event: 'Artistic Skating',
    icon: '🥉',
  },
];

export default function MedalShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="medals section-padding" ref={ref}>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>
            Medal <span className="gradient-text">Showcase</span>
          </h2>
          <div className="divider" />
          <p>Our students&apos; achievements on the competitive stage</p>
        </motion.div>

        <div className="medals__grid">
          {medals.map((medal, i) => (
            <motion.div
              key={medal.type}
              className="medals__card"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                className="medals__icon"
                animate={hoveredIndex === i ? { rotateY: 360 } : { rotateY: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{
                  boxShadow: hoveredIndex === i ? `0 0 60px ${medal.glow}` : 'none',
                  borderColor: hoveredIndex === i ? medal.color : 'rgba(255,255,255,0.06)',
                }}
              >
                <span className="medals__emoji">{medal.icon}</span>
              </motion.div>

              <h3 className="medals__type" style={{ color: medal.color }}>{medal.type}</h3>
              <div className="medals__count">{medal.count} Medals</div>

              <motion.div
                className="medals__details"
                initial={{ opacity: 0, height: 0 }}
                animate={hoveredIndex === i ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="medals__detail-item">
                  <span className="medals__detail-label">Competition</span>
                  <span className="medals__detail-value">{medal.competition}</span>
                </div>
                <div className="medals__detail-item">
                  <span className="medals__detail-label">Event</span>
                  <span className="medals__detail-value">{medal.event}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .medals {
          background: var(--bg-secondary);
        }

        .medals__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-4);
          max-width: 900px;
          margin: 0 auto;
        }

        .medals__card {
          text-align: center;
          padding: var(--space-6) var(--space-4);
          background: var(--bg-card);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .medals__card:hover {
          transform: translateY(-8px);
          background: var(--bg-card-hover);
        }

        .medals__icon {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: rgba(255,255,255,0.03);
          border: 2px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto var(--space-3);
          transition: all var(--transition-base);
        }

        .medals__emoji {
          font-size: 3rem;
        }

        .medals__type {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          letter-spacing: 0.1em;
          margin-bottom: 4px;
        }

        .medals__count {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: var(--space-2);
        }

        .medals__details {
          overflow: hidden;
          margin-top: var(--space-2);
        }

        .medals__detail-item {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .medals__detail-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .medals__detail-value {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .medals__grid {
            grid-template-columns: 1fr;
            max-width: 400px;
          }
        }
      `}</style>
    </section>
  );
}
