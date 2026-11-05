import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaUser, FaShoppingBag, FaFileMedical, FaUserMd, 
  FaFlask, FaHeart, FaMapMarkerAlt, FaKey, FaShieldAlt, 
  FaCheckCircle, FaClock, FaTruck, FaAward, FaEdit, FaPlus,
  FaCalendarAlt, FaCreditCard, FaTicketAlt
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useHealthcare } from '../../context/HealthcareContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function CustomerDashboard() {
  const location = useLocation();
  const { currentUser, addresses, updateProfile, addAddress, deleteAddress, setDefaultAddress } = useAuth();
  const { orders, prescriptions, doctorAppointments, labBookings, cancelDoctorAppointment } = useHealthcare();
  const { addToCart } = useCart();
  const { wishlist } = useWishlist();

  const [activeTab, setActiveTab] = useState(location.state?.tab || 'overview'); // 'overview', 'orders', 'prescriptions', 'appointments', 'labs', 'addresses', 'profile'

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone
  });

  const [passwordForm, setPasswordForm] = useState({ old: '', newPass: '', confirm: '' });
  const [passwordMsg, setPasswordMsg] = useState('');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setIsEditingProfile(false);
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

  return (
    <div className="py-5" style={{ backgroundColor: '#F7FAF8' }}>
      <div className="container-xl">
        
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb" style={{ fontSize: '13px' }}>
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Customer Dashboard</li>
          </ol>
        </nav>

        {/* Dashboard Header Profile Banner */}
        <div className="card-auramed p-4 mb-4" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F7F3 100%)' }}>
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div className="d-flex align-items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="rounded-circle shadow-sm"
                style={{ width: '70px', height: '70px', objectFit: 'cover', border: '3px solid #159B64' }}
              />
              <div>
                <div className="d-flex align-items-center gap-2">
                  <h4 className="fw-bold text-dark mb-0">{currentUser.name}</h4>
                  <span className="badge bg-success-subtle text-success border border-success-subtle" style={{ fontSize: '11px' }}>
                    <FaAward className="me-1" /> {currentUser.tier || 'Gold Member'}
                  </span>
                </div>
                <div className="text-secondary" style={{ fontSize: '13px' }}>
                  {currentUser.email} • {currentUser.phone}
                </div>
                <div className="text-primary-green fw-semibold mt-1" style={{ fontSize: '12px' }}>
                  ★ {currentUser.loyaltyPoints || 480} AuraMed Health Reward Points
                </div>
              </div>
            </div>

            <div className="d-flex gap-2">
              <Link to="/prescription" className="btn btn-sm btn-auramed d-flex align-items-center gap-1">
                <FaFileMedical /> Upload Rx
              </Link>
              <Link to="/doctors" className="btn btn-sm btn-auramed-outline d-flex align-items-center gap-1">
                <FaUserMd /> Book Doctor
              </Link>
            </div>
          </div>
        </div>

        <div className="row g-4">
          
          {/* Navigation Sidebar */}
          <div className="col-lg-3">
            <div className="card-auramed p-2 sticky-top" style={{ top: '90px' }}>
              <div className="d-flex flex-column gap-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`dashboard-nav-item border-0 text-start w-100 ${activeTab === 'overview' ? 'active' : ''}`}
                >
                  <FaUser /> Overview & Health Score
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className={`dashboard-nav-item border-0 text-start w-100 ${activeTab === 'orders' ? 'active' : ''}`}
                >
                  <FaShoppingBag /> My Orders ({orders.length})
                </button>

                <button
                  onClick={() => setActiveTab('prescriptions')}
                  className={`dashboard-nav-item border-0 text-start w-100 ${activeTab === 'prescriptions' ? 'active' : ''}`}
                >
                  <FaFileMedical /> My Prescriptions ({prescriptions.length})
                </button>

                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`dashboard-nav-item border-0 text-start w-100 ${activeTab === 'appointments' ? 'active' : ''}`}
                >
                  <FaUserMd /> Doctor Consultations ({doctorAppointments.length})
                </button>

                <button
                  onClick={() => setActiveTab('labs')}
                  className={`dashboard-nav-item border-0 text-start w-100 ${activeTab === 'labs' ? 'active' : ''}`}
                >
                  <FaFlask /> Lab Test Bookings ({labBookings.length})
                </button>

                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`dashboard-nav-item border-0 text-start w-100 ${activeTab === 'addresses' ? 'active' : ''}`}
                >
                  <FaMapMarkerAlt /> Saved Delivery Addresses
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className={`dashboard-nav-item border-0 text-start w-100 ${activeTab === 'profile' ? 'active' : ''}`}
                >
                  <FaKey /> Profile & Security
                </button>
              </div>
            </div>
          </div>

          {/* Main Dashboard Content Area */}
          <div className="col-lg-9">
            
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div>
                {/* Stats row */}
                <div className="row g-3 mb-4">
                  <div className="col-sm-6 col-xl-3">
                    <div className="card-auramed p-3 h-100">
                      <div className="text-secondary mb-1" style={{ fontSize: '12px' }}>Total Orders</div>
                      <div className="fs-3 fw-bold text-dark">{orders.length}</div>
                      <small className="text-success fw-semibold">2 active in progress</small>
                    </div>
                  </div>

                  <div className="col-sm-6 col-xl-3">
                    <div className="card-auramed p-3 h-100">
                      <div className="text-secondary mb-1" style={{ fontSize: '12px' }}>Prescriptions</div>
                      <div className="fs-3 fw-bold text-primary-green">{prescriptions.length}</div>
                      <small className="text-muted">1 approved, 1 pending</small>
                    </div>
                  </div>

                  <div className="col-sm-6 col-xl-3">
                    <div className="card-auramed p-3 h-100">
                      <div className="text-secondary mb-1" style={{ fontSize: '12px' }}>Doctor Visits</div>
                      <div className="fs-3 fw-bold text-dark">{doctorAppointments.length}</div>
                      <small className="text-info fw-semibold">Next: Nov 05, 11 AM</small>
                    </div>
                  </div>

                  <div className="col-sm-6 col-xl-3">
                    <div className="card-auramed p-3 h-100">
                      <div className="text-secondary mb-1" style={{ fontSize: '12px' }}>Lab Checkups</div>
                      <div className="fs-3 fw-bold text-dark">{labBookings.length}</div>
                      <small className="text-muted">Home sample scheduled</small>
                    </div>
                  </div>
                </div>

                {/* Recent Orders Overview */}
                <div className="card-auramed p-4 mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="fw-bold text-dark mb-0">Recent Order Activity</h5>
                    <button onClick={() => setActiveTab('orders')} className="btn btn-sm btn-link text-primary-green p-0 text-decoration-none">
                      View All Orders
                    </button>
                  </div>

                  <div className="table-responsive">
                    <table className="table align-middle mb-0" style={{ fontSize: '13px' }}>
                      <thead className="table-light">
                        <tr>
                          <th>ORDER ID</th>
                          <th>DATE</th>
                          <th>TOTAL</th>
                          <th>STATUS</th>
                          <th>TRACKING</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(order => (
                          <tr key={order.id}>
                            <td className="fw-bold text-primary-green">{order.id}</td>
                            <td>{order.date}</td>
                            <td className="fw-bold">₹{order.total.toFixed(2)}</td>
                            <td>
                              <span className={`badge-status ${
                                order.status === 'Delivered' ? 'badge-status-delivered' :
                                order.status === 'Out for Delivery' ? 'badge-status-transit' : 'badge-status-pending'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td>
                              <span className="badge bg-light text-dark border">
                                {order.trackingNumber}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Prescription Status Card */}
                <div className="card-auramed p-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="fw-bold text-dark mb-0">Active Prescription Queue</h5>
                    <Link to="/prescription" className="btn btn-sm btn-auramed">
                      + Upload New
                    </Link>
                  </div>

                  <div className="row g-3">
                    {prescriptions.map(rx => (
                      <div key={rx.id} className="col-md-6">
                        <div className="p-3 border rounded bg-light">
                          <div className="d-flex justify-content-between mb-1">
                            <strong className="text-dark">{rx.id}</strong>
                            <span className="badge-status badge-status-approved">{rx.status}</span>
                          </div>
                          <div className="text-secondary" style={{ fontSize: '12px' }}>
                            Patient: {rx.patientName} • Prescriber: {rx.doctorName}
                          </div>
                          <div className="text-muted mt-2" style={{ fontSize: '11px' }}>
                            {rx.pharmacistNotes}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="card-auramed p-4">
                <h5 className="fw-bold text-dark mb-4">Complete Order History ({orders.length})</h5>
                
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
                          <div className="fw-bold text-dark-green">₹{order.total.toFixed(2)}</div>
                        </div>
                        <div>
                          <span className="text-secondary" style={{ fontSize: '12px' }}>SHIP TO:</span>
                          <div className="fw-semibold text-truncate" style={{ maxWidth: '200px', fontSize: '13px' }}>
                            {order.deliveryAddress}
                          </div>
                        </div>
                        <div>
                          <span className="text-secondary" style={{ fontSize: '12px' }}>ORDER ID:</span>
                          <div className="fw-bold text-primary-green">{order.id}</div>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="mb-3">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className={`badge-status ${
                            order.status === 'Delivered' ? 'badge-status-delivered' :
                            order.status === 'Out for Delivery' ? 'badge-status-transit' : 'badge-status-pending'
                          }`}>
                            <FaTruck className="me-1" /> {order.status}
                          </span>
                          <small className="text-muted">Waybill: <strong>{order.trackingNumber}</strong></small>
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
                        <Link to="/products" className="btn btn-sm btn-outline-secondary">
                          Reorder Items
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. PRESCRIPTIONS TAB */}
            {activeTab === 'prescriptions' && (
              <div className="card-auramed p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold text-dark mb-0">My Prescriptions</h5>
                  <Link to="/prescription" className="btn btn-sm btn-auramed">
                    + Upload New Prescription
                  </Link>
                </div>

                <div className="d-flex flex-column gap-3">
                  {prescriptions.map(rx => (
                    <div key={rx.id} className="p-3 border rounded bg-white">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h6 className="fw-bold text-dark mb-0">{rx.id}</h6>
                          <small className="text-muted">Uploaded on {rx.uploadDate}</small>
                        </div>
                        <span className={`badge-status ${
                          rx.status === 'Approved' ? 'badge-status-approved' : 'badge-status-pending'
                        }`}>
                          {rx.status}
                        </span>
                      </div>
                      <div className="text-secondary" style={{ fontSize: '13px' }}>
                        Patient: <strong>{rx.patientName}</strong> • Prescribed by: <strong>{rx.doctorName}</strong> ({rx.clinicName})
                      </div>
                      <div className="p-2 bg-light rounded mt-2 text-secondary" style={{ fontSize: '12px' }}>
                        <strong>Pharmacist Review Notes:</strong> {rx.pharmacistNotes}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. APPOINTMENTS TAB */}
            {activeTab === 'appointments' && (
              <div className="card-auramed p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold text-dark mb-0">Doctor Appointments</h5>
                  <Link to="/doctors" className="btn btn-sm btn-auramed">
                    + Consult Doctor
                  </Link>
                </div>

                {doctorAppointments.length > 0 ? (
                  <div className="d-flex flex-column gap-3">
                    {doctorAppointments.map(apt => (
                      <div key={apt.id} className="p-3 border rounded bg-white">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h6 className="fw-bold text-dark mb-0">{apt.doctorName}</h6>
                            <span className="text-primary-green fw-semibold" style={{ fontSize: '12px' }}>
                              {apt.specialization} • {apt.type}
                            </span>
                          </div>
                          <span className={`badge-status ${apt.status === 'Confirmed' ? 'badge-status-approved' : 'badge-status-cancelled'}`}>
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
              <div className="card-auramed p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold text-dark mb-0">Lab Test Bookings</h5>
                  <Link to="/lab-tests" className="btn btn-sm btn-auramed">
                    + Book Lab Checkup
                  </Link>
                </div>

                {labBookings.map(b => (
                  <div key={b.id} className="p-3 border rounded bg-white mb-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h6 className="fw-bold text-dark mb-0">{b.testName}</h6>
                        <small className="text-muted">Booking Reference: {b.id}</small>
                      </div>
                      <span className="badge-status badge-status-approved">{b.status}</span>
                    </div>

                    <div className="text-secondary" style={{ fontSize: '13px' }}>
                      Phlebotomist Visit: <strong>{b.date} ({b.slot})</strong> • Patient: <strong>{b.patientName}</strong>
                    </div>

                    <div className="text-secondary" style={{ fontSize: '12px' }}>
                      Sample Location: {b.collectionAddress}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 6. ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="card-auramed p-4">
                <h5 className="fw-bold text-dark mb-4">Saved Delivery Addresses</h5>
                
                <div className="row g-3">
                  {addresses.map(addr => (
                    <div key={addr.id} className="col-md-6">
                      <div className="p-3 border rounded bg-light h-100 position-relative">
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
                          <button onClick={() => deleteAddress(addr.id)} className="btn btn-sm btn-outline-danger" style={{ fontSize: '11px' }}>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. PROFILE & SECURITY TAB */}
            {activeTab === 'profile' && (
              <div className="card-auramed p-4">
                <h5 className="fw-bold text-dark mb-4">Profile & Account Security</h5>

                <div className="row g-4">
                  <div className="col-lg-6">
                    <h6 className="fw-bold text-dark mb-3">Personal Details</h6>
                    <form onSubmit={handleSaveProfile}>
                      <div className="mb-3">
                        <label className="form-label" style={{ fontSize: '13px' }}>Full Name</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" style={{ fontSize: '13px' }}>Email Address</label>
                        <input
                          type="email"
                          className="form-control form-control-sm"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" style={{ fontSize: '13px' }}>Phone Number</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        />
                      </div>
                      <button type="submit" className="btn btn-sm btn-auramed">
                        Save Profile Changes
                      </button>
                    </form>
                  </div>

                  <div className="col-lg-6">
                    <h6 className="fw-bold text-dark mb-3">Change Password</h6>
                    <form onSubmit={handleChangePassword}>
                      <div className="mb-2">
                        <label className="form-label" style={{ fontSize: '12px' }}>Current Password</label>
                        <input
                          type="password"
                          className="form-control form-control-sm"
                          value={passwordForm.old}
                          onChange={(e) => setPasswordForm({ ...passwordForm, old: e.target.value })}
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label className="form-label" style={{ fontSize: '12px' }}>New Password</label>
                        <input
                          type="password"
                          className="form-control form-control-sm"
                          value={passwordForm.newPass}
                          onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" style={{ fontSize: '12px' }}>Confirm New Password</label>
                        <input
                          type="password"
                          className="form-control form-control-sm"
                          value={passwordForm.confirm}
                          onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                          required
                        />
                      </div>

                      {passwordMsg && (
                        <div className="alert alert-info py-1 px-2 mb-2" style={{ fontSize: '12px' }}>
                          {passwordMsg}
                        </div>
                      )}

                      <button type="submit" className="btn btn-sm btn-outline-secondary">
                        Update Password
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
