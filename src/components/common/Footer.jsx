import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaShieldAlt, FaTruck, FaClock, FaPhoneAlt, FaEnvelope, 
  FaMapMarkerAlt, FaApple, FaGooglePlay, FaCheck, FaLock,
  FaFileContract, FaAward
} from 'react-icons/fa';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="footer-auramed">
      {/* Top Value Propositions */}
      <div className="container-xl pb-4 border-bottom border-secondary border-opacity-25 mb-4">
        <div className="row g-4 text-white">
          <div className="col-6 col-md-3 d-flex align-items-center gap-3">
            <div className="rounded-circle p-3 bg-success bg-opacity-25 text-white">
              <FaShieldAlt size={24} />
            </div>
            <div>
              <div className="fw-bold" style={{ fontSize: '15px' }}>100% Genuine</div>
              <small className="text-white-50" style={{ fontSize: '12px' }}>Direct from verified labs</small>
            </div>
          </div>

          <div className="col-6 col-md-3 d-flex align-items-center gap-3">
            <div className="rounded-circle p-3 bg-success bg-opacity-25 text-white">
              <FaTruck size={24} />
            </div>
            <div>
              <div className="fw-bold" style={{ fontSize: '15px' }}>Fast Express</div>
              <small className="text-white-50" style={{ fontSize: '12px' }}>Rapid delivery in city hubs</small>
            </div>
          </div>

          <div className="col-6 col-md-3 d-flex align-items-center gap-3">
            <div className="rounded-circle p-3 bg-success bg-opacity-25 text-white">
              <FaAward size={24} />
            </div>
            <div>
              <div className="fw-bold" style={{ fontSize: '15px' }}>Certified Doctors</div>
              <small className="text-white-50" style={{ fontSize: '12px' }}>Board certified specialists</small>
            </div>
          </div>

          <div className="col-6 col-md-3 d-flex align-items-center gap-3">
            <div className="rounded-circle p-3 bg-success bg-opacity-25 text-white">
              <FaLock size={24} />
            </div>
            <div>
              <div className="fw-bold" style={{ fontSize: '15px' }}>Secure Pharmacy</div>
              <small className="text-white-50" style={{ fontSize: '12px' }}>HIPAA & PCI DSS Compliant</small>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container-xl">
        <div className="row g-4">
          
          {/* Brand Info */}
          <div className="col-lg-3 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <img 
                src="/assets/cureon_logo_trimmed.png" 
                alt="CUREON" 
                style={{ height: '42px', width: 'auto', objectFit: 'contain', background: '#FFFFFF', borderRadius: '6px', padding: '3px 8px' }} 
              />
            </div>
            <p className="text-light text-opacity-75 mb-3" style={{ fontSize: '13px', lineHeight: 1.6 }}>
              CureOn is a licensed digital healthcare dispensary. We connect patients with genuine pharmaceuticals, diagnostic pathology, and licensed specialist consultations.
            </p>
            <div className="text-light text-opacity-75 mb-1 d-flex align-items-center gap-2" style={{ fontSize: '13px' }}>
              <FaMapMarkerAlt color="#159B64" /> 742 Evergreen Healthcare Blvd, New York, NY
            </div>
            <div className="text-light text-opacity-75 d-flex align-items-center gap-2" style={{ fontSize: '13px' }}>
              <FaPhoneAlt color="#159B64" /> 1-800-AURAMED (Toll Free 24/7)
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold text-white mb-3 text-uppercase" style={{ fontSize: '13px', letterSpacing: '0.8px' }}>
              Healthcare Services
            </h6>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-2" style={{ fontSize: '13px' }}>
              <li><Link to="/products">All Medicines</Link></li>
              <li><Link to="/prescription">Prescription Upload</Link></li>
              <li><Link to="/doctors">Find Doctors</Link></li>
              <li><Link to="/lab-tests">Diagnostic Lab Tests</Link></li>
              <li><Link to="/categories">Categories Index</Link></li>
              <li><Link to="/compare">Compare Products</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold text-white mb-3 text-uppercase" style={{ fontSize: '13px', letterSpacing: '0.8px' }}>
              Top Categories
            </h6>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-2" style={{ fontSize: '13px' }}>
              <li><Link to="/categories/diabetes-care">Diabetes Care</Link></li>
              <li><Link to="/categories/cardiac-care">Cardiac Support</Link></li>
              <li><Link to="/categories/vitamins-supplements">Vitamins & Zinc</Link></li>
              <li><Link to="/categories/ayurvedic-medicines">Ayurvedic Remedies</Link></li>
              <li><Link to="/categories/skin-care">Dermatology</Link></li>
              <li><Link to="/categories/medical-devices">Medical Devices</Link></li>
            </ul>
          </div>

          {/* Portals & Dashboards */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold text-white mb-3 text-uppercase" style={{ fontSize: '13px', letterSpacing: '0.8px' }}>
              Account & Portals
            </h6>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-2" style={{ fontSize: '13px' }}>
              <li><Link to="/customer-dashboard">Customer Dashboard</Link></li>
              <li><Link to="/admin-dashboard">Admin Management</Link></li>
              <li><Link to="/pharmacist-dashboard">Pharmacist Portal</Link></li>
              <li><Link to="/delivery-dashboard">Delivery Partner Hub</Link></li>
              <li><Link to="/cart">Cart & Checkout</Link></li>
              <li><Link to="/wishlist">Saved Wishlist</Link></li>
            </ul>
          </div>

          {/* App Download & Newsletter */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-white mb-3 text-uppercase" style={{ fontSize: '13px', letterSpacing: '0.8px' }}>
              Get Health Updates
            </h6>
            <p className="text-light text-opacity-75 mb-2" style={{ fontSize: '12px' }}>
              Subscribe for wellness tips, dosage reminders, and exclusive promo codes.
            </p>
            <form onSubmit={handleSubscribe} className="mb-3">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control form-control-sm"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-sm btn-success">
                  Subscribe
                </button>
              </div>
              {subscribed && (
                <div className="text-success mt-1 d-flex align-items-center gap-1" style={{ fontSize: '12px' }}>
                  <FaCheck /> Subscribed successfully!
                </div>
              )}
            </form>

            <div className="fw-bold text-white mb-2" style={{ fontSize: '12px' }}>Download AuraMed Mobile App</div>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-outline-light d-flex align-items-center gap-2 px-2 py-1" style={{ fontSize: '11px' }}>
                <FaApple size={16} /> App Store
              </button>
              <button className="btn btn-sm btn-outline-light d-flex align-items-center gap-2 px-2 py-1" style={{ fontSize: '11px' }}>
                <FaGooglePlay size={15} /> Google Play
              </button>
            </div>
          </div>

        </div>

        {/* Medical Regulatory Disclaimer */}
        <div className="mt-4 pt-3 border-top border-secondary border-opacity-25" style={{ fontSize: '11px', color: '#8CA699', lineHeight: 1.5 }}>
          <strong>Medical Notice & Regulatory Compliance:</strong> The contents on AuraMed including text, graphics, images, and other materials are for informational purposes only and not intended as substitute for professional medical advice, diagnosis, or treatment. Always seek the counsel of your qualified physician with any questions regarding a medical condition. Prescription medicines are dispensed solely upon verification by a registered pharmacist against a valid medical practitioner prescription.
        </div>

        {/* Bottom copyright & rights */}
        <div className="footer-bottom d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div>
            © 2026 AuraMed Healthcare Systems Inc. All rights reserved.
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className="text-white-50">Privacy Policy</span>
            <span className="text-white-50">•</span>
            <span className="text-white-50">Terms of Service</span>
            <span className="text-white-50">•</span>
            <span className="text-white-50">FDA Grievance Redressal</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
