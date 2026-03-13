'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Red accent line */}
      <div className="footer__accent-line" />

      <div className="container">
        <div className="footer__grid">
          {/* Brand Column */}
          <div className="footer__brand">
            <div className="footer__logo">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                <circle cx="20" cy="20" r="18" stroke="url(#fLogoGrad)" strokeWidth="3"/>
                <circle cx="20" cy="20" r="7" stroke="url(#fLogoGrad)" strokeWidth="2"/>
                <line x1="20" y1="2" x2="20" y2="13" stroke="#E10600" strokeWidth="2"/>
                <line x1="20" y1="27" x2="20" y2="38" stroke="#FFD400" strokeWidth="2"/>
                <line x1="2" y1="20" x2="13" y2="20" stroke="#E10600" strokeWidth="2"/>
                <line x1="27" y1="20" x2="38" y2="20" stroke="#FFD400" strokeWidth="2"/>
                <defs>
                  <linearGradient id="fLogoGrad" x1="0" y1="0" x2="40" y2="40">
                    <stop stopColor="#E10600"/>
                    <stop offset="1" stopColor="#FFD400"/>
                  </linearGradient>
                </defs>
              </svg>
              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', fontSize: '1.25rem' }}>
                  Smart Wheels
                </h4>
                <span style={{ fontSize: '0.65rem', color: 'var(--accent-red)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  Skating Academy
                </span>
              </div>
            </div>
            <p className="footer__tagline">
              Professional skating training for all ages. Building champions since 2014.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social-link" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" className="footer__social-link" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#" className="footer__social-link" aria-label="YouTube"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h5 className="footer__col-title">Quick Links</h5>
            <Link href="/about" className="footer__link">About Us</Link>
            <Link href="/branches" className="footer__link">Our Branches</Link>
            <Link href="/gallery" className="footer__link">Gallery</Link>
            <Link href="/contact" className="footer__link">Contact</Link>
          </div>

          {/* Programs */}
          <div className="footer__col">
            <h5 className="footer__col-title">Programs</h5>
            <Link href="/about#programs" className="footer__link">Beginner</Link>
            <Link href="/about#programs" className="footer__link">Intermediate</Link>
            <Link href="/about#programs" className="footer__link">Advanced</Link>
            <Link href="/about#programs" className="footer__link">Competition</Link>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h5 className="footer__col-title">Contact Us</h5>
            <a href="tel:+911234567890" className="footer__link footer__contact-link">
              <Phone size={14} />
              +91 123 456 7890
            </a>
            <a href="mailto:info@smartwheels.com" className="footer__link footer__contact-link">
              <Mail size={14} />
              info@smartwheels.com
            </a>
            <span className="footer__link footer__contact-link">
              <MapPin size={14} />
              Mumbai, India
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p>© {currentYear} Smart Wheels Skating Academy. All rights reserved.</p>
          <div className="footer__bottom-links">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--bg-secondary);
          position: relative;
          padding-top: var(--space-10);
          padding-bottom: var(--space-4);
        }

        .footer__accent-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--gradient-primary);
        }

        .footer__grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
          gap: var(--space-6);
          padding-bottom: var(--space-6);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .footer__logo {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          margin-bottom: var(--space-3);
        }

        .footer__tagline {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: var(--space-3);
        }

        .footer__socials {
          display: flex;
          gap: var(--space-2);
        }

        .footer__social-link {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .footer__social-link:hover {
          border-color: var(--accent-red);
          color: var(--accent-red);
          box-shadow: 0 0 15px rgba(225,6,0,0.2);
          transform: translateY(-2px);
        }

        .footer__col-title {
          font-family: var(--font-heading);
          font-size: 1rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-primary);
          margin-bottom: var(--space-3);
        }

        .footer__link {
          display: block;
          font-size: 0.875rem;
          color: var(--text-muted);
          padding: 6px 0;
          transition: all var(--transition-fast);
        }

        .footer__link:hover {
          color: var(--accent-red);
          padding-left: 8px;
        }

        .footer__contact-link {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer__bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: var(--space-4);
        }

        .footer__bottom p {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .footer__bottom-links {
          display: flex;
          gap: var(--space-3);
        }

        .footer__bottom-links a {
          font-size: 0.8rem;
          color: var(--text-muted);
          transition: color var(--transition-fast);
        }

        .footer__bottom-links a:hover {
          color: var(--accent-red);
        }

        @media (max-width: 1024px) {
          .footer__grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 640px) {
          .footer__grid {
            grid-template-columns: 1fr;
            gap: var(--space-4);
          }
          .footer__bottom {
            flex-direction: column;
            gap: var(--space-2);
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
