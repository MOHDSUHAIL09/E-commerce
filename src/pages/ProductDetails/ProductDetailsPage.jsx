import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FaStar, FaShieldAlt, FaTruck, FaClock, FaHeart, 
  FaRegHeart, FaShoppingCart, FaBolt, FaExchangeAlt, 
  FaFileMedical, FaInfoCircle, FaCheck, FaExclamationTriangle,
  FaArrowLeft, FaCheckCircle, FaUserCheck
} from 'react-icons/fa';
import ProductCard from '../../components/products/ProductCard';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useHealthcare } from '../../context/HealthcareContext';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { productsList, toggleCompare, compareItems } = useHealthcare();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = productsList.find(p => p.id === id) || productsList[0];
  const [selectedImage, setSelectedImage] = useState(product.gallery ? product.gallery[0] : product.image);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'uses', 'safety', 'reviews'
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      author: 'Dr. Michael Chen',
      rating: 5,
      date: '2026-10-24',
      comment: 'Clinically verified purity. The bio-absorption profile of this formulation aligns closely with pharmaceutical standards.',
      verified: true
    },
    {
      id: 2,
      author: 'Amanda Clark',
      rating: 5,
      date: '2026-10-18',
      comment: 'Delivered in a climate-controlled package within 40 minutes. Authentic seal was intact and expiry date is 2 years out.',
      verified: true
    }
  ]);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.gallery ? product.gallery[0] : product.image);
      setQty(1);
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h4>Product not found</h4>
        <Link to="/products" className="btn btn-auramed mt-3">Back to Catalog</Link>
      </div>
    );
  }

  const isFav = isInWishlist(product.id);
  const isCompared = compareItems.includes(product.id);
  const relatedProducts = productsList.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, qty);
    navigate('/checkout');
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    setReviewsList(prev => [
      {
        id: Date.now(),
        author: 'Verified Customer',
        rating: newReviewRating,
        date: new Date().toISOString().split('T')[0],
        comment: newReviewText.trim(),
        verified: true
      },
      ...prev
    ]);
    setNewReviewText('');
  };

  return (
    <div className="py-4">
      <div className="container-xl">
        
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb" style={{ fontSize: '13px' }}>
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/products">Medicines</Link></li>
            <li className="breadcrumb-item"><Link to={`/categories/${product.categorySlug}`}>{product.category}</Link></li>
            <li className="breadcrumb-item active text-truncate" style={{ maxWidth: '280px' }} aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Main Product Info Card */}
        <div className="card-auramed p-4 p-md-5 mb-5">
          <div className="row g-4 g-lg-5">
            
            {/* Left: Gallery & Zoom Preview */}
            <div className="col-lg-5">
              <div className="position-relative p-3 bg-light rounded-4 text-center mb-3 d-flex align-items-center justify-content-center" style={{ minHeight: '340px' }}>
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="img-fluid"
                  style={{ maxHeight: '300px', objectFit: 'contain', transition: 'transform 0.3s' }}
                />

                {product.prescriptionRequired && (
                  <span className="position-absolute top-0 start-0 m-3 badge-rx">
                    <FaFileMedical /> Prescription Required (Rx)
                  </span>
                )}

                {product.discount > 0 && (
                  <span className="position-absolute top-0 end-0 m-3 badge-discount">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnail selector */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="d-flex align-items-center gap-2 justify-content-center">
                  {product.gallery.map((imgUrl, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`btn p-1 border rounded bg-white ${selectedImage === imgUrl ? 'border-success shadow-sm' : 'border-light-subtle'}`}
                      style={{ width: '60px', height: '60px' }}
                    >
                      <img src={imgUrl} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Purchase Controls */}
            <div className="col-lg-7">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="badge bg-light-green text-dark-green fw-semibold px-3 py-1">
                  {product.category}
                </span>
                <div className="d-flex align-items-center gap-2">
                  <button
                    onClick={() => toggleCompare(product.id)}
                    className={`btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 ${isCompared ? 'active bg-success text-white' : ''}`}
                    style={{ fontSize: '12px' }}
                  >
                    <FaExchangeAlt size={12} /> {isCompared ? 'Compared' : 'Compare'}
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                    style={{ fontSize: '12px' }}
                  >
                    {isFav ? <FaHeart color="#E74C3C" /> : <FaRegHeart />} Wishlist
                  </button>
                </div>
              </div>

              <h2 className="fw-bold text-dark mb-2" style={{ lineHeight: 1.25 }}>
                {product.name}
              </h2>

              <div className="text-secondary mb-3" style={{ fontSize: '13px' }}>
                Brand: <strong className="text-dark">{product.brand}</strong> • Manufacturer: <span className="text-dark">{product.manufacturer}</span>
              </div>

              {/* Ratings & Reviews */}
              <div className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
                <span className="product-rating">
                  <FaStar size={12} color="#F1C40F" /> {product.rating} / 5.0
                </span>
                <span className="text-secondary" style={{ fontSize: '13px' }}>
                  ({product.reviewsCount} customer reviews)
                </span>
                <span className="text-success fw-semibold d-flex align-items-center gap-1" style={{ fontSize: '13px' }}>
                  <FaCheckCircle size={12} /> In Stock ({product.stock} units)
                </span>
              </div>

              {/* Price section */}
              <div className="p-3 rounded-3 mb-4" style={{ backgroundColor: '#F8FAF9', border: '1px solid #E5ECE8' }}>
                <div className="d-flex align-items-baseline gap-3">
                  <span className="display-6 fw-bold text-dark-green">₹{(product.inrPrice || product.price * 25).toFixed(0)}</span>
                  {product.mrp > product.price && (
                    <span className="text-secondary text-decoration-line-through fs-5">
                      MRP: ₹{(product.inrMrp || product.mrp * 25).toFixed(0)}
                    </span>
                  )}
                  {product.discount > 0 && (
                    <span className="badge bg-danger fs-6">{product.discount}% OFF</span>
                  )}
                </div>
                <div className="text-secondary mt-1" style={{ fontSize: '12px' }}>
                  Inclusive of all local taxes. Free shipping on orders over ₹499.
                </div>
              </div>

              {/* Composition Quick Box */}
              <div className="p-3 mb-4 rounded bg-white border" style={{ fontSize: '13px' }}>
                <div className="fw-bold text-dark mb-1">Active Medical Salt / Composition:</div>
                <p className="text-secondary mb-0">{product.composition}</p>
              </div>

              {/* Quantity & CTA Buttons */}
              <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
                <div className="d-flex align-items-center gap-2">
                  <span className="fw-semibold text-secondary" style={{ fontSize: '13px' }}>Quantity:</span>
                  <div className="qty-selector">
                    <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                    <span className="qty-value">{qty}</span>
                    <button className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product, qty)}
                  className="btn btn-auramed py-2 px-4 flex-grow-1"
                >
                  <FaShoppingCart /> Add to Cart (₹{((product.inrPrice || product.price * 25) * qty).toFixed(0)})
                </button>

                <button
                  onClick={handleBuyNow}
                  className="btn btn-warning fw-bold py-2 px-4 text-dark d-flex align-items-center gap-2"
                >
                  <FaBolt /> Buy Now
                </button>
              </div>

              {/* Guarantee highlights */}
              <div className="row g-2 pt-3 border-top text-secondary" style={{ fontSize: '12px' }}>
                <div className="col-sm-4 d-flex align-items-center gap-2">
                  <FaShieldAlt color="#159B64" /> 100% Genuine batch
                </div>
                <div className="col-sm-4 d-flex align-items-center gap-2">
                  <FaTruck color="#159B64" /> Temperature-controlled
                </div>
                <div className="col-sm-4 d-flex align-items-center gap-2">
                  <FaClock color="#159B64" /> 15-day return policy
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Tabbed Product Insights: Uses, Directions, Safety, Reviews */}
        <div className="card-auramed p-4 mb-5">
          <ul className="nav nav-pills gap-2 mb-4 border-bottom pb-3">
            <li className="nav-item">
              <button
                className={`btn btn-sm ${activeTab === 'overview' ? 'btn-auramed' : 'btn-light border'}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview & Description
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn btn-sm ${activeTab === 'uses' ? 'btn-auramed' : 'btn-light border'}`}
                onClick={() => setActiveTab('uses')}
              >
                Uses & Dosage Instructions
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn btn-sm ${activeTab === 'safety' ? 'btn-auramed' : 'btn-light border'}`}
                onClick={() => setActiveTab('safety')}
              >
                Safety & Side Effects
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn btn-sm ${activeTab === 'reviews' ? 'btn-auramed' : 'btn-light border'}`}
                onClick={() => setActiveTab('reviews')}
              >
                Patient Reviews ({reviewsList.length})
              </button>
            </li>
          </ul>

          <div className="tab-content">
            {activeTab === 'overview' && (
              <div>
                <h5 className="fw-bold text-dark mb-3">Product Description</h5>
                <p className="text-secondary" style={{ fontSize: '14px', lineHeight: 1.7 }}>
                  {product.description}
                </p>
                <div className="row g-3 mt-3">
                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded">
                      <strong className="d-block text-dark mb-1">Storage Conditions:</strong>
                      <span className="text-secondary" style={{ fontSize: '13px' }}>{product.storage}</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded">
                      <strong className="d-block text-dark mb-1">Prescription Classification:</strong>
                      <span className="text-secondary" style={{ fontSize: '13px' }}>
                        {product.prescriptionRequired ? 'Schedule H Prescription Drug - Dispensed against doctor order only.' : 'General OTC Health Product.'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'uses' && (
              <div>
                <h5 className="fw-bold text-dark mb-3">Clinical Uses & Therapeutic Benefits</h5>
                <p className="text-secondary mb-4" style={{ fontSize: '14px', lineHeight: 1.7 }}>
                  {product.uses}
                </p>

                <h5 className="fw-bold text-dark mb-2">Recommended Administration & Dosage</h5>
                <div className="p-3 bg-light rounded mb-4" style={{ fontSize: '14px' }}>
                  {product.dosage}
                </div>
                <div className="alert alert-info d-flex align-items-center gap-2 mb-0" style={{ fontSize: '13px' }}>
                  <FaInfoCircle /> Always follow the specific frequency and dosage stipulated by your consulting physician.
                </div>
              </div>
            )}

            {activeTab === 'safety' && (
              <div>
                <h5 className="fw-bold text-dark mb-3">Safety Warnings & Precautions</h5>
                <div className="p-3 rounded mb-4" style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', fontSize: '14px' }}>
                  <div className="d-flex align-items-center gap-2 text-warning fw-bold mb-1">
                    <FaExclamationTriangle /> Important Patient Advisory:
                  </div>
                  <p className="text-dark mb-0">{product.safetyInfo}</p>
                </div>

                <h5 className="fw-bold text-dark mb-2">Possible Side Effects</h5>
                <p className="text-secondary mb-3" style={{ fontSize: '14px' }}>
                  {product.sideEffects}
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="row g-4">
                  <div className="col-lg-7">
                    <h5 className="fw-bold text-dark mb-3">Patient Experiences</h5>
                    <div className="d-flex flex-column gap-3">
                      {reviewsList.map(r => (
                        <div key={r.id} className="p-3 bg-light rounded border">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="fw-bold text-dark" style={{ fontSize: '14px' }}>{r.author}</span>
                            <span className="text-muted" style={{ fontSize: '12px' }}>{r.date}</span>
                          </div>
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <div className="d-flex">
                              {[...Array(r.rating)].map((_, i) => (
                                <FaStar key={i} size={11} color="#F1C40F" />
                              ))}
                            </div>
                            {r.verified && (
                              <span className="badge bg-success-subtle text-success" style={{ fontSize: '10px' }}>
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <p className="text-secondary mb-0" style={{ fontSize: '13px' }}>{r.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-lg-5">
                    <div className="p-4 bg-light rounded border">
                      <h6 className="fw-bold text-dark mb-3">Write a Customer Review</h6>
                      <form onSubmit={handleAddReview}>
                        <div className="mb-3">
                          <label className="form-label" style={{ fontSize: '13px' }}>Your Rating</label>
                          <select
                            className="form-select form-select-sm"
                            value={newReviewRating}
                            onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          >
                            <option value="5">5 Stars (Excellent)</option>
                            <option value="4">4 Stars (Good)</option>
                            <option value="3">3 Stars (Average)</option>
                            <option value="2">2 Stars (Poor)</option>
                            <option value="1">1 Star (Terrible)</option>
                          </select>
                        </div>

                        <div className="mb-3">
                          <label className="form-label" style={{ fontSize: '13px' }}>Your Review</label>
                          <textarea
                            className="form-control form-control-sm"
                            rows="3"
                            placeholder="Share your experience regarding packaging, delivery, and efficacy..."
                            value={newReviewText}
                            onChange={(e) => setNewReviewText(e.target.value)}
                            required
                          ></textarea>
                        </div>

                        <button type="submit" className="btn btn-sm btn-auramed w-100">
                          Submit Feedback
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Frequently Bought Together Combo Deal */}
        <div className="card-auramed p-4 mb-5" style={{ backgroundColor: '#F0F9F4', borderColor: '#B7E4C7' }}>
          <h5 className="fw-bold text-dark mb-3">Frequently Bought Together</h5>
          <div className="row g-3 align-items-center">
            <div className="col-md-7">
              <div className="d-flex align-items-center gap-3">
                <div className="p-2 bg-white rounded border text-center" style={{ width: '80px' }}>
                  <img src={product.image} alt={product.name} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                </div>
                <span className="fs-4 text-muted fw-bold">+</span>
                <div className="p-2 bg-white rounded border text-center" style={{ width: '80px' }}>
                  <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&auto=format&fit=crop&q=80" alt="Vitamin C" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                </div>
                <div>
                  <div className="fw-semibold text-dark" style={{ fontSize: '13px' }}>
                    {product.name} + AuraC-Zinc 1000mg Combo
                  </div>
                  <div className="text-secondary" style={{ fontSize: '12px' }}>
                    Save an additional 10% when purchased together
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-5 text-md-end">
              <span className="fs-5 fw-bold text-dark-green me-3">
                ${(product.price + 13.50 * 0.9).toFixed(2)}
              </span>
              <button
                onClick={() => {
                  addToCart(product, 1);
                  addToCart(productsList[0], 1);
                }}
                className="btn btn-sm btn-auramed"
              >
                Add Both to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h4 className="fw-bold text-dark mb-0">Related Formulations</h4>
              <Link to={`/categories/${product.categorySlug}`} className="btn btn-sm btn-auramed-outline">
                View All in {product.category}
              </Link>
            </div>

            <div className="row g-3">
              {relatedProducts.map(rel => (
                <div key={rel.id} className="col-12 col-sm-6 col-lg-3">
                  <ProductCard product={rel} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
