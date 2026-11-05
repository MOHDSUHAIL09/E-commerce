import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFileMedical, FaCloudUploadAlt, FaCamera, FaTimes, 
  FaCheckCircle, FaClock, FaShieldAlt, FaUserMd, FaEye,
  FaFilePdf, FaFileImage, FaTrashAlt, FaCheck
} from 'react-icons/fa';
import { useHealthcare } from '../../context/HealthcareContext';
import { useAuth } from '../../context/AuthContext';

export default function PrescriptionPage() {
  const { prescriptions, uploadPrescription } = useHealthcare();
  const { currentUser } = useAuth();
  const fileInputRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [patientName, setPatientName] = useState(currentUser.name || 'Alex Morgan');
  const [doctorName, setDoctorName] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [notes, setNotes] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [previewModal, setPreviewModal] = useState(null);

  // File drag & drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (incomingFiles) => {
    const valid = incomingFiles.map(file => ({
      file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      type: file.type.includes('pdf') ? 'pdf' : 'image',
      preview: file.type.includes('image')
        ? URL.createObjectURL(file)
        : 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=800&auto=format&fit=crop&q=80'
    }));
    setFiles(prev => [...prev, ...valid]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert('Please upload at least one prescription file.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);

    // Simulate upload progress
    const timer = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsUploading(false);
          // Commit to context
          uploadPrescription({
            patientName: patientName || 'Alex Morgan',
            doctorName: doctorName || 'Dr. Prescribing Physician',
            clinicName: clinicName || 'Community Care Clinic',
            fileName: files[0].name,
            fileUrl: files[0].preview,
            customerNotes: notes
          });
          setSuccessMessage('Prescription uploaded successfully! Assigned to certified pharmacist queue for validation.');
          setFiles([]);
          setNotes('');
          setDoctorName('');
          setClinicName('');
          return 100;
        }
        return prev + 30;
      });
    }, 300);
  };

  return (
    <div className="py-4">
      <div className="container-xl">
        
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb" style={{ fontSize: '13px' }}>
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Upload Prescription</li>
          </ol>
        </nav>

        {/* Header Hero */}
        <div 
          className="p-4 p-md-5 rounded-4 mb-4 text-white"
          style={{ background: 'linear-gradient(135deg, #08784B 0%, #159B64 100%)' }}
        >
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="badge bg-light text-dark fw-bold mb-2">LICENSED DISPENSARY SERVICE</span>
              <h2 className="display-6 fw-bold mb-2 text-white">Upload Your Prescription</h2>
              <p className="lead text-white-50 mb-0" style={{ fontSize: '15px' }}>
                Our registered pharmacists review every prescription for drug interactions, precise dosage, and generic alternatives to maximize your healthcare savings.
              </p>
            </div>
          </div>
        </div>

        {successMessage && (
          <div className="alert alert-success d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center gap-2">
              <FaCheckCircle size={20} />
              <span>{successMessage}</span>
            </div>
            <button className="btn-close" onClick={() => setSuccessMessage('')}></button>
          </div>
        )}

        <div className="row g-4">
          
          {/* Upload Form */}
          <div className="col-lg-7">
            <div className="card-auramed p-4 mb-4">
              <h5 className="fw-bold text-dark mb-3">Upload Prescription Files (JPG, PNG, PDF)</h5>

              {/* Drag & Drop Zone */}
              <div
                className={`dropzone-box mb-4 ${dragActive ? 'active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="d-none"
                  onChange={handleFileChange}
                />

                <div className="rounded-circle p-3 bg-white text-primary-green d-inline-flex mb-2 shadow-sm">
                  <FaCloudUploadAlt size={36} />
                </div>
                <h6 className="fw-bold text-dark mb-1">Drag and drop your prescription here</h6>
                <p className="text-secondary mb-3" style={{ fontSize: '13px' }}>
                  Supports high-resolution camera captures, scanned JPG, PNG, and PDF files up to 15MB.
                </p>

                <div className="d-flex justify-content-center gap-2">
                  <button type="button" className="btn btn-sm btn-auramed">
                    Browse Files
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current && fileInputRef.current.click();
                    }}
                  >
                    <FaCamera size={12} /> Mobile Camera Scan
                  </button>
                </div>
              </div>

              {/* Uploaded Files Queue */}
              {files.length > 0 && (
                <div className="mb-4">
                  <div className="fw-semibold text-dark mb-2" style={{ fontSize: '13px' }}>
                    Files Ready for Upload ({files.length})
                  </div>
                  <div className="d-flex flex-column gap-2">
                    {files.map((f, idx) => (
                      <div key={idx} className="p-2 border rounded bg-light d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-2 text-truncate" style={{ maxWidth: '75%' }}>
                          {f.type === 'pdf' ? <FaFilePdf color="#E74C3C" size={20} /> : <FaFileImage color="#159B64" size={20} />}
                          <div className="text-truncate">
                            <div className="fw-semibold text-dark text-truncate" style={{ fontSize: '13px' }}>{f.name}</div>
                            <small className="text-muted">{f.size}</small>
                          </div>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setPreviewModal(f.preview)}
                            className="btn btn-sm btn-light border p-1"
                            title="Preview file"
                          >
                            <FaEye size={12} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="btn btn-sm btn-light border p-1 text-danger"
                            title="Remove file"
                          >
                            <FaTrashAlt size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Progress Bar */}
              {isUploading && (
                <div className="mb-4">
                  <div className="d-flex justify-content-between text-secondary mb-1" style={{ fontSize: '12px' }}>
                    <span>Encrypting and uploading to pharmacist portal...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                </div>
              )}

              {/* Patient & Doctor Details Form */}
              <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label" style={{ fontSize: '13px' }}>Patient Full Name</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label" style={{ fontSize: '13px' }}>Prescribing Doctor (Optional)</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="e.g. Dr. Sarah Jenkins"
                      value={doctorName}
                      onChange={(e) => setDoctorName(e.target.value)}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label" style={{ fontSize: '13px' }}>Clinic / Hospital Name (Optional)</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="e.g. Mount Sinai Medical Pavilion"
                      value={clinicName}
                      onChange={(e) => setClinicName(e.target.value)}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label" style={{ fontSize: '13px' }}>Special Instructions / Dosage Notes</label>
                    <textarea
                      className="form-control form-control-sm"
                      rows="2"
                      placeholder="Specify brand preferences, 30-day or 90-day supplies, or generic salt requests..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isUploading || files.length === 0}
                  className="btn btn-auramed w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                >
                  <FaFileMedical /> Submit for Pharmacist Verification
                </button>
              </form>

              <div className="mt-3 text-secondary text-center" style={{ fontSize: '11px' }}>
                <FaShieldAlt color="#159B64" className="me-1" /> All patient records are encrypted under HIPAA and FDA guidelines.
              </div>
            </div>
          </div>

          {/* Right Column: Prescription History & Guidelines */}
          <div className="col-lg-5">
            {/* Guidelines Card */}
            <div className="card-auramed p-4 mb-4" style={{ backgroundColor: '#F8FAF9' }}>
              <h6 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                <FaCheckCircle color="#159B64" /> Valid Prescription Checklist
              </h6>
              <ul className="list-unstyled mb-0 d-flex flex-column gap-2 text-secondary" style={{ fontSize: '13px' }}>
                <li className="d-flex align-items-start gap-2">
                  <FaCheck size={12} color="#159B64" className="mt-1" />
                  <span>Must display doctor's name, qualifications, & medical license number.</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <FaCheck size={12} color="#159B64" className="mt-1" />
                  <span>Must state patient name and prescription date (within 6 months).</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <FaCheck size={12} color="#159B64" className="mt-1" />
                  <span>Dosage, medicine strength, and duration must be readable.</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <FaCheck size={12} color="#159B64" className="mt-1" />
                  <span>Do not crop edges of prescription sheet.</span>
                </li>
              </ul>
            </div>

            {/* Upload History UI */}
            <div className="card-auramed p-4">
              <h6 className="fw-bold text-dark mb-3">Your Prescription History ({prescriptions.length})</h6>
              
              <div className="d-flex flex-column gap-3">
                {prescriptions.map(rx => (
                  <div key={rx.id} className="p-3 border rounded bg-white">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <strong className="text-dark d-block" style={{ fontSize: '14px' }}>{rx.id}</strong>
                        <small className="text-muted">Uploaded on {rx.uploadDate}</small>
                      </div>
                      <span className={`badge-status ${
                        rx.status === 'Approved' ? 'badge-status-approved' :
                        rx.status === 'Rejected' ? 'badge-status-rejected' : 'badge-status-pending'
                      }`}>
                        {rx.status}
                      </span>
                    </div>

                    <div className="text-secondary mb-2" style={{ fontSize: '12px' }}>
                      Patient: <strong>{rx.patientName}</strong> • Prescriber: <span>{rx.doctorName}</span>
                    </div>

                    {rx.pharmacistNotes && (
                      <div className="p-2 rounded bg-light text-secondary mb-2" style={{ fontSize: '11px' }}>
                        <strong>Pharmacist Review:</strong> {rx.pharmacistNotes}
                      </div>
                    )}

                    <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                      <button
                        onClick={() => setPreviewModal(rx.fileUrl)}
                        className="btn btn-sm btn-link text-primary-green p-0 text-decoration-none d-flex align-items-center gap-1"
                        style={{ fontSize: '12px' }}
                      >
                        <FaEye size={12} /> View File
                      </button>

                      {rx.status === 'Approved' && (
                        <Link to="/products" className="btn btn-sm btn-auramed-light py-0 px-2" style={{ fontSize: '11px' }}>
                          Order Dispensed Medicines
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Preview Modal */}
      {previewModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1100 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Prescription Document Preview</h5>
                <button type="button" className="btn-close" onClick={() => setPreviewModal(null)}></button>
              </div>
              <div className="modal-body text-center p-3">
                <img src={previewModal} alt="Prescription Preview" className="img-fluid rounded" style={{ maxHeight: '500px', objectFit: 'contain' }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
