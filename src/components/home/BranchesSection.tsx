'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, User, Clock } from 'lucide-react';

const branches = [
  {
    name: 'Mumbai Central',
    location: 'Mahalaxmi Sports Complex, Mumbai',
    coach: 'Coach Rajesh Kumar',
    timings: 'Mon-Sat: 6AM - 8PM',
    color: '#E10600',
  },
  {
    name: 'Pune Branch',
    location: 'Shivaji Nagar Sports Arena, Pune',
    coach: 'Coach Priya Sharma',
    timings: 'Mon-Sat: 7AM - 9PM',
    color: '#FFD400',
  },
  {
    name: 'Delhi NCR',
    location: 'Connaught Place Sports Hub, Delhi',
    coach: 'Coach Amit Patel',
    timings: 'Mon-Sat: 6AM - 8PM',
    color: '#C0C0C0',
  },
  {
    name: 'Bangalore',
    location: 'Koramangala Skating Rink, Bangalore',
    coach: 'Coach Sneha Reddy',
    timings: 'Mon-Sat: 7AM - 9PM',
    color: '#E10600',
  },
  {
    name: 'Hyderabad',
    location: 'Jubilee Hills Sports Academy, Hyderabad',
    coach: 'Coach Vikram Singh',
    timings: 'Mon-Sat: 6AM - 8PM',
    color: '#FFD400',
  },
];

export default function BranchesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="branches-section section-padding" ref={ref}>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>
            Our <span className="gradient-text">Branches</span>
          </h2>
          <div className="divider" />
          <p>Training centers across India with world-class facilities</p>
        </motion.div>

        <div className="branches__grid">
          {branches.map((branch, i) => (
            <motion.div
              key={branch.name}
              className="branches__card"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="branches__card-image">
                <div className="branches__card-image-placeholder" style={{ background: `linear-gradient(135deg, ${branch.color}22, ${branch.color}08)` }}>
                  <MapPin size={40} color={branch.color} strokeWidth={1} />
                </div>
                <div className="branches__card-overlay" />
              </div>
              <div className="branches__card-content">
                <h4 className="branches__card-name">{branch.name}</h4>
                <div className="branches__card-detail">
                  <MapPin size={14} />
                  <span>{branch.location}</span>
                </div>
                <div className="branches__card-detail">
                  <User size={14} />
                  <span>{branch.coach}</span>
                </div>
                <div className="branches__card-detail">
                  <Clock size={14} />
                  <span>{branch.timings}</span>
                </div>
                <a href="/branches" className="branches__card-link">
                  View Details →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .branches-section {
          background: var(--bg-primary);
        }

        .branches__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: var(--space-4);
        }

        .branches__card {
          background: var(--bg-card);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: all var(--transition-base);
          cursor: pointer;
        }

        .branches__card:hover {
          transform: translateY(-6px) scale(1.02);
          border-color: var(--accent-yellow);
          box-shadow: 0 0 30px rgba(255,212,0,0.15), var(--shadow-card-hover);
        }

        .branches__card-image {
          position: relative;
          height: 160px;
          overflow: hidden;
        }

        .branches__card-image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .branches__card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(transparent, var(--bg-card));
        }

        .branches__card-content {
          padding: var(--space-3);
        }

        .branches__card-name {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          letter-spacing: 0.06em;
          margin-bottom: var(--space-2);
          color: var(--text-primary);
        }

        .branches__card-detail {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 6px;
        }

        .branches__card-link {
          display: inline-block;
          margin-top: var(--space-2);
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--accent-red);
          transition: all var(--transition-fast);
        }

        .branches__card-link:hover {
          color: var(--accent-yellow);
          padding-left: 4px;
        }

        @media (max-width: 640px) {
          .branches__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
