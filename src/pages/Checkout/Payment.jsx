import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaMoneyBillWave, 
  FaMobileAlt, 
  FaCreditCard, 
  FaWallet, 
  FaClock, 
  FaUniversity, 
  FaGift, 
  FaLock, 
  FaCcVisa, 
  FaCcMastercard, 
  FaCcAmex, 
  FaCcPaypal,
  FaQrcode,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useHealthcare } from '../../context/HealthcareContext';
import confetti from 'canvas-confetti';

const PAYMENT_CSS = `
.payment-page { background: #f8faf9; min-height: 85vh; padding: 30px 0 60px; color: #172033; }
.payment-title { font-size: 22px; font-weight: 800; color: #093B2B; margin-bottom: 20px; }
.payment-box { background: #fff; border: 1px solid #E5ECE8; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.03); }
.payment-sidebar { width: 260px; border-right: 1px solid #E5ECE8; flex-shrink: 0; }
.payment-tab { display: flex; align-items: center; gap: 12px; padding: 16px 20px; font-size: 14px; font-weight: 600; color: #475569; cursor: pointer; border-left: 3px solid transparent; transition: all 0.2s ease; }
.payment-tab:hover { background: #f8faf9; }
.payment-tab.active { background: #f4f9f7; color: #0A553E; border-left-color: #0A553E; }
.payment-tab-icon { font-size: 18px; color: #64748b; }
.payment-tab.active .payment-tab-icon { color: #0A553E; }
.payment-content { flex-grow: 1; padding: 30px; }
.payment-method-title { font-size: 16px; font-weight: 700; margin-bottom: 20px; color: #172033; }
.payment-radio-card { display: flex; align-items: center; gap: 15px; padding: 15px; border: 1px solid transparent; border-radius: 8px; cursor: pointer; background: #fff; margin-bottom: 10px; border-bottom: 1px solid #f1f5f9; }
.payment-radio-card:last-child { border-bottom: none; }
.payment-radio-card.active { border: 1px solid #0A553E; background: #f4f9f7; }
.payment-radio { width: 18px; height: 18px; accent-color: #0A553E; cursor: pointer; margin-top: 3px; }
.place-order-btn { width: 100%; height: 48px; border: none; border-radius: 4px; background: #0A553E; color: #fff; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 25px; box-shadow: 0 4px 12px rgba(10,85,62,0.2); transition: background 0.2s; }
.place-order-btn:hover { background: #073E2D; }
.price-box-title { font-size: 13px; font-weight: 700; color: #64748b; letter-spacing: 0.5px; margin-bottom: 15px; }
.price-row { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 12px; color: #475569; }
.price-row.discount { color: #10b981; }
.price-total-row { display: flex; justify-content: space-between; font-size: 16px; font-weight: 800; color: #172033; border-top: 1px dashed #cbd5e1; padding-top: 15px; margin-top: 15px; margin-bottom: 10px; }
.terms-text { font-size: 12px; color: #64748b; line-height: 1.5; }
.gift-card-box { display: flex; justify-content: space-between; align-items: center; padding: 20px; border: 1px solid #E5ECE8; border-radius: 8px; background: #fff; margin-top: 20px; cursor: pointer; }
.gift-card-text { font-size: 15px; font-weight: 600; color: #172033; }
.gift-card-apply { font-size: 13px; font-weight: 700; color: #0A553E; text-transform: uppercase; }
.card-input { width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; margin-bottom: 15px; outline: none; }
.card-input:focus { border-color: #0A553E; }
.bank-logo { width: 32px; height: 32px; border-radius: 50%; object-fit: contain; border: 1px solid #e2e8f0; padding: 4px; background: #fff; }

/* Custom Radio & Layout specific */
.custom-radio-circle { width: 18px; height: 18px; border-radius: 50%; border: 2px solid #cbd5e1; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.custom-radio-card.active .custom-radio-circle { border-color: #0A553E; }
.custom-radio-inner { width: 10px; height: 10px; border-radius: 50%; background: #0A553E; display: none; }
.custom-radio-card.active .custom-radio-inner { display: block; }
.warning-text { font-size: 12px; color: #f97316; margin-top: 5px; margin-left: 33px; }

/* Modal Styles (Exact Match to Image) */
.success-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15,23,42,0.6); display: flex; align-items: center; justify-content: center; z-index: 2000; }
.success-modal { background: #fff; border-radius: 16px; padding: 40px 30px; max-width: 480px; width: 90%; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.15); position: relative; overflow: hidden; animation: popIn 0.3s ease-out; }
@keyframes popIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }

.success-close-btn { position: absolute; top: 15px; right: 15px; background: #f1f5f9; border: none; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #64748b; transition: 0.2s; }
.success-close-btn:hover { background: #e2e8f0; color: #0f172a; }

.success-icon-wrapper { width: 80px; height: 80px; background: #22c55e; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; position: relative; z-index: 2; }
.success-confetti-img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.6; pointer-events: none; z-index: 1; }

@media (max-width: 768px) {
  .payment-box-inner { flex-direction: column; }
  .payment-sidebar { width: 100%; border-right: none; border-bottom: 1px solid #E5ECE8; display: flex; overflow-x: auto; flex-direction: row; }
  .payment-tab { white-space: nowrap; border-left: none; border-bottom: 3px solid transparent; }
  .payment-tab.active { border-left: none; border-bottom-color: #0A553E; }
}
`;

export default function Payment() {
  const navigate = useNavigate();
  const { cartItems, subtotal, couponDiscount, shippingFee, tax, finalTotal, clearCart } = useCart();
  const { addresses, selectedAddressId } = useAuth();
  const { placeOrder } = useHealthcare();

  const [activeTab, setActiveTab] = useState('recommended');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
  // Selection states for lists
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedEmi, setSelectedEmi] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  
  // Modal State
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handlePlaceOrder = () => {
    const currentAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];
    
    placeOrder({
      total: finalTotal,
      itemsCount: cartItems.length,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      deliveryAddress: `${currentAddress.addressLine}, ${currentAddress.city}`,
      deliveryMethod: 'Express Delivery',
      paymentMethod: paymentMethod.toUpperCase(),
      patientName: currentAddress.recipient
    });

    try {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    } catch {}

    clearCart();
    setShowSuccessModal(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'recommended':
      case 'cod':
        return (
          <div>
            <h6 className="payment-method-title">Cash On Delivery (Cash/UPI)</h6>
            <div 
              className={`payment-radio-card ${paymentMethod === 'cod' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('cod')}
            >
              <input 
                type="radio" 
                name="payment" 
                className="payment-radio"
                checked={paymentMethod === 'cod'} 
                onChange={() => setPaymentMethod('cod')}
              />
              <div className="w-100 d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-bold mb-1">Cash on Delivery (Cash/UPI)</div>
                  <div className="text-secondary" style={{ fontSize: '13px' }}>
                    You can pay via Cash/UPI on delivery.
                  </div>
                </div>
                <div className="text-secondary fs-5">
                  <FaMoneyBillWave />
                </div>
              </div>
            </div>
            
            <button onClick={handlePlaceOrder} className="place-order-btn">
              Place Order
            </button>
          </div>
        );
      case 'upi':
        return (
          <div>
            <h6 className="payment-method-title">Pay using UPI</h6>
            <div 
              className={`payment-radio-card ${paymentMethod === 'upi' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('upi')}
            >
              <input 
                type="radio" 
                name="payment" 
                className="payment-radio"
                checked={paymentMethod === 'upi'} 
                onChange={() => setPaymentMethod('upi')}
              />
              <div className="w-100 d-flex align-items-center gap-3">
                <div className="text-secondary fs-1">
                  <FaQrcode />
                </div>
                <div>
                  <div className="fw-bold mb-1">Scan & Pay</div>
                  <div className="text-secondary" style={{ fontSize: '13px' }}>
                    Scan the QR code with any UPI app to pay.
                  </div>
                </div>
              </div>
            </div>
            <button onClick={handlePlaceOrder} className="place-order-btn">
              Pay Now
            </button>
          </div>
        );
      case 'card':
        return (
          <div>
            <h6 className="payment-method-title">CREDIT/ DEBIT CARD</h6>
            
            <div className="p-3 mb-4 rounded border d-flex align-items-center gap-3" style={{ backgroundColor: '#f8fafc' }}>
              <div className="fs-4">💳</div>
              <div>
                <div className="fw-bold" style={{ fontSize: '14px' }}>7.5% Assured Cashback*</div>
                <div className="text-secondary" style={{ fontSize: '12px' }}>on a minimum spend of ₹100. T&C</div>
              </div>
            </div>

            <p className="text-secondary mb-3" style={{ fontSize: '14px' }}>
              Please Ensure your card can be used for online transactions. <a href="#" style={{color: '#0A553E', fontWeight: 'bold'}}>Know More</a>
            </p>

            <input type="text" className="card-input" placeholder="Card Number" />
            
            <div className="d-flex gap-3 mb-4">
              <input type="text" className="card-input mb-0" placeholder="Valid Thru (MM/YY)" />
              <input type="text" className="card-input mb-0" placeholder="CVV" />
            </div>

            <button onClick={handlePlaceOrder} className="place-order-btn">
              Pay Now
            </button>
          </div>
        );
      case 'emi':
        const emiOptions = [
          { id: 'hdfc', name: 'HDFC Credit Card EMI', min: '₹3000' },
          { id: 'rbl', name: 'RBL Bank Credit Card EMI', min: '₹2500' },
          { id: 'kotak', name: 'Kotak Credit Card EMI', min: '₹2500' },
          { id: 'sbi', name: 'SBI Credit Card EMI', min: '₹2500' },
          { id: 'axis', name: 'Axis Credit Card EMI', min: '₹2500' },
        ];
        return (
          <div>
            <h6 className="payment-method-title">Select EMI Option</h6>
            <div className="d-flex flex-column">
              {emiOptions.map(bank => (
                <div key={bank.id} className="mb-3">
                  <div 
                    className={`custom-radio-card d-flex align-items-center gap-3 ${selectedEmi === bank.id ? 'active' : ''}`}
                    onClick={() => setSelectedEmi(bank.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="custom-radio-circle"><div className="custom-radio-inner"></div></div>
                    <div className="bank-logo" style={{backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <span style={{fontSize: '12px', fontWeight: 'bold', color: '#64748b'}}>{bank.name.substring(0,2)}</span>
                    </div>
                    <span className="text-secondary" style={{ fontSize: '15px' }}>{bank.name}</span>
                  </div>
                  <div className="warning-text">Available on min. order of {bank.min}</div>
                </div>
              ))}
            </div>
            <button onClick={handlePlaceOrder} className="place-order-btn">
              Pay Now
            </button>
          </div>
        );
      case 'netbanking':
        const banks = [
          { id: 'axis', name: 'Axis Bank', warning: 'Axis Bank is currently facing high failure rate.' },
          { id: 'hdfc', name: 'HDFC Bank' },
          { id: 'icici', name: 'ICICI Bank', warning: 'ICICI Bank is currently facing high failure rate.' },
          { id: 'kotak', name: 'Kotak' },
          { id: 'sbi', name: 'SBI' },
        ];
        return (
          <div>
            <h6 className="payment-method-title">Net Banking</h6>
            <div className="d-flex flex-column mb-4">
              {banks.map(bank => (
                <div key={bank.id} className="mb-3">
                  <div 
                    className={`custom-radio-card d-flex align-items-center gap-3 ${selectedBank === bank.id ? 'active' : ''}`}
                    onClick={() => setSelectedBank(bank.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="custom-radio-circle"><div className="custom-radio-inner"></div></div>
                    <div className="bank-logo" style={{backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <span style={{fontSize: '12px', fontWeight: 'bold', color: '#64748b'}}>{bank.name.substring(0,2)}</span>
                    </div>
                    <span className="text-secondary" style={{ fontSize: '15px' }}>{bank.name}</span>
                  </div>
                  {bank.warning && <div className="warning-text">{bank.warning}</div>}
                </div>
              ))}
            </div>
            
            <select className="form-select mb-4" style={{ padding: '12px', borderColor: '#cbd5e1' }}>
              <option>Other Banks</option>
            </select>
            
            <button onClick={handlePlaceOrder} className="place-order-btn">
              Pay Now
            </button>
          </div>
        );
      case 'wallet':
        const wallets = ['Paytm', 'PhonePe', 'Amazon Pay', 'Mobikwik', 'Freecharge'];
        return (
          <div>
            <h6 className="payment-method-title">Wallets</h6>
            <div className="d-flex flex-column mb-4">
              {wallets.map(wallet => (
                <div 
                  key={wallet}
                  className={`custom-radio-card d-flex align-items-center gap-3 ${selectedWallet === wallet ? 'active' : ''}`}
                  onClick={() => setSelectedWallet(wallet)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="custom-radio-circle"><div className="custom-radio-inner"></div></div>
                  <div className="bank-logo" style={{backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <FaWallet size={14} color="#64748b" />
                  </div>
                  <span className="text-secondary" style={{ fontSize: '15px' }}>{wallet}</span>
                </div>
              ))}
            </div>
            <button onClick={handlePlaceOrder} className="place-order-btn">
              Pay Now
            </button>
          </div>
        );
      case 'paylater':
        return (
          <div>
            <h6 className="payment-method-title">Pay Later</h6>
            <div className="d-flex flex-column mb-4">
              {['Simpl', 'LazyPay', 'Amazon Pay Later'].map(later => (
                <div 
                  key={later}
                  className={`custom-radio-card d-flex align-items-center gap-3 ${selectedWallet === later ? 'active' : ''}`}
                  onClick={() => setSelectedWallet(later)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="custom-radio-circle"><div className="custom-radio-inner"></div></div>
                  <div className="bank-logo" style={{backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <FaClock size={14} color="#64748b" />
                  </div>
                  <span className="text-secondary" style={{ fontSize: '15px' }}>{later}</span>
                </div>
              ))}
            </div>
            <button onClick={handlePlaceOrder} className="place-order-btn">
              Pay Now
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <style>{PAYMENT_CSS}</style>
      
      <div className="payment-page">
        <div className="container-xl">
          
          <h2 className="payment-title">Choose Payment Mode</h2>

          <div className="row g-4">
            
            {/* LEFT: Payment Options */}
            <div className="col-lg-8">
              <div className="payment-box">
                <div className="d-flex payment-box-inner">
                  
                  {/* Sidebar Navigation */}
                  <div className="payment-sidebar">
                    <div 
                      className={`payment-tab ${activeTab === 'recommended' || activeTab === 'cod' ? 'active' : ''}`}
                      onClick={() => setActiveTab('recommended')}
                    >
                      <FaMoneyBillWave className="payment-tab-icon" />
                      <span>Recommended / COD</span>
                    </div>

                    <div 
                      className={`payment-tab ${activeTab === 'upi' ? 'active' : ''}`}
                      onClick={() => setActiveTab('upi')}
                    >
                      <FaMobileAlt className="payment-tab-icon" />
                      <span>UPI (Pay via any App)</span>
                    </div>

                    <div 
                      className={`payment-tab ${activeTab === 'card' ? 'active' : ''}`}
                      onClick={() => setActiveTab('card')}
                    >
                      <FaCreditCard className="payment-tab-icon" />
                      <span>Credit / Debit Card <span className="text-success ms-1" style={{fontSize: '11px'}}>10 Offers</span></span>
                    </div>

                    <div 
                      className={`payment-tab ${activeTab === 'wallet' ? 'active' : ''}`}
                      onClick={() => setActiveTab('wallet')}
                    >
                      <FaWallet className="payment-tab-icon" />
                      <span>Wallets</span>
                    </div>

                    <div 
                      className={`payment-tab ${activeTab === 'paylater' ? 'active' : ''}`}
                      onClick={() => setActiveTab('paylater')}
                    >
                      <FaClock className="payment-tab-icon" />
                      <span>Pay Later</span>
                    </div>

                    <div 
                      className={`payment-tab ${activeTab === 'emi' ? 'active' : ''}`}
                      onClick={() => setActiveTab('emi')}
                    >
                      <FaClock className="payment-tab-icon" />
                      <span>EMI <span className="text-danger ms-1" style={{fontSize: '11px'}}>2 Offers</span></span>
                    </div>

                    <div 
                      className={`payment-tab ${activeTab === 'netbanking' ? 'active' : ''}`}
                      onClick={() => setActiveTab('netbanking')}
                    >
                      <FaUniversity className="payment-tab-icon" />
                      <span>Net Banking</span>
                    </div>
                  </div>

                  {/* Right Side Content */}
                  <div className="payment-content">
                    {renderContent()}
                  </div>

                </div>
              </div>

              {/* Gift Card Box */}
              <div className="gift-card-box">
                <div className="d-flex align-items-center gap-2">
                  <FaGift size={20} className="text-secondary" />
                  <span className="gift-card-text">Have a Gift Card?</span>
                </div>
                <span className="gift-card-apply">APPLY GIFT CARD</span>
              </div>

            </div>

            {/* RIGHT: Price Details */}
            <div className="col-lg-4">
              <div className="payment-box p-4">
                
                <div className="price-box-title">
                  PRICE DETAILS ({cartItems.length} Item{cartItems.length > 1 ? 's' : ''})
                </div>

                <div className="price-row">
                  <span>Total MRP</span>
                  <span>₹{(subtotal + couponDiscount).toFixed(2)}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="price-row discount">
                    <span>Discount on MRP</span>
                    <span>- ₹{couponDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="price-row">
                  <span>Platform Fee <a href="#" style={{ color: '#0A553E', fontSize: '12px', fontWeight: 'bold' }}>Know More</a></span>
                  <span>₹{shippingFee.toFixed(2)}</span>
                </div>

                <div className="price-row">
                  <span>Taxes (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>

                <div className="price-total-row">
                  <span>Total Amount</span>
                  <span>₹{finalTotal.toFixed(2)}</span>
                </div>

                <div className="terms-text">
                  By placing the order, you agree to AuraMed's <a href="#" style={{ color: '#0A553E', fontWeight: 'bold', textDecoration: 'none' }}>Terms of Use</a> and <a href="#" style={{ color: '#0A553E', fontWeight: 'bold', textDecoration: 'none' }}>Privacy Policy</a>
                </div>

              </div>
            </div>

          </div>

          {/* Footer Trust Badges */}
          <div className="d-flex justify-content-between align-items-center mt-5 pt-4 border-top flex-wrap gap-3">
             <div className="d-flex gap-3 text-secondary" style={{ fontSize: '24px' }}>
                <FaLock size={20} className="mt-1 text-success" />
                <FaCcVisa />
                <FaCcMastercard />
                <FaCcAmex />
                <FaCcPaypal />
             </div>
             <div className="fw-bold text-secondary" style={{ fontSize: '14px' }}>
               Need Help? Contact Us
             </div>
          </div>

        </div>
      </div>

      {/* EXACT SUCCESS MODAL FROM IMAGE */}
      {showSuccessModal && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            {/* Close Button */}
            <button className="success-close-btn" onClick={() => navigate('/profile')}>
              <FaTimes size={16} />
            </button>

            <h4 className="fw-bold text-start mb-1" style={{ fontSize: '18px', color: '#172033' }}>Your Order is Ready 🎉</h4>
            <p className="text-start text-secondary mb-4" style={{ fontSize: '13px' }}>you can track your order in Profile</p>

            <div className="position-relative mb-4">
              {/* Fake Confetti graphic using CSS/Emojis for that exact look */}
              <div style={{ position: 'absolute', top: 0, left: '10%', fontSize: '24px', transform: 'rotate(15deg)' }}>🎉</div>
              <div style={{ position: 'absolute', top: '10px', right: '15%', fontSize: '20px', transform: 'rotate(-20deg)' }}>✨</div>
              <div style={{ position: 'absolute', top: '40px', left: '5%', fontSize: '16px' }}>🔴</div>
              <div style={{ position: 'absolute', top: '30px', right: '10%', fontSize: '18px' }}>🟡</div>
              
              <div className="success-icon-wrapper">
                <FaCheck size={40} color="#fff" />
              </div>
            </div>

            <h2 className="fw-bold mb-3" style={{ fontSize: '26px', color: '#000', letterSpacing: '-0.5px' }}>
              Your Order was<br/>successfully created
            </h2>
            
            <p className="text-secondary mb-5" style={{ fontSize: '14px', lineHeight: 1.5 }}>
              Requested Order has been generated, and a copy sent to your registered email address.
            </p>

            <div className="d-flex gap-3">
              <button 
                className="btn w-100 py-2 fw-bold text-white" 
                onClick={() => navigate('/products')}
                style={{ backgroundColor: '#0A553E', fontSize: '14px' }}
              >
                Continue Shopping
              </button>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}