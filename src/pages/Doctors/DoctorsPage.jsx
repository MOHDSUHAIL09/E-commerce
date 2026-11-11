import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaCrosshairs, 
  FaChevronDown, FaCheckCircle, FaTimes, FaInfoCircle, 
  FaStar, FaVideo, FaPhoneAlt, FaHospital, FaArrowLeft, 
  FaArrowRight, FaClock, FaShieldAlt, FaFilter, FaUser
} from 'react-icons/fa';
import { useHealthcare } from '../../hooks/useHealthcare';
import { useAuth } from '../../hooks/useAuth';
import SpecialtyIcon from './SpecialtyIcon';

export const DOCTOR_SPECIALTIES = [
  { id: 'general-physician', name: 'General Physician', categoryKey: 'General Physician', doctorsCount: 374, icon: 'general-physician' },
  { id: 'dermatology', name: 'Dermatology', categoryKey: 'Dermatology', doctorsCount: 142, icon: 'dermatology' },
  { id: 'obstetrics-gynaecology', name: 'Obstetrics & Gynaecology', categoryKey: 'Obstetrics & Gynaecology', doctorsCount: 198, icon: 'obstetrics-gynaecology' },
  { id: 'orthopaedics', name: 'Orthopaedics', categoryKey: 'Orthopaedics', doctorsCount: 165, icon: 'orthopaedics' },
  { id: 'ent', name: 'ENT', categoryKey: 'ENT', doctorsCount: 88, icon: 'ent' },
  { id: 'neurology', name: 'Neurology', categoryKey: 'Neurology', doctorsCount: 76, icon: 'neurology' },
  { id: 'cardiology', name: 'Cardiology', categoryKey: 'Cardiology', doctorsCount: 112, icon: 'cardiology' },
  { id: 'urology', name: 'Urology', categoryKey: 'Urology', doctorsCount: 64, icon: 'urology' },
  { id: 'gastroenterology', name: 'Gastroenterology/GI', categoryKey: 'Gastroenterology/GI', doctorsCount: 92, icon: 'gastroenterology' },
  { id: 'psychiatry', name: 'Psychiatry', categoryKey: 'Psychiatry', doctorsCount: 84, icon: 'psychiatry' },
  { id: 'paediatrics', name: 'Paediatrics', categoryKey: 'Paediatrics', doctorsCount: 156, icon: 'paediatrics' },
  { id: 'pulmonology', name: 'Pulmonology', categoryKey: 'Pulmonology', doctorsCount: 70, icon: 'pulmonology' },
  { id: 'endocrinology', name: 'Endocrinology', categoryKey: 'Endocrinology', doctorsCount: 58, icon: 'endocrinology' },
  { id: 'nephrology', name: 'Nephrology', categoryKey: 'Nephrology', doctorsCount: 46, icon: 'nephrology' },
  { id: 'neurosurgery', name: 'Neurosurgery', categoryKey: 'Neurosurgery', doctorsCount: 38, icon: 'neurosurgery' },
  { id: 'rheumatology', name: 'Rheumatology', categoryKey: 'Rheumatology', doctorsCount: 32, icon: 'rheumatology' },
  { id: 'ophthalmology', name: 'Ophthalmology', categoryKey: 'Ophthalmology', doctorsCount: 94, icon: 'ophthalmology' },
  { id: 'surgical-gastroenterology', name: 'Surgical Gastroenterology', categoryKey: 'Surgical Gastroenterology', doctorsCount: 44, icon: 'surgical-gastroenterology' },
  { id: 'infectious-disease', name: 'Infectious Disease', categoryKey: 'Infectious Disease', doctorsCount: 35, icon: 'infectious-disease' },
  { id: 'general-laparoscopic-surgery', name: 'General & Laparoscopic Surgery', categoryKey: 'General & Laparoscopic Surgery', doctorsCount: 82, icon: 'general-laparoscopic-surgery' },
  { id: 'psychology', name: 'Psychology', categoryKey: 'Psychology', doctorsCount: 68, icon: 'psychology' },
  { id: 'medical-oncology', name: 'Medical Oncology', categoryKey: 'Medical Oncology', doctorsCount: 52, icon: 'medical-oncology' },
  { id: 'diabetology', name: 'Diabetology', categoryKey: 'Diabetology', doctorsCount: 120, icon: 'diabetology' },
  { id: 'dentist', name: 'Dentist', categoryKey: 'Dentist', doctorsCount: 110, icon: 'dentist' }
];

export const HEALTH_ARTICLES = [
  {
    id: 'art-1',
    title: 'A Step-By-Step Guide To Using A Glucometer',
    author: 'By CureOn 24|7',
    date: '26.10.26',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&auto=format&fit=crop&q=80',
    category: 'Diabetes Care',
    readTime: '4 min read'
  },
  {
    id: 'art-2',
    title: 'A Guide On Choosing The Best Shampoo For Your Hair',
    author: 'By CureOn 24|7',
    date: '09.10.26',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
    category: 'Hair Care',
    readTime: '3 min read'
  },
  {
    id: 'art-3',
    title: 'Scientifically-Proven Ways To Deal With Dandruff',
    author: 'By CureOn 24|7',
    date: '09.10.26',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&auto=format&fit=crop&q=80',
    category: 'Skin & Scalp',
    readTime: '5 min read'
  },
  {
    id: 'art-4',
    title: 'Managing Your Blood Sugar Levels with Smart Glucose Monitor',
    author: 'By CureOn 24|7',
    date: '07.10.26',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80',
    category: 'Device Guide',
    readTime: '6 min read'
  },
  {
    id: 'art-5',
    title: 'What are the best sources of probiotics for diabetics?',
    author: 'By CureOn 24|7',
    date: '25.09.26',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&auto=format&fit=crop&q=80',
    category: 'Nutrition',
    readTime: '4 min read'
  },
  {
    id: 'art-6',
    title: 'RFT Test: Normal Range, Purpose, Procedure and Results',
    author: 'By CureOn 24|7',
    date: '20.09.26',
    image: 'https://images.unsplash.com/photo-1579165466791-788226ab6fb0?w=600&auto=format&fit=crop&q=80',
    category: 'Diagnostics',
    readTime: '5 min read'
  }
];

export const DOCTORS = [
  {
    id: 'doc-1',
    name: 'Dr Sanjeeva Sumalath Betala',
    specialization: 'General Physician',
    roleTitle: 'General Practitioner',
    qualificationDisplay: '12 YEARS • MBBS',
    qualification: 'MBBS (Andhra Medical College)',
    experienceYears: 12,
    rating: 4.9,
    fee: 599,
    inrFee: 599,
    city: 'Visakhapatnam',
    clinic: 'CureOn 24|7 Clinic - Andhra Pradesh, Visakhapatnam',
    availableIn: 'Available in 16 minutes',
    onTimeGuarantee: true,
    avatar: 'https://images.unsplash.com/photo-1594824813591-689381e4b9db?w=500&auto=format&fit=crop&q=80',
    hospital: 'CureOn 24|7 Clinic - Andhra Pradesh, Visakhapatnam',
    languages: ['English', 'Telugu', 'Hindi'],
    about: 'Experienced General Practitioner specializing in chronic fever, internal medicine, hypertension, digestive issues, and diabetic management.',
    availability: ['Today', 'Tomorrow', 'This Week'],
    slots: ['Available in 16 mins', '10:30 AM', '12:00 PM', '03:30 PM', '05:00 PM', '07:30 PM']
  },
  {
    id: 'doc-2',
    name: 'Dr. D Bhanu Prakash',
    specialization: 'General Physician',
    roleTitle: 'General Practitioner',
    qualificationDisplay: '10 YEARS • MBBS, AFIH, ADVANCED CERTI...',
    qualification: 'MBBS, AFIH, Advanced Certificate in Diabetology',
    experienceYears: 10,
    rating: 4.8,
    fee: 770,
    inrFee: 770,
    city: 'Hyderabad',
    clinic: 'CureOn 24|7 Clinic, Hyderabad',
    availableIn: 'Available in 16 minutes',
    onTimeGuarantee: true,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop&q=80',
    hospital: 'CureOn 24|7 Clinic, Hyderabad',
    languages: ['English', 'Telugu', 'Hindi'],
    about: 'Senior physician with specialized certification in lifestyle diseases, industrial health, acute viral syndromes, and personalized preventive care.',
    availability: ['Today', 'Tomorrow', 'This Week'],
    slots: ['Available in 16 mins', '11:00 AM', '01:30 PM', '04:15 PM', '06:45 PM']
  },
  {
    id: 'doc-3',
    name: 'Dr. Lakshmi Sanjitha Kakani',
    specialization: 'General Physician',
    roleTitle: 'General Physician/ Internal Medicine Speci...',
    qualificationDisplay: '6 YEARS • MBBS, MD (GENERAL MEDICINE)',
    qualification: 'MBBS, MD (General Medicine)',
    experienceYears: 6,
    rating: 4.9,
    fee: 760,
    inrFee: 760,
    city: 'Visakhapatnam',
    clinic: 'CureOn 24|7 Clinic - Andhra Pradesh, Visakhapatnam',
    availableIn: 'Available in 20 minutes',
    onTimeGuarantee: true,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format&fit=crop&q=80',
    hospital: 'CureOn 24|7 Clinic - Andhra Pradesh, Visakhapatnam',
    languages: ['English', 'Telugu', 'Hindi'],
    about: 'Dedicated Internal Medicine specialist with high expertise in adult infections, endocrine issues, geriatric medicine, and chronic fatigue.',
    availability: ['Today', 'Tomorrow'],
    slots: ['Available in 20 mins', '10:00 AM', '12:30 PM', '03:00 PM', '05:30 PM']
  },
  {
    id: 'doc-4',
    name: 'Dr. Siri Nallapu',
    specialization: 'General Physician',
    roleTitle: 'General Practitioner',
    qualificationDisplay: '8 YEARS • MBBS',
    qualification: 'MBBS, Family Medicine Fellowship',
    experienceYears: 8,
    rating: 4.9,
    fee: 650,
    inrFee: 650,
    city: 'Hyderabad',
    clinic: 'CureOn 24|7 Clinic, Jubilee Hills, Hyderabad',
    availableIn: 'Available in 15 minutes',
    onTimeGuarantee: true,
    avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=500&auto=format&fit=crop&q=80',
    hospital: 'CureOn 24|7 Clinic, Jubilee Hills, Hyderabad',
    languages: ['English', 'Telugu'],
    about: 'Holistic general healthcare practitioner for women, children, and families, providing swift telehealth triage and safe medication prescriptions.',
    availability: ['Today', 'Tomorrow', 'This Week'],
    slots: ['Available in 15 mins', '11:15 AM', '02:00 PM', '04:45 PM', '07:00 PM']
  },
  {
    id: 'doc-5',
    name: 'Dr. Ananya Sharma',
    specialization: 'Dermatology',
    roleTitle: 'Consultant Dermatologist & Cosmetologist',
    qualificationDisplay: '11 YEARS • MBBS, MD (DERMATOLOGY)',
    qualification: 'MBBS, MD (Dermatology, Venereology & Leprosy)',
    experienceYears: 11,
    rating: 4.9,
    fee: 699,
    inrFee: 699,
    city: 'Bangalore',
    clinic: 'CureOn Skin & Laser Centre, Indiranagar, Bangalore',
    availableIn: 'Available in 18 minutes',
    onTimeGuarantee: true,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format&fit=crop&q=80',
    hospital: 'CureOn Skin & Laser Centre, Bangalore',
    languages: ['English', 'Hindi', 'Kannada'],
    about: 'Specializes in clinical acne, eczema, psoriasis, skin barrier restoration, hair fall therapy, and cosmetic dermatology.',
    availability: ['Today', 'Tomorrow'],
    slots: ['Available in 18 mins', '10:45 AM', '01:15 PM', '03:45 PM', '06:15 PM']
  },
  {
    id: 'doc-6',
    name: 'Dr. Ramesh Chandra Verma',
    specialization: 'Cardiology',
    roleTitle: 'Senior Interventional Cardiologist',
    qualificationDisplay: '18 YEARS • MBBS, MD, DM (CARDIOLOGY)',
    qualification: 'MBBS, MD, DM (Cardiology), FACC',
    experienceYears: 18,
    rating: 4.9,
    fee: 899,
    inrFee: 899,
    city: 'New Delhi',
    clinic: 'CureOn Heart & Vascular Institute, South Extension, New Delhi',
    availableIn: 'Available in 25 minutes',
    onTimeGuarantee: true,
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&auto=format&fit=crop&q=80',
    hospital: 'CureOn Heart & Vascular Institute, New Delhi',
    languages: ['English', 'Hindi'],
    about: 'Pioneering cardiologist with extensive expertise in hypertension management, lipid control, CAD prevention, and post-angioplasty care.',
    availability: ['Today', 'Tomorrow'],
    slots: ['Available in 25 mins', '11:30 AM', '02:30 PM', '05:00 PM']
  },
  {
    id: 'doc-7',
    name: 'Dr. Sunita Kulkarni',
    specialization: 'Obstetrics & Gynaecology',
    roleTitle: 'Senior Consultant Obstetrician & Gynaecologist',
    qualificationDisplay: '15 YEARS • MBBS, MS (OBG), DNB, FICOG',
    qualification: 'MBBS, MS (OBG), DNB, Fellowship in Fetal Medicine',
    experienceYears: 15,
    rating: 4.9,
    fee: 750,
    inrFee: 750,
    city: 'Mumbai',
    clinic: 'CureOn Mother & Child Pavilion, Bandra, Mumbai',
    availableIn: 'Available in 20 minutes',
    onTimeGuarantee: true,
    avatar: 'https://images.unsplash.com/photo-1594824813591-689381e4b9db?w=500&auto=format&fit=crop&q=80',
    hospital: 'CureOn Mother & Child Pavilion, Mumbai',
    languages: ['English', 'Hindi', 'Marathi'],
    about: 'Compassionate specialist in PCOS/PCOD management, antenatal care, high-risk pregnancies, hormonal imbalances, and menopause wellness.',
    availability: ['Today', 'Tomorrow', 'This Week'],
    slots: ['Available in 20 mins', '10:00 AM', '01:00 PM', '04:00 PM', '06:30 PM']
  },
  {
    id: 'doc-8',
    name: 'Dr. Arvind Rajan',
    specialization: 'Orthopaedics',
    roleTitle: 'Consultant Orthopaedic & Joint Replacement Surgeon',
    qualificationDisplay: '14 YEARS • MBBS, MS (ORTHO), DNB, MCh',
    qualification: 'MBBS, MS (Orthopaedics), MCh Orth (UK)',
    experienceYears: 14,
    rating: 4.8,
    fee: 799,
    inrFee: 799,
    city: 'Chennai',
    clinic: 'CureOn Bone & Joint Centre, Anna Nagar, Chennai',
    availableIn: 'Available in 22 minutes',
    onTimeGuarantee: true,
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500&auto=format&fit=crop&q=80',
    hospital: 'CureOn Bone & Joint Centre, Chennai',
    languages: ['English', 'Tamil', 'Hindi'],
    about: 'Expert in sports injuries, knee and hip arthritis, spine issues, back pain ergonomics, and non-surgical fracture rehabilitation.',
    availability: ['Today', 'Tomorrow'],
    slots: ['Available in 22 mins', '11:00 AM', '02:00 PM', '05:30 PM']
  },
  {
    id: 'doc-9',
    name: 'Dr. Pradeep Nair',
    specialization: 'Paediatrics',
    roleTitle: 'Senior Consultant Paediatrician & Neonatologist',
    qualificationDisplay: '13 YEARS • MBBS, MD (PAED), DCH',
    qualification: 'MBBS, MD (Paediatrics), Fellowship in Neonatal Care',
    experienceYears: 13,
    rating: 4.9,

    fee: 650,
    inrFee: 650,
    city: 'Kochi',
    clinic: 'CureOn Child Health Clinic, Panampilly Nagar, Kochi',
    availableIn: 'Available in 15 minutes',
    onTimeGuarantee: true,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop&q=80',
    hospital: 'CureOn Child Health Clinic, Kochi',
    languages: ['English', 'Malayalam', 'Hindi'],
    about: 'Dedicated paediatrician for baby milestones, infant vaccination schedules, pediatric asthma, seasonal allergic cough, and child nutrition.',
    availability: ['Today', 'Tomorrow'],
    slots: ['Available in 15 mins', '09:30 AM', '12:00 PM', '03:30 PM', '06:00 PM']
  },
  {
    id: 'doc-10',
    name: 'Dr. Meera Nambiar',
    specialization: 'ENT',
    roleTitle: 'Senior ENT & Head Neck Specialist',
    qualificationDisplay: '11 YEARS • MBBS, MS (ENT), DLO',
    qualification: 'MBBS, MS (Otorhinolaryngology)',
    experienceYears: 11,
    rating: 4.8,
    fee: 600,
    inrFee: 600,
    city: 'Hyderabad',
    clinic: 'CureOn ENT Care Centre, Banjara Hills, Hyderabad',
    availableIn: 'Available in 20 minutes',
    onTimeGuarantee: true,
    avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=500&auto=format&fit=crop&q=80',
    hospital: 'CureOn ENT Care Centre, Hyderabad',
    languages: ['English', 'Telugu', 'Hindi'],
    about: 'Specialized diagnosis of chronic sinusitis, allergic rhinitis, ear discharge, hearing loss, vertigo, and vocal cord disorders.',
    availability: ['Today', 'Tomorrow'],
    slots: ['Available in 20 mins', '10:15 AM', '01:45 PM', '04:30 PM']
  },
  {
    id: 'doc-11',
    name: 'Dr. Rajeshwari Swaminathan',
    specialization: 'Diabetology',
    roleTitle: 'Lead Consultant Diabetologist & Endocrinologist',
    qualificationDisplay: '16 YEARS • MBBS, MD, C.DIAB (BOSTON)',
    qualification: 'MBBS, MD (Medicine), Postgrad Diabetology (Boston)',
    experienceYears: 16,
    rating: 4.9,
    fee: 799,
    inrFee: 799,
    city: 'Hyderabad',
    clinic: 'CureOn Diabetes & Metabolic Centre, Gachibowli, Hyderabad',
    availableIn: 'Available in 16 minutes',
    onTimeGuarantee: true,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format&fit=crop&q=80',
    hospital: 'CureOn Diabetes & Metabolic Centre, Hyderabad',
    languages: ['English', 'Telugu', 'Hindi'],
    about: 'Master clinician in reversing prediabetes, insulin titration, continuous glucose monitoring (CGM), diabetic foot care, and metabolic health.',
    availability: ['Today', 'Tomorrow', 'This Week'],
    slots: ['Available in 16 mins', '10:30 AM', '01:00 PM', '04:00 PM', '06:30 PM']
  },
  {
    id: 'doc-12',
    name: 'Dr. Vivek Sengupta',
    specialization: 'Gastroenterology/GI',
    roleTitle: 'Senior Gastroenterologist & Hepatologist',
    qualificationDisplay: '14 YEARS • MBBS, MD, DM (GASTROENTEROLOGY)',
    qualification: 'MBBS, MD, DM (Gastroenterology)',
    experienceYears: 14,
    rating: 4.8,
    fee: 850,
    inrFee: 850,
    city: 'Kolkata',
    clinic: 'CureOn Digestive Health Centre, Salt Lake, Kolkata',
    availableIn: 'Available in 25 minutes',
    onTimeGuarantee: true,
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&auto=format&fit=crop&q=80',
    hospital: 'CureOn Digestive Health Centre, Kolkata',
    languages: ['English', 'Bengali', 'Hindi'],
    about: 'Expert care for severe GERD, fatty liver disease, irritable bowel syndrome (IBS), chronic constipation, and abdominal discomfort.',
    availability: ['Today', 'Tomorrow'],
    slots: ['Available in 25 mins', '11:00 AM', '02:00 PM', '05:00 PM']
  }
];

export default function DoctorsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { bookDoctorAppointment } = useHealthcare();
  const { currentUser } = useAuth();

  const [viewMode, setViewMode] = useState('landing');
  const [activeSpecialty, setActiveSpecialty] = useState('General Physician');

  const [formSpecialty, setFormSpecialty] = useState('General Physician');
  const [formDate, setFormDate] = useState('Today');
  const [formLocation, setFormLocation] = useState('Visakhapatnam');

  // --- SPECIALTY SEARCH STATE (Naya Add Kiya) ---
  const [specialtySearchQuery, setSpecialtySearchQuery] = useState('');

  // --- FILTER STATES ---
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedCity, setSelectedCity] = useState('All');
  const [maxFee, setMaxFee] = useState(1000);
  const [minExperience, setMinExperience] = useState(0);

  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [consultationMode, setConsultationMode] = useState('Video Consultation');
  const [patientName, setPatientName] = useState(currentUser?.name || 'Alex Morgan');
  const [patientAge, setPatientAge] = useState('28');
  const [patientProblem, setPatientProblem] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const [infoDoctor, setInfoDoctor] = useState(null);

  const [showAskModal, setShowAskModal] = useState(false);
  const [askQuery, setAskQuery] = useState('');
  const [askResponse, setAskResponse] = useState(null);

  const [readingArticle, setReadingArticle] = useState(null);

  useEffect(() => {
    const spec = searchParams.get('specialty');
    if (spec) {
      setActiveSpecialty(spec);
      setFormSpecialty(spec);
      setViewMode('doctors');
    }
  }, [searchParams]);

  const handleSelectSpecialty = (specialtyName) => {
    setActiveSpecialty(specialtyName);
    setFormSpecialty(specialtyName);
    setViewMode('doctors');
    setSearchParams({ specialty: specialtyName });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveSpecialty(formSpecialty || 'General Physician');
    setViewMode('doctors');
    setSearchParams({ specialty: formSpecialty || 'General Physician' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setViewMode('landing');
    setSearchParams({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSortBy('relevance');
    setSelectedCity('All');
    setMaxFee(1000);
    setMinExperience(0);
  };

  const doctorsForSpecialty = DOCTORS.filter(doc => {
    if (activeSpecialty && activeSpecialty !== 'All Specialties') {
      const specNorm = activeSpecialty.toLowerCase();
      const docNorm = doc.specialization.toLowerCase();
      if (!docNorm.includes(specNorm) && !specNorm.includes(docNorm)) {
        if (specNorm.includes('general') && docNorm.includes('general')) return true;
        return false;
      }
    }
    if (selectedCity !== 'All' && doc.city !== selectedCity) return false;
    if (doc.inrFee > maxFee) return false;
    if (doc.experienceYears < minExperience) return false;
    return true;
  });

  const displayedDoctors = doctorsForSpecialty.length > 0 ? doctorsForSpecialty : DOCTORS.slice(0, 4);

  const sortedDoctors = [...displayedDoctors].sort((a, b) => {
    if (sortBy === 'price-low') return a.fee - b.fee;
    if (sortBy === 'price-high') return b.fee - a.fee;
    if (sortBy === 'experience') return (b.experienceYears || 10) - (a.experienceYears || 10);
    return b.rating - a.rating;
  });

  const handleOpenBooking = (doctor) => {
    setBookingDoctor(doctor);
    setSelectedSlot(doctor.slots?.[0] || 'Available in 16 mins');
    setBookingSuccess(null);
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!selectedSlot) return;
    const discountAmount = Math.round(bookingDoctor.fee * 0.08);
    const finalFee = bookingDoctor.fee - discountAmount;

    const apt = bookDoctorAppointment({
      doctorId: bookingDoctor.id,
      doctorName: bookingDoctor.name,
      specialization: bookingDoctor.specialization,
      hospital: bookingDoctor.clinic || bookingDoctor.hospital,
      date: formDate === 'Today' ? new Date().toISOString().split('T')[0] : '2026-11-05',
      slot: selectedSlot,
      patientName: patientName,
      patientAge: patientAge,
      problem: patientProblem || 'General Health Consultation',
      consultationFee: finalFee,
      type: consultationMode,
      meetLink: `https://telehealth.auramed.care/room-${Math.random().toString(36).substring(7)}`
    });

    setBookingSuccess(apt);
  };

  const handleAskAuraMed = (e) => {
    e.preventDefault();
    if (!askQuery.trim()) return;

    const query = askQuery.toLowerCase();
    let advice = 'Based on your symptoms, we advise staying hydrated and consulting an AuraMed board-certified physician for personalized clinical diagnosis.';
    let recDoctor = 'Dr Sanjeeva Sumalath Betala (General Practitioner)';

    if (query.includes('skin') || query.includes('acne') || query.includes('rash') || query.includes('dandruff')) {
      advice = 'Skin conditions benefit from a topical evaluation. Avoid scratching and harsh soaps.';
      recDoctor = 'Dr. Ananya Sharma (Consultant Dermatologist)';
    } else if (query.includes('heart') || query.includes('bp') || query.includes('chest') || query.includes('pressure')) {
      advice = 'Cardiovascular symptoms require timely triage. If experiencing sharp pain radiating to the arm, seek emergency care immediately.';
      recDoctor = 'Dr. Ramesh Chandra Verma (Senior Interventional Cardiologist)';
    } else if (query.includes('sugar') || query.includes('diabetes') || query.includes('glucose')) {
      advice = 'Maintain regular glycemic logs, monitor fasting blood glucose, and review insulin or oral hypoglycemic dosages.';
      recDoctor = 'Dr. Rajeshwari Swaminathan (Lead Consultant Diabetologist)';
    } else if (query.includes('baby') || query.includes('child') || query.includes('fever')) {
      advice = 'For pediatric symptoms, keep fever charts, ensure adequate fluid intake, and never administer adult medications without pediatric weight-based dosing.';
      recDoctor = 'Dr. Pradeep Nair (Senior Consultant Paediatrician)';
    }

    setAskResponse({ advice, recDoctor });
  };

  // --- SPECIALTY FILTER LOGIC (Search Bar ke liye) ---
  const filteredSpecialties = DOCTOR_SPECIALTIES.filter(spec => 
    spec.name.toLowerCase().includes(specialtySearchQuery.toLowerCase())
  );

  return (
    <div className="bg-light min-vh-100" style={{ backgroundColor: '#F8FAF9' }}>
      
      {/* ======================================================== */}
      {/* VIEW A: FIND DOCTORS LANDING PAGE */}
      {/* ======================================================== */}
      {viewMode === 'landing' ? (
        <div className="container-xl py-3 py-md-4">
          
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb mb-0" style={{ fontSize: '13px' }}>
              <li className="breadcrumb-item">
                <Link to="/" className="text-secondary text-decoration-none hover-green">Home</Link>
              </li>
              <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">
                Find Doctors
              </li>
            </ol>
          </nav>

          {/* Promo Banner */}
          <div 
            className="rounded-4 p-3 p-md-4 mb-4 position-relative overflow-hidden shadow-xs"
            style={{
              background: 'linear-gradient(90deg, #FDF4E3 0%, #FEEBD0 60%, #FEDEB3 100%)',
              border: '1px solid #F8DFBE'
            }}
          >
            <div className="row align-items-center">
              <div className="col-12 col-md-8 col-lg-7 z-1">
                <h2 className="fw-bold text-dark mb-2" style={{ fontSize: '26px', letterSpacing: '-0.3px' }}>
                  Consult At-Home with Cureon Doctors
                </h2>
                <p className="text-dark mb-3" style={{ fontSize: '14px', fontWeight: '500' }}>
                  Get <span className="fw-bold">FLAT 8% OFF</span> On Online Consultation With <span className="fw-bold text-success">CIRCLE</span> | Use Code: <span className="badge bg-dark text-white px-2 py-1">CIRCLECARE</span>
                </p>
                <button 
                  onClick={() => handleSelectSpecialty('General Physician')}
                  className="btn btn-dark px-4 py-2 fw-bold text-white shadow-xs"
                  style={{ borderRadius: '6px', fontSize: '14px' }}
                >
                  Consult Now
                </button>
              </div>

              <div className="col-12 col-md-4 col-lg-5 text-end d-none d-md-block z-1">
                <div className="d-inline-flex align-items-center gap-3 pe-3">
                  <div 
                    className="p-3 bg-white rounded-3 shadow-sm text-center border"
                    style={{ width: '130px', transform: 'rotate(-3deg)' }}
                  >
                    <div className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '44px', height: '44px', backgroundColor: '#E8F5E9' }}>
                      <SpecialtyIcon name="general" size={30} />
                    </div>
                    <div className="fw-bold text-dark" style={{ fontSize: '11px' }}>AuraMed MD</div>
                    <div className="text-success fw-bold" style={{ fontSize: '10px' }}> Video Live</div>
                  </div>

                  <div 
                    className="p-3 bg-white rounded-3 shadow-sm text-center border"
                    style={{ width: '120px', transform: 'rotate(3deg)' }}
                  >
                    <div className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '44px', height: '44px', backgroundColor: '#FFF3E0' }}>
                      <FaUser color="#E65100" size={20} />
                    </div>
                    <div className="fw-bold text-dark" style={{ fontSize: '11px' }}>At Home Patient</div>
                    <div className="text-muted" style={{ fontSize: '10px' }}>Instant Connect</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Browse by Specialties with SEARCH BAR */}
          <section className="mb-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-3">
              <h3 className="fw-bold text-dark mb-0" style={{ fontSize: '20px' }}>
                Browse by Specialties
              </h3>
              
              {/* Naya Search Bar Add Kiya */}
              <div className="position-relative" style={{ maxWidth: '350px', width: '100%' }}>
                <FaSearch className="position-absolute top-50 translate-middle-y ms-3 text-muted" size={14} />
                <input 
                  type="text"
                  className="form-control ps-5 py-2 border-secondary-subtle shadow-sm"
                  placeholder="Search specialties (e.g. Cardio)..."
                  value={specialtySearchQuery}
                  onChange={(e) => setSpecialtySearchQuery(e.target.value)}
                  style={{ borderRadius: '8px', fontSize: '14px' }}
                />
              </div>
            </div>

            <div className="row g-2 g-md-3">
              {filteredSpecialties.length > 0 ? (
                filteredSpecialties.map((spec) => (
                  <div key={spec.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                    <div
                      onClick={() => handleSelectSpecialty(spec.name)}
                      className="p-3 bg-white rounded-3 border text-center h-100 d-flex flex-column align-items-center justify-content-center cursor-pointer specialty-card-hover"
                      style={{
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        minHeight: '120px',
                        borderColor: '#E5E7EB'
                      }}
                      role="button"
                      tabIndex={0}
                      title={`Consult with ${spec.name} specialists`}
                    >
                      <div className="mb-2 d-flex align-items-center justify-content-center" style={{ height: '48px' }}>
                        <SpecialtyIcon name={spec.name} size={44} />
                      </div>
                      <div 
                        className="fw-semibold text-dark text-truncate w-100" 
                        style={{ fontSize: '13px', lineHeight: 1.25 }}
                      >
                        {spec.name}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-4">
                  <p className="text-muted">No specialties found matching "{specialtySearchQuery}"</p>
                  <button className="btn btn-sm btn-outline-success" onClick={() => setSpecialtySearchQuery('')}>Clear Search</button>
                </div>
              )}
            </div>
          </section>

          {/* Form Section */}
          <section className="mb-5">
            <div className="bg-white rounded-3 border p-3 p-md-4 shadow-xs" style={{ borderColor: '#E5E7EB' }}>
              <h4 className="fw-bold text-dark mb-3" style={{ fontSize: '18px' }}>
                Find a Doctor in 3 easy steps
              </h4>

              <form onSubmit={handleSearchSubmit}>
                <div className="row g-3 align-items-end">
                  
                  <div className="col-12 col-md-3">
                    <label className="form-label text-dark fw-bold mb-1" style={{ fontSize: '12px' }}>
                      Select Speciality<span className="text-danger">*</span>
                    </label>
                    <div className="position-relative">
                      <select 
                        className="form-select"
                        value={formSpecialty}
                        onChange={(e) => setFormSpecialty(e.target.value)}
                        style={{ height: '44px', fontSize: '14px', borderRadius: '6px' }}
                      >
                        <option value="All Specialties">All Specialties</option>
                        {DOCTOR_SPECIALTIES.map(s => (
                          <option key={s.id} value={s.name}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-12 col-md-3">
                    <label className="form-label text-dark fw-bold mb-1" style={{ fontSize: '12px' }}>
                      Select Date<span className="text-danger">*</span>
                    </label>
                    <div className="input-group" style={{ height: '44px' }}>
                      <input 
                        type="text" 
                        className="form-control"
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        placeholder="Today"
                        style={{ fontSize: '14px', borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px' }}
                      />
                      <span className="input-group-text bg-white border-start-0 text-muted" style={{ borderTopRightRadius: '6px', borderBottomRightRadius: '6px' }}>
                        <FaCalendarAlt size={14} />
                      </span>
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="form-label text-dark fw-bold mb-1" style={{ fontSize: '12px' }}>
                      Preferred Location/Pincode<span className="text-danger">*</span>
                    </label>
                    <div className="input-group" style={{ height: '44px' }}>
                      <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px' }}>
                        <FaMapMarkerAlt size={14} color="#159B64" />
                      </span>
                      <input 
                        type="text" 
                        className="form-control border-start-0 border-end-0"
                        value={formLocation}
                        onChange={(e) => setFormLocation(e.target.value)}
                        placeholder="Search location or pincode"
                        style={{ fontSize: '14px' }}
                      />
                      <span 
                        className="input-group-text bg-white border-start-0 text-muted cursor-pointer" 
                        title="Use Current Location"
                        onClick={() => setFormLocation('Visakhapatnam')}
                        style={{ borderTopRightRadius: '6px', borderBottomRightRadius: '6px', cursor: 'pointer' }}
                      >
                        <FaCrosshairs size={14} color="#005F40" />
                      </span>
                    </div>
                  </div>

                  <div className="col-12 col-md-2">
                    <button 
                      type="submit" 
                      className="btn w-100 fw-bold text-white d-flex align-items-center justify-content-center shadow-xs"
                      style={{ 
                        height: '44px', 
                        backgroundColor: '#005F40', 
                        borderRadius: '6px', 
                        fontSize: '15px' 
                      }}
                    >
                      Submit
                    </button>
                  </div>

                </div>
              </form>
            </div>
          </section>

          {/* Health Articles */}
          <section className="mb-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h3 className="fw-bold text-dark mb-0" style={{ fontSize: '20px' }}>
                Health Articles For You <span className="text-secondary fw-normal" style={{ fontSize: '16px' }}>(30)</span>
              </h3>
              <button 
                onClick={() => setReadingArticle(HEALTH_ARTICLES[0])}
                className="btn btn-link text-decoration-none fw-bold" 
                style={{ color: '#005F40', fontSize: '14px' }}
              >
                View All
              </button>
            </div>

            <div className="row g-3">
              {HEALTH_ARTICLES.map((art) => (
                <div key={art.id} className="col-12 col-sm-6 col-lg-2">
                  <div 
                    onClick={() => setReadingArticle(art)}
                    className="card h-100 border rounded-3 overflow-hidden shadow-xs cursor-pointer bg-white"
                    style={{ borderColor: '#E5E7EB', cursor: 'pointer', transition: 'transform 0.2s ease' }}
                    role="button"
                    tabIndex={0}
                  >
                    <div style={{ height: '110px', overflow: 'hidden' }}>
                      <img 
                        src={art.image} 
                        alt={art.title} 
                        className="w-100 h-100 object-fit-cover"
                      />
                    </div>
                    <div className="p-2 d-flex flex-column justify-content-between flex-grow-1">
                      <div 
                        className="fw-bold text-dark mb-2" 
                        style={{ 
                          fontSize: '12px', 
                          lineHeight: 1.3,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {art.title}
                      </div>
                      <div className="text-secondary" style={{ fontSize: '10px' }}>
                        {art.author} • {art.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      ) : (
        /* ======================================================== */
        /* VIEW B: DOCTORS LISTING VIEW (WITH LEFT SIDEBAR FILTERS) */
        /* ======================================================== */
        <div className="container-xl py-3 py-md-4">
          
          <div className="d-flex align-items-center justify-content-between mb-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0" style={{ fontSize: '13px' }}>
                <li className="breadcrumb-item">
                  <Link to="/" className="text-secondary text-decoration-none hover-green">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <span 
                    onClick={handleBackToLanding}
                    className="text-secondary cursor-pointer hover-green"
                    style={{ cursor: 'pointer' }}
                  >
                    Doctors
                  </span>
                </li>
                <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">
                  {activeSpecialty}
                </li>
              </ol>
            </nav>

            <button 
              onClick={handleBackToLanding}
              className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
              style={{ fontSize: '12px', borderRadius: '6px' }}
            >
              <FaArrowLeft size={10} /> Back to All Specialties
            </button>
          </div>

          <div className="row g-4">
            {/* LEFT SIDEBAR FILTERS */}
            <div className="col-12 col-lg-3">
              <div className="bg-white rounded-4 border p-3 shadow-xs sticky-top" style={{ top: '20px', borderColor: '#E5E7EB' }}>
                <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                  <h5 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2" style={{ fontSize: '16px' }}>
                    <FaFilter size={14} color="#005F40" /> Filter Options
                  </h5>
                  <button onClick={resetFilters} className="btn btn-link text-decoration-none text-secondary p-0" style={{ fontSize: '12px' }}>
                    Reset All
                  </button>
                </div>

                <div className="mb-4">
                  <label className="fw-bold text-dark mb-2" style={{ fontSize: '13px' }}>City</label>
                  <select 
                    className="form-select form-select-sm" 
                    value={selectedCity} 
                    onChange={(e) => setSelectedCity(e.target.value)}
                    style={{ fontSize: '13px', borderRadius: '6px' }}
                  >
                    <option value="All">All Cities</option>
                    {['Visakhapatnam', 'Hyderabad', 'Bangalore', 'New Delhi', 'Mumbai', 'Chennai', 'Kochi', 'Kolkata'].map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label className="fw-bold text-dark mb-0" style={{ fontSize: '13px' }}>Max Consultation Fee</label>
                    <span className="text-success fw-bold" style={{ fontSize: '12px' }}>₹{maxFee}</span>
                  </div>
                  <input 
                    type="range" 
                    className="form-range" 
                    min="500" 
                    max="1000" 
                    step="50"
                    value={maxFee} 
                    onChange={(e) => setMaxFee(Number(e.target.value))}
                  />
                  <div className="d-flex justify-content-between text-muted" style={{ fontSize: '10px' }}>
                    <span>₹500</span>
                    <span>₹1000</span>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="fw-bold text-dark mb-2" style={{ fontSize: '13px' }}>Experience</label>
                  <div className="d-flex flex-column gap-2">
                    {[0, 5, 10, 15].map(exp => (
                      <div className="form-check" key={exp}>
                        <input 
                          className="form-check-input" 
                          type="radio" 
                          name="experienceFilter" 
                          id={`exp-${exp}`}
                          checked={minExperience === exp}
                          onChange={() => setMinExperience(exp)}
                        />
                        <label className="form-check-label text-secondary" htmlFor={`exp-${exp}`} style={{ fontSize: '13px' }}>
                          {exp === 0 ? 'Any Experience' : `${exp}+ Years`}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: DOCTORS LIST */}
            <div className="col-12 col-lg-9">
              
              <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-4 gap-3">
                <div>
                  <h1 className="fw-bold text-dark mb-1" style={{ fontSize: '22px', letterSpacing: '-0.3px' }}>
                    Consult {activeSpecialty} Online
                  </h1>
                  <div className="text-secondary" style={{ fontSize: '13px' }}>
                    ({sortedDoctors.length} doctors found)
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <span className="text-secondary" style={{ fontSize: '13px' }}>Sort by:</span>
                  <div className="dropdown">
                    <button 
                      className="btn btn-white border bg-white d-flex align-items-center gap-2 px-3 py-1 shadow-xs"
                      type="button" 
                      data-bs-toggle="dropdown"
                      style={{ borderRadius: '6px', fontSize: '13px', borderColor: '#D1D5DB' }}
                    >
                      <span className="fw-medium">
                        {sortBy === 'relevance' && 'Relevance'}
                        {sortBy === 'price-low' && 'Price: Low to High'}
                        {sortBy === 'price-high' && 'Price: High to Low'}
                        {sortBy === 'experience' && 'Experience'}
                      </span>
                      <FaChevronDown size={10} className="text-muted ms-1" />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                      <li><button className="dropdown-item" onClick={() => setSortBy('relevance')}>Relevance</button></li>
                      <li><button className="dropdown-item" onClick={() => setSortBy('price-low')}>Price: Low to High</button></li>
                      <li><button className="dropdown-item" onClick={() => setSortBy('price-high')}>Price: High to Low</button></li>
                      <li><button className="dropdown-item" onClick={() => setSortBy('experience')}>Experience</button></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column gap-3 mb-5">
                {sortedDoctors.length === 0 ? (
                  <div className="text-center p-5 bg-white rounded-4 border">
                    <h5 className="text-dark fw-bold">No doctors found</h5>
                    <p className="text-secondary mb-3">Try adjusting your filters or max fee.</p>
                    <button onClick={resetFilters} className="btn btn-outline-success btn-sm">Reset Filters</button>
                  </div>
                ) : (
                  sortedDoctors.map((doc) => (
                    <div 
                      key={doc.id}
                      className="card border rounded-3 p-3 p-md-4 bg-white shadow-xs"
                      style={{ borderColor: '#E5E7EB' }}
                    >
                      <div className="row g-3 align-items-center">
                        
                        <div className="col-auto">
                          <img 
                            src={doc.avatar} 
                            alt={doc.name} 
                            className="rounded-2 object-fit-cover shadow-xs"
                            style={{ width: '84px', height: '84px' }}
                          />
                        </div>

                        <div className="col">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <h4 className="fw-bold text-dark mb-0" style={{ fontSize: '18px' }}>
                              {doc.name}
                            </h4>
                            <button 
                              onClick={() => setInfoDoctor(doc)}
                              className="btn btn-link p-0 text-muted border-0"
                              title="Doctor details"
                              style={{ lineHeight: 1 }}
                            >
                              <FaInfoCircle size={15} color="#9CA3AF" />
                            </button>
                          </div>

                          <div className="text-secondary mb-1" style={{ fontSize: '14px' }}>
                            {doc.roleTitle || doc.specialization}
                          </div>

                          <div 
                            className="fw-bold mb-1" 
                            style={{ color: '#4D2C91', fontSize: '13px', letterSpacing: '0.3px' }}
                          >
                            {doc.qualificationDisplay || `${doc.experienceYears || 10} YEARS • ${doc.qualification}`}
                          </div>

                          <div className="text-secondary" style={{ fontSize: '13px' }}>
                            {doc.city}
                          </div>
                          <div className="text-secondary" style={{ fontSize: '12px', color: '#6B7280' }}>
                            {doc.clinic || doc.hospital}
                          </div>
                        </div>

                        <div className="col-12 col-md-auto text-md-end d-flex flex-column align-items-md-end justify-content-between">
                          
                          <div className="mb-2">
                            <span 
                              className="badge px-2 py-1 fw-bold text-uppercase shadow-xs"
                              style={{
                                backgroundColor: '#EBF3FE',
                                color: '#1976D2',
                                border: '1px solid #C2DCFA',
                                fontSize: '11px',
                                letterSpacing: '0.5px'
                              }}
                            >
                              ON TIME GUARANTEE
                            </span>
                          </div>

                          <div className="fw-bold text-dark mb-2" style={{ fontSize: '24px' }}>
                            ₹{doc.inrFee || doc.fee}
                          </div>

                          <button 
                            onClick={() => handleOpenBooking(doc)}
                            className="btn px-4 py-2 text-center text-decoration-none shadow-xs"
                            style={{
                              border: '1.5px solid #007C89',
                              backgroundColor: '#FFFFFF',
                              borderRadius: '8px',
                              color: '#007C89',
                              minWidth: '220px',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#F0F9FA';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#FFFFFF';
                            }}
                          >
                            <div className="fw-bold" style={{ fontSize: '14px' }}>
                              Online Consult
                            </div>
                            <div style={{ fontSize: '12px', opacity: 0.9 }}>
                              {doc.availableIn || 'Available in 16 minutes'}
                            </div>
                          </button>

                        </div>

                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* --- MODALS --- */}
      {bookingDoctor && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1060 }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 border-0 shadow-lg">
              
              <div className="modal-header border-bottom pb-3">
                <div className="d-flex align-items-center gap-2">
                  <div className="p-2 rounded-circle" style={{ backgroundColor: '#E8F5E9' }}>
                    <FaVideo color="#005F40" size={18} />
                  </div>
                  <div>
                    <h5 className="modal-title fw-bold text-dark mb-0" style={{ fontSize: '18px' }}>
                      Book Online Consultation
                    </h5>
                    <small className="text-secondary" style={{ fontSize: '12px' }}>
                      Instant secure telehealth powered by AuraMed 24|7
                    </small>
                  </div>
                </div>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setBookingDoctor(null)}
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body p-4">
                {bookingSuccess ? (
                  <div className="text-center py-4">
                    <div 
                      className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center text-white"
                      style={{ width: '64px', height: '64px', backgroundColor: '#159B64' }}
                    >
                      <FaCheckCircle size={36} />
                    </div>
                    <h4 className="fw-bold text-dark mb-2">Consultation Confirmed!</h4>
                    <p className="text-secondary mb-3" style={{ fontSize: '14px', maxWidth: '420px', margin: '0 auto' }}>
                      Your appointment with <span className="fw-bold text-dark">{bookingDoctor.name}</span> has been confirmed for <strong>{bookingSuccess.slot}</strong>.
                    </p>
                    <div className="p-3 bg-light rounded-3 mb-4 text-start" style={{ maxWidth: '450px', margin: '0 auto' }}>
                      <div className="d-flex justify-content-between mb-1" style={{ fontSize: '13px' }}>
                        <span className="text-muted">Appointment ID:</span>
                        <span className="fw-bold text-dark">{bookingSuccess.id}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-1" style={{ fontSize: '13px' }}>
                        <span className="text-muted">Doctor:</span>
                        <span className="fw-bold text-dark">{bookingDoctor.name}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-1" style={{ fontSize: '13px' }}>
                        <span className="text-muted">Consultation Mode:</span>
                        <span className="fw-bold text-success">{consultationMode}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-1" style={{ fontSize: '13px' }}>
                        <span className="text-muted">Consultation Fee:</span>
                        <span className="fw-bold text-dark">₹{bookingSuccess.consultationFee}</span>
                      </div>
                      <div className="d-flex justify-content-between" style={{ fontSize: '13px' }}>
                        <span className="text-muted">Digital Meeting:</span>
                        <span className="text-primary fw-bold text-truncate" style={{ maxWidth: '200px' }}>
                          Ready in Room
                        </span>
                      </div>
                    </div>

                    <div className="d-flex justify-content-center gap-3">
                      <button 
                        onClick={() => setBookingDoctor(null)} 
                        className="btn btn-dark px-4 py-2"
                        style={{ borderRadius: '6px' }}
                      >
                        Done
                      </button>
                      <Link 
                        to="/Profile" 
                        className="btn btn-outline-success px-4 py-2"
                        style={{ borderRadius: '6px' }}
                      >
                        View in Dashboard
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleConfirmBooking}>
                    <div className="p-3 rounded-3 bg-light border mb-4 d-flex align-items-center gap-3">
                      <img 
                        src={bookingDoctor.avatar} 
                        alt={bookingDoctor.name} 
                        className="rounded-2 object-fit-cover"
                        style={{ width: '60px', height: '60px' }}
                      />
                      <div className="flex-grow-1">
                        <div className="fw-bold text-dark" style={{ fontSize: '16px' }}>{bookingDoctor.name}</div>
                        <div className="text-secondary" style={{ fontSize: '12px' }}>{bookingDoctor.roleTitle || bookingDoctor.specialization}</div>
                        <div className="fw-bold" style={{ color: '#4D2C91', fontSize: '12px' }}>{bookingDoctor.qualificationDisplay}</div>
                      </div>
                      <div className="text-end">
                        <span className="badge px-2 py-1 mb-1" style={{ backgroundColor: '#EBF3FE', color: '#1976D2', fontSize: '10px' }}>
                          ON TIME GUARANTEE
                        </span>
                        <div className="fw-bold text-dark" style={{ fontSize: '18px' }}>₹{bookingDoctor.inrFee || bookingDoctor.fee}</div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold text-dark" style={{ fontSize: '13px' }}>
                        Select Consultation Mode
                      </label>
                      <div className="row g-2">
                        {[
                          { mode: 'Video Consultation', icon: <FaVideo />, desc: 'HD Telehealth with prescription' },
                          { mode: 'Audio Call', icon: <FaPhoneAlt />, desc: 'Direct phone consult' },
                          { mode: 'In-Clinic Visit', icon: <FaHospital />, desc: 'Walk-in at registered center' }
                        ].map(m => (
                          <div key={m.mode} className="col-4">
                            <div 
                              onClick={() => setConsultationMode(m.mode)}
                              className={`p-2 border rounded text-center cursor-pointer ${consultationMode === m.mode ? 'border-success bg-white shadow-xs' : 'bg-light'}`}
                              style={{ 
                                cursor: 'pointer',
                                borderWidth: consultationMode === m.mode ? '2px' : '1px'
                              }}
                            >
                              <div className={consultationMode === m.mode ? 'text-success' : 'text-muted'}>{m.icon}</div>
                              <div className="fw-bold mt-1" style={{ fontSize: '12px' }}>{m.mode}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold text-dark d-flex align-items-center justify-content-between" style={{ fontSize: '13px' }}>
                        <span>Available Slots (Today)</span>
                        <span className="text-success fw-bold" style={{ fontSize: '11px' }}>● Fast Telehealth Response</span>
                      </label>
                      <div className="d-flex flex-wrap gap-2">
                        {bookingDoctor.slots?.map(slot => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`btn btn-sm ${selectedSlot === slot ? 'btn-success' : 'btn-outline-secondary'}`}
                            style={{ fontSize: '12px', borderRadius: '6px' }}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-8">
                        <label className="form-label fw-bold text-dark" style={{ fontSize: '12px' }}>Patient Full Name</label>
                        <input 
                          type="text" 
                          className="form-control"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          required
                          style={{ fontSize: '13px' }}
                        />
                      </div>
                      <div className="col-4">
                        <label className="form-label fw-bold text-dark" style={{ fontSize: '12px' }}>Age</label>
                        <input 
                          type="number" 
                          className="form-control"
                          value={patientAge}
                          onChange={(e) => setPatientAge(e.target.value)}
                          style={{ fontSize: '13px' }}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-bold text-dark" style={{ fontSize: '12px' }}>Health Concern / Symptoms (Optional)</label>
                        <input 
                          type="text" 
                          className="form-control"
                          placeholder="e.g. Mild fever, dry cough, acidity since 2 days"
                          value={patientProblem}
                          onChange={(e) => setPatientProblem(e.target.value)}
                          style={{ fontSize: '13px' }}
                        />
                      </div>
                    </div>

                    <div className="p-3 rounded bg-light border mb-4">
                      <div className="d-flex justify-content-between text-secondary mb-1" style={{ fontSize: '12px' }}>
                        <span>Consultation Fee</span>
                        <span>₹{bookingDoctor.inrFee || bookingDoctor.fee}</span>
                      </div>
                      <div className="d-flex justify-content-between text-success mb-1" style={{ fontSize: '12px' }}>
                        <span>CIRCLE Member Discount (8% OFF)</span>
                        <span>- ₹{Math.round((bookingDoctor.inrFee || bookingDoctor.fee) * 0.08)}</span>
                      </div>
                      <div className="d-flex justify-content-between text-secondary mb-2" style={{ fontSize: '12px' }}>
                        <span>Digital Platform Fee</span>
                        <span className="text-success fw-bold">FREE</span>
                      </div>
                      <div className="d-flex justify-content-between border-top pt-2 fw-bold text-dark" style={{ fontSize: '15px' }}>
                        <span>Total Payable Amount</span>
                        <span>₹{(bookingDoctor.inrFee || bookingDoctor.fee) - Math.round((bookingDoctor.inrFee || bookingDoctor.fee) * 0.08)}</span>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                      <button 
                        type="button" 
                        onClick={() => setBookingDoctor(null)}
                        className="btn btn-outline-secondary"
                        style={{ fontSize: '13px', borderRadius: '6px' }}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="btn fw-bold text-white px-4"
                        style={{ backgroundColor: '#005F40', fontSize: '14px', borderRadius: '6px' }}
                      >
                        Confirm & Pay Consultation
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {infoDoctor && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1060 }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg">
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-bold text-dark" style={{ fontSize: '16px' }}>Doctor Profile</h5>
                <button type="button" className="btn-close" onClick={() => setInfoDoctor(null)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <img 
                    src={infoDoctor.avatar} 
                    alt={infoDoctor.name} 
                    className="rounded-circle object-fit-cover shadow-xs"
                    style={{ width: '70px', height: '70px' }}
                  />
                  <div>
                    <h5 className="fw-bold text-dark mb-0">{infoDoctor.name}</h5>
                    <div className="text-secondary" style={{ fontSize: '13px' }}>{infoDoctor.roleTitle}</div>
                    <div className="fw-bold" style={{ color: '#4D2C91', fontSize: '12px' }}>{infoDoctor.qualificationDisplay}</div>
                  </div>
                </div>

                <div className="mb-3">
                  <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '13px' }}>About Doctor</h6>
                  <p className="text-secondary mb-0" style={{ fontSize: '13px', lineHeight: 1.5 }}>
                    {infoDoctor.about || 'Senior practicing clinician certified by national medical boards, providing expert remote consultations.'}
                  </p>
                </div>

                <div className="p-3 bg-light rounded-3 mb-3">
                  <div className="row g-2 text-center">
                    <div className="col-4">
                      <div className="fw-bold text-dark" style={{ fontSize: '15px' }}>{infoDoctor.rating} ★</div>
                      <small className="text-muted" style={{ fontSize: '11px' }}>Rating</small>
                    </div>
                    <div className="col-4">
                      <div className="fw-bold text-dark" style={{ fontSize: '15px' }}>₹{infoDoctor.inrFee || infoDoctor.fee}</div>
                      <small className="text-muted" style={{ fontSize: '11px' }}>Fee</small>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <button 
                    onClick={() => {
                      const doc = infoDoctor;
                      setInfoDoctor(null);
                      handleOpenBooking(doc);
                    }}
                    className="btn fw-bold text-white w-100"
                    style={{ backgroundColor: '#005F40', borderRadius: '6px' }}
                  >
                    Proceed to Online Consult
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAskModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1060 }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 border-0 shadow-lg">
              <div 
                className="modal-header text-white"
                style={{ background: 'linear-gradient(90deg, #E8592A 0%, #EE6736 100%)' }}
              >
                <div className="d-flex align-items-center gap-2">
                  <span style={{ fontSize: '20px' }}>✨</span>
                  <h5 className="modal-title fw-bold text-white mb-0" style={{ fontSize: '18px' }}>
                    Ask AuraMed <span className="badge bg-dark text-white ms-1" style={{ fontSize: '10px' }}>beta</span>
                  </h5>
                </div>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowAskModal(false)}></button>
              </div>

              <div className="modal-body p-4">
                <p className="text-secondary mb-3" style={{ fontSize: '14px' }}>
                  Ask any health symptom or clinical question. Our medical triage assistant answers instantly and suggests verified AuraMed doctors to consult.
                </p>

                <form onSubmit={handleAskAuraMed} className="mb-4">
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="e.g. What causes sudden severe dandruff and itching? Or chest tightness?"
                      value={askQuery}
                      onChange={(e) => setAskQuery(e.target.value)}
                      style={{ height: '48px', fontSize: '14px' }}
                    />
                    <button 
                      type="submit" 
                      className="btn text-white fw-bold px-4"
                      style={{ backgroundColor: '#E8592A' }}
                    >
                      Ask
                    </button>
                  </div>
                </form>

                {askResponse && (
                  <div className="p-3 bg-light rounded-3 border">
                    <h6 className="fw-bold text-dark mb-2" style={{ fontSize: '14px' }}>
                      Clinical Guidance:
                    </h6>
                    <p className="text-dark mb-3" style={{ fontSize: '14px', lineHeight: 1.5 }}>
                      {askResponse.advice}
                    </p>
                    <div className="p-2 bg-white rounded border d-flex align-items-center justify-content-between">
                      <div>
                        <div className="text-secondary" style={{ fontSize: '11px' }}>Recommended Specialist:</div>
                        <div className="fw-bold text-dark" style={{ fontSize: '13px' }}>{askResponse.recDoctor}</div>
                      </div>
                      <button 
                        onClick={() => {
                          setShowAskModal(false);
                          handleSelectSpecialty('General Physician');
                        }}
                        className="btn btn-sm btn-outline-success fw-bold"
                        style={{ fontSize: '12px' }}
                      >
                        Find Doctor
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {readingArticle && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1060 }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
              <div className="position-relative" style={{ height: '220px' }}>
                <img 
                  src={readingArticle.image} 
                  alt={readingArticle.title} 
                  className="w-100 h-100 object-fit-cover"
                />
                <button 
                  type="button" 
                  className="btn-close position-absolute top-0 end-0 m-3 bg-white p-2 rounded-circle"
                  onClick={() => setReadingArticle(null)}
                ></button>
              </div>
              <div className="modal-body p-4">
                <span className="badge bg-light text-success border border-success mb-2">
                  {readingArticle.category} • {readingArticle.readTime}
                </span>
                <h4 className="fw-bold text-dark mb-2">{readingArticle.title}</h4>
                <div className="text-secondary mb-3" style={{ fontSize: '12px' }}>
                  {readingArticle.author} • Published on {readingArticle.date}
                </div>
                <p className="text-secondary" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                  Maintaining regular clinical awareness is the cornerstone of proactive healthcare. Whether evaluating vital biomarkers, managing daily scalp hygiene, or tracking glucose variances, always ensure batch-tested medical equipment and consult verified specialists.
                </p>
                <div className="d-flex justify-content-end">
                  <button 
                    onClick={() => setReadingArticle(null)}
                    className="btn btn-dark"
                    style={{ borderRadius: '6px' }}
                  >
                    Close Article
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}