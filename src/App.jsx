import React, { useState, useEffect } from 'react';
import FloatingNav from './components/FloatingNav';
import HeroSection from './components/HeroSection';
import LaptopShowcase from './components/LaptopShowcase';
import ServicesSection from './components/ServicesSection';
import ProjectsShowcase from './components/ProjectsShowcase';
import TeamSection from './components/TeamSection';
import AuditEstimator from './components/AuditEstimator';
import ReviewsSection from './components/ReviewsSection';
import ProjectWizard from './components/ProjectWizard';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';
import ReviewModal from './components/ReviewModal';
import CustomCursor from './components/CustomCursor';
import { initialProjects, initialReviews } from './data/initialData';
import { ArrowRight, Shield, Check, Unlock } from 'lucide-react';

export default function App() {
  // Persistence for Projects
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('cubiqen_projects');
      return saved ? JSON.parse(saved) : initialProjects;
    } catch (e) {
      return initialProjects;
    }
  });

  // Persistence for Reviews
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('cubiqen_reviews');
      return saved ? JSON.parse(saved) : initialReviews;
    } catch (e) {
      return initialReviews;
    }
  });

  // Admin authentication state
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem('cubiqen_admin_logged') === 'true';
    } catch (e) {
      return false;
    }
  });

  // Modal states
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewTargetProject, setReviewTargetProject] = useState(null);
  const [wizardService, setWizardService] = useState(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState('');

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem('cubiqen_projects', JSON.stringify(projects));
    } catch (e) {}
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('cubiqen_reviews', JSON.stringify(reviews));
    } catch (e) {}
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('cubiqen_admin_logged', isAdmin ? 'true' : 'false');
    } catch (e) {}
  }, [isAdmin]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  // Handlers for Admin actions
  const handleAdminLogin = () => {
    setIsAdmin(true);
    showToast('Admin Mode Enabled: You can now add and manage projects.');
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setAdminModalOpen(false);
    showToast('Admin Session Ended.');
  };

  const handleAddProject = (newProj) => {
    setProjects([newProj, ...projects]);
    showToast(`Project "${newProj.title}" successfully added to showcase!`);
  };

  const handleDeleteProject = (projId) => {
    if (window.confirm('Are you sure you want to delete this project from the showcase?')) {
      setProjects(projects.filter(p => p.id !== projId));
      showToast('Project removed from showcase.');
    }
  };

  const handleResetData = () => {
    if (window.confirm('Reset all projects and reviews to factory default showcase?')) {
      setProjects(initialProjects);
      setReviews(initialReviews);
      showToast('Database reset to defaults.');
    }
  };

  // Handler for Customer Review submission
  const handleAddReview = (newReview) => {
    setReviews([newReview, ...reviews]);

    // Update target project review count & recalculate rating
    if (newReview.projectId && newReview.projectId !== 'general') {
      setProjects(prevProjects => 
        prevProjects.map(p => {
          if (p.id === newReview.projectId) {
            const newCount = (p.reviewCount || 1) + 1;
            const newRating = Number(((p.rating * (newCount - 1) + newReview.rating) / newCount).toFixed(1));
            return {
              ...p,
              rating: newRating,
              reviewCount: newCount
            };
          }
          return p;
        })
      );
    }

    showToast('Thank you! Your review has been published on Cubiqen Lab.');
  };

  const openReviewModalForProject = (project) => {
    setReviewTargetProject(project);
    setReviewModalOpen(true);
  };

  const scrollToWizard = (serviceName = null) => {
    setWizardService(serviceName);
    const el = document.getElementById('wizard');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      
      {/* Precision Viewfinder & Target Reticle (developwitharim.com style) */}
      <CustomCursor />

      {/* Dynamic Ambient Background Mesh */}
      <div className="ambient-glow-wrapper">
        <div className="ambient-orb ambient-orb-1"></div>
        <div className="ambient-orb ambient-orb-2"></div>
        <div className="ambient-orb ambient-orb-3"></div>
      </div>
      <div className="mesh-grid-overlay"></div>

      {/* Admin Mode Active Indicator Banner */}
      {isAdmin && (
        <div className="admin-mode-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Unlock size={15} color="#b8860b" />
            <span>ADMIN MODE ACTIVE • Real-time CMS Enabled</span>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setAdminModalOpen(true);
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                borderRadius: '6px',
                padding: '6px 14px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
            >
              Open CMS
            </button>
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleAdminLogout();
              }}
              style={{
                background: '#ef4444',
                border: 'none',
                color: '#ffffff',
                borderRadius: '6px',
                padding: '6px 14px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#dc2626'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#ef4444'; }}
            >
              Log Out
            </button>
          </div>
        </div>
      )}

      {/* Floating Pill Navigation */}
      <FloatingNav 
        isAdmin={isAdmin}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenWizard={() => scrollToWizard()}
      />

      {/* Main Content Sections */}
      <main>
        <HeroSection onOpenWizard={() => scrollToWizard()} />
        
        <LaptopShowcase 
          projects={projects} 
          onOpenWizard={() => scrollToWizard()} 
        />
        
        <ServicesSection 
          onSelectService={(serviceTitle) => scrollToWizard(serviceTitle)} 
        />
        
        <ProjectsShowcase 
          projects={projects}
          isAdmin={isAdmin}
          onOpenAddProject={() => setAdminModalOpen(true)}
          onDeleteProject={handleDeleteProject}
          onOpenReviewModal={openReviewModalForProject}
        />
        
        <TeamSection onOpenWizard={() => scrollToWizard()} />
        
        <AuditEstimator onOpenWizard={() => scrollToWizard()} />
        
        <ReviewsSection 
          reviews={reviews}
          onOpenReviewModal={openReviewModalForProject}
        />
        
        <ProjectWizard initialSelectedService={wizardService} />
      </main>

      {/* Footer */}
      <Footer 
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenWizard={() => scrollToWizard()}
      />

      {/* Admin Modal */}
      <AdminModal 
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        isAdmin={isAdmin}
        onLogin={handleAdminLogin}
        onLogout={handleAdminLogout}
        projects={projects}
        onAddProject={handleAddProject}
        onDeleteProject={handleDeleteProject}
        onResetData={handleResetData}
      />

      {/* Customer Review Modal */}
      <ReviewModal 
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        targetProject={reviewTargetProject}
        projects={projects}
        onAddReview={handleAddReview}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#09090b',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: '#ffffff',
          padding: '0.85rem 1.75rem',
          borderRadius: '9999px',
          boxShadow: 'var(--shadow-luxe)',
          zIndex: 2000,
          fontFamily: 'var(--font-display)',
          fontSize: '0.88rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          animation: 'slideDown 0.3s ease'
        }}>
          <Check size={16} color="#ffffff" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Quick Floating CTA Pinned to Bottom Right */}
      <button 
        onClick={() => scrollToWizard()}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 90,
          background: '#09090b',
          border: 'none',
          borderRadius: '9999px',
          padding: '0.75rem 1.4rem',
          color: '#ffffff',
          fontFamily: 'var(--font-display)',
          fontSize: '0.86rem',
          fontWeight: 700,
          letterSpacing: '0.04em',
          cursor: 'pointer',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
      >
        <span>Start a Project</span>
        <ArrowRight size={15} />
      </button>

    </div>
  );
}
