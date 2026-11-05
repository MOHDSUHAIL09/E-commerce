import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaTimes, FaHeart, FaShoppingCart, FaTrashAlt, FaShoppingBag } from 'react-icons/fa';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useHealthcare } from '../../context/HealthcareContext';

export default function WishlistDrawer({ isOpen, onClose }) {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { productsList } = useHealthcare();

  // Resolve products from wishlist IDs
  const wishlistProducts = productsList.filter(prod => wishlist.includes(prod.id));

  const handleMoveAllToCart = () => {
    wishlistProducts.forEach(prod => {
      addToCart(prod, 1);
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
              backdropFilter: 'blur(3px)',
              zIndex: 1085
            }}
          />

          {/* Right Sliding Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '440px',
              backgroundColor: '#FFFFFF',
              zIndex: 1090,
              boxShadow: '-8px 0 25px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Top Navigation Bar */}
            <div className="p-3 d-flex align-items-center justify-content-between border-bottom" style={{ backgroundColor: '#F8FAF9' }}>
              <div className="d-flex align-items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-sm btn-light border-0 rounded-circle p-2 d-flex align-items-center justify-content-center"
                  aria-label="Back"
                  style={{ width: '38px', height: '38px', color: '#005F40' }}
                >
                  <FaArrowLeft size={16} />
                </button>
                <div>
                  <h5 className="mb-0 fw-bold text-dark d-flex align-items-center gap-2" style={{ fontSize: '18px' }}>
                    <FaHeart color="#E11D48" size={17} />
                    <span>My Wishlist</span>
                  </h5>
                  <span className="text-secondary" style={{ fontSize: '12px' }}>
                    {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="btn btn-sm btn-light border-0 rounded-circle p-2 d-flex align-items-center justify-content-center"
                aria-label="Close"
                style={{ width: '38px', height: '38px', color: '#111827' }}
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Wishlist Items List */}
            <div className="p-3 flex-grow-1 overflow-y-auto">
              {wishlistProducts.length === 0 ? (
                <div className="text-center py-5">
                  <div 
                    className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{ width: '70px', height: '70px', backgroundColor: '#FFF1F2' }}
                  >
                    <FaHeart color="#E11D48" size={32} />
                  </div>
                  <h5 className="fw-bold text-dark mb-2">Your Wishlist is Empty</h5>
                  <p className="text-secondary mb-4" style={{ fontSize: '13px', maxWidth: '280px', margin: '0 auto' }}>
                    Save prescription medicines and healthcare essentials to order them anytime with one click.
                  </p>
                  <button
                    onClick={onClose}
                    className="btn fw-bold text-white px-4 py-2"
                    style={{ backgroundColor: '#005F40', borderRadius: '8px', fontSize: '14px' }}
                  >
                    Shop Medicines
                  </button>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {wishlistProducts.map(prod => (
                    <div 
                      key={prod.id}
                      className="p-3 border rounded-3 bg-white shadow-xs position-relative"
                      style={{ borderColor: '#E5E7EB' }}
                    >
                      <button
                        onClick={() => removeFromWishlist(prod.id)}
                        className="btn btn-sm btn-light border-0 rounded-circle position-absolute top-0 end-0 m-2 p-1 text-muted"
                        title="Remove from Wishlist"
                        style={{ width: '28px', height: '28px' }}
                      >
                        <FaTimes size={13} />
                      </button>

                      <div className="d-flex gap-3 align-items-center mb-2">
                        <img 
                          src={prod.image} 
                          alt={prod.name}
                          className="rounded-2 object-fit-cover flex-shrink-0"
                          style={{ width: '64px', height: '64px', border: '1px solid #F3F4F6' }}
                        />
                        <div className="flex-grow-1 pe-4">
                          <div className="text-secondary fw-semibold text-uppercase" style={{ fontSize: '10px' }}>
                            {prod.brand}
                          </div>
                          <div className="fw-bold text-dark line-clamp-2" style={{ fontSize: '13px', lineHeight: 1.3 }}>
                            {prod.name}
                          </div>
                          <div className="d-flex align-items-baseline gap-2 mt-1">
                            <span className="fw-bold text-dark" style={{ fontSize: '15px' }}>
                              ₹{(prod.price * 25).toFixed(0)}
                            </span>
                            {prod.mrp && prod.mrp > prod.price && (
                              <span className="text-muted text-decoration-line-through" style={{ fontSize: '12px' }}>
                                ₹{(prod.mrp * 25).toFixed(0)}
                              </span>
                            )}
                            {prod.discount && (
                              <span className="badge bg-danger-subtle text-danger" style={{ fontSize: '10px' }}>
                                {prod.discount}% OFF
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="d-flex gap-2 mt-2 pt-2 border-top">
                        <button
                          onClick={() => {
                            addToCart(prod, 1);
                          }}
                          className="btn btn-sm w-100 fw-bold text-white d-flex align-items-center justify-content-center gap-2 py-2"
                          style={{ backgroundColor: '#005F40', borderRadius: '6px', fontSize: '13px' }}
                        >
                          <FaShoppingCart size={12} />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            {wishlistProducts.length > 0 && (
              <div className="p-3 border-top bg-light" style={{ backgroundColor: '#F8FAF9' }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-secondary" style={{ fontSize: '13px' }}>
                    Total {wishlistProducts.length} Items
                  </span>
                  <Link 
                    to="/wishlist" 
                    onClick={onClose}
                    className="text-decoration-none fw-semibold"
                    style={{ color: '#005F40', fontSize: '13px' }}
                  >
                    View Wishlist Page &rarr;
                  </Link>
                </div>
                <button
                  onClick={handleMoveAllToCart}
                  className="btn w-100 fw-bold text-white py-2 rounded-3 shadow-xs d-flex align-items-center justify-content-center gap-2"
                  style={{ backgroundColor: '#159B64', fontSize: '14px' }}
                >
                  <FaShoppingBag size={14} />
                  <span>Move All to Cart</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
