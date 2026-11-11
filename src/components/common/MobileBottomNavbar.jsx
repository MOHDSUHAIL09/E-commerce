import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProfileDrawer from './ProfileDrawer';
import { FaUser } from 'react-icons/fa';

const BOTTOM_NAVIGATION_STYLES = `
:root {
  --bar-body-height: 56px;
  --bar-total-height: 74px;
  --nav-element-gap: 8px;
  --active-green: #0E738A; /* Darker green for white bg visibility */
  --active-green-light: #15b59b;
}

.bottom-navigation-container {
  position: fixed !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  padding: 0 16px 16px 16px;
  box-sizing: border-box;
  pointer-events: none;
  z-index: 1040;
}

.bottom-nav-suite {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  pointer-events: auto;
}

.notch-nav-root {
  position: relative;
  flex: 1;
  min-width: 0;
  height: var(--bar-total-height);
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  /* Glassmorphism effect */
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  margin-top: 18px; /* Space for floating disc */
  height: 56px;
}

.notch-nav-svg {
  position: absolute;
  top: -18px; /* Offset for the floating notch */
  left: 0;
  width: 100%;
  height: 74px;
  overflow: visible;
  pointer-events: none;
}

.crater-moving-group {
  transition: transform 380ms cubic-bezier(0.34, 1.35, 0.64, 1);
  will-change: transform;
}

.active-floating-disc-holder {
  position: absolute;
  top: -18px;
  left: 0;
  width: 0;
  height: var(--bar-total-height);
  pointer-events: none;
  transition: transform 380ms cubic-bezier(0.34, 1.35, 0.64, 1);
  will-change: transform;
}

/* --- ACTIVE FLOATING GLASS DISC --- */
.active-floating-disc {
  position: absolute;
  top: 28px;
  left: 0;
  transform: translate(-50%, -50%);
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--active-green), var(--active-green-light));
  border: 2px solid rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(14, 115, 138, 0.3), 0 0 0 4px rgba(255, 255, 255, 0.5);
  transition: transform 200ms cubic-bezier(0.34, 1.3, 0.64, 1), box-shadow 200ms ease, border-color 200ms ease;
  will-change: transform;
}

.active-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 180ms ease;
}

.phase-pressed .active-floating-disc { transform: translate(-50%, -50%) scale(0.92) translateY(3px); }
.phase-rising .active-floating-disc { transform: translate(-50%, -50%) scale(1.08) translateY(-4px); }
.phase-settling .active-floating-disc { transform: translate(-50%, -50%) scale(1.02) translateY(1px); }
.phase-idle .active-floating-disc { transform: translate(-50%, -50%) scale(1) translateY(0); }

.nav-slots-row {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--bar-body-height);
}

.notch-slot-btn {
  position: absolute;
  top: 0;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}

.notch-slot-btn:focus-visible {
  outline: 2px solid var(--active-green);
  outline-offset: 2px;
  border-radius: 14px;
}

.slot-content-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
  padding-bottom: 6px;
  box-sizing: border-box;
  pointer-events: none;
}

.slot-icon-holder {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3px;
  transition: opacity 220ms ease, transform 220ms ease, filter 220ms ease;
  will-change: opacity, transform;
}

.slot-icon-holder.icon-hidden {
  opacity: 0;
  transform: scale(0.6) translateY(-4px);
  pointer-events: none;
}

.slot-icon-holder.icon-visible {
  opacity: 0.9;
  transform: scale(1) translateY(0);
}

.notch-slot-btn:hover .slot-icon-holder.icon-visible {
  opacity: 1;
  transform: scale(1.08) translateY(-1px);
}

.slot-label-text {
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: -0.2px;
  line-height: 12px;
  text-align: center;
  white-space: nowrap;
  user-select: none;
  transition: color 220ms ease, opacity 220ms ease, text-shadow 220ms ease, transform 220ms ease;
}

/* Darker text for better visibility on white background */
.slot-label-text.label-inactive { color: #4B5563; opacity: 0.9; }
.slot-label-text.label-active { color: var(--active-green); opacity: 1; font-weight: 700; }

@media (max-width: 640px) {
  .bottom-navigation-container { padding: 0 12px 12px 12px; }
  .active-floating-disc { width: 46px; height: 46px; top: 28px; }
}

@media (max-width: 380px) {
  .active-floating-disc { width: 42px; height: 42px; top: 26px; }
}
`;

const NAV_SLOTS = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    match: ['/'],
    icon: (isActive) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={isActive ? '#FFFFFF' : 'none'} stroke={isActive ? '#FFFFFF' : '#4B5563'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22" fill={isActive ? 'var(--active-green)' : 'none'} stroke={isActive ? 'var(--active-green)' : '#4B5563'}></polyline>
      </svg>
    )
  },
  {
    id: 'doctors',
    label: 'Doctors',
    path: '/doctors',
    match: ['/doctors'],
    icon: (isActive) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M7 4V10C7 12.7614 9.23858 15 12 15C14.7614 15 17 12.7614 17 10V4" stroke={isActive ? '#FFFFFF' : '#4B5563'} strokeWidth="2" strokeLinecap="round"/>
        <path d="M5 4H9M15 4H19" stroke={isActive ? '#FFFFFF' : '#4B5563'} strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 15V17C12 18.6569 13.3431 20 15 20H17" stroke={isActive ? '#FFFFFF' : '#4B5563'} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="18" cy="20" r="2" fill={isActive ? '#FFFFFF' : '#4B5563'}/>
      </svg>
    )
  },
  {
    id: 'medicines',
    label: 'Medicines',
    path: '/products',
    match: ['/products', '/categories'],
    icon: (isActive) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="7" y="3" width="10" height="3.5" rx="1.5" stroke={isActive ? '#FFFFFF' : '#4B5563'} strokeWidth="2"/>
        <path d="M5 8C5 6.89543 5.89543 6 7 6H17C18.1046 6 19 6.89543 19 8V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V8Z" stroke={isActive ? '#FFFFFF' : '#4B5563'} strokeWidth="2"/>
        <path d="M12 10.5V16.5M9 13.5H15" stroke={isActive ? '#FFFFFF' : '#4B5563'} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 'lab-tests',
    label: 'Lab Tests',
    path: '/lab-tests',
    match: ['/lab-tests'],
    icon: (isActive) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M8 3H16M10 3V17C10 18.1046 10.8954 19 12 19C13.1046 19 14 18.1046 14 17V3" stroke={isActive ? '#FFFFFF' : '#4B5563'} strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 11H13M9 14.5H12" stroke={isActive ? '#FFFFFF' : '#4B5563'} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 'my-health',
    label: 'Account',
    isAction: true,
    match: ['/account'],
    icon: (isActive) => (
      <FaUser size={20} color={isActive ? '#FFFFFF' : '#4B5563'} />
    )
  }
];

const getIndexFromPath = (pathname) => {
  const idx = NAV_SLOTS.findIndex((s) => s.match?.some((m) => pathname === m));
  return idx >= 0 ? idx : 0;
};

export default function MobileBottomNavbar({ onOpenLogin = null } = {}) {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(() => NAV_SLOTS[getIndexFromPath(location.pathname)].id);
  const [activeIndex, setActiveIndex] = useState(() => getIndexFromPath(location.pathname));
  const [animPhase, setAnimPhase] = useState('idle');
  const [isAnimating, setIsAnimating] = useState(false);

  const barContainerRef = useRef(null);
  const [barWidth, setBarWidth] = useState(300);

  useEffect(() => {
    const updateSize = () => {
      if (barContainerRef.current) {
        const measured = barContainerRef.current.getBoundingClientRect().width;
        if (measured > 50) setBarWidth(Math.round(measured));
      }
    };
    updateSize();
    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined' && barContainerRef.current) {
      resizeObserver = new ResizeObserver(() => updateSize());
      resizeObserver.observe(barContainerRef.current);
    }
    window.addEventListener('resize', updateSize);
    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  const timersRef = useRef([]);
  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };
  useEffect(() => () => clearAllTimers(), []);

  const triggerTransition = (targetId, targetIndex) => {
    clearAllTimers();
    setIsAnimating(true);

    if (targetIndex === activeIndex) {
      setAnimPhase('pressed');
      const t1 = setTimeout(() => {
        setAnimPhase('settling');
        const t2 = setTimeout(() => {
          setAnimPhase('idle');
          setIsAnimating(false);
        }, 140);
        timersRef.current.push(t2);
      }, 80);
      timersRef.current.push(t1);
      return;
    }

    setAnimPhase('pressed');
    const t1 = setTimeout(() => {
      setAnimPhase('rising');
      setActiveIndex(targetIndex);
      setCurrentTab(targetId);
      const t2 = setTimeout(() => {
        setAnimPhase('settling');
        const t3 = setTimeout(() => {
          setAnimPhase('idle');
          setIsAnimating(false);
        }, 160);
        timersRef.current.push(t3);
      }, 230);
      timersRef.current.push(t2);
    }, 90);
    timersRef.current.push(t1);
  };

  useEffect(() => {
    const idx = getIndexFromPath(location.pathname);
    const tabFromUrl = NAV_SLOTS[idx].id;
    if (tabFromUrl !== currentTab && !isAnimating) {
      triggerTransition(tabFromUrl, idx);
    }
  }, [location.pathname]);

  const handleNavClick = (slot, index, event) => {
    if (slot.isAction) {
      event.preventDefault();
      setIsProfileOpen(true);
      return;
    }
    if (index === activeIndex) {
      event.preventDefault();
      triggerTransition(slot.id, index);
    }
  };

  const slotWidth = barWidth / NAV_SLOTS.length;
  const activeX = slotWidth * (activeIndex + 0.5);

  const craterCutoutPathD = `
    M -36 16
    C -27 16, -26 23, -22 28
    C -16 35,  -9 42,   0 42
    C   9 42,  16 35,  22 28
    C  26 23,  27 16,  36 16
    Z
  `;

  const craterBorderStrokeD = `
    M -35 16
    C -27 16, -26 23, -22 28
    C -16 35,  -9 42,   0 42
    C   9 42,  16 35,  22 28
    C  26 23,  27 16,  35 16
  `;

  return (
    <>
      <div className="bottom-navigation-container d-md-none">
        <style dangerouslySetInnerHTML={{ __html: BOTTOM_NAVIGATION_STYLES }} />

        <div className="bottom-nav-suite">
          <div ref={barContainerRef} id="bottom-navigation-bar"
            className="notch-nav-root" role="navigation"
            aria-label="Bottom Navigation Bar">
            <svg className="notch-nav-svg"
              viewBox={`0 0 ${barWidth} 74`}
              preserveAspectRatio="none">
              <defs>
                <mask id="bar-crater-cutout-mask" maskUnits="userSpaceOnUse">
                  <rect x="0" y="0" width={barWidth} height="74" fill="#ffffff" />
                  <g className="crater-moving-group"
                    style={{ transform: `translateX(${activeX}px)` }}>
                    <path d={craterCutoutPathD} fill="#000" />
                  </g>
                </mask>

                <clipPath id="barBoundaryClip">
                  <rect x="0" y="18" width={barWidth} height="56" rx="20" />
                </clipPath>

                <filter id="navBarGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Glassmorphism background handled by CSS, but we need the notch cutout */}
              {/* We use a transparent fill with mask so the CSS background shows through the cutout */}
              <rect x="0" y="18" width={Math.max(barWidth, 0)} height="56" rx="20"
                fill="transparent"
                mask="url(#bar-crater-cutout-mask)" />

              {/* Green Glowing Border around the notch and bar */}
              {barWidth > 2 && (
                <rect x="1" y="19" width={barWidth - 2} height="54" rx="19"
                  fill="none" stroke="rgba(21, 181, 155, 0.4)" strokeWidth="2"
                  filter="url(#navBarGlow)"
                  mask="url(#bar-crater-cutout-mask)" />
              )}

              <rect x="1" y="19" width={barWidth - 2} height="54" rx="19"
                fill="none" stroke="rgba(21, 181, 155, 0.8)" strokeWidth="1"
                opacity="0.9"
                mask="url(#bar-crater-cutout-mask)" />

              <g clipPath="url(#barBoundaryClip)">
                <g className="crater-moving-group"
                  style={{ transform: `translateX(${activeX}px)` }}>
                  <path d={craterBorderStrokeD} fill="none"
                    stroke="#15b59b" strokeWidth="2.5" strokeLinecap="round"
                    filter="url(#navBarGlow)" />
                  <path d={craterBorderStrokeD} fill="none"
                    stroke="rgba(255, 255, 255, 1)" strokeWidth="1" strokeLinecap="round" />
                </g>
              </g>
            </svg>

            <div className={`active-floating-disc-holder phase-${animPhase}`}
              style={{ transform: `translateX(${activeX}px)` }}>
              <div className="active-floating-disc" role="presentation">
                <span className="active-icon-wrapper">
                  {NAV_SLOTS[activeIndex].icon(true)}
                </span>
              </div>
            </div>

            <div className="nav-slots-row">
              {NAV_SLOTS.map((slot, index) => {
                const isActive = slot.id === currentTab;
                return (
                  <Link
                    key={slot.id}
                    to={slot.path || '#'}
                    className={`notch-slot-btn ${isActive ? 'is-active-slot' : ''}`}
                    onClick={(e) => handleNavClick(slot, index, e)}
                    style={{
                      left: `${slotWidth * index}px`,
                      width: `${slotWidth}px`
                    }}>
                    <div className="slot-content-stack">
                      <span className={`slot-icon-holder ${isActive ? 'icon-hidden' : 'icon-visible'}`}>
                        {slot.icon(false)}
                      </span>
                      <span className={`slot-label-text ${isActive ? 'label-active' : 'label-inactive'}`}>
                        {slot.label}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenLogin={onOpenLogin}
      />
    </>
  );
}