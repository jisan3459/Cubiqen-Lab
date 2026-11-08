import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight, Pause, Play, Zap } from 'lucide-react';

export default function LaptopShowcase({ projects, onOpenWizard }) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [lidAngle, setLidAngle] = useState(10); // degrees tilt
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPausedByUser, setIsPausedByUser] = useState(false);

  const displayProjects = projects && projects.length > 0 ? projects.slice(0, 5) : [];
  const currentProject = displayProjects[activeProjectIndex] || displayProjects[0];

  // Auto-advancing slideshow timer (5 seconds)
  useEffect(() => {
    if (!isAutoPlaying || isPausedByUser || displayProjects.length <= 1) return;

    const timer = setInterval(() => {
      setActiveProjectIndex((prev) => (prev + 1) % displayProjects.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isPausedByUser, displayProjects.length, activeProjectIndex]);

  const handlePrev = (e) => {
    e?.stopPropagation();
    setActiveProjectIndex((prev) => (prev === 0 ? displayProjects.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setActiveProjectIndex((prev) => (prev + 1) % displayProjects.length);
  };

  return (
    <section id="showcase-3d" className="laptop-showcase-section">
      <div className="container">
        <span className="section-tag">Interactive 3D Engineering Lab</span>
        <h2 className="section-title">
          Built to dominate. Crafted with zero compromise.
        </h2>
        <p className="section-desc">
          Every system we construct is engineered for commercial performance, clean maintainability, and effortless scaling across any screen or architecture.
        </p>

        {/* 3D Laptop Viewport with Slideshow */}
        <div 
          className="laptop-viewport-3d"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => { if (!isPausedByUser) setIsAutoPlaying(true); }}
        >
          {/* Slideshow Arrow: Prev */}
          <button 
            type="button"
            onClick={handlePrev}
            className="slideshow-arrow-btn arrow-prev"
            title="Previous project"
            aria-label="Previous Project"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Slideshow Arrow: Next */}
          <button 
            type="button"
            onClick={handleNext}
            className="slideshow-arrow-btn arrow-next"
            title="Next project"
            aria-label="Next Project"
          >
            <ChevronRight size={22} />
          </button>
          
          {/* Laptop Lid / Screen */}
          <div 
            className="laptop-lid" 
            style={{ 
              transform: `rotateX(${lidAngle}deg)`,
              transformOrigin: 'bottom center'
            }}
          >
            <div className="laptop-screen-glass">
              
              {/* Slideshow Slides Container with Crossfade Transition */}
              <div className="laptop-slides-track">
                {displayProjects.map((proj, idx) => (
                  <div
                    key={proj.id}
                    className={`laptop-slide-frame ${idx === activeProjectIndex ? 'slide-active' : ''}`}
                    style={{ backgroundImage: `url(${proj.image})` }}
                  >
                    {/* Dark gradient vignette for readability */}
                    <div className="slide-vignette-overlay" />
                  </div>
                ))}
              </div>

              {/* Screen Glass Glare reflection */}
              <div className="screen-glare"></div>

              {/* Dynamic Slideshow Progress Bar */}
              <div className="slideshow-progress-line">
                <div 
                  key={activeProjectIndex}
                  className={`progress-fill ${isAutoPlaying && !isPausedByUser ? 'progress-filling' : ''}`}
                />
              </div>

              {/* Live Screen Meta Overlay Card */}
              {currentProject && (
                <div className="screen-live-overlay">
                  <div>
                    <span className="screen-meta-badge">
                      <Zap size={14} color="#b8860b" />
                      {currentProject.category}
                    </span>
                    <h3 className="screen-meta-title">{currentProject.title}</h3>
                    <p style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.75)' }}>
                      {currentProject.metrics}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <a 
                      href={currentProject.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary-gold"
                      style={{ padding: '0.55rem 1.25rem', fontSize: '0.82rem' }}
                    >
                      <span>View Project</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Laptop Base / Keyboard Chassis */}
          <div className="laptop-base-chassis">
            <div className="laptop-notch"></div>
          </div>

        </div>

        {/* Project Selector Tabs + Slideshow Dots Controls */}
        <div className="laptop-project-selector">
          {displayProjects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => {
                setActiveProjectIndex(idx);
                setIsAutoPlaying(false);
              }}
              className={`laptop-tab-btn ${activeProjectIndex === idx ? 'active' : ''}`}
            >
              <span className="tab-dot" />
              {proj.category}: {proj.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Play / Pause Toggle & 3D Tilt Controls */}
        <div style={{ marginTop: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.75rem', flexWrap: 'wrap', fontSize: '0.82rem', color: 'var(--text-dim)' }}>
          
          <button
            type="button"
            onClick={() => {
              const newState = !isPausedByUser;
              setIsPausedByUser(newState);
              setIsAutoPlaying(!newState);
            }}
            className="slideshow-playback-toggle"
            title={isPausedByUser ? 'Resume Slideshow Auto-Play' : 'Pause Slideshow'}
          >
            {isPausedByUser ? <Play size={14} /> : <Pause size={14} />}
            <span>{isPausedByUser ? 'Play Slideshow' : 'Pause Slideshow'}</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span>Lid Perspective:</span>
            <input 
              type="range" 
              min="0" 
              max="28" 
              value={lidAngle} 
              onChange={(e) => setLidAngle(Number(e.target.value))}
              style={{ accentColor: '#b8860b', width: '110px', cursor: 'pointer' }}
            />
            <span style={{ fontFamily: 'var(--font-mono)', minWidth: '40px' }}>{lidAngle}° 3D</span>
          </div>

        </div>

      </div>
    </section>
  );
}
