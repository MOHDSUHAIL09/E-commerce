import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaShieldAlt, FaArrowRight, FaUserMd, FaShippingFast, FaUserShield } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { switchRole, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    login('customer');
    navigate('/customer-dashboard');
  };

  const handleQuickRole = (role, redirectPath) => {
    switchRole(role);
    navigate(redirectPath);
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
                <h4 className="fw-bold text-dark">Welcome back to AuraMed</h4>
                <p className="text-secondary" style={{ fontSize: '13px' }}>
                  Log in to manage prescriptions, doctor appointments, and orders.
                </p>
              </div>

              {/* Standard Login Form */}
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                  <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <FaUser color="#64756D" size={13} />
                    </span>
                    <input
                      type="email"
                      className="form-control border-start-0"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Password</label>
                    <a href="#forgot" className="text-primary-green" style={{ fontSize: '12px' }}>Forgot password?</a>
                  </div>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <FaLock color="#64756D" size={13} />
                    </span>
                    <input
                      type="password"
                      className="form-control border-start-0"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label className="form-check-label text-secondary" htmlFor="remember" style={{ fontSize: '13px' }}>
                    Keep me signed in on this device
                  </label>
                </div>

                <button type="submit" className="btn btn-auramed w-100 py-2">
                  Sign In <FaArrowRight size={12} className="ms-1" />
                </button>
              </form>

              {/* Quick 1-Click Role Switcher Demo Buttons */}
              <div className="pt-3 border-top">
                <div className="text-secondary text-uppercase text-center mb-2" style={{ fontSize: '11px', fontWeight: 600 }}>
                  Quick 1-Click Persona Demos
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <button
                      onClick={() => handleQuickRole('customer', '/customer-dashboard')}
                      className="btn btn-sm btn-outline-success w-100 d-flex align-items-center justify-content-center gap-1"
                      style={{ fontSize: '11px' }}
                    >
                      <FaUser size={10} /> Customer Alex
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      onClick={() => handleQuickRole('pharmacist', '/pharmacist-dashboard')}
                      className="btn btn-sm btn-outline-success w-100 d-flex align-items-center justify-content-center gap-1"
                      style={{ fontSize: '11px' }}
                    >
                      <FaUserMd size={10} /> Pharmacist Dr. Nathan
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      onClick={() => handleQuickRole('delivery', '/delivery-dashboard')}
                      className="btn btn-sm btn-outline-success w-100 d-flex align-items-center justify-content-center gap-1"
                      style={{ fontSize: '11px' }}
                    >
                      <FaShippingFast size={10} /> Courier Liam
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      onClick={() => handleQuickRole('admin', '/admin-dashboard')}
                      className="btn btn-sm btn-outline-success w-100 d-flex align-items-center justify-content-center gap-1"
                      style={{ fontSize: '11px' }}
                    >
                      <FaUserShield size={10} /> Admin Elena
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center mt-4 text-secondary" style={{ fontSize: '13px' }}>
                Don't have an account yet? <Link to="/register" className="text-primary-green fw-bold">Register here</Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
