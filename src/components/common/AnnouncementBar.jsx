import React from 'react';
import { FaShieldAlt, FaTruck, FaPhoneAlt, FaUserCog } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function AnnouncementBar({ onOpenRoleModal }) {
  const { currentRole, currentUser } = useAuth();

  return (
    <div className="top-bar d-none d-md-block">
      <div className="container-xl">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
          {/* Left: Perks */}
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <span className="d-inline-flex align-items-center gap-1">
              <FaShieldAlt className="text-warning" /> 100% Genuine Medicines & ISO Certified Labs
            </span>
            <span className="d-none d-md-inline-block text-white-50">|</span>
            <span className="d-none d-md-inline-flex align-items-center gap-1">
              <FaTruck /> Free Express Delivery on orders over ₹499
            </span>
          </div>

          {/* Right: Hotline */}
          <div className="d-flex align-items-center gap-3">
            <a href="tel:+18002872633" className="text-white text-decoration-none d-inline-flex align-items-center gap-1" style={{ fontSize: '12px' }}>
              <FaPhoneAlt size={11} /> 24/7 Pharmacist Helpline: <strong>1-800-CUREON</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
