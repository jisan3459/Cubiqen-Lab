import React, { useState } from 'react';
import { X, Star, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReviewModal({ isOpen, onClose, targetProject, projects, onAddReview }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [comment, setComment] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState(targetProject ? targetProject.id : (projects[0]?.id || ''));
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const chosenProj = projects.find(p => p.id === selectedProjectId);

    const reviewPayload = {
      id: 'rev-' + Date.now(),
      projectId: selectedProjectId,
      projectName: chosenProj ? chosenProj.title : 'General Studio Engagement',
      author: author.trim(),
      role: role.trim() || 'Verified Client',
      rating: rating,
      comment: comment.trim(),
      date: 'Just now',
      verified: true
    };

    onAddReview(reviewPayload);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#e6c687', '#fbbf24', '#38bdf8']
      });
    } catch (e) {}

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(230, 198, 135, 0.1)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-primary)' }}>
              <MessageSquare size={18} />
            </div>
            <div>
              <h3 className="modal-title">Rate & Review Work</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                Your feedback is published directly on the Cubiqen Lab wall
              </p>
            </div>
          </div>

          <button onClick={onClose} className="btn-close-modal" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle2 size={48} color="#e6c687" style={{ margin: '0 auto 1rem' }} />
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Review Published!
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Thank you for reviewing Cubiqen Lab. Your rating has been recorded and updated live.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            
            {/* Interactive Star Rating Selector */}
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <span className="form-label" style={{ display: 'block', marginBottom: '0.75rem' }}>
                Your Overall Rating
              </span>
              <div 
                className="star-rating-selector" 
                style={{ justifyContent: 'center' }}
                onMouseLeave={() => setHoverRating(0)}
              >
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={32}
                    onClick={() => setRating(s)}
                    onMouseEnter={() => setHoverRating(s)}
                    fill={(hoverRating || rating) >= s ? '#fbbf24' : 'none'}
                    stroke={(hoverRating || rating) >= s ? '#fbbf24' : 'rgba(255,255,255,0.2)'}
                  />
                ))}
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--gold-light)', fontWeight: 600 }}>
                {rating === 5 ? 'Exceptional (5/5 Stars)' : `${rating} Stars`}
              </span>
            </div>

            {/* Target Project Dropdown */}
            <div className="form-input-group">
              <label className="form-label">Associated Work / Project</label>
              <select 
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="form-input"
              >
                <option value="general">General Studio Engagement / Multiple Services</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.category})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-input-group">
                <label className="form-label">Your Name *</label>
                <input 
                  type="text" 
                  required
                  maxLength={80}
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Sarah Jenkins" 
                  className="form-input" 
                />
              </div>

              <div className="form-input-group">
                <label className="form-label">Role / Company</label>
                <input 
                  type="text" 
                  maxLength={100}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Founder, FinTech Corp" 
                  className="form-input" 
                />
              </div>
            </div>

            <div className="form-input-group">
              <label className="form-label">Your Review & Experience *</label>
              <textarea 
                rows={3}
                required
                maxLength={600}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was your experience working with Shihab, Jubaier, and Jannatul? What results did you achieve?" 
                className="form-textarea"
              ></textarea>
            </div>

            <button type="submit" className="btn-primary-gold" style={{ width: '100%', justifyContent: 'center', marginTop: '1.25rem' }}>
              <Send size={16} />
              <span>Submit & Publish Review</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
