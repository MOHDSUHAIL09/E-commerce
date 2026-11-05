import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronRight, FaHeart, FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';

export default function MobileProfileDrawer({ isOpen, onClose, onOpenLogin, onOpenWishlist }) {
  const { currentUser, isLoggedIn, logout } = useAuth();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  // Prevent background scroll when open
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
            style={{ zIndex: 1050, opacity: 0.5 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer Panel    - slides from right exactly as in image_fbcdbb3e */}
          <motion.div
            className="position-fixed top-0 end-0 h-100 bg-white shadow-2xl d-flex flex-column"
            style={{
              zIndex: 1055,
              width: '85%',
              maxWidth: '340px',
              overflowY: 'auto'
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          >
            {/* Top Navigation Tabs Header (Profile & Wishlist matching image_fbcdbb3e) */}
            <div className="d-flex align-items-center justify-content-between px-3 pt-3 pb-2 border-bottom">
              <div className="d-flex align-items-center gap-4">
                <div 
                  className="position-relative pb-2 fw-bold text-dark d-flex align-items-center gap-1.5 cursor-pointer"
                  style={{ fontSize: '14px' }}
                >
                  <FaUser size={13} color="#005F40" />
                  <span>Profile</span>
                  {/* Red/Orange Active underline matching image_fbcdbb3e */}
                  <div 
                    className="position-absolute bottom-0 start-0 end-0"
                    style={{ height: '3px', backgroundColor: '#FF3E6C', borderRadius: '2px 2px 0 0' }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onOpenWishlist) onOpenWishlist();
                    else navigate('/wishlist');
                  }}
                  className="btn p-0 border-0 bg-transparent text-secondary pb-2 d-flex align-items-center gap-1.5 cursor-pointer"
                  style={{ fontSize: '14px', fontWeight: '500' }}
                >
                  <FaHeart size={13} color="#6B7280" />
                  <span>Wishlist</span>
                  {wishlist.length > 0 && (
                    <span className="badge bg-danger rounded-pill" style={{ fontSize: '10px' }}>
                      {wishlist.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="btn btn-sm btn-light rounded-circle p-1 d-flex align-items-center justify-content-center"
                aria-label="Close profile menu"
                style={{ width: '28px', height: '28px' }}
              >
                <FaTimes size={14} color="#6B7280" />
              </button>
            </div>

            {/* Profile Info Header (matches image_fbcdbb3e: Hello MO / 7078264972) */}
            <div className="p-3 border-bottom" style={{ backgroundColor: '#FCFDFD' }}>
              {isLoggedIn ? (
                <div>
                  <h5 className="fw-bold mb-1" style={{ color: '#111827', fontSize: '18px' }}>
                    Hello {currentUser?.name?.split(' ')[0] || 'MO'}
                  </h5>
                  <div className="text-secondary" style={{ fontSize: '13px', fontWeight: '500' }}>
                    {currentUser?.phone || '7078264972'}
                  </div>
                </div>
              ) : (
                <div>
                  <h6 className="fw-bold mb-1" style={{ color: '#111827' }}>
                    Welcome to CureOn
                  </h6>
                  <p className="text-secondary mb-3" style={{ fontSize: '12px' }}>
                    To access orders, lab tests & account security
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onOpenLogin) onOpenLogin();
                      else navigate('/login');
                    }}
                    className="btn w-100 fw-bold text-white shadow-sm"
                    style={{ backgroundColor: '#005F40', fontSize: '13px', borderRadius: '6px', padding: '10px' }}
                  >
                    LOGIN / SIGN UP
                  </button>
                </div>
              )}
            </div>

            {/* Menu List - Group 1 (matches image_fbcdbb3e) */}
            <div className="py-2 border-bottom">
              <button
                type="button"
                onClick={() => handleNavigate('/customer-dashboard', { tab: 'orders' })}
                className="btn w-100 text-start px-3 py-2.5 d-flex align-items-center justify-content-between border-0 bg-transparent"
                style={{ color: '#282C3F', fontSize: '14.5px', fontWeight: '500' }}
              >
                <span>Orders</span>
                <FaChevronRight size={11} color="#9CA3AF" />
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenWishlist) onOpenWishlist();
                  else navigate('/wishlist');
                }}
                className="btn w-100 text-start px-3 py-2.5 d-flex align-items-center justify-content-between border-0 bg-transparent"
                style={{ color: '#282C3F', fontSize: '14.5px', fontWeight: '500' }}
              >
                <span>Wishlist</span>
                <FaChevronRight size={11} color="#9CA3AF" />
              </button>

              <button
                type="button"
                onClick={() => handleNavigate('/products')}
                className="btn w-100 text-start px-3 py-2.5 d-flex align-items-center justify-content-between border-0 bg-transparent"
                style={{ color: '#282C3F', fontSize: '14.5px', fontWeight: '500' }}
              >
                <span>Gift Cards</span>
                <FaChevronRight size={11} color="#9CA3AF" />
              </button>

              <button
                type="button"
                onClick={() => handleNavigate('/customer-dashboard', { tab: 'overview' })}
                className="btn w-100 text-start px-3 py-2.5 d-flex align-items-center justify-content-between border-0 bg-transparent"
                style={{ color: '#282C3F', fontSize: '14.5px', fontWeight: '500' }}
              >
                <span>Contact Us</span>
                <FaChevronRight size={11} color="#9CA3AF" />
              </button>

              <button
                type="button"
                onClick={() => handleNavigate('/customer-dashboard', { tab: 'overview' })}
                className="btn w-100 text-start px-3 py-2.5 d-flex align-items-center justify-content-between border-0 bg-transparent"
                style={{ color: '#282C3F', fontSize: '14.5px', fontWeight: '500' }}
              >
                <div className="d-flex align-items-center gap-2">
                  <span>CureOn Insider</span>
                  <span 
                    className="badge text-white text-uppercase"
                    style={{ backgroundColor: '#FF3E6C', fontSize: '9px', fontWeight: '700', padding: '3px 6px', borderRadius: '4px' }}
                  >
                    New
                  </span>
                </div>
                <FaChevronRight size={11} color="#9CA3AF" />
              </button>
            </div>

            {/* Menu List - Group 2 (matches image_fbcdbb3e) */}
            <div className="py-2 border-bottom">
              <button
                type="button"
                onClick={() => handleNavigate('/customer-dashboard', { tab: 'overview' })}
                className="btn w-100 text-start px-3 py-2.5 d-flex align-items-center justify-content-between border-0 bg-transparent"
                style={{ color: '#282C3F', fontSize: '14.5px', fontWeight: '500' }}
              >
                <span>CureOn Credit</span>
                <span className="badge bg-success-subtle text-success fw-bold" style={{ fontSize: '11px' }}>₹500.00</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavigate('/products')}
                className="btn w-100 text-start px-3 py-2.5 d-flex align-items-center justify-content-between border-0 bg-transparent"
                style={{ color: '#282C3F', fontSize: '14.5px', fontWeight: '500' }}
              >
                <span>Coupons</span>
                <span className="badge bg-light text-secondary border" style={{ fontSize: '11px' }}>3 Available</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavigate('/customer-dashboard', { tab: 'addresses' })}
                className="btn w-100 text-start px-3 py-2.5 d-flex align-items-center justify-content-between border-0 bg-transparent"
                style={{ color: '#282C3F', fontSize: '14.5px', fontWeight: '500' }}
              >
                <span>Saved Cards</span>
                <FaChevronRight size={11} color="#9CA3AF" />
              </button>

              <button
                type="button"
                onClick={() => handleNavigate('/customer-dashboard', { tab: 'addresses' })}
                className="btn w-100 text-start px-3 py-2.5 d-flex align-items-center justify-content-between border-0 bg-transparent"
                style={{ color: '#282C3F', fontSize: '14.5px', fontWeight: '500' }}
              >
                <span>Saved VPA</span>
                <FaChevronRight size={11} color="#9CA3AF" />
              </button>

              <button
                type="button"
                onClick={() => handleNavigate('/customer-dashboard', { tab: 'addresses' })}
                className="btn w-100 text-start px-3 py-2.5 d-flex align-items-center justify-content-between border-0 bg-transparent"
                style={{ color: '#282C3F', fontSize: '14.5px', fontWeight: '500' }}
              >
                <span>Saved Addresses</span>
                <FaChevronRight size={11} color="#9CA3AF" />
              </button>
            </div>

            {/* Menu List - Group 3: Edit Profile & Logout (matches image_fbcdbb3e & image_da4c43dc) */}
            <div className="py-2 mt-auto">
              <button
                type="button"
                onClick={() => handleNavigate('/customer-dashboard', { tab: 'profile' })}
                className="btn w-100 text-start px-3 py-2.5 d-flex align-items-center justify-content-between border-0 bg-transparent fw-bold"
                style={{ color: '#005F40', fontSize: '14.5px' }}
              >
                <span>Edit Profile</span>
                <FaChevronRight size={11} color="#005F40" />
              </button>

              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn w-100 text-start px-3 py-2.5 d-flex align-items-center justify-content-between border-0 bg-transparent text-danger fw-semibold"
                  style={{ fontSize: '14.5px' }}
                >
                  <span>Logout</span>
                  <FaChevronRight size={11} color="#DC2626" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onOpenLogin) onOpenLogin();
                    else navigate('/login');
                  }}
                  className="btn w-100 text-start px-3 py-2.5 d-flex align-items-center justify-content-between border-0 bg-transparent text-success fw-bold"
                  style={{ fontSize: '14.5px' }}
                >
                  <span>Login / Register</span>
                  <FaChevronRight size={11} color="#159B64" />
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
