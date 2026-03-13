'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User } from 'lucide-react';
import { mockStudents } from '@/lib/mockData';

export default function StudentLogin() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const student = mockStudents.find(s => s.id === studentId && s.password === password);
    if (student) {
      localStorage.setItem('studentId', student.id);
      router.push('/student/dashboard');
    } else {
      setError('Invalid Student ID or Password');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', padding: 'var(--space-4)', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 30%, rgba(225,6,0,0.08), transparent 50%)' }} />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: 420, background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', position: 'relative', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-5)' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(225,6,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-3)' }}>
            <User size={28} color="var(--accent-red)" />
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', letterSpacing: '0.08em' }}>Student <span className="gradient-text">Portal</span></h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>Access your dashboard with your Student ID</p>
        </div>

        {error && (
          <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', background: 'rgba(225,6,0,0.15)', border: '1px solid rgba(225,6,0,0.3)', color: 'var(--accent-red)', fontSize: '0.8rem', textAlign: 'center', marginBottom: 'var(--space-3)' }}>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Student ID</label>
            <input className="form-input" type="text" placeholder="e.g. SW001" value={studentId} onChange={e => { setStudentId(e.target.value); setError(''); }} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="Enter password" value={password} onChange={e => { setPassword(e.target.value); setError(''); }} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: 'var(--space-2)', fontSize: '0.9rem', marginTop: 'var(--space-2)' }}>
            <Lock size={16} /> Login to Dashboard
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 'var(--space-3)' }}>
          Demo: ID = <strong style={{ color: 'var(--accent-yellow)' }}>SW001</strong>, Password = <strong style={{ color: 'var(--accent-yellow)' }}>pass123</strong>
        </p>
      </motion.div>
    </div>
  );
}
