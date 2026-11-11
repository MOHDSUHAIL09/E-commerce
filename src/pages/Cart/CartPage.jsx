import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaTrashAlt, FaTruck, FaTag, FaFileMedical, FaShoppingBag, 
  FaChevronRight, FaChevronDown, FaChevronUp, FaPercent, 
  FaReceipt, FaCheckCircle, FaPaperPlane, FaPlus, FaCheck,
  FaChevronLeft, FaTimes
} from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

// Last minute buys items directly modeled after reference image (image_7e7c8793) in Indian Rupees
const LAST_MINUTE_BUYS = [
  {
    id: 'lmb-1',
    name: 'Apollo Life Cough Drops Lozenges, 1 Count',
    price: 49.00,
    mrp: 75.00,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80',
    stock: 200
  },
  {
    id: 'lmb-2',
    name: 'Apollo Life Hand Sanitizer Liquid Spray 100ml',
    price: 69.00,
    mrp: 99.00,
    image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=300&auto=format&fit=crop&q=80',
    stock: 150
  },
  {
    id: 'lmb-3',
    name: 'Apollo Pharmacy SPF 40 PA+++ Sunscreen 50ml',
    price: 180.00,
    mrp: 299.00,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop&q=80',
    stock: 80
  },
  {
    id: 'lmb-4',
    name: 'Apollo Pharmacy Activated Charcoal Face Wash',
    price: 149.00,
    mrp: 249.00,
    image: 'https://images.unsplash.com/photo-1556228722-d0b71946ec98?w=300&auto=format&fit=crop&q=80',
    stock: 95
  },
  {
    id: 'lmb-5',
    name: 'Apollo Life ORS Orange Flavour Liquid Drink 200ml',
    price: 34.00,
    mrp: 50.00,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=300&auto=format&fit=crop&q=80',
    stock: 120
  }
];

export default function CartPage() {
  const navigate = useNavigate();
  const {
    cartItems,
    itemsCount,
    subtotal,
    couponDiscount,
    shippingFee,
    tax,
    finalTotal,
    coupon,
    couponError,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    addToCart
  } = useCart();

  const { addresses, selectedAddressId, setSelectedAddressId, addAddress } = useAuth();

  const [couponInput, setCouponInput] = useState('');
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showBreakdownDetails, setShowBreakdownDetails] = useState(false);
  const lmbScrollRef = useRef(null);

  // New address form state
  const [newAddr, setNewAddr] = useState({
    type: 'Home',
    recipient: '',
    phone: '',
    addressLine: '',
    city: '',
    state: 'NY',
    zipCode: ''
  });

  const selectedAddr = addresses.find(a => a.id === selectedAddressId) || addresses[0];

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
    }
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (newAddr.recipient && newAddr.addressLine) {
      addAddress(newAddr);
      setShowAddressModal(false);
      setNewAddr({ type: 'Home', recipient: '', phone: '', addressLine: '', city: '', state: 'NY', zipCode: '' });
    }
  };

  // Calculate total savings (MRP discount + Coupon discount)
  const totalMrp = cartItems.reduce((acc, item) => acc + ((item.mrp || item.price * 1.3) * item.quantity), 0);
  const totalSavings = Math.max(0, (totalMrp - subtotal) + couponDiscount);

  // Empty cart fallback
  if (cartItems.length === 0) {
    return (
      <div className="py-5" style={{ backgroundColor: '#F8FAF9', minHeight: '75vh' }}>
        <div className="container-xl">
          <div className="card-auramed p-5 text-center my-4 mx-auto" style={{ maxWidth: '580px' }}>
            <div className="rounded-circle p-4 bg-light-green text-primary-green d-inline-flex mx-auto mb-3">
              <FaShoppingBag size={48} />
            </div>
            <h3 className="fw-bold text-dark mb-2">Your Healthcare Cart is Empty</h3>
            <p className="text-secondary mb-4" style={{ fontSize: '14px' }}>
              Add genuine medications, wellness vitamins, or diagnostic lab tests to continue.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link to="/products" className="btn btn-auramed px-4 py-2">
                Shop Medicines
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-3 py-md-4" style={{ backgroundColor: '#F8FAF9', minHeight: '85vh', paddingBottom: '90px' }}>
      <div className="container-xl">
        
        {/* Top Breadcrumb Title (Matches image_7e7c8793: MY CART) */}
        <div className="mb-3">
          <span className="fw-bold text-uppercase" style={{ color: '#093B2B', fontSize: '15px', letterSpacing: '0.5px' }}>
            MY CART
          </span>
        </div>

        {/* 1. Add Address Banner Strip (Matches image_7e7c8793) */}
        <div 
          className="p-3 mb-4 rounded-3 d-flex align-items-center justify-content-between flex-wrap gap-2 shadow-sm"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5ECE8' }}
        >
          <div className="d-flex align-items-center gap-2">
            <span style={{ color: '#D9531E', fontSize: '18px' }}>
              <FaPaperPlane />
            </span>
            <span style={{ fontSize: '13px', color: '#172B24', fontWeight: 500 }}>
              {selectedAddr ? (
                <>Deliver to: <strong>{selectedAddr.recipient}</strong> - {selectedAddr.addressLine}, {selectedAddr.city}</>
              ) : (
                'Add address to unlock extra discounts and best offers.'
              )}
            </span>
          </div>

          <button
            onClick={() => setShowAddressModal(true)}
            className="btn btn-link p-0 text-decoration-none fw-bold text-uppercase"
            style={{ color: '#D9531E', fontSize: '13px', letterSpacing: '0.5px' }}
          >
            {selectedAddr ? 'CHANGE ADDRESS' : 'ADD ADDRESS'}
          </button>
        </div>

        <div className="row g-4">
          
          {/* LEFT COLUMN: Cart Items & Last Minute Buys */}
          <div className="col-lg-8">
            
            {/* Header: X ITEMS IN YOUR CART + ADD ITEMS link */}
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="fw-bold text-uppercase mb-0" style={{ color: '#093B2B', fontSize: '15px', letterSpacing: '0.5px' }}>
                {itemsCount} {itemsCount === 1 ? 'ITEM' : 'ITEMS'} IN YOUR CART
              </h5>
              <Link
                to="/products"
                className="text-uppercase fw-bold text-decoration-none"
                style={{ color: '#D9531E', fontSize: '13px', letterSpacing: '0.5px' }}
              >
                ADD ITEMS
              </Link>
            </div>

            {/* Shipment Card Container (Matches image_7e7c8793) */}
            <div className="card-auramed p-0 mb-4 overflow-hidden border">
              
              {/* Delivery Schedule Header */}
              <div 
                className="p-3 d-flex align-items-center justify-content-between border-bottom"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <div className="d-flex align-items-center gap-2">
                  <FaTruck size={17} color="#172B24" />
                  <span className="fw-bold text-dark" style={{ fontSize: '15px' }}>
                    By Tomorrow, 10:00 AM
                  </span>
                </div>
                <span className="text-secondary" style={{ fontSize: '13px' }}>
                  Shipment 1/1
                </span>
              </div>

              {/* Product Rows List */}
              <div className="p-3 p-md-4 bg-white d-flex flex-column gap-3">
                {cartItems.map((item, idx) => (
                  <div 
                    key={item.id} 
                    className={`d-flex align-items-start justify-content-between gap-3 pb-3 ${idx < cartItems.length - 1 ? 'border-bottom' : ''}`}
                  >
                    {/* Product Image */}
                    <div 
                      className="rounded p-1 d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: '64px', height: '64px', backgroundColor: '#F8FAF9', border: '1px solid #E5ECE8' }}
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow-1">
                      <Link 
                        to={`/products/${item.id}`} 
                        className="fw-bold text-dark text-decoration-none hover-green d-block mb-1" 
                        style={{ fontSize: '14px', lineHeight: 1.3 }}
                      >
                        {item.name}
                      </Link>
                      
                      <div className="text-secondary mb-1" style={{ fontSize: '12px' }}>
                        {item.brand} • Bottle/Pack of 1
                      </div>

                      {/* Purple Promo Tag (Matches image_7e7c8793: ADD 2 MORE, SAVE 4% EXTRA) */}
                      <div className="mb-2">
                        <span 
                          className="badge py-1 px-2 fw-semibold"
                          style={{ 
                            backgroundColor: '#F3EEFF', 
                            color: '#6F42C1', 
                            fontSize: '11px',
                            borderRadius: '4px',
                            letterSpacing: '0.3px'
                          }}
                        >
                          ADD 2 MORE, SAVE 4% EXTRA ⓘ
                        </span>
                      </div>

                      {/* Price & MRP strike-through */}
                      <div className="d-flex align-items-baseline gap-2">
                        <span className="text-secondary text-decoration-line-through" style={{ fontSize: '12px' }}>
                          MRP ₹{(item.mrp || item.price * 1.3).toFixed(2)}
                        </span>
                        <span className="text-success fw-bold" style={{ fontSize: '12px' }}>
                          {item.discount || 25}% off
                        </span>
                      </div>
                      <div className="fw-bold fs-5 text-dark" style={{ letterSpacing: '-0.3px' }}>
                        ₹{item.price.toFixed(2)}
                      </div>
                    </div>

                    {/* Right Controls: Trash Icon + Qty Select Dropdown (Matches image_7e7c8793) */}
                    <div className="d-flex flex-column align-items-end justify-content-between h-100" style={{ minHeight: '90px' }}>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="btn btn-sm btn-link text-secondary p-0 border-0"
                        title="Remove product"
                        style={{ cursor: 'pointer' }}
                      >
                        <FaTrashAlt size={15} color="#8A9992" />
                      </button>

                      {/* Qty Dropdown Button (Qty 1 ∨) */}
                      <div className="position-relative mt-auto">
                        <select
                          className="form-select form-select-sm fw-bold border"
                          style={{
                            borderRadius: '6px',
                            padding: '4px 28px 4px 10px',
                            fontSize: '13px',
                            color: '#172B24',
                            backgroundColor: '#FFFFFF',
                            borderColor: '#D0DDD6',
                            cursor: 'pointer'
                          }}
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, Number(e.target.value) - item.quantity)}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(q => (
                            <option key={q} value={q}>Qty {q}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>

            {/* 2. LAST MINUTE BUYS CAROUSEL (Matches image_7e7c8793) */}
            <div className="mt-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="fw-bold text-uppercase mb-0" style={{ color: '#093B2B', fontSize: '14px', letterSpacing: '0.5px' }}>
                  LAST MINUTE BUYS
                </h5>
                <div className="d-flex align-items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (lmbScrollRef.current) {
                        lmbScrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
                      }
                    }}
                    className="btn btn-sm btn-light border rounded-circle d-flex align-items-center justify-content-center p-0 shadow-xs"
                    style={{ width: '32px', height: '32px', color: '#005F40', backgroundColor: '#FFFFFF' }}
                    aria-label="Previous items"
                  >
                    <FaChevronLeft size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (lmbScrollRef.current) {
                        lmbScrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
                      }
                    }}
                    className="btn btn-sm btn-light border rounded-circle d-flex align-items-center justify-content-center p-0 shadow-xs"
                    style={{ width: '32px', height: '32px', color: '#005F40', backgroundColor: '#FFFFFF' }}
                    aria-label="Next items"
                  >
                    <FaChevronRight size={12} />
                  </button>
                </div>
              </div>

              <div 
                className="p-3 rounded-3 position-relative overflow-hidden" 
                style={{ backgroundColor: '#EAF6FC', border: '1px solid #D6EDFA' }}
              >
                {/* Horizontal Scrolling Cards */}
                <div 
                  ref={lmbScrollRef}
                  className="d-flex align-items-stretch gap-3 overflow-auto py-1 hide-scrollbar"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {LAST_MINUTE_BUYS.map((lmb) => (
                    <div 
                      key={lmb.id} 
                      className="bg-white rounded-3 p-3 d-flex flex-column justify-content-between text-center flex-shrink-0 shadow-sm border"
                      style={{ width: '150px' }}
                    >
                      <div className="mb-2 d-flex align-items-center justify-content-center" style={{ height: '70px' }}>
                        <img 
                          src={lmb.image} 
                          alt={lmb.name} 
                          style={{ maxHeight: '60px', maxWidth: '100%', objectFit: 'contain' }}
                        />
                      </div>

                      <div className="text-start mb-2">
                        <div 
                          className="fw-semibold text-dark text-truncate-2 line-clamp-2" 
                          style={{ fontSize: '11px', lineHeight: 1.3, minHeight: '28px' }}
                          title={lmb.name}
                        >
                          {lmb.name}
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-between mt-auto pt-2 border-top">
                        <div className="text-start">
                          <small className="text-secondary text-decoration-line-through d-block" style={{ fontSize: '10px' }}>
                            ₹{lmb.mrp.toFixed(0)}
                          </small>
                          <strong className="text-dark" style={{ fontSize: '13px' }}>
                            ₹{lmb.price.toFixed(0)}
                          </strong>
                        </div>

                        <button
                          onClick={() => addToCart(lmb, 1)}
                          className="btn btn-sm text-uppercase fw-bold px-2 py-0"
                          style={{ 
                            border: '1px solid #00875A', 
                            color: '#00875A', 
                            fontSize: '11px',
                            borderRadius: '4px',
                            height: '24px'
                          }}
                        >
                          ADD
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Offers, Cart Breakdown, Payment Offers */}
          <div className="col-lg-4">
            
            {/* OFFERS & DISCOUNTS (Matches image_7e7c8793) */}
            <div className="mb-3">
              <span className="text-secondary text-uppercase fw-bold mb-2 d-block" style={{ fontSize: '12px', letterSpacing: '0.8px' }}>
                OFFERS & DISCOUNTS
              </span>

              <div 
                onClick={() => setShowCouponModal(!showCouponModal)}
                className="p-3 rounded-3 d-flex align-items-center justify-content-between shadow-sm cursor-pointer"
                style={{ 
                  backgroundColor: '#EAF7F0', 
                  border: '1px solid #C4EDD8', 
                  cursor: 'pointer' 
                }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center text-white"
                    style={{ width: '32px', height: '32px', backgroundColor: '#159B64' }}
                  >
                    <FaPercent size={14} />
                  </div>
                  <div>
                    <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                      {coupon ? `Coupon Applied: ${coupon.code}` : 'Apply Coupon'}
                    </div>
                    <small className="text-secondary" style={{ fontSize: '11px' }}>
                      {coupon ? coupon.name : 'Click to apply coupon codes'}
                    </small>
                  </div>
                </div>

                <FaChevronRight size={14} color="#159B64" />
              </div>

              {/* Coupon Drawer */}
              {showCouponModal && (
                <div className="mt-2 p-3 bg-white border rounded-3 shadow-sm">
                  {coupon ? (
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="badge bg-success">{coupon.code} (Active)</span>
                      <button onClick={removeCoupon} className="btn btn-sm btn-link text-danger p-0">Remove</button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon}>
                      <div className="input-group input-group-sm mb-2">
                        <input
                          type="text"
                          className="form-control text-uppercase"
                          placeholder="e.g. HEALTH20"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                        />
                        <button type="submit" className="btn btn-auramed">Apply</button>
                      </div>
                      {couponError && <small className="text-danger d-block mb-1">{couponError}</small>}
                      <div className="d-flex flex-wrap gap-1 mt-1">
                        {['HEALTH20', 'FIRST50', 'CARE10'].map(code => (
                          <button
                            key={code}
                            type="button"
                            onClick={() => {
                              applyCoupon(code);
                              setShowCouponModal(false);
                            }}
                            className="btn btn-sm btn-light border py-0 px-2"
                            style={{ fontSize: '11px' }}
                          >
                            {code}
                          </button>
                        ))}
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Cart Breakdown (Matches image_7e7c8793) */}
            <div className="mb-4">
              <h5 className="fw-bold text-dark mb-2" style={{ fontSize: '16px' }}>
                Cart Breakdown
              </h5>

              <div className="card-auramed p-0 overflow-hidden shadow-sm border">
                
                {/* Total Bill Row */}
                <div 
                  onClick={() => setShowBreakdownDetails(!showBreakdownDetails)}
                  className="p-3 d-flex align-items-center justify-content-between cursor-pointer"
                  style={{ cursor: 'pointer', backgroundColor: '#FFFFFF' }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <FaReceipt size={22} color="#172B24" />
                    <div>
                      <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>Total Bill</div>
                      <small className="text-secondary" style={{ fontSize: '11px' }}>Incl. charges</small>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <span className="text-secondary text-decoration-line-through" style={{ fontSize: '13px' }}>
                      ₹{totalMrp.toFixed(2)}
                    </span>
                    <span className="fw-bold text-dark fs-6">
                      ₹{finalTotal.toFixed(2)}
                    </span>
                    <FaChevronRight size={12} color="#64756D" />
                  </div>
                </div>

                {/* Optional Expandable Breakdown Details */}
                {showBreakdownDetails && (
                  <div className="p-3 bg-light border-top" style={{ fontSize: '13px' }}>
                    <div className="d-flex justify-content-between mb-1 text-secondary">
                      <span>Items MRP Total:</span>
                      <span>₹{totalMrp.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-1 text-success">
                      <span>Catalog Discount:</span>
                      <span>-₹{(totalMrp - subtotal).toFixed(2)}</span>
                    </div>
                    {couponDiscount > 0 && (
                      <div className="d-flex justify-content-between mb-1 text-success">
                        <span>Coupon Savings ({coupon.code}):</span>
                        <span>-₹{couponDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="d-flex justify-content-between mb-1 text-secondary">
                      <span>Delivery Fee:</span>
                      <span>{shippingFee === 0 ? <strong className="text-success">FREE</strong> : `₹${shippingFee.toFixed(2)}`}</span>
                    </div>
                    <div className="d-flex justify-content-between text-secondary">
                      <span>Estimated Tax (5%):</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                {/* Green Savings Alert Ribbon (Matches image_7e7c8793: You will save ₹582.5 on this order.) */}
                <div 
                  className="px-3 py-2 d-flex align-items-center gap-2"
                  style={{ backgroundColor: '#EAF7F0', borderTop: '1px solid #D1EFE0' }}
                >
                  <FaCheckCircle color="#159B64" size={13} />
                  <span className="fw-bold text-dark-green" style={{ fontSize: '12px' }}>
                    You will save ₹{totalSavings.toFixed(2)} on this order.
                  </span>
                </div>

              </div>
            </div>

            {/* Available Payment Offers Card (Matches image_7e7c8793) */}
            <div className="mb-4">
              <div className="fw-bold text-dark mb-1" style={{ fontSize: '14px' }}>
                Available Payment Offers
              </div>
              <small className="text-secondary d-block mb-2" style={{ fontSize: '12px' }}>
                Offer auto-applies at checkout
              </small>

              <div 
                className="p-3 rounded-3 bg-white border d-flex align-items-center justify-content-between shadow-sm"
              >
                <div className="d-flex align-items-center gap-3">
                  <div 
                    className="p-2 rounded bg-light border fw-bold text-primary"
                    style={{ fontSize: '11px', letterSpacing: '0.5px' }}
                  >
                    PAYTM UPI
                  </div>
                  <div>
                    <div className="fw-bold text-success" style={{ fontSize: '13px' }}>
                      Flat ₹50.00 Cashback
                    </div>
                    <small className="text-danger fw-semibold" style={{ fontSize: '11px' }}>
                      Offer Unlocked!
                    </small>
                  </div>
                </div>

                <FaChevronRight size={12} color="#64756D" />
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 3. Sticky Bottom Checkout Bar (Matches image_7e7c8793: Amount to pay ⌃ ₹476.58 + Proceed button) */}
      <div 
        className="position-fixed bottom-0 start-0 end-0 bg-white border-top shadow-lg p-3 z-3"
        style={{ zIndex: 1050 }}
      >
        <div className="container-xl d-flex align-items-center justify-content-between">
          <div>
            <div 
              onClick={() => setShowBreakdownDetails(!showBreakdownDetails)}
              className="text-secondary d-flex align-items-center gap-1 cursor-pointer" 
              style={{ fontSize: '12px', cursor: 'pointer' }}
            >
              <span>Amount to pay</span>
              {showBreakdownDetails ? <FaChevronDown size={10} /> : <FaChevronUp size={10} />}
            </div>
            <div className="fw-bold text-dark fs-4" style={{ letterSpacing: '-0.5px', lineHeight: 1.1 }}>
              ₹{finalTotal.toFixed(2)}
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="btn text-white fw-bold px-4 py-2 text-uppercase shadow-sm"
            style={{ 
              backgroundColor: '#0A553E', 
              borderRadius: '6px', 
              fontSize: '15px',
              minWidth: '170px',
              height: '46px'
            }}
          >
            Proceed
          </button>
        </div>
      </div>

      {/* Address Selection & Creation Modal */}
      {showAddressModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1100 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Select Delivery Address</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddressModal(false)}></button>
              </div>

              <div className="modal-body p-4">
                <div className="fw-semibold text-dark mb-2" style={{ fontSize: '13px' }}>Saved Delivery Locations:</div>
                <div className="d-flex flex-column gap-2 mb-4">
                  {addresses.map(addr => (
                    <div
                      key={addr.id}
                      onClick={() => {
                        setSelectedAddressId(addr.id);
                        setShowAddressModal(false);
                      }}
                      className={`p-3 rounded border cursor-pointer ${selectedAddressId === addr.id ? 'bg-light-green border-success shadow-sm' : 'bg-white'}`}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex justify-content-between mb-1">
                        <strong>{addr.recipient} ({addr.type})</strong>
                        {selectedAddressId === addr.id && <FaCheckCircle color="#159B64" />}
                      </div>
                      <div className="text-secondary" style={{ fontSize: '12px' }}>
                        {addr.addressLine}, {addr.city}, {addr.state} {addr.zipCode}
                      </div>
                      <div className="text-secondary" style={{ fontSize: '12px' }}>{addr.phone}</div>
                    </div>
                  ))}
                </div>

                <div className="border-top pt-3">
                  <h6 className="fw-bold text-dark mb-2">Or Add New Address</h6>
                  <form onSubmit={handleSaveAddress}>
                    <div className="row g-2 mb-2">
                      <div className="col-6">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Recipient Name"
                          required
                          value={newAddr.recipient}
                          onChange={(e) => setNewAddr({ ...newAddr, recipient: e.target.value })}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Phone Number"
                          required
                          value={newAddr.phone}
                          onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                        />
                      </div>
                      <div className="col-12">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Street Address, Apt / Suite"
                          required
                          value={newAddr.addressLine}
                          onChange={(e) => setNewAddr({ ...newAddr, addressLine: e.target.value })}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="City"
                          required
                          value={newAddr.city}
                          onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="ZIP Code"
                          required
                          value={newAddr.zipCode}
                          onChange={(e) => setNewAddr({ ...newAddr, zipCode: e.target.value })}
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-sm btn-auramed w-100">
                      Save & Deliver to this address
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
