import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCrown, FaUserShield, FaUsers, FaChartLine, 
  FaCog, FaHistory, FaCheckCircle, FaTimesCircle, 
  FaShieldAlt, FaFileInvoiceDollar, FaDatabase, FaServer,
  FaKey, FaSearch, FaUserPlus, FaArrowUp, FaLock
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useHealthcare } from '../../context/HealthcareContext';

export default function SuperAdminDashboard() {
  const { currentRole, switchRole } = useAuth();
  const { orders, productsList, doctorAppointments } = useHealthcare();

  const [activeTab, setActiveTab] = useState('executive'); // 'executive', 'staff', 'system_config', 'audit_logs'
  const [searchTerm, setSearchTerm] = useState('');

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

  return (
    <div className="py-4 bg-light min-vh-100">
      <div className="container-xl">
        
        {/* Super Admin Executive Top Header */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 p-4 rounded-4 mb-4 text-white shadow-sm"
          style={{ background: 'linear-gradient(135deg, #2C1A4D 0%, #4B2E83 50%, #159B64 100%)' }}
        >
          <div className="d-flex align-items-center gap-3">
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center text-white"
              style={{ width: '56px', height: '56px', backgroundColor: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)' }}
            >
              <FaCrown size={28} color="#F1C40F" />
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <h4 className="fw-bold mb-0">Super Admin Executive Portal</h4>
                <span className="badge bg-warning text-dark fw-bold px-2 py-1" style={{ fontSize: '11px' }}>ROOT ACCESS</span>
              </div>
              <p className="mb-0 text-white-50" style={{ fontSize: '13px' }}>
                Full system oversight, staff privilege governance, master revenue analytics & platform configuration.
              </p>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            <Link to="/admin-dashboard" className="btn btn-sm btn-light fw-bold px-3 py-2 text-dark">
              <FaUserShield className="me-1 text-primary" /> Store Admin View
            </Link>
            <button 
              onClick={() => switchRole('customer')} 
              className="btn btn-sm btn-outline-light px-3 py-2"
            >
              Back to Store
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="d-flex gap-2 mb-4 overflow-auto pb-1">
          <button
            onClick={() => setActiveTab('executive')}
            className={`btn btn-sm px-4 py-2 fw-bold rounded-pill d-flex align-items-center gap-2 ${
              activeTab === 'executive' ? 'btn-dark text-white shadow-sm' : 'btn-white bg-white text-secondary border'
            }`}
          >
            <FaChartLine /> Executive Overview
          </button>
          <button
            onClick={() => setActiveTab('staff')}
            className={`btn btn-sm px-4 py-2 fw-bold rounded-pill d-flex align-items-center gap-2 ${
              activeTab === 'staff' ? 'btn-dark text-white shadow-sm' : 'btn-white bg-white text-secondary border'
            }`}
          >
            <FaUsers /> Staff & Access Control ({staffList.length})
          </button>
          <button
            onClick={() => setActiveTab('system_config')}
            className={`btn btn-sm px-4 py-2 fw-bold rounded-pill d-flex align-items-center gap-2 ${
              activeTab === 'system_config' ? 'btn-dark text-white shadow-sm' : 'btn-white bg-white text-secondary border'
            }`}
          >
            <FaCog /> Platform Governance & Tax
          </button>
          <button
            onClick={() => setActiveTab('audit_logs')}
            className={`btn btn-sm px-4 py-2 fw-bold rounded-pill d-flex align-items-center gap-2 ${
              activeTab === 'audit_logs' ? 'btn-dark text-white shadow-sm' : 'btn-white bg-white text-secondary border'
            }`}
          >
            <FaHistory /> Security Audit Logs
          </button>
        </div>

        {/* 1. EXECUTIVE OVERVIEW */}
        {activeTab === 'executive' && (
          <div>
            {/* Top KPI Cards */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-sm-6 col-lg-3">
                <div className="card-auramed p-3 bg-white h-100">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="text-secondary" style={{ fontSize: '12px' }}>Gross Platform GMV</span>
                    <div className="p-2 rounded-circle bg-success-subtle text-success">
                      <FaFileInvoiceDollar size={16} />
                    </div>
                  </div>
                  <div className="fs-3 fw-bold text-dark">₹1,48,920.00</div>
                  <small className="text-success fw-semibold d-flex align-items-center gap-1">
                    <FaArrowUp size={10} /> 22.4% vs last cycle
                  </small>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div className="card-auramed p-3 bg-white h-100">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="text-secondary" style={{ fontSize: '12px' }}>Active Super/Admin Staff</span>
                    <div className="p-2 rounded-circle bg-primary-subtle text-primary">
                      <FaUserShield size={16} />
                    </div>
                  </div>
                  <div className="fs-3 fw-bold text-dark">{staffList.length + 2}</div>
                  <small className="text-muted">Zero unauthorized attempts</small>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div className="card-auramed p-3 bg-white h-100">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="text-secondary" style={{ fontSize: '12px' }}>Total Formulary SKUs</span>
                    <div className="p-2 rounded-circle bg-warning-subtle text-warning">
                      <FaDatabase size={16} />
                    </div>
                  </div>
                  <div className="fs-3 fw-bold text-dark">{productsList.length} Items</div>
                  <small className="text-success fw-semibold">100% Licensed batch supply</small>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div className="card-auramed p-3 bg-white h-100">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="text-secondary" style={{ fontSize: '12px' }}>System Health Uptime</span>
                    <div className="p-2 rounded-circle bg-info-subtle text-info">
                      <FaServer size={16} />
                    </div>
                  </div>
                  <div className="fs-3 fw-bold text-dark">99.98%</div>
                  <small className="text-success fw-semibold">Cloud nodes healthy</small>
                </div>
              </div>
            </div>

            {/* Platform Master Breakdown */}
            <div className="row g-4">
              <div className="col-lg-8">
                <div className="card-auramed p-4 bg-white">
                  <h6 className="fw-bold text-dark mb-3">Enterprise Financial & Fulfillment Performance</h6>
                  <div className="p-3 bg-light rounded-3 mb-3 border">
                    <div className="row text-center g-3">
                      <div className="col-4 border-end">
                        <small className="text-muted d-block" style={{ fontSize: '11px' }}>PRESCRIPTION ORDERS</small>
                        <strong className="fs-5 text-dark">{orders.length + 42}</strong>
                      </div>
                      <div className="col-4 border-end">
                        <small className="text-muted d-block" style={{ fontSize: '11px' }}>DOCTOR SESSIONS</small>
                        <strong className="fs-5 text-dark">{doctorAppointments.length + 18}</strong>
                      </div>
                      <div className="col-4">
                        <small className="text-muted d-block" style={{ fontSize: '11px' }}>AVG PLATFORM BASKET</small>
                        <strong className="fs-5 text-dark-green">₹640</strong>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between pt-2">
                    <div className="text-secondary" style={{ fontSize: '13px' }}>
                      <FaShieldAlt className="text-success me-1" />
                      Encrypted multi-tenant compliance ledger active with automated fraud screening.
                    </div>
                    <span className="badge bg-success-subtle text-success">Compliant</span>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card-auramed p-4 bg-white">
                  <h6 className="fw-bold text-dark mb-3">Quick Platform Actions</h6>
                  <div className="d-flex flex-column gap-2">
                    <button 
                      onClick={() => setActiveTab('staff')}
                      className="btn btn-outline-dark text-start d-flex align-items-center justify-content-between p-2 rounded-3"
                    >
                      <span><FaUserPlus className="me-2 text-primary" /> Manage Staff Permissions</span>
                      <span>→</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('system_config')}
                      className="btn btn-outline-dark text-start d-flex align-items-center justify-content-between p-2 rounded-3"
                    >
                      <span><FaCog className="me-2 text-warning" /> Adjust Delivery & Tax Rates</span>
                      <span>→</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('audit_logs')}
                      className="btn btn-outline-dark text-start d-flex align-items-center justify-content-between p-2 rounded-3"
                    >
                      <span><FaLock className="me-2 text-danger" /> Review Security Audit Logs</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. STAFF & ACCESS CONTROL */}
        {activeTab === 'staff' && (
          <div className="card-auramed p-4 bg-white">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
              <div>
                <h5 className="fw-bold text-dark mb-1">Administrative Role & Personnel Directory</h5>
                <p className="text-secondary mb-0" style={{ fontSize: '13px' }}>
                  Super Admin exclusive privilege: Grant, promote, or revoke staff authorization levels.
                </p>
              </div>

              <div className="input-group" style={{ maxWidth: '280px' }}>
                <span className="input-group-text bg-white border-end-0"><FaSearch size={12} color="#999" /></span>
                <input 
                  type="text" 
                  className="form-control border-start-0" 
                  placeholder="Search staff members..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontSize: '13px' }}
                />
              </div>
            </div>

            <div className="table-responsive">
              <table className="table align-middle table-hover" style={{ fontSize: '13px' }}>
                <thead className="table-light">
                  <tr>
                    <th>STAFF MEMBER</th>
                    <th>ASSIGNED ROLE</th>
                    <th>DEPARTMENT / TITLE</th>
                    <th>STATUS</th>
                    <th>LAST ACTIVE</th>
                    <th className="text-end">SUPER ADMIN ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {staffList
                    .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.email.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(member => (
                    <tr key={member.id}>
                      <td>
                        <div className="fw-bold text-dark">{member.name}</div>
                        <div className="text-muted" style={{ fontSize: '11px' }}>{member.email}</div>
                      </td>
                      <td>
                        <span className={`badge ${
                          member.role === 'admin' ? 'bg-primary' :
                          member.role === 'pharmacist' ? 'bg-success' :
                          member.role === 'delivery' ? 'bg-warning text-dark' : 'bg-secondary'
                        }`}>
                          {member.role.toUpperCase()}
                        </span>
                      </td>
                      <td>{member.title}</td>
                      <td>
                        <span className={`badge ${member.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="text-muted">{member.lastActive}</td>
                      <td className="text-end">
                        <div className="d-inline-flex gap-2">
                          {member.role !== 'admin' && (
                            <button
                              onClick={() => handlePromoteRole(member.id, 'admin')}
                              className="btn btn-sm btn-outline-primary"
                              title="Promote to Store Admin"
                              style={{ fontSize: '11px' }}
                            >
                              Promote to Admin
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

        {/* 3. PLATFORM GOVERNANCE & TAX */}
        {activeTab === 'system_config' && (
          <div className="card-auramed p-4 bg-white" style={{ maxWidth: '780px' }}>
            <h5 className="fw-bold text-dark mb-1">Global Platform Governance Settings</h5>
            <p className="text-secondary mb-4" style={{ fontSize: '13px' }}>
              Define enterprise thresholds, express shipping policies, and taxation variables.
            </p>

            {savedNotice && (
              <div className="alert alert-success d-flex align-items-center gap-2 py-2" role="alert">
                <FaCheckCircle /> Platform settings saved and propagated to live production nodes!
              </div>
            )}

            <form onSubmit={handleSaveConfig}>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Free Delivery Threshold (₹)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={config.freeDeliveryThreshold}
                    onChange={(e) => setConfig({ ...config, freeDeliveryThreshold: Number(e.target.value) })}
                  />
                  <small className="text-muted">Orders above this amount receive complimentary delivery.</small>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Standard / Express Delivery Fee (₹)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={config.expressDeliveryFee}
                    onChange={(e) => setConfig({ ...config, expressDeliveryFee: Number(e.target.value) })}
                  />
                  <small className="text-muted">Applied when cart subtotal is under threshold.</small>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Doctor Platform Convenience Fee (%)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={config.platformConveniencePct}
                    onChange={(e) => setConfig({ ...config, platformConveniencePct: Number(e.target.value) })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>GST / Statutory Medical Tax (%)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={config.taxGstPct}
                    onChange={(e) => setConfig({ ...config, taxGstPct: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="p-3 rounded-3 bg-light border mb-4">
                <div className="form-check form-switch mb-2">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="maintMode"
                    checked={config.maintenanceMode}
                    onChange={(e) => setConfig({ ...config, maintenanceMode: e.target.checked })}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="maintMode" style={{ fontSize: '13px' }}>
                    Emergency Platform Maintenance Mode (Locks checkout)
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
                  <label className="form-check-label fw-semibold" htmlFor="autoRx" style={{ fontSize: '13px' }}>
                    Automated AI Prescription OCR Pre-Verification
                  </label>
                </div>
              </div>

              <button type="submit" className="btn btn-dark fw-bold px-4 py-2">
                Save Global Configuration
              </button>
            </form>
          </div>
        )}

        {/* 4. SECURITY AUDIT LOGS */}
        {activeTab === 'audit_logs' && (
          <div className="card-auramed p-4 bg-white">
            <h5 className="fw-bold text-dark mb-1">System Security & Access Audit Trail</h5>
            <p className="text-secondary mb-4" style={{ fontSize: '13px' }}>
              Immutable append-only chronological log of all administrative actions, logins, and permission changes.
            </p>

            <div className="table-responsive">
              <table className="table align-middle table-sm" style={{ fontSize: '12px' }}>
                <thead className="table-light">
                  <tr>
                    <th>EVENT ID</th>
                    <th>ACTION / EVENT</th>
                    <th>AUTHORIZED ACTOR</th>
                    <th>TIMESTAMP</th>
                    <th>NETWORK IP</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map(log => (
                    <tr key={log.id}>
                      <td className="fw-mono text-muted">{log.id}</td>
                      <td className="fw-bold text-dark">{log.action}</td>
                      <td>{log.actor}</td>
                      <td className="text-muted">{log.timestamp}</td>
                      <td><code>{log.ip}</code></td>
                      <td><span className="badge bg-success-subtle text-success">{log.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
