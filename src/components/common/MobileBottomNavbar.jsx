import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProfileDrawer from './ProfileDrawer';

export default function MobileBottomNavbar({ onOpenLogin = null, onOpenWishlist = null } = {}) {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      path: '/',
      match: ['/'],
      icon: (isActive) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={isActive ? '#0E738A' : 'none'} stroke={isActive ? '#0E738A' : '#4B5563'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22" fill={isActive ? '#FFFFFF' : 'none'} stroke={isActive ? '#FFFFFF' : '#4B5563'}></polyline>
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
          <path d="M7 4V10C7 12.7614 9.23858 15 12 15C14.7614 15 17 12.7614 17 10V4" stroke={isActive ? '#0E738A' : '#4B5563'} strokeWidth="2" strokeLinecap="round"/>
          <path d="M5 4H9M15 4H19" stroke={isActive ? '#0E738A' : '#4B5563'} strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 15V17C12 18.6569 13.3431 20 15 20H17" stroke={isActive ? '#0E738A' : '#4B5563'} strokeWidth="2" strokeLinecap="round"/>
          <circle cx="18" cy="20" r="2" fill={isActive ? '#0E738A' : '#4B5563'}/>
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
          <rect x="7" y="3" width="10" height="3.5" rx="1.5" stroke={isActive ? '#0E738A' : '#4B5563'} strokeWidth="2"/>
          <path d="M5 8C5 6.89543 5.89543 6 7 6H17C18.1046 6 19 6.89543 19 8V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V8Z" stroke={isActive ? '#0E738A' : '#4B5563'} strokeWidth="2"/>
          <path d="M12 10.5V16.5M9 13.5H15" stroke={isActive ? '#0E738A' : '#4B5563'} strokeWidth="2" strokeLinecap="round"/>
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
          <path d="M8 3H16M10 3V17C10 18.1046 10.8954 19 12 19C13.1046 19 14 18.1046 14 17V3" stroke={isActive ? '#0E738A' : '#4B5563'} strokeWidth="2" strokeLinecap="round"/>
          <path d="M9 11H13M9 14.5H12" stroke={isActive ? '#0E738A' : '#4B5563'} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      id: 'insurance',
      label: 'Insurance',
      path: '/customer-dashboard',
      match: ['/insurance'],
      icon: (isActive) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 3L4 7V12C4 16.5 7.5 20.5 12 21.5C16.5 20.5 20 16.5 20 12V7L12 3Z" stroke={isActive ? '#0E738A' : '#4B5563'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8V14M9 11H15" stroke={isActive ? '#0E738A' : '#4B5563'} strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      id: 'my-health',
      label: 'My Health',
      isAction: true,
      onClick: () => setIsProfileOpen(true),
      icon: (isActive) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke={isActive || isProfileOpen ? '#0E738A' : '#4B5563'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2V8H20" stroke={isActive || isProfileOpen ? '#0E738A' : '#4B5563'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 12V16M10 14H14" stroke={isActive || isProfileOpen ? '#0E738A' : '#4B5563'} strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    }
  ];

  return (
    <>
      <nav
        className="d-flex d-md-none position-fixed bottom-0 start-0 end-0 bg-white border-top align-items-center justify-content-between py-1 px-1 shadow-lg"
        style={{
          zIndex: 1040,
          height: '62px',
          borderColor: '#E5E7EB',
          boxShadow: '0 -2px 14px rgba(0, 0, 0, 0.08)'
        }}
        aria-label="Mobile Bottom Navigation"
      >
        {navItems.map((item) => {
          const isActive = item.isAction 
            ? isProfileOpen
            : item.match?.some((m) => location.pathname === m);

          if (item.isAction) {
            return (
              <button
                key={item.id}
                type="button"
                onClick={item.onClick}
                className="btn p-0 border-0 bg-transparent text-decoration-none d-flex flex-column align-items-center justify-content-center flex-grow-1 h-100 cursor-pointer"
                style={{ color: isActive ? '#0E738A' : '#6B7280' }}
              >
                <div
                  className="d-flex align-items-center justify-content-center mb-0.5 rounded-3"
                  style={{
                    width: '32px',
                    height: '28px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {item.icon(isActive)}
                </div>
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: isActive ? '700' : '500',
                    letterSpacing: '-0.2px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.id}
              to={item.path}
              className="text-decoration-none d-flex flex-column align-items-center justify-content-center flex-grow-1 h-100"
              style={{ color: isActive ? '#0E738A' : '#6B7280' }}
            >
              <div
                className="d-flex align-items-center justify-content-center mb-0.5 rounded-3"
                style={{
                  width: '32px',
                  height: '28px',
                  transition: 'all 0.2s ease'
                }}
              >
                {item.icon(isActive)}
              </div>
              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: isActive ? '700' : '500',
                  letterSpacing: '-0.2px',
                  whiteSpace: 'nowrap'
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Profile Drawer */}
      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenLogin={onOpenLogin}
      />
    </>
  );
}
