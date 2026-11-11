
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaPlus,
  FaMinus,
  FaHeart,
  FaShoppingCart,
  FaEye
} from 'react-icons/fa';

import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductSlider({
  title,
  subtitle,
  products = [],
  viewAllLink = '/products'
}) {
  const scrollRef = useRef(null);

  const {
    addToCart,
    updateQuantity,
    removeFromCart,
    cartItems
  } = useCart();

  const { isInWishlist, toggleWishlist } = useWishlist();

  // Scroll full visible row
  const handleScroll = (direction) => {
    if (!scrollRef.current) return;

    const slider = scrollRef.current;
    const scrollAmount = slider.clientWidth * 0.9;

    slider.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  };

  // Get cart quantity
  const getCartQuantity = (id) => {
    const item = cartItems.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <section className="product-showcase-section">

      {/* SECTION HEADER */}
      <div className="product-showcase-header">

        <Link
          to={viewAllLink}
          className="product-showcase-heading text-decoration-none"
        >
          {subtitle && (
            <span className="product-showcase-subtitle">
              {subtitle}
            </span>
          )}

          <h3>{title}</h3>
        </Link>

        <div className="product-showcase-navigation">

          <button
            type="button"
            onClick={() => handleScroll('left')}
            aria-label="Previous products"
          >
            <FaChevronLeft />
          </button>

          <button
            type="button"
            onClick={() => handleScroll('right')}
            aria-label="Next products"
          >
            <FaChevronRight />
          </button>

        </div>
      </div>

      {/* PRODUCT SLIDER */}
      <div className="product-showcase-track-wrapper">

        <div
          ref={scrollRef}
          className="product-showcase-track"
        >

          {products.map((p) => {

            const qty = getCartQuantity(p.id);

            const currencySymbol = '₹';

            const displayPrice = Number(
              p.inrPrice || p.price * 25
            ).toFixed(2);

            const displayMrp = Number(
              p.inrMrp ||
              (p.mrp
                ? p.mrp * 25
                : p.price * 25 * 1.5)
            ).toFixed(0);

            const discountPct =
              p.discount ||
              Math.round(
                ((displayMrp - displayPrice) / displayMrp) * 100
              ) || 50;

            const wishlistActive = isInWishlist(p.id);

            return (

              <div
                key={p.id}
                className="product-showcase-card"
              >

                {/* PRODUCT IMAGE */}
                <div className="product-showcase-image">

                  <Link
                    to={`/products/${p.id}`}
                    className="product-image-link"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                    />

                    {/* HOVER VIEW MORE */}
                    <div className="product-image-overlay">
                      <span>
                        <FaEye />
                        View More
                      </span>
                    </div>

                  </Link>

                  {/* WISHLIST */}
                  <button
                    type="button"
                    className={`product-wishlist-btn ${
                      wishlistActive ? 'active' : ''
                    }`}
                    onClick={() => toggleWishlist(p.id)}
                    title={
                      wishlistActive
                        ? 'Remove from Wishlist'
                        : 'Add to Wishlist'
                    }
                    aria-label="Toggle wishlist"
                  >
                    <FaHeart />
                  </button>

                  {/* RATING */}
                  <span className="product-rating">
                    <FaStar />
                    {p.rating || '4.4'}
                  </span>

                </div>

                {/* PRODUCT DETAILS */}
                <div className="product-showcase-details">

                  {/* TITLE */}
                  <h6
                    className="product-showcase-title"
                    title={p.name}
                  >
                    <Link to={`/products/${p.id}`}>
                      {p.name}
                    </Link>
                  </h6>

                  {/* DESCRIPTION */}
                  <p
                    className="product-showcase-description"
                    title={p.attributes || p.composition || p.brand}
                  >
                    {p.attributes || p.composition || p.brand || ''}
                  </p>

                  {/* MRP & DISCOUNT */}
                  <div className="product-showcase-offer">

                    <span className="product-mrp">
                      MRP {currencySymbol}{displayMrp}
                    </span>

                    <span className="product-discount">
                      {discountPct}% Off
                    </span>

                  </div>

                  {/* PRICE & CART */}
                  <div className="product-showcase-footer">

                    <div className="product-price">
                      <span>
                        {currencySymbol}{displayPrice}
                      </span>

                      {p.unitRate && (
                        <small>
                          ({currencySymbol}{p.unitRate})
                        </small>
                      )}
                    </div>

                    {/* ADD TO CART */}
                    {qty === 0 ? (

                      <button
                        type="button"
                        className="product-add-btn"
                        onClick={() => addToCart(p, 1)}
                      >
                        Add to Cart
                        <FaShoppingCart />
                      </button>

                    ) : (

                      <div className="product-quantity-control">

                        <button
                          type="button"
                          onClick={() => {
                            if (qty <= 1) {
                              removeFromCart(p.id);
                            } else {
                              updateQuantity(p.id, -1);
                            }
                          }}
                          aria-label="Decrease quantity"
                        >
                          <FaMinus />
                        </button>

                        <span>{qty}</span>

                        <button
                          type="button"
                          onClick={() => updateQuantity(p.id, 1)}
                          aria-label="Increase quantity"
                        >
                          <FaPlus />
                        </button>

                      </div>

                    )}

                  </div>

                </div>

              </div>

            );

          })}

        </div>
      </div>

      {/* COMPONENT CSS */}
      <style>{`

        .product-showcase-section {
          width: 100%;
          position: relative;
          background: transparent;
        }

        /* HEADER */

        .product-showcase-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 15px;
        }

        .product-showcase-heading {
          color: #172B24;
        }

        .product-showcase-subtitle {
          display: block;
          font-size: 11px;
          font-weight: 700;
          color: #08784B;
          letter-spacing: .8px;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .product-showcase-heading h3 {
          font-size: 22px;
          font-weight: 700;
          margin: 0;
          letter-spacing: -.4px;
          color: #172B24;
        }

        /* NAVIGATION */

        .product-showcase-navigation {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .product-showcase-navigation button {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid #E5E7EB;
          background: #FFFFFF;
          color: #005F40;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all .2s ease;
        }

        .product-showcase-navigation button:hover {
          background: #005F40;
          color: #FFFFFF;
          border-color: #005F40;
        }

        .product-showcase-navigation button svg {
          font-size: 12px;
        }

        /* SLIDER TRACK */

        .product-showcase-track-wrapper {
          width: 100%;
          overflow: hidden;
        }

        .product-showcase-track {
          display: flex;
          gap: 16px;
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-behavior: smooth;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 3px 2px 12px;
          -webkit-overflow-scrolling: touch;
        }

        .product-showcase-track::-webkit-scrollbar {
          display: none;
        }

        /* FIVE CARDS IN ONE ROW */

        .product-showcase-card {
          flex: 0 0 calc((100% - 64px) / 5);
          min-width: 0;
          max-width: calc((100% - 64px) / 5);
          background: #FFFFFF;
          border: 1px solid #E5DED4;
          border-radius: 16px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          scroll-snap-align: start;
          box-shadow: 0 5px 16px rgba(0,0,0,.07);
          transition:
            transform .25s ease,
            box-shadow .25s ease,
            border-color .25s ease;
        }

        .product-showcase-card:hover {
          transform: translateY(-4px);
          border-color: #C9DCCF;
          box-shadow: 0 10px 24px rgba(0,95,64,.12);
        }

        /* IMAGE */

        .product-showcase-image {
          width: 100%;
          height: 150px;
          position: relative;
          flex-shrink: 0;
          overflow: hidden;
          border-radius: 12px;
          background: #FFFFFF;
        }

        .product-image-link {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .product-image-link img {
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          display: block;
          transition: transform .4s ease;
        }

        .product-showcase-card:hover .product-image-link img {
          transform: scale(1.05);
        }

        /* VIEW MORE OVERLAY */

        .product-image-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, .32);
          opacity: 0;
          visibility: hidden;
          transition: all .3s ease;
        }

        .product-image-overlay span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          background: #FFFFFF;
          color: #005F40;
          padding: 9px 15px;
          border-radius: 30px;
          font-size: 12px;
          font-weight: 700;
          transform: translateY(10px);
          transition: transform .3s ease;
        }

        .product-showcase-card:hover .product-image-overlay {
          opacity: 1;
          visibility: visible;
        }

        .product-showcase-card:hover .product-image-overlay span {
          transform: translateY(0);
        }

        /* WISHLIST */

        .product-wishlist-btn {
          position: absolute;
          top: 9px;
          right: 9px;
          z-index: 3;
          width: 34px;
          height: 34px;
          border: 1px solid #E9E1D5;
          border-radius: 50%;
          background: #FFFFFF;
          color: #9B8159;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all .2s ease;
        }

        .product-wishlist-btn svg {
          font-size: 14px;
        }

        .product-wishlist-btn:hover,
        .product-wishlist-btn.active {
          color: #E11D48;
          background: #FFF1F2;
          border-color: #FECDD3;
        }

        /* RATING */

        .product-rating {
          position: absolute;
          left: 8px;
          bottom: 8px;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #005F40;
          color: #FFFFFF;
          border-radius: 20px;
          padding: 3px 8px;
          font-size: 11px;
          font-weight: 700;
          line-height: 1;
        }

        .product-rating svg {
          font-size: 10px;
        }

        /* PRODUCT DETAILS */

        .product-showcase-details {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding-top: 9px;
          min-width: 0;
        }

        .product-showcase-title {
          font-size: 14px;
          line-height: 1.4;
          font-weight: 600;
          min-height: 39px;
          max-height: 39px;
          margin: 0 0 4px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .product-showcase-title a {
          text-decoration: none;
          color: #172B24;
          transition: color .2s ease;
        }

        .product-showcase-title a:hover {
          color: #005F40;
        }

        .product-showcase-description {
          font-size: 11px;
          color: #6B7280;
          line-height: 1.4;
          margin: 0 0 9px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-height: 16px;
        }

        /* OFFER */

        .product-showcase-offer {
          display: flex;
          align-items: center;
          gap: 9px;
          flex-wrap: wrap;
          margin-bottom: 9px;
          font-size: 11px;
        }

        .product-mrp {
          color: #888888;
          text-decoration: line-through;
        }

        .product-discount {
          color: #B42332;
          font-weight: 700;
        }

        /* PRICE + BUTTON */

        .product-showcase-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 5px;
          margin-top: auto;
          padding-top: 2px;
        }

        .product-price {
          display: flex;
          align-items: baseline;
          gap: 3px;
          min-width: 0;
          white-space: nowrap;
        }

        .product-price > span {
          font-size: 17px;
          font-weight: 800;
          color: #111827;
        }

        .product-price small {
          font-size: 10px;
          color: #6B7280;
        }

        /* ADD TO CART */

        .product-add-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          flex-shrink: 0;
          height: 36px;
          padding: 0 11px;
          border: 0;
          border-radius: 10px;
          background: #08784B;
          color: #FFFFFF;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
          cursor: pointer;
          box-shadow: 0 3px 8px rgba(0,95,64,.17);
          transition: all .2s ease;
        }

        .product-add-btn:hover {
          background: #005F40;
          transform: translateY(-2px);
        }

        .product-add-btn svg {
          font-size: 12px;
        }

        /* QUANTITY */

        .product-quantity-control {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
          height: 34px;
          min-width: 85px;
          padding: 0 5px;
          border-radius: 9px;
          background: #08784B;
          color: #FFFFFF;
        }

        .product-quantity-control button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 23px;
          height: 25px;
          border: 0;
          background: transparent;
          color: #FFFFFF;
          cursor: pointer;
        }

        .product-quantity-control button svg {
          font-size: 10px;
        }

        .product-quantity-control span {
          font-size: 12px;
          font-weight: 700;
        }

        /* TABLET */

        @media (max-width: 991.98px) {

          .product-showcase-card {
            flex-basis: calc((100% - 48px) / 4);
            max-width: calc((100% - 48px) / 4);
          }

          .product-showcase-image {
            height: 135px;
          }

        }

        /* SMALL TABLET */

        @media (max-width: 767.98px) {

          .product-showcase-card {
            flex-basis: calc((100% - 32px) / 3);
            max-width: calc((100% - 32px) / 3);
          }

          .product-showcase-image {
            height: 125px;
          }

        }

        /* MOBILE */

        @media (max-width: 575.98px) {

          .product-showcase-header {
            margin-bottom: 12px;
          }

          .product-showcase-heading h3 {
            font-size: 19px;
          }

          .product-showcase-track {
            gap: 12px;
          }

          .product-showcase-card {
            flex-basis: calc((100% - 12px) / 2);
            max-width: calc((100% - 12px) / 2);
            padding: 8px;
            border-radius: 13px;
          }

          .product-showcase-image {
            height: 135px;
          }

          .product-showcase-title {
            font-size: 13px;
          }

          .product-price > span {
            font-size: 15px;
          }

          .product-add-btn {
            padding: 0 8px;
            font-size: 10px;
            height: 32px;
          }

          .product-wishlist-btn {
            width: 30px;
            height: 30px;
          }

        }

        /* SMALL MOBILE */

        @media (max-width: 380px) {

          .product-showcase-card {
            flex-basis: 78%;
            max-width: 78%;
          }

          .product-showcase-image {
            height: 160px;
          }

        }

        /* TOUCH DEVICES */
        @media (hover: none) {
          .product-image-overlay {
            display: none;
          }

          .product-showcase-card:hover {
            transform: none;
          }

        }

      `}</style>

    </section>
  );
}
