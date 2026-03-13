'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Calendar, DollarSign, TrendingUp, LogOut, MapPin, Clock, Award } from 'lucide-react';
import { mockStudents, mockAttendance, mockFees, mockSkills } from '@/lib/mockData';

export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState<typeof mockStudents[0] | null>(null);

  useEffect(() => {
    const id = localStorage.getItem('studentId');
    if (!id) { router.push('/student/login'); return; }
    const s = mockStudents.find(st => st.id === id);
    if (!s) { router.push('/student/login'); return; }
    setStudent(s);
  }, [router]);

  if (!student) return <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }} />;

  const attendance = mockAttendance[student.id] || [];
  const fees = mockFees[student.id] || { total: 0, paid: 0, payments: [] };
  const skills = mockSkills[student.id] || { speed: 0, balance: 0, technique: 0 };
  const feePercent = fees.total > 0 ? Math.round((fees.paid / fees.total) * 100) : 0;
  const presentCount = attendance.filter(a => a.status === 'present').length;
  const attendPercent = attendance.length > 0 ? Math.round((presentCount / attendance.length) * 100) : 0;

  const handleLogout = () => { localStorage.removeItem('studentId'); router.push('/student/login'); };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: 'var(--space-12)' }}>
      <div className="container" style={{ padding: 'var(--space-6) var(--space-4)' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
          <div>
            <h1 style={{ fontSize: '2rem' }}>Student <span className="gradient-text">Dashboard</span></h1>
            <p style={{ color: 'var(--text-muted)' }}>Welcome back, {student.name}</p>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '8px 16px', gap: 6 }}><LogOut size={14} /> Logout</button>
        </div>

        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-4)', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'var(--space-4)', alignItems: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-red), var(--accent-yellow))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontFamily: 'var(--font-heading)' }}>
            {student.name.charAt(0)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-2)' }}>
            {[
              { icon: User, label: 'Name', value: student.name },
              { icon: Award, label: 'Student ID', value: student.id },
              { icon: MapPin, label: 'Branch', value: student.branch },
              { icon: User, label: 'Coach', value: student.coach },
              { icon: Clock, label: 'Batch', value: student.batch },
            ].map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <d.icon size={14} color="var(--accent-red)" />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginRight: 4 }}>{d.label}:</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{d.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--space-4)' }}>
          {/* Attendance */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card" style={{ padding: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-3)' }}>
              <Calendar size={20} color="var(--accent-red)" />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', letterSpacing: '0.06em' }}>Attendance Records</h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', border: `3px solid ${attendPercent > 75 ? '#4CAF50' : 'var(--accent-red)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: attendPercent > 75 ? '#4CAF50' : 'var(--accent-red)' }}>
                {attendPercent}%
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Present: {presentCount}/{attendance.length} days</div>
                <div style={{ fontSize: '0.75rem', color: attendance.filter(a => a.status === 'late').length > 0 ? 'var(--accent-yellow)' : 'var(--text-muted)' }}>Late: {attendance.filter(a => a.status === 'late').length} days</div>
              </div>
            </div>
            <div style={{ maxHeight: 200, overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr>
                  <th style={{ textAlign: 'left', padding: '6px 8px', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' as const, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Date</th>
                  <th style={{ textAlign: 'right', padding: '6px 8px', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' as const, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Status</th>
                </tr></thead>
                <tbody>
                  {attendance.map((a, j) => (
                    <tr key={j}><td style={{ padding: '6px 8px', fontSize: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>{a.date}</td>
                    <td style={{ padding: '6px 8px', fontSize: '0.75rem', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <span style={{ padding: '2px 10px', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase' as const,
                        background: a.status === 'present' ? 'rgba(76,175,80,0.15)' : a.status === 'late' ? 'rgba(255,212,0,0.15)' : 'rgba(225,6,0,0.15)',
                        color: a.status === 'present' ? '#4CAF50' : a.status === 'late' ? '#FFD400' : '#E10600' }}>{a.status}</span>
                    </td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Fees */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card" style={{ padding: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-3)' }}>
              <DollarSign size={20} color="var(--accent-yellow)" />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', letterSpacing: '0.06em' }}>Fee Details</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              {[
                { label: 'Total', value: `₹${fees.total.toLocaleString()}`, color: 'var(--text-primary)' },
                { label: 'Paid', value: `₹${fees.paid.toLocaleString()}`, color: '#4CAF50' },
                { label: 'Balance', value: `₹${(fees.total - fees.paid).toLocaleString()}`, color: fees.total - fees.paid > 0 ? 'var(--accent-red)' : '#4CAF50' },
              ].map((f, i) => (
                <div key={i} style={{ textAlign: 'center', padding: 'var(--space-2)', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' as const, marginBottom: 4 }}>{f.label}</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: f.color }}>{f.value}</div>
                </div>
              ))}
            </div>
            {/* Progress bar */}
            <div style={{ marginBottom: 'var(--space-3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                <span>Payment Progress</span><span>{feePercent}%</span>
              </div>
              <div style={{ width: '100%', height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${feePercent}%` }} transition={{ duration: 1, ease: 'easeOut' }}
                  style={{ height: '100%', background: feePercent === 100 ? '#4CAF50' : 'var(--gradient-primary)', borderRadius: 'var(--radius-full)' }} />
              </div>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' as const, marginBottom: 8 }}>Payment History</div>
            {fees.payments.map((p, j) => (
              <div key={j} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.03)', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{p.date}</span>
                <span style={{ color: '#4CAF50' }}>₹{p.amount.toLocaleString()}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{p.method}</span>
              </div>
            ))}
          </motion.div>

          {/* Skill Progress */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card" style={{ padding: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-3)' }}>
              <TrendingUp size={20} color="var(--accent-silver)" />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', letterSpacing: '0.06em' }}>Skill Progress</h3>
            </div>
            {[
              { name: 'Speed', value: skills.speed, color: '#E10600' },
              { name: 'Balance', value: skills.balance, color: '#FFD400' },
              { name: 'Technique', value: skills.technique, color: '#4CAF50' },
            ].map((skill, i) => (
              <div key={i} style={{ marginBottom: 'var(--space-3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: 6 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{skill.name}</span>
                  <span style={{ color: skill.color, fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}>{skill.value}%</span>
                </div>
                <div style={{ width: '100%', height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${skill.value}%` }} transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: 'easeOut' }}
                    style={{ height: '100%', background: skill.color, borderRadius: 'var(--radius-full)', boxShadow: `0 0 10px ${skill.color}40` }} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
