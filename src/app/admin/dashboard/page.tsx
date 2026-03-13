'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Calendar, DollarSign, GitBranch, LogOut, Plus, Search, Edit, Trash2, Check, X, ChevronDown } from 'lucide-react';
import { mockStudents, mockBranches, mockAttendance, mockFees } from '@/lib/mockData';

type Tab = 'overview' | 'students' | 'attendance' | 'fees' | 'branches';

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('overview');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (localStorage.getItem('adminAuth') !== 'true') router.push('/admin/login');
  }, [router]);

  const handleLogout = () => { localStorage.removeItem('adminAuth'); router.push('/admin/login'); };

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: GitBranch },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'fees', label: 'Fees', icon: DollarSign },
    { id: 'branches', label: 'Branches', icon: GitBranch },
  ];

  const totalStudents = mockBranches.reduce((a, b) => a + b.students, 0);
  const pendingFees = Object.entries(mockFees).reduce((a, [, f]) => a + (f.total - f.paid), 0);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: 'var(--space-12)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 'var(--space-4)' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
          <div>
            <h1 style={{ fontSize: '2rem' }}>Admin <span className="gradient-text">Dashboard</span></h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Smart Wheels Academy Management</p>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '8px 16px', gap: 6 }}><LogOut size={14} /> Logout</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 'var(--space-1)', marginBottom: 'var(--space-5)', overflowX: 'auto', paddingBottom: 4, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', background: tab === t.id ? 'rgba(225,6,0,0.1)' : 'transparent',
              border: 'none', borderBottom: tab === t.id ? '2px solid var(--accent-red)' : '2px solid transparent',
              color: tab === t.id ? 'var(--text-primary)' : 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: '0.85rem',
              fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' as const
            }}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {tab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
              {[
                { label: 'Total Students', value: totalStudents, icon: Users, color: '#E10600' },
                { label: "Today's Attendance", value: `${Math.round(totalStudents * 0.78)}`, icon: Calendar, color: '#4CAF50' },
                { label: 'Pending Fees', value: `₹${pendingFees.toLocaleString()}`, icon: DollarSign, color: '#FFD400' },
                { label: 'Branches', value: mockBranches.length, icon: GitBranch, color: '#C0C0C0' },
              ].map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="card" style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 'var(--radius-lg)', background: `${m.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <m.icon size={24} color={m.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>{m.label}</div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--text-primary)' }}>{m.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Recent students table */}
            <div className="card" style={{ padding: 'var(--space-4)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', letterSpacing: '0.06em', marginBottom: 'var(--space-3)' }}>Recent Students</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr>
                  {['ID', 'Name', 'Branch', 'Coach', 'Batch'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' as const, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {mockStudents.map(s => (
                    <tr key={s.id}>
                      <td style={{ padding: '10px 8px', fontSize: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.03)', color: 'var(--accent-red)', fontWeight: 600 }}>{s.id}</td>
                      <td style={{ padding: '10px 8px', fontSize: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>{s.name}</td>
                      <td style={{ padding: '10px 8px', fontSize: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.03)', color: 'var(--text-muted)' }}>{s.branch}</td>
                      <td style={{ padding: '10px 8px', fontSize: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.03)', color: 'var(--text-muted)' }}>{s.coach}</td>
                      <td style={{ padding: '10px 8px', fontSize: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.03)', color: 'var(--text-muted)' }}>{s.batch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Students Tab */}
        {tab === 'students' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 1, maxWidth: 400 }}>
                <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input className="form-input" placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36 }} />
              </div>
              <button className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '8px 16px', gap: 6 }}><Plus size={14} /> Add Student</button>
            </div>
            <div className="card" style={{ padding: 'var(--space-4)', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
                <thead><tr>
                  {['ID', 'Name', 'Branch', 'Coach', 'Batch', 'Phone', 'Actions'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' as const, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {mockStudents.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase())).map(s => (
                    <tr key={s.id}>
                      <td style={{ padding: '10px 8px', fontSize: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.03)', color: 'var(--accent-red)', fontWeight: 600 }}>{s.id}</td>
                      <td style={{ padding: '10px 8px', fontSize: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>{s.name}</td>
                      <td style={{ padding: '10px 8px', fontSize: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.03)', color: 'var(--text-muted)' }}>{s.branch}</td>
                      <td style={{ padding: '10px 8px', fontSize: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.03)', color: 'var(--text-muted)' }}>{s.coach}</td>
                      <td style={{ padding: '10px 8px', fontSize: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.03)', color: 'var(--text-muted)' }}>{s.batch}</td>
                      <td style={{ padding: '10px 8px', fontSize: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.03)', color: 'var(--text-muted)' }}>{s.phone}</td>
                      <td style={{ padding: '10px 8px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button style={{ background: 'rgba(255,212,0,0.1)', border: 'none', color: '#FFD400', borderRadius: 'var(--radius-sm)', padding: '4px 8px', cursor: 'pointer' }}><Edit size={12} /></button>
                          <button style={{ background: 'rgba(225,6,0,0.1)', border: 'none', color: '#E10600', borderRadius: 'var(--radius-sm)', padding: '4px 8px', cursor: 'pointer' }}><Trash2 size={12} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Attendance Tab */}
        {tab === 'attendance' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
              <select className="form-input" style={{ maxWidth: 200 }}>
                <option>Select Branch</option>
                {mockBranches.map(b => <option key={b.id}>{b.name}</option>)}
              </select>
              <select className="form-input" style={{ maxWidth: 200 }}>
                <option>Select Batch</option>
                <option>Morning 6AM-8AM</option>
                <option>Evening 5PM-7PM</option>
              </select>
              <input className="form-input" type="date" style={{ maxWidth: 180 }} />
            </div>
            <div className="card" style={{ padding: 'var(--space-4)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', letterSpacing: '0.06em', marginBottom: 'var(--space-3)' }}>Mark Attendance</h3>
              {mockStudents.map(s => (
                <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-red), var(--accent-yellow))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 600 }}>{s.name.charAt(0)}</div>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{s.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.id}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button style={{ padding: '6px 14px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(76,175,80,0.3)', background: 'rgba(76,175,80,0.1)', color: '#4CAF50', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>Present</button>
                    <button style={{ padding: '6px 14px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(225,6,0,0.3)', background: 'rgba(225,6,0,0.1)', color: '#E10600', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>Absent</button>
                    <button style={{ padding: '6px 14px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,212,0,0.3)', background: 'rgba(255,212,0,0.1)', color: '#FFD400', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>Late</button>
                  </div>
                </div>
              ))}
              <button className="btn btn-primary" style={{ marginTop: 'var(--space-3)', width: '100%', fontSize: '0.85rem' }}>Save Attendance</button>
            </div>
          </motion.div>
        )}

        {/* Fees Tab */}
        {tab === 'fees' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="card" style={{ padding: 'var(--space-4)', overflowX: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', letterSpacing: '0.06em' }}>Fee Management</h3>
                <button className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '8px 16px', gap: 6 }}><Plus size={14} /> Add Payment</button>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
                <thead><tr>
                  {['Student', 'Total Fee', 'Paid', 'Balance', 'Status'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' as const, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {mockStudents.map(s => {
                    const f = mockFees[s.id] || { total: 0, paid: 0 };
                    const bal = f.total - f.paid;
                    return (
                      <tr key={s.id}>
                        <td style={{ padding: '10px 8px', fontSize: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.03)' }}><strong>{s.name}</strong> <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>({s.id})</span></td>
                        <td style={{ padding: '10px 8px', fontSize: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>₹{f.total.toLocaleString()}</td>
                        <td style={{ padding: '10px 8px', fontSize: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.03)', color: '#4CAF50' }}>₹{f.paid.toLocaleString()}</td>
                        <td style={{ padding: '10px 8px', fontSize: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.03)', color: bal > 0 ? '#E10600' : '#4CAF50' }}>₹{bal.toLocaleString()}</td>
                        <td style={{ padding: '10px 8px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                          <span style={{ padding: '3px 10px', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 600, background: bal === 0 ? 'rgba(76,175,80,0.15)' : 'rgba(225,6,0,0.15)', color: bal === 0 ? '#4CAF50' : '#E10600' }}>{bal === 0 ? 'PAID' : 'PENDING'}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Branches Tab */}
        {tab === 'branches' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-4)' }}>
              <button className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '8px 16px', gap: 6 }}><Plus size={14} /> Add Branch</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-3)' }}>
              {mockBranches.map((b, i) => (
                <motion.div key={b.id} className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} style={{ padding: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2)' }}>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', letterSpacing: '0.06em' }}>{b.name}</h4>
                    <button style={{ background: 'rgba(255,212,0,0.1)', border: 'none', color: '#FFD400', borderRadius: 'var(--radius-sm)', padding: '4px 8px', cursor: 'pointer' }}><Edit size={12} /></button>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 4 }}>{b.location}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 4 }}>{b.coach}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>{b.phone}</div>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', padding: 'var(--space-2) 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    <div><span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--accent-red)' }}>{b.students}</span><span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: 4 }}>Students</span></div>
                    <div><span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--accent-yellow)' }}>{b.batches.length}</span><span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: 4 }}>Batches</span></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
