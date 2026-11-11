import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaUser, FaShoppingBag, FaFileMedical, FaUserMd, 
  FaFlask, FaHeart, FaMapMarkerAlt, FaShieldAlt, 
  FaTruck, FaEdit, FaPlus, FaCalendarAlt, FaSignOutAlt, FaCheckCircle, FaTimes,
  FaGift, FaCreditCard, FaTicketAlt, FaCopy, FaCheck, FaWallet
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useHealthcare } from '../../context/HealthcareContext';
import { useCart } from '../../context/CartContext';

export default function CustomerProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { currentUser, addresses, updateProfile, addAddress, deleteAddress, setDefaultAddress, logout } = useAuth();
  const { orders, prescriptions, doctorAppointments, labBookings, cancelDoctorAppointment } = useHealthcare();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState(location.state?.tab || 'overview');

  // Copy State for Coupons
  const [copiedCode, setCopiedCode] = useState('');
  // Gift Card State
  const [giftCardInput, setGiftCardInput] = useState('');

  // Sync tab if navigated from drawer
  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  // --- Profile Edit States ---
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || ''
  });
  const [passwordForm, setPasswordForm] = useState({ old: '', newPass: '', confirm: '' });
  const [passwordMsg, setPasswordMsg] = useState('');

  // --- Address Add State ---
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'Home',
    recipient: currentUser?.name || '',
    addressLine: '',
    city: '',
    state: '',
    zipCode: '',
    phone: currentUser?.phone || '',
    isDefault: false
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setIsEditingProfile(false);
    alert('Profile updated successfully!');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordForm.newPass !== passwordForm.confirm) {
      setPasswordMsg('New passwords do not match.');
      return;
    }
    setPasswordMsg('Password updated successfully!');
    setPasswordForm({ old: '', newPass: '', confirm: '' });
    setTimeout(() => setPasswordMsg(''), 3000);
  };

  // FIXED: Address Save/Update Logic
  const handleSaveAddress = (e) => {
    e.preventDefault();
    
    // Agar edit ho raha hai (id exist karti hai)
    if (newAddress.id) {
      deleteAddress(newAddress.id); // Pehle purana delete karo
    }
    
    addAddress(newAddress); // Phir naya ya updated save karo

    setShowAddAddress(false);
    setNewAddress({
      type: 'Home', recipient: currentUser?.name || '', addressLine: '', city: '', state: '', zipCode: '', phone: currentUser?.phone || '', isDefault: false
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  // Dummy Coupons Data
  const availableCoupons = [
    { id: 1, discount: '10% off', desc: 'Upto ₹500', code: 'FTWFLASH', expiry: '07 Nov 2026', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80' },
    { id: 2, discount: '10% off', desc: 'Upto ₹2000', code: 'SPORTSOFF10', expiry: '07 Nov 2026', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&q=80' },
    { id: 3, discount: 'Flat 10% off', desc: 'On min. purchase of ₹199', code: 'NORETURN1', expiry: '01 Jan 2027', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80' },
    { id: 4, discount: '10% off', desc: 'Upto ₹500', code: 'FTWOFF10', expiry: '07 Nov 2026', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80' },
  ];

  // Sidebar Menu Items
  const menuItems = [
    { id: 'orders', label: 'My Orders', icon: <FaShoppingBag /> },
    { id: 'addresses', label: 'Saved Addresses', icon: <FaMapMarkerAlt /> },
    { id: 'coupons', label: 'Coupons', icon: <FaTicketAlt /> },
    { id: 'giftcards', label: 'Gift Cards', icon: <FaGift /> },
    { id: 'appointments', label: 'Doctor Appointments', icon: <FaUserMd /> },
    { id: 'labs', label: 'Lab Test Bookings', icon: <FaFlask /> },
  ];

  return (
    <div className="py-5" style={{ backgroundColor: '#F7FAF8' }}>
      <div className="container-xl">
        
        <div className="row g-4">
          
          {/* LEFT SIDEBAR */}
          <div className="col-lg-3 d-none d-sm-block">
            <div className="card-auramed p-3 border-0 shadow-sm bg-white rounded-3">
              {/* User Info Header */}
              <div className="d-flex align-items-center gap-3 mb-4 px-2 pt-2">
                <div className="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center fw-bold fs-4" style={{ width: '50px', height: '50px', backgroundColor: '#e8f5e9' }}>
                  {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <h6 className="fw-bold mb-0 text-dark">{currentUser?.name || 'User'}</h6>
                  <small className="text-muted">{currentUser?.phone || 'No phone'}</small>
                </div>
              </div>

              {/* Navigation Menu */}
              <div className="d-flex flex-column gap-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`btn text-start d-flex align-items-center gap-3 px-3 py-2 rounded-2 border-0 ${
                      activeTab === item.id ? 'bg-success text-white fw-semibold shadow-sm' : 'bg-transparent text-secondary'
                    }`}
                    style={{ transition: 'all 0.2s', fontSize: '14px' }}
                  >
                    <span className={activeTab === item.id ? 'text-white' : 'text-success'}>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
                <hr className="my-2 text-muted" />
                <button onClick={handleLogout} className="btn text-start d-flex align-items-center gap-3 px-3 py-2 rounded-2 border-0 bg-transparent text-danger" style={{ transition: 'all 0.2s', fontSize: '14px' }}>
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="col-lg-9">
            
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="card-auramed p-4 border-0 shadow-sm bg-white rounded-3">
                <h5 className="fw-bold text-dark mb-4">Welcome, {currentUser?.name || 'User'}!</h5>
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="p-3 border rounded bg-light text-center">
                      <h4 className="fw-bold text-success">{orders.length}</h4>
                      <small className="text-muted">Total Orders</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="p-3 border rounded bg-light text-center">
                      <h4 className="fw-bold text-success">{addresses.length}</h4>
                      <small className="text-muted">Saved Addresses</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="p-3 border rounded bg-light text-center">
                      <h4 className="fw-bold text-success">{wishlist?.length || 0}</h4>
                      <small className="text-muted">Wishlist Items</small>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="card-auramed p-4 border-0 shadow-sm bg-white rounded-3">
                <h5 className="fw-bold text-dark mb-4">Complete Order History ({orders.length})</h5>
                
                {orders.length === 0 ? (
                  <div className="text-center py-5">
                    <FaShoppingBag size={40} className="text-muted mb-3" />
                    <h6>No orders found</h6>
                    <Link to="/products" className="btn btn-success mt-2">Start Shopping</Link>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-4">
                    {orders.map(order => (
                      <div key={order.id} className="border rounded-3 p-4 bg-white">
                        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 pb-3 border-bottom gap-2">
                          <div>
                            <span className="text-secondary" style={{ fontSize: '12px' }}>ORDER PLACED:</span>
                            <div className="fw-bold text-dark">{order.date}</div>
                          </div>
                          <div>
                            <span className="text-secondary" style={{ fontSize: '12px' }}>TOTAL:</span>
                            <div className="fw-bold text-success">₹{order.total.toFixed(2)}</div>
                          </div>
                          <div>
                            <span className="text-secondary" style={{ fontSize: '12px' }}>SHIP TO:</span>
                            <div className="fw-semibold text-truncate" style={{ maxWidth: '200px', fontSize: '13px' }}>
                              {order.deliveryAddress}
                            </div>
                          </div>
                          <div>
                            <span className="text-secondary" style={{ fontSize: '12px' }}>ORDER ID:</span>
                            <div className="fw-bold text-primary">{order.id}</div>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="mb-3">
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <span className={`badge ${
                              order.status === 'Delivered' ? 'bg-success' :
                              order.status === 'Out for Delivery' ? 'bg-info text-dark' : 'bg-warning text-dark'
                            }`}>
                              <FaTruck className="me-1" /> {order.status}
                            </span>
                            <small className="text-muted">Waybill: <strong>{order.trackingNumber || 'N/A'}</strong></small>
                          </div>

                          <div className="d-flex flex-column gap-2">
                            {order.items.map((item, i) => (
                              <div key={i} className="d-flex justify-content-between align-items-center p-2 rounded bg-light" style={{ fontSize: '13px' }}>
                                <span><strong>{item.quantity}x</strong> {item.name}</span>
                                <span className="fw-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="d-flex justify-content-end gap-2 pt-2 border-top">
                          <Link to={`/track-order/${order.id}`} className="btn btn-sm btn-outline-success">
                            Track Order
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. WISHLIST TAB */}
            {activeTab === 'wishlist' && (
              <div className="card-auramed p-4 border-0 shadow-sm bg-white rounded-3">
                <h5 className="fw-bold text-dark mb-4">My Wishlist ({wishlist?.length || 0})</h5>
                {(!wishlist || wishlist.length === 0) ? (
                  <div className="text-center py-5">
                    <FaHeart size={40} className="text-muted mb-3" />
                    <h6>Your wishlist is empty</h6>
                    <Link to="/products" className="btn btn-success mt-2">Explore Products</Link>
                  </div>
                ) : (
                  <div className="row g-3">
                    {wishlist.map(item => (
                      <div key={item.id} className="col-md-6">
                        <div className="p-3 border rounded d-flex align-items-center gap-3 bg-white">
                          {item.image && <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />}
                          <div>
                            <h6 className="fw-bold mb-1">{item.name}</h6>
                            <div className="text-success fw-bold mb-2">₹{item.price}</div>
                            <button onClick={() => addToCart(item, 1)} className="btn btn-sm btn-outline-success">Add to Cart</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 4. APPOINTMENTS TAB */}
            {activeTab === 'appointments' && (
              <div className="card-auramed p-4 border-0 shadow-sm bg-white rounded-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold text-dark mb-0">Doctor Appointments</h5>
                  <Link to="/doctors" className="btn btn-sm btn-success">
                    <FaPlus className="me-1" /> Consult Doctor
                  </Link>
                </div>

                {doctorAppointments.length > 0 ? (
                  <div className="d-flex flex-column gap-3">
                    {doctorAppointments.map(apt => (
                      <div key={apt.id} className="p-3 border rounded bg-white">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h6 className="fw-bold text-dark mb-0">{apt.doctorName}</h6>
                            <span className="text-success fw-semibold" style={{ fontSize: '12px' }}>
                              {apt.specialization} • {apt.type}
                            </span>
                          </div>
                          <span className={`badge ${apt.status === 'Confirmed' ? 'bg-success' : 'bg-danger'}`}>
                            {apt.status}
                          </span>
                        </div>

                        <div className="text-secondary mb-2" style={{ fontSize: '13px' }}>
                          <FaCalendarAlt className="me-1 text-success" /> <strong>{apt.date}</strong> at <strong>{apt.slot}</strong> • Patient: {apt.patientName}
                        </div>

                        <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                          <span className="fw-bold text-dark" style={{ fontSize: '13px' }}>Fee: ₹{apt.consultationFee.toFixed(2)}</span>
                          {apt.status === 'Confirmed' && (
                            <button
                              onClick={() => cancelDoctorAppointment(apt.id)}
                              className="btn btn-sm btn-outline-danger"
                              style={{ fontSize: '12px' }}
                            >
                              Cancel Appointment
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-secondary">No doctor appointments booked yet.</p>
                )}
              </div>
            )}

            {/* 5. LABS TAB */}
            {activeTab === 'labs' && (
              <div className="card-auramed p-4 border-0 shadow-sm bg-white rounded-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold text-dark mb-0">Lab Test Bookings</h5>
                  <Link to="/lab-tests" className="btn btn-sm btn-success">
                    <FaPlus className="me-1" /> Book Lab
                  </Link>
                </div>

                {labBookings.length === 0 ? (
                  <p className="text-secondary">No lab bookings found.</p>
                ) : (
                  labBookings.map(b => (
                    <div key={b.id} className="p-3 border rounded bg-white mb-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h6 className="fw-bold text-dark mb-0">{b.testName}</h6>
                          <small className="text-muted">Booking Reference: {b.id}</small>
                        </div>
                        <span className="badge bg-success">{b.status}</span>
                      </div>

                      <div className="text-secondary" style={{ fontSize: '13px' }}>
                        Phlebotomist Visit: <strong>{b.date} ({b.slot})</strong> • Patient: <strong>{b.patientName}</strong>
                      </div>

                      <div className="text-secondary" style={{ fontSize: '12px' }}>
                        Sample Location: {b.collectionAddress}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* 6. ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="card-auramed p-4 border-0 shadow-sm bg-white rounded-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold text-dark mb-0">Saved Addresses</h5>
                  <button 
                    onClick={() => {
                      setShowAddAddress(!showAddAddress);
                      if (!showAddAddress) {
                        setNewAddress({
                          type: 'Home', recipient: currentUser?.name || '', addressLine: '', city: '', state: '', zipCode: '', phone: currentUser?.phone || '', isDefault: false
                        });
                      }
                    }} 
                    className="btn btn-sm btn-success"
                  >
                    {showAddAddress && !newAddress.id ? <><FaTimes className="me-1"/> Cancel</> : <><FaPlus className="me-1"/> Add Address</>}
                  </button>
                </div>

                {showAddAddress && (
                  <form onSubmit={handleSaveAddress} className="p-3 border rounded bg-light mb-4">
                    <h6 className="fw-bold mb-3">{newAddress.id ? 'Edit Address' : 'Add New Address'}</h6>
                    <div className="row g-2">
                      <div className="col-md-6">
                        <label className="form-label text-muted mb-1" style={{fontSize: '12px'}}>Type</label>
                        <select className="form-select form-select-sm" value={newAddress.type} onChange={e => setNewAddress({...newAddress, type: e.target.value})}>
                          <option value="Home">Home</option>
                          <option value="Work">Work</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-muted mb-1" style={{fontSize: '12px'}}>Recipient Name</label>
                        <input type="text" className="form-control form-control-sm" required value={newAddress.recipient} onChange={e => setNewAddress({...newAddress, recipient: e.target.value})} />
                      </div>
                      <div className="col-12">
                        <label className="form-label text-muted mb-1" style={{fontSize: '12px'}}>Address Line</label>
                        <input type="text" className="form-control form-control-sm" required placeholder="Flat, House no., Building, Street" value={newAddress.addressLine} onChange={e => setNewAddress({...newAddress, addressLine: e.target.value})} />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label text-muted mb-1" style={{fontSize: '12px'}}>City</label>
                        <input type="text" className="form-control form-control-sm" required value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label text-muted mb-1" style={{fontSize: '12px'}}>State</label>
                        <input type="text" className="form-control form-control-sm" required value={newAddress.state} onChange={e => setNewAddress({...newAddress, state: e.target.value})} />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label text-muted mb-1" style={{fontSize: '12px'}}>Zip Code</label>
                        <input type="text" className="form-control form-control-sm" required value={newAddress.zipCode} onChange={e => setNewAddress({...newAddress, zipCode: e.target.value})} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-muted mb-1" style={{fontSize: '12px'}}>Phone</label>
                        <input type="text" className="form-control form-control-sm" required value={newAddress.phone} onChange={e => setNewAddress({...newAddress, phone: e.target.value})} />
                      </div>
                      <div className="col-md-6 d-flex align-items-end pb-1">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="isDefault" checked={newAddress.isDefault} onChange={e => setNewAddress({...newAddress, isDefault: e.target.checked})} />
                          <label className="form-check-label text-secondary" htmlFor="isDefault" style={{fontSize: '13px'}}>Set as Default Address</label>
                        </div>
                      </div>
                      <div className="col-12 mt-3 text-end">
                        <button type="submit" className="btn btn-sm btn-success px-4">
                          {newAddress.id ? 'Update Address' : 'Save Address'}
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                <div className="row g-3">
                  {addresses.length === 0 && !showAddAddress ? (
                    <div className="col-12 text-center py-4">
                      <FaMapMarkerAlt size={30} className="text-muted mb-2" />
                      <p className="text-secondary mb-0">No saved addresses found.</p>
                    </div>
                  ) : (
                    addresses.map(addr => (
                      <div key={addr.id} className="col-md-6">
                        <div className="p-3 border rounded bg-white h-100 position-relative shadow-sm">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <span className="badge bg-secondary-subtle text-secondary">{addr.type}</span>
                            {addr.isDefault && (
                              <span className="badge bg-success">Default</span>
                            )}
                          </div>
                          <div className="fw-bold text-dark">{addr.recipient}</div>
                          <div className="text-secondary" style={{ fontSize: '13px' }}>{addr.addressLine}</div>
                          <div className="text-secondary" style={{ fontSize: '13px' }}>{addr.city}, {addr.state} {addr.zipCode}</div>
                          <div className="text-secondary mt-1" style={{ fontSize: '12px' }}>{addr.phone}</div>

                          <div className="d-flex gap-2 mt-3 pt-2 border-top">
                            {!addr.isDefault && (
                              <button onClick={() => setDefaultAddress(addr.id)} className="btn btn-sm btn-outline-success" style={{ fontSize: '11px' }}>
                                Set Default
                              </button>
                            )}
                            <button 
                              onClick={() => {
                                setNewAddress(addr); 
                                setShowAddAddress(true);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }} 
                              className="btn btn-sm btn-outline-primary" 
                              style={{ fontSize: '11px' }}
                            >
                              <FaEdit className="me-1" /> Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* 7. GIFT CARDS TAB (FIXED ID: 'giftcards') */}
            {activeTab === 'giftcards' && (
              <div className="card-auramed p-4 border-0 shadow-sm bg-white rounded-3">
                <div className="p-4 rounded-3 mb-4" style={{backgroundColor: '#F8F9FA', border: '1px dashed #ccc'}}>
                  <h6 className="fw-bold mb-3"><FaWallet className="me-2 text-success"/> Add a Gift Card</h6>
                  <div className="d-flex gap-2 flex-column flex-sm-row">
                    <input type="text" className="form-control" placeholder="Enter 16-digit Gift Card Code" value={giftCardInput} onChange={(e) => setGiftCardInput(e.target.value)} />
                    <button className="btn btn-success px-4" onClick={() => { alert('Gift Card Added Successfully!'); setGiftCardInput(''); }}>Add</button>
                  </div>
                </div>

             
                
                <div className="text-center py-5 border rounded-3 bg-light">
                  <FaGift size={50} className="text-muted mb-3" style={{opacity: 0.5}} />
                  <h5 className="fw-bold">No Gift Cards Found</h5>
                  <p className="text-secondary mb-4" style={{fontSize: '14px'}}>You currently don't have any active gift cards in your account.</p>
                </div>
              </div>
            )}

            {/* 8. COUPONS TAB (FIXED ID: 'coupons') */}
            {activeTab === 'coupons' && (
              <div className="card-auramed p-4 border-0 shadow-sm bg-white rounded-3">
                <div className="d-flex align-items-center gap-2 mb-4 border-bottom pb-3 overflow-auto">
                  <span className="fw-bold me-2 text-dark" style={{fontSize: '14px'}}>Sort by:</span>
                  <button className="btn btn-sm rounded-pill px-3" style={{border: '1px solid #2E7D32', color: '#2E7D32', backgroundColor: '#E8F5E9'}}>Trending</button>
                  <button className="btn btn-sm rounded-pill px-3 border text-secondary bg-white">Discount</button>
                  <button className="btn btn-sm rounded-pill px-3 border text-secondary bg-white">Expiring Soon</button>
                </div>

                <div className="row g-4">
                  {availableCoupons.map((coupon) => (
                    <div key={coupon.id} className="col-md-6">
                      <div className="card h-100 border rounded-3 shadow-sm position-relative">
                        <button className="btn-close position-absolute top-0 end-0 m-2" style={{fontSize: '10px'}}></button>
                        <div className="row g-0 h-100">
                          <div className="col-4 d-flex align-items-center justify-content-center p-2 bg-light rounded-start">
                            <img src={coupon.img} alt="Coupon" className="img-fluid rounded" style={{ maxHeight: '100px', objectFit: 'cover' }} />
                          </div>
                          <div className="col-8 p-3 d-flex flex-column justify-content-between">
                            <div>
                              <h6 className="fw-bold mb-1" style={{ fontSize: '15px' }}>{coupon.discount}</h6>
                              <p className="text-muted mb-2" style={{ fontSize: '12px' }}>{coupon.desc}</p>
                              
                              <div className="d-flex align-items-center gap-2 mb-1" style={{ fontSize: '12px' }}>
                                <span className="text-muted">Code: <strong>{coupon.code}</strong></span>
                                <button onClick={() => handleCopyCode(coupon.code)} className="btn btn-link p-0 text-decoration-none" style={{ fontSize: '14px', color: copiedCode === coupon.code ? '#2E7D32' : '#6c757d' }}>
                                  {copiedCode === coupon.code ? <FaCheck /> : <FaCopy />}
                                </button>
                              </div>
                              <div className="text-muted" style={{ fontSize: '11px' }}>Expiry: {coupon.expiry}</div>
                            </div>
                            
                            <div className="mt-3">
                              <Link to="/products" className="text-success fw-bold text-decoration-none d-flex align-items-center gap-1" style={{ fontSize: '13px' }}>
                                View Products <span style={{fontSize: '18px'}}>&rsaquo;</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}