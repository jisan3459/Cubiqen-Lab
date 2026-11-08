import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, ArrowLeft, Check, Sparkles, Send, CheckCircle2 } from 'lucide-react';

export default function ProjectWizard({ initialSelectedService }) {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState(
    initialSelectedService ? [initialSelectedService] : ['Full Stack Web']
  );
  const [timeline, setTimeline] = useState('1 - 2 Months (Standard Production)');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const serviceOptions = [
    'Full Stack Web',
    'Mobile App (iOS/Android)',
    'Autonomous AI Agent',
    'Enterprise Automation',
    'High-CTR Thumbnails & Logo Design',
    'High-Retention Video Editing',
    'Social Media Administration',
    'Sales & Conversion Audit',
    'Full Digital Overhaul (All)'
  ];

  const timelineOptions = [
    'Immediate MVP (2 - 4 Weeks)',
    '1 - 2 Months (Standard Production)',
    '3+ Months (Enterprise Ecosystem)',
    'Flexible / Exploring Feasibility'
  ];

  const toggleService = (srv) => {
    if (selectedServices.includes(srv)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== srv));
      }
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Fire Confetti!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e6c687', '#f5e4c3', '#b8934b', '#38bdf8']
      });
    } catch (err) {
      // fallback
    }
  };

  return (
    <section id="wizard" style={{ padding: '7rem 0', position: 'relative' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">Guided Onboarding</span>
          <h2 className="section-title">
            Your next breakthrough starts here.
          </h2>
          <p className="section-desc">
            Tell us what you're aiming to build. We reply with a detailed technical breakdown, clear scope estimate, and honest feasibility within 24 hours.
          </p>
        </div>

        <div className="wizard-container">
          
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', animation: 'fadeIn 0.4s ease' }}>
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(230, 198, 135, 0.1)', border: '2px solid var(--gold-primary)', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-primary)' }}>
                <CheckCircle2 size={38} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                Inquiry Received by Cubiqen Lab
              </h3>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
                Thank you, <strong>{formData.name || 'Partner'}</strong>. Shahriar, Jubaier, and Jannatul will review your project requirements and respond with a comprehensive execution proposal.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <a 
                  href="https://wa.me/8801924500300" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary-gold"
                  style={{ fontSize: '0.9rem' }}
                >
                  <span>Chat on WhatsApp Directly</span>
                </a>
                <button 
                  onClick={() => { setSubmitted(false); setStep(1); }}
                  className="btn-secondary-ghost"
                  style={{ fontSize: '0.9rem' }}
                >
                  Submit Another Scope
                </button>
              </div>
            </div>
          ) : (
            <div>
              
              {/* Step Progress Bar */}
              <div className="wizard-steps-header">
                <div className={`wizard-step-bar ${step >= 1 ? 'active' : ''}`}></div>
                <div className={`wizard-step-bar ${step >= 2 ? 'active' : ''}`}></div>
                <div className={`wizard-step-bar ${step >= 3 ? 'active' : ''}`}></div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold-light)', marginLeft: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                  0{step} / 03
                </span>
              </div>

              {/* STEP 1: What do you need? */}
              {step === 1 && (
                <div style={{ animation: 'fadeIn 0.3s ease' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--gold-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Step 01: Core Architecture
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)', margin: '0.5rem 0 1rem' }}>
                    What services do you need from Cubiqen Lab?
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    Select all that apply to your current milestone.
                  </p>

                  <div className="wizard-pill-grid">
                    {serviceOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleService(opt)}
                        className={`wizard-choice-pill ${selectedServices.includes(opt) ? 'selected' : ''}`}
                      >
                        {selectedServices.includes(opt) && <Check size={14} style={{ display: 'inline', marginRight: '6px' }} />}
                        {opt}
                      </button>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2.5rem' }}>
                    <button onClick={handleNext} className="btn-primary-gold">
                      <span>Continue to Scope</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Timeline & Scope */}
              {step === 2 && (
                <div style={{ animation: 'fadeIn 0.3s ease' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--gold-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Step 02: Execution Velocity
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)', margin: '0.5rem 0 1rem' }}>
                    What is your target launch timeline?
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    Helps us allocate engineering sprints with Shihab, Hasin, and Jannatul.
                  </p>

                  <div className="wizard-pill-grid">
                    {timelineOptions.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setTimeline(time)}
                        className={`wizard-choice-pill ${timeline === time ? 'selected' : ''}`}
                      >
                        {timeline === time && <Check size={14} style={{ display: 'inline', marginRight: '6px' }} />}
                        {time}
                      </button>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem' }}>
                    <button onClick={handleBack} className="btn-secondary-ghost">
                      <ArrowLeft size={16} />
                      <span>Back</span>
                    </button>
                    <button onClick={handleNext} className="btn-primary-gold">
                      <span>Continue to Details</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Founder Contact & Brief */}
              {step === 3 && (
                <form onSubmit={handleSubmit} style={{ animation: 'fadeIn 0.3s ease' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--gold-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Step 03: Final Handshake
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)', margin: '0.5rem 0 1rem' }}>
                    Tell us about you & your project.
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
                    No automated bots. This reaches the founding team directly.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                    <div className="form-input-group">
                      <label className="form-label">Your Name</label>
                      <input 
                        type="text" 
                        required
                        maxLength={80}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan" 
                        className="form-input" 
                      />
                    </div>
                    <div className="form-input-group">
                      <label className="form-label">Work Email</label>
                      <input 
                        type="email" 
                        required
                        maxLength={120}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@yourcompany.com" 
                        className="form-input" 
                      />
                    </div>
                  </div>

                  <div className="form-input-group">
                    <label className="form-label">Company / Project Name</label>
                    <input 
                      type="text" 
                      maxLength={100}
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Nexus AI or Stealth Startup" 
                      className="form-input" 
                    />
                  </div>

                  <div className="form-input-group">
                    <label className="form-label">Brief Project Summary & Goals</label>
                    <textarea 
                      rows={3}
                      required
                      maxLength={800}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Share key requirements, existing tech stack, or challenges you're facing..." 
                      className="form-textarea"
                    ></textarea>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem' }}>
                    <button type="button" onClick={handleBack} className="btn-secondary-ghost">
                      <ArrowLeft size={16} />
                      <span>Back</span>
                    </button>
                    <button type="submit" className="btn-primary-gold">
                      <span>Submit Project Intake</span>
                      <Send size={16} />
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
