import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFlask, FaSearch, FaCheckCircle, FaCalendarAlt, 
  FaClock, FaHome, FaShieldAlt, FaFileMedicalAlt, 
  FaUser, FaMapMarkerAlt, FaTimes
} from 'react-icons/fa';
import { useHealthcare } from '../../hooks/useHealthcare';
import { useAuth } from '../../hooks/useAuth';
export const LAB_TESTS = [
  {
    id: 'lab-1',
    title: 'CureOn Comprehensive Full Body Health Checkup (84 Tests)',
    category: 'Full Body Checkup',
    parameters: 84,
    mrp: 90.00,
    price: 39.99,
    discount: 55,
    sampleType: 'Blood & Urine',
    fastingRequired: '10-12 Hours Fasting',
    turnaround: 'Report in 12-24 Hours',
    homeSampleCollection: true,
    isPopular: true,
    description: 'Our most comprehensive diagnostic screening covering Complete Hemogram, Lipid Profile, Liver Function, Kidney Function, Thyroid Profile, and Diabetes HbA1c.',
    includes: [
      'Complete Blood Count (CBC) with ESR (24 parameters)',
      'Lipid Profile (Cholesterol, HDL, LDL, Triglycerides)',
      'Liver Function Test (SGOT, SGPT, Bilirubin, Protein)',
      'Kidney Function Test (Urea, Creatinine, Uric Acid)',
      'Thyroid Profile (T3, T4, TSH Ultra-sensitive)',
      'HbA1c & Fasting Blood Sugar',
      'Urine Routine & Microscopic Examination'
    ]
  },
  {
    id: 'lab-2',
    title: 'Advanced Lipid & Cardiac Risk Profile',
    category: 'Blood Tests',
    parameters: 11,
    mrp: 45.00,
    price: 24.50,
    discount: 45,
    sampleType: 'Blood',
    fastingRequired: '12 Hours Fasting',
    turnaround: 'Report in 12 Hours',
    homeSampleCollection: true,
    isPopular: true,
    description: 'Detailed analysis of cardiovascular lipid biomarkers including ApoA1, ApoB, and hs-CRP for early heart risk detection.',
    includes: [
      'Total Cholesterol & Triglycerides',
      'HDL, LDL, VLDL Cholesterol',
      'Cholesterol / HDL Ratio',
      'High-Sensitivity C-Reactive Protein (hs-CRP)'
    ]
  },
  {
    id: 'lab-3',
    title: 'Comprehensive Diabetes & Insulin Resistance Panel',
    category: 'Diabetes Tests',
    parameters: 7,
    mrp: 38.00,
    price: 19.00,
    discount: 50,
    sampleType: 'Blood',
    fastingRequired: '10 Hours Fasting',
    turnaround: 'Report in 8 Hours',
    homeSampleCollection: true,
    isPopular: false,
    description: 'Evaluates long-term blood glucose control and pancreatic beta-cell sensitivity with automated HbA1c HPLC technology.',
    includes: [
      'Fasting Blood Glucose',
      'Post Prandial Glucose (2h)',
      'HbA1c Glycated Hemoglobin',
      'Estimated Average Glucose (eAG)',
      'Urine Microalbuminuria'
    ]
  },
  {
    id: 'lab-4',
    title: 'Complete Thyroid Hormone Panel (Free T3, Free T4, TSH)',
    category: 'Thyroid Tests',
    parameters: 3,
    mrp: 30.00,
    price: 16.50,
    discount: 45,
    sampleType: 'Blood',
    fastingRequired: 'No Fasting Required',
    turnaround: 'Report in 6 Hours',
    homeSampleCollection: true,
    isPopular: true,
    description: 'Accurate chemiluminescence immunoassay screening for hypothyroidism, hyperthyroidism, and endocrine balance.',
    includes: [
      'Total Triiodothyronine (T3)',
      'Total Thyroxine (T4)',
      'Thyroid Stimulating Hormone (TSH Ultrasensitive)'
    ]
  },
  {
    id: 'lab-5',
    title: 'Vitality Vitamin Duo: Vitamin D3 (25-OH) & Vitamin B12',
    category: 'Vitamin Tests',
    parameters: 2,
    mrp: 50.00,
    price: 28.00,
    discount: 44,
    sampleType: 'Blood',
    fastingRequired: 'No Fasting Required',
    turnaround: 'Report in 12 Hours',
    homeSampleCollection: true,
    isPopular: true,
    description: 'Detects hidden fatigue triggers, bone mineral density vulnerabilities, and nervous system vitamin deficiencies.',
    includes: [
      '25-Hydroxy Vitamin D Total',
      'Vitamin B12 Cyanocobalamin'
    ]
  },
  {
    id: 'lab-6',
    title: 'Renal & Kidney Function Comprehensive Screening',
    category: 'Kidney Function Tests',
    parameters: 12,
    mrp: 32.00,
    price: 18.00,
    discount: 44,
    sampleType: 'Blood & Urine',
    fastingRequired: 'Not Mandatory',
    turnaround: 'Report in 8 Hours',
    homeSampleCollection: true,
    isPopular: false,
    description: 'Monitors glomerular filtration rate, serum creatinine, blood urea nitrogen, and electrolyte equilibrium.',
    includes: [
      'Serum Creatinine & eGFR',
      'Blood Urea Nitrogen (BUN)',
      'Serum Uric Acid',
      'Electrolytes: Sodium, Potassium, Chloride'
    ]
  }
];

const LAB_CATEGORIES = [
  'All Diagnostics',
  'Full Body Checkup',
  'Blood Tests',
  'Diabetes Tests',
  'Thyroid Tests',
  'Vitamin Tests',
  'Liver Function Tests',
  'Kidney Function Tests'
];

export default function LabTestsPage() {
  const { labBookings, bookLabTest } = useHealthcare();
  const { currentUser, addresses, selectedAddressId } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Diagnostics');
  const [activeBookingTest, setActiveBookingTest] = useState(null);
  const [bookingDate, setBookingDate] = useState('2026-11-06');
  const [bookingSlot, setBookingSlot] = useState('08:00 AM - 09:00 AM');
  const [patientName, setPatientName] = useState(currentUser.name || 'Alex Morgan');
  const [isHomeCollection, setIsHomeCollection] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const filteredTests = LAB_TESTS.filter(test => {
    if (selectedCategory !== 'All Diagnostics' && test.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        test.title.toLowerCase().includes(q) ||
        test.description.toLowerCase().includes(q) ||
        test.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

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
      collectionAddress: currentAddr ? `${currentAddr.addressLine}, ${currentAddr.city}` : '742 Evergreen Terrace, Apt 4B, New York, NY 10001'
    });

    setActiveBookingTest(null);
    setBookingSuccess(created);
  };

  return (
    <div className="py-4">
      <div className="container-xl">
        
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb" style={{ fontSize: '13px' }}>
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Diagnostic Lab Tests</li>
          </ol>
        </nav>

        {/* Hero Banner */}
        <div 
          className="p-4 p-md-5 rounded-4 mb-4 text-white position-relative"
          style={{ background: 'linear-gradient(135deg, #08784B 0%, #159B64 100%)' }}
        >
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="badge bg-light text-dark fw-bold mb-2">ISO 15189 & NABL ACCREDITED LABS</span>
              <h2 className="display-6 fw-bold mb-2 text-white"> Lab Tests & Full Body Checkups</h2>
              <p className="lead text-white-50 mb-0" style={{ fontSize: '15px' }}>
                Complimentary doorstep phlebotomy with sterile vacuum tubes. Reports certified by Senior Pathologists generated in under 12 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Success Alert */}
        {bookingSuccess && (
          <div className="alert alert-success d-flex align-items-center justify-content-between mb-4 p-3 rounded-3 shadow-sm">
            <div className="d-flex align-items-center gap-3">
              <FaCheckCircle size={28} className="text-success" />
              <div>
                <h6 className="fw-bold mb-1">Diagnostic Test Scheduled: {bookingSuccess.testName}</h6>
                <div style={{ fontSize: '13px' }}>
                  Booking ID: <strong>{bookingSuccess.id}</strong> • Phlebotomist visit: <strong>{bookingSuccess.date} ({bookingSuccess.slot})</strong>
                </div>
              </div>
            </div>
            <div className="d-flex gap-2">
              <Link to="/customer-dashboard" className="btn btn-sm btn-success">
                View in Dashboard
              </Link>
              <button onClick={() => setBookingSuccess(null)} className="btn btn-sm btn-outline-secondary">
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Search & Categories Tabs */}
        <div className="card-auramed p-3 mb-4">
          <div className="row g-3 align-items-center">
            <div className="col-md-5">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <FaSearch color="#64756D" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search full body checkup, blood test, HbA1c, thyroid..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-7">
              <div className="d-flex align-items-center gap-2 overflow-auto py-1">
                {LAB_CATEGORIES.slice(0, 5).map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedCategory(cat)}
                    className={`btn btn-sm text-nowrap rounded-pill px-3 ${
                      selectedCategory === cat ? 'btn-auramed' : 'btn-light border'
                    }`}
                    style={{ fontSize: '12px' }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Lab Tests Grid */}
        <div className="row g-4">
          {filteredTests.map((test) => (
            <div key={test.id} className="col-lg-6">
              <div className="card-auramed p-4 h-100 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="badge bg-light-green text-dark-green fw-bold px-3 py-1">
                    {test.parameters} Parameters Screened
                  </span>
                  <span className="badge bg-danger text-white">{test.discount}% OFF</span>
                </div>

                <h5 className="fw-bold text-dark mb-2">{test.title}</h5>
                <p className="text-secondary mb-3" style={{ fontSize: '13px' }}>
                  {test.description}
                </p>

                {/* Parameters highlights */}
                <div className="p-3 bg-light rounded mb-3" style={{ fontSize: '12px' }}>
                  <div className="fw-semibold text-dark mb-2">Tests & Biomarkers Included:</div>
                  <ul className="list-unstyled mb-0 d-flex flex-column gap-1">
                    {test.includes.map((inc, idx) => (
                      <li key={idx} className="d-flex align-items-center gap-2 text-secondary">
                        <FaCheckCircle color="#159B64" size={11} /> {inc}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fasting & Report Time */}
                <div className="row g-2 text-secondary mb-3" style={{ fontSize: '12px' }}>
                  <div className="col-6 d-flex align-items-center gap-2">
                    <FaClock color="#159B64" /> <span>{test.turnaround}</span>
                  </div>
                  <div className="col-6 d-flex align-items-center gap-2">
                    <FaHome color="#159B64" /> <span>Free Home Collection</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="d-flex align-items-center justify-content-between pt-3 border-top mt-auto">
                  <div>
                    <span className="fs-4 fw-bold text-dark-green">₹{(test.price * 25).toFixed(0)}</span>
                    <span className="text-secondary text-decoration-line-through ms-2">
                      MRP ₹{(test.mrp * 25).toFixed(0)}
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveBookingTest(test)}
                    className="btn btn-auramed d-flex align-items-center gap-2"
                  >
                    <FaFlask size={13} /> Book Test Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Existing Bookings Table */}
        {labBookings.length > 0 && (
          <div className="card-auramed p-4 mt-5">
            <h5 className="fw-bold text-dark mb-3">Your Scheduled Lab Appointments</h5>
            <div className="table-responsive">
              <table className="table align-middle mb-0" style={{ fontSize: '13px' }}>
                <thead className="table-light">
                  <tr>
                    <th>BOOKING ID</th>
                    <th>PACKAGE NAME</th>
                    <th>PATIENT</th>
                    <th>DATE & SLOT</th>
                    <th>SAMPLE MODE</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {labBookings.map(b => (
                    <tr key={b.id}>
                      <td className="fw-bold text-primary-green">{b.id}</td>
                      <td className="fw-semibold text-dark">{b.testName}</td>
                      <td>{b.patientName}</td>
                      <td>{b.date} ({b.slot})</td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          <FaHome className="me-1 text-success" /> Home Collection
                        </span>
                      </td>
                      <td>
                        <span className="badge-status badge-status-approved">
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
    </div>
    {/* Booking Modal */}
      {activeBookingTest && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1100 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header">
                <div>
                  <h5 className="modal-title fw-bold mb-0">Book Diagnostic Test</h5>
                  <small className="text-secondary">{activeBookingTest.title}</small>
                </div>
                <button type="button" className="btn-close" onClick={() => setActiveBookingTest(null)}></button>
              </div>

              <form onSubmit={handleConfirmLabBooking}>
                <div className="modal-body p-4">
                  {/* Patient Name */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Patient Full Name</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                    />
                  </div>

                  {/* Sample Collection Mode */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Sample Collection Mode</label>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="homeColl"
                        checked={isHomeCollection}
                        onChange={(e) => setIsHomeCollection(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="homeColl" style={{ fontSize: '13px' }}>
                        Doorstep Home Sample Collection (Complimentary)
                      </label>
                    </div>
                  </div>

                  {/* Date Selector */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Select Preferred Date</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                    />
                  </div>

                  {/* Slot Selector */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Phlebotomist Slot</label>
                    <select
                      className="form-select form-select-sm"
                      value={bookingSlot}
                      onChange={(e) => setBookingSlot(e.target.value)}
                    >
                      {slotsList.map((slot, i) => (
                        <option key={i} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>

                  {/* Fasting Notice */}
                  <div className="p-3 bg-light rounded text-secondary" style={{ fontSize: '12px' }}>
                    <strong>Fasting Preparation:</strong> {activeBookingTest.fastingRequired}. Do not consume calorie-dense beverages 10 hours prior to blood draw.
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-sm btn-secondary" onClick={() => setActiveBookingTest(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-sm btn-auramed">
                    Confirm Booking (₹{(activeBookingTest.price * 25).toFixed(0)})
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
