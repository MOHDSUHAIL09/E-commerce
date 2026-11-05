import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaStar, FaShoppingCart, FaShieldAlt, FaHeart, FaRegHeart, FaArrowRight } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function QuickViewModal({ product, onClose }) {
  if (!product) return null;

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [qty, setQty] = useState(1);
  const isFav = isInWishlist(product.id);

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1090 }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg overflow-hidden">
          
          <div className="modal-header border-0 pb-0">
            <span className="badge bg-light text-secondary border">{product.category}</span>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4">
            <div className="row g-4 align-items-center">
              {/* Products Image */}
              <div className="col-md-5 text-center">
                <div className="p-3 bg-light rounded-3 d-flex align-items-center justify-content-center" style={{ minHeight: '260px' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid"
                    style={{ maxHeight: '240px', objectFit: 'contain' }}
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="col-md-7">
                <div className="text-secondary text-uppercase mb-1" style={{ fontSize: '12px' }}>
                  {product.brand} • {product.manufacturer}
                </div>

                <h4 className="fw-bold text-dark mb-2">{product.name}</h4>

                <div className="d-flex align-items-center gap-3 mb-3">
                  <span className="product-rating">
                    <FaStar size={12} color="#F1C40F" /> {product.rating} / 5.0
                  </span>
                  <span className="text-secondary" style={{ fontSize: '13px' }}>
                    {product.reviewsCount} verified patient ratings
                  </span>
                  {product.prescriptionRequired && (
                    <span className="badge-rx">Prescription Required</span>
                  )}
                </div>

                <div className="d-flex align-items-baseline gap-2 mb-3">
                  <span className="fs-3 fw-bold text-dark-green">₹{(product.price * 25).toFixed(0)}</span>
                  {product.mrp > product.price && (
                    <span className="text-secondary text-decoration-line-through fs-6">
                      ₹{(product.mrp * 25).toFixed(0)}
                    </span>
                  )}
                  {product.discount > 0 && (
                    <span className="badge bg-danger ms-2">{product.discount}% OFF</span>
                  )}
                </div>

                <p className="text-secondary mb-3" style={{ fontSize: '13px', lineHeight: 1.6 }}>
                  {product.description}
                </p>

                {/* Key specs */}
                <div className="p-2 mb-3 rounded bg-light border" style={{ fontSize: '12px' }}>
                  <div className="mb-1"><strong>Active Composition:</strong> {product.composition}</div>
                  <div><strong>Standard Dosage:</strong> {product.dosage}</div>
                </div>

                {/* Qty & Add to Cart */}
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="qty-selector">
                    <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                    <span className="qty-value">{qty}</span>
                    <button className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(product, qty);
                      onClose();
                    }}
                    className="btn btn-auramed flex-grow-1 py-2"
                  >
                    <FaShoppingCart /> Add to Cart (${(product.price * qty).toFixed(2)})
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="btn btn-outline-secondary p-2 rounded-circle"
                    title="Wishlist"
                  >
                    {isFav ? <FaHeart color="#E74C3C" /> : <FaRegHeart />}
                  </button>
                </div>

                <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                  <div className="d-flex align-items-center gap-1 text-secondary" style={{ fontSize: '12px' }}>
                    <FaShieldAlt color="#159B64" /> 100% Genuine batch verified
                  </div>
                  <Link
                    to={`/products/${product.id}`}
                    onClick={onClose}
                    className="text-primary-green fw-semibold text-decoration-none d-flex align-items-center gap-1"
                    style={{ fontSize: '13px' }}
                  >
                    View Full Details <FaArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
