import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaStar, FaCheck, FaPlus, FaMinus, FaHeart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductSlider({ title, subtitle, products = [], viewAllLink = '/products' }) {
  const scrollRef = useRef(null);
  const { addToCart, updateQuantity, removeFromCart, cartItems } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const isMobile = window.innerWidth < 576;
      const scrollAmount = isMobile 
        ? (direction === 'left' ? -scrollRef.current.clientWidth : scrollRef.current.clientWidth)
        : (direction === 'left' ? -320 : 320);
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getCartQuantity = (id) => {
    const item = cartItems.find(i => i.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="position-relative">
      {/* Section Header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <Link to={viewAllLink} className="text-decoration-none text-dark hover-green">
          {subtitle && (
            <span className="text-primary-green fw-bold text-uppercase d-block mb-1" style={{ fontSize: '11px', letterSpacing: '0.8px' }}>
              {subtitle}
            </span>
          )}
          <h3 className="fw-bold mb-0 text-dark" style={{ fontSize: '22px', letterSpacing: '-0.3px' }}>
            {title}
          </h3>
        </Link>
      </div>

      {/* Slider Container with Left & Right Arrows */}
      <div className="position-relative">
        {/* Left Arrow Button */}
        <button
          onClick={() => handleScroll('left')}
          className="btn position-absolute top-50 start-0 translate-middle-y z-3 shadow-md rounded-circle d-flex align-items-center justify-content-center p-0"
          style={{
            width: '36px',
            height: '36px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5ECE8',
            marginLeft: '-14px',
            color: '#172B24'
          }}
          aria-label="Previous products"
        >
          <FaChevronLeft size={13} />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={() => handleScroll('right')}
          className="btn position-absolute top-50 end-0 translate-middle-y z-3 shadow-md rounded-circle d-flex align-items-center justify-content-center p-0"
          style={{
            width: '36px',
            height: '36px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5ECE8',
            marginRight: '-14px',
            color: '#172B24'
          }}
          aria-label="Next products"
        >
          <FaChevronRight size={13} />
        </button>

        {/* Horizontal Scroll Track */}
        <div 
          ref={scrollRef}
          className="d-flex gap-2 gap-sm-3 overflow-x-auto pb-3 pt-1 px-1 hide-scrollbar"
          style={{
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {products.map((p) => {
            const qty = getCartQuantity(p.id);
            const currencySymbol = '₹';
            const displayPrice = (p.inrPrice || p.price * 25).toFixed(2);
            const displayMrp = (p.inrMrp || (p.mrp ? p.mrp * 25 : (p.price * 25 * 1.5))).toFixed(0);
            const discountPct = p.discount || Math.round(((displayMrp - displayPrice) / displayMrp) * 100) || 50;

            return (
              <div 
                key={p.id}
                className="bg-white rounded-3 p-2.5 p-sm-3 d-flex flex-column transition-all responsive-slider-card"
                style={{
                  border: '1px solid #E5ECE8',  
                  borderRadius: '12px',
                  scrollSnapAlign: 'start',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                }}
              >
                {/* Product Image */}
                <div 
                  className="position-relative d-flex align-items-center justify-content-center mb-2"
                  style={{ height: '125px', backgroundColor: '#FFFFFF' }}
                >
                  {/* Circular Wishlist Heart Button (matches image_2a1a68aa) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(p.id);
                    }}
                    className="btn position-absolute top-0 end-0 p-0 rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: '28px',
                      height: '28px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                      zIndex: 3
                    }}
                    title={isInWishlist(p.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    aria-label="Wishlist"
                  >
                    <FaHeart 
                      size={13} 
                      color={isInWishlist(p.id) ? '#E11D48' : '#5C6F66'} 
                    />
                  </button>

                  <Link to={`/products/${p.id}`} className="d-flex align-items-center justify-content-center w-100 h-100">
                    <img 
                      src={p.image} 
                      alt={p.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80';
                      }}
                      style={{ 
                        maxHeight: '130px', 
                        maxWidth: '100%', 
                        objectFit: 'contain' 
                      }}
                      loading="lazy"
                    />
                  </Link>
                </div>

                {/* Rating Badge & Add Button Row (matches image_9f57d2d4) */}
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span 
                    className="badge d-inline-flex align-items-center gap-1 px-2 py-1 rounded-pill"
                    style={{
                      backgroundColor: '#005F40',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: '700'
                    }}
                  >
                    <FaStar size={9} /> {p.rating || '4.4'}
                  </span>

                  {qty === 0 ? (
                    <button
                      onClick={() => addToCart(p, 1)}
                      className="btn d-inline-flex align-items-center justify-content-center px-3 py-1 text-decoration-none"
                      style={{
                        border: '1.5px solid #005F40',
                        color: '#005F40',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '600',
                        height: '30px',
                        padding: '2px 16px'
                      }}
                      title="Add to Cart"
                    >
                      Add
                    </button>
                  ) : (
                    <div 
                      className="d-flex align-items-center justify-content-between px-2 py-0 rounded-2"
                      style={{
                        backgroundColor: '#005F40',
                        color: '#FFFFFF',
                        height: '30px',
                        minWidth: '78px'
                      }}
                    >
                      <button 
                        onClick={() => {
                          if (qty <= 1) {
                            removeFromCart(p.id);
                          } else {
                            updateQuantity(p.id, -1);
                          }
                        }}
                        className="btn btn-sm text-white p-0 border-0 d-flex align-items-center justify-content-center"
                        style={{ fontSize: '11px', width: '22px', height: '22px' }}
                        aria-label="Decrease quantity"
                      >
                        <FaMinus size={9} />
                      </button>
                      <span className="fw-bold px-1" style={{ fontSize: '12px' }}>{qty}</span>
                      <button 
                        onClick={() => updateQuantity(p.id, 1)}
                        className="btn btn-sm text-white p-0 border-0 d-flex align-items-center justify-content-center"
                        style={{ fontSize: '11px', width: '22px', height: '22px' }}
                        aria-label="Increase quantity"
                      >
                        <FaPlus size={9} />
                      </button>
                    </div>
                  )}
                </div>



                {/* Product Title */}
                <h6 
                  className="mb-1 fw-semibold text-dark"
                  style={{
                    fontSize: '13.5px',
                    lineHeight: '1.35',
                    minHeight: '36px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                  title={p.name}
                >
                  <Link to={`/products/${p.id}`} className="text-dark text-decoration-none hover-green">
                    {p.name}
                  </Link>
                </h6>

                {/* Attribute / Subtitle */}
                <div 
                  className="text-secondary text-truncate mb-2" 
                  style={{ fontSize: '11px', color: '#6B7280' }}
                >
                  {p.attributes || p.composition || p.brand}
                </div>



                {/* Price Section */}
                <div className="mt-auto pt-2">
                  <div className="d-flex align-items-center gap-2 mb-1" style={{ fontSize: '11.5px' }}>
                    <span className="text-decoration-line-through text-muted">
                      MRP {currencySymbol}{displayMrp}
                    </span>
                    <span className="fw-bold" style={{ color: '#005F40' }}>
                      {discountPct}% off
                    </span>
                  </div>

                  <div className="d-flex align-items-baseline gap-1">
                    <span className="fw-bold text-dark" style={{ fontSize: '16px' }}>
                      {currencySymbol}{displayPrice}
                    </span>
                    {p.unitRate && (
                      <span className="text-secondary" style={{ fontSize: '10.5px' }}>
                        ({currencySymbol}{p.unitRate})
                      </span>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
