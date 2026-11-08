import React from 'react';
import { Mail, Phone, ArrowUp, Lock, Facebook } from 'lucide-react';

export default function Footer({ onOpenAdmin, onOpenWizard }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        
        <div className="footer-grid">
          
          {/* Column 1: Brand & Bio */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <img 
                src="/Cubiqen_Lab.jpeg" 
                alt="Cubiqen Lab Logo" 
                style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--gold-primary)', objectFit: 'cover' }} 
              />
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--gold-light)', letterSpacing: '0.06em' }}>
                Cubiqen Lab
              </span>
            </div>
            
            <p className="footer-brand-desc">
              High-velocity engineering laboratory delivering full-stack web architectures, mobile apps, autonomous AI agent swarms, enterprise automation, and high-CTR visual media.
            </p>

            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem' }}>
              <a href="mailto:admin@cubiqenlab.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
                <Mail size={15} color="#b8860b" />
                <span>admin@cubiqenlab.com</span>
              </a>
              <a href="https://wa.me/8801518991960" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
                <Phone size={15} color="#b8860b" />
                <span>+880 1518 991960 (WhatsApp)</span>
              </a>
              <a href="https://www.facebook.com/cubiqenlab" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
                <Facebook size={15} color="#b8860b" />
                <span>facebook.com/cubiqenlab</span>
              </a>
            </div>
          </div>

          {/* Column 2: Core Services */}
          <div>
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-links-list">
              <li><a href="#services" className="footer-link">Full Stack Web</a></li>
              <li><a href="#services" className="footer-link">Mobile Apps (iOS/Android)</a></li>
              <li><a href="#services" className="footer-link">Autonomous AI Agents</a></li>
              <li><a href="#services" className="footer-link">Enterprise Automation</a></li>
              <li><a href="#services" className="footer-link">Thumbnails & Logo Design</a></li>
              <li><a href="#services" className="footer-link">High-Retention Video Editing</a></li>
              <li><a href="#services" className="footer-link">Social Media Admin</a></li>
              <li><a href="#services" className="footer-link">Sales & Conversion Audit</a></li>
            </ul>
          </div>

          {/* Column 3: Founders & Leadership */}
          <div>
            <h4 className="footer-col-title">Founding Team</h4>
            <ul className="footer-links-list">
              <li><a href="#team" className="footer-link">Shahriar Rahman Shihab (Full Stack/AI)</a></li>
              <li><a href="#team" className="footer-link">Hasin Al Jubaier (Mobile/Automation)</a></li>
              <li><a href="#team" className="footer-link">Jannatul Jisan (Creative Strategy)</a></li>
              <li><a href="#estimator" className="footer-link">System Audit & Estimator</a></li>
              <li><a href="#reviews" className="footer-link">Client Reviews & Wall</a></li>
            </ul>
          </div>

          {/* Column 4: Studio Portal */}
          <div>
            <h4 className="footer-col-title">Initiate & Manage</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
              Ready to construct your next system or manage active work?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button onClick={onOpenWizard} className="btn-primary-gold" style={{ fontSize: '0.84rem', justifyContent: 'center' }}>
                <span>Start a Project</span>
              </button>
              <button 
                onClick={onOpenAdmin} 
                className="btn-secondary-ghost" 
                style={{ fontSize: '0.84rem', justifyContent: 'center' }}
              >
                <Lock size={14} />
                <span>Admin CMS Portal</span>
              </button>
            </div>
          </div>

        </div>

        {/* Large Decorative Footer Brandmark */}
        <div style={{ textAlign: 'center', margin: '3rem 0 2rem', opacity: 0.08, pointerEvents: 'none' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 8vw, 6.5rem)', fontWeight: 800, letterSpacing: '0.12em', color: '#09090b' }}>
            CUBIQEN LAB
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} Cubiqen Lab. All engineering rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ color: 'var(--gold-dim)' }}>Engineered for Exponential Velocity</span>
            <button 
              onClick={scrollToTop} 
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem' }}
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
