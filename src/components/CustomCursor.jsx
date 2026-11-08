import React, { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor - Exact 1:1 Implementation of developwitharim.com pointer mechanics
 * 
 * Key Principles to ensure 100% responsiveness and zero annoyance:
 * 1. ZERO delay: Direct mouse tracking via clientX/clientY + translate3d(-50%, -50%, 0)
 *    so the center dot is EXACTLY under the mouse tip at all times.
 * 2. pointer-events: none on ALL elements to guarantee every button/link clicks instantly without obstruction.
 * 3. Dynamic morphing between:
 *    - 'viewfinder': 4-corner targeting brackets [ · ] with subtle pulse
 *    - 'target': circular rotating radar ring with concentric targeting ring
 *    - 'hover': expanded focus bracket over buttons/links/actions
 *    - 'card': inspection bracket with floating badge (e.g. INSPECT, 3D LAB)
 * 4. Micro-scale spring on mouse down / click shockwave.
 * 5. Complete fallback to default cursor on touch / mobile devices.
 */
export default function CustomCursor() {
  const [mode, setMode] = useState('viewfinder'); // 'viewfinder' | 'target' | 'hover' | 'card'
  const [badgeText, setBadgeText] = useState('');
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorWrapperRef = useRef(null);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      if (!isVisible) setIsVisible(true);

      // Instantly position wrapper centered directly at pointer tip
      if (cursorWrapperRef.current) {
        cursorWrapperRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      // Detect interactive hover element
      const target = e.target;
      if (!target) return;

      const interactive = target.closest('a, button, input, select, textarea, [data-cursor], .project-card, .service-card, .team-card, .laptop-lid');

      if (interactive) {
        const customCursor = interactive.getAttribute('data-cursor');
        const customText = interactive.getAttribute('data-cursor-text');

        if (customCursor) {
          setMode(customCursor);
          setBadgeText(customText || '');
        } else if (interactive.classList.contains('project-card') || interactive.classList.contains('service-card')) {
          setMode('card');
          setBadgeText('INSPECT');
        } else if (interactive.classList.contains('laptop-lid')) {
          setMode('target');
          setBadgeText('3D LAB');
        } else {
          setMode('hover');
          setBadgeText('');
        }
      } else {
        const targetSection = target.closest('#services, #estimator, #showcase-3d');
        if (targetSection && (targetSection.id === 'estimator' || targetSection.id === 'showcase-3d')) {
          setMode('target');
        } else {
          setMode('viewfinder');
        }
        setBadgeText('');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorWrapperRef}
      className={`cubiqen-pointer-root mode-${mode} ${isClicking ? 'is-clicking' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 999999,
        willChange: 'transform',
        transform: 'translate3d(-100px, -100px, 0)'
      }}
    >
      {/* Centered Reticle Container: exactly shifted -50% -50% so true center aligns with mouse */}
      <div className="cubiqen-pointer-reticle">
        
        {/* State 1: Viewfinder [ · ] (4 Corner Brackets + Center Target Point) */}
        {mode === 'viewfinder' && (
          <div className="reticle-viewfinder">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              {/* Top-Left */}
              <path d="M 2 10 L 2 2 L 10 2" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              {/* Top-Right */}
              <path d="M 24 2 L 32 2 L 32 10" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              {/* Bottom-Left */}
              <path d="M 2 24 L 2 32 L 10 32" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              {/* Bottom-Right */}
              <path d="M 24 32 L 32 32 L 32 24" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}

        {/* State 2: Target Radar Ring ⊙ (Rotating Concentric Rings) */}
        {mode === 'target' && (
          <div className="reticle-target">
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
              <circle cx="21" cy="21" r="18" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3 3" className="spin-radar-infinite" />
              <circle cx="21" cy="21" r="9" stroke="#3b82f6" strokeWidth="1.2" opacity="0.65" />
            </svg>
          </div>
        )}

        {/* State 3: Hover Expansion Over Buttons & Links */}
        {mode === 'hover' && (
          <div className="reticle-hover">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <path d="M 3 13 L 3 3 L 13 3" stroke="#b8860b" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M 31 3 L 41 3 L 41 13" stroke="#b8860b" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M 3 31 L 3 41 L 13 41" stroke="#b8860b" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M 31 41 L 41 41 L 41 31" stroke="#b8860b" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </div>
        )}

        {/* State 4: Card Inspection Reticle + Badge Label */}
        {mode === 'card' && (
          <div className="reticle-card">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M 3 14 L 3 3 L 14 3" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M 34 3 L 45 3 L 45 14" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M 3 34 L 3 45 L 14 45" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M 34 45 L 45 45 L 45 34" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
            {badgeText && (
              <span className="reticle-badge">{badgeText}</span>
            )}
          </div>
        )}

        {/* Absolute Dead-Center Precision Dot (always exactly at cursor coordinates) */}
        <div className={`reticle-center-dot dot-mode-${mode}`} />

      </div>
    </div>
  );
}
