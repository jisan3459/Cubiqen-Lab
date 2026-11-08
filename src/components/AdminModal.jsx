import React, { useState } from 'react';
import { X, Lock, Unlock, Plus, Trash2, Download, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

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
  
  // New Project Form State
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

  const [activeTab, setActiveTab] = useState('add'); // 'add' | 'manage'

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (passcode === 'cubiqen2026' || passcode === 'admin') {
      onLogin();
      setErrorMsg('');
      setPasscode('');
    } else {
      setErrorMsg('Invalid Admin Passcode. Access denied.');
    }
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProject.title.trim() || !newProject.description.trim()) return;

    const tagsArray = newProject.tags
      ? newProject.tags.split(',').map(t => t.trim()).filter(Boolean)
      : ['Next.js', 'React', 'Cloud'];

    const projectPayload = {
      id: 'proj-' + Date.now(),
      title: newProject.title,
      category: newProject.category,
      client: newProject.client || 'Enterprise Client',
      description: newProject.description,
      metrics: newProject.metrics || 'High Performance Milestone',
      tags: tagsArray,
      image: newProject.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      demoUrl: newProject.demoUrl || 'https://github.com/cubiqenlab',
      featured: true,
      rating: 5.0,
      reviewCount: 1
    };

    onAddProject(projectPayload);

    // Reset form
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
      <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(230, 198, 135, 0.1)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-primary)' }}>
              {isAdmin ? <Unlock size={18} /> : <Lock size={18} />}
            </div>
            <div>
              <h3 className="modal-title">
                {isAdmin ? 'Admin Project CMS' : 'Admin Portal Login'}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                {isAdmin ? 'Active Session • Manage Showcases' : 'Access restricted to founding team'}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="btn-close-modal" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* IF NOT LOGGED IN: LOGIN FORM */}
        {!isAdmin ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="form-input-group">
              <label className="form-label">Admin Passcode</label>
              <input 
                type="password" 
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin passcode" 
                className="form-input" 
                autoFocus
                required
              />
            </div>

            {errorMsg && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f87171', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            <button type="submit" className="btn-primary-gold" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
              <Unlock size={16} />
              <span>Authenticate & Open CMS</span>
            </button>
          </form>
        ) : (
          /* IF LOGGED IN: CMS CONTROLS */
          <div>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', borderBottom: '1px solid var(--line-subtle)', paddingBottom: '0.75rem' }}>
              <button 
                onClick={() => setActiveTab('add')}
                className={`laptop-tab-btn ${activeTab === 'add' ? 'active' : ''}`}
                style={{ fontSize: '0.82rem', padding: '0.45rem 1rem' }}
              >
                <Plus size={14} style={{ display: 'inline', marginRight: '4px' }} />
                Add New Project
              </button>
              <button 
                onClick={() => setActiveTab('manage')}
                className={`laptop-tab-btn ${activeTab === 'manage' ? 'active' : ''}`}
                style={{ fontSize: '0.82rem', padding: '0.45rem 1rem' }}
              >
                Manage Existing ({projects.length})
              </button>
            </div>

            {/* TAB: ADD NEW PROJECT */}
            {activeTab === 'add' ? (
              <form onSubmit={handleCreateProject}>
                <div className="form-input-group">
                  <label className="form-label">Project Title *</label>
                  <input 
                    type="text" 
                    required
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="e.g. Genesis Health AI Agent & Web App" 
                    className="form-input" 
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-input-group">
                    <label className="form-label">Service Category</label>
                    <select 
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      className="form-input"
                    >
                      <option value="Full Stack Web">Full Stack Web</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="AI Agent">AI Agent</option>
                      <option value="Automation">Automation</option>
                      <option value="Thumbnail & Logo">Thumbnail & Logo</option>
                      <option value="Video Editing">Video Editing</option>
                      <option value="Social Media Admin">Social Media Admin</option>
                      <option value="Sales Audit">Sales Audit</option>
                    </select>
                  </div>

                  <div className="form-input-group">
                    <label className="form-label">Client / Brand</label>
                    <input 
                      type="text" 
                      value={newProject.client}
                      onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                      placeholder="e.g. Genesis Labs" 
                      className="form-input" 
                    />
                  </div>
                </div>

                <div className="form-input-group">
                  <label className="form-label">Impact Metric / Achievement</label>
                  <input 
                    type="text" 
                    value={newProject.metrics}
                    onChange={(e) => setNewProject({ ...newProject, metrics: e.target.value })}
                    placeholder="e.g. +340% Conversions • Sub-1s Latency" 
                    className="form-input" 
                  />
                </div>

                <div className="form-input-group">
                  <label className="form-label">Description & Architecture Highlights</label>
                  <textarea 
                    rows={3}
                    required
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Explain what was built, how it works, and key outcomes..." 
                    className="form-textarea"
                  ></textarea>
                </div>

                <div className="form-input-group">
                  <label className="form-label">Tags (comma-separated)</label>
                  <input 
                    type="text" 
                    value={newProject.tags}
                    onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                    placeholder="React, Next.js, LangChain, Flutter" 
                    className="form-input" 
                  />
                </div>

                <div className="form-input-group">
                  <label className="form-label">Project Image URL</label>
                  <input 
                    type="url" 
                    value={newProject.image}
                    onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..." 
                    className="form-input" 
                  />
                </div>

                <div className="form-input-group">
                  <label className="form-label">Demo / Case Study Link</label>
                  <input 
                    type="url" 
                    value={newProject.demoUrl}
                    onChange={(e) => setNewProject({ ...newProject, demoUrl: e.target.value })}
                    placeholder="https://github.com/cubiqenlab" 
                    className="form-input" 
                  />
                </div>

                <button type="submit" className="btn-primary-gold" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
                  <Plus size={16} />
                  <span>Publish Project to Showcase</span>
                </button>
              </form>
            ) : (
              /* TAB: MANAGE EXISTING */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '350px', overflowY: 'auto' }}>
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
                      onClick={() => onDeleteProject(p.id)}
                      className="btn-admin-danger"
                      title="Delete project"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Admin Utility Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', borderTop: '1px solid var(--line-subtle)', paddingTop: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={exportJSON} className="btn-secondary-ghost" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }} title="Download database as JSON">
                  <Download size={13} />
                  <span>Export JSON</span>
                </button>
                <button onClick={onResetData} className="btn-secondary-ghost" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }} title="Reset to sample projects">
                  <RefreshCw size={13} />
                  <span>Reset Data</span>
                </button>
              </div>

              <button 
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
