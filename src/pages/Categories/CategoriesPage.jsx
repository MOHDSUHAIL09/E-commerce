import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCapsules, FaPills, FaHeartbeat, FaHeart, FaLeaf, 
  FaBaby, FaPumpSoap, FaSmileBeam, FaCut, FaBandAid, 
  FaMedkit, FaStethoscope, FaRunning, FaWalking, FaEye, 
  FaTooth, FaProcedures, FaDumbbell, FaPrescriptionBottleAlt,
  FaSearch, FaArrowRight
} from 'react-icons/fa';

export const CATEGORIES = [
  { id: 'cat-1', name: 'Prescription Medicines', slug: 'prescription-medicines', icon: 'FaPrescriptionBottleAlt', description: 'Doctor prescribed ethical medicines & generics' },
  { id: 'cat-2', name: 'OTC Medicines', slug: 'otc-medicines', icon: 'FaPills', description: 'Everyday over-the-counter remedies & fever care' },
  { id: 'cat-3', name: 'Diabetes Care', slug: 'diabetes-care', icon: 'FaHeartbeat', description: 'Glucometers, strips, sugar substitutes & foot care' },
  { id: 'cat-4', name: 'Cardiac Care', slug: 'cardiac-care', icon: 'FaHeart', description: 'Blood pressure support, omega-3 & heart health' },
  { id: 'cat-5', name: 'Ayurvedic Medicines', slug: 'ayurvedic-medicines', icon: 'FaLeaf', description: 'Pure herbal extracts, chyawanprash & immunity boosters' },
  { id: 'cat-6', name: 'Vitamins & Supplements', slug: 'vitamins-supplements', icon: 'FaCapsules', description: 'Multivitamins, Vitamin C, D3, Zinc, Calcium' },
  { id: 'cat-7', name: 'Protein & Nutrition', slug: 'protein-nutrition', icon: 'FaDumbbell', description: 'Whey protein, plant protein, creatine & shakes' },
  { id: 'cat-8', name: 'Baby & Mother Care', slug: 'baby-mother-care', icon: 'FaBaby', description: 'Baby food, diapers, gentle skin care & maternal care' },
  { id: 'cat-9', name: 'Personal Care', slug: 'personal-care', icon: 'FaPumpSoap', description: 'Soaps, handwashes, deodorants & grooming essentials' },
  { id: 'cat-10', name: 'Skin Care', slug: 'skin-care', icon: 'FaSmileBeam', description: 'Dermatologist tested sunscreens, cleansers & moisturizers' },
  { id: 'cat-11', name: 'Hair Care', slug: 'hair-care', icon: 'FaCut', description: 'Anti-dandruff shampoos, hair serums & biotin tablets' },
  { id: 'cat-12', name: 'Pain Relief', slug: 'pain-relief', icon: 'FaBandAid', description: 'Analgesic sprays, balms, heat patches & gel ointments' },
  { id: 'cat-13', name: 'First Aid', slug: 'first-aid', icon: 'FaMedkit', description: 'Antiseptics, bandages, medical cotton & gauze' },
  { id: 'cat-14', name: 'Medical Devices', slug: 'medical-devices', icon: 'FaStethoscope', description: 'Digital BP monitors, pulse oximeters & nebulizers' },
  { id: 'cat-15', name: 'Health & Fitness', slug: 'health-fitness', icon: 'FaRunning', description: 'Smart scales, compression socks & fitness accessories' },
  { id: 'cat-16', name: 'Orthopedic Products', slug: 'orthopedic-products', icon: 'FaWalking', description: 'Knee braces, cervical collars & lumbar support belts' },
  { id: 'cat-17', name: 'Eye Care', slug: 'eye-care', icon: 'FaEye', description: 'Lubricating drops, contact lens solutions & eye wipes' },
  { id: 'cat-18', name: 'Dental Care', slug: 'dental-care', icon: 'FaTooth', description: 'Sensory toothpastes, electric brushes & mouthwashes' },
  { id: 'cat-19', name: 'Surgical Supplies', slug: 'surgical-supplies', icon: 'FaProcedures', description: 'Surgical masks, nitrile gloves & sterile dressings' }
];

const ICON_MAP = {
  FaPrescriptionBottleAlt: <FaPrescriptionBottleAlt />,
  FaPills: <FaPills />,
  FaHeartbeat: <FaHeartbeat />,
  FaHeart: <FaHeart />,
  FaLeaf: <FaLeaf />,
  FaCapsules: <FaCapsules />,
  FaDumbbell: <FaDumbbell />,
  FaBaby: <FaBaby />,
  FaPumpSoap: <FaPumpSoap />,
  FaSmileBeam: <FaSmileBeam />,
  FaCut: <FaCut />,
  FaBandAid: <FaBandAid />,
  FaMedkit: <FaMedkit />,
  FaStethoscope: <FaStethoscope />,
  FaRunning: <FaRunning />,
  FaWalking: <FaWalking />,
  FaEye: <FaEye />,
  FaTooth: <FaTooth />,
  FaProcedures: <FaProcedures />
};

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = CATEGORIES.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-5" style={{ backgroundColor: '#FAFAFA', minHeight: '100vh' }}>
      <div className="container-xl">
        
        {/* Header */}
        <div className="text-center mb-5">
          <span className="badge bg-light-green text-dark-green fw-semibold px-3 py-1 mb-3">
            ALL 19 HEALTHCARE VERTICALS
          </span>
          <h2 className="display-6 fw-bold text-dark mb-2">Explore All Categories</h2>
          
          {/* Category Search */}
          <div className="mx-auto mt-4" style={{ maxWidth: '440px' }}>
            <div className="input-group shadow-sm rounded-pill overflow-hidden border">
              <span className="input-group-text bg-white border-0 ps-4">
                <FaSearch color="#64756D" />
              </span>
              <input
                type="text"
                className="form-control border-0 ps-2 shadow-none"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Categories Grid (Fixed Mobile 2 cards per row) */}
        <div className="row g-3">
          {filteredCategories.map((cat) => (
            <div key={cat.id} className="col-6 col-sm-4 col-md-3 col-lg-3">
              <Link to={`/categories/${cat.slug}`} className="text-decoration-none">
                <div className="bg-white border rounded-4 p-3 p-md-4 h-100 shadow-sm transition-all text-center text-md-start hover-shadow" style={{ transition: 'all 0.3s' }}>
                  <div 
                    className="rounded-circle bg-light-green text-success d-flex align-items-center justify-content-center mb-2 mb-md-3 mx-auto mx-md-0"
                    style={{ width: '45px', height: '45px', fontSize: '18px' }}
                  >
                    {ICON_MAP[cat.icon] || <FaCapsules />}
                  </div>
                  <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '13px' }}>{cat.name}</h6>
                  <p className="text-secondary mb-2 d-none d-md-block line-clamp-2" style={{ fontSize: '11px', minHeight: '30px' }}>
                    {cat.description}
                  </p>
                  
                  <div className="d-none d-md-flex align-items-center justify-content-between pt-2 border-top text-secondary" style={{ fontSize: '11px' }}>
                    <span className="d-flex align-items-center gap-1 fw-bold text-success">
                      Explore <FaArrowRight size={10} />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}