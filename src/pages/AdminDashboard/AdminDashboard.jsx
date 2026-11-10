import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaDollarSign, FaShoppingBag, FaUsers, FaFileMedicalAlt, 
  FaPlus, FaTrashAlt, FaEdit, FaSearch, FaChartLine, 
  FaBoxOpen, FaExclamationTriangle, FaCheck, FaTimes,
  FaArrowUp, FaArrowDown, FaBars, FaTachometerAlt, 
  FaCog, FaSignOutAlt, FaUserMd, FaBell, FaHome,
  FaBox, FaLayerGroup, FaCloudUploadAlt, FaImage, FaTags
} from 'react-icons/fa';
import { useHealthcare } from '../../context/HealthcareContext';
import { CATEGORIES } from '../Categories/CategoriesPage';
import cureonlogo from '../../assets/images/cureon-logo.png'

// ✅ Donut Chart Component
const DonutChart = ({ percentage, color, label }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="position-relative d-flex align-items-center justify-content-center mx-auto" style={{ width: '130px', height: '130px' }}>
      <svg width="130" height="130" viewBox="0 0 130 130">
        <circle cx="65" cy="65" r={radius} fill="transparent" stroke="#F1F5F9" strokeWidth="14" />
        <circle 
          cx="65" cy="65" r={radius} fill="transparent" 
          stroke={color} strokeWidth="14" 
          strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} 
          strokeLinecap="round" transform="rotate(-90 65 65)"
          style={{ transition: 'stroke-dashoffset 0.8s ease-in-out' }}
        />
      </svg>
      <div className="position-absolute text-center d-flex flex-column align-items-center justify-content-center">
        <span className="fw-semibold text-muted mb-1" style={{ fontSize: '11px', letterSpacing: '0.3px', textTransform: 'uppercase' }}>
          {label}
        </span>
        <span className="fw-bolder" style={{ fontSize: '22px', color: '#1E293B', lineHeight: '1' }}>
          {percentage}%
        </span>
      </div>
    </div>
  );
};

// ✅ Dummy Image Suggestions
const SUGGESTED_IMAGES = [
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1550572017-edb9dbcc5b17?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&auto=format&fit=crop&q=80'
];

const INITIAL_PRODUCT_STATE = {
  name: '', brand: '', manufacturer: '', category: 'Vitamins & Supplements',
  price: 15.00, mrp: 20.00, discount: 25, stock: 50, prescriptionRequired: false,
  image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
  description: 'High-quality therapeutic formulation.', composition: 'Standardized active pharmaceutical ingredient (500mg).',
  uses: 'Daily healthcare and wellness maintenance.', dosage: '1 tablet daily with water.', storage: 'Store in cool dry environment.'
};

export default function AdminDashboard() {
  const { 
    productsList, orders, prescriptions, doctorAppointments, labBookings, 
    addProduct, editProduct, deleteProduct, updateOrderStatus
  } = useHealthcare();

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState('overview');
  const [productSearch, setProductSearch] = useState('');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [newProd, setNewProd] = useState(INITIAL_PRODUCT_STATE);

  // Lock body scroll
  useEffect(() => {
    if (showAddProductModal || deleteTarget || isNotificationsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showAddProductModal, deleteTarget, isNotificationsOpen]);

  // --- Dynamic Calculations ---
  const totalRevenue = useMemo(() => orders.reduce((sum, order) => sum + (order.total || 0), 0), [orders]);
  const lowStockCount = useMemo(() => productsList.filter(p => p.stock <= 20).length, [productsList]);
  const pendingRxCount = prescriptions.filter(p => p.status === 'Pending Verification').length;
  const totalCatalog = productsList.length;
  const totalStockUnits = productsList.reduce((sum, p) => sum + (p.stock || 0), 0);

  // ✅ Notifications
  const notifications = useMemo(() => {
    const alerts = [];
    if (lowStockCount > 0) {
      alerts.push({
        id: 'low-stock', type: 'warning', title: 'Low Stock Alert',
        message: `${lowStockCount} item(s) are running low on stock. Please update inventory.`,
        icon: <FaExclamationTriangle className="text-warning" size={18} />,
        action: () => { setActiveTab('products'); setIsNotificationsOpen(false); }
      });
    }
    if (pendingRxCount > 0) {
      alerts.push({
        id: 'pending-rx', type: 'info', title: 'Pending Prescriptions',
        message: `You have ${pendingRxCount} new prescription(s) waiting for pharmacist verification.`,
        icon: <FaFileMedicalAlt className="text-primary" size={18} />,
        action: () => { setActiveTab('prescriptions'); setIsNotificationsOpen(false); }
      });
    }
    if (alerts.length === 0) {
      alerts.push({
        id: 'no-alerts', type: 'success', title: 'All Caught Up!',
        message: 'You have no new notifications at the moment.',
        icon: <FaCheck className="text-success" size={18} />,
        action: () => setIsNotificationsOpen(false)
      });
    }
    return alerts;
  }, [lowStockCount, pendingRxCount]);

  // ✅ Price Calculations
  const calculateDiscount = () => {
    const price = Number(newProd.price) || 0;
    const mrp = Number(newProd.mrp) || 0;
    if (mrp > price && mrp > 0) {
      const savedAmount = mrp - price;
      const percent = Math.round((savedAmount / mrp) * 100);
      return { savedAmount: savedAmount.toFixed(2), percent };
    }
    return { savedAmount: 0, percent: 0 };
  };
  const discountInfo = calculateDiscount();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setNewProd({ ...newProd, image: reader.result }); };
      reader.readAsDataURL(file);
    }
  };

  const openAddProductModal = () => {
    setNewProd(INITIAL_PRODUCT_STATE);
    setShowSuggestions(false);
    setShowAddProductModal(true);
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (newProd.name && newProd.brand) {
      addProduct({ ...newProd, price: Number(newProd.price), mrp: Number(newProd.mrp), stock: Number(newProd.stock) });
      setShowAddProductModal(false);
      setNewProd(INITIAL_PRODUCT_STATE);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) { deleteProduct(deleteTarget.id); setDeleteTarget(null); }
  };

  const filteredInventory = productsList.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const sidebarLinks = [
    { id: 'home', label: 'Back to Home', icon: <FaHome />, action: () => navigate('/') }, 
    { id: 'overview', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { id: 'add-medicine', label: 'Add Medicine', icon: <FaPlus />, action: () => openAddProductModal() },
    { id: 'products', label: 'Inventory', icon: <FaBoxOpen />, count: productsList.length },
    { id: 'orders', label: 'Orders', icon: <FaShoppingBag />, count: orders.length },
    { id: 'prescriptions', label: 'Prescriptions', icon: <FaFileMedicalAlt />, count: pendingRxCount },
  ];

  const systemLinks = [
    { id: 'doctors', label: 'Doctors', icon: <FaUserMd /> },
    { id: 'patients', label: 'Patients', icon: <FaUsers /> },
    { id: 'settings', label: 'Settings', icon: <FaCog /> },
  ];

  return (
    <div className="admin-layout-wrapper" style={{ backgroundColor: '#F8FAF9' }}>
      
      {/* SIDEBAR */}
      <aside 
        className={`admin-sidebar bg-white border-end shadow-sm d-flex flex-column ${
          isMobileSidebarOpen ? 'mobile-open' : ''
        } ${isSidebarCollapsed ? 'desktop-collapsed' : 'desktop-expanded'}`}
      >
        <div className="border-bottom d-flex align-items-center px-4" style={{ height: '70px', flexShrink: 0, padding: isSidebarCollapsed ? '0 10px' : '0 20px' }}>
          <img src={cureonlogo} alt="CureOn Logo" style={{ maxHeight: isSidebarCollapsed ? '35px' : '45px', maxWidth: '100%', objectFit: 'contain', transition: 'all 0.3s ease', cursor: 'pointer' }} onClick={() => navigate('/')} />
        </div>

        <div className="flex-grow-1 overflow-auto py-3 px-2">
          {sidebarLinks.map((link) => (
            <button key={link.id} onClick={() => { if (link.action) { link.action(); } else { setActiveTab(link.id); } setIsMobileSidebarOpen(false); }}
              className={`btn w-100 text-start d-flex align-items-center mb-1 rounded-3 ${isSidebarCollapsed ? 'justify-content-center flex-column py-2' : 'justify-content-between px-3 py-2'} ${activeTab === link.id ? 'bg-success-subtle text-success fw-bold' : 'text-secondary fw-semibold bg-transparent hover-bg-light'}`}
              style={{ border: 'none', transition: 'all 0.2s' }} title={link.label}
            >
              <div className={`d-flex align-items-center ${isSidebarCollapsed ? 'justify-content-center flex-column' : 'gap-3'}`}>
                <span style={{ fontSize: '18px' }} className="flex-shrink-0">{link.icon}</span>
                <span className={`text-nowrap ${isSidebarCollapsed ? 'mt-1' : ''}`} style={{ fontSize: isSidebarCollapsed ? '9.5px' : '13.5px', lineHeight: '1.1' }}>{link.label}</span>
              </div>
              {link.count !== undefined && !isSidebarCollapsed && (
                <span className={`badge rounded-pill ${activeTab === link.id ? 'bg-success text-white' : 'bg-light text-dark border'}`} style={{ fontSize: '10px' }}>{link.count}</span>
              )}
            </button>
          ))}
          <hr className="my-3 text-muted opacity-25" />
          {!isSidebarCollapsed && <small className="text-muted fw-bold px-2 mb-2 d-block" style={{ fontSize: '10px', letterSpacing: '1px' }}>SYSTEM</small>}
          {systemLinks.map((link) => (
            <button key={link.id} className={`btn w-100 text-start d-flex align-items-center mb-1 rounded-3 text-secondary fw-semibold bg-transparent hover-bg-light ${isSidebarCollapsed ? 'justify-content-center flex-column py-2' : 'justify-content-start px-3 py-2'}`} style={{ border: 'none' }} title={link.label}>
              <div className={`d-flex align-items-center ${isSidebarCollapsed ? 'justify-content-center flex-column' : 'gap-3'}`}>
                <span style={{ fontSize: '18px' }} className="flex-shrink-0">{link.icon}</span>
                <span className={`text-nowrap ${isSidebarCollapsed ? 'mt-1' : ''}`} style={{ fontSize: isSidebarCollapsed ? '9.5px' : '13.5px', lineHeight: '1.1' }}>{link.label}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="p-3 border-top" style={{ flexShrink: 0 }}>
          <button className={`btn btn-light w-100 border text-danger fw-semibold d-flex align-items-center justify-content-center ${isSidebarCollapsed ? 'px-0 flex-column py-2' : 'gap-2 py-2'}`}>
            <FaSignOutAlt /> <span className={isSidebarCollapsed ? 'mt-1' : ''} style={{ fontSize: isSidebarCollapsed ? '9.5px' : '13.5px' }}>Logout</span>
          </button>
        </div>
      </aside>

      {isMobileSidebarOpen && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-lg-none" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }} onClick={() => setIsMobileSidebarOpen(false)}></div>
      )}

      {/* MAIN CONTENT */}
      <main className={`admin-main-content ${isSidebarCollapsed ? 'content-expanded' : 'content-normal'}`}>
        
        <header className="admin-header bg-white border-bottom shadow-xs d-flex align-items-center justify-content-between px-3 px-md-4">
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-light border p-2 d-flex align-items-center justify-content-center" onClick={() => { if (window.innerWidth < 992) { setIsMobileSidebarOpen(!isMobileSidebarOpen); } else { setIsSidebarCollapsed(!isSidebarCollapsed); } }}>
              <FaBars size={16} />
            </button>
            <div className="d-none d-md-block">
              <h6 className="fw-bold mb-0 text-dark">HIII</h6>
              <small className="text-muted" style={{ fontSize: '11px' }}>Welcome back, Admin</small>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 gap-md-3">
            <button className="btn btn-light border p-2 rounded-circle position-relative" onClick={() => setIsNotificationsOpen(true)}>
              <FaBell size={16} className="text-secondary" />
              {notifications[0]?.id !== 'no-alerts' && (
                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
              )}
            </button>
            <div className="d-flex align-items-center gap-2 border-start ps-2 ps-md-3">
              <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '34px', height: '34px', fontSize: '13px' }}>AD</div>
            </div>
          </div>
        </header>

        <div className="admin-body-scroll p-3 p-md-4">
          <ul className="nav nav-pills gap-2 mb-4 bg-white p-2 rounded border shadow-sm overflow-auto flex-nowrap hide-scrollbar">
            {sidebarLinks.filter(l => l.id !== 'add-medicine' && l.id !== 'home').map(link => (
              <li className="nav-item" key={link.id}>
                <button className={`btn btn-sm text-nowrap ${activeTab === link.id ? 'btn-auramed' : 'btn-light text-dark'}`} onClick={() => setActiveTab(link.id)}>
                  {link.label} {link.count !== undefined && `(${link.count})`}
                </button>
              </li>
            ))}
          </ul>

          {/* 1. OVERVIEW & ANALYTICS */}
          {activeTab === 'overview' && (
            <div>
              {/* ✅ CHANGED TO col-6 for mobile 2-2 layout */}
              <div className="row g-3 mb-4">
                <div className="col-6 col-lg-3">
                  <div className="card-auramed p-3 h-100 border-0 shadow-sm">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="text-secondary fw-semibold" style={{ fontSize: '12px' }}>Gross Revenue</span>
                      <div className="p-2 rounded-circle bg-light-green text-primary-green"><FaDollarSign /></div>
                    </div>
                    <div className="fs-5 fs-md-3 fw-bold text-dark">₹{totalRevenue.toLocaleString('en-IN')}</div>
                    <small className="text-success fw-semibold d-none d-md-block">↑ 18.4% from last month</small>
                  </div>
                </div>
                <div className="col-6 col-lg-3">
                  <div className="card-auramed p-3 h-100 border-0 shadow-sm">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="text-secondary fw-semibold" style={{ fontSize: '12px' }}>Total Orders</span>
                      <div className="p-2 rounded-circle bg-light-green text-primary-green"><FaShoppingBag /></div>
                    </div>
                    <div className="fs-5 fs-md-3 fw-bold text-dark">{orders.length}</div>
                    <small className="text-success fw-semibold d-none d-md-block">98.2% on-time delivery</small>
                  </div>
                </div>
                <div className="col-6 col-lg-3">
                  <div className="card-auramed p-3 h-100 border-0 shadow-sm">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="text-secondary fw-semibold" style={{ fontSize: '12px' }}>Registered Patients</span>
                      <div className="p-2 rounded-circle bg-light-green text-primary-green"><FaUsers /></div>
                    </div>
                    <div className="fs-5 fs-md-3 fw-bold text-dark">9,840</div>
                    <small className="text-success fw-semibold d-none d-md-block">+340 this week</small>
                  </div>
                </div>
                <div className="col-6 col-lg-3">
                  <div className="card-auramed p-3 h-100 border-0 shadow-sm">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="text-secondary fw-semibold" style={{ fontSize: '12px' }}>Rx Queue</span>
                      <div className="p-2 rounded-circle bg-warning-subtle text-warning"><FaFileMedicalAlt /></div>
                    </div>
                    <div className="fs-5 fs-md-3 fw-bold text-dark">{pendingRxCount} Pending</div>
                    <small className="text-warning fw-semibold d-none d-md-block">Requires sign-off</small>
                  </div>
                </div>
              </div>

              {/* ✅ CHANGED TO col-6 for mobile 2-2 layout */}
              <div className="row g-3 mb-4">
                <div className="col-6 col-lg-3">
                  <div className="card-auramed p-3 p-md-4 h-100 border-0 shadow-sm text-center d-flex flex-column justify-content-between">
                    <h6 className="fw-bold text-dark mb-3" style={{ fontSize: '14px' }}>Delivery</h6>
                    <DonutChart percentage={84} color="#3B82F6" label="Delivery" />
                    <div className="text-success fw-semibold mt-3 mt-md-4" style={{ fontSize: '11px' }}><FaArrowUp size={10} /> +5.5%</div>
                  </div>
                </div>
                <div className="col-6 col-lg-3">
                  <div className="card-auramed p-3 p-md-4 h-100 border-0 shadow-sm text-center d-flex flex-column justify-content-between">
                    <h6 className="fw-bold text-dark mb-3" style={{ fontSize: '14px' }}>Return</h6>
                    <DonutChart percentage={45} color="#F59E0B" label="Return" />
                    <div className="text-danger fw-semibold mt-3 mt-md-4" style={{ fontSize: '11px' }}><FaArrowDown size={10} /> -5.5%</div>
                  </div>
                </div>
                <div className="col-6 col-lg-3">
                  <div className="card-auramed p-3 p-md-4 h-100 border-0 shadow-sm text-center d-flex flex-column justify-content-between">
                    <h6 className="fw-bold text-dark mb-3" style={{ fontSize: '14px' }}>Cancel</h6>
                    <DonutChart percentage={25} color="#EF4444" label="Cancel" />
                    <div className="text-danger fw-semibold mt-3 mt-md-4" style={{ fontSize: '11px' }}><FaArrowDown size={10} /> -5.5%</div>
                  </div>
                </div>
                <div className="col-6 col-lg-3">
                  <div className="card-auramed p-3 p-md-4 h-100 border-0 shadow-sm d-flex flex-column">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-2 gap-1">
                      <h6 className="fw-bold text-dark mb-0" style={{ fontSize: '14px' }}>Revenue</h6>
                      <select className="form-select form-select-sm border-0 bg-light" style={{ width: 'auto', fontSize: '10px', cursor: 'pointer', padding: '2px 20px 2px 8px' }}>
                        <option>Today</option><option>Week</option>
                      </select>
                    </div>
                    <h5 className="fw-bold text-dark mb-2">₹{totalRevenue > 0 ? totalRevenue.toLocaleString('en-IN') : '1,05,455'}</h5>
                    <div className="flex-grow-1 position-relative mt-1" style={{ minHeight: '60px' }}>
                      <svg viewBox="0 0 200 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%', position: 'absolute', bottom: 0, left: 0 }}>
                        <defs>
                          <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path d="M0,90 C20,90 30,40 50,40 C70,40 80,60 100,60 C120,60 130,20 150,20 C170,20 180,50 200,50 L200,100 L0,100 Z" fill="url(#areaGradient)" />
                        <path d="M0,90 C20,90 30,40 50,40 C70,40 80,60 100,60 C120,60 130,20 150,20 C170,20 180,50 200,50" fill="none" stroke="#F59E0B" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Orders & System Row */}
              <div className="row g-4">
                <div className="col-12 col-md-7">
                  <div className="card-auramed p-4 h-100 border-0 shadow-sm">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="fw-bold text-dark mb-0">Recent Orders</h6>
                      <button onClick={() => setActiveTab('orders')} className="btn btn-sm btn-link text-decoration-none p-0 fw-semibold" style={{ color: '#046c7a' }}>View All</button>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-sm table-borderless align-middle mb-0" style={{ fontSize: '12.5px' }}>
                        <thead className="text-muted"><tr><th>Order ID</th><th>Patient</th><th>Amount</th><th>Status</th></tr></thead>
                        <tbody>
                          {orders.slice(0, 4).map(order => (
                            <tr key={order.id}>
                              <td className="fw-semibold text-primary-green">{order.id}</td>
                              <td>{order.patientName || 'Alex Morgan'}</td>
                              <td className="fw-bold">₹{order.total.toFixed(2)}</td>
                              <td>
                                <span className={`badge ${order.status === 'Delivered' ? 'bg-success-subtle text-success' : order.status === 'Processing' ? 'bg-warning-subtle text-warning' : 'bg-primary-subtle text-primary'} border`}>
                                  {order.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                          {orders.length === 0 && <tr><td colSpan="4" className="text-center text-muted py-3">No recent orders found.</td></tr>}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-5">
                  <div className="card-auramed p-4 h-100 border-0 shadow-sm">
                    <h6 className="fw-bold text-dark mb-3">System Operations</h6>
                    <div className="p-3 bg-light rounded mb-2 d-flex justify-content-between align-items-center">
                      <span style={{ fontSize: '13px' }}><FaFileMedicalAlt className="me-2 text-success"/> Phlebotomy Visits</span>
                      <span className="badge bg-success">{labBookings.length} Active</span>
                    </div>
                    <div className="p-3 bg-light rounded mb-2 d-flex justify-content-between align-items-center">
                      <span style={{ fontSize: '13px' }}><FaUsers className="me-2 text-primary"/> Telehealth Consults</span>
                      <span className="badge bg-primary">{doctorAppointments.length} Booked</span>
                    </div>
                    <div className="p-3 bg-light rounded d-flex justify-content-between align-items-center">
                      <span style={{ fontSize: '13px' }}><FaChartLine className="me-2 text-warning"/> Avg Lab Turnaround</span>
                      <strong style={{ fontSize: '13px' }}>11.4 Hours</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. PRODUCTS INVENTORY TAB */}
          {activeTab === 'products' && (
            <div>
              {/* ✅ CHANGED TO col-6 for mobile 2-2 layout */}
              <div className="row g-3 mb-4">
                <div className="col-6 col-md-4">
                  <div className="card border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center gap-2 gap-md-3 h-100">
                    <div className="bg-success bg-opacity-10 text-success rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                      <FaBox size={18} />
                    </div>
                    <div>
                      <div className="text-muted fw-semibold mb-1" style={{ fontSize: '10px' }}>TOTAL CATALOG</div>
                      <h5 className="fw-bold mb-0 text-dark">{totalCatalog}</h5>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-4">
                  <div className="card border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center gap-2 gap-md-3 h-100">
                    <div className="bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                      <FaLayerGroup size={18} />
                    </div>
                    <div>
                      <div className="text-muted fw-semibold mb-1" style={{ fontSize: '10px' }}>TOTAL STOCK</div>
                      <h5 className="fw-bold mb-0 text-dark">{totalStockUnits.toLocaleString()}</h5>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="card border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center gap-2 gap-md-3 h-100">
                    <div className="bg-warning bg-opacity-10 text-warning rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                      <FaExclamationTriangle size={18} />
                    </div>
                    <div>
                      <div className="text-muted fw-semibold mb-1" style={{ fontSize: '10px' }}>LOW STOCK ALERT</div>
                      <h5 className="fw-bold mb-0 text-warning">{lowStockCount} Items</h5>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-auramed p-4 border-0 shadow-sm">
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
                  <div className="input-group" style={{ maxWidth: '340px' }}>
                    <span className="input-group-text bg-white border-end-0"><FaSearch color="#64756D" /></span>
                    <input type="text" className="form-control border-start-0 ps-0" placeholder="Search..." value={productSearch} onChange={(e) => setProductSearch(e.target.value)} />
                  </div>
                  <button onClick={openAddProductModal} className="btn btn-sm btn-auramed"><FaPlus size={10} className="me-1" /> Add Medicine</button>
                </div>

                <div className="table-responsive">
                  <table className="table align-middle table-hover mb-0" style={{ fontSize: '13px' }}>
                    <thead className="table-light"><tr><th>MEDICINE</th><th>CATEGORY</th><th>PRICE</th><th>STOCK</th><th>RX</th><th className="text-end">ACTIONS</th></tr></thead>
                    <tbody>
                      {filteredInventory.map(prod => (
                        <tr key={prod.id}>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <img src={prod.image} alt={prod.name} style={{ width: '35px', height: '35px', objectFit: 'contain', borderRadius: '4px' }} />
                              <div>
                                <div className="fw-bold text-dark text-truncate" style={{ maxWidth: '150px' }}>{prod.name}</div>
                                <small className="text-muted d-block text-truncate" style={{ maxWidth: '150px' }}>{prod.brand}</small>
                              </div>
                            </div>
                          </td>
                          <td><span className="badge bg-light text-dark border">{prod.category}</span></td>
                          <td>
                            <strong className="text-dark-green">₹{(prod.price * 25).toFixed(0)}</strong>
                            <small className="text-muted d-block text-decoration-line-through">₹{(prod.mrp * 25).toFixed(0)}</small>
                          </td>
                          <td><span className={`badge ${prod.stock > 20 ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'} border`}>{prod.stock}</span></td>
                          <td>{prod.prescriptionRequired ? <span className="badge bg-danger-subtle text-danger border">Rx</span> : <span className="badge bg-success-subtle text-success border">OTC</span>}</td>
                          <td className="text-end">
                            <button onClick={() => { const newStock = prompt(`Update stock for ${prod.name}:`, prod.stock); if (newStock !== null) editProduct(prod.id, { stock: Number(newStock) }); }} className="btn btn-sm btn-light border p-1 me-1"><FaEdit size={12} className="text-secondary" /></button>
                            <button onClick={() => setDeleteTarget(prod)} className="btn btn-sm btn-light border text-danger p-1"><FaTrashAlt size={12} /></button>
                          </td>
                        </tr>
                      ))}
                      {filteredInventory.length === 0 && <tr><td colSpan="6" className="text-center py-4 text-muted">No products found.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 3. ORDER MANAGEMENT TAB */}
          {activeTab === 'orders' && (
            <div className="card-auramed p-4 border-0 shadow-sm">
              <h5 className="fw-bold text-dark mb-4">Orders Management</h5>
              <div className="table-responsive">
                <table className="table align-middle table-hover mb-0" style={{ fontSize: '13px' }}>
                  <thead className="table-light"><tr><th>ORDER ID</th><th>PATIENT</th><th>AMOUNT</th><th>STATUS</th><th>UPDATE</th></tr></thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td className="fw-bold text-primary-green">{order.id}</td>
                        <td>
                          <div className="fw-semibold text-dark">{order.patientName || 'Alex Morgan'}</div>
                          <small className="text-muted text-truncate d-block" style={{ maxWidth: '150px' }}>{order.deliveryAddress}</small>
                        </td>
                        <td className="fw-bold text-dark">₹{order.total.toFixed(2)}</td>
                        <td><span className={`badge ${order.status === 'Delivered' ? 'bg-success-subtle text-success' : order.status === 'Out for Delivery' ? 'bg-info-subtle text-info' : order.status === 'Cancelled' ? 'bg-danger-subtle text-danger' : 'bg-warning-subtle text-warning'} border`}>{order.status}</span></td>
                        <td>
                          <select className="form-select form-select-sm" style={{ width: '130px', fontSize: '12px' }} value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)}>
                            <option value="Processing">Processing</option><option value="Out for Delivery">Out for Delivery</option><option value="Delivered">Delivered</option><option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                    {orders.length === 0 && <tr><td colSpan="5" className="text-center py-4 text-muted">No orders placed yet.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. PRESCRIPTIONS TAB */}
          {activeTab === 'prescriptions' && (
            <div className="card-auramed p-4 border-0 shadow-sm">
              <h5 className="fw-bold text-dark mb-4">Prescription Queue</h5>
              <div className="row g-3">
                {prescriptions.map(rx => (
                  <div key={rx.id} className="col-12 col-md-6 col-lg-4">
                    <div className="p-3 border rounded bg-white h-100 shadow-sm position-relative">
                      <div className="d-flex justify-content-between mb-2">
                        <strong className="text-dark">{rx.id}</strong>
                        <span className={`badge ${rx.status === 'Approved' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'} border`}>{rx.status}</span>
                      </div>
                      <div className="text-secondary mb-2" style={{ fontSize: '12.5px' }}>
                        <strong>Patient:</strong> {rx.patientName} <br/><strong>Doctor:</strong> {rx.doctorName}
                      </div>
                      <p className="text-muted bg-light p-2 rounded mb-3" style={{ fontSize: '11.5px' }}><em>{rx.pharmacistNotes || "No notes provided."}</em></p>
                      
                      {rx.status === 'Pending Verification' && (
                        <div className="d-flex gap-2 mt-auto">
                          <button className="btn btn-sm btn-success flex-grow-1 d-flex align-items-center justify-content-center gap-1" onClick={() => alert('Prescription Approved Logic Here')}><FaCheck size={10} /> Approve</button>
                          <button className="btn btn-sm btn-outline-danger flex-grow-1 d-flex align-items-center justify-content-center gap-1" onClick={() => alert('Prescription Rejected Logic Here')}><FaTimes size={10} /> Reject</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {prescriptions.length === 0 && (
                  <div className="col-12 text-center py-5 text-muted">
                    <FaFileMedicalAlt size={40} className="mb-3 opacity-50" />
                    <h6>Queue is empty</h6>
                    <p className="small">No new prescriptions to verify right now.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* NOTIFICATIONS DRAWER */}
      {isNotificationsOpen && (
        <>
          <div className="position-fixed top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1150 }} onClick={() => setIsNotificationsOpen(false)}></div>
          <div className="position-fixed top-0 end-0 h-100 bg-white shadow-lg animate-slide-in" style={{ width: '320px', zIndex: 1160, display: 'flex', flexDirection: 'column' }}>
            <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-light">
              <h5 className="fw-bold mb-0">Notifications</h5>
              <button className="btn btn-sm btn-light border rounded-circle" onClick={() => setIsNotificationsOpen(false)}><FaTimes /></button>
            </div>
            <div className="flex-grow-1 overflow-auto p-3">
              {notifications.map(alert => (
                <div key={alert.id} className="p-3 mb-2 rounded-3 border d-flex gap-3 align-items-start cursor-pointer hover-bg-light" onClick={alert.action} style={{ cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div className="p-2 rounded-circle bg-light flex-shrink-0">{alert.icon}</div>
                  <div>
                    <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: '13px' }}>{alert.title}</h6>
                    <p className="text-secondary mb-0" style={{ fontSize: '12px', lineHeight: '1.4' }}>{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-top text-center bg-light">
              <small className="text-muted">You have {notifications[0]?.id === 'no-alerts' ? 0 : notifications.length} active alerts.</small>
            </div>
          </div>
        </>
      )}

      {/* ADD PRODUCT MODAL */}
      {showAddProductModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1100 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header bg-light border-bottom-0">
                <h5 className="modal-title fw-bold">Add Medicine</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddProductModal(false)}></button>
              </div>
              <form onSubmit={handleCreateProduct}>
                <div className="modal-body p-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                  <div className="row g-3">
                    <div className="col-12 col-md-8 position-relative">
                      <label className="form-label fw-semibold" style={{ fontSize: '12px' }}>Product Name</label>
                      <input type="text" className="form-control form-control-sm" required value={newProd.name} onChange={(e) => { setNewProd({ ...newProd, name: e.target.value }); setShowSuggestions(e.target.value.length > 2); }} onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} placeholder="e.g. Zinc Gluconate" />
                      {showSuggestions && (
                        <div className="position-absolute w-100 bg-white border rounded shadow-lg mt-1" style={{ top: '100%', maxHeight: '200px', overflowY: 'auto', zIndex: 9999 }}>
                          <div className="p-2 border-bottom text-muted" style={{ fontSize: '11px' }}>Suggested Images</div>
                          <div className="d-flex gap-2 p-2 flex-wrap">
                            {SUGGESTED_IMAGES.map((img, idx) => (
                              <img key={idx} src={img} alt="suggestion" onMouseDown={(e) => e.preventDefault()} onClick={() => { setNewProd({ ...newProd, image: img }); setShowSuggestions(false); }} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px', cursor: 'pointer', border: '2px solid transparent' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#159B64'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="form-label fw-semibold" style={{ fontSize: '12px' }}>Brand</label>
                      <input type="text" className="form-control form-control-sm" required value={newProd.brand} onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })} placeholder="e.g. AuraMed" />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold" style={{ fontSize: '12px' }}>Category</label>
                      <select className="form-select form-select-sm" value={newProd.category} onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}>
                        {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="col-6 col-md-3">
                      <label className="form-label fw-semibold" style={{ fontSize: '12px' }}>MRP ($)</label>
                      <input type="number" step="0.01" className="form-control form-control-sm" required value={newProd.mrp} onChange={(e) => setNewProd({ ...newProd, mrp: e.target.value })} />
                    </div>
                    <div className="col-6 col-md-3">
                      <label className="form-label fw-semibold" style={{ fontSize: '12px' }}>Selling Price ($)</label>
                      <input type="number" step="0.01" className="form-control form-control-sm" required value={newProd.price} onChange={(e) => setNewProd({ ...newProd, price: e.target.value })} />
                    </div>
                    <div className="col-12">
                      {discountInfo.percent > 0 ? (
                        <div className="p-2 rounded bg-success-subtle border border-success-subtle text-success fw-semibold d-inline-flex align-items-center gap-2" style={{ fontSize: '12px' }}>
                          <FaTags /> You Save ${discountInfo.savedAmount} ({discountInfo.percent}% OFF)
                        </div>
                      ) : (
                         <div className="p-2 rounded bg-danger-subtle border border-danger-subtle text-danger fw-semibold d-inline-flex align-items-center gap-2" style={{ fontSize: '12px' }}>
                          <FaExclamationTriangle /> Selling Price must be lower than MRP.
                        </div>
                      )}
                    </div>
                    <div className="col-6 col-md-4">
                      <label className="form-label fw-semibold" style={{ fontSize: '12px' }}>Initial Stock</label>
                      <input type="number" className="form-control form-control-sm" required value={newProd.stock} onChange={(e) => setNewProd({ ...newProd, stock: e.target.value })} />
                    </div>
                    <div className="col-12 col-md-8 d-flex align-items-center">
                      <div className="form-check mt-3">
                        <input type="checkbox" className="form-check-input" id="rxCheck" checked={newProd.prescriptionRequired} onChange={(e) => setNewProd({ ...newProd, prescriptionRequired: e.target.checked })} />
                        <label className="form-check-label" htmlFor="rxCheck" style={{ fontSize: '13px' }}>Requires Doctor Prescription</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold" style={{ fontSize: '12px' }}>Active Composition</label>
                      <input type="text" className="form-control form-control-sm" value={newProd.composition} onChange={(e) => setNewProd({ ...newProd, composition: e.target.value })} />
                    </div>
                    <div className="col-12 mt-4">
                      <label className="form-label fw-semibold" style={{ fontSize: '12px' }}>Product Image</label>
                      <div className="d-flex gap-3 align-items-center">
                        <div className="border rounded p-1 d-flex align-items-center justify-content-center bg-light" style={{ width: '80px', height: '80px' }}>
                          {newProd.image ? <img src={newProd.image} alt="preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} /> : <FaImage size={24} className="text-muted" />}
                        </div>
                        <div className="flex-grow-1">
                          <div className="input-group input-group-sm mb-2">
                            <input type="url" className="form-control" placeholder="Paste Image URL here..." value={newProd.image} onChange={(e) => setNewProd({ ...newProd, image: e.target.value })} />
                          </div>
                          <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageUpload} />
                          <button type="button" className="btn btn-sm btn-outline-success d-flex align-items-center gap-2" onClick={() => fileInputRef.current.click()}>
                            <FaCloudUploadAlt size={14} /> Upload File
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-top-0 pt-0">
                  <button type="button" className="btn btn-sm btn-light border fw-semibold" onClick={() => setShowAddProductModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-sm btn-auramed fw-semibold">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1100 }}>
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content border-0 shadow-lg text-center p-4">
              <FaTrashAlt size={40} className="text-danger mb-3 mx-auto" />
              <h5 className="fw-bold mb-2">Delete Product?</h5>
              <p className="text-muted small mb-4">Are you sure you want to delete <strong>{deleteTarget.name}</strong>?</p>
              <div className="d-flex gap-2 w-100 justify-content-center">
                <button className="btn btn-sm btn-light border fw-semibold w-50" onClick={() => setDeleteTarget(null)}>Cancel</button>
                <button className="btn btn-sm btn-danger fw-semibold w-50" onClick={handleDeleteConfirm}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .admin-layout-wrapper {
          min-height: 100vh;
          display: flex;
          width: 100%;
          position: relative;
        }
        .admin-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          z-index: 1050;
          transition: width 0.3s ease-in-out, transform 0.3s ease-in-out;
        }
        .desktop-expanded { width: 260px; }
        .desktop-collapsed { width: 80px; }
        .admin-main-content {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          min-width: 0;
          transition: margin-left 0.3s ease-in-out;
          height: 100vh;
        }
        .content-normal { margin-left: 260px; }
        .content-expanded { margin-left: 80px; }
        .admin-header {
          height: 70px;
          flex-shrink: 0;
          position: sticky;
          top: 0;
          z-index: 1030;
        }
        .admin-body-scroll {
          flex-grow: 1;
          overflow-y: auto;
          overflow-x: hidden;
        }
        @media (max-width: 991px) {
          .admin-sidebar {
            transform: translateX(-100%);
            width: 260px !important;
          }
          .mobile-open { transform: translateX(0); }
          .content-normal, .content-expanded { margin-left: 0; }
        }
        .hover-bg-light:hover { background-color: #f8f9fa !important; }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slideInRight 0.3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}