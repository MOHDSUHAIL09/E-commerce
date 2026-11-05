import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaDollarSign, FaShoppingBag, FaUsers, FaPills, 
  FaUserMd, FaFlask, FaTruck, FaPlus, FaTrashAlt, 
  FaEdit, FaSearch, FaCheckCircle, FaExclamationCircle,
  FaChartLine, FaBoxOpen, FaFileMedicalAlt, FaTag
} from 'react-icons/fa';
import { useHealthcare } from '../../context/HealthcareContext';
import { CATEGORIES } from '../Categories/CategoriesPage';

export default function AdminDashboard() {
  const { 
    productsList, 
    orders, 
    prescriptions, 
    doctorAppointments, 
    labBookings, 
    addProduct, 
    editProduct, 
    deleteProduct,
    updateOrderStatus
  } = useHealthcare();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'products', 'orders', 'prescriptions'
  const [productSearch, setProductSearch] = useState('');
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  // New product form
  const [newProd, setNewProd] = useState({
    name: '',
    brand: '',
    manufacturer: '',
    category: 'Vitamins & Supplements',
    price: 15.00,
    mrp: 20.00,
    discount: 25,
    stock: 50,
    prescriptionRequired: false,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    description: 'High-quality therapeutic formulation.',
    composition: 'Standardized active pharmaceutical ingredient (500mg).',
    uses: 'Daily healthcare and wellness maintenance.',
    dosage: '1 tablet daily with water.',
    storage: 'Store in cool dry environment.'
  });

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (newProd.name && newProd.brand) {
      addProduct({
        ...newProd,
        price: Number(newProd.price),
        mrp: Number(newProd.mrp),
        stock: Number(newProd.stock)
      });
      setShowAddProductModal(false);
      setNewProd({
        name: '',
        brand: '',
        manufacturer: '',
        category: 'Vitamins & Supplements',
        price: 15.00,
        mrp: 20.00,
        discount: 25,
        stock: 50,
        prescriptionRequired: false,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
        description: 'High-quality therapeutic formulation.',
        composition: 'Standardized active pharmaceutical ingredient (500mg).',
        uses: 'Daily healthcare and wellness maintenance.',
        dosage: '1 tablet daily with water.',
        storage: 'Store in cool dry environment.'
      });
    }
  };

  const filteredInventory = productsList.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="py-4" style={{ backgroundColor: '#F8FAF9' }}>
      <div className="container-xl">
        
        {/* Header */}
        <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-3">
          <div>
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-dark text-white px-2 py-1">ADMINISTRATOR CONTROL</span>
              <span className="text-secondary" style={{ fontSize: '13px' }}>Operations Portal</span>
            </div>
            <h2 className="fw-bold text-dark mb-0">Healthcare Operations & Inventory Management</h2>
          </div>

          <div className="d-flex gap-2">
            <button
              onClick={() => setShowAddProductModal(true)}
              className="btn btn-auramed d-flex align-items-center gap-2"
            >
              <FaPlus size={12} /> Add New Medicine
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <ul className="nav nav-pills gap-2 mb-4 bg-white p-2 rounded border">
          <li className="nav-item">
            <button
              className={`btn btn-sm ${activeTab === 'overview' ? 'btn-auramed' : 'btn-light'}`}
              onClick={() => setActiveTab('overview')}
            >
              <FaChartLine className="me-1" /> Analytics & KPIs
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`btn btn-sm ${activeTab === 'products' ? 'btn-auramed' : 'btn-light'}`}
              onClick={() => setActiveTab('products')}
            >
              <FaBoxOpen className="me-1" /> Product Catalog ({productsList.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`btn btn-sm ${activeTab === 'orders' ? 'btn-auramed' : 'btn-light'}`}
              onClick={() => setActiveTab('orders')}
            >
              <FaShoppingBag className="me-1" /> Order Management ({orders.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`btn btn-sm ${activeTab === 'prescriptions' ? 'btn-auramed' : 'btn-light'}`}
              onClick={() => setActiveTab('prescriptions')}
            >
              <FaFileMedicalAlt className="me-1" /> Prescription Queue ({prescriptions.length})
            </button>
          </li>
        </ul>

        {/* 1. OVERVIEW & ANALYTICS */}
        {activeTab === 'overview' && (
          <div>
            {/* KPI Cards Row */}
            <div className="row g-3 mb-4">
              <div className="col-sm-6 col-lg-3">
                <div className="card-auramed p-3 h-100">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="text-secondary" style={{ fontSize: '12px' }}>Gross Revenue</span>
                    <div className="p-2 rounded-circle bg-light-green text-primary-green">
                      <FaDollarSign />
                    </div>
                  </div>
                  <div className="fs-3 fw-bold text-dark">₹1,48,920.00</div>
                  <small className="text-success fw-semibold">↑ 18.4% from last month</small>
                </div>
              </div>

              <div className="col-sm-6 col-lg-3">
                <div className="card-auramed p-3 h-100">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="text-secondary" style={{ fontSize: '12px' }}>Total Fulfillments</span>
                    <div className="p-2 rounded-circle bg-light-green text-primary-green">
                      <FaShoppingBag />
                    </div>
                  </div>
                  <div className="fs-3 fw-bold text-dark">1,420</div>
                  <small className="text-success fw-semibold">98.2% on-time delivery</small>
                </div>
              </div>

              <div className="col-sm-6 col-lg-3">
                <div className="card-auramed p-3 h-100">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="text-secondary" style={{ fontSize: '12px' }}>Registered Patients</span>
                    <div className="p-2 rounded-circle bg-light-green text-primary-green">
                      <FaUsers />
                    </div>
                  </div>
                  <div className="fs-3 fw-bold text-dark">9,840</div>
                  <small className="text-success fw-semibold">+340 this week</small>
                </div>
              </div>

              <div className="col-sm-6 col-lg-3">
                <div className="card-auramed p-3 h-100">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="text-secondary" style={{ fontSize: '12px' }}>Prescription Queue</span>
                    <div className="p-2 rounded-circle bg-warning-subtle text-warning">
                      <FaFileMedicalAlt />
                    </div>
                  </div>
                  <div className="fs-3 fw-bold text-dark">{prescriptions.filter(p => p.status === 'Pending Verification').length} Pending</div>
                  <small className="text-warning fw-semibold">Requires pharmacist sign-off</small>
                </div>
              </div>
            </div>

            {/* Sales Chart Simulation */}
            <div className="card-auramed p-4 mb-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold text-dark mb-0">Monthly Pharmacy Sales Performance (2026)</h5>
                <span className="badge bg-light text-secondary border">Real-time GMV Feed</span>
              </div>

              <div className="d-flex align-items-end justify-content-between gap-2 pt-4 border-bottom pb-2" style={{ height: '200px' }}>
                {[
                  { month: 'Jun', val: 55, rev: '₹78K' },
                  { month: 'Jul', val: 68, rev: '₹92K' },
                  { month: 'Aug', val: 75, rev: '₹105K' },
                  { month: 'Sep', val: 82, rev: '₹118K' },
                  { month: 'Oct', val: 94, rev: '₹134K' },
                  { month: 'Nov', val: 100, rev: '₹148K' }
                ].map((bar, i) => (
                  <div key={i} className="text-center flex-grow-1 d-flex flex-column align-items-center h-100 justify-content-end">
                    <small className="text-muted mb-1" style={{ fontSize: '10px' }}>{bar.rev}</small>
                    <div
                      className="w-100 rounded-top"
                      style={{
                        height: `${bar.val}%`,
                        backgroundColor: i === 5 ? '#159B64' : '#C4EBD7',
                        maxWidth: '48px',
                        transition: 'height 0.4s ease'
                      }}
                    ></div>
                    <span className="text-secondary mt-2" style={{ fontSize: '12px' }}>{bar.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostic & Telehealth Ops summary */}
            <div className="row g-4">
              <div className="col-md-6">
                <div className="card-auramed p-4 h-100">
                  <h6 className="fw-bold text-dark mb-3">Diagnostic Pathology Operations</h6>
                  <div className="p-3 bg-light rounded mb-2 d-flex justify-content-between align-items-center">
                    <span>Scheduled Phlebotomy Home Visits</span>
                    <span className="badge bg-success">{labBookings.length} Active</span>
                  </div>
                  <div className="p-3 bg-light rounded d-flex justify-content-between align-items-center">
                    <span>Avg Lab Report Turnaround</span>
                    <strong>11.4 Hours</strong>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card-auramed p-4 h-100">
                  <h6 className="fw-bold text-dark mb-3">Telehealth Doctor Network</h6>
                  <div className="p-3 bg-light rounded mb-2 d-flex justify-content-between align-items-center">
                    <span>Booked Specialist Consultations</span>
                    <span className="badge bg-primary">{doctorAppointments.length} Active</span>
                  </div>
                  <div className="p-3 bg-light rounded d-flex justify-content-between align-items-center">
                    <span>Board Certified Doctors on Roster</span>
                    <strong>42 Specialists</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. PRODUCTS INVENTORY TAB */}
        {activeTab === 'products' && (
          <div className="card-auramed p-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
              <div className="input-group" style={{ maxWidth: '340px' }}>
                <span className="input-group-text bg-white border-end-0">
                  <FaSearch color="#64756D" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Filter inventory..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                />
              </div>

              <button onClick={() => setShowAddProductModal(true)} className="btn btn-sm btn-auramed">
                <FaPlus /> Add Medicine
              </button>
            </div>

            <div className="table-responsive">
              <table className="table align-middle table-hover mb-0" style={{ fontSize: '13px' }}>
                <thead className="table-light">
                  <tr>
                    <th>IMAGE & MEDICINE</th>
                    <th>CATEGORY</th>
                    <th>PRICE / MRP</th>
                    <th>STOCK UNITS</th>
                    <th>RX STATUS</th>
                    <th className="text-end">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map(prod => (
                    <tr key={prod.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img src={prod.image} alt={prod.name} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                          <div>
                            <div className="fw-bold text-dark text-truncate" style={{ maxWidth: '240px' }}>{prod.name}</div>
                            <small className="text-muted">{prod.brand}</small>
                          </div>
                        </div>
                      </td>
                      <td>{prod.category}</td>
                      <td>
                        <strong className="text-dark-green">₹{(prod.price * 25).toFixed(0)}</strong>
                        <small className="text-muted d-block text-decoration-line-through">₹{(prod.mrp * 25).toFixed(0)}</small>
                      </td>
                      <td>
                        <span className={`badge ${prod.stock > 20 ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'} border`}>
                          {prod.stock} Units
                        </span>
                      </td>
                      <td>
                        {prod.prescriptionRequired ? (
                          <span className="badge-rx">Rx Drug</span>
                        ) : (
                          <span className="badge-otc">OTC</span>
                        )}
                      </td>
                      <td className="text-end">
                        <button
                          onClick={() => {
                            const newStock = prompt(`Update stock units for ${prod.name}:`, prod.stock);
                            if (newStock !== null) editProduct(prod.id, { stock: Number(newStock) });
                          }}
                          className="btn btn-sm btn-light border p-1 me-1"
                          title="Quick edit stock"
                        >
                          <FaEdit size={12} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete ${prod.name} from inventory?`)) deleteProduct(prod.id);
                          }}
                          className="btn btn-sm btn-light border text-danger p-1"
                          title="Delete product"
                        >
                          <FaTrashAlt size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. ORDER MANAGEMENT TAB */}
        {activeTab === 'orders' && (
          <div className="card-auramed p-4">
            <h5 className="fw-bold text-dark mb-4">Patient Orders Management</h5>

            <div className="table-responsive">
              <table className="table align-middle table-hover mb-0" style={{ fontSize: '13px' }}>
                <thead className="table-light">
                  <tr>
                    <th>ORDER ID</th>
                    <th>PATIENT / DESTINATION</th>
                    <th>AMOUNT</th>
                    <th>CURRENT STATUS</th>
                    <th>UPDATE STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td className="fw-bold text-primary-green">{order.id}</td>
                      <td>
                        <div className="fw-semibold text-dark">{order.patientName || 'Alex Morgan'}</div>
                        <small className="text-muted text-truncate d-block" style={{ maxWidth: '240px' }}>{order.deliveryAddress}</small>
                      </td>
                      <td className="fw-bold text-dark">₹{order.total.toFixed(2)}</td>
                      <td>
                        <span className={`badge-status ${
                          order.status === 'Delivered' ? 'badge-status-delivered' :
                          order.status === 'Out for Delivery' ? 'badge-status-transit' : 'badge-status-pending'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          style={{ width: '160px' }}
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. PRESCRIPTIONS TAB */}
        {activeTab === 'prescriptions' && (
          <div className="card-auramed p-4">
            <h5 className="fw-bold text-dark mb-4">Prescription Intake Queue</h5>
            <div className="row g-3">
              {prescriptions.map(rx => (
                <div key={rx.id} className="col-md-6">
                  <div className="p-3 border rounded bg-white">
                    <div className="d-flex justify-content-between mb-2">
                      <strong className="text-dark">{rx.id}</strong>
                      <span className="badge-status badge-status-approved">{rx.status}</span>
                    </div>
                    <div className="text-secondary" style={{ fontSize: '13px' }}>
                      Patient: {rx.patientName} • Doctor: {rx.doctorName}
                    </div>
                    <p className="text-secondary mt-2 mb-0" style={{ fontSize: '12px' }}>
                      {rx.pharmacistNotes}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1100 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Add Medicine / Health Product to Catalog</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddProductModal(false)}></button>
              </div>

              <form onSubmit={handleCreateProduct}>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label" style={{ fontSize: '12px' }}>Product Name</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        required
                        value={newProd.name}
                        onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                        placeholder="e.g. Zinc Gluconate 50mg Tablets"
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label" style={{ fontSize: '12px' }}>Brand / Manufacturer</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        required
                        value={newProd.brand}
                        onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                        placeholder="e.g. AuraMed Labs"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label" style={{ fontSize: '12px' }}>Category</label>
                      <select
                        className="form-select form-select-sm"
                        value={newProd.category}
                        onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                      >
                        {CATEGORIES.map(c => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label" style={{ fontSize: '12px' }}>Selling Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control form-control-sm"
                        required
                        value={newProd.price}
                        onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label" style={{ fontSize: '12px' }}>MRP ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control form-control-sm"
                        required
                        value={newProd.mrp}
                        onChange={(e) => setNewProd({ ...newProd, mrp: e.target.value })}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label" style={{ fontSize: '12px' }}>Initial Stock</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        required
                        value={newProd.stock}
                        onChange={(e) => setNewProd({ ...newProd, stock: e.target.value })}
                      />
                    </div>

                    <div className="col-md-8 d-flex align-items-center">
                      <div className="form-check mt-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="rxCheck"
                          checked={newProd.prescriptionRequired}
                          onChange={(e) => setNewProd({ ...newProd, prescriptionRequired: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="rxCheck" style={{ fontSize: '13px' }}>
                          Requires Doctor Prescription (Schedule H drug)
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <label className="form-label" style={{ fontSize: '12px' }}>Active Composition / Formula</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={newProd.composition}
                        onChange={(e) => setNewProd({ ...newProd, composition: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label" style={{ fontSize: '12px' }}>Product Image URL</label>
                      <input
                        type="url"
                        className="form-control form-control-sm"
                        value={newProd.image}
                        onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-sm btn-secondary" onClick={() => setShowAddProductModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-sm btn-auramed">
                    Add Product
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
