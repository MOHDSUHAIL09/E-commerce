import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaFilter, FaPills } from 'react-icons/fa';
import ProductCard from '../../components/products/ProductCard';
import QuickViewModal from '../../components/common/QuickViewModal';
import { useHealthcare } from '../../context/HealthcareContext';
import { CATEGORIES } from './CategoriesPage';

export default function CategoryDetailPage() {
  const { slug } = useParams();
  const { productsList } = useHealthcare();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sortBy, setSortBy] = useState('popularity');

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

  // If mock data has fewer products in this category, show matching or provide related so user never sees an empty screen
  if (categoryProducts.length === 0) {
    categoryProducts = productsList.slice(0, 4);
  }

  const sortedProducts = [...categoryProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewsCount - a.reviewsCount;
  });

  return (
    <div className="py-4">
      <div className="container-xl">
        
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb" style={{ fontSize: '13px' }}>
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/categories">Categories</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{category.name}</li>
          </ol>
        </nav>

        {/* Category Hero Banner */}
        <div 
          className="p-4 p-md-5 rounded-4 mb-4 text-white position-relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #08784B 0%, #159B64 100%)' }}
        >
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="badge bg-light text-dark fw-bold mb-2">HEALTHCARE VERTICAL</span>
              <h2 className="display-6 fw-bold mb-2 text-white">{category.name}</h2>
              <p className="lead text-white-50 mb-3" style={{ fontSize: '15px', maxWidth: '620px' }}>
                {category.description}
              </p>
              <div className="d-flex align-items-center gap-3" style={{ fontSize: '13px' }}>
                <span>Certified Dispensary</span>
                <span>•</span>
                <span>{category.count}+ Available Formulations</span>
                <span>•</span>
                <span>Express 15-Min Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Header Controls */}
        <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-3">
          <div>
            <h4 className="fw-bold text-dark mb-0">{category.name} Catalog</h4>
            <span className="text-secondary" style={{ fontSize: '13px' }}>
              Showing {sortedProducts.length} verified products
            </span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <span className="text-secondary d-none d-sm-inline" style={{ fontSize: '13px' }}>Sort by:</span>
            <select
              className="form-select form-select-sm"
              style={{ width: '170px' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popularity">Most Popular</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="row g-3">
          {sortedProducts.map(prod => (
            <div key={prod.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ProductCard product={prod} onQuickView={setQuickViewProduct} />
            </div>
          ))}
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
