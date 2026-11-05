import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaUserMd, FaShippingFast, FaUserShield, FaCrown, FaCheckCircle, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function RoleSwitcherModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const navigate = useNavigate();
  const { currentRole, switchRole } = useAuth();

  const roles = [
    {
      id: 'customer',
      title: 'Customer Experience',
      name: 'Alex Morgan',
      subtitle: 'Standard Healthcare Consumer',
      description: 'Browse catalog, upload prescriptions, book doctors & lab tests, checkout with demo coupons, track deliveries.',
      icon: <FaUser size={22} />,
      dashboardUrl: '/customer-dashboard',
      color: '#159B64'
    },
    {
      id: 'pharmacist',
      title: 'Pharmacist Panel UI',
      name: 'Dr. Nathan Cross, PharmD',
      subtitle: 'Registered Clinical Pharmacist',
      description: 'Review prescription uploads, verify medical licenses, add clinical notes, approve or reject dispensed orders.',
      icon: <FaUserMd size={22} />,
      dashboardUrl: '/pharmacist-dashboard',
      color: '#08784B'
    },
    {
      id: 'delivery',
      title: 'Delivery Partner UI',
      name: 'Liam Hayes',
      subtitle: 'Express Logistics Courier',
      description: 'View assigned packages, customer delivery addresses, trigger status updates (Out for Delivery -> Delivered), view earnings.',
      icon: <FaShippingFast size={22} />,
      dashboardUrl: '/delivery-dashboard',
      color: '#E67E22'
    },
    {
      id: 'admin',
      title: 'Store Admin Panel',
      name: 'Elena Rostova',
      subtitle: 'Operations & Inventory Director',
      description: 'Comprehensive business KPIs, sales charts, product CRUD (add/edit medicines), inventory control, and system reports.',
      icon: <FaUserShield size={22} />,
      dashboardUrl: '/admin-dashboard',
      color: '#2980B9'
    },
    {
      id: 'super_admin',
      title: 'Super Admin Portal',
      name: 'Chief Admin (Super Admin)',
      subtitle: 'System & Platform Executive',
      description: 'Full system privileges: Staff access control, commission rates, security logs, platform settings & master financial audit.',
      icon: <FaCrown size={22} />,
      dashboardUrl: '/super-admin-dashboard',
      color: '#8E44AD'
    }
  ];

  const handleSelectRole = (roleId, url) => {
    switchRole(roleId);
    onClose();
    navigate(url);
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1100 }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg">
          
          <div className="modal-header border-bottom py-3">
            <div>
              <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
                <span>Demo Role & Persona Switcher</span>
              </h5>
              <p className="text-secondary mb-0" style={{ fontSize: '13px' }}>
                Select any perspective below to immediately preview and test that dedicated workflow.
              </p>
            </div>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4">
            <div className="row g-3">
              {roles.map((r) => {
                const isSelected = currentRole === r.id;
                return (
                  <div key={r.id} className="col-md-6">
                    <div 
                      onClick={() => handleSelectRole(r.id, r.dashboardUrl)}
                      className="p-3 rounded-3 border h-100 cursor-pointer transition-all position-relative"
                      style={{ 
                        backgroundColor: isSelected ? '#EAF7F0' : '#FFFFFF',
                        borderColor: isSelected ? '#159B64' : '#E5ECE8',
                        boxShadow: isSelected ? '0 4px 14px rgba(21,155,100,0.15)' : 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <div className="d-flex align-items-start justify-content-between mb-2">
                        <div className="d-flex align-items-center gap-3">
                          <div 
                            className="rounded-circle p-2 text-white d-flex align-items-center justify-content-center"
                            style={{ backgroundColor: r.color, width: '42px', height: '42px' }}
                          >
                            {r.icon}
                          </div>
                          <div>
                            <h6 className="mb-0 fw-bold text-dark">{r.title}</h6>
                            <span className="text-secondary" style={{ fontSize: '12px' }}>{r.name}</span>
                          </div>
                        </div>

                        {isSelected && (
                          <span className="badge bg-success d-flex align-items-center gap-1">
                            <FaCheckCircle size={11} /> Active
                          </span>
                        )}
                      </div>

                      <p className="text-secondary mb-3" style={{ fontSize: '12px', lineHeight: 1.5 }}>
                        {r.description}
                      </p>

                      <div className="d-flex align-items-center justify-content-between pt-2 border-top">
                        <span className="fw-semibold" style={{ fontSize: '12px', color: r.color }}>
                          {r.subtitle}
                        </span>
                        <button 
                          className={`btn btn-sm ${isSelected ? 'btn-success' : 'btn-outline-secondary'} py-1 px-3`}
                          style={{ fontSize: '12px' }}
                        >
                          {isSelected ? 'Open View' : 'Switch Role'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="modal-footer bg-light py-2 px-4 justify-content-between">
            <span className="text-secondary" style={{ fontSize: '12px' }}>
              All actions update live in browser memory and localStorage.
            </span>
            <button className="btn btn-sm btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
