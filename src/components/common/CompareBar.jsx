import React from 'react';
import { Link } from 'react-router-dom';
import { FaExchangeAlt, FaTimes, FaArrowRight } from 'react-icons/fa';
import { useHealthcare } from '../../context/HealthcareContext';

export default function CompareBar() {
  const { compareItems, removeFromCompare, clearCompare, productsList } = useHealthcare();

  if (compareItems.length === 0) return null;

  const comparedProducts = productsList.filter(p => compareItems.includes(p.id));

  return (
    <div 
      className="position-fixed bottom-0 start-50 translate-middle-x bg-white border shadow-lg rounded-top-4 p-3 z-3"
      style={{ width: '92%', maxWidth: '850px', zIndex: 1040, borderBottom: 'none' }}
    >
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
        <div className="d-flex align-items-center gap-2">
          <div className="rounded-circle p-2 bg-light-green text-primary-green">
            <FaExchangeAlt size={16} />
          </div>
          <div>
            <h6 className="mb-0 fw-bold text-dark" style={{ fontSize: '14px' }}>
              Compare Medicines ({compareItems.length}/4)
            </h6>
            <span className="text-secondary" style={{ fontSize: '11px' }}>
              Side-by-side active salts, price, and manufacturer analysis
            </span>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="d-flex align-items-center gap-2 overflow-auto py-1">
          {comparedProducts.map(prod => (
            <div key={prod.id} className="position-relative border rounded p-1 bg-light d-flex align-items-center gap-1">
              <img
                src={prod.image}
                alt={prod.name}
                style={{ width: '32px', height: '32px', objectFit: 'contain' }}
              />
              <span className="text-truncate d-none d-md-inline" style={{ maxWidth: '90px', fontSize: '11px' }}>
                {prod.name}
              </span>
              <button
                onClick={() => removeFromCompare(prod.id)}
                className="btn btn-sm p-0 text-muted ms-1"
                aria-label="Remove"
              >
                <FaTimes size={10} />
              </button>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="d-flex align-items-center gap-2">
          <button
            onClick={clearCompare}
            className="btn btn-sm btn-outline-secondary border-0 text-secondary"
            style={{ fontSize: '12px' }}
          >
            Clear All
          </button>

          <Link
            to="/compare"
            className="btn btn-sm btn-auramed d-flex align-items-center gap-2 px-3"
            style={{ fontSize: '13px' }}
          >
            Compare Now <FaArrowRight size={11} />
          </Link>
        </div>
      </div>
    </div>
  );
}
