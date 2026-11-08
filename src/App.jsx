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
import { ArrowRight, ShieldCheck, Check, Plus, LogOut } from 'lucide-react';

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

  // Ephemeral encrypted session storage (auto-clears on tab close)
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return sessionStorage.getItem('cubiqen_admin_auth') === 'verified';
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

  // Global secret shortcut Ctrl+Shift+A (or Cmd+Shift+A) to open Admin
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setAdminModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cubiqen_projects', JSON.stringify(projects));
    } catch (e) {}
  }, [projects]);

  // Save reviews to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cubiqen_reviews', JSON.stringify(reviews));
    } catch (e) {}
  }, [reviews]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  // Secure Admin Handlers
  const handleAdminLogin = () => {
    setIsAdmin(true);
    try {
      sessionStorage.setItem('cubiqen_admin_auth', 'verified');
    } catch (e) {}
    showToast('Authenticated: Welcome back, Cubiqen Lab Founding Team.');
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setAdminModalOpen(false);
    try {
      sessionStorage.removeItem('cubiqen_admin_auth');
    } catch (e) {}
    showToast('Secure Session Closed.');
  };

  const handleAddProject = (newProj) => {
    setProjects([newProj, ...projects]);
    showToast(`Project "${newProj.title}" published live to showcase!`);
  };

  const handleDeleteProject = (projId) => {
    if (window.confirm('Delete this project from your live showcase?')) {
      setProjects(projects.filter(p => p.id !== projId));
      showToast('Project removed from showcase.');
    }
  };

  const handleResetData = () => {
    if (window.confirm('Reset all showcase projects to factory default?')) {
      setProjects(initialProjects);
      showToast('Showcase restored to factory default.');
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

      {/* Admin Mode Active Banner */}
      {isAdmin && (
        <div className="admin-mode-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShieldCheck size={16} color="#b8860b" />
            <span style={{ fontWeight: 700, fontSize: '0.84rem' }}>
              ADMIN CMS ACTIVE • Real-time Portfolio Editor
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <button 
              type="button"
              onClick={() => setAdminModalOpen(true)}
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#ffffff',
                borderRadius: '6px',
                padding: '5px 12px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              + Add / Edit Projects
            </button>
            <button 
              type="button"
              onClick={handleAdminLogout}
              style={{
                background: '#ef4444',
                border: 'none',
                color: '#ffffff',
                borderRadius: '6px',
                padding: '5px 12px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      )}

      {/* Floating Pill Navigation */}
      <FloatingNav 
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
        onOpenWizard={() => scrollToWizard()}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Secure Cryptographic Admin CMS Modal */}
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
