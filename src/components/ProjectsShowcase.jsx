import React, { useState } from 'react';
import { ExternalLink, Star, MessageSquare, Plus, Trash2, Edit3, ArrowUpRight } from 'lucide-react';

export default function ProjectsShowcase({ 
  projects, 
  isAdmin, 
  onOpenAddProject, 
  onDeleteProject, 
  onOpenReviewModal 
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Full Stack Web', 'Mobile App', 'AI Agent', 'Automation', 'Thumbnail & Logo', 'Video Editing', 'Social Media Admin', 'Sales Audit'];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="work" style={{ padding: '7rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center' }}>
          <span className="section-tag">Proof of Competence</span>
          <h2 className="section-title">
            Featured Systems & Deployments
          </h2>
          <p className="section-desc">
            Explore commercial web applications, autonomous agent workflows, mobile ecosystems, and high-impact media engineered by Cubiqen Lab.
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}

          {/* Admin "Add Project" Button if Logged In */}
          {isAdmin && (
            <button
              onClick={onOpenAddProject}
              className="btn-primary-gold"
              style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem', marginLeft: 'auto' }}
            >
              <Plus size={16} />
              <span>Add New Project (Admin)</span>
            </button>
          )}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <article key={project.id} className="project-card">
              
              {/* Admin Overlay Controls */}
              {isAdmin && (
                <div className="admin-card-controls">
                  <button 
                    onClick={() => onDeleteProject(project.id)}
                    className="btn-admin-danger"
                    title="Delete Project (Admin)"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}

              {/* Cover Image */}
              <div className="project-image-wrapper">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-image"
                  loading="lazy"
                />
                <span className="project-card-badge">{project.category}</span>
              </div>

              {/* Card Body */}
              <div className="project-card-content">
                <span className="project-card-client">{project.client}</span>
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-desc">{project.description}</p>

                {/* Verified Metric Box */}
                {project.metrics && (
                  <div className="project-metrics-box">
                    <span>⚡ {project.metrics}</span>
                  </div>
                )}

                {/* Tech Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="tech-tag-pill">{tag}</span>
                  ))}
                </div>

                {/* Footer Actions & Review Trigger */}
                <div className="project-footer-actions">
                  <div className="project-stars">
                    <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
                    <span>{project.rating ? project.rating.toFixed(1) : '5.0'}</span>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', fontWeight: 500 }}>
                      ({project.reviewCount || 1})
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button 
                      onClick={() => onOpenReviewModal(project)}
                      className="btn-review-modal"
                      title="Rate or leave feedback for this project"
                    >
                      <MessageSquare size={13} style={{ display: 'inline', marginRight: '4px' }} />
                      <span>Review</span>
                    </button>

                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="nav-admin-btn"
                      title="Open Live Showcase"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>

              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
