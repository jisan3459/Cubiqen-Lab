import React, { useState } from 'react';
import { initialTeam } from '../data/initialData';
import { ShieldCheck, ArrowRight, Code2, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';

export default function TeamSection({ onOpenWizard }) {
  const [activeFounderIndex, setActiveFounderIndex] = useState(0);
  const currentFounder = initialTeam[activeFounderIndex] || initialTeam[0];

  return (
    <section id="team" className="founder-feature-section">
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">Founding Leadership</span>
          <h2 className="section-title">
            The minds engineering your infrastructure.
          </h2>
          <p className="section-desc">
            At Cubiqen Lab, you don't deal with outsourced contractors or junior project managers. Your project is architected and executed directly by our three founding partners.
          </p>
        </div>

        {/* Founder Selector Tabs (Switch between Shihab, Hasin, Jannatul) */}
        <div className="founder-tabs-bar">
          {initialTeam.map((member, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFounderIndex(idx)}
              className={`founder-tab-pill ${activeFounderIndex === idx ? 'active' : ''}`}
            >
              <img 
                src={member.avatar} 
                alt={member.name} 
                className="founder-tab-avatar"
              />
              <div className="founder-tab-info">
                <span className="founder-tab-name">{member.name}</span>
                <span className="founder-tab-role">{member.tag.split('&')[0]}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Main 2-Column Founder Showcase Card (Exact developwitharim.com Layout) */}
        <div className="founder-profile-card">
          
          {/* Left Column: Portrait with Layered Backdrop and Ambient Ring */}
          <div className="founder-portrait-column">
            <div className="founder-backdrop-card" />
            <div className="founder-accent-ring" />
            
            <div className="founder-portrait-frame">
              <img 
                src={currentFounder.avatar} 
                alt={currentFounder.name} 
                className="founder-portrait-image"
              />
              <div className="founder-portrait-badge">
                <span className="founder-badge-org">Cubiqen Lab</span>
                <span className="founder-badge-dot">•</span>
                <span className="founder-badge-tag">{currentFounder.tag.split('&')[1] || 'PARTNER'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Typography, Headline, Bio and CTA */}
          <div className="founder-content-column">
            
            {/* Tag Badge */}
            <span className="founder-kicker-tag">
              {currentFounder.tag}
            </span>

            {/* Founder Full Name */}
            <h3 className="founder-display-name">
              {currentFounder.name}
            </h3>

            {/* Standout Role / Headline Statement */}
            <p className="founder-headline-lead">
              {currentFounder.headline}
            </p>

            {/* Bio Narrative Paragraphs */}
            <div className="founder-narrative">
              {currentFounder.bioParagraphs.map((paragraph, pIdx) => (
                <p key={pIdx}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Technical Focus Badges */}
            <div className="founder-focus-pills">
              {currentFounder.focus.map((item, fIdx) => (
                <span key={fIdx} className="focus-pill-item">
                  <CheckCircle2 size={13} color="#b8860b" />
                  <span>{item}</span>
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <div style={{ marginTop: '2.5rem' }}>
              <button 
                onClick={onOpenWizard}
                className="founder-cta-black"
              >
                <span>Work with us</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>

        </div>

        {/* Founder Direct Access Guarantee Banner */}
        <div className="founder-guarantee-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ShieldCheck size={28} color="#b8860b" />
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                Direct Founder Involvement on Every Contract
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
                Shihab, Hasin, and Jannatul personally review specifications, code commits, and conversion milestones.
              </p>
            </div>
          </div>
          <button onClick={onOpenWizard} className="btn-secondary-ghost" style={{ fontSize: '0.85rem' }}>
            Schedule Founder Call
          </button>
        </div>

      </div>
    </section>
  );
}
