import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaPlus,
  FaTruck,
  FaShieldAlt,
  FaLock,
  FaArrowRight,
  FaBoxOpen
} from 'react-icons/fa';

import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

// Aapka original CHECKOUT_CSS yahan rahega 
const CHECKOUT_CSS = `
.checkout-page { background: #f8fafc; min-height: 100vh; padding: 25px 0 55px; color: #172033; font-family: inherit; }
.checkout-main-card { background: #fff; border: 1px solid #e9edf2; border-radius: 12px; padding: 25px; box-shadow: 0 3px 15px rgba(15,23,42,.035); }
.checkout-address-heading { font-size: 19px; font-weight: 750; color: #172033; }
.checkout-section-label { font-size: 12px; font-weight: 750; color: #64748b; letter-spacing: .65px; margin: 25px 0 14px; }
.checkout-add-btn { height: 39px; padding: 0 17px; border: 1px solid #0f766e; background: #fff; color: #087f70; border-radius: 6px; font-size: 12px; font-weight: 750; transition: all .2s ease; }
.checkout-add-btn:hover { background: #087f70; color: white; box-shadow: 0 5px 14px rgba(8,127,112,.15); }
.checkout-address-card { position: relative; border: 1px solid #e5e7eb; border-radius: 9px; padding: 20px 22px; background: #fff; margin-bottom: 12px; cursor: pointer; transition: all .25s ease; box-shadow: 0 2px 7px rgba(15,23,42,.06); }
.checkout-address-card:hover { border-color: #9bd8c7; box-shadow: 0 5px 17px rgba(15,118,110,.09); }
.checkout-address-card.selected { border: 1px solid #d1e9e2; box-shadow: 0 3px 12px rgba(15,118,110,.07); }
.checkout-radio { width: 18px; height: 18px; accent-color: #0A553E; cursor: pointer; flex-shrink: 0; }
.checkout-address-name { font-size: 15px; font-weight: 750; color: #172033; }
.checkout-address-type { font-size: 10px; font-weight: 750; letter-spacing: .5px; padding: 4px 11px; border: 1px solid #10b981; border-radius: 20px; color: #059669; background: #f0fdf9; }
.checkout-address-text { font-size: 14px; line-height: 1.65; color: #475569; margin: 10px 0; padding-left: 32px; word-break: break-word; }
.checkout-address-phone { font-size: 13px; color: #475569; padding-left: 32px; margin-bottom: 16px; }
.checkout-cod { font-size: 13px; color: #475569; padding-left: 32px; margin-bottom: 17px; }
.checkout-address-actions { display: flex; gap: 12px; padding-left: 32px; }
.checkout-add-card { border: 1px dashed #cbd5e1; background: #fff; border-radius: 9px; min-height: 83px; display: flex; align-items: center; padding: 20px 22px; gap: 10px; cursor: pointer; color: #0A553E; font-size: 15px; font-weight: 750; transition: all .25s ease; }
.checkout-add-card:hover { border-color: #0A553E; background: #F8FAF9; }
.checkout-add-icon { width: 30px; height: 30px; border-radius: 50%; display: flex; justify-content: center; align-items: center; background: #EAF7F0; color: #0A553E; }
.checkout-summary { background: #fff; border: 1px solid #e9edf2; border-radius: 12px; padding: 23px; position: sticky; top: 90px; box-shadow: 0 3px 15px rgba(15,23,42,.035); }
.checkout-summary-title { font-size: 14px; font-weight: 800; color: #273449; letter-spacing: .3px; margin-bottom: 18px; }
.checkout-estimate { display: flex; align-items: center; gap: 13px; margin-bottom: 24px; padding: 12px; border-radius: 8px; background: #f8fafc; }
.checkout-estimate-icon { width: 42px; height: 42px; border-radius: 9px; display: flex; align-items: center; justify-content: center; color: #0f927c; background: #e7f7f1; flex-shrink: 0; }
.checkout-estimate-text { font-size: 13px; line-height: 1.6; color: #475569; }
.checkout-price-heading { font-size: 13px; font-weight: 800; color: #273449; margin-bottom: 15px; }
.checkout-price-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; font-size: 14px; color: #475569; margin-bottom: 12px; }
.checkout-price-row strong { color: #263449; font-weight: 600; }
.checkout-discount { color: #079c79 !important; }
.checkout-divider { border: 0; border-top: 1px dashed #dce2e9; margin: 16px 0; }
.checkout-total { font-size: 15px; font-weight: 800; color: #263449; margin-bottom: 17px; }
.checkout-total strong { font-size: 18px; color: #172033; }
.checkout-continue { width: 100%; height: 49px; border: none; border-radius: 5px; background: #0A553E; color: white; font-size: 14px; font-weight: 800; letter-spacing: .4px; transition: all .25s ease; box-shadow: 0 5px 14px rgba(10,85,62,.18); }
.checkout-continue:hover { background: #073E2D; transform: translateY(-2px); box-shadow: 0 8px 18px rgba(10,85,62,.25); }
.checkout-continue:disabled { opacity: .5; cursor: not-allowed; transform: none; }
.checkout-security { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 11px; color: #94a3b8; margin-top: 15px; }
.checkout-modal-content { border: none; border-radius: 14px; overflow: hidden; }
.checkout-modal-content .modal-header { padding: 20px 22px; border-bottom: 1px solid #edf0f4; }
.checkout-modal-content .modal-title { font-size: 18px; font-weight: 800; }
.checkout-modal-content .form-label { font-size: 12px; font-weight: 700; color: #475569; }
.checkout-modal-content .form-control, .checkout-modal-content .form-select { min-height: 42px; border-radius: 7px; font-size: 13px; }
@media(max-width:991px) { .checkout-summary { position: static; } }
@media(max-width:767px) { .checkout-page { padding: 18px 0 35px; } .checkout-main-card { padding: 17px; } .checkout-address-heading { font-size: 16px; } .checkout-add-btn { padding: 0 10px; font-size: 10px; } .checkout-address-card { padding: 17px 14px; } .checkout-address-text, .checkout-address-phone, .checkout-cod, .checkout-address-actions { padding-left: 27px; } .checkout-summary { padding: 19px; } }
`;

export default function CheckoutPage() {
  const navigate = useNavigate();

  const {
    cartItems,
    subtotal,
    couponDiscount,
    shippingFee,
    tax,
    finalTotal
  } = useCart();

  const {
    addresses,
    selectedAddressId,
    setSelectedAddressId,
    addAddress
  } = useAuth();

  const [showAddAddressModal, setShowAddAddressModal] = useState(false);

  const [newAddr, setNewAddr] = useState({
    type: 'Home',
    recipient: '',
    phone: '',
    addressLine: '',
    city: '',
    state: 'UP',
    zipCode: ''
  });

  const selectedAddress =
    addresses.find(a => a.id === selectedAddressId) || addresses[0];

  const handleCreateAddress = (e) => {
    e.preventDefault();
    if (newAddr.recipient && newAddr.phone && newAddr.addressLine && newAddr.city) {
      addAddress(newAddr);
      setShowAddAddressModal(false);
      setNewAddr({ type: 'Home', recipient: '', phone: '', addressLine: '', city: '', state: 'UP', zipCode: '' });
    }
  };

  // 👇 Yahan navigate('/payment') kiya gaya hai
  const handleProceedToPayment = () => {
    if (!selectedAddress) {
      alert('Please select or add a delivery address.');
      return;
    }
    navigate('/payment'); 
  };

  return (
    <>
      <style>{CHECKOUT_CSS}</style>

      <div className="checkout-page">
        <div className="container-xl">
          <div className="row g-4">

            {/* LEFT: DELIVERY ADDRESS */}
            <div className="col-lg-8">
              <div className="checkout-main-card">
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                  <h5 className="checkout-address-heading mb-0">
                    Select Delivery Address
                  </h5>
                  <button
                    type="button"
                    className="checkout-add-btn"
                    onClick={() => setShowAddAddressModal(true)}
                  >
                    <FaPlus size={10} className="me-2" />
                    ADD NEW ADDRESS
                  </button>
                </div>

                <div className="checkout-section-label">
                  DEFAULT ADDRESS
                </div>

                {addresses.map(addr => {
                  const isSelected = selectedAddressId === addr.id;

                  return (
                    <div
                      key={addr.id}
                      className={`checkout-address-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedAddressId(addr.id)}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <input
                          type="radio"
                          name="deliveryAddress"
                          className="checkout-radio"
                          checked={isSelected}
                          onChange={() => setSelectedAddressId(addr.id)}
                        />

                        <div className="d-flex flex-wrap align-items-center gap-2">
                          <span className="checkout-address-name">
                            {addr.recipient}
                          </span>
                          <span className="checkout-address-type">
                            {addr.type?.toUpperCase() || 'HOME'}
                          </span>
                        </div>
                      </div>

                      <div className="checkout-address-text">
                        {addr.addressLine}<br />
                        {addr.city}, {addr.state} {addr.zipCode}
                      </div>

                      <div className="checkout-address-phone">
                        Mobile: <strong>{addr.phone || 'Not provided'}</strong>
                      </div>

                      <div className="checkout-cod">
                        <span style={{ color: '#0eaa7c' }}>•</span> &nbsp; Delivery available
                      </div>

                      <div className="checkout-address-actions">
                        <span className="text-muted" style={{ fontSize: '11px' }}>
                          {isSelected ? 'Selected address' : 'Select this address'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: PRICE SUMMARY */}
            <div className="col-lg-4">
              <div className="checkout-summary">
                <h6 className="checkout-summary-title">
                  <FaTruck className="me-2" color="#0d947b" />
                  DELIVERY ESTIMATES
                </h6>

                <div className="checkout-estimate">
                  <div className="checkout-estimate-icon">
                    <FaTruck size={20} />
                  </div>
                  <div className="checkout-estimate-text">
                    Estimated delivery<br />
                    <strong>Based on your selected address</strong>
                  </div>
                </div>

                <h6 className="checkout-price-heading">
                  PRICE DETAILS ({cartItems.length} Items)
                </h6>

                <div className="checkout-price-row">
                  <span>Total MRP</span>
                  <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
                </div>

                {couponDiscount > 0 && (
                  <div className="checkout-price-row">
                    <span>Discount on MRP</span>
                    <strong className="checkout-discount">
                      - ₹{couponDiscount.toLocaleString('en-IN')}
                    </strong>
                  </div>
                )}

                <div className="checkout-price-row">
                  <span>Delivery Fee</span>
                  <strong className={shippingFee === 0 ? 'checkout-discount' : ''}>
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee.toLocaleString('en-IN')}`}
                  </strong>
                </div>

                <div className="checkout-price-row">
                  <span>Taxes</span>
                  <strong>₹{tax.toLocaleString('en-IN')}</strong>
                </div>

                <hr className="checkout-divider" />

                <div className="checkout-price-row checkout-total">
                  <span>Total Amount</span>
                  <strong>₹{finalTotal.toLocaleString('en-IN')}</strong>
                </div>

                {/* 👇 BUTTON FIXED: onClick lagaya hai Link ki jagah */}
                <button
                  type="button"
                  className="checkout-continue"
                  onClick={handleProceedToPayment}
                  disabled={!selectedAddress}
                >
                  CONTINUE
                  <FaArrowRight className="ms-2" size={12} />
                </button>

                <div className="checkout-security">
                  <FaLock color="#0d947b" />
                  Secure checkout
                  <span>•</span>
                  <FaShieldAlt color="#0d947b" />
                  Safe shopping
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ADD ADDRESS MODAL */}
      {showAddAddressModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(15,23,42,.55)', zIndex: 1090 }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content checkout-modal-content">
              <form onSubmit={handleCreateAddress}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label">Address Type</label>
                    <select
                      className="form-select"
                      value={newAddr.type}
                      onChange={e => setNewAddr({ ...newAddr, type: e.target.value })}
                    >
                      <option value="Home">Home</option>
                      <option value="Work">Office</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter recipient name"
                      required
                      value={newAddr.recipient}
                      onChange={e => setNewAddr({ ...newAddr, recipient: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Mobile Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Enter mobile number"
                      required
                      value={newAddr.phone}
                      onChange={e => setNewAddr({ ...newAddr, phone: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="House no, street, area"
                      required
                      value={newAddr.addressLine}
                      onChange={e => setNewAddr({ ...newAddr, addressLine: e.target.value })}
                    />
                  </div>

                  <div className="row g-2">
                    <div className="col-6">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={newAddr.city}
                        onChange={e => setNewAddr({ ...newAddr, city: e.target.value })}
                      />
                    </div>

                    <div className="col-3">
                      <label className="form-label">State</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newAddr.state}
                        onChange={e => setNewAddr({ ...newAddr, state: e.target.value })}
                      />
                    </div>

                    <div className="col-3">
                      <label className="form-label">PIN Code</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={newAddr.zipCode}
                        onChange={e => setNewAddr({ ...newAddr, zipCode: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => setShowAddAddressModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-auramed px-4">
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}