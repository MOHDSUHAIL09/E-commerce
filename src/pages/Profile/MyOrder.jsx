import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaShoppingBag, FaTruck, FaCheck, FaHeadset 
} from 'react-icons/fa';
import { useHealthcare } from "../../context/HealthcareContext"

export default function MyOrder() {
  const { orders } = useHealthcare();
  const [trackingOrderId, setTrackingOrderId] = useState(null);

  const toggleTracking = (orderId) => {
    if (trackingOrderId === orderId) setTrackingOrderId(null);
    else setTrackingOrderId(orderId);
  };

  return (
    <div className="card-auramed p-0 border-0 shadow-sm bg-white rounded-3">
      <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
        <h5 className="fw-bold text-dark mb-0">Complete Order History ({orders.length})</h5>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-5">
          <FaShoppingBag size={40} className="text-muted mb-3" />
          <h6>No orders found</h6>
          <Link to="/products" className="btn btn-success mt-2">Start Shopping</Link>
        </div>
      ) : (
        <div className="p-4 d-flex flex-column gap-4" style={{ backgroundColor: '#F9FAFB' }}>
          {orders.map(order => (
            <div key={order.id} className="bg-white border rounded-3 shadow-sm overflow-hidden">
              
              {/* TOP SECTION: Status & Help */}
              <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
                <div>
                  <span className={`badge ${order.status === 'Delivered' ? 'bg-success' : order.status === 'Out for Delivery' ? 'bg-info text-dark' : 'bg-warning text-dark'}`}>
                    <FaTruck className="me-1" /> {order.status || 'Processing'}
                  </span>
                </div>
                <button className="btn btn-sm btn-light border rounded-pill fw-bold d-flex align-items-center gap-2 px-3">
                  <FaHeadset /> Help
                </button>
              </div>

              {/* MIDDLE SECTION: Horizontal Tracking Bar */}
              <div className="px-4 py-3 border-bottom bg-white">
                <div className="d-flex justify-content-between position-relative pt-2 pb-1">
                  
                  {/* Background Lines */}
                  <div className="position-absolute" style={{ top: '14px', left: '8%', right: '8%', height: '2px', backgroundColor: '#E5E7EB', zIndex: 0 }}></div>
                  <div className="position-absolute" style={{ top: '14px', left: '8%', width: '45%', height: '2px', backgroundColor: '#0A553E', zIndex: 0 }}></div>

                  {/* Steps */}
                  <div className="d-flex flex-column align-items-center position-relative" style={{ width: '20%', zIndex: 1 }}>
                    <div className="rounded-circle d-flex align-items-center justify-content-center bg-success text-white mb-1" style={{ width: '20px', height: '20px' }}>
                      <FaCheck size={10} />
                    </div>
                    <span className="fw-semibold text-dark" style={{ fontSize: '11px' }}>Booked</span>
                  </div>

                  <div className="d-flex flex-column align-items-center position-relative" style={{ width: '20%', zIndex: 1 }}>
                    <div className="rounded-circle d-flex align-items-center justify-content-center bg-success text-white mb-1" style={{ width: '20px', height: '20px' }}>
                      <FaCheck size={10} />
                    </div>
                    <span className="fw-semibold text-dark" style={{ fontSize: '11px' }}>Dispatched</span>
                  </div>

                  <div className="d-flex flex-column align-items-center position-relative" style={{ width: '20%', zIndex: 1 }}>
                    <div className="rounded-circle d-flex align-items-center justify-content-center bg-success text-white mb-1" style={{ width: '20px', height: '20px' }}>
                      <FaCheck size={10} />
                    </div>
                    <span className="fw-semibold text-dark" style={{ fontSize: '11px' }}>In Transit</span>
                  </div>

                  <div className="d-flex flex-column align-items-center position-relative" style={{ width: '20%', zIndex: 1 }}>
                    <div className="rounded-circle d-flex align-items-center justify-content-center bg-light border border-2 mb-1" style={{ width: '20px', height: '20px', borderColor: '#D1D5DB' }}>
                      <div className="rounded-circle bg-secondary" style={{ width: '6px', height: '6px' }}></div>
                    </div>
                    <span className="text-secondary" style={{ fontSize: '11px' }}>Out for Delivery</span>
                  </div>

                  <div className="d-flex flex-column align-items-center position-relative" style={{ width: '20%', zIndex: 1 }}>
                    <div className="rounded-circle d-flex align-items-center justify-content-center bg-light border border-2 mb-1" style={{ width: '20px', height: '20px', borderColor: '#D1D5DB' }}>
                      <div className="rounded-circle bg-secondary" style={{ width: '6px', height: '6px' }}></div>
                    </div>
                    <span className="text-secondary" style={{ fontSize: '11px' }}>Delivered</span>
                  </div>
                </div>
              </div>

              {/* PRODUCT DETAILS SECTION */}
              <div className="p-4 text-center d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex gap-2 mb-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="border rounded-3 p-2 bg-light d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                      <img src={item.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80'} alt={item.name} className="img-fluid rounded" style={{ maxHeight: '100%', objectFit: 'contain' }} />
                    </div>
                  ))}
                </div>

                <h6 className="fw-bold text-dark mb-1">{order.items[0]?.name || 'Product Name'}</h6>
                <div className="text-secondary mb-1" style={{ fontSize: '14px' }}>{order.items[0]?.brand || 'Brand'}</div>
                <div className="text-dark mb-3" style={{ fontSize: '14px' }}>Size: Free Size &nbsp;•&nbsp; Qty: {order.items[0]?.quantity || 1}</div>
              </div>

              {/* BOTTOM SECTION: Date & Total */}
              <div className="p-3 d-flex justify-content-between align-items-center bg-light" style={{ fontSize: '13px' }}>
                <span className="text-secondary">Order ID: <strong>{order.id}</strong></span>
                <span className="text-dark fw-bold fs-6">Total: ₹{order.total.toFixed(2)}</span>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}