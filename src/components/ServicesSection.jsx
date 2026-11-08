import React from 'react';
import { Globe, Smartphone, Bot, Cpu, Sparkles, Film, Share2, TrendingUp, Check, ArrowRight } from 'lucide-react';
import { initialServices } from '../data/initialData';

const iconMap = {
  Globe: Globe,
  Smartphone: Smartphone,
  Bot: Bot,
  Cpu: Cpu,
  Sparkles: Sparkles,
  Film: Film,
  Share2: Share2,
  TrendingUp: TrendingUp
};

export default function ServicesSection({ onSelectService }) {
  return (
    <section id="services" style={{ padding: '7rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">Core Capabilities</span>
          <h2 className="section-title">
            Eight disciplines. One unified execution standard.
          </h2>
          <p className="section-desc">
            We don't hand off between disconnected contractors. From web frontend and native apps to AI swarms, high-retention video editing, social administration, and sales audits, our team owns the whole pipeline.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {initialServices.map((service) => {
            const IconComponent = iconMap[service.icon] || Globe;
            return (
              <div key={service.id} className="service-card">
                <div>
                  <div className="service-icon-box">
                    <IconComponent size={28} />
                  </div>
                  
                  <span className="service-tagline">{service.tagline}</span>
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">{service.description}</p>

                  {/* Deliverables List */}
                  <ul className="service-deliverables-list">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="service-deliverable-item">
                        <Check size={16} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="service-tech-tags" style={{ marginBottom: '1.75rem' }}>
                    {service.tech.map((t, idx) => (
                      <span key={idx} className="tech-tag-pill">{t}</span>
                    ))}
                  </div>

                  {/* Inquiry CTA */}
                  <button 
                    onClick={() => onSelectService(service.title)}
                    className="btn-secondary-ghost"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.86rem' }}
                  >
                    <span>Request {service.title.split(' ')[0]} Proposal</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
