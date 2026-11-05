import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart, FaRegHeart, FaEye, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductCard({ 
  product, 
  onQuickView,
  cartItems: propCartItems,
  onAddToCart,
  onUpdateQuantity,
  onRemoveFromCart,
  isInWishlist: propIsInWishlist,
  onToggleWishlist
}) {
  const cartCtx = useCart();
  const wishlistCtx = useWishlist();

  const cartItems = propCartItems !== undefined ? propCartItems : (cartCtx?.cartItems || []);
  const addToCart = onAddToCart || cartCtx?.addToCart;
  const updateQuantity = onUpdateQuantity || cartCtx?.updateQuantity;
  const removeFromCart = onRemoveFromCart || cartCtx?.removeFromCart;
  const isInWishlist = propIsInWishlist || wishlistCtx?.isInWishlist;
  const toggleWishlist = onToggleWishlist || wishlistCtx?.toggleWishlist;

  const isFav = isInWishlist ? isInWishlist(product.id) : false;
  const cartItem = cartItems.find(item => item.id === product.id);
  const qty = cartItem ? cartItem.quantity : 0;

  return (
    <div className="product-card h-100 d-flex flex-column bg-white p-3 rounded-4 border">
      {/* Top Badges & Wishlist */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center gap-1">
          {product.prescriptionRequired ? (
            <span className="badge-rx">Rx Required</span>
          ) : (
            <span className="badge-otc">OTC</span>
          )}

          {product.discount > 0 && (
            <span className="badge-discount">{product.discount}% OFF</span>
          )}
        </div>

        <button
          onClick={() => toggleWishlist(product.id)}
          className="btn btn-sm p-1 rounded-circle border-0"
          title={isFav ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          {isFav ? <FaHeart color="#E74C3C" size={16} /> : <FaRegHeart color="#64756D" size={16} />}
        </button>
      </div>

      {/* Product Image + Quick View */}
      <div className="product-image-container position-relative mb-2">
        <Link to={`/products/${product.id}`} className="w-100 h-100 d-flex align-items-center justify-content-center">
          <img 
            src={product.image} 
            alt={product.name} 
            loading="lazy" 
            style={{ maxHeight: '160px', objectFit: 'contain' }} 
          />
        </Link>

        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="btn btn-sm btn-light position-absolute bottom-0 mb-2 shadow-sm rounded-pill px-3 py-1 d-none d-md-flex align-items-center gap-1"
            style={{ fontSize: '11px', fontWeight: 600, opacity: 0.95 }}
          >
            <FaEye size={12} /> Quick View
          </button>
        )}
      </div>

      {/* Brand & Title */}
      <div className="text-secondary text-uppercase mb-1" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
        {product.brand}
      </div>
      <h6 className="mb-2 flex-grow-1" style={{ fontSize: '14px', lineHeight: 1.35, minHeight: '38px' }}>
        <Link to={`/products/${product.id}`} className="text-dark text-decoration-none hover-green line-clamp-2">
          {product.name}
        </Link>
      </h6>

      {/* Rating */}
      <div className="d-flex align-items-center gap-2 mb-2">
        <span className="product-rating">
          <FaStar size={10} color="#F1C40F" /> {product.rating}
        </span>
        <span className="text-secondary" style={{ fontSize: '11px' }}>
          ({product.reviewsCount})
        </span>
      </div>

      {/* Pricing & Add to Cart */}
      <div className="d-flex align-items-center justify-content-between mt-auto pt-2 border-top">
        <div>
          <div className="d-flex align-items-baseline gap-2">
            <span className="fw-bold fs-5 text-dark" style={{ letterSpacing: '-0.5px' }}>
              ₹{(product.inrPrice || product.price * 25).toFixed(0)}
            </span>
            {product.mrp > product.price && (
              <span className="text-secondary text-decoration-line-through" style={{ fontSize: '12px' }}>
                ₹{(product.inrMrp || product.mrp * 25).toFixed(0)}
              </span>
            )}
          </div>
          <div className="text-secondary" style={{ fontSize: '10px' }}>
            {product.inStock ? (
              <span className="text-success fw-semibold">In Stock</span>
            ) : (
              <span className="text-danger fw-semibold">Out of Stock</span>
            )}
          </div>
        </div>

        {qty === 0 ? (
          <button
            onClick={() => addToCart(product, 1)}
            disabled={!product.inStock}
            className="btn btn-sm btn-auramed rounded-pill px-3 py-1 d-flex align-items-center gap-1"
            style={{ fontSize: '12px' }}
          >
            <FaPlus size={10} /> Add
          </button>
        ) : (
          <div 
            className="d-flex align-items-center justify-content-between px-2 py-0 rounded-pill"
            style={{ backgroundColor: '#005F40', color: '#FFFFFF', height: '30px', minWidth: '82px' }}
          >
            <button 
              onClick={() => {
                if (qty <= 1) removeFromCart(product.id);
                else updateQuantity(product.id, -1);
              }}
              className="btn btn-sm text-white p-0 border-0 d-flex align-items-center justify-content-center"
              style={{ fontSize: '11px', width: '22px', height: '22px' }}
            >
              <FaMinus size={9} />
            </button>
            <span className="fw-bold px-1" style={{ fontSize: '12px' }}>{qty}</span>
            <button 
              onClick={() => updateQuantity(product.id, 1)}
              className="btn btn-sm text-white p-0 border-0 d-flex align-items-center justify-content-center"
              style={{ fontSize: '11px', width: '22px', height: '22px' }}
            >
              <FaPlus size={9} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}