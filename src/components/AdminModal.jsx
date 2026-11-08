import React, { useState, useEffect } from 'react';
import { 
  X, Lock, Unlock, Plus, Trash2, Download, RefreshCw, 
  AlertTriangle, ShieldCheck, CheckCircle2, ArrowRight, ExternalLink 
} from 'lucide-react';

// Cryptographic one-way SHA-256 hash with salt
// Plaintext password is NEVER stored in the code or bundle!
const AUTH_SALT = 'cubiqen-lab-salt-v1';
const VERIFIED_HASH = 'c98af55049f73c38a8579c54dad84cc6ad25b569d183716b00571c878821f76c';
const MAX_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 180;

async function computeSha256(input, salt) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input + ':' + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function AdminModal({
  isOpen,
  onClose,
  isAdmin,
  onLogin,
  onLogout,
  projects,
  onAddProject,
  onDeleteProject,
  onResetData
}) {
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);
  const [activeTab, setActiveTab] = useState('add'); // 'add' | 'manage'

  // New Project Form
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Full Stack Web',
    client: '',
    description: '',
    metrics: '',
    tags: '',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'https://github.com/cubiqenlab'
  });

  // Countdown timer for lockout
  useEffect(() => {
    if (lockoutRemaining <= 0) return;
    const timer = setInterval(() => {
      setLockoutRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setFailedAttempts(0);
          setErrorMsg('');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutRemaining]);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (lockoutRemaining > 0) return;

    setIsVerifying(true);
    setErrorMsg('');

    try {
      // Small artificial delay to prevent timing attacks
      await new Promise(r => setTimeout(r, 450));

      const inputHash = await computeSha256(passcode.trim(), AUTH_SALT);

      if (inputHash === VERIFIED_HASH) {
        onLogin();
        setPasscode('');
        setErrorMsg('');
        setFailedAttempts(0);
      } else {
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);

        if (nextAttempts >= MAX_ATTEMPTS) {
          setLockoutRemaining(LOCKOUT_SECONDS);
          setErrorMsg(`Security Lockout: Too many failed attempts. Try again in ${LOCKOUT_SECONDS}s.`);
        } else {
          setErrorMsg(`Authentication failed. ${MAX_ATTEMPTS - nextAttempts} attempt(s) remaining.`);
        }
      }
    } catch (err) {
      setErrorMsg('Cryptographic verification error.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProject.title.trim() || !newProject.description.trim()) return;

    // Validate image URL safely
    let safeImage = newProject.image.trim();
    if (!safeImage.startsWith('http://') && !safeImage.startsWith('https://') && !safeImage.startsWith('/')) {
      safeImage = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';
    }

    // Validate demo URL safely
    let safeDemo = newProject.demoUrl.trim();
    if (!safeDemo.startsWith('http://') && !safeDemo.startsWith('https://')) {
      safeDemo = 'https://' + safeDemo;
    }

    const tagsArray = newProject.tags
      ? newProject.tags.split(',').map(t => t.trim().slice(0, 30)).filter(Boolean)
      : ['Architecture', 'Production', 'High-Speed'];

    const projectPayload = {
      id: 'proj-' + Date.now(),
      title: newProject.title.trim().slice(0, 100),
      category: newProject.category,
      client: newProject.client.trim().slice(0, 60) || 'Enterprise Client',
      description: newProject.description.trim().slice(0, 600),
      metrics: newProject.metrics.trim().slice(0, 100) || 'High Performance Milestone',
      tags: tagsArray.slice(0, 6),
      image: safeImage,
      demoUrl: safeDemo,
      featured: true,
      rating: 5.0,
      reviewCount: 1
    };

    onAddProject(projectPayload);

    // Reset Form
    setNewProject({
      title: '',
      category: 'Full Stack Web',
      client: '',
      description: '',
      metrics: '',
      tags: '',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      demoUrl: 'https://github.com/cubiqenlab'
    });

    onClose();
  };

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projects, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `cubiqen_projects_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content-box" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: isAdmin ? '680px' : '440px', transition: 'all 0.3s ease' }}
      >
        
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ 
              width: '38px', 
              height: '38px', 
              borderRadius: '50%', 
              background: 'rgba(230, 198, 135, 0.12)', 
              border: '1px solid var(--border-gold)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: 'var(--gold-primary)' 
            }}>
              {isAdmin ? <ShieldCheck size={20} /> : <Lock size={18} />}
            </div>
            <div>
              <h3 className="modal-title">
                {isAdmin ? 'Project CMS & Showcase Manager' : 'Founders Studio Gateway'}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                {isAdmin ? 'Active Session • Changes reflect live for visitors' : 'Zero-knowledge cryptographic verification'}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="btn-close-modal" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* NOT LOGGED IN: SECURE ZERO-KNOWLEDGE LOGIN */}
        {!isAdmin ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="form-input-group">
              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Master Passphrase</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>SHA-256 Salted</span>
              </label>
              <input 
                type="password" 
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter authorized passphrase" 
                className="form-input" 
                disabled={lockoutRemaining > 0 || isVerifying}
                autoFocus
                required
              />
            </div>

            {errorMsg && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                color: '#f87171', 
                fontSize: '0.82rem', 
                marginBottom: '1.25rem',
                background: 'rgba(248, 113, 113, 0.1)',
                padding: '0.6rem 0.85rem',
                borderRadius: '8px',
                border: '1px solid rgba(248, 113, 113, 0.2)'
              }}>
                <AlertTriangle size={15} />
                <span>{errorMsg}</span>
              </div>
            )}

            <button 
              type="submit" 
              className="btn-primary-gold" 
              style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
              disabled={lockoutRemaining > 0 || isVerifying}
            >
              {isVerifying ? (
                <span>Verifying Cryptographic Hash...</span>
              ) : lockoutRemaining > 0 ? (
                <span>Locked ({lockoutRemaining}s remaining)</span>
              ) : (
                <>
                  <Unlock size={16} />
                  <span>Authenticate Session</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* LOGGED IN: PROJECT CMS */
          <div>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--line-subtle)', paddingBottom: '0.75rem' }}>
              <button 
                type="button"
                onClick={() => setActiveTab('add')}
                className={`laptop-tab-btn ${activeTab === 'add' ? 'active' : ''}`}
                style={{ fontSize: '0.82rem', padding: '0.45rem 1rem' }}
              >
                <Plus size={14} style={{ display: 'inline', marginRight: '4px' }} />
                Add New Project
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('manage')}
                className={`laptop-tab-btn ${activeTab === 'manage' ? 'active' : ''}`}
                style={{ fontSize: '0.82rem', padding: '0.45rem 1rem' }}
              >
                Manage Portfolio ({projects.length})
              </button>
            </div>

            {/* TAB: ADD NEW PROJECT */}
            {activeTab === 'add' ? (
              <form onSubmit={handleCreateProject}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
                  <div className="form-input-group">
                    <label className="form-label">Project Title *</label>
                    <input 
                      type="text" 
                      required
                      maxLength={100}
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      placeholder="e.g. Nexus FinTech Dashboard" 
                      className="form-input" 
                    />
                  </div>

                  <div className="form-input-group">
                    <label className="form-label">Category</label>
                    <select 
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      className="form-input"
                    >
                      <option value="Full Stack Web">Full Stack Web</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="AI Agent">AI Agent</option>
                      <option value="Automation">Enterprise Automation</option>
                      <option value="Thumbnail & Logo">Thumbnail & Logo</option>
                      <option value="Video Editing">Video Editing</option>
                      <option value="Social Media Admin">Social Media Admin</option>
                      <option value="Sales Audit">Sales & Conversion Audit</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-input-group">
                    <label className="form-label">Client Name / Brand</label>
                    <input 
                      type="text" 
                      maxLength={60}
                      value={newProject.client}
                      onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                      placeholder="e.g. Apex Global Markets" 
                      className="form-input" 
                    />
                  </div>

                  <div className="form-input-group">
                    <label className="form-label">Key Metric / Result</label>
                    <input 
                      type="text" 
                      maxLength={80}
                      value={newProject.metrics}
                      onChange={(e) => setNewProject({ ...newProject, metrics: e.target.value })}
                      placeholder="e.g. +310% MRR Growth, 0.4s LCP" 
                      className="form-input" 
                    />
                  </div>
                </div>

                <div className="form-input-group">
                  <label className="form-label">Detailed Case Study Description *</label>
                  <textarea 
                    rows={3}
                    required
                    maxLength={600}
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Describe what was built, engineering challenges resolved, and the commercial impact for the client..." 
                    className="form-textarea"
                  ></textarea>
                </div>

                <div className="form-input-group">
                  <label className="form-label">Tags (comma-separated)</label>
                  <input 
                    type="text" 
                    value={newProject.tags}
                    onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                    placeholder="React, Next.js, Node.js, PostgreSQL" 
                    className="form-input" 
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-input-group">
                    <label className="form-label">Cover Image URL</label>
                    <input 
                      type="text" 
                      value={newProject.image}
                      onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..." 
                      className="form-input" 
                    />
                  </div>

                  <div className="form-input-group">
                    <label className="form-label">Demo / Case Study Link</label>
                    <input 
                      type="text" 
                      value={newProject.demoUrl}
                      onChange={(e) => setNewProject({ ...newProject, demoUrl: e.target.value })}
                      placeholder="https://github.com/cubiqenlab" 
                      className="form-input" 
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary-gold" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
                  <Plus size={16} />
                  <span>Publish Project to Customer Showcase</span>
                </button>
              </form>
            ) : (
              /* TAB: MANAGE EXISTING */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '340px', overflowY: 'auto' }}>
                {projects.map((p) => (
                  <div 
                    key={p.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      background: '#f8fafc',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--line-subtle)'
                    }}
                  >
                    <div style={{ maxWidth: '80%' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--gold-primary)', fontWeight: 700 }}>{p.category}</span>
                      <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', margin: '2px 0' }}>{p.title}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Client: {p.client}</span>
                    </div>

                    <button 
                      type="button"
                      onClick={() => onDeleteProject(p.id)}
                      className="btn-admin-danger"
                      title="Delete project from showcase"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Admin Utility Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.75rem', borderTop: '1px solid var(--line-subtle)', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="button" onClick={exportJSON} className="btn-secondary-ghost" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }} title="Download database as JSON">
                  <Download size={13} />
                  <span>Export JSON</span>
                </button>
                <button type="button" onClick={onResetData} className="btn-secondary-ghost" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }} title="Reset to sample projects">
                  <RefreshCw size={13} />
                  <span>Reset Defaults</span>
                </button>
              </div>

              <button 
                type="button"
                onClick={onLogout} 
                style={{ background: 'transparent', border: 'none', color: '#f87171', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
              >
                Lock & Log Out
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
