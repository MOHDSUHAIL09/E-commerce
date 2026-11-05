import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function PopularBrandsSection() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const isMobile = window.innerWidth < 576;
      const scrollAmount = isMobile 
        ? (direction === 'left' ? -scrollRef.current.clientWidth : scrollRef.current.clientWidth)
        : (direction === 'left' ? -300 : 300);
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const brands = [
    {
      id: 'dhootapapeshwar',
      name: 'Dhootapapeshwar',
      tagline: 'Serving Ayurveda since 1872',
      discount: 'UP TO 15% OFF',
      color: '#0284C7',
      logo: (
        <div className="text-center py-2">
          <div className="d-flex align-items-center justify-content-center gap-1 mb-1">
            <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
              <path d="M14 2C8 2 4 8 4 14C4 18 8 22 14 22C17 22 20 20 22 18" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M12 12C12 7 16 3 20 4C24 5 25 10 21 14C17 18 12 16 12 12Z" fill="#159B64" opacity="0.8"/>
            </svg>
            <span className="fw-bold" style={{ color: '#0284C7', fontSize: '15px', letterSpacing: '-0.3px', fontFamily: 'serif' }}>
              Dhootapapeshwar
            </span>
          </div>
          <small className="fst-italic text-danger" style={{ fontSize: '9.5px' }}>Serving Ayurveda since 1872</small>
        </div>
      )
    },
    {
      id: 'avp',
      name: 'AVP',
      tagline: 'The Arya Vaidya Pharmacy',
      discount: 'UP TO 15% OFF',
      color: '#111827',
      logo: (
        <div className="text-center py-2">
          <div 
            className="rounded-circle border border-2 border-dark mx-auto d-flex flex-column align-items-center justify-content-center"
            style={{ width: '48px', height: '48px', padding: '2px' }}
          >
            <span className="fw-black text-dark" style={{ fontSize: '13px', fontWeight: '900', letterSpacing: '0.5px' }}>AVP</span>
            <span style={{ fontSize: '6px', lineHeight: 1, letterSpacing: '0.2px' }}>ESTD 1943</span>
          </div>
          <small className="text-muted d-block mt-1" style={{ fontSize: '9.5px' }}>Arya Vaidya Pharmacy</small>
        </div>
      )
    },
    {
      id: 'himalaya',
      name: 'Himalaya',
      tagline: 'SINCE 1930',
      discount: 'UP TO 50% OFF',
      color: '#005F40',
      logo: (
        <div className="text-center py-2">
          <div className="d-flex align-items-center justify-content-center gap-1">
            <span className="fw-bold" style={{ color: '#005F40', fontSize: '18px', letterSpacing: '-0.5px' }}>
              Himalaya
            </span>
            <span style={{ color: '#F97316', fontSize: '10px', marginTop: '-8px' }}>®</span>
          </div>
          <div className="text-secondary fw-semibold" style={{ fontSize: '9px', letterSpacing: '2px' }}>
            SINCE 1930
          </div>
        </div>
      )
    },
    {
      id: 'kottakkal',
      name: 'Kottakkal Ayurveda',
      tagline: 'ayurveda',
      discount: 'FLAT 5% OFF',
      color: '#1F2937',
      logo: (
        <div className="text-center py-2">
          <span className="fw-bold text-dark d-block" style={{ fontSize: '17px', letterSpacing: '-0.3px', fontFamily: 'serif' }}>
            Kottakkal
          </span>
          <span className="text-secondary fst-italic" style={{ fontSize: '10px' }}>
            ayurveda
          </span>
        </div>
      )
    },
    {
      id: 'rasayanam',
      name: 'Rasayanam',
      tagline: "NATURE'S BEST",
      discount: 'UP TO 70% OFF',
      color: '#78350F',
      logo: (
        <div className="text-center py-2">
          <div className="d-flex justify-content-center mb-1">
            <svg width="34" height="16" viewBox="0 0 34 16" fill="none">
              <path d="M17 2L23 14H11L17 2Z" stroke="#78350F" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M8 8L12 14H4L8 8Z" stroke="#78350F" strokeWidth="1.2" strokeLinejoin="round"/>
              <path d="M26 8L30 14H22L26 8Z" stroke="#78350F" strokeWidth="1.2" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="fw-bold d-block" style={{ color: '#78350F', fontSize: '14px', letterSpacing: '1px' }}>
            RASAYANAM
          </span>
          <small className="text-muted d-block" style={{ fontSize: '8px', letterSpacing: '1.2px' }}>
            NATURE'S BEST
          </small>
        </div>
      )
    },
    {
      id: 'zandu',
      name: 'Zandu',
      tagline: 'Pure Ayurvedic Care',
      discount: 'UP TO 50% OFF',
      color: '#166534',
      logo: (
        <div className="text-center py-2">
          <div className="position-relative d-inline-block">
            <span 
              className="position-absolute top-0 end-0 translate-middle-y" 
              style={{ fontSize: '14px', marginRight: '-6px', marginTop: '-2px' }}
            >
              🦋
            </span>
            <span className="fw-black text-dark" style={{ fontSize: '18px', fontWeight: '900', letterSpacing: '0.8px' }}>
              ZANDU
            </span>
          </div>
          <small className="text-muted d-block" style={{ fontSize: '9px' }}>Ayurveda Specialist</small>
        </div>
      )
    },
    {
      id: 'dabur',
      name: 'Dabur',
      tagline: 'Science of Ayurveda',
      discount: 'UP TO 30% OFF',
      color: '#15803D',
      logo: (
        <div className="text-center py-2">
          <div className="d-flex align-items-center justify-content-center gap-1">
            <span style={{ fontSize: '16px' }}>🌳</span>
            <span className="fw-bold text-success" style={{ fontSize: '18px', letterSpacing: '-0.3px' }}>
              Dabur
            </span>
          </div>
          <small className="text-muted d-block" style={{ fontSize: '9px' }}>Celebrate Health</small>
        </div>
      )
    },
    {
      id: 'baidyanath',
      name: 'Baidyanath',
      tagline: 'Asli Ayurveda',
      discount: 'UP TO 25% OFF',
      color: '#991B1B',
      logo: (
        <div className="text-center py-2">
          <span className="fw-bold text-danger d-block" style={{ fontSize: '17px', letterSpacing: '-0.3px', fontFamily: 'serif' }}>
            Baidyanath
          </span>
          <small className="text-muted d-block" style={{ fontSize: '9px' }}>Asli Ayurveda</small>
        </div>
      )
    }
  ];

  return (
    <section 
      className="py-5 position-relative overflow-hidden" 
      style={{ 
        background: 'linear-gradient(135deg, #E6F7F0 0%, #D4F4E6 50%, #EDFAF3 100%)',
        borderTop: '1px solid #D6F0E3',
        borderBottom: '1px solid #D6F0E3'
      }}
    >
      {/* Decorative Floating Capsule & Leaves (matches image_9fa1bc01) */}
      <div 
        className="position-absolute top-0 end-0 p-4 pe-5 d-none d-lg-block pointer-events-none opacity-90"
        style={{ zIndex: 0, pointerEvents: 'none' }}
      >
        <svg width="200" height="110" viewBox="0 0 200 110" fill="none">
          {/* Medical cross */}
          <rect x="75" y="20" width="16" height="50" rx="3" fill="#10B981" fillOpacity="0.18"/>
          <rect x="58" y="37" width="50" height="16" rx="3" fill="#10B981" fillOpacity="0.18"/>
          {/* Capsule */}
          <g transform="translate(115, 20) rotate(42)">
            <rect x="0" y="0" width="22" height="30" rx="11" fill="#FFFFFF" stroke="#0E7348" strokeWidth="1.5"/>
            <rect x="0" y="25" width="22" height="30" rx="11" fill="#10B981" stroke="#0E7348" strokeWidth="1.5"/>
          </g>
          {/* Leaves */}
          <path d="M100 30C90 15 110 5 125 12C128 25 115 35 100 30Z" fill="#22C55E" fillOpacity="0.75"/>
          <path d="M150 25C165 15 180 30 170 42C155 45 145 35 150 25Z" fill="#15803D" fillOpacity="0.6"/>
        </svg>
      </div>

      <div className="container-xl position-relative" style={{ zIndex: 1 }}>
        {/* Header (matches image_9fa1bc01) */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <div 
              className="d-inline-flex align-items-center gap-1 px-3 py-1 rounded-pill mb-2 shadow-xs"
              style={{ backgroundColor: '#D1FAE5', color: '#047857', fontSize: '12px', fontWeight: '700' }}
            >
              <FaStar size={11} color="#047857" />
              <span>Trusted Brands</span>
            </div>
            <h2 className="fw-bold mb-1 text-dark" style={{ fontSize: '30px', letterSpacing: '-0.5px' }}>
              Popular Brands
            </h2>
            <p className="text-secondary mb-0" style={{ fontSize: '14.5px' }}>
              Shop from the most trusted healthcare brands
            </p>
          </div>

          {/* View All Brands Button (matches image_9fa1bc01) */}
          <Link
            to="/products"
            className="btn d-inline-flex align-items-center gap-2 px-3 py-2 text-decoration-none shadow-xs"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #005F40',
              color: '#005F40',
              borderRadius: '24px',
              fontSize: '13.5px',
              fontWeight: '700',
              transition: 'all 0.2s ease'
            }}
          >
            <span>View All Brands</span>
            <span 
              className="rounded-circle d-flex align-items-center justify-content-center text-white"
              style={{ width: '22px', height: '22px', backgroundColor: '#005F40' }}
            >
              <FaArrowRight size={10} />
            </span>
          </Link>
        </div>

        {/* Brand Slider Container */}
        <div className="position-relative">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll('left')}
            className="btn position-absolute top-50 start-0 translate-middle-y z-3 shadow-md rounded-circle d-flex align-items-center justify-content-center p-0"
            style={{
              width: '38px',
              height: '38px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #D1E5DA',
              marginLeft: '-14px',
              color: '#005F40'
            }}
            aria-label="Previous brands"
          >
            <FaChevronLeft size={13} />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll('right')}
            className="btn position-absolute top-50 end-0 translate-middle-y z-3 shadow-md rounded-circle d-flex align-items-center justify-content-center p-0"
            style={{
              width: '38px',
              height: '38px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #D1E5DA',
              marginRight: '-14px',
              color: '#005F40'
            }}
            aria-label="Next brands"
          >
            <FaChevronRight size={13} />
          </button>

          {/* Horizontal Slider Track */}
          <div 
            ref={scrollRef}
            className="d-flex gap-2 gap-sm-3 overflow-x-auto pb-3 pt-1 px-1 hide-scrollbar"
            style={{
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {brands.map((brand) => (
              <Link
                key={brand.id}
                to={`/products?search=${encodeURIComponent(brand.name)}`}
                className="text-decoration-none text-dark bg-white rounded-4 p-2.5 p-sm-3 d-flex flex-column align-items-center justify-content-between position-relative transition-all responsive-brand-card"
                style={{
                  height: '240px',
                  border: '1.5px solid #E5EBE7',
                  borderRadius: '16px',
                  scrollSnapAlign: 'start',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#159B64';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(21, 155, 100, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#E5EBE7';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.04)';
                }}
              >
                {/* Top: Trusted Badge */}
                <div className="w-100 d-flex justify-content-start">
                  <span 
                    className="d-inline-flex align-items-center gap-1 px-2 py-0.5 rounded-pill"
                    style={{ 
                      backgroundColor: '#E8F7F0', 
                      color: '#08784B', 
                      fontSize: '10.5px', 
                      fontWeight: '700' 
                    }}
                  >
                    <FaStar size={9} color="#08784B" /> Trusted
                  </span>
                </div>

                {/* Middle: Brand Logo Graphic */}
                <div className="w-100 my-auto d-flex align-items-center justify-content-center" style={{ minHeight: '75px' }}>
                  {brand.logo}
                </div>

                {/* Discount Pill Badge (matches image_9fa1bc01) */}
                <div 
                  className="rounded-pill text-white fw-bold px-3 py-1 mb-2 text-center"
                  style={{
                    backgroundColor: '#005F40',
                    fontSize: '11px',
                    letterSpacing: '0.4px',
                    boxShadow: '0 2px 6px rgba(0, 95, 64, 0.25)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {brand.discount}
                </div>

                {/* Brand Name Title */}
                <div className="fw-bold text-center text-dark text-truncate w-100 mb-2" style={{ fontSize: '13px' }}>
                  {brand.name}
                </div>

                {/* Bottom Circular Mint Arrow (matches image_9fa1bc01) */}
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ 
                    width: '30px', 
                    height: '30px', 
                    backgroundColor: '#D1FAE5', 
                    color: '#047857',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                  }}
                >
                  <FaArrowRight size={11} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
