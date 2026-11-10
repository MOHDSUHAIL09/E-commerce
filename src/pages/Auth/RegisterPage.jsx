import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaShieldAlt, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { switchRole, login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    agreed: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login('customer');
    navigate('/Profile');
  };

  return (
    <div className="py-5" style={{ backgroundColor: '#F0F7F3', minHeight: '80vh' }}>
      <div className="container-xl">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-5">
            <div className="card-auramed p-4 p-md-5 shadow-md">
              
              <div className="text-center mb-4">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center text-white mx-auto mb-2" 
                  style={{ width: '48px', height: '48px', backgroundColor: '#159B64' }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <rect x="10" y="3" width="4" height="18" rx="2" fill="white"/>
                    <rect x="3" y="10" width="18" height="4" rx="2" fill="white"/>
                  </svg>
                </div>
                <h4 className="fw-bold text-dark">Create AuraMed Account</h4>
                <p className="text-secondary" style={{ fontSize: '13px' }}>
                  Join over 500,000 patients enjoying doorstep medications and diagnostic care.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <FaUser color="#64756D" size={13} />
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0"
                      placeholder="e.g. Sarah Jenkins"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <FaEnvelope color="#64756D" size={13} />
                    </span>
                    <input
                      type="email"
                      className="form-control border-start-0"
                      placeholder="name@example.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Mobile Phone</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <FaPhone color="#64756D" size={13} />
                    </span>
                    <input
                      type="tel"
                      className="form-control border-start-0"
                      placeholder="+1 (555) 000-0000"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Create Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <FaLock color="#64756D" size={13} />
                    </span>
                    <input
                      type="password"
                      className="form-control border-start-0"
                      placeholder="Minimum 8 characters"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="terms"
                    checked={formData.agreed}
                    onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                    required
                  />
                  <label className="form-check-label text-secondary" htmlFor="terms" style={{ fontSize: '12px' }}>
                    I agree to AuraMed Health Terms of Service & Privacy Policy
                  </label>
                </div>

                <button type="submit" className="btn btn-auramed w-100 py-2">
                  Create Account <FaArrowRight size={12} className="ms-1" />
                </button>
              </form>

              <div className="text-center mt-4 text-secondary" style={{ fontSize: '13px' }}>
                Already registered? <Link to="/login" className="text-primary-green fw-bold">Sign In</Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
