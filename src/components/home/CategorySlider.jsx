import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaHeartbeat } from 'react-icons/fa';

const MOBILE_CATEGORIES = [
  {
    id: 'health-monitors',
    name: 'Health Monitors',
    image: '/assets/categories/cat_firstaid.png',
    link: '/products?category=medical-devices'
  },
  {
    id: 'ayurvedic-diabetes',
    name: 'Ayurvedic Diabetes Care',
    image: '/assets/categories/cat_vitamins.png',
    link: '/products?category=ayush-herbal'
  },
  {
    id: 'pain-relief',
    name: 'Pain Relief',
    image: '/assets/categories/cat_pain.png',
    link: '/products?category=pain-relief'
  },
  {
    id: 'baby-care',
    name: 'Baby Care',
    image: '/assets/categories/cat_baby.png',
    link: '/products?category=baby-mother-care'
  },
  {
    id: 'nutritional-drinks',
    name: 'Nutritional Drinks & Supplements',
    image: '/assets/categories/cat_protein.png',
    link: '/products?category=fitness-nutrition'
  },
  {
    id: 'adult-diapers',
    name: 'Adult Diapers',
    image: '/assets/categories/cat_personal.png',
    link: '/products?category=elderly-care'
  },
  {
    id: 'vitamins-minerals',
    name: 'Vitamins & Minerals',
    image: '/assets/categories/cat_vitamins.png',
    link: '/products?category=vitamins-supplements'
  },
  {
    id: 'protein-powders',
    name: 'Protein Powders & Gym Supplements',
    image: '/assets/categories/cat_protein.png',
    link: '/products?category=fitness-nutrition'
  },
  {
    id: 'summer-essentials',
    name: 'Summer Essentials',
    image: '/assets/categories/cat_personal.png',
    link: '/products?category=personal-care'
  },
  {
    id: 'home-medical',
    name: 'Home Medical Supplies',
    image: '/assets/categories/cat_firstaid.png',
    link: '/products?category=medical-devices'
  },
  {
    id: 'intimate-care',
    name: 'Intimate Care',
    image: '/assets/categories/cat_skin.png',
    link: '/products?category=personal-care'
  },
  {
    id: 'skin-hair',
    name: 'Skin & Hair Care',
    image: '/assets/categories/cat_hair.png',
    link: '/products?category=skin-care'
  }
];

export default function CategorySlider() {
  const scrollRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

  const categories = [
    {
      id: 'vitamins-supplements',
      name: 'Vitamins & Supplements',
      count: '890+ Items',
      image: '/assets/categories/cat_vitamins.png',
      slug: 'vitamins-supplements'
    },
    {
      id: 'protein-nutrition',
      name: 'Protein & Nutrition',
      count: '140+ Items',
      image: '/assets/categories/cat_protein.png',
      slug: 'fitness-nutrition'
    },
    {
      id: 'baby-mother-care',
      name: 'Baby & Mother Care',
      count: '210+ Items',
      image: '/assets/categories/cat_baby.png',
      slug: 'baby-mother-care'
    },
    {
      id: 'personal-care',
      name: 'Personal Care',
      count: '280+ Items',
      image: '/assets/categories/cat_personal.png',
      slug: 'personal-care'
    },
    {
      id: 'skin-care',
      name: 'Skin Care',
      count: '550+ Items',
      image: '/assets/categories/cat_skin.png',
      slug: 'skin-care'
    },
    {
      id: 'hair-care',
      name: 'Hair Care',
      count: '175+ Items',
      image: '/assets/categories/cat_hair.png',
      slug: 'hair-care'
    },
    {
      id: 'pain-relief',
      name: 'Pain Relief',
      count: '130+ Items',
      image: '/assets/categories/cat_pain.png',
      slug: 'pain-relief'
    },
    {
      id: 'first-aid',
      name: 'First Aid',
      count: '90+ Items',
      image: '/assets/categories/cat_firstaid.png',
      slug: 'first-aid'
    }
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        const dotIndex = Math.min(5, Math.round((scrollLeft / maxScroll) * 5));
        setActiveDot(dotIndex);
      }
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true });
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector('.category-slider-card');
      const step = card ? card.offsetWidth + 16 : 240;
      const scrollAmount = direction === 'left' ? -step : step;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile: Exact "Shop By Category (12)" 4-column Grid matching image_9ca702b3 */}
      <div className="d-block d-md-none px-3 py-3 bg-white border-bottom">
        <h5 className="fw-bold text-dark mb-3" style={{ fontSize: '18px', letterSpacing: '-0.3px' }}>
          Shop By Category (12)
        </h5>
        <div className="row g-2">
          {MOBILE_CATEGORIES.map((cat) => (
            <div key={cat.id} className="col-3">
              <Link 
                to={cat.link}
                className="text-decoration-none d-flex flex-column align-items-center"
              >
                <div 
                  className="w-100 d-flex align-items-center justify-content-center p-2 rounded-4 mb-1"
                  style={{
                    aspectRatio: '1',
                    backgroundColor: '#F3F4F6',
                    border: '1px solid #E5E7EB',
                    overflow: 'hidden'
                  }}
                >
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-100 h-100 object-fit-contain"
                    loading="lazy"
                  />
                </div>
                <span 
                  className="text-center text-dark fw-semibold mt-1"
                  style={{
                    fontSize: '11px',
                    lineHeight: '1.2',
                    minHeight: '26px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {cat.name}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Explore Health Categories Slider */}
      <section 
        className="d-none d-md-block py-4 py-md-5 position-relative overflow-hidden" 
        style={{ 
          background: 'linear-gradient(135deg, #E6F7F0 0%, #D8F5E8 50%, #EDFAF3 100%)',
          borderTop: '1px solid #D6F0E3',
          borderBottom: '1px solid #D6F0E3'
        }}
      >
      {/* Top-Right Decorative Stethoscope + Capsule Graphic (matches image_375baab4) */}
      <div 
        className="position-absolute top-0 end-0 d-none d-lg-block pointer-events-none"
        style={{ 
          width: '420px', 
          height: '140px',
          opacity: 0.95,
          zIndex: 0,
          pointerEvents: 'none'
        }}
      >
        <img 
          src="/assets/categories/stethoscope_deco.png" 
          alt="" 
          className="w-100 h-100 object-fit-contain"
        />
      </div>

      <div className="container-xl position-relative" style={{ zIndex: 1 }}>
        {/* Section Header (matches image_375baab4) */}
        <div className="mb-4">
          <div 
            className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2 shadow-xs bg-white"
            style={{ border: '1px solid #C4EBD7' }}
          >
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center text-white"
              style={{ width: '22px', height: '22px', backgroundColor: '#159B64' }}
            >
              <FaHeartbeat size={12} />
            </div>
            <span className="fw-bold" style={{ fontSize: '13px', color: '#08784B' }}>
              Healthcare Categories
            </span>
          </div>

          <h2 className="fw-bold mb-1 text-dark" style={{ fontSize: '32px', letterSpacing: '-0.5px' }}>
            Explore <span style={{ color: '#005F40' }}>Health Categories</span>
          </h2>
          <p className="text-secondary mb-0" style={{ fontSize: '15px' }}>
            Specialized pharmaceutical formulations and daily wellness
          </p>
        </div>

        {/* Horizontal Slider with Left & Right scroll buttons */}
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
            aria-label="Previous categories"
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
            aria-label="Next categories"
          >
            <FaChevronRight size={13} />
          </button>

          {/* Category Track (matches image_375baab4) */}
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
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/categories/${cat.slug}`}
                className="category-slider-card text-decoration-none bg-white d-flex flex-column align-items-center justify-content-between text-center p-3 transition-all"
                style={{
                  height: '215px',
                  flex: '0 0 auto',
                  borderRadius: '18px',
                  border: '1.5px solid #E2EDE7',
                  scrollSnapAlign: 'start',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#159B64';
                  e.currentTarget.style.boxShadow = '0 10px 24px rgba(21, 155, 100, 0.16)';
                  const titleEl = e.currentTarget.querySelector('.cat-title');
                  if (titleEl) titleEl.style.color = '#005F40';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#E2EDE7';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.03)';
                  const titleEl = e.currentTarget.querySelector('.cat-title');
                  if (titleEl) titleEl.style.color = '#111827';
                }}
              >
                {/* 3D Category Image (matches image_375baab4) */}
                <div 
                  className="d-flex align-items-center justify-content-center my-auto"
                  style={{ width: '100px', height: '100px' }}
                >
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-100 h-100 object-fit-contain"
                    loading="lazy"
                  />
                </div>

                {/* Category Title */}
                <div 
                  className="cat-title fw-bold text-dark w-100 mt-1 mb-1 px-1"
                  style={{ 
                    fontSize: '13px', 
                    lineHeight: '1.3',
                    minHeight: '34px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                  title={cat.name}
                >
                  {cat.name}
                </div>

                {/* Item Count Pill Badge (matches image_375baab4) */}
                <div 
                  className="rounded-pill px-2 py-0.5"
                  style={{ 
                    backgroundColor: '#E8F7F0', 
                    color: '#08784B', 
                    fontSize: '11px', 
                    fontWeight: '700' 
                  }}
                >
                  {cat.count}
                </div>
              </Link>
            ))}
          </div>

          {/* Carousel Pagination Dots (matches image_375baab4) */}
          <div className="d-flex align-items-center justify-content-center gap-1 mt-3">
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <span
                key={idx}
                className="rounded-circle transition-all"
                style={{
                  width: activeDot === idx ? '8px' : '6px',
                  height: activeDot === idx ? '8px' : '6px',
                  backgroundColor: activeDot === idx ? '#10B981' : '#A7F3D0',
                  display: 'inline-block'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
