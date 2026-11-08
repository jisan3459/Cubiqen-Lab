import React, { useState } from 'react';
import { ShieldCheck, Menu, X, ArrowRight, Lock, Unlock, Sparkles } from 'lucide-react';

export default function FloatingNav({ isAdmin, onOpenAdmin, onOpenWizard }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="floating-nav-container">
        <nav className="floating-nav-pill" aria-label="Main Navigation">
          {/* Brand Lockup with Logo */}
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }} className="nav-brand-lockup">
            <img 
              src="/Cubiqen_Lab.jpeg" 
              alt="Cubiqen Lab Logo" 
              className="nav-logo-mark"
            />
            <span className="nav-brand-text">Cubiqen Lab</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="nav-links-wrapper">
            <button onClick={() => scrollTo('services')} className="nav-pill-item">Services</button>
            <button onClick={() => scrollTo('showcase-3d')} className="nav-pill-item">3D Lab</button>
            <button onClick={() => scrollTo('work')} className="nav-pill-item">Work</button>
            <button onClick={() => scrollTo('team')} className="nav-pill-item">Founders</button>
            <button onClick={() => scrollTo('reviews')} className="nav-pill-item">Reviews</button>
            <button onClick={() => scrollTo('estimator')} className="nav-pill-item">Audit & Estimator</button>
          </div>

          {/* Admin Access Button */}
          <button 
            onClick={onOpenAdmin} 
            className="nav-admin-btn"
            title={isAdmin ? "Admin Mode Active (Click to manage)" : "Admin Portal Login"}
            aria-label="Admin Portal"
          >
            {isAdmin ? <Unlock size={16} color="#e6c687" /> : <Lock size={16} />}
          </button>

          {/* Primary CTA */}
          <button onClick={onOpenWizard} className="nav-cta-button">
            <span>Start a Project</span>
            <ArrowRight size={14} />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="mobile-menu-toggle"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-nav-drawer">
          <button onClick={() => scrollTo('services')} className="mobile-nav-link">Our Services</button>
          <button onClick={() => scrollTo('showcase-3d')} className="mobile-nav-link">3D Interactive Lab</button>
          <button onClick={() => scrollTo('work')} className="mobile-nav-link">Featured Work & Projects</button>
          <button onClick={() => scrollTo('team')} className="mobile-nav-link">Founding Team</button>
          <button onClick={() => scrollTo('reviews')} className="mobile-nav-link">Customer Ratings & Reviews</button>
          <button onClick={() => scrollTo('estimator')} className="mobile-nav-link">Cost & Tech Estimator</button>
          <button 
            onClick={() => { setMobileOpen(false); onOpenAdmin(); }} 
            className="mobile-nav-link"
            style={{ color: '#e6c687', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Lock size={16} />
            <span>{isAdmin ? "Admin Dashboard (Active)" : "Admin Login Portal"}</span>
          </button>
          <button 
            onClick={() => { setMobileOpen(false); onOpenWizard(); }} 
            className="btn-primary-gold"
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
          >
            <span>Start a Project</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </>
  );
}
