import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUserMd, FaCheckCircle, FaTimesCircle, FaEye, 
  FaClipboardList, FaFileMedical, FaShieldAlt, FaHistory,
  FaPills, FaHospital, FaCheck
} from 'react-icons/fa';
import { useHealthcare } from '../../context/HealthcareContext';
import { useAuth } from '../../context/AuthContext';

export default function PharmacistDashboard() {
  const { prescriptions, updatePrescriptionStatus, orders } = useHealthcare();
  const { currentUser } = useAuth();

  const [selectedRx, setSelectedRx] = useState(null);
  const [verificationNote, setVerificationNote] = useState('');
  const [activeTab, setActiveTab] = useState('pending'); // 'pending', 'all', 'orders'

  const pendingList = prescriptions.filter(p => p.status === 'Pending Verification');
  const historyList = prescriptions.filter(p => p.status !== 'Pending Verification');

  const handleApprove = (id) => {
    updatePrescriptionStatus(
      id,
      'Approved',
      verificationNote.trim() || 'Verified against medical practitioner registration. Dosage & duration confirmed.'
    );
    setSelectedRx(null);
    setVerificationNote('');
  };

  const handleReject = (id) => {
    const reason = verificationNote.trim() || 'Prescription expired or doctor license unreadable. Please re-upload.';
    updatePrescriptionStatus(id, 'Rejected', reason);
    setSelectedRx(null);
    setVerificationNote('');
  };

  return (
    <div className="py-4" style={{ backgroundColor: '#F8FAF9' }}>
      <div className="container-xl">
        
        {/* Header */}
        <div className="card-auramed p-4 mb-4" style={{ background: 'linear-gradient(135deg, #08784B 0%, #159B64 100%)', color: '#FFFFFF' }}>
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div className="d-flex align-items-center gap-3">
              <div className="p-3 bg-white text-dark-green rounded-circle shadow">
                <FaUserMd size={32} />
              </div>
              <div>
                <span className="badge bg-light text-dark fw-bold mb-1">REGISTERED DISPENSARY PANEL</span>
                <h3 className="fw-bold mb-0 text-white">Pharmacist Verification & Clinical Review</h3>
                <div className="text-white-50" style={{ fontSize: '13px' }}>
                  Duty Pharmacist: <strong>{currentUser.name}</strong> • License: <strong>RPH-NY-98231</strong>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-20 p-3 rounded text-center">
              <span className="d-block text-uppercase" style={{ fontSize: '11px', letterSpacing: '0.8px' }}>Pending Approvals</span>
              <span className="fs-3 fw-bold text-white">{pendingList.length}</span>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <ul className="nav nav-pills gap-2 mb-4 bg-white p-2 rounded border">
          <li className="nav-item">
            <button
              className={`btn btn-sm ${activeTab === 'pending' ? 'btn-auramed' : 'btn-light'}`}
              onClick={() => setActiveTab('pending')}
            >
              <FaClipboardList className="me-1" /> Pending Verifications ({pendingList.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`btn btn-sm ${activeTab === 'all' ? 'btn-auramed' : 'btn-light'}`}
              onClick={() => setActiveTab('all')}
            >
              <FaHistory className="me-1" /> Prescription Audit History ({historyList.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`btn btn-sm ${activeTab === 'orders' ? 'btn-auramed' : 'btn-light'}`}
              onClick={() => setActiveTab('orders')}
            >
              <FaPills className="me-1" /> Dispensed Medication Orders ({orders.length})
            </button>
          </li>
        </ul>

        {/* PENDING PRESCRIPTIONS */}
        {activeTab === 'pending' && (
          <div className="card-auramed p-4">
            <h5 className="fw-bold text-dark mb-3">Awaiting Clinical Sign-Off</h5>

            {pendingList.length > 0 ? (
              <div className="row g-3">
                {pendingList.map(rx => (
                  <div key={rx.id} className="col-lg-6">
                    <div className="border rounded-3 p-3 bg-white h-100 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <span className="badge bg-warning-subtle text-warning fw-bold mb-1">
                            Pending Verification
                          </span>
                          <h6 className="fw-bold text-dark mb-0">{rx.id}</h6>
                          <small className="text-muted">Uploaded: {rx.uploadDate}</small>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedRx(rx);
                            setVerificationNote(rx.pharmacistNotes || '');
                          }}
                          className="btn btn-sm btn-auramed"
                        >
                          <FaEye /> Review Rx
                        </button>
                      </div>

                      <div className="text-secondary mb-2" style={{ fontSize: '13px' }}>
                        Patient: <strong>{rx.patientName}</strong> • Prescribing Doctor: <span>{rx.doctorName || 'Dr. Medical Practitioner'}</span>
                      </div>

                      {rx.fileUrl && (
                        <div className="mb-3 text-center bg-light p-2 rounded">
                          <img
                            src={rx.fileUrl}
                            alt="Prescription"
                            style={{ maxHeight: '140px', objectFit: 'contain' }}
                          />
                        </div>
                      )}

                      <div className="mt-auto pt-2 border-top d-flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedRx(rx);
                            setVerificationNote('Verified against state practitioner database. Patient dose approved.');
                          }}
                          className="btn btn-sm btn-success flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                        >
                          <FaCheckCircle /> Verify & Approve
                        </button>
                        <button
                          onClick={() => {
                            setSelectedRx(rx);
                            setVerificationNote('Prescription invalid or illegible. Patient requested for clear re-upload.');
                          }}
                          className="btn btn-sm btn-outline-danger"
                        >
                          <FaTimesCircle /> Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <FaCheckCircle size={40} className="text-success mb-2" />
                <h5 className="fw-bold text-dark">All Prescriptions Verified</h5>
                <p className="text-secondary" style={{ fontSize: '13px' }}>
                  There are no pending prescriptions in the dispensary queue.
                </p>
              </div>
            )}
          </div>
        )}

        {/* AUDIT HISTORY */}
        {activeTab === 'all' && (
          <div className="card-auramed p-4">
            <h5 className="fw-bold text-dark mb-3">Completed Prescription Audit Log</h5>
            
            <div className="table-responsive">
              <table className="table align-middle table-hover mb-0" style={{ fontSize: '13px' }}>
                <thead className="table-light">
                  <tr>
                    <th>RX REF</th>
                    <th>PATIENT</th>
                    <th>DATE</th>
                    <th>DECISION</th>
                    <th>PHARMACIST CLINICAL NOTES</th>
                  </tr>
                </thead>
                <tbody>
                  {historyList.map(rx => (
                    <tr key={rx.id}>
                      <td className="fw-bold text-primary-green">{rx.id}</td>
                      <td>{rx.patientName}</td>
                      <td>{rx.uploadDate}</td>
                      <td>
                        <span className={`badge-status ${
                          rx.status === 'Approved' ? 'badge-status-approved' : 'badge-status-rejected'
                        }`}>
                          {rx.status}
                        </span>
                      </td>
                      <td className="text-secondary">{rx.pharmacistNotes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* RELATED ORDERS */}
        {activeTab === 'orders' && (
          <div className="card-auramed p-4">
            <h5 className="fw-bold text-dark mb-3">Dispensed Orders Queue</h5>
            <div className="table-responsive">
              <table className="table align-middle mb-0" style={{ fontSize: '13px' }}>
                <thead className="table-light">
                  <tr>
                    <th>ORDER ID</th>
                    <th>DATE</th>
                    <th>ITEMS COUNT</th>
                    <th>STATUS</th>
                    <th>DISPATCH ADDRESS</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id}>
                      <td className="fw-bold text-dark">{o.id}</td>
                      <td>{o.date}</td>
                      <td>{o.items.length} Formulations</td>
                      <td>
                        <span className="badge bg-light text-dark border">{o.status}</span>
                      </td>
                      <td className="text-truncate" style={{ maxWidth: '280px' }}>{o.deliveryAddress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Verification Review Modal */}
      {selectedRx && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1100 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <div>
                  <h5 className="modal-title fw-bold mb-0">Clinical Verification: {selectedRx.id}</h5>
                  <small className="text-secondary">Patient: {selectedRx.patientName}</small>
                </div>
                <button type="button" className="btn-close" onClick={() => setSelectedRx(null)}></button>
              </div>

              <div className="modal-body p-4">
                <div className="row g-4">
                  <div className="col-md-6 text-center">
                    <div className="p-2 border rounded bg-light">
                      <img
                        src={selectedRx.fileUrl}
                        alt="Prescription Document"
                        className="img-fluid rounded"
                        style={{ maxHeight: '340px', objectFit: 'contain' }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <h6 className="fw-bold text-dark mb-2">Prescription Credentials</h6>
                    <div className="p-3 bg-light rounded mb-3" style={{ fontSize: '13px' }}>
                      <div className="mb-1"><strong>Doctor:</strong> {selectedRx.doctorName || 'Dr. Medical Practitioner'}</div>
                      <div className="mb-1"><strong>Clinic:</strong> {selectedRx.clinicName || 'Community Hospital'}</div>
                      <div><strong>Upload Date:</strong> {selectedRx.uploadDate}</div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>
                        Clinical Review Notes (Visible to Patient)
                      </label>
                      <textarea
                        className="form-control form-control-sm"
                        rows="4"
                        value={verificationNote}
                        onChange={(e) => setVerificationNote(e.target.value)}
                        placeholder="State approved drug strengths, dispense units, or reason for rejection..."
                      ></textarea>
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        onClick={() => handleApprove(selectedRx.id)}
                        className="btn btn-success flex-grow-1 py-2 d-flex align-items-center justify-content-center gap-1"
                      >
                        <FaCheckCircle /> Sign & Approve
                      </button>
                      <button
                        onClick={() => handleReject(selectedRx.id)}
                        className="btn btn-outline-danger flex-grow-1 py-2 d-flex align-items-center justify-content-center gap-1"
                      >
                        <FaTimesCircle /> Reject Rx
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer bg-light py-2">
                <small className="text-secondary">
                  <FaShieldAlt color="#159B64" className="me-1" /> Licensed Pharmacist Digital Signature complies with State Board rules.
                </small>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
