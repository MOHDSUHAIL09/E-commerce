import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, FaHome, FaPills, FaUserMd, FaFlask, 
  FaFileMedical, FaHeart, FaShoppingCart, FaUser, 
  FaChevronDown, FaChevronRight, FaShieldAlt, FaPhoneAlt,
  FaBoxes, FaClipboardCheck, FaShippingFast, FaCog,
  FaSignOutAlt, FaSignInAlt, FaUserCircle
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { CATEGORIES } from '../../pages/Categories/CategoriesPage';
import LoginDrawer from '../common/LoginDrawer';
import WishlistDrawer from '../common/WishlistDrawer';
import cureonlogo from '../../assets/images/cureon-logo.png'

export default function AnimatedSidebar({ isOpen, onClose, onOpenRoleModal }) {
  const location = useLocation();
  const { currentRole, currentUser, isLoggedIn, login, logout } = useAuth();
  const { itemsCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const [showLoginDrawer, setShowLoginDrawer] = useState(false);
  const [showWishlistDrawer, setShowWishlistDrawer] = useState(false);

  // Prevent background scrolling while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Close sidebar upon route change
  useEffect(() => {
    if (isOpen) onClose();
  }, [location.pathname]);

  const menuItems = [
    { title: 'Home', path: '/', icon: <FaHome /> },
    { title: 'Shop All Medicines', path: '/products', icon: <FaPills /> },
    { title: 'Find Doctors', path: '/doctors', icon: <FaUserMd /> },
    { title: 'Book Diagnostic Lab Tests', path: '/lab-tests', icon: <FaFlask /> },
    { title: 'My Shopping Cart', path: '/cart', icon: <FaShoppingCart />, badge: itemsCount > 0 ? `${itemsCount}` : null },
    { title: 'My Wishlist', path: '/wishlist', icon: <FaHeart />, badge: wishlistCount > 0 ? `${wishlistCount}` : null },
  ];


  const sidebarVariants = {
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 350,
        damping: 35
      }
    },
    open: {
      x: '0%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.aside
            className="sidebar-panel"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation drawer"
          >
            {/* Header */}
            <div className="p-3 border-bottom d-flex align-items-center justify-content-between" style={{ backgroundColor: '#F8FAF9' }}>
              <div className="d-flex align-items-center gap-2">
                <img 
                  src={cureonlogo} 
                  alt="CUREON" 
                  style={{ height: '38px', width: 'auto', objectFit: 'contain' }} 
                />
              </div>
              <button 
                onClick={onClose}
                className="btn btn-sm btn-light rounded-circle p-2 d-flex align-items-center justify-content-center"
                aria-label="Close sidebar"
              >
                <FaTimes size={16} />
              </button>
            </div>



            {/* Navigation Menu Items (Clean Full-Width Vertical Column) */}
            <div className="flex-grow-1 p-3 overflow-y-auto">
              <div className="text-secondary text-uppercase mb-2 px-2" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.8px' }}>
                Main Navigation
              </div>

              <div className="d-flex flex-column gap-1 w-100">
                {menuItems.map((item, idx) => {
                  const isActive = location.pathname === item.path;
                  const isWishlist = item.title === 'My Wishlist';
                  return (
                    <motion.div key={idx} variants={itemVariants} className="w-100">
                      {isWishlist ? (
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            setShowWishlistDrawer(true);
                          }}
                          className={`w-100 d-flex align-items-center justify-content-between p-2 rounded text-decoration-none border-0 bg-transparent text-start transition-all ${
                            isActive ? 'bg-primary-green text-white fw-bold shadow-sm' : 'text-dark hover-light'
                          }`}
                          style={{ fontSize: '14px', borderRadius: '8px', cursor: 'pointer' }}
                        >
                          <div className="d-flex align-items-center gap-3">
                            <span style={{ color: isActive ? '#FFFFFF' : '#159B64' }}>{item.icon}</span>
                            <span className="fw-medium">{item.title}</span>
                          </div>
                          {item.badge && (
                            <span className={`badge ${isActive ? 'bg-white text-dark' : 'bg-success text-white'}`} style={{ fontSize: '10px' }}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      ) : (
                        <Link
                          to={item.path}
                          className={`w-100 d-flex align-items-center justify-content-between p-2 rounded text-decoration-none transition-all ${
                            isActive ? 'bg-primary-green text-white fw-bold shadow-sm' : 'text-dark hover-light'
                          }`}
                          style={{ fontSize: '14px', borderRadius: '8px' }}
                        >
                          <div className="d-flex align-items-center gap-3">
                            <span style={{ color: isActive ? '#FFFFFF' : '#159B64' }}>{item.icon}</span>
                            <span className="fw-medium">{item.title}</span>
                          </div>
                          {item.badge && (
                            <span className={`badge ${isActive ? 'bg-white text-dark' : 'bg-success text-white'}`} style={{ fontSize: '10px' }}>
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}

                {/* Expandable Categories Accordion */}
                <motion.div variants={itemVariants} className="mt-2">
                  <button
                    onClick={() => setCategoriesExpanded(!categoriesExpanded)}
                    className="btn w-100 text-start d-flex align-items-center justify-content-between p-2 rounded border-0 text-dark"
                    style={{ fontSize: '14px', backgroundColor: categoriesExpanded ? '#EAF7F0' : 'transparent' }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <FaBoxes color="#159B64" />
                      <span className="fw-semibold">Browse Categories</span>
                    </div>
                    <motion.span animate={{ rotate: categoriesExpanded ? 180 : 0 }}>
                      <FaChevronDown size={12} color="#64756D" />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {categoriesExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ps-4 pe-2 py-2 overflow-hidden"
                      >
                        <div className="d-flex flex-column gap-1" style={{ maxHeight: '220px', overflowY: 'auto' }}>
                          {CATEGORIES.map(c => (
                            <Link
                              key={c.id}
                              to={`/categories/${c.slug}`}
                              className="text-decoration-none text-secondary py-1 px-2 rounded hover-light d-flex justify-content-between"
                              style={{ fontSize: '13px' }}
                            >
                              <span>{c.name}</span>
                              <small className="text-muted">{c.count}</small>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>

            {/* Bottom Support Footer */}
            <div className="p-3 border-top mt-auto" style={{ backgroundColor: '#F8FAF9' }}>
              <div className="d-flex align-items-center gap-2 mb-2 text-secondary" style={{ fontSize: '12px' }}>
                <FaShieldAlt color="#159B64" />
                <span>FDA & GMP Registered Logistics</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-secondary" style={{ fontSize: '12px' }}>
                <FaPhoneAlt color="#159B64" />
                <span>Helpline: <strong>1-800-CUREON</strong></span>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>

    {/* Right Sliding Drawers */}
    <LoginDrawer isOpen={showLoginDrawer} onClose={() => setShowLoginDrawer(false)} />
    <WishlistDrawer isOpen={showWishlistDrawer} onClose={() => setShowWishlistDrawer(false)} />
    </>
  );
}
