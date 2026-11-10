import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaCrown, FaUserShield, FaUsers, FaChartLine, 
  FaCog, FaHistory, FaCheckCircle, FaTimesCircle, 
  FaShieldAlt, FaFileInvoiceDollar, FaDatabase, FaServer,
  FaKey, FaSearch, FaUserPlus, FaArrowUp, FaLock,
  FaBars, FaHome, FaTachometerAlt, FaSignOutAlt,
  FaBell, FaRegBuilding, FaExclamationTriangle, FaArrowDown
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useHealthcare } from '../../context/HealthcareContext';

export default function SuperAdminDashboard() {
  const { currentRole, switchRole } = useAuth();
  const { orders, productsList, doctorAppointments } = useHealthcare();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('executive'); // 'executive', 'staff', 'system_config', 'audit_logs'
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sidebar State for Mobile
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Super Admin Staff Directory State
  const [staffList, setStaffList] = useState([
    { id: 'usr-4', name: 'Elena Rostova', email: 'admin@auramed.com', role: 'admin', title: 'Director of Healthcare Operations', status: 'Active', lastActive: '10 mins ago' },
    { id: 'usr-2', name: 'Dr. Nathan Cross, PharmD', email: 'nathan.pharm@auramed.com', role: 'pharmacist', title: 'Head Clinical Pharmacist', status: 'Active', lastActive: '1 hour ago' },
    { id: 'usr-3', name: 'Liam Hayes', email: 'liam.rider@auramed.com', role: 'delivery', title: 'Senior Fleet Courier', status: 'Active', lastActive: '25 mins ago' },
    { id: 'usr-6', name: 'Dr. Evelyn Reed, MD', email: 'evelyn.md@auramed.com', role: 'doctor_admin', title: 'Medical Board Evaluator', status: 'Active', lastActive: '2 hours ago' },
    { id: 'usr-7', name: 'Kavita Sharma', email: 'kavita.qa@auramed.com', role: 'compliance', title: 'CDSCO Compliance Lead', status: 'Active', lastActive: '4 hours ago' }
  ]);

  // Platform Configuration State
  const [config, setConfig] = useState({
    freeDeliveryThreshold: 499,
    expressDeliveryFee: 40,
    platformConveniencePct: 8,
    doctorCommissionPct: 15,
    taxGstPct: 5,
    maintenanceMode: false,
    autoApproveRx: false
  });
  const [savedNotice, setSavedNotice] = useState(false);

  // System Audit Logs
  const auditLogs = [
    { id: 'log-101', action: 'System Config Updated', actor: 'Super Admin (You)', timestamp: 'Today, 02:45 AM', ip: '192.168.1.1', status: 'Success' },
    { id: 'log-102', action: 'Staff Role Promoted to Store Admin', actor: 'Elena Rostova', timestamp: 'Yesterday, 04:12 PM', ip: '103.21.144.12', status: 'Success' },
    { id: 'log-103', action: 'Bulk Drug Formulary Updated (45 SKUs)', actor: 'Dr. Nathan Cross', timestamp: 'Nov 03, 11:20 AM', ip: '103.21.144.89', status: 'Success' },
    { id: 'log-104', action: 'Doctor Verification Approved (Dr. Betala)', actor: 'Elena Rostova', timestamp: 'Nov 02, 09:30 AM', ip: '103.21.144.12', status: 'Success' },
    { id: 'log-105', action: 'Database Backup Completed to Encrypted Cold Vault', actor: 'Automated Daemon', timestamp: 'Nov 01, 12:00 AM', ip: 'internal-cron', status: 'Success' }
  ];

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileSidebarOpen]);

  const handleToggleStatus = (id) => {
    setStaffList(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'Active' ? 'Suspended' : 'Active' } : s));
  };

  const handlePromoteRole = (id, newRole) => {
    setStaffList(prev => prev.map(s => s.id === id ? { ...s, role: newRole } : s));
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const sidebarLinks = [
    { id: 'home', label: 'Back to Store', icon: <FaHome />, action: () => switchRole('customer') },
    { id: 'executive', label: 'Executive Overview', icon: <FaTachometerAlt /> },
    { id: 'staff', label: 'Access Control', icon: <FaUsers />, count: staffList.length },
    { id: 'system_config', label: 'Governance & Tax', icon: <FaCog /> },
    { id: 'audit_logs', label: 'Audit Logs', icon: <FaHistory /> },
  ];

  return (
    <div className="admin-layout-wrapper" style={{ backgroundColor: '#F8FAF9' }}>
      
      {/* SIDEBAR */}
      <aside 
        className={`admin-sidebar bg-white border-end shadow-sm d-flex flex-column ${
          isMobileSidebarOpen ? 'mobile-open' : ''
        }`}
        style={{ width: '260px' }}
      >
        <div className="border-bottom d-flex align-items-center px-4" style={{ height: '70px', flexShrink: 0 }}>
          <div className="d-flex align-items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-success text-white rounded d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
               <FaCrown size={16} />
            </div>
            <span className="fw-bolder text-dark" style={{ fontSize: '18px', letterSpacing: '-0.5px' }}>Super Admin</span>
          </div>
        </div>

        <div className="flex-grow-1 overflow-auto py-3 px-2">
          {sidebarLinks.map((link) => (
            <button key={link.id} onClick={() => { if (link.action) { link.action(); } else { setActiveTab(link.id); } setIsMobileSidebarOpen(false); }}
              className={`btn w-100 text-start d-flex align-items-center mb-1 rounded-3 justify-content-between px-3 py-2 ${
                activeTab === link.id ? 'bg-success-subtle text-success fw-bold' : 'text-secondary fw-semibold bg-transparent hover-bg-light'
              }`}
              style={{ border: 'none', transition: 'all 0.2s' }}
            >
              <div className="d-flex align-items-center gap-3">
                <span style={{ fontSize: '18px' }} className="flex-shrink-0">{link.icon}</span>
                <span className="text-nowrap" style={{ fontSize: '13.5px' }}>{link.label}</span>
              </div>
              {link.count !== undefined && (
                <span className={`badge rounded-pill ${activeTab === link.id ? 'bg-success text-white' : 'bg-light text-dark border'}`} style={{ fontSize: '10px' }}>{link.count}</span>
              )}
            </button>
          ))}
        </div>

        <div className="p-3 border-top" style={{ flexShrink: 0 }}>
          <div className="d-flex align-items-center gap-2 mb-3 px-2">
            <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '36px', height: '36px', fontSize: '14px' }}>SA</div>
            <div>
              <div className="fw-bold text-dark" style={{ fontSize: '13px' }}>Super Admin</div>
              <div className="text-muted" style={{ fontSize: '11px' }}>ROOT ACCESS</div>
            </div>
          </div>
          <button onClick={() => switchRole('customer')} className="btn btn-light w-100 border text-danger fw-semibold d-flex align-items-center justify-content-center gap-2 py-2">
            <FaSignOutAlt /> Exit Portal
          </button>
        </div>
      </aside>

      {/* MOBILE OVERLAY */}
      {isMobileSidebarOpen && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-lg-none" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }} onClick={() => setIsMobileSidebarOpen(false)}></div>
      )}

      {/* MAIN CONTENT */}
      <main className="admin-main-content" style={{ marginLeft: '260px' }}>
        
        {/* HEADER */}
        <header className="admin-header bg-white border-bottom shadow-xs d-flex align-items-center justify-content-between px-3 px-md-4" style={{ height: '70px', flexShrink: 0 }}>
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-light border p-2 d-lg-none" onClick={() => setIsMobileSidebarOpen(true)}>
              <FaBars size={16} />
            </button>
            <div className="d-none d-md-block">
              <h6 className="fw-bold mb-0 text-dark">{sidebarLinks.find(l => l.id === activeTab)?.label || 'Dashboard'}</h6>
              <small className="text-muted" style={{ fontSize: '11px' }}>Enterprise Control Panel</small>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 gap-md-3">
            <button className="btn btn-light border p-2 rounded-circle position-relative">
              <FaBell size={16} className="text-secondary" />
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
            </button>
            <div className="d-flex align-items-center gap-2 border-start ps-2 ps-md-3">
              <Link to="/admin-dashboard" className="btn btn-sm btn-outline-success fw-bold px-3 py-2 d-none d-sm-flex align-items-center gap-2">
                <FaUserShield size={12} /> Store Admin View
              </Link>
            </div>
          </div>
        </header>

        {/* SCROLLABLE BODY */}
        <div className="admin-body-scroll p-3 p-md-4">
          
          <ul className="nav nav-pills gap-2 mb-4 bg-white p-2 rounded border shadow-sm overflow-auto flex-nowrap hide-scrollbar">
            {sidebarLinks.filter(l => l.id !== 'home').map(link => (
              <li className="nav-item" key={link.id}>
                <button className={`btn btn-sm text-nowrap ${activeTab === link.id ? 'btn-auramed' : 'btn-light text-dark'}`} onClick={() => setActiveTab(link.id)}>
                  {link.label} {link.count !== undefined && `(${link.count})`}
                </button>
              </li>
            ))}
          </ul>

          {/* ========================================================
              1. EXECUTIVE OVERVIEW
          ======================================================== */}
          {activeTab === 'executive' && (
            <div className="animate-fade-in">
              {/* Top KPI Cards */}
              <div className="row g-3 mb-4">
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="card-auramed p-3 h-100 border-0 shadow-sm position-relative overflow-hidden">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="text-secondary fw-semibold" style={{ fontSize: '12px' }}>Gross Platform GMV</span>
                      <div className="p-2 rounded-circle bg-light-green text-primary-green">
                        <FaFileInvoiceDollar size={16} />
                      </div>
                    </div>
                    <div className="fs-4 fw-bolder text-dark mb-2">₹1,48,920</div>
                    <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill fw-bold px-2 py-1">
                      <FaArrowUp size={10} className="me-1" /> 22.4% vs last cycle
                    </span>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="card-auramed p-3 h-100 border-0 shadow-sm position-relative overflow-hidden">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="text-secondary fw-semibold" style={{ fontSize: '12px' }}>Active Admin Staff</span>
                      <div className="p-2 rounded-circle bg-light-green text-primary-green">
                        <FaUserShield size={16} />
                      </div>
                    </div>
                    <div className="fs-4 fw-bolder text-dark mb-2">{staffList.length + 2}</div>
                    <span className="text-muted fw-semibold" style={{ fontSize: '11px' }}>Zero unauthorized attempts</span>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="card-auramed p-3 h-100 border-0 shadow-sm position-relative overflow-hidden">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="text-secondary fw-semibold" style={{ fontSize: '12px' }}>Total Formulary SKUs</span>
                      <div className="p-2 rounded-circle bg-light-green text-primary-green">
                        <FaDatabase size={16} />
                      </div>
                    </div>
                    <div className="fs-4 fw-bolder text-dark mb-2">{productsList.length} Items</div>
                    <span className="text-success fw-bold" style={{ fontSize: '11px' }}>100% Licensed supply</span>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="card-auramed p-3 h-100 border-0 shadow-sm position-relative overflow-hidden">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="text-secondary fw-semibold" style={{ fontSize: '12px' }}>System Health Uptime</span>
                      <div className="p-2 rounded-circle bg-light-green text-primary-green">
                        <FaServer size={16} />
                      </div>
                    </div>
                    <div className="fs-4 fw-bolder text-dark mb-2">99.98%</div>
                    <span className="text-success fw-bold" style={{ fontSize: '11px' }}>All cloud nodes healthy</span>
                  </div>
                </div>
              </div>

              {/* Middle Row */}
              <div className="row g-4 mb-4">
                <div className="col-lg-8">
                  <div className="card-auramed p-4 h-100 border-0 shadow-sm">
                    <h6 className="fw-bold text-dark mb-4 d-flex align-items-center gap-2">
                       <FaChartLine className="text-success" /> Enterprise Performance Metrics
                    </h6>
                    <div className="p-3 bg-light rounded-4 mb-4 border d-flex flex-column flex-md-row justify-content-between align-items-center text-center gap-3">
                      <div className="flex-grow-1 border-md-end">
                        <small className="text-muted fw-semibold d-block mb-1" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>PRESCRIPTION ORDERS</small>
                        <strong className="fs-4 text-dark">{orders.length + 42}</strong>
                      </div>
                      <div className="flex-grow-1 border-md-end border-md-start">
                        <small className="text-muted fw-semibold d-block mb-1" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>DOCTOR SESSIONS</small>
                        <strong className="fs-4 text-dark">{doctorAppointments.length + 18}</strong>
                      </div>
                      <div className="flex-grow-1 border-md-start">
                        <small className="text-muted fw-semibold d-block mb-1" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>AVG BASKET VALUE</small>
                        <strong className="fs-4 text-success">₹640</strong>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 p-3 rounded-3 border border-success-subtle bg-success-subtle text-success">
                      <FaShieldAlt size={24} />
                      <div>
                        <div className="fw-bold" style={{ fontSize: '13px' }}>Compliance Active</div>
                        <div style={{ fontSize: '12px' }}>Encrypted multi-tenant ledger active with automated fraud screening.</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="card-auramed p-4 h-100 border-0 shadow-sm">
                    <h6 className="fw-bold text-dark mb-4">Quick Actions</h6>
                    <div className="d-flex flex-column gap-3">
                      <button onClick={() => setActiveTab('staff')} className="btn btn-light border text-start d-flex align-items-center justify-content-between p-3 rounded-3 hover-shadow">
                        <span className="fw-semibold text-dark" style={{ fontSize: '13px' }}><FaUserPlus className="me-2 text-success" /> Staff Permissions</span>
                        <FaArrowUp size={12} className="text-muted" style={{ transform: 'rotate(45deg)' }} />
                      </button>
                      <button onClick={() => setActiveTab('system_config')} className="btn btn-light border text-start d-flex align-items-center justify-content-between p-3 rounded-3 hover-shadow">
                        <span className="fw-semibold text-dark" style={{ fontSize: '13px' }}><FaCog className="me-2 text-warning" /> System Settings</span>
                        <FaArrowUp size={12} className="text-muted" style={{ transform: 'rotate(45deg)' }} />
                      </button>
                      <button onClick={() => setActiveTab('audit_logs')} className="btn btn-light border text-start d-flex align-items-center justify-content-between p-3 rounded-3 hover-shadow">
                        <span className="fw-semibold text-dark" style={{ fontSize: '13px' }}><FaHistory className="me-2 text-danger" /> Security Audit Logs</span>
                        <FaArrowUp size={12} className="text-muted" style={{ transform: 'rotate(45deg)' }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              2. STAFF & ACCESS CONTROL
          ======================================================== */}
          {activeTab === 'staff' && (
            <div className="card-auramed p-4 border-0 shadow-sm animate-fade-in">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div>
                  <h5 className="fw-bold text-dark mb-1">Administrative Directory</h5>
                  <p className="text-secondary mb-0" style={{ fontSize: '13px' }}>
                    Grant, promote, or revoke staff authorization levels.
                  </p>
                </div>
                <div className="input-group" style={{ maxWidth: '300px' }}>
                  <span className="input-group-text bg-white border-end-0"><FaSearch size={12} color="#999" /></span>
                  <input 
                    type="text" 
                    className="form-control border-start-0" 
                    placeholder="Search name or email..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ fontSize: '13px' }}
                  />
                </div>
              </div>
              
              <div className="table-responsive">
                <table className="table align-middle table-hover mb-0" style={{ fontSize: '13px' }}>
                  <thead className="table-light text-muted" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    <tr>
                      <th className="ps-0 py-3">Staff Member</th>
                      <th className="py-3">Role</th>
                      <th className="py-3">Department</th>
                      <th className="py-3">Status</th>
                      <th className="py-3">Last Active</th>
                      <th className="text-end py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffList
                      .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.email.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map(member => (
                      <tr key={member.id}>
                        <td className="ps-0 py-3">
                          <div className="d-flex align-items-center gap-3">
                            <div className="bg-light border text-secondary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '36px', height: '36px' }}>
                              {member.name.charAt(0)}
                            </div>
                            <div>
                              <div className="fw-bold text-dark">{member.name}</div>
                              <div className="text-muted" style={{ fontSize: '12px' }}>{member.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`badge rounded-pill ${
                            member.role === 'admin' ? 'bg-primary-subtle text-primary border border-primary-subtle' :
                            member.role === 'pharmacist' ? 'bg-success-subtle text-success border border-success-subtle' :
                            member.role === 'delivery' ? 'bg-warning-subtle text-warning border border-warning-subtle' : 'bg-secondary-subtle text-secondary border border-secondary-subtle'
                          }`}>
                            {member.role.toUpperCase()}
                          </span>
                        </td>
                        <td className="text-secondary">{member.title}</td>
                        <td>
                          <span className={`badge ${member.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'} border`}>
                            {member.status}
                          </span>
                        </td>
                        <td className="text-muted">{member.lastActive}</td>
                        <td className="text-end">
                          <div className="d-inline-flex gap-2">
                            {member.role !== 'admin' && (
                              <button
                                onClick={() => handlePromoteRole(member.id, 'admin')}
                                className="btn btn-sm btn-outline-success fw-semibold"
                                style={{ fontSize: '11px' }}
                              >
                                Promote
                              </button>
                            )}
                            <button
                              onClick={() => handleToggleStatus(member.id)}
                              className={`btn btn-sm ${member.status === 'Active' ? 'btn-outline-danger' : 'btn-outline-success'}`}
                              style={{ fontSize: '11px' }}
                            >
                              {member.status === 'Active' ? 'Suspend' : 'Activate'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              3. PLATFORM GOVERNANCE & TAX
          ======================================================== */}
          {activeTab === 'system_config' && (
            <div className="card-auramed p-4 border-0 shadow-sm animate-fade-in" style={{ maxWidth: '800px' }}>
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="p-3 bg-light-green text-primary-green rounded-circle">
                  <FaCog size={24} />
                </div>
                <div>
                  <h5 className="fw-bold text-dark mb-1">Global Platform Governance</h5>
                  <p className="text-secondary mb-0" style={{ fontSize: '13px' }}>
                    Define enterprise thresholds, shipping policies, and taxation.
                  </p>
                </div>
              </div>

              {savedNotice && (
                <div className="alert alert-success d-flex align-items-center gap-2 py-2 border-success-subtle bg-success-subtle text-success" role="alert">
                  <FaCheckCircle /> Platform settings saved and propagated to live production nodes!
                </div>
              )}

              <form onSubmit={handleSaveConfig}>
                <div className="row g-4 mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-dark" style={{ fontSize: '12px' }}>Free Delivery Threshold (₹)</label>
                    <input 
                      type="number" 
                      className="form-control bg-light" 
                      value={config.freeDeliveryThreshold}
                      onChange={(e) => setConfig({ ...config, freeDeliveryThreshold: Number(e.target.value) })}
                    />
                    <small className="text-muted mt-1 d-block" style={{ fontSize: '11px' }}>Orders above this amount get free delivery.</small>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold text-dark" style={{ fontSize: '12px' }}>Standard Delivery Fee (₹)</label>
                    <input 
                      type="number" 
                      className="form-control bg-light" 
                      value={config.expressDeliveryFee}
                      onChange={(e) => setConfig({ ...config, expressDeliveryFee: Number(e.target.value) })}
                    />
                    <small className="text-muted mt-1 d-block" style={{ fontSize: '11px' }}>Applied when cart is under threshold.</small>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold text-dark" style={{ fontSize: '12px' }}>Convenience Fee (%)</label>
                    <input 
                      type="number" 
                      className="form-control bg-light" 
                      value={config.platformConveniencePct}
                      onChange={(e) => setConfig({ ...config, platformConveniencePct: Number(e.target.value) })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold text-dark" style={{ fontSize: '12px' }}>Statutory Medical Tax (%)</label>
                    <input 
                      type="number" 
                      className="form-control bg-light" 
                      value={config.taxGstPct}
                      onChange={(e) => setConfig({ ...config, taxGstPct: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-4 bg-light border mb-4">
                  <h6 className="fw-bold text-dark mb-3" style={{ fontSize: '13px' }}>Critical System Toggles</h6>
                  
                  <div className="form-check form-switch mb-3">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="maintMode"
                      checked={config.maintenanceMode}
                      onChange={(e) => setConfig({ ...config, maintenanceMode: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold text-dark ms-2" htmlFor="maintMode" style={{ fontSize: '13px' }}>
                      Emergency Platform Maintenance Mode <span className="text-danger">(Locks checkout)</span>
                    </label>
                  </div>
                  
                  <div className="form-check form-switch">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="autoRx"
                      checked={config.autoApproveRx}
                      onChange={(e) => setConfig({ ...config, autoApproveRx: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold text-dark ms-2" htmlFor="autoRx" style={{ fontSize: '13px' }}>
                      Automated AI Prescription OCR Pre-Verification
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn btn-auramed fw-bold px-4 py-2 d-flex align-items-center gap-2">
                  <FaCheckCircle /> Save Configuration
                </button>
              </form>
            </div>
          )}

          {/* ========================================================
              4. SECURITY AUDIT LOGS
          ======================================================== */}
          {activeTab === 'audit_logs' && (
            <div className="card-auramed p-4 border-0 shadow-sm animate-fade-in">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="p-3 bg-danger-subtle text-danger rounded-circle">
                  <FaLock size={24} />
                </div>
                <div>
                  <h5 className="fw-bold text-dark mb-1">System Security Audit Trail</h5>
                  <p className="text-secondary mb-0" style={{ fontSize: '13px' }}>
                    Immutable chronological log of administrative actions and logins.
                  </p>
                </div>
              </div>

              <div className="table-responsive rounded-3 border">
                <table className="table align-middle table-hover mb-0" style={{ fontSize: '12px' }}>
                  <thead className="table-light text-muted" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    <tr>
                      <th className="ps-3 py-3">Event ID</th>
                      <th className="py-3">Action / Event</th>
                      <th className="py-3">Actor</th>
                      <th className="py-3">Timestamp</th>
                      <th className="py-3">Network IP</th>
                      <th className="pe-3 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map(log => (
                      <tr key={log.id}>
                        <td className="ps-3 text-muted fw-mono">{log.id}</td>
                        <td className="fw-bold text-dark">{log.action}</td>
                        <td>{log.actor}</td>
                        <td className="text-muted">{log.timestamp}</td>
                        <td><code className="bg-light px-2 py-1 rounded text-danger">{log.ip}</code></td>
                        <td className="pe-3"><span className="badge bg-success-subtle text-success border border-success-subtle">{log.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* GLOBAL CSS FOR THIS COMPONENT */}
      <style jsx>{`
        .admin-layout-wrapper {
          min-height: 100vh;
          display: flex;
          width: 100%;
          position: relative;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        .admin-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          z-index: 1050;
          transition: transform 0.3s ease-in-out;
        }
        .admin-main-content {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          min-width: 0;
          height: 100vh;
          transition: margin-left 0.3s ease-in-out;
        }
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
        
        /* Mobile specific fixes */
        @media (max-width: 991px) {
          .admin-sidebar {
            transform: translateX(-100%);
          }
          .admin-sidebar.mobile-open {
            transform: translateX(0);
          }
          .admin-main-content {
            margin-left: 0 !important;
          }
        }
        
        /* Custom UI Classes */
        .hover-bg-light:hover { background-color: #f1f5f9 !important; }
        .hover-shadow:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .fw-mono { font-family: monospace; }
        
        /* Fade In Animation */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        /* Border helpers for flex stats */
        @media (min-width: 768px) {
          .border-md-end { border-right: 1px solid #dee2e6 !important; }
          .border-md-start { border-left: 1px solid #dee2e6 !important; }
        }
      `}</style>
    </div>
  );
}