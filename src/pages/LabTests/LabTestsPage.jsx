import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, FaCheckCircle, FaCalendarAlt, 
  FaClock, FaHome, FaFilter, FaSort, 
  FaUser, FaMapMarkerAlt, FaTimes, FaChevronDown
} from 'react-icons/fa';
import { useHealthcare } from '../../hooks/useHealthcare';
import { useAuth } from '../../hooks/useAuth';

export const LAB_TESTS = [
  {
    id: 'lab-1',
    title: 'CBC Test (Complete Blood Count)',
    category: 'Blood Tests',
    parameters: 30,
    price: 409,
    mrp: 1024,
    discount: 60,
    image: 'https://cdn-icons-png.flaticon.com/512/2864/2864298.png',
    isTopDeal: true,
    fasting: '10-12 Hours Fasting',
    turnaround: '12-24 Hours'
  },
  {
    id: 'lab-2',
    title: 'HbA1c Test (Hemoglobin A1c)',
    category: 'Diabetes Tests',
    parameters: 3,
    price: 519,
    mrp: 1299,
    discount: 60,
    image: 'https://cdn-icons-png.flaticon.com/512/2864/2864298.png',
    isTopDeal: false,
    fasting: 'No Fasting Required',
    turnaround: '12 Hours'
  },
  {
    id: 'lab-3',
    title: 'Lipid Profile Test',
    category: 'Blood Tests',
    parameters: 8,
    price: 939,
    mrp: 2349,
    discount: 60,
    image: 'https://cdn-icons-png.flaticon.com/512/2864/2864298.png',
    isTopDeal: false,
    fasting: '12 Hours Fasting',
    turnaround: '12 Hours'
  },
  {
    id: 'lab-4',
    title: 'LFT (Liver Function Test)',
    category: 'Liver Function Tests',
    parameters: 11,
    price: 889,
    mrp: 2229,
    discount: 60,
    image: 'https://cdn-icons-png.flaticon.com/512/2864/2864298.png',
    isTopDeal: false,
    fasting: '10 Hours Fasting',
    turnaround: '8 Hours'
  }
];

const FILTER_MUST_HAVE = [
  'CBC Test (Complete Blood Count)',
  'PPBS Test (Post-Prandial Blood Sugar)',
  'CRP Test (C - Reactive Protein)',
  'HIV Test',
  'Urine Routine Test',
  'Thyroid Profile (T3 T4 TSH) Test',
  'Lipid Profile Test',
  'LFT (Liver Function Test)',
  'FBS (Fasting Blood Sugar ) Test',
  'HbA1c Test (Hemoglobin A1c)'
];

const FILTER_CATEGORIES = [
  'Pregnancy Tests',
  'Hospital Health Check',
  'Blood Studies',
  'Allergy',
  'Tax Saver',
  'Bone and Joint',
  'Men\'s Health',
  'Fever and Infection',
  'Vitamin',
  'Fever'
];

export default function LabTestsPage() {
  const { bookLabTest } = useHealthcare();
  const { currentUser, addresses, selectedAddressId } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  
  // 👇 Sidebar State
  const [activeBookingTest, setActiveBookingTest] = useState(null);
  
  const [bookingDate, setBookingDate] = useState('2026-11-06');
  const [bookingSlot, setBookingSlot] = useState('08:00 AM - 09:00 AM');
  const [patientName, setPatientName] = useState(currentUser?.name || 'Alex Morgan');
  const [isHomeCollection, setIsHomeCollection] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const [showMoreMustHave, setShowMoreMustHave] = useState(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  let filteredTests = [...LAB_TESTS];

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filteredTests = filteredTests.filter(test => 
      test.title.toLowerCase().includes(q) || test.category.toLowerCase().includes(q)
    );
  }

  const slotsList = [
    '06:30 AM - 07:30 AM',
    '07:30 AM - 08:30 AM',
    '08:30 AM - 09:30 AM',
    '10:00 AM - 11:00 AM',
    '03:00 PM - 04:00 PM'
  ];

  const handleConfirmLabBooking = (e) => {
    e.preventDefault();
    const currentAddr = addresses.find(a => a.id === selectedAddressId) || addresses[0];
    const created = bookLabTest({
      testId: activeBookingTest.id,
      testName: activeBookingTest.title,
      price: activeBookingTest.price,
      date: bookingDate,
      slot: bookingSlot,
      patientName: patientName,
      homeCollection: isHomeCollection,
      collectionAddress: currentAddr ? `${currentAddr.addressLine}, ${currentAddr.city}` : 'Default Address'
    });

    setActiveBookingTest(null); // Close sidebar
    setBookingSuccess(created); // Show success alert
  };

  return (
    <div className="py-4 position-relative" style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', overflowX: 'hidden' }}>
      <div className="container-xl">
        
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb" style={{ fontSize: '13px' }}>
            <li className="breadcrumb-item"><Link to="/" className="text-secondary text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/lab-tests" className="text-secondary text-decoration-none">Lab Tests</Link></li>
            <li className="breadcrumb-item active text-dark fw-bold" aria-current="page">Top Booked Tests</li>
          </ol>
        </nav>

        {/* Success Alert */}
        {bookingSuccess && (
          <div className="alert alert-success d-flex align-items-center justify-content-between mb-4 p-3 rounded-3 shadow-sm">
            <div className="d-flex align-items-center gap-3">
              <FaCheckCircle size={28} className="text-success" />
              <div>
                <h6 className="fw-bold mb-1">Test Scheduled: {bookingSuccess.testName}</h6>
                <div style={{ fontSize: '13px' }}>
                  Booking ID: <strong>{bookingSuccess.id}</strong> • Visit: <strong>{bookingSuccess.date} ({bookingSuccess.slot})</strong>
                </div>
              </div>
            </div>
            <button onClick={() => setBookingSuccess(null)} className="btn btn-sm btn-outline-secondary">Dismiss</button>
          </div>
        )}

        <div className="row g-4">
          
          {/* LEFT SIDEBAR: FILTERS */}
          <div className="col-lg-3">
            <div className="bg-white border rounded-3 shadow-sm p-4 sticky-top" style={{ top: '90px', zIndex: 10 }}>
              <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                <FaFilter size={14} /> Filters
              </h6>
              
              <hr className="my-3 text-muted" />

              {/* Type of Tests */}
              <div className="mb-4">
                <h6 className="fw-bold text-dark mb-3" style={{ fontSize: '14px' }}>Type of Tests</h6>
                <div className="form-check mb-2">
                  <input className="form-check-input" type="checkbox" id="topDeals" />
                  <label className="form-check-label text-secondary" htmlFor="topDeals" style={{ fontSize: '13px' }}>Top Deals</label>
                </div>
              </div>

              <hr className="my-3 text-muted" />

              {/* Must Have Tests */}
              <div className="mb-4">
                <h6 className="fw-bold text-dark mb-3" style={{ fontSize: '14px' }}>Must Have Tests</h6>
                {(showMoreMustHave ? FILTER_MUST_HAVE : FILTER_MUST_HAVE.slice(0, 5)).map((item, idx) => (
                  <div className="form-check mb-2" key={idx}>
                    <input className="form-check-input" type="checkbox" id={`must-${idx}`} />
                    <label className="form-check-label text-secondary" htmlFor={`must-${idx}`} style={{ fontSize: '13px', lineHeight: 1.4 }}>{item}</label>
                  </div>
                ))}
                <button onClick={() => setShowMoreMustHave(!showMoreMustHave)} className="btn btn-link p-0 text-decoration-none fw-bold text-success" style={{ fontSize: '13px' }}>
                  {showMoreMustHave ? '- Show Less' : '+ 10 more'}
                </button>
              </div>

              <hr className="my-3 text-muted" />

              {/* Category */}
              <div className="mb-2">
                <h6 className="fw-bold text-dark mb-3" style={{ fontSize: '14px' }}>Category</h6>
                {(showMoreCategories ? FILTER_CATEGORIES : FILTER_CATEGORIES.slice(0, 5)).map((item, idx) => (
                  <div className="form-check mb-2" key={idx}>
                    <input className="form-check-input" type="checkbox" id={`cat-${idx}`} />
                    <label className="form-check-label text-secondary" htmlFor={`cat-${idx}`} style={{ fontSize: '13px', lineHeight: 1.4 }}>{item}</label>
                  </div>
                ))}
                <button onClick={() => setShowMoreCategories(!showMoreCategories)} className="btn btn-link p-0 text-decoration-none fw-bold text-success" style={{ fontSize: '13px' }}>
                  {showMoreCategories ? '- Show Less' : '+ 24 more'}
                </button>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE: CONTENT */}
          <div className="col-lg-9">
            
            {/* Top Header: Title & Sort Dropdown */}
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
              <h5 className="fw-bold text-dark mb-0">Top Booked Tests (44)</h5>
              
              <div className="d-flex align-items-center gap-3">
                <div className="input-group input-group-sm" style={{ width: '200px' }}>
                  <span className="input-group-text bg-white border-end-0"><FaSearch color="#64756D" /></span>
                  <input type="text" className="form-control border-start-0" placeholder="Search test..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
              </div>
            </div>

            {/* Tests Grid */}
            <div className="row g-3">
              {filteredTests.map((test) => (
                <div key={test.id} className="col-md-6 col-xl-4">
                  <div className="bg-white border rounded-3 p-3 h-100 d-flex flex-column shadow-sm position-relative">
                    
                    <div className="d-flex gap-3 mb-2">
                      <div className="bg-light rounded p-2 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', flexShrink: 0 }}>
                        <img src={test.image} alt={test.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                      </div>
                      <div>
                        <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '13px', lineHeight: 1.3 }}>{test.title}</h6>
                        <div className="text-secondary" style={{ fontSize: '11px' }}>{test.parameters} Tests Included</div>
                        
                        {test.isTopDeal && (
                          <span className="badge bg-warning text-dark mt-1" style={{ fontSize: '9px', padding: '2px 6px' }}>10-Hour Report Guarantee</span>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto pt-3 d-flex align-items-end justify-content-between">
                      <div>
                        <div className="fw-bold fs-5 text-dark" style={{ lineHeight: 1 }}>₹{test.price}</div>
                        <div className="d-flex align-items-center gap-1 mt-1" style={{ fontSize: '11px' }}>
                          <span className="text-secondary text-decoration-line-through">₹{test.mrp}</span>
                          <span className="text-success fw-bold">{test.discount}% off</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => setActiveBookingTest(test)}
                        className="btn btn-sm text-white fw-bold px-4 py-1 rounded-2"
                        style={{ backgroundColor: '#0A553E', fontSize: '13px' }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-5 gap-2">
              <button className="btn btn-sm btn-light border px-3">&lt;</button>
              <button className="btn btn-sm text-white px-3" style={{ backgroundColor: '#0A553E' }}>1</button>
              <button className="btn btn-sm btn-light border px-3">2</button>
              <button className="btn btn-sm btn-light border px-3">3</button>
              <button className="btn btn-sm btn-light border px-3">4</button>
              <button className="btn btn-sm btn-light border px-3">&gt;</button>
            </div>

          </div>
        </div>
      </div>

      {/* 👇 RIGHT SIDEBAR OVERLAY & CONTENT 👇 */}
      {activeBookingTest && (
        <>
          {/* Dark Background Overlay */}
          <div 
            className="position-fixed top-0 start-0 w-100 h-100" 
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050, transition: 'opacity 0.3s' }}
            onClick={() => setActiveBookingTest(null)}
          ></div>

          {/* Sidebar Drawer */}
          <div 
            className="position-fixed top-0 end-0 h-100 bg-white shadow-lg d-flex flex-column"
            style={{ 
              width: '420px', 
              maxWidth: '100%', 
              zIndex: 1060, 
              animation: 'slideInRight 0.3s ease-out forwards' 
            }}
          >
            {/* Custom CSS for Animation (Agar aapke global css me nahi hai) */}
            <style>{`
              @keyframes slideInRight {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
              }
            `}</style>

            {/* Header */}
            <div className="p-4 border-bottom d-flex justify-content-between align-items-start bg-light">
              <div>
                <h5 className="fw-bold mb-1">Book Diagnostic Test</h5>
                <small className="text-secondary">{activeBookingTest.title}</small>
              </div>
              <button type="button" className="btn btn-sm btn-light border rounded-circle p-2" onClick={() => setActiveBookingTest(null)}>
                <FaTimes size={14} />
              </button>
            </div>

            {/* Form Body */}
            <div className="p-4 flex-grow-1 overflow-auto">
              <form id="bookingForm" onSubmit={handleConfirmLabBooking}>
                <div className="mb-4">
                  <label className="form-label fw-bold text-dark mb-2" style={{ fontSize: '13px' }}>Patient Full Name</label>
                  <input type="text" className="form-control" required value={patientName} onChange={(e) => setPatientName(e.target.value)} />
                </div>

                <div className="mb-4">
                  <div className="form-check p-3 border rounded-2 bg-light">
                    <input type="checkbox" className="form-check-input ms-0 me-2" id="homeColl" checked={isHomeCollection} onChange={(e) => setIsHomeCollection(e.target.checked)} />
                    <label className="form-check-label text-success fw-bold" htmlFor="homeColl" style={{ fontSize: '13px' }}>
                      <FaHome className="me-1" /> Doorstep Home Sample Collection
                    </label>
                  </div>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-12">
                    <label className="form-label fw-bold text-dark mb-2" style={{ fontSize: '13px' }}>Preferred Date</label>
                    <input type="date" className="form-control" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold text-dark mb-2" style={{ fontSize: '13px' }}>Time Slot</label>
                    <select className="form-select" value={bookingSlot} onChange={(e) => setBookingSlot(e.target.value)}>
                      {slotsList.map((slot, i) => (
                        <option key={i} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-light rounded-2 text-secondary" style={{ fontSize: '12px' }}>
                  <strong>Fasting Prep:</strong> {activeBookingTest.fasting}. Do not consume calorie-dense beverages 10 hours prior to blood draw.
                </div>
              </form>
            </div>

            {/* Sticky Footer with Confirm Button */}
            <div className="p-4 border-top shadow-sm bg-white">
              <Link to="/payment">
              <button type="submit" form="bookingForm" className="btn btn-auramed w-100 py-3 fw-bold text-uppercase d-flex justify-content-between align-items-center">
                <span>Confirm Booking</span>
                <span>₹{activeBookingTest.price}</span>
              </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}