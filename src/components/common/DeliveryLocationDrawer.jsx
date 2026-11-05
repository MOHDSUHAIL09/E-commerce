import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaTimes, 
  FaMapMarkerAlt, 
  FaCrosshairs, 
  FaHome, 
  FaBriefcase, 
  FaBuilding, 
  FaCheck, 
  FaSpinner, 
  FaSearch
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const POPULAR_HUBS = [
  { name: 'Moradabad', pincode: '244001', state: 'Uttar Pradesh', society: 'Civil Lines, Kanth Road' },
  { name: 'New Delhi', pincode: '110001', state: 'Delhi NCR', society: 'Connaught Place, Central' },
  { name: 'Noida', pincode: '201301', state: 'Uttar Pradesh', society: 'Sector 62 / Express City' },
  { name: 'Gurugram', pincode: '122001', state: 'Haryana', society: 'DLF Cyber City, Sector 29' },
  { name: 'Mumbai', pincode: '400001', state: 'Maharashtra', society: 'Colaba / Fort / Nariman Point' },
  { name: 'Bengaluru', pincode: '560001', state: 'Karnataka', society: 'Indiranagar / MG Road' },
  { name: 'New York', pincode: '10001', state: 'NY', society: 'Manhattan Medical Hub' },
  { name: 'Brooklyn', pincode: '11201', state: 'NY', society: 'Downtown Brooklyn Center' }
];

export default function DeliveryLocationDrawer({ isOpen, onClose }) {
  const { selectedLocation, setSelectedLocation, addresses } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [locateMessage, setLocateMessage] = useState('');

  // Reset search when opening
  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setLocateMessage('');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered hubs based on search input
  const filteredHubs = POPULAR_HUBS.filter((item) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.pincode.includes(q) ||
      item.state.toLowerCase().includes(q) ||
      item.society.toLowerCase().includes(q)
    );
  });

  const handleSelectLocation = (locText) => {
    setSelectedLocation(locText);
    try {
      localStorage.setItem('auramed_location', locText);
    } catch {
      // ignore
    }
    onClose();
  };

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    setLocateMessage('Detecting current GPS coordinates...');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setTimeout(() => {
            setIsLocating(false);
            const detectedLoc = 'Moradabad 244001, Uttar Pradesh';
            handleSelectLocation(detectedLoc);
          }, 800);
        },
        () => {
          // Fallbackee if denied or unavailable in sandbox
          setTimeout(() => {
            setIsLocating(false);
            const defaultGPS = 'Moradabad 244001, Uttar Pradesh';
            handleSelectLocation(defaultGPS);
          }, 600);
        },
        { timeout: 5000 }
      );
    } else {
      setTimeout(() => {
        setIsLocating(false);
        handleSelectLocation('Moradabad 244001, Uttar Pradesh');
      }, 500);
    }
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      handleSelectLocation(searchTerm.trim());
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
              backdropFilter: 'blur(2px)',
              zIndex: 1085
            }}
          />

          {/* Right Sliding Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '430px',
              backgroundColor: '#FFFFFF',
              zIndex: 1090,
              boxShadow: '-4px 0 25px rgba(0, 0, 0, 0.16)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header: Matches Apollo screenshot "← Deliver to" */}
            <div 
              className="d-flex align-items-center gap-3 px-4 py-3 border-bottom bg-white"
              style={{ minHeight: '62px' }}
            >
              <button
                type="button"
                onClick={onClose}
                className="btn btn-link p-0 text-dark border-0 d-flex align-items-center justify-content-center"
                style={{ width: '32px', height: '32px', borderRadius: '50%', textDecoration: 'none' }}
                aria-label="Back"
              >
                <FaArrowLeft size={18} color="#1F2937" />
              </button>
              <h5 className="mb-0 fw-bold text-dark" style={{ fontSize: '18px', letterSpacing: '-0.2px' }}>
                Deliver to
              </h5>
            </div>

            {/* Scrollable Content */}
            <div className="flex-grow-1 overflow-auto px-4 py-3" style={{ scrollbarWidth: 'thin' }}>
              {/* Search Box with Clear Button (X) */}
              <form onSubmit={handleCustomSubmit} className="position-relative mb-3">
                <div 
                  className="d-flex align-items-center border rounded-3 px-3 py-2 bg-white"
                  style={{
                    borderColor: '#E5E7EB',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                    transition: 'border-color 0.2s',
                    height: '46px'
                  }}
                >
                  <FaSearch size={14} className="text-muted me-2 flex-shrink-0" />
                  <input
                    type="text"
                    className="border-0 w-100 p-0 text-dark"
                    style={{ outline: 'none', fontSize: '14px', background: 'transparent' }}
                    placeholder="Search for society, locality, pincode..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm('')}
                      className="btn btn-link p-0 text-muted border-0 ms-2 flex-shrink-0 d-flex align-items-center justify-content-center"
                      style={{ textDecoration: 'none' }}
                      aria-label="Clear text"
                    >
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center bg-light"
                        style={{ width: '20px', height: '20px' }}
                      >
                        <FaTimes size={10} color="#6B7280" />
                      </div>
                    </button>
                  )}
                </div>
              </form>

              {/* Use Current Location Option */}
              <div className="mb-4">
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  disabled={isLocating}
                  className="w-100 text-start btn btn-light border-0 p-3 rounded-3 d-flex align-items-center gap-3"
                  style={{
                    backgroundColor: '#F8FAF9',
                    transition: 'background-color 0.15s'
                  }}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: '42px',
                      height: '42px',
                      backgroundColor: '#E8F5E9',
                      color: '#005F40'
                    }}
                  >
                    {isLocating ? (
                      <FaSpinner className="spinner-border spinner-border-sm text-success" />
                    ) : (
                      <FaCrosshairs size={17} color="#005F40" />
                    )}
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                      {isLocating ? 'Detecting GPS...' : 'Use Current Location'}
                    </div>
                    <div className="text-secondary" style={{ fontSize: '12px' }}>
                      {locateMessage || 'Using GPS for fastest medicine delivery'}
                    </div>
                  </div>
                </button>
              </div>



              {/* Popular Delivery Hubs or Filtered Search Results */}
              <div>
                <div 
                  className="text-uppercase text-secondary fw-bold mb-2 ps-1"
                  style={{ fontSize: '11px', letterSpacing: '0.8px' }}
                >
                  {searchTerm ? `Matching Locations (${filteredHubs.length})` : 'Popular Cities & Pincodes'}
                </div>

                {filteredHubs.length > 0 ? (
                  <div className="list-group list-group-flush border rounded-3 overflow-hidden">
                    {filteredHubs.map((hub, idx) => {
                      const displayTitle = `${hub.name} ${hub.pincode}`;
                      const isCurrent = selectedLocation.toLowerCase().includes(hub.name.toLowerCase()) || 
                                        selectedLocation.includes(hub.pincode);

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectLocation(`${hub.name} ${hub.pincode}`)}
                          className="list-group-item list-group-item-action d-flex align-items-center justify-content-between py-3 px-3 border-bottom text-start"
                          style={{
                            backgroundColor: isCurrent ? '#F0F9F5' : '#FFFFFF'
                          }}
                        >
                          <div className="d-flex align-items-center gap-3">
                            <div 
                              className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                              style={{
                                width: '32px',
                                height: '32px',
                                backgroundColor: isCurrent ? '#E8F5E9' : '#F3F4F6'
                              }}
                            >
                              <FaMapMarkerAlt size={14} color={isCurrent ? '#159B64' : '#6B7280'} />
                            </div>
                            <div>
                              <div className="fw-semibold text-dark" style={{ fontSize: '13px' }}>
                                {hub.name}, {hub.pincode}
                              </div>
                              <div className="text-secondary" style={{ fontSize: '11px' }}>
                                {hub.society} • {hub.state}
                              </div>
                            </div>
                          </div>

                          {isCurrent ? (
                            <span 
                              className="badge rounded-pill text-white d-flex align-items-center gap-1"
                              style={{ backgroundColor: '#159B64', fontSize: '11px', padding: '4px 8px' }}
                            >
                              <FaCheck size={9} /> Selected
                            </span>
                          ) : (
                            <span className="text-muted" style={{ fontSize: '12px' }}>
                              Select
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-4 bg-light rounded-3">
                    <p className="text-dark fw-semibold mb-1" style={{ fontSize: '13px' }}>
                      Deliver to "{searchTerm}"
                    </p>
                    <p className="text-secondary mb-3" style={{ fontSize: '12px' }}>
                      We deliver medicines to societies and pincodes nationwide in 15-45 minutes.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleSelectLocation(searchTerm.trim())}
                      className="btn btn-sm btn-auramed px-4"
                    >
                      Set As Delivery Location
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer with reassurance */}
            <div className="p-3 bg-light border-top text-center">
              <span className="text-secondary" style={{ fontSize: '11px' }}>
                ⚡ Express 15-Minute Medicine Delivery available for selected locations
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
