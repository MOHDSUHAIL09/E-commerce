import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaSortDown, FaPlus, FaMinus } from 'react-icons/fa';
import ProductCard from '../../components/products/ProductCard';
import QuickViewModal from '../../components/common/QuickViewModal';
import { useHealthcare } from '../../context/HealthcareContext';
import { CATEGORIES } from './CategoriesPage';

export default function CategoryDetailPage() {
  const { slug } = useParams();
  const { productsList } = useHealthcare();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sortBy, setSortBy] = useState('popularity');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Accordion state (Konsi category open hai)
  const [openCategory, setOpenCategory] = useState(slug || ''); 

  const category = CATEGORIES.find(c => c.slug === slug) || {
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    slug,
    description: 'Explore certified healthcare solutions and pharmaceutical essentials.',
    count: 50
  };

  // Filter products matching this category
  let categoryProducts = productsList.filter(p => 
    p.categorySlug === slug ||
    p.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
  );

  if (categoryProducts.length === 0) {
    categoryProducts = productsList.slice(0, 8);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    categoryProducts = categoryProducts.filter(p => p.name.toLowerCase().includes(q));
  }

  const sortedProducts = [...categoryProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewsCount - a.reviewsCount;
  });

  // Toggle Accordion
  const toggleCategory = (catSlug) => {
    if (openCategory === catSlug) setOpenCategory('');
    else setOpenCategory(catSlug);
  };

  return (
    <div className="py-4" style={{ backgroundColor: '#FAFAFA' }}>
      <div className="container-xl">
        
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3 d-none d-md-block">
          <ol className="breadcrumb" style={{ fontSize: '12px' }}>
            <li className="breadcrumb-item"><Link to="/" className="text-secondary text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/categories" className="text-secondary text-decoration-none">Categories</Link></li>
            <li className="breadcrumb-item active text-dark fw-bold" aria-current="page">{category.name}</li>
          </ol>
        </nav>

        <div className="row g-4">
          
          {/* LEFT SIDEBAR: Categories & Filters (Mobile par top par aayega) */}
          <div className="col-12 col-lg-3">
            <div className="bg-white border rounded-3 shadow-sm sticky-top" style={{ top: '90px', zIndex: 10 }}>
              
              {/* Product Categories */}
              <div className="p-3 border-bottom">
                <h6 className="fw-bold text-dark mb-3">Categories</h6>
                <div className="d-flex flex-column gap-2">
                  {CATEGORIES.map(c => {
                    const isOpen = openCategory === c.slug;
                    return (
                      <div key={c.id} className="d-flex flex-column border-bottom pb-2">
                        <div 
                          onClick={() => toggleCategory(c.slug)}
                          className="d-flex justify-content-between align-items-center text-secondary" 
                          style={{ fontSize: '13px', cursor: 'pointer' }}
                        >
                          <Link to={`/categories/${c.slug}`} className={`text-decoration-none ${slug === c.slug ? 'text-success fw-bold' : 'text-secondary'}`}>
                            {c.name}
                          </Link>
                          {isOpen ? <FaMinus size={10} className="text-muted" /> : <FaPlus size={10} className="text-muted" />}
                        </div>
                        
                        {/* Sub-categories (Shows when clicked) */}
                        {isOpen && (
                          <div className="ps-3 mt-2 d-flex flex-column gap-1" style={{ fontSize: '12px' }}>
                            <Link to={`/categories/${c.slug}?filter=all`} className="text-secondary text-decoration-none hover-text-success">All {c.name}</Link>
                            <Link to={`/categories/${c.slug}?filter=top`} className="text-secondary text-decoration-none hover-text-success">Top Rated</Link>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Products Grid */}
          <div className="col-12 col-lg-9">
            
            {/* Top Header */}
            <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-3 bg-white p-3 rounded-3 border shadow-sm">
              <div>
                <h4 className="fw-bold text-dark mb-0">{category.name} <span className="text-secondary fw-normal" style={{ fontSize: '14px' }}>- Total Items ({sortedProducts.length})</span></h4>
              </div>

              <div className="d-flex align-items-center gap-2 w-100 w-md-auto">
                <div className="input-group input-group-sm flex-grow-1" style={{ maxWidth: '200px' }}>
                  <span className="input-group-text bg-white border-end-0"><FaSearch color="#64756D" /></span>
                  <input type="text" className="form-control border-start-0" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>

                <select
                  className="form-select form-select-sm shadow-none w-auto"
                  style={{ cursor: 'pointer' }}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popularity">Sort By : Relevance</option>
                  <option value="rating">Sort By : Rating</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Products Grid (Mobile par 2 cards ek row mein) */}
            <div className="row g-3">
              {sortedProducts.map(prod => (
                <div key={prod.id} className="col-6 col-md-4 col-lg-4">
                  <ProductCard product={prod} onQuickView={setQuickViewProduct} />
                </div>
              ))}
            </div>
            
            {sortedProducts.length === 0 && (
              <div className="text-center py-5 bg-white border rounded-3">
                <h5 className="text-secondary">No products found in this category.</h5>
              </div>
            )}
          </div>
        </div>
      </div>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
} 