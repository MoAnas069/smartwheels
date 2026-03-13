'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, Target, Award, Users, Zap, Star } from 'lucide-react';

const programs = [
  { title: 'Beginner', level: 1, desc: 'Perfect for first-time skaters. Learn balance, basic movement, and safety fundamentals.', color: '#4CAF50', features: ['Basic stance & balance', 'Forward movement', 'Stopping techniques', 'Safety training'] },
  { title: 'Intermediate', level: 2, desc: 'Build speed, agility, and confidence. Advanced techniques for competitive readiness.', color: '#FFD400', features: ['Speed training', 'Crossover turns', 'Slalom techniques', 'Endurance building'] },
  { title: 'Advanced', level: 3, desc: 'Elite training for competition-level skaters. Race preparation and championship coaching.', color: '#E10600', features: ['Race strategy', 'Advanced freestyle', 'Competition preparation', 'Performance analysis'] },
];

export default function AboutPage() {
  const ref1 = useRef(null), ref2 = useRef(null), ref3 = useRef(null);
  const inView1 = useInView(ref1, { once: true, margin: '-80px' });
  const inView2 = useInView(ref2, { once: true, margin: '-80px' });
  const inView3 = useInView(ref3, { once: true, margin: '-80px' });

  return (
    <>
      {/* Hero */}
      <section style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', background: 'var(--bg-primary)', paddingTop: 'var(--space-12)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(225,6,0,0.08), transparent 60%)' }} />
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', position: 'relative', zIndex: 1, padding: 'var(--space-4)' }}>
          <h1 style={{ marginBottom: 'var(--space-3)' }}>Building <span className="gradient-text">Champions</span> on Wheels</h1>
          <p style={{ maxWidth: 600, margin: '0 auto', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            Since 2014, Smart Wheels has been transforming aspiring skaters into competitive athletes through world-class coaching and state-of-the-art facilities.
          </p>
        </motion.div>
      </section>

      {/* Founder Story */}
      <section ref={ref1} style={{ background: 'var(--bg-secondary)', padding: 'var(--space-12) var(--space-4)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView1 ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, rgba(225,6,0,0.15), rgba(255,212,0,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={80} strokeWidth={0.8} color="var(--accent-red)" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView1 ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', color: 'var(--accent-red)', letterSpacing: '0.15em', textTransform: 'uppercase' as const }}>Our Story</span>
            <h2 style={{ margin: 'var(--space-2) 0 var(--space-3)' }}>Founded on <span className="gradient-text">Passion</span></h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 'var(--space-3)' }}>
              Smart Wheels Skating Academy was born from a vision to bring professional-level skating training to aspiring athletes across India. What started as a single training center in Mumbai has grown into a multi-city academy producing state and national champions.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
              Our founder, driven by decades of competitive skating experience, established a training methodology that combines international techniques with personalized coaching, creating a path to excellence for every student.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section ref={ref2} style={{ background: 'var(--bg-primary)', padding: 'var(--space-12) var(--space-4)' }}>
        <div className="container">
          <motion.div className="section-title" initial={{ opacity: 0, y: 40 }} animate={inView2 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <h2>Our <span className="gradient-text">Mission</span></h2>
            <div className="divider" />
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)', maxWidth: 900, margin: '0 auto' }}>
            {[
              { icon: BookOpen, title: 'Educate', text: 'Provide world-class skating education accessible to all ages and skill levels' },
              { icon: Target, title: 'Empower', text: 'Build confidence, discipline, and sportsmanship through structured training' },
              { icon: Award, title: 'Excel', text: 'Prepare students for competitive success at state and national levels' },
            ].map((item, i) => (
              <motion.div key={item.title} className="card" initial={{ opacity: 0, y: 40 }} animate={inView2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }} style={{ textAlign: 'center', padding: 'var(--space-5) var(--space-3)' }}>
                <item.icon size={32} strokeWidth={1.5} color="var(--accent-red)" style={{ marginBottom: 'var(--space-2)' }} />
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', letterSpacing: '0.08em', marginBottom: 'var(--space-1)' }}>{item.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section ref={ref3} id="programs" style={{ background: 'var(--bg-secondary)', padding: 'var(--space-12) var(--space-4)' }}>
        <div className="container">
          <motion.div className="section-title" initial={{ opacity: 0, y: 40 }} animate={inView3 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <h2>Training <span className="gradient-text">Programs</span></h2>
            <div className="divider" />
            <p>Structured progression from beginner to competition level</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)', maxWidth: 1000, margin: '0 auto' }}>
            {programs.map((prog, i) => (
              <motion.div key={prog.title} className="card" initial={{ opacity: 0, y: 50 }} animate={inView3 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }} style={{ padding: 'var(--space-5) var(--space-4)' }}>
                {/* Difficulty indicator */}
                <div style={{ display: 'flex', gap: 4, marginBottom: 'var(--space-2)' }}>
                  {[1, 2, 3].map(l => (
                    <div key={l} style={{ width: 32, height: 4, borderRadius: 2, background: l <= prog.level ? prog.color : 'rgba(255,255,255,0.1)' }} />
                  ))}
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', letterSpacing: '0.06em', color: prog.color, marginBottom: 'var(--space-1)' }}>{prog.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 'var(--space-3)' }}>{prog.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {prog.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--text-secondary)', padding: '4px 0' }}>
                      <Zap size={12} color={prog.color} /> {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
