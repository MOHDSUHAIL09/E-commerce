import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaTrashAlt, FaShoppingCart, FaArrowRight } from 'react-icons/fa';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useHealthcare } from '../../context/HealthcareContext';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { productsList } = useHealthcare();

  const wishlistProducts = productsList.filter(p => wishlist.includes(p.id));

  return (
    <div className="py-5">
      <div className="container-xl">
        
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb" style={{ fontSize: '13px' }}>
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">My Wishlist</li>
          </ol>
        </nav>

        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
              <FaHeart color="#E74C3C" /> Saved Healthcare Essentials
            </h2>
            <p className="text-secondary mb-0" style={{ fontSize: '14px' }}>
              {wishlistProducts.length} items saved for future refills and recurring orders
            </p>
          </div>
          <Link to="/products" className="btn btn-sm btn-auramed-outline">
            Browse More Medicines <FaArrowRight size={11} />
          </Link>
        </div>

        {wishlistProducts.length > 0 ? (
          <div className="row g-3">
            {wishlistProducts.map(prod => (
              <div key={prod.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="product-card">
                  <div className="product-image-container">
                    <Link to={`/products/${prod.id}`}>
                      <img src={prod.image} alt={prod.name} />
                    </Link>
                  </div>

                  <span className="text-secondary text-uppercase mb-1" style={{ fontSize: '11px' }}>
                    {prod.brand}
                  </span>

                  <h6 className="fw-bold mb-2 flex-grow-1" style={{ fontSize: '14px' }}>
                    <Link to={`/products/${prod.id}`} className="text-dark text-decoration-none hover-green">
                      {prod.name}
                    </Link>
                  </h6>

                  <div className="d-flex align-items-baseline gap-2 mb-3">
                    <span className="fs-5 fw-bold text-dark-green">₹{(prod.price * 25).toFixed(0)}</span>
                    {prod.mrp > prod.price && (
                      <span className="text-secondary text-decoration-line-through" style={{ fontSize: '12px' }}>
                        ₹{(prod.mrp * 25).toFixed(0)}
                      </span>
                    )}
                  </div>

                  <div className="d-flex gap-2 pt-2 border-top">
                    <button
                      onClick={() => addToCart(prod, 1)}
                      className="btn btn-sm btn-auramed flex-grow-1"
                    >
                      <FaShoppingCart size={11} /> Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(prod.id)}
                      className="btn btn-sm btn-light border text-danger"
                      title="Remove from wishlist"
                    >
                      <FaTrashAlt size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card-auramed p-5 text-center my-4 mx-auto" style={{ maxWidth: '500px' }}>
            <div className="rounded-circle p-3 bg-light-green text-primary-green d-inline-flex mx-auto mb-3">
              <FaHeart size={36} color="#E74C3C" />
            </div>
            <h4 className="fw-bold text-dark">Your Wishlist is Empty</h4>
            <p className="text-secondary mb-4" style={{ fontSize: '14px' }}>
              Save regular prescriptions and wellness items so you can order them in 1 click next time.
            </p>
            <Link to="/products" className="btn btn-auramed">
              Explore Products
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
