import React, { useState } from 'react';
import { Search, CheckCircle2, AlertTriangle, ArrowRight, Activity, Terminal, Shield, Sparkles } from 'lucide-react';

const auditCheckpoints = [
  {
    id: 'perf',
    title: 'Core Web Vitals & Microsecond Latency',
    category: 'Full Stack Web',
    detail: 'Evaluates Largest Contentful Paint (LCP), hydration bottlenecks, TTFB, and database indexing speeds.'
  },
  {
    id: 'mobile',
    title: 'Mobile Architecture & Offline Sync',
    category: 'Mobile App',
    detail: 'Checks cross-platform UI thread rendering, background token refresh, and edge caching.'
  },
  {
    id: 'agent',
    title: 'AI Agent & RAG Knowledge Retrieval',
    category: 'AI Agent',
    detail: 'Analyzes prompt token economics, vector embedding retrieval accuracy, and autonomous tool-calling guardrails.'
  },
  {
    id: 'auto',
    title: 'Enterprise Pipeline Automation Leaks',
    category: 'Automation',
    detail: 'Identifies repetitive manual tasks, CRM sync dropouts, and webhook error recovery loops.'
  },
  {
    id: 'ctr',
    title: 'Thumbnail Gaze Dynamics & Logo Scalability',
    category: 'Thumbnails & Logo',
    detail: 'Audits visual contrast, thumbnail click-through friction, vector clarity, and brand mark recall.'
  },
  {
    id: 'video',
    title: 'Pacing, Hook Retention & Watch-Time Dropoff',
    category: 'Video Editing',
    detail: 'Diagnoses intro retention drop-offs, sound design pacing, dynamic cuts, and 30-second audience drop rates.'
  },
  {
    id: 'social',
    title: 'Social Pipeline Scheduling & Algorithm Reach',
    category: 'Social Media Admin',
    detail: 'Evaluates publishing cadence, audience engagement ratios, hashtag distribution, and multi-platform reach.'
  },
  {
    id: 'sales',
    title: 'Funnel Friction, Drop-Off & Checkout Leakage',
    category: 'Sales Audit',
    detail: 'Forensic audit of sales page copy, checkout abandon rates, upsell conversion, and lead-to-close bottlenecks.'
  }
];

export default function AuditEstimator({ onOpenWizard }) {
  const [urlInput, setUrlInput] = useState('');
  const [selectedCheck, setSelectedCheck] = useState(auditCheckpoints[0]);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleScan = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    setScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setScanning(false);
      setScanResult({
        target: urlInput,
        score: 87,
        recommendation: 'Architecture is viable for immediate AI Agent & full-stack conversion overhaul. Estimated 3.4x speed and automation boost.',
        estimatedWeeks: '3 - 6 Weeks',
        bestStack: 'Next.js App Router + Autonomous Python Agents + n8n Cloud'
      });
    }, 1200);
  };

  return (
    <section id="estimator" style={{ padding: '7rem 0', background: '#f8fafc', borderTop: '1px solid var(--line-subtle)', borderBottom: '1px solid var(--line-subtle)' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">Interactive Diagnostics</span>
          <h2 className="section-title">
            Test what's holding your digital ecosystem back.
          </h2>
          <p className="section-desc">
            Before we talk about building, run a diagnostic on your current product or planned system. Our engineering benchmarks identify bottlenecks before they cost you revenue.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2.5rem', alignItems: 'stretch' }}>
          
          {/* Left Column: Interactive URL / Idea Scanner Form */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-gold)', borderRadius: '1.75rem', padding: '2.5rem', backdropFilter: 'blur(16px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--gold-primary)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              <Activity size={18} />
              <span>FREE ENGINEERING & FEASIBILITY AUDIT</span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
              Enter your website, repo, or idea concept.
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
              We evaluate your digital architecture across Web, Mobile, AI Agents, and Automation with zero sales friction.
            </p>

            <form onSubmit={handleScan} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="e.g. yourbrand.com or 'FinTech AI App'" 
                  className="form-input"
                  style={{ paddingLeft: '3rem' }}
                  required
                />
                <Search size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              </div>

              <button 
                type="submit" 
                disabled={scanning}
                className="btn-primary-gold" 
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {scanning ? 'Running System Scan...' : 'Analyze Architecture'}
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Scan Results Card */}
            {scanResult && (
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(230, 198, 135, 0.08)', border: '1px solid var(--border-gold)', borderRadius: '1rem', animation: 'fadeIn 0.3s ease' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--gold-light)' }}>Audit Score: {scanResult.score}/100</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <CheckCircle2 size={14} /> Ready for Build
                  </span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
                  {scanResult.recommendation}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-dim)', borderTop: '1px solid var(--line-subtle)', paddingTop: '0.75rem' }}>
                  <span>Est. Timeline: <strong style={{ color: 'var(--text-main)' }}>{scanResult.estimatedWeeks}</strong></span>
                  <button onClick={onOpenWizard} style={{ background: 'none', border: 'none', color: 'var(--gold-primary)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>
                    Turn Into Project →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: 5 System Checkpoints Breakdown */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--line-subtle)', borderRadius: '1.75rem', padding: '2.5rem', backdropFilter: 'blur(16px)' }}>
            <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
              What Cubiqen Lab Inspects
            </span>

            {/* Active Checkpoint Spotlight Box */}
            <div style={{ padding: '1.25rem', background: 'rgba(230, 198, 135, 0.07)', border: '1px solid var(--border-gold)', borderRadius: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-primary)', textTransform: 'uppercase' }}>
                {selectedCheck.category}
              </span>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', margin: '0.25rem 0 0.5rem' }}>
                {selectedCheck.title}
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {selectedCheck.detail}
              </p>
            </div>

            {/* Interactive Checkpoints List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {auditCheckpoints.map((cp) => (
                <button
                  key={cp.id}
                  onClick={() => setSelectedCheck(cp)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: '0.75rem',
                    background: selectedCheck.id === cp.id ? '#ffffff' : 'transparent',
                    border: '1px solid',
                    borderColor: selectedCheck.id === cp.id ? '#09090b' : 'transparent',
                    color: selectedCheck.id === cp.id ? '#09090b' : 'var(--text-muted)',
                    boxShadow: selectedCheck.id === cp.id ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{cp.title}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{cp.category}</span>
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
