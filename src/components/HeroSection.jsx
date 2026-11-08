import React from 'react';
import { ArrowRight, ArrowDown, Code2, Smartphone, Bot, Cpu, Sparkles, CheckCircle2, TrendingUp, Layers, Film, Share2 } from 'lucide-react';

export default function HeroSection({ onOpenWizard }) {
  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section">
      <div className="container" style={{ textAlign: 'center' }}>
        
        {/* Status Badge */}
        <div className="hero-badge" style={{ margin: '0 auto 1.5rem auto' }}>
          <span className="ping-dot">
            <span className="ping-dot-animate"></span>
            <span className="ping-dot-core"></span>
          </span>
          <span>Digital growth, end to end</span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-title" style={{ maxWidth: '1050px', margin: '0 auto 1.75rem auto' }}>
          We build the system behind your{' '}
          <span className="hero-gold-text">growth.</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle" style={{ maxWidth: '680px', margin: '0 auto 2.5rem auto' }}>
          One team for the whole path — from a customer's first search to the automated execution and measurable sale, with nothing handed off in between.
        </p>

        {/* Action Buttons */}
        <div className="hero-actions" style={{ justifyContent: 'center', marginBottom: '2.5rem' }}>
          <button onClick={onOpenWizard} className="btn-primary-gold" data-cursor="hover">
            <span>Start a Project</span>
            <ArrowRight size={18} />
          </button>
          
          <button onClick={scrollToWork} className="btn-secondary-ghost" data-cursor="hover">
            <span>See how it works</span>
            <ArrowDown size={16} />
          </button>
        </div>

        {/* Ticker / Service Highlights Bar */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div className="hero-ticker">
            <span className="ticker-item"><Code2 size={15} /> Web</span>
            <span style={{ color: 'var(--line-subtle)' }}>•</span>
            <span className="ticker-item"><Smartphone size={15} /> Mobile</span>
            <span style={{ color: 'var(--line-subtle)' }}>•</span>
            <span className="ticker-item"><Bot size={15} /> AI Agents</span>
            <span style={{ color: 'var(--line-subtle)' }}>•</span>
            <span className="ticker-item"><Cpu size={15} /> Automation</span>
            <span style={{ color: 'var(--line-subtle)' }}>•</span>
            <span className="ticker-item"><Sparkles size={15} /> Thumbnails & Logo</span>
            <span style={{ color: 'var(--line-subtle)' }}>•</span>
            <span className="ticker-item"><Film size={15} /> Video Editing</span>
            <span style={{ color: 'var(--line-subtle)' }}>•</span>
            <span className="ticker-item"><Share2 size={15} /> Social Admin</span>
            <span style={{ color: 'var(--line-subtle)' }}>•</span>
            <span className="ticker-item"><TrendingUp size={15} /> Sales Audit</span>
          </div>
        </div>

        {/* Quick Founder Trust Line */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-dim)', width: '100%' }}>
          <CheckCircle2 size={16} color="#b8860b" />
          <span>Founded by Shahriar Rahman Shihab, Md. Hasin Al Jubaier Bhuiyan & Jannatul Jisan</span>
        </div>

      </div>
    </section>
  );
}
