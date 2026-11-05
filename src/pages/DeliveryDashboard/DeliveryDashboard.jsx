import React, { useState } from 'react';
import { 
  FaShippingFast, FaMapMarkerAlt, FaPhoneAlt, FaCheckCircle, 
  FaBoxOpen, FaDollarSign, FaClock, FaCalendarDay, FaUser,
  FaRoute, FaCommentAlt, FaTimes
} from 'react-icons/fa';
import { useHealthcare } from '../../context/HealthcareContext';
import { useAuth } from '../../context/AuthContext';

export default function DeliveryDashboard() {
  const { orders, updateOrderStatus } = useHealthcare();
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState('assigned'); // 'assigned', 'history', 'earnings'
  const [contactModal, setContactModal] = useState(null);
  const [smsText, setSmsText] = useState('Hello, your AuraMed medicine package is arriving in 5 minutes.');
  const [smsSent, setSmsSent] = useState(false);

  const assignedOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');
  const completedOrders = orders.filter(o => o.status === 'Delivered');

  const handleUpdateStatus = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const handleSendSMS = (e) => {
    e.preventDefault();
    setSmsSent(true);
    setTimeout(() => {
      setSmsSent(false);
      setContactModal(null);
    }, 2000);
  };

  return (
    <div className="py-4" style={{ backgroundColor: '#F8FAF9' }}>
      <div className="container-xl">
        
        {/* Header */}
        <div className="card-auramed p-4 mb-4" style={{ background: 'linear-gradient(135deg, #172B24 0%, #0E3626 100%)', color: '#FFFFFF' }}>
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div className="d-flex align-items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="rounded-circle shadow"
                style={{ width: '64px', height: '64px', objectFit: 'cover', border: '3px solid #159B64' }}
              />
              <div>
                <span className="badge bg-success mb-1">EXPRESS LOGISTICS PORTAL</span>
                <h3 className="fw-bold mb-0 text-white">{currentUser.name}</h3>
                <div className="text-white-50" style={{ fontSize: '13px' }}>
                  Courier Unit: <strong>Electric Van #12</strong> • Shift Rating: <strong>★ 4.95</strong>
                </div>
              </div>
            </div>

            <div className="d-flex gap-3">
              <div className="p-3 bg-white bg-opacity-10 rounded text-center">
                <span className="text-white-50 d-block" style={{ fontSize: '11px' }}>Today's Earnings</span>
                <span className="fs-4 fw-bold text-success">₹1,420.00</span>
              </div>
              <div className="p-3 bg-white bg-opacity-10 rounded text-center">
                <span className="text-white-50 d-block" style={{ fontSize: '11px' }}>Completed Today</span>
                <span className="fs-4 fw-bold text-white">{completedOrders.length + 12}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <ul className="nav nav-pills gap-2 mb-4 bg-white p-2 rounded border">
          <li className="nav-item">
            <button
              className={`btn btn-sm ${activeTab === 'assigned' ? 'btn-auramed' : 'btn-light'}`}
              onClick={() => setActiveTab('assigned')}
            >
              <FaShippingFast className="me-1" /> Active Assigned Deliveries ({assignedOrders.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`btn btn-sm ${activeTab === 'history' ? 'btn-auramed' : 'btn-light'}`}
              onClick={() => setActiveTab('history')}
            >
              <FaCheckCircle className="me-1" /> Delivered History ({completedOrders.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`btn btn-sm ${activeTab === 'earnings' ? 'btn-auramed' : 'btn-light'}`}
              onClick={() => setActiveTab('earnings')}
            >
              <FaDollarSign className="me-1" /> Earnings & Shift Payouts
            </button>
          </li>
        </ul>

        {/* 1. ASSIGNED ORDERS */}
        {activeTab === 'assigned' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold text-dark mb-0">Active Route Shipments</h5>
              <span className="badge bg-light-green text-dark-green fw-semibold">
                Temperature Monitored (2°C - 8°C Cold Box)
              </span>
            </div>

            {assignedOrders.length > 0 ? (
              <div className="row g-4">
                {assignedOrders.map(order => (
                  <div key={order.id} className="col-lg-6">
                    <div className="card-auramed p-4 h-100 border-2">
                      <div className="d-flex justify-content-between align-items-start mb-3 pb-2 border-bottom">
                        <div>
                          <span className="badge bg-primary-subtle text-primary fw-bold mb-1">
                            {order.deliveryMethod || '15-Min Express'}
                          </span>
                          <h5 className="fw-bold text-dark mb-0">{order.id}</h5>
                          <small className="text-muted">Waybill: {order.trackingNumber}</small>
                        </div>
                        <span className={`badge-status ${
                          order.status === 'Out for Delivery' ? 'badge-status-transit' : 'badge-status-pending'
                        }`}>
                          {order.status}
                        </span>
                      </div>

                      {/* Recipient Details */}
                      <div className="mb-3">
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <FaUser color="#159B64" size={13} />
                          <strong className="text-dark">{order.patientName || 'Alex Morgan'}</strong>
                        </div>
                        <div className="d-flex align-items-start gap-2 text-secondary mb-2" style={{ fontSize: '13px' }}>
                          <FaMapMarkerAlt color="#E74C3C" size={14} className="mt-1" />
                          <span>{order.deliveryAddress}</span>
                        </div>
                        <div className="p-2 bg-light rounded text-secondary" style={{ fontSize: '12px' }}>
                          <strong>Medications in Batch:</strong> {order.items ? order.items.map(i => `${i.quantity}x ${i.name}`).join(', ') : 'Insulin & Antibiotic kit'}
                        </div>
                      </div>

                      {/* Contact & Status Actions */}
                      <div className="pt-3 border-top mt-auto">
                        <div className="d-flex gap-2 mb-3">
                          <button
                            onClick={() => setContactModal(order)}
                            className="btn btn-sm btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                          >
                            <FaPhoneAlt size={12} /> Contact Patient
                          </button>
                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(order.deliveryAddress)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm btn-outline-success flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                          >
                            <FaRoute size={12} /> Navigation Route
                          </a>
                        </div>

                        {/* Status Transition buttons */}
                        <div className="d-flex gap-2">
                          {order.status !== 'Out for Delivery' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'Out for Delivery')}
                              className="btn btn-sm btn-primary flex-grow-1"
                            >
                              Start Route (Out for Delivery)
                            </button>
                          )}

                          <button
                            onClick={() => handleUpdateStatus(order.id, 'Delivered')}
                            className="btn btn-sm btn-success flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                          >
                            <FaCheckCircle /> Mark as Delivered
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card-auramed p-5 text-center">
                <FaCheckCircle size={44} className="text-success mb-2" />
                <h5 className="fw-bold text-dark">No Active Deliveries</h5>
                <p className="text-secondary" style={{ fontSize: '14px' }}>
                  All assigned orders for this shift have been fulfilled.
                </p>
              </div>
            )}
          </div>
        )}

        {/* 2. HISTORY */}
        {activeTab === 'history' && (
          <div className="card-auramed p-4">
            <h5 className="fw-bold text-dark mb-4">Completed Deliveries</h5>
            <div className="table-responsive">
              <table className="table align-middle mb-0" style={{ fontSize: '13px' }}>
                <thead className="table-light">
                  <tr>
                    <th>ORDER ID</th>
                    <th>PATIENT</th>
                    <th>DATE</th>
                    <th>DESTINATION</th>
                    <th>PAYOUT</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {completedOrders.map(o => (
                    <tr key={o.id}>
                      <td className="fw-bold text-primary-green">{o.id}</td>
                      <td>{o.patientName || 'Alex Morgan'}</td>
                      <td>{o.date}</td>
                      <td className="text-truncate" style={{ maxWidth: '240px' }}>{o.deliveryAddress}</td>
                      <td className="fw-bold text-success">+$6.50 Express Tip</td>
                      <td>
                        <span className="badge-status badge-status-delivered">
                          <FaCheckCircle className="me-1" /> Delivered
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. EARNINGS */}
        {activeTab === 'earnings' && (
          <div className="card-auramed p-4">
            <h5 className="fw-bold text-dark mb-4">Courier Shift Summary & Payouts</h5>

            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <div className="p-3 bg-light rounded border text-center">
                  <span className="text-secondary d-block" style={{ fontSize: '12px' }}>Base Deliveries Pay</span>
                  <div className="fs-3 fw-bold text-dark">$95.00</div>
                  <small className="text-muted">14 standard trips</small>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 bg-light rounded border text-center">
                  <span className="text-secondary d-block" style={{ fontSize: '12px' }}>Express Surge Incentives</span>
                  <div className="fs-3 fw-bold text-primary-green">$32.50</div>
                  <small className="text-success fw-semibold">Peak rush multiplier</small>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 bg-light rounded border text-center">
                  <span className="text-secondary d-block" style={{ fontSize: '12px' }}>Customer Tips</span>
                  <div className="fs-3 fw-bold text-dark">$15.00</div>
                  <small className="text-muted">100% passed to driver</small>
                </div>
              </div>
            </div>

            <div className="p-3 bg-light-green rounded border border-success-subtle d-flex justify-content-between align-items-center">
              <div>
                <strong>Direct Deposit Bank Account:</strong>
                <div className="text-secondary" style={{ fontSize: '12px' }}>Chase Checking (•••• 8821) • Next payout: Tomorrow, 6:00 AM</div>
              </div>
              <span className="badge bg-success fs-6">$142.50 Ready</span>
            </div>
          </div>
        )}

      </div>

      {/* Contact Patient Modal Simulator */}
      {contactModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1100 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <div>
                  <h5 className="modal-title fw-bold mb-0">Contact Patient</h5>
                  <small className="text-secondary">{contactModal.patientName || 'Alex Morgan'} • Order {contactModal.id}</small>
                </div>
                <button type="button" className="btn-close" onClick={() => setContactModal(null)}></button>
              </div>

              <div className="modal-body p-4">
                <div className="p-3 bg-light rounded mb-3 text-center">
                  <FaPhoneAlt size={24} className="text-success mb-2" />
                  <div className="fw-bold text-dark">+1 (555) 234-5678</div>
                  <small className="text-secondary">Masked patient phone number for privacy</small>
                </div>

                <form onSubmit={handleSendSMS}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Quick SMS Update</label>
                    <textarea
                      className="form-control form-control-sm"
                      rows="3"
                      value={smsText}
                      onChange={(e) => setSmsText(e.target.value)}
                    ></textarea>
                  </div>

                  {smsSent && (
                    <div className="alert alert-success py-1 px-2 mb-2 text-center" style={{ fontSize: '12px' }}>
                      SMS Notification Dispatched!
                    </div>
                  )}

                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-sm btn-auramed flex-grow-1">
                      <FaCommentAlt size={12} className="me-1" /> Send Notification
                    </button>
                    <button type="button" className="btn btn-sm btn-secondary" onClick={() => setContactModal(null)}>
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
