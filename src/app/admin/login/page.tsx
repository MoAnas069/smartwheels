'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock } from 'lucide-react';
import { adminCredentials } from '@/lib/mockData';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === adminCredentials.username && password === adminCredentials.password) {
      localStorage.setItem('adminAuth', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', padding: 'var(--space-4)', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 30%, rgba(255,212,0,0.06), transparent 50%)' }} />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: 420, background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', position: 'relative', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-5)' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,212,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-3)' }}>
            <Shield size={28} color="var(--accent-yellow)" />
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', letterSpacing: '0.08em' }}>Admin <span className="gradient-text">Portal</span></h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>Academy management dashboard</p>
        </div>
        {error && <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', background: 'rgba(225,6,0,0.15)', border: '1px solid rgba(225,6,0,0.3)', color: 'var(--accent-red)', fontSize: '0.8rem', textAlign: 'center', marginBottom: 'var(--space-3)' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label className="form-label">Username</label><input className="form-input" type="text" placeholder="admin" value={username} onChange={e => { setUsername(e.target.value); setError(''); }} required /></div>
          <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" placeholder="Enter password" value={password} onChange={e => { setPassword(e.target.value); setError(''); }} required /></div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: 'var(--space-2)', fontSize: '0.9rem', marginTop: 'var(--space-2)' }}><Lock size={16} /> Login</button>
        </form>
        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 'var(--space-3)' }}>
          Demo: <strong style={{ color: 'var(--accent-yellow)' }}>admin</strong> / <strong style={{ color: 'var(--accent-yellow)' }}>admin123</strong>
        </p>
      </motion.div>
    </div>
  );
}
