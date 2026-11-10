import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaSearch, FaMapMarkerAlt, FaFileMedical, FaUserMd, 
  FaFlask, FaHeart, FaShoppingCart, FaUser, FaBars, 
  FaChevronDown, FaBell, FaTimes, FaCheckCircle, FaExchangeAlt,
  FaArrowRight
} from 'react-icons/fa';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { useAuth } from '../../hooks/useAuth';
import { useHealthcare } from '../../hooks/useHealthcare';
import { CATEGORIES } from '../../pages/Categories/CategoriesPage';
import DeliveryLocationDrawer from './DeliveryLocationDrawer';
import LoginDrawer from './LoginDrawer';
import WishlistDrawer from './WishlistDrawer';
import ProfileDrawer from './ProfileDrawer';
import cureonlogo from '../../assets/images/cureon-logo.png'

export default function Header({ onOpenSidebar, onOpenRoleModal }) {
  const navigate = useNavigate();
  const { itemsCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { currentUser, selectedLocation, setSelectedLocation, isLoggedIn } = useAuth();
  const { productsList } = useHealthcare();

  // Search autocomplete state
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const searchRef = useRef(null);

  // Mega menu & Drawer states
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const [showLocationDrawer, setShowLocationDrawer] = useState(false);
  const [showLoginDrawer, setShowLoginDrawer] = useState(false);
  const [showWishlistDrawer, setShowWishlistDrawer] = useState(false);

  // Handle outside click for search
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchBox(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const matches = productsList.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.composition.toLowerCase().includes(q)
    ).slice(0, 6);
    setFilteredResults(matches);
  }, [searchQuery, productsList]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchBox(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSelectResult = (productId) => {
    setShowSearchBox(false);
    setSearchQuery('');
    navigate(`/products/${productId}`);
  };

  return (
    <>
      {/* ========================================================= */}
      {/* MOBILE STICKY HEADER CONTAINER (Combines Logo, Address, Hamburger, Search, Cart) */}
      {/* ========================================================= */}
      <div 
        className="d-flex d-md-none flex-column w-100 position-sticky"
        style={{ 
          top: 0, 
          zIndex: 1050, 
          backgroundColor: '#0F392B',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}
      >
        
        {/* ROW 1: Logo + Address + Hamburger */}
        <div 
          className="d-flex align-items-center justify-content-between px-3 text-white"
          style={{ height: '54px', width: '100%' }}
        >
          {/* Left: Logo + Address */}
          <div className="d-flex align-items-center gap-2 overflow-hidden" style={{ flex: 1 }}>
            <Link to="/" className="text-decoration-none flex-shrink-0">
              <img 
                src={cureonlogo} 
                alt="CUREON" 
                style={{ 
                  height: '28px', 
                  width: 'auto', 
                  objectFit: 'contain', 
                  background: '#FFFFFF', 
                  borderRadius: '4px', 
                  padding: '2px 5px' 
                }} 
              />
            </Link>

            <button 
              type="button"
              onClick={() => setShowLocationDrawer(true)} 
              className="btn text-start p-0 border-0 bg-transparent text-white d-flex flex-column overflow-hidden"
              style={{ cursor: 'pointer', maxWidth: '130px' }}
            >
              <span style={{ fontSize: '9px', color: '#A7F3D0', fontWeight: '600', lineHeight: 1 }}>
                Delivery Address
              </span>
              <div className="d-flex align-items-center gap-1 mt-1">
                <span className="fw-bold text-white text-truncate" style={{ fontSize: '11px' }}>
                  {selectedLocation || 'Moradabad 244001, Ut...'}
                </span>
                <FaChevronDown size={8} color="#A7F3D0" className="flex-shrink-0" />
              </div>
            </button>
          </div>

          {/* Right: Hamburger Menu */}
          <button
            type="button"
            onClick={onOpenSidebar}
            className="btn p-0 border-0 d-flex align-items-center justify-content-center text-white flex-shrink-0"
            style={{
              width: '34px',
              height: '34px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
            aria-label="Open menu drawer"
          >
            <FaBars size={16} color="#FFFFFF" />
          </button>
        </div>

        {/* ROW 2: Full Width Search Bar + Cart */}
        <div 
          className="d-flex align-items-center gap-2 px-3 pb-2 pt-1 w-100"
        >
          <form onSubmit={handleSearchSubmit} className="flex-grow-1 position-relative m-0">
            <div 
              className="d-flex align-items-center bg-white rounded-3 px-2" 
              style={{ height: '38px', width: '100%' }}
            >
              <FaSearch size={14} color="#005F40" className="me-2 flex-shrink-0" />
              <input
                type="text"
                className="form-control border-0 p-0 shadow-none text-dark w-100"
                style={{ fontSize: '13px', backgroundColor: 'transparent' }}
                placeholder="Search Medicines"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchBox(true);
                }}
                onFocus={() => setShowSearchBox(true)}
              />
            </div>
          </form>

          <Link
            to="/cart"
            className="position-relative d-flex align-items-center justify-content-center rounded-3 text-white text-decoration-none flex-shrink-0"
            style={{
              width: '38px',
              height: '38px',
              backgroundColor: '#092B1F',
              border: '1px solid rgba(255, 255, 255, 0.18)'
            }}
            aria-label="View Cart"
          >
            <FaShoppingCart size={16} color="#FFFFFF" />
            <span
              className="position-absolute top-0 end-0 badge rounded-circle d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: '#FF5263',
                color: '#FFFFFF',
                fontSize: '10px',
                fontWeight: '700',
                width: '16px',
                height: '16px',
                transform: 'translate(20%, -20%)',
                padding: 0
              }}
            >
              {itemsCount}
            </span>
          </Link>
        </div>
      </div>
      {/* ========================================================= */}


      <header className="header-main d-none d-md-block">
        {/* Main Header Row */}
        <div className="container-xl py-2 py-md-3">
          <div className="d-flex align-items-center justify-content-between gap-3">
            
            {/* Mobile Hamburger + Logo */}
            <div className="d-flex align-items-center gap-2">
              <button 
                onClick={onOpenSidebar}
                className="btn btn-outline-light border-0 text-dark p-2 d-xl-none"
                aria-label="Open menu"
              >
                <FaBars size={22} color="#159B64" />
              </button>

              <Link to="/" className="d-flex align-items-center text-decoration-none">
                <img 
                  src={cureonlogo}
                  alt="CUREON" 
                  style={{ height: '48px', width: 'auto', objectFit: 'contain' }} 
                />
              </Link>
            </div>

            {/* Location Selector (Pill) */}
            <div>
              <button 
                onClick={() => setShowLocationDrawer(true)}
                className="btn btn-sm btn-light border d-flex align-items-center gap-2 text-start px-2 px-md-3 py-1 py-md-2"
                style={{ borderRadius: '20px', backgroundColor: '#F8FAF9', cursor: 'pointer' }}
                title="Select Delivery Location"
              >
                <FaMapMarkerAlt color="#159B64" size={14} className="flex-shrink-0" />
                <div style={{ lineHeight: 1.2 }}>
                  <div className="text-secondary d-none d-sm-block" style={{ fontSize: '10px' }}>DELIVER TO</div>
                  <div className="fw-bold text-truncate" style={{ fontSize: '13px', maxWidth: '130px' }}>
                    {selectedLocation}
                  </div>
                </div>
                <FaChevronDown size={11} className="text-secondary ms-1 flex-shrink-0" />
              </button>
            </div>

            {/* Medicine Global Search Bar */}
            <div className="flex-grow-1 mx-2 mx-xl-4 position-relative" ref={searchRef} style={{ maxWidth: '620px' }}>
              <form onSubmit={handleSearchSubmit} className="d-flex position-relative">
                <input
                  type="text"
                  className="form-control form-control-auramed ps-4 pe-5 py-2 w-100"
                  style={{ borderRadius: '24px', fontSize: '14px', height: '44px' }}
                  placeholder="Search for medicines, lab tests, active salt, doctors..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchBox(true);
                  }}
                  onFocus={() => setShowSearchBox(true)}
                />
                <button
                  type="submit"
                  className="btn position-absolute end-0 top-0 bottom-0 me-1 d-flex align-items-center justify-content-center text-white"
                  style={{ width: '40px', backgroundColor: '#159B64', borderRadius: '50%', margin: '2px', border: 'none' }}
                  aria-label="Search"
                >
                  <FaSearch size={14} />
                </button>
              </form>

              {/* Autocomplete Dropdown */}
              {showSearchBox && (
                <div className="search-autocomplete-box p-3">
                  {searchQuery.trim().length > 0 ? (
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-2 pb-1 border-bottom">
                        <span className="text-secondary text-uppercase" style={{ fontSize: '11px', fontWeight: 600 }}>
                          Matching Products ({filteredResults.length})
                        </span>
                        <button 
                          className="btn btn-sm btn-link text-secondary p-0 text-decoration-none"
                          onClick={() => setShowSearchBox(false)}
                        >
                          <FaTimes size={12} />
                        </button>
                      </div>

                      {filteredResults.length > 0 ? (
                        <div className="list-group list-group-flush">
                          {filteredResults.map(p => (
                            <button
                              key={p.id}
                              onClick={() => handleSelectResult(p.id)}
                              className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-2 px-1 border-0"
                              style={{ borderRadius: '6px' }}
                            >
                              <img 
                                src={p.image} 
                                alt={p.name} 
                                style={{ width: '40px', height: '40px', objectFit: 'contain', background: '#F8FAF9', borderRadius: '4px' }} 
                              />
                              <div className="text-start flex-grow-1">
                                <div className="fw-semibold text-dark text-truncate" style={{ fontSize: '13px' }}>
                                  {p.name}
                                </div>
                                <div className="text-secondary" style={{ fontSize: '11px' }}>
                                  {p.brand} • <span className="text-primary-green fw-bold">₹{(p.price * 25).toFixed(0)}</span>
                                </div>
                              </div>
                              {p.prescriptionRequired && (
                                <span className="badge-rx">Rx</span>
                              )}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-secondary">
                          <p className="mb-1" style={{ fontSize: '14px' }}>No direct medicine match for "{searchQuery}"</p>
                          <small>Try searching generic active salt, vitamins, or diagnostic test</small>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="mb-3">
                        <div className="text-secondary text-uppercase mb-2" style={{ fontSize: '11px', fontWeight: 600 }}>
                          Popular Searches
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                          {['Vitamin C', 'Blood Pressure Monitor', 'Amoxiclav', 'Full Body Checkup', 'Omega 3', 'Diabetes Strips'].map((term, i) => (
                            <button
                              key={i}
                              type="button"
                              className="btn btn-sm btn-light border py-1 px-3 text-secondary"
                              style={{ fontSize: '12px', borderRadius: '14px' }}
                              onClick={() => {
                                setSearchQuery(term);
                                navigate(`/products?search=${encodeURIComponent(term)}`);
                                setShowSearchBox(false);
                              }}
                            >
                              <FaSearch size={10} className="me-1 text-muted" /> {term}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-secondary text-uppercase mb-2" style={{ fontSize: '11px', fontWeight: 600 }}>
                          Browse Top Categories
                        </div>
                        <div className="row g-2">
                          {CATEGORIES.slice(0, 4).map(c => (
                            <div key={c.id} className="col-6">
                              <Link 
                                to={`/categories/${c.slug}`}
                                onClick={() => setShowSearchBox(false)}
                                className="text-decoration-none text-dark d-block p-2 rounded bg-light hover-bg"
                                style={{ fontSize: '12px' }}
                              >
                                {c.name}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Actions (Prescription + Icons) */}
            <div className="d-flex align-items-center gap-2 gap-md-3">
              
              {/* Wishlist Button */}
              <button 
                type="button"
                onClick={() => setShowWishlistDrawer(true)}
                className="btn btn-light position-relative p-2 rounded-circle border d-none d-sm-inline-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px', cursor: 'pointer', backgroundColor: '#F8FAF9' }}
                aria-label="Wishlist"
                title="My Wishlist"
              >
                <FaHeart size={18} color="#64756D" />
                {wishlistCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '10px' }}>
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <Link 
                to="/cart" 
                className="btn position-relative d-inline-flex align-items-center justify-content-center text-decoration-none p-2 border-0 bg-transparent"
                style={{ 
                  color: '#172B24',
                  marginRight: '6px'
                }}
                aria-label="Shopping Cart"
                title="View Cart"
              >
                <FaShoppingCart size={22} color="#172B24" />
                <span 
                  className="position-absolute top-0 start-100 translate-middle badge rounded-circle d-flex align-items-center justify-content-center"
                  style={{ 
                    backgroundColor: '#FF5263',
                    color: '#FFFFFF',
                    fontSize: '11px', 
                    fontWeight: '700',
                    width: '18px',
                    height: '18px',
                    padding: 0,
                    marginTop: '4px',
                    marginLeft: '-4px'
                  }}
                >
                  {itemsCount}
                </span>
              </Link>

              {/* Login Button */}
              {!isLoggedIn ? (
                <button
                  onClick={() => setShowLoginDrawer(true)}
                  className="btn d-inline-flex align-items-center gap-2 px-3 py-1 text-decoration-none"
                  style={{
                    border: '1.5px solid #005F40',
                    color: '#005F40',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '15px',
                    height: '38px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                  }}
                  title="Click to Log In"
                >
                  <span>Login</span>
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '22px', height: '22px', border: '1.5px solid #005F40' }}
                  >
                    <FaUser size={11} color="#005F40" />
                  </div>
                </button>
              ) : (
                <div>
                  <button
                    type="button"
                    onClick={() => setShowProfileDrawer(true)}
                    className="btn btn-light border p-1 rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                    style={{ width: '40px', height: '40px', cursor: 'pointer' }}
                    aria-label="User account"
                    title="Open Account Menu"
                  >
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name} 
                      className="rounded-circle" 
                      style={{ width: '32px', height: '32px', objectFit: 'cover' }} 
                    />
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* Navigation Bar & Mega Menu */}
        <nav className="border-top d-none d-xl-block" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="container-xl position-relative">
            <div className="d-flex align-items-center justify-content-between">
              
              <ul className="nav align-items-center mb-0" style={{ gap: '4px' }}>
                {/* Mega Menu Toggle */}
                <li 
                  className="nav-item position-static"
                  onMouseEnter={() => setShowMegaMenu(true)}
                  onMouseLeave={() => setShowMegaMenu(false)}
                >
                  <button 
                    className="btn btn-link text-dark fw-bold text-decoration-none py-2 px-3 d-flex align-items-center gap-2"
                    style={{ fontSize: '14px' }}
                  >
                    <FaBars color="#159B64" /> All Categories <FaChevronDown size={11} />
                  </button>

                  {/* Mega Menu Flyout */}
                  {showMegaMenu && (
                    <div 
                      className="mega-menu-container"
                      onMouseEnter={() => setShowMegaMenu(true)}
                      onMouseLeave={() => setShowMegaMenu(false)}
                    >
                      <div className="row g-4">
                        <div className="col-3">
                          <h6 className="fw-bold text-dark-green border-bottom pb-2">Ethical Medicines</h6>
                          <ul className="list-unstyled mb-0" style={{ fontSize: '13px' }}>
                            <li className="py-1"><Link to="/categories/prescription-medicines" className="text-secondary text-decoration-none hover-green">Prescription Medicines</Link></li>
                            <li className="py-1"><Link to="/categories/otc-medicines" className="text-secondary text-decoration-none hover-green">OTC Medicines</Link></li>
                            <li className="py-1"><Link to="/categories/diabetes-care" className="text-secondary text-decoration-none hover-green">Diabetes Care & Monitoring</Link></li>
                            <li className="py-1"><Link to="/categories/cardiac-care" className="text-secondary text-decoration-none hover-green">Cardiac Care & BP Support</Link></li>
                            <li className="py-1"><Link to="/categories/pain-relief" className="text-secondary text-decoration-none hover-green">Pain Relief & Analgesics</Link></li>
                          </ul>
                        </div>
                        <div className="col-3">
                          <h6 className="fw-bold text-dark-green border-bottom pb-2">Wellness & Ayurveda</h6>
                          <ul className="list-unstyled mb-0" style={{ fontSize: '13px' }}>
                            <li className="py-1"><Link to="/categories/vitamins-supplements" className="text-secondary text-decoration-none hover-green">Vitamins & Supplements</Link></li>
                            <li className="py-1"><Link to="/categories/ayurvedic-medicines" className="text-secondary text-decoration-none hover-green">Ayurvedic Remedies & Herbs</Link></li>
                            <li className="py-1"><Link to="/categories/protein-nutrition" className="text-secondary text-decoration-none hover-green">Protein & Fitness Nutrition</Link></li>
                            <li className="py-1"><Link to="/categories/health-fitness" className="text-secondary text-decoration-none hover-green">Health & Fitness Trackers</Link></li>
                          </ul>
                        </div>
                        <div className="col-3">
                          <h6 className="fw-bold text-dark-green border-bottom pb-2">Personal & Family Care</h6>
                          <ul className="list-unstyled mb-0" style={{ fontSize: '13px' }}>
                            <li className="py-1"><Link to="/categories/skin-care" className="text-secondary text-decoration-none hover-green">Dermatology & Skin Care</Link></li>
                            <li className="py-1"><Link to="/categories/hair-care" className="text-secondary text-decoration-none hover-green">Hair Loss & Anti-Dandruff</Link></li>
                            <li className="py-1"><Link to="/categories/baby-mother-care" className="text-secondary text-decoration-none hover-green">Baby Food & Mother Care</Link></li>
                            <li className="py-1"><Link to="/categories/personal-care" className="text-secondary text-decoration-none hover-green">Everyday Personal Hygiene</Link></li>
                          </ul>
                        </div>
                        <div className="col-3">
                          <div className="p-3 rounded" style={{ backgroundColor: '#EAF7F0' }}>
                            <div className="badge bg-success mb-2">Special Offer</div>
                            <h6 className="fw-bold text-dark">Flat 20% Off Everyday Medicines</h6>
                            <p className="text-secondary mb-3" style={{ fontSize: '12px' }}>
                              Licensed healthcare products delivered safely with verified authenticity.
                            </p>
                            <Link to="/products" className="btn btn-sm btn-auramed w-100">
                              Shop All Medicines <FaArrowRight size={11} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>

                {/* Direct Page Links */}
                <li className="nav-item">
                  <Link to="/products" className="nav-link text-dark fw-semibold py-2 px-3" style={{ fontSize: '14px' }}>
                    Shop Medicines
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/doctors" className="nav-link text-dark fw-semibold py-2 px-3 d-flex align-items-center gap-1" style={{ fontSize: '14px' }}>
                    <FaUserMd color="#159B64" /> Find Doctors
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/lab-tests" className="nav-link text-dark fw-semibold py-2 px-3 d-flex align-items-center gap-1" style={{ fontSize: '14px' }}>
                    <FaFlask color="#159B64" /> Lab Tests <span className="badge bg-danger ms-1" style={{ fontSize: '9px' }}>UP TO 55% OFF</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Delivery Location Right-Side Sliding Drawer */}
      <DeliveryLocationDrawer 
        isOpen={showLocationDrawer} 
        onClose={() => setShowLocationDrawer(false)} 
      />

      {/* Login Right-Side Sliding Drawer */}
      <LoginDrawer 
        isOpen={showLoginDrawer} 
        onClose={() => setShowLoginDrawer(false)} 
      />

      {/* Wishlist Right-Side Sliding Drawer */}
      <WishlistDrawer 
        isOpen={showWishlistDrawer} 
        onClose={() => setShowWishlistDrawer(false)} 
      />

      {/* Profile Right-Side Sliding Drawer */}
      <ProfileDrawer 
        isOpen={showProfileDrawer} 
        onClose={() => setShowProfileDrawer(false)} 
        onOpenLogin={() => setShowLoginDrawer(true)}
      />
    </>
  );
}