import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, FaChevronRight, FaUserFriends, FaMapMarkerAlt, 
  FaBoxOpen, FaCreditCard, FaAward, FaQuestionCircle, FaSignOutAlt 
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function ProfileDrawer({ isOpen, onClose, onOpenLogin }) {
  const { currentUser, currentRole, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavigate = (path, state = {}) => {
    onClose();
    navigate(path, { state });
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const menuRows = [
    {
      id: 'super-admin',
      label: 'Super Admin Portal',
      icon: (
        <div 
          className="rounded-circle d-flex align-items-center justify-content-center text-white" 
          style={{ width: '22px', height: '22px', backgroundColor: '#8E44AD' }}
        >
          👑
        </div>
      ),
      onClick: () => handleNavigate('/super-admin-dashboard')
    },
    {
      id: 'admin-dashboard',
      label: 'Store Admin Panel',
      icon: (
        <div 
          className="rounded-circle d-flex align-items-center justify-content-center text-white" 
          style={{ width: '22px', height: '22px', backgroundColor: '#2980B9' }}
        >
          🛡️
        </div>
      ),
      onClick: () => handleNavigate('/admin-dashboard')
    },
    {
      id: 'manage-profiles',
      label: 'Manage Profiles',
      icon: <FaUserFriends size={18} color="#1F2937" />,
      onClick: () => handleNavigate('/customer-dashboard', { tab: 'profile' })
    },
    {
      id: 'address-book',
      label: 'Address Book',
      icon: <FaMapMarkerAlt size={18} color="#1F2937" />,
      onClick: () => handleNavigate('/customer-dashboard', { tab: 'addresses' })
    },
    {
      id: 'my-orders',
      label: 'My Orders',
      icon: <FaBoxOpen size={18} color="#1F2937" />,
      onClick: () => handleNavigate('/customer-dashboard', { tab: 'orders' })
    },
    {
      id: 'transactions-payments',
      label: 'Transactions and Payments',
      icon: <FaCreditCard size={18} color="#1F2937" />,
      onClick: () => handleNavigate('/customer-dashboard', { tab: 'overview' })
    },
    {
      id: 'membership',
      label: 'CureOn Membership',
      icon: (
        <div 
          className="rounded-circle d-flex align-items-center justify-content-center text-white" 
          style={{ width: '20px', height: '20px', backgroundColor: '#F59E0B' }}
        >
          <FaAward size={12} />
        </div>
      ),
      onClick: () => handleNavigate('/customer-dashboard', { tab: 'overview' })
    },
    {
      id: 'need-help',
      label: 'Need Help',
      icon: <FaQuestionCircle size={18} color="#1F2937" />,
      onClick: () => handleNavigate('/customer-dashboard', { tab: 'overview' })
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: <FaSignOutAlt size={18} color="#1F2937" />,
      onClick: handleLogout
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
            style={{ zIndex: 1060, opacity: 0.45 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sliding Panel from Right (exact layout from image_121d632e) */}
          <motion.div
            className="position-fixed top-0 end-0 h-100 bg-white shadow-2xl d-flex flex-column"
            style={{
              zIndex: 1065,
              width: '85%',
              maxWidth: '360px',
              overflowY: 'auto'
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          >
            {/* Top Close Icon Row */}
            <div className="d-flex align-items-center justify-content-end p-3 pb-1">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-link text-decoration-none p-1 d-flex align-items-center justify-content-center"
                style={{ color: '#005F40', cursor: 'pointer' }}
                aria-label="Close"
              >
                <FaTimes size={22} />
              </button>
            </div>

            {/* User Phone / ID Header (matches image_121d632e: +917078264972) */}
            <div className="px-4 pb-3">
              {isLoggedIn ? (
                <div>
                  <h5 className="fw-bold text-dark mb-0" style={{ fontSize: '18px', letterSpacing: '0.2px' }}>
                    {currentUser?.phone || '+917078264972'}
                  </h5>
                  <div className="text-secondary mt-1" style={{ fontSize: '13px' }}>
                    {currentUser?.name || 'Alex Morgan'}
                  </div>
                </div>
              ) : (
                <div>
                  <h5 className="fw-bold text-dark mb-1" style={{ fontSize: '17px' }}>
                    Welcome to CureOn
                  </h5>
                  <p className="text-secondary mb-3" style={{ fontSize: '13px' }}>
                    Sign in to view orders, health records & saved addresses
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onOpenLogin) onOpenLogin();
                      else navigate('/login');
                    }}
                    className="btn w-100 fw-bold text-white shadow-sm"
                    style={{ backgroundColor: '#005F40', fontSize: '14px', borderRadius: '8px', padding: '10px' }}
                  >
                    LOGIN / SIGN UP
                  </button>
                </div>
              )}
            </div>

            {/* List Menu with Dividers (matches image_121d632e) */}
            <div className="border-top flex-grow-1">
              {menuRows.map((row) => (
                <button
                  key={row.id}
                  type="button"
                  onClick={row.onClick}
                  className="btn w-100 text-start px-4 py-3 d-flex align-items-center justify-content-between border-0 border-bottom bg-transparent"
                  style={{
                    borderColor: '#E5E7EB',
                    minHeight: '56px',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F9FAFB'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center justify-content-center" style={{ width: '24px' }}>
                      {row.icon}
                    </div>
                    <span style={{ fontSize: '15px', color: '#1F2937', fontWeight: '500' }}>
                      {row.label}
                    </span>
                  </div>
                  <FaChevronRight size={13} color="#005F40" />
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
