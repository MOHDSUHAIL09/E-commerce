import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaTimes, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function LoginDrawer({ isOpen, onClose }) {
  const { login } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [whatsappConsent, setWhatsappConsent] = useState(true);
  const [step, setStep] = useState('phone'); // 'phone' | 'otp' | 'success'
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.trim().length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    // Simulate instant SMS OTP delivery
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 600);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
      login('customer');
      setTimeout(() => {
        setStep('phone');
        setPhoneNumber('');
        setOtp(['', '', '', '']);
        onClose();
      }, 1200);
    }, 700);
  };

  const handleOtpChange = (val, index) => {
    const clean = val.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = clean.slice(-1);
    setOtp(newOtp);

    // Auto advance focus
    if (clean && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
              backdropFilter: 'blur(3px)',
              zIndex: 1085
            }}
          />

          {/* Right Sliding Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '440px',
              backgroundColor: '#FFFFFF',
              zIndex: 1090,
              boxShadow: '-8px 0 25px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Toppp Navigation Bar: Back & Close buttons (matches image_e05563f0) */}
            <div className="p-3 d-flex align-items-center justify-content-between border-bottom">
              <button
                type="button"
                onClick={step === 'otp' ? () => setStep('phone') : onClose}
                className="btn btn-sm btn-light border-0 rounded-circle p-2 d-flex align-items-center justify-content-center"
                aria-label="Back"
                style={{ width: '38px', height: '38px', color: '#005F40' }}
              >
                <FaArrowLeft size={16} />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="btn btn-sm btn-light border-0 rounded-circle p-2 d-flex align-items-center justify-content-center"
                aria-label="Close"
                style={{ width: '38px', height: '38px', color: '#111827' }}
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Main Drawer Body */}
            <div className="p-4 p-md-5 flex-grow-1 overflow-y-auto d-flex flex-column justify-content-between">
              
              {/* Step 1: Phone Entry (Exact matches image_e05563f0) */}
              {step === 'phone' && (
                <div>
                  <h2 className="fw-bold mb-4" style={{ fontSize: '26px', color: '#111827', letterSpacing: '-0.3px' }}>
                    Sign In
                  </h2>

                  <form onSubmit={handlePhoneSubmit}>
                    <div className="mb-2">
                      <label className="form-label fw-bold mb-2 text-dark" style={{ fontSize: '14px' }}>
                        Phone Number
                      </label>

                      {/* Phone Input Box with +91 Prefix */}
                      <div 
                        className="d-flex align-items-center rounded-3 p-2 bg-white"
                        style={{ 
                          border: '1.5px solid #005F40',
                          height: '52px'
                        }}
                      >
                        <span className="fw-bold px-2 text-dark" style={{ fontSize: '15px' }}>
                          +91
                        </span>
                        <span className="text-muted mx-1 opacity-50" style={{ fontSize: '18px' }}>|</span>
                        <input
                          type="tel"
                          maxLength={10}
                          className="form-control border-0 p-0 shadow-none text-dark fw-semibold"
                          style={{ fontSize: '16px', letterSpacing: '0.5px' }}
                          placeholder="Enter 10-digit mobile number"
                          value={phoneNumber}
                          onChange={(e) => {
                            setErrorMsg('');
                            setPhoneNumber(e.target.value.replace(/\D/g, ''));
                          }}
                          autoFocus
                          required
                        />
                      </div>
                    </div>

                    {/* Helper note */}
                    <div className="text-secondary mb-4" style={{ fontSize: '13px' }}>
                      OTP will be sent to this number by SMS
                    </div>

                    {errorMsg && (
                      <div className="alert alert-danger py-2 px-3 mb-3" style={{ fontSize: '12px' }}>
                        {errorMsg}
                      </div>
                    )}

                    {/* WhatsApp Consent Checkbox (matches image_e05563f0) */}
                    <div className="form-check d-flex align-items-start gap-2 mb-4">
                      <input
                        className="form-check-input mt-1 flex-shrink-0"
                        type="checkbox"
                        id="whatsappCheck"
                        checked={whatsappConsent}
                        onChange={(e) => setWhatsappConsent(e.target.checked)}
                        style={{ cursor: 'pointer', borderColor: '#005F40' }}
                      />
                      <label 
                        className="form-check-label text-dark" 
                        htmlFor="whatsappCheck" 
                        style={{ fontSize: '13px', lineHeight: 1.4, cursor: 'pointer' }}
                      >
                        Share health tips, appointment details and offers with me on Whatsapp
                      </label>
                    </div>

                    {/* Legal Notice (matches image_e05563f0) */}
                    <div className="text-secondary mb-4" style={{ fontSize: '12px', lineHeight: 1.5 }}>
                      By clicking Continue, you agree to AuraMed's{' '}
                      <span className="fw-bold" style={{ color: '#005F40', cursor: 'pointer' }}>Privacy Policy</span> &amp;{' '}
                      <span className="fw-bold" style={{ color: '#005F40', cursor: 'pointer' }}>Terms and Conditions</span>
                    </div>

                    {/* Continue Button (matches image_e05563f0) */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn w-100 text-white fw-bold py-3 rounded-3 shadow-xs d-flex align-items-center justify-content-center gap-2"
                      style={{
                        backgroundColor: '#005F40',
                        fontSize: '16px',
                        border: 'none',
                        transition: 'opacity 0.2s ease',
                        opacity: isLoading ? 0.8 : 1
                      }}
                    >
                      {isLoading ? (
                        <>
                          <FaSpinner className="spinner-border spinner-border-sm text-white" />
                          <span>Sending OTP...</span>
                        </>
                      ) : (
                        <span>Continue</span>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* Step 2: OTP Verification */}
              {step === 'otp' && (
                <div>
                  <h2 className="fw-bold mb-2" style={{ fontSize: '26px', color: '#111827' }}>
                    Verify OTP
                  </h2>
                  <p className="text-secondary mb-4" style={{ fontSize: '14px' }}>
                    Enter 4-digit code sent to <strong className="text-dark">+91 {phoneNumber}</strong>
                  </p>

                  <form onSubmit={handleOtpSubmit}>
                    <div className="d-flex justify-content-between gap-2 mb-4">
                      {[0, 1, 2, 3].map((idx) => (
                        <input
                          key={idx}
                          id={`otp-input-${idx}`}
                          type="text"
                          maxLength={1}
                          className="form-control text-center fw-bold text-dark fs-3"
                          style={{
                            height: '56px',
                            border: '1.5px solid #005F40',
                            borderRadius: '8px'
                          }}
                          value={otp[idx]}
                          onChange={(e) => handleOtpChange(e.target.value, idx)}
                          autoFocus={idx === 0}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setOtp(['1', '2', '3', '4'])}
                      className="btn btn-sm btn-link text-decoration-none p-0 mb-4"
                      style={{ color: '#005F40', fontSize: '13px' }}
                    >
                      Autofill demo OTP (1234)
                    </button>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn w-100 text-white fw-bold py-3 rounded-3 shadow-xs d-flex align-items-center justify-content-center gap-2"
                      style={{ backgroundColor: '#005F40', fontSize: '16px' }}
                    >
                      {isLoading ? (
                        <>
                          <FaSpinner className="spinner-border spinner-border-sm text-white" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <span>Verify &amp; Continue</span>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* Step 3: Success Confirmation */}
              {step === 'success' && (
                <div className="text-center py-5">
                  <div 
                    className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center text-white shadow-sm"
                    style={{ width: '64px', height: '64px', backgroundColor: '#159B64' }}
                  >
                    <FaCheckCircle size={36} />
                  </div>
                  <h3 className="fw-bold text-dark mb-2">Welcome to AuraMed!</h3>
                  <p className="text-secondary" style={{ fontSize: '14px' }}>
                    You have successfully signed in. Loading your health records...
                  </p>
                </div>
              )}

              {/* Bottom Link: Corporate Account (matches image_e05563f0) */}
              <div className="pt-4 text-start border-top mt-4" style={{ fontSize: '14px' }}>
                <span className="text-dark">Login to your corporate account </span>
                <span 
                  onClick={() => {
                    login('pharmacist');
                    onClose();
                  }}
                  className="fw-semibold text-decoration-underline cursor-pointer"
                  style={{ color: '#005F40', cursor: 'pointer' }}
                >
                  here
                </span>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
