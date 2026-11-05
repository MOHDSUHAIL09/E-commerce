import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  FaMapMarkerAlt, FaPlus, FaCheckCircle, FaTruck, 
  FaCreditCard, FaMoneyBillWave, FaShieldAlt, FaLock, 
  FaArrowRight, FaHome, FaBoxOpen, FaFileMedical
} from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useHealthcare } from '../../context/HealthcareContext';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, subtotal, couponDiscount, shippingFee, tax, finalTotal, clearCart } = useCart();
  const { addresses, selectedAddressId, setSelectedAddressId, addAddress } = useAuth();
  const { placeOrder } = useHealthcare();

  const [deliveryMethod, setDeliveryMethod] = useState('express'); // 'express', 'standard'
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'upi', 'cod'
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(null);

  // New address form
  const [newAddr, setNewAddr] = useState({
    type: 'Home',
    recipient: '',
    phone: '',
    addressLine: '',
    city: '',
    state: 'NY',
    zipCode: ''
  });

  const handleCreateAddress = (e) => {
    e.preventDefault();
    if (newAddr.recipient && newAddr.addressLine && newAddr.city) {
      addAddress(newAddr);
      setShowAddAddressModal(false);
      setNewAddr({ type: 'Home', recipient: '', phone: '', addressLine: '', city: '', state: 'NY', zipCode: '' });
    }
  };

  const handlePlaceOrder = () => {
    const currentAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];
    const createdOrder = placeOrder({
      total: finalTotal,
      itemsCount: cartItems.length,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      deliveryAddress: `${currentAddress.addressLine}, ${currentAddress.city}, ${currentAddress.state} ${currentAddress.zipCode}`,
      deliveryMethod: deliveryMethod === 'express' ? '15-Minute Express' : 'Standard Next-Day',
      paymentMethod: paymentMethod.toUpperCase(),
      patientName: currentAddress.recipient
    });

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    clearCart();
    setOrderPlaced(createdOrder);
  };

  // If order was placed successfully, render confirmation UI
  if (orderPlaced) {
    return (
      <div className="py-5">
        <div className="container-xl">
          <div className="card-auramed p-5 text-center my-4 mx-auto" style={{ maxWidth: '640px' }}>
            <div className="rounded-circle p-3 bg-light-green text-primary-green d-inline-flex mx-auto mb-3">
              <FaCheckCircle size={52} />
            </div>

            <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-1 mb-2">
              ORDER CONFIRMED & QUEUED
            </span>

            <h2 className="fw-bold text-dark mb-2">Thank you for your order!</h2>
            <p className="text-secondary mb-4" style={{ fontSize: '14px' }}>
              Your order <strong className="text-dark">{orderPlaced.id}</strong> has been received by our licensed dispensary. Our team is packaging your batch with insulated cold-chain protection.
            </p>

            {/* Order Tracking Card */}
            <div className="p-3 bg-light rounded text-start mb-4 border" style={{ fontSize: '13px' }}>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Tracking ID:</span>
                <span className="fw-bold text-primary-green">{orderPlaced.trackingNumber}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Estimated Arrival:</span>
                <span className="fw-bold text-dark">Within 35 Minutes</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Delivery Destination:</span>
                <span className="fw-semibold text-dark text-truncate" style={{ maxWidth: '280px' }}>{orderPlaced.deliveryAddress}</span>
              </div>
              <div className="d-flex justify-content-between pt-2 border-top">
                <span className="fw-bold">Total Charged:</span>
                <span className="fw-bold text-dark fs-6">₹{orderPlaced.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link to="/customer-dashboard" className="btn btn-auramed px-4 py-2">
                Track in Customer Dashboard
              </Link>
              <Link to="/" className="btn btn-outline-secondary px-4 py-2">
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h4>No items in cart for checkout</h4>
        <Link to="/products" className="btn btn-auramed mt-3">Browse Medicines</Link>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="container-xl">
        
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb" style={{ fontSize: '13px' }}>
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/cart">Cart</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Secure Checkout</li>
          </ol>
        </nav>

        <h2 className="fw-bold text-dark mb-4">Express Healthcare Checkout</h2>

        <div className="row g-4">
          
          {/* Main Checkout Form */}
          <div className="col-lg-8">
            
            {/* Step 1: Delivery Address */}
            <div className="card-auramed p-4 mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                  <FaMapMarkerAlt color="#159B64" /> 1. Select Delivery Address
                </h5>
                <button
                  onClick={() => setShowAddAddressModal(true)}
                  className="btn btn-sm btn-auramed-outline d-flex align-items-center gap-1"
                >
                  <FaPlus size={10} /> Add New Address
                </button>
              </div>

              <div className="row g-3">
                {addresses.map((addr) => {
                  const isSelected = selectedAddressId === addr.id;
                  return (
                    <div key={addr.id} className="col-md-6">
                      <div
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`p-3 rounded border h-100 cursor-pointer transition-all ${
                          isSelected ? 'bg-light-green border-success shadow-sm' : 'bg-white'
                        }`}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <span className="badge bg-secondary-subtle text-secondary fw-semibold">
                            {addr.type}
                          </span>
                          {isSelected && <FaCheckCircle color="#159B64" />}
                        </div>
                        <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>{addr.recipient}</div>
                        <div className="text-secondary" style={{ fontSize: '13px' }}>{addr.addressLine}</div>
                        <div className="text-secondary" style={{ fontSize: '13px' }}>{addr.city}, {addr.state} {addr.zipCode}</div>
                        <div className="text-secondary mt-1" style={{ fontSize: '12px' }}>{addr.phone}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Delivery Speed */}
            <div className="card-auramed p-4 mb-4">
              <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                <FaTruck color="#159B64" /> 2. Delivery Speed & Method
              </h5>

              <div className="row g-3">
                <div className="col-md-6">
                  <label
                    onClick={() => setDeliveryMethod('express')}
                    className={`d-block p-3 rounded border cursor-pointer ${
                      deliveryMethod === 'express' ? 'bg-light-green border-success shadow-sm' : 'bg-white'
                    }`}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <strong className="text-dark">15-Min Express Courier</strong>
                      <span className="badge bg-success">Recommended</span>
                    </div>
                    <p className="text-secondary mb-0" style={{ fontSize: '12px' }}>
                      Priority cold-chain dispatched from nearest local pharmacy dispensary.
                    </p>
                  </label>
                </div>

                <div className="col-md-6">
                  <label
                    onClick={() => setDeliveryMethod('standard')}
                    className={`d-block p-3 rounded border cursor-pointer ${
                      deliveryMethod === 'standard' ? 'bg-light-green border-success shadow-sm' : 'bg-white'
                    }`}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <strong className="text-dark">Standard Scheduled Delivery</strong>
                      <span className="text-muted" style={{ fontSize: '12px' }}>Free</span>
                    </div>
                    <p className="text-secondary mb-0" style={{ fontSize: '12px' }}>
                      Delivered tomorrow in secure tamper-evident packaging.
                    </p>
                  </label>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method (Demo Simulator) */}
            <div className="card-auramed p-4 mb-4">
              <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                <FaLock color="#159B64" /> 3. Payment Method (Demo Gateway)
              </h5>

              <div className="d-flex flex-column gap-2 mb-3">
                <label className="p-3 border rounded d-flex align-items-center justify-content-between cursor-pointer" style={{ cursor: 'pointer' }}>
                  <div className="d-flex align-items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <FaCreditCard color="#159B64" size={20} />
                    <div>
                      <div className="fw-semibold text-dark" style={{ fontSize: '14px' }}>Credit / Debit Card (Demo)</div>
                      <small className="text-secondary">Visa, Mastercard, Amex, Discover</small>
                    </div>
                  </div>
                  <span className="badge bg-light text-secondary border">Instant</span>
                </label>

                <label className="p-3 border rounded d-flex align-items-center justify-content-between cursor-pointer" style={{ cursor: 'pointer' }}>
                  <div className="d-flex align-items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <FaMoneyBillWave color="#159B64" size={20} />
                    <div>
                      <div className="fw-semibold text-dark" style={{ fontSize: '14px' }}>Cash on Delivery (COD)</div>
                      <small className="text-secondary">Pay upon physical receipt of package</small>
                    </div>
                  </div>
                  <span className="badge bg-light text-secondary border">Convenient</span>
                </label>
              </div>

              {paymentMethod === 'card' && (
                <div className="p-3 bg-light rounded border mt-2">
                  <div className="row g-2">
                    <div className="col-12">
                      <label className="form-label" style={{ fontSize: '12px' }}>Card Number (Demo prefilled)</label>
                      <input type="text" className="form-control form-control-sm" defaultValue="•••• •••• •••• 4242" readOnly />
                    </div>
                    <div className="col-6">
                      <label className="form-label" style={{ fontSize: '12px' }}>Expiry</label>
                      <input type="text" className="form-control form-control-sm" defaultValue="12/28" readOnly />
                    </div>
                    <div className="col-6">
                      <label className="form-label" style={{ fontSize: '12px' }}>CVV</label>
                      <input type="text" className="form-control form-control-sm" defaultValue="•••" readOnly />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Summary */}
          <div className="col-lg-4">
            <div className="card-auramed p-4 sticky-top" style={{ top: '90px' }}>
              <h5 className="fw-bold text-dark mb-3 pb-2 border-bottom">Items in Order ({cartItems.length})</h5>

              <div className="d-flex flex-column gap-2 mb-3 overflow-auto" style={{ maxHeight: '200px' }}>
                {cartItems.map(item => (
                  <div key={item.id} className="d-flex align-items-center justify-content-between text-secondary" style={{ fontSize: '13px' }}>
                    <div className="d-flex align-items-center gap-2 text-truncate" style={{ maxWidth: '200px' }}>
                      <span className="badge bg-light text-dark border">{item.quantity}x</span>
                      <span className="text-truncate">{item.name}</span>
                    </div>
                    <span className="fw-semibold text-dark">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-top pt-2">
                <div className="d-flex justify-content-between mb-1 text-secondary" style={{ fontSize: '13px' }}>
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="d-flex justify-content-between mb-1 text-success" style={{ fontSize: '13px' }}>
                    <span>Discount:</span>
                    <span>-₹{couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between mb-1 text-secondary" style={{ fontSize: '13px' }}>
                  <span>Shipping:</span>
                  <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 text-secondary" style={{ fontSize: '13px' }}>
                  <span>Taxes (5%):</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between pt-2 border-top mb-4">
                  <span className="fs-5 fw-bold text-dark">Total:</span>
                  <span className="fs-4 fw-bold text-dark-green">₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="btn btn-auramed w-100 py-3 fw-bold fs-6"
              >
                Place Order (₹{finalTotal.toFixed(2)})
              </button>

              <div className="text-center text-secondary mt-3" style={{ fontSize: '11px' }}>
                <FaShieldAlt color="#159B64" /> Demo mode: No actual credit card charge occurs.
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Add Address Modal */}
      {showAddAddressModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1090 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Add Delivery Address</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddAddressModal(false)}></button>
              </div>
              <form onSubmit={handleCreateAddress}>
                <div className="modal-body">
                  <div className="mb-2">
                    <label className="form-label" style={{ fontSize: '12px' }}>Address Label</label>
                    <select
                      className="form-select form-select-sm"
                      value={newAddr.type}
                      onChange={(e) => setNewAddr({ ...newAddr, type: e.target.value })}
                    >
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="form-label" style={{ fontSize: '12px' }}>Recipient Full Name</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      required
                      value={newAddr.recipient}
                      onChange={(e) => setNewAddr({ ...newAddr, recipient: e.target.value })}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label" style={{ fontSize: '12px' }}>Phone Number</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      required
                      value={newAddr.phone}
                      onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label" style={{ fontSize: '12px' }}>Street Address / Suite</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      required
                      value={newAddr.addressLine}
                      onChange={(e) => setNewAddr({ ...newAddr, addressLine: e.target.value })}
                    />
                  </div>
                  <div className="row g-2">
                    <div className="col-6">
                      <label className="form-label" style={{ fontSize: '12px' }}>City</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        required
                        value={newAddr.city}
                        onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                      />
                    </div>
                    <div className="col-3">
                      <label className="form-label" style={{ fontSize: '12px' }}>State</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={newAddr.state}
                        onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                      />
                    </div>
                    <div className="col-3">
                      <label className="form-label" style={{ fontSize: '12px' }}>ZIP</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        required
                        value={newAddr.zipCode}
                        onChange={(e) => setNewAddr({ ...newAddr, zipCode: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-sm btn-secondary" onClick={() => setShowAddAddressModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-sm btn-auramed">
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
