'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Branches', href: '/branches' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div className="navbar__inner">
        {/* Logo */}
        <Link href="/" className="navbar__logo">
          <div className="navbar__logo-icon">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" stroke="url(#logoGrad)" strokeWidth="3"/>
              <circle cx="20" cy="20" r="7" stroke="url(#logoGrad)" strokeWidth="2"/>
              <line x1="20" y1="2" x2="20" y2="13" stroke="#E10600" strokeWidth="2"/>
              <line x1="20" y1="27" x2="20" y2="38" stroke="#FFD400" strokeWidth="2"/>
              <line x1="2" y1="20" x2="13" y2="20" stroke="#E10600" strokeWidth="2"/>
              <line x1="27" y1="20" x2="38" y2="20" stroke="#FFD400" strokeWidth="2"/>
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40">
                  <stop stopColor="#E10600"/>
                  <stop offset="1" stopColor="#FFD400"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="navbar__logo-text">
            <span className="navbar__logo-title">Smart Wheels</span>
            <span className="navbar__logo-sub">Skating Academy</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="navbar__links">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="navbar__link">
              {link.name}
              <span className="navbar__link-underline" />
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="navbar__actions">
          <Link href="/student/login" className="navbar__portal-btn">
            Student Portal
          </Link>
          <Link href="/admin/login" className="btn btn-primary navbar__cta">
            Join Academy
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="navbar__mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="navbar__mobile-link"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <div className="navbar__mobile-actions">
              <Link href="/student/login" className="btn btn-secondary" style={{ width: '100%' }}>
                Student Portal
              </Link>
              <Link href="/admin/login" className="btn btn-primary" style={{ width: '100%' }}>
                Join Academy
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: var(--z-sticky);
          padding: var(--space-2) 0;
          transition: all var(--transition-base);
          background: transparent;
        }

        .navbar--scrolled {
          background: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: var(--space-1) 0;
        }

        .navbar__inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--space-4);
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }

        .navbar__logo {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          text-decoration: none;
        }

        .navbar__logo-icon svg {
          width: 40px;
          height: 40px;
        }

        .navbar__logo-text {
          display: flex;
          flex-direction: column;
        }

        .navbar__logo-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-primary);
          line-height: 1;
        }

        .navbar__logo-sub {
          font-size: 0.65rem;
          color: var(--accent-red);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 500;
        }

        .navbar__links {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .navbar__link {
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
          position: relative;
          padding: var(--space-1) 0;
          transition: color var(--transition-fast);
        }

        .navbar__link:hover {
          color: var(--text-primary);
        }

        .navbar__link-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--gradient-primary);
          transition: width var(--transition-base);
          border-radius: 1px;
        }

        .navbar__link:hover .navbar__link-underline {
          width: 100%;
        }

        .navbar__actions {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .navbar__portal-btn {
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-secondary);
          padding: var(--space-1) var(--space-2);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }

        .navbar__portal-btn:hover {
          color: var(--text-primary);
          border-color: var(--accent-red);
          box-shadow: 0 0 15px rgba(225,6,0,0.15);
        }

        .navbar__cta {
          font-size: 0.8rem;
          padding: var(--space-1) var(--space-3);
        }

        .navbar__mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: var(--space-1);
        }

        .navbar__mobile-menu {
          display: none;
          overflow: hidden;
          padding: var(--space-2) var(--space-4) var(--space-4);
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(20px);
        }

        .navbar__mobile-link {
          display: block;
          padding: var(--space-2) 0;
          font-size: 1rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: color var(--transition-fast);
        }

        .navbar__mobile-link:hover {
          color: var(--text-primary);
        }

        .navbar__mobile-actions {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          margin-top: var(--space-3);
        }

        @media (max-width: 1024px) {
          .navbar__links,
          .navbar__actions {
            display: none;
          }
          .navbar__mobile-toggle {
            display: block;
          }
          .navbar__mobile-menu {
            display: block;
          }
        }
      `}</style>
    </motion.header>
  );
}
