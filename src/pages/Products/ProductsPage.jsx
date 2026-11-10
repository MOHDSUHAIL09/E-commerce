import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  FaFilter, FaSortAmountDown, FaSearch, FaStar, 
  FaTimes, FaUndo, FaCheckSquare, FaSquare, FaPills
} from 'react-icons/fa';
import ProductCard from '../../components/products/ProductCard';
import QuickViewModal from '../../components/common/QuickViewModal';
import { useHealthcare } from '../../context/HealthcareContext';
import { CATEGORIES } from '../Categories/CategoriesPage';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { productsList } = useHealthcare();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Filters state
  const searchParam = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [rxFilter, setRxFilter] = useState('all'); // 'all', 'rx', 'otc'
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popularity'); // 'popularity', 'price-low', 'price-high', 'rating', 'name'
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Extract distinct brands
  const brandsList = useMemo(() => {
    return Array.from(new Set(productsList.map(p => p.brand))).sort();
  }, [productsList]);

  // Handle brand toggle
  const toggleBrand = (b) => {
    setSelectedBrands(prev =>
      prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBrands([]);
    setMaxPrice(1500);
    setRxFilter('all');
    setInStockOnly(false);
    setMinRating(0);
    setSortBy('popularity');
    setSearchParams({});
  };

  // Filter and Sort Pipeline
  const filteredProducts = useMemo(() => {
    return productsList.filter(prod => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          prod.name.toLowerCase().includes(q) ||
          prod.brand.toLowerCase().includes(q) ||
          prod.category.toLowerCase().includes(q) ||
          prod.composition.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Category
      if (selectedCategory !== 'all') {
        if (prod.categorySlug !== selectedCategory && prod.category !== selectedCategory) {
          return false;
        }
      }

      // Brands
      if (selectedBrands.length > 0 && !selectedBrands.includes(prod.brand)) {
        return false;
      }

      // Price
      const effectivePrice = prod.inrPrice || prod.price * 25;
      if (effectivePrice > maxPrice) {
        return false;
      }

      // Rx type
      if (rxFilter === 'rx' && !prod.prescriptionRequired) return false;
      if (rxFilter === 'otc' && prod.prescriptionRequired) return false;

      // In stock
      if (inStockOnly && !prod.inStock) return false;

      // Rating
      if (prod.rating < minRating) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name');
      // Popularity default
      return b.reviewsCount - a.reviewsCount;
    });
  }, [productsList, searchQuery, selectedCategory, selectedBrands, maxPrice, rxFilter, inStockOnly, minRating, sortBy]);

  return (
    <div className="py-4">
      <div className="container-xl">
        
        {/* Breadcrumb & Title */}
        <nav aria-label="breadcrumb" className="mb-2">
          <ol className="breadcrumb" style={{ fontSize: '13px' }}>
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Pharmacy Catalog</li>
          </ol>
        </nav>

        <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-3">
          <div>
            <h2 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
              <FaPills color="#159B64" /> Medicines & Health Store
            </h2>
            <p className="text-secondary mb-0" style={{ fontSize: '14px' }}>
              Showing {filteredProducts.length} authentic healthcare formulations
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className="btn btn-outline-secondary d-lg-none d-flex align-items-center gap-2"
            >
              <FaFilter /> Filters
            </button>

            {/* Sort Dropdown */}
            <div className="d-flex align-items-center gap-2">
              <span className="text-secondary d-none d-sm-inline" style={{ fontSize: '13px' }}>Sort by:</span>
              <select
                className="form-select form-select-sm"
                style={{ width: '180px' }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popularity">Most Popular</option>
                <option value="rating">Top Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Product Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row g-4">
          
          {/* Left Sidebar Filter Column */}
          <div className={`col-lg-3 ${showMobileFilter ? 'd-block' : 'd-none d-lg-block'}`}>
            <div className="card-auramed p-3 sticky-top" style={{ top: '140px' }}>
              
              <div className="d-flex align-items-center justify-content-between pb-2 mb-3 border-bottom">
                <span className="fw-bold text-dark d-flex align-items-center gap-2">
                  <FaFilter color="#159B64" /> Filter Options
                </span>
                <button
                  onClick={resetFilters}
                  className="btn btn-sm btn-link text-secondary p-0 text-decoration-none d-flex align-items-center gap-1"
                  style={{ fontSize: '12px' }}
                >
                  <FaUndo size={10} /> Reset All
                </button>
              </div>

              {/* Search Within Catalog */}
              <div className="mb-4">
                <label className="fw-semibold text-dark mb-1" style={{ fontSize: '13px' }}>Keyword Search</label>
                <div className="input-group input-group-sm">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search medicines..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button className="btn btn-outline-secondary" onClick={() => setSearchQuery('')}>
                      <FaTimes size={11} />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <label className="fw-semibold text-dark mb-2" style={{ fontSize: '13px' }}>Category</label>
                <select
                  className="form-select form-select-sm"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Healthcare Categories</option>
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Product Type (Rx vs OTC) */}
              <div className="mb-4">
                <label className="fw-semibold text-dark mb-2" style={{ fontSize: '13px' }}>Prescription Type</label>
                <div className="d-flex flex-column gap-1">
                  <label className="form-check-label d-flex align-items-center gap-2 cursor-pointer" style={{ fontSize: '13px' }}>
                    <input
                      type="radio"
                      name="rxFilter"
                      className="form-check-input"
                      checked={rxFilter === 'all'}
                      onChange={() => setRxFilter('all')}
                    />
                    <span>All Products</span>
                  </label>
                  <label className="form-check-label d-flex align-items-center gap-2 cursor-pointer" style={{ fontSize: '13px' }}>
                    <input
                      type="radio"
                      name="rxFilter"
                      className="form-check-input"
                      checked={rxFilter === 'otc'}
                      onChange={() => setRxFilter('otc')}
                    />
                    <span>OTC (No Prescription Required)</span>
                  </label>
                  <label className="form-check-label d-flex align-items-center gap-2 cursor-pointer" style={{ fontSize: '13px' }}>
                    <input
                      type="radio"
                      name="rxFilter"
                      className="form-check-input"
                      checked={rxFilter === 'rx'}
                      onChange={() => setRxFilter('rx')}
                    />
                    <span>Prescription Required (Rx)</span>
                  </label>
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label className="fw-semibold text-dark" style={{ fontSize: '13px' }}>Max Price</label>
                  <span className="fw-bold text-primary-green" style={{ fontSize: '13px' }}>₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  className="form-range"
                  min="100"
                  max="1500"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
                <div className="d-flex justify-content-between text-secondary" style={{ fontSize: '11px' }}>
                  <span>₹100</span>
                  <span>₹1500+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Product Grid Column */}
          <div className="col-lg-9">
            {filteredProducts.length > 0 ? (
              <div className="row g-3">
                {filteredProducts.map(prod => (
                  <div key={prod.id} className="col-12 col-sm-6 col-xl-4">
                    <ProductCard product={prod} onQuickView={setQuickViewProduct} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="card-auramed p-5 text-center my-4">
                <div className="rounded-circle p-3 bg-light-green text-primary-green d-inline-flex mx-auto mb-3">
                  <FaSearch size={32} />
                </div>
                <h4 className="fw-bold text-dark">No formulations matched your criteria</h4>
                <p className="text-secondary mx-auto mb-4" style={{ maxWidth: '420px', fontSize: '14px' }}>
                  Try resetting applied filters, adjusting price boundaries, or search for generic active salts.
                </p>
                <button onClick={resetFilters} className="btn btn-auramed mx-auto">
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
