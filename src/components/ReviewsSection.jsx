import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, Quote, Sparkles } from 'lucide-react';

export default function ReviewsSection({ reviews, onOpenReviewModal }) {
  const [filterRating, setFilterRating] = useState(0);

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  const filteredReviews = filterRating === 0 
    ? reviews 
    : reviews.filter(r => r.rating === filterRating);

  return (
    <section id="reviews" style={{ padding: '7rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">Client Testimonials</span>
          <h2 className="section-title">
            Commercial Outcomes & Verified Client Reviews
          </h2>
          <p className="section-desc">
            Direct feedback from founders, CTOs, and creators who partnered with Cubiqen Lab to engineer their digital products and growth engines.
          </p>
        </div>

        {/* Reviews Summary Stats Bar */}
        <div className="reviews-summary-bar">
          <div className="reviews-score-block">
            <span className="score-number">{averageRating}</span>
            <div>
              <div style={{ display: 'flex', gap: '0.25rem', color: '#fbbf24', marginBottom: '0.25rem' }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={20} fill="#fbbf24" stroke="#fbbf24" />
                ))}
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Based on <strong>{reviews.length} verified engagements</strong>
              </p>
            </div>
          </div>

          {/* Action to leave a review */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => onOpenReviewModal(null)} 
              className="btn-primary-gold"
              style={{ fontSize: '0.88rem', padding: '0.75rem 1.75rem' }}
            >
              <MessageSquarePlus size={16} />
              <span>Leave a Review / Comment</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {filteredReviews.map((rev) => (
            <div key={rev.id} className="review-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div className="review-rating-stars">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#fbbf24" stroke="#fbbf24" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{rev.date}</span>
                </div>

                <p className="review-comment">
                  "{rev.comment}"
                </p>

                {rev.projectName && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', fontWeight: 600, marginBottom: '1rem' }}>
                    Project: {rev.projectName}
                  </div>
                )}
              </div>

              <div className="review-author-meta">
                <div>
                  <h4 className="review-author-name">{rev.author}</h4>
                  <span className="review-author-role">{rev.role}</span>
                </div>
                {rev.verified && (
                  <span className="verified-badge">
                    <CheckCircle2 size={13} />
                    <span>Verified Client</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
