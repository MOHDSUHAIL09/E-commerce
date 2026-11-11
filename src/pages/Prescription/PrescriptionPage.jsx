import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCheckCircle,
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
  // const handleDrag = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (e.type === 'dragenter' || e.type === 'dragover') {
  //     setDragActive(true);
  //   } else if (e.type === 'dragleave') {
  //     setDragActive(false);
  //   }
  // };

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setDragActive(false);
  //   if (e.dataTransfer.files && e.dataTransfer.files[0]) {
  //     handleFiles(Array.from(e.dataTransfer.files));
  //   }
  // };

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
        {/* <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb" style={{ fontSize: '13px' }}>
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Upload Prescription</li>
          </ol>
        </nav> */}



        {successMessage && (
          <div className="alert alert-success d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center gap-2">
              <FaCheckCircle size={20} />
              <span>{successMessage}</span>
            </div>
            <button className="btn-close" onClick={() => setSuccessMessage('')}></button>
          </div>
        )}


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
