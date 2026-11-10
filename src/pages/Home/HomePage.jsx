import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChevronLeft, FaChevronRight, FaArrowRight,
  FaShieldAlt, FaUserMd, FaFlask, FaCapsules, FaCheckCircle
} from 'react-icons/fa';
import ProductSlider from '../../components/products/ProductSlider';
import ProductCard from '../../components/products/ProductCard';
import QuickViewModal from '../../components/common/QuickViewModal';
import PopularBrandsSection from '../../components/home/PopularBrandsSection';
import { useHealthcare } from '../../context/HealthcareContext';
import { CATEGORIES } from '../Categories/CategoriesPage';
import { DOCTORS } from '../Doctors/DoctorsPage';
import { LAB_TESTS } from '../LabTests/LabTestsPage';

// ✅ YAHAN 3 ALAG IMAGES IMPORT KI HAIN
import HeroImage1 from '../../assets/images/cureonhero-img1.png';
import HeroImage2 from '../../assets/images/cureonhero-img2.png'; // Slide 2 ki image ka naam yahan daalo
import HeroImage3 from '../../assets/images/cureonhero-img3.png'; // Slide 3 ki image ka naam yahan daalo
import VitaminsSupplements from '@/src/components/home/VitaminsSupplements';
import ShopByCategory from '@/src/components/home/ShopByCategory';

// ==========================================
// 1. HERO SLIDER COMPONENT
// ==========================================
const SLIDES = [
  {
    id: 1,
    badge: '100% GENUINE MEDICINES',
    heading: (
      <>

       Your Health, Our Passion. Your Care,<br />
        <span style={{ color: '#159B64', position: 'relative' }}>
    Our Promise.
          <svg width="120" height="12" viewBox="0 0 120 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: '-5px', left: 0 }}>
            <path d="M2 9.5C30 3.5 70 1.5 118 6.5" stroke="#159B64" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        </span>
      </>
    ),
    description: 'Genuine medicines and healthcare essentials delivered directly to your doorstep with certified temperature-controlled cold-chain safety.',
    buttonText: 'Shop Medicines',
    buttonLink: '/products',
    buttonColor: '#159B64',
    bgGradient: 'linear-gradient(90deg, rgba(234, 248, 242, 0.95) 0%, rgba(234, 248, 242, 0.80) 50%, rgba(234, 248, 242, 0) 80%)',
    bgImage: HeroImage1, // ✅ Slide 1 Image
    dotColor: '#159B64'
  },
  {
    id: 2,
    badge: '24/7 ONLINE CONSULTATION',
    heading: 'Consult Top Doctors Online Anytime, Anywhere',
    description: 'Connect via encrypted video with experienced physicians, cardiologists, and pediatricians. Receive verified digital prescriptions instantly.',
    buttonText: 'Book Doctor Consultation',
    buttonLink: '/doctors',
    buttonColor: '#08784B',
    bgGradient: 'linear-gradient(90deg, rgba(234, 248, 242, 0.95) 0%, rgba(234, 248, 242, 0.80) 50%, rgba(234, 248, 242, 0) 80%)',
    bgImage: HeroImage2, // ✅ Slide 2 Image
    dotColor: '#08784B'
  },
  {
    id: 3,
    badge: 'UP TO 55% OFF DIAGNOSTICS',
    heading: 'Diagnostics & Lab Tests At Home',
    description: 'Book full-body diagnostic health checkups with 100% sterile home sample collection and verified smart digital reports delivered in 12 hours.',
    buttonText: 'Book Lab Tests',
    buttonLink: '/lab-tests',
    buttonColor: '#159B64',
    bgGradient: 'linear-gradient(90deg, rgba(234, 248, 242, 0.95) 0%, rgba(234, 248, 242, 0.80) 50%, rgba(234, 248, 242, 0) 80%)',
    bgImage: HeroImage3, // ✅ Slide 3 Image
    dotColor: '#159B64'
  }
];

function HeroSlider({ slides = SLIDES }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const activeSlides = slides && slides.length > 0 ? slides : SLIDES;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % activeSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, activeSlides.length]);

  const nextSlide = () => setCurrentSlide((currentSlide + 1) % activeSlides.length);
  const prevSlide = () => setCurrentSlide((currentSlide - 1 + activeSlides.length) % activeSlides.length);

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  const slide = activeSlides[currentSlide] || activeSlides[0];

  return (
    <div
      className="position-relative overflow-hidden w-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="w-100 d-flex align-items-center position-relative"
          style={{
            height: '80vh',
            backgroundImage: `${slide.bgGradient}, url(${slide.bgImage})`,
            backgroundPosition: 'right center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="container-xl position-relative z-1">
            <div className="row align-items-center">
              <div className="col-12 col-md-9 col-lg-7">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                >
                  {/* Badge */}
                  <div
                    className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3 shadow-sm"
                    style={{
                      backgroundColor: '#D6F2E3',
                      color: '#005F40',
                      fontSize: '11px',
                      fontWeight: '700',
                      letterSpacing: '0.6px'
                    }}
                  >
                    <FaCheckCircle size={12} />
                    {slide.badge}
                  </div>

                  {/* Heading */}
                  <h1
                    className="fw-bold mb-3"
                    style={{
                      fontSize: 'clamp(32px, 5vw, 56px)',
                      lineHeight: 1.15,
                      letterSpacing: '-1px',
                      color: '#172B24'
                    }}
                  >
                    {slide.heading}
                  </h1>

                  {/* Description */}
                  <p
                    className="mb-4"
                    style={{
                      fontSize: '15px',
                      lineHeight: 1.6,
                      color: '#4A5568',
                      maxWidth: '90%'
                    }}
                  >
                    {slide.description}
                  </p>

                  {/* Buttons Row */}
                  <div className="d-flex flex-wrap align-items-center gap-3 mb-4 mb-md-5">
                    <Link
                      to={slide.buttonLink}
                      className="btn text-white fw-bold d-inline-flex align-items-center gap-2 shadow-sm text-decoration-none"
                      style={{
                        backgroundColor: slide.buttonColor,
                        borderRadius: '30px',
                        fontSize: '15px',
                        padding: '12px 28px',
                        border: 'none'
                      }}
                    >
                      <span>{slide.buttonText}</span>
                      <FaArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination Dots */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex align-items-center gap-2 z-2 d-lg-none">
        {activeSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className="border-0 rounded-circle p-0"
            style={{
              width: currentSlide === idx ? '10px' : '8px',
              height: currentSlide === idx ? '10px' : '8px',
              backgroundColor: currentSlide === idx ? (slide.dotColor || '#3B82F6') : '#FFFFFF',
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              cursor: 'pointer',
              opacity: currentSlide === idx ? 1 : 0.7
            }}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="position-absolute bottom-0 end-0 m-4 d-none d-md-flex gap-2 z-2">
        <button onClick={prevSlide} className="btn btn-sm bg-white border rounded-circle shadow-sm p-2" style={{ width: '36px', height: '36px' }}>
          <FaChevronLeft size={14} color="#172B24" />
        </button>
        <button onClick={nextSlide} className="btn btn-sm bg-white border rounded-circle shadow-sm p-2" style={{ width: '36px', height: '36px' }}>
          <FaChevronRight size={14} color="#172B24" />
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 2. HOME PAGE COMPONENT
// ==========================================
export default function HomePage() {
  const { productsList } = useHealthcare();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const fiftyPercentProducts = productsList.filter(p => p.isFiftyPercentOff || p.discount >= 50);
  const popularMedicines = productsList.filter(p => p.isPopular);
  const bestSellers = productsList.filter(p => p.isBestSeller);
  const trendingProducts = productsList.filter(p => p.isTrending);

  return (
    <div className="home-page-container">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Mobile Quick Actions */}
      <div className="d-block d-md-none px-3 pt-3 pb-2 bg-white">
        <div className="row g-2 mb-2">
          <div className="col-6">
            <Link
              to="/products"
              className="text-decoration-none d-flex align-items-center p-2 rounded-4 h-100"
              style={{ backgroundColor: '#E9F7F1', border: '1px solid #D2EFE2', minHeight: '85px' }}
            >
              <div className="d-flex align-items-center justify-content-center flex-shrink-0 me-2" style={{ width: '50px' }}>
                <svg width="46" height="46" viewBox="0 0 48 48" fill="none">
                  <rect x="12" y="6" width="16" height="6" rx="2" fill="#88C9B0" stroke="#146D52" strokeWidth="1.5" />
                  <rect x="14" y="4" width="12" height="4" rx="1.5" fill="#A3D9C3" stroke="#146D52" strokeWidth="1.5" />
                  <rect x="8" y="12" width="24" height="28" rx="4" fill="#FFFFFF" stroke="#146D52" strokeWidth="1.8" />
                  <rect x="11" y="20" width="18" height="12" rx="2" fill="#E0F2EA" stroke="#146D52" strokeWidth="1.2" />
                  <ellipse cx="35" cy="29" rx="5" ry="7" transform="rotate(45 35 29)" fill="#FFFFFF" stroke="#146D52" strokeWidth="1.5" />
                  <line x1="32.5" y1="31.5" x2="37.5" y2="26.5" stroke="#146D52" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="37" cy="20" r="3" fill="#FFFFFF" stroke="#146D52" strokeWidth="1.5" />
                  <path d="M39 12L39 16M37 14L41 14" stroke="#146D52" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="d-flex flex-column justify-content-center" style={{ flex: 1 }}>
                <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: '11.5px', lineHeight: '1.3' }}>Buy Medicines &<br />Essentials</h6>
                <span className="fw-bold text-uppercase" style={{ fontSize: '9.5px', color: '#007953', letterSpacing: '0.3px' }}>2HRS DELIVERY</span>
              </div>
            </Link>
          </div>
          <div className="col-6">
            <Link
              to="/prescription"
              className="text-decoration-none d-flex align-items-center p-2 rounded-4 h-100"
              style={{ backgroundColor: '#E9F7F1', border: '1px solid #D2EFE2', minHeight: '85px' }}
            >
              <div className="d-flex align-items-center justify-content-center flex-shrink-0 me-2" style={{ width: '50px' }}>
                <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
                  <path d="M6 14L6 18M4 16L8 16" stroke="#146D52" strokeWidth="1.5" strokeLinecap="round" />
                  <rect x="12" y="8" width="24" height="32" rx="3" fill="#FFFFFF" stroke="#146D52" strokeWidth="1.8" />
                  <rect x="18" y="5" width="12" height="6" rx="2" fill="#A3D9C3" stroke="#146D52" strokeWidth="1.5" />
                  <path d="M24 18V28M19 23H29" stroke="#146D52" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="18" y1="33" x2="30" y2="33" stroke="#146D52" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <div className="d-flex flex-column justify-content-center" style={{ flex: 1 }}>
                <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: '11.5px', lineHeight: '1.3' }}>Order via<br />Prescription</h6>
                <span className="fw-bold text-uppercase" style={{ fontSize: '9.5px', color: '#007953', letterSpacing: '0.3px' }}>10% OFF</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="row g-2 mb-3">
          <div className="col-4">
            <Link to="/doctors" className="text-decoration-none d-flex flex-column align-items-center justify-content-center p-2 rounded-4 h-100 text-center" style={{ backgroundColor: '#FFF8EA', border: '1px solid #FDECC6', minHeight: '110px' }}>
              <div className="mb-2">
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="12" width="32" height="20" rx="2" fill="#FFFFFF" stroke="#8A6208" strokeWidth="1.8" />
                  <path d="M4 34H44L40 38H8L4 34Z" fill="#FFF8EA" stroke="#8A6208" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M16 18V22C16 24.2 17.8 26 20 26C22.2 26 24 24.2 24 22V18" stroke="#8A6208" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="30" cy="21" r="3" fill="#FFF" stroke="#8A6208" strokeWidth="1.5" />
                </svg>
              </div>
              <div>
                <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: '11px', lineHeight: '1.2' }}>Doctor<br />Appointment</h6>
                <span className="fw-bold text-uppercase d-block" style={{ fontSize: '9px', color: '#8A6208' }}>BOOK NOW</span>
              </div>
            </Link>
          </div>
          <div className="col-4">
            <Link to="/lab-tests" className="text-decoration-none d-flex flex-column align-items-center justify-content-center p-2 rounded-4 h-100 text-center" style={{ backgroundColor: '#FDF1F7', border: '1px solid #F9D8EA', minHeight: '110px' }}>
              <div className="mb-2">
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <path d="M12 40H36" stroke="#94215B" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M24 40V34" stroke="#94215B" strokeWidth="2.5" />
                  <path d="M18 34H30" stroke="#94215B" strokeWidth="2" strokeLinecap="round" />
                  <path d="M24 8C28 8 32 11 32 16C32 19.5 29.8 22.5 26.5 23.5L28 30H20L21.5 23.5C18.2 22.5 16 19.5 16 16C16 11 20 8 24 8Z" fill="#FFF" stroke="#94215B" strokeWidth="1.8" />
                  <circle cx="24" cy="17" r="2.5" fill="#94215B" />
                </svg>
              </div>
              <div>
                <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: '11px', lineHeight: '1.2' }}>Lab Tests</h6>
                <span className="fw-bold text-uppercase d-block" style={{ fontSize: '9px', color: '#94215B' }}>AT HOME</span>
              </div>
            </Link>
          </div>
          <div className="col-4">
            <Link to="/Profile" className="text-decoration-none d-flex flex-column align-items-center justify-content-center p-2 rounded-4 h-100 text-center" style={{ backgroundColor: '#FFF2ED', border: '1px solid #FCDDCE', minHeight: '110px' }}>
              <div className="mb-2">
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <path d="M24 6L8 12V24C8 33 15 41 24 43C33 41 40 33 40 24V12L24 6Z" fill="#FFFFFF" stroke="#D84B24" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M24 16V32M16 24H32" stroke="#D84B24" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: '11px', lineHeight: '1.2' }}>Health<br />Insurance</h6>
                <span className="fw-bold text-uppercase d-block" style={{ fontSize: '9px', color: '#D84B24' }}>EXPLORE PLANS</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Quick Actions */}
      <div className="d-none d-md-block py-4 bg-white shadow-xs">
        <div className="container-xl">
          <div className="row g-3">
            <div className="col-12 col-sm-6 col-lg-3">
              <Link to="/products" className="text-decoration-none d-flex align-items-center justify-content-between p-3 rounded-4 shadow-sm h-100" style={{ backgroundColor: '#E8F7F0', border: '1px solid #D6F2E3', minHeight: '84px' }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="p-2 bg-white rounded-3 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '46px', height: '46px' }}>
                    <FaCapsules size={24} color="#0E7348" />
                  </div>
           <div>
                    <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: '15px' }}>Get 20%* off on Medicines</h6>
                    <span className="fw-bold text-uppercase text-success d-flex align-items-center gap-1" style={{ fontSize: '11px' }}>ORDER NOW <FaArrowRight size={9} /></span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <Link to="/doctors" className="text-decoration-none d-flex align-items-center justify-content-between p-3 rounded-4 shadow-sm h-100" style={{ backgroundColor: '#F3EEFF', border: '1px solid #E6DCFA', minHeight: '84px' }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="p-2 bg-white rounded-3 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '46px', height: '46px' }}>
                    <FaUserMd size={24} color="#5C32A3" />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: '15px' }}>Doctor Appointment</h6>
                    <span className="fw-bold text-uppercase d-flex align-items-center gap-1" style={{ fontSize: '11px', color: '#5C32A3' }}>BOOK NOW <FaArrowRight size={9} /></span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <Link to="/lab-tests" className="text-decoration-none d-flex align-items-center justify-content-between p-3 rounded-4 shadow-sm h-100" style={{ backgroundColor: '#FDF0F2', border: '1px solid #FCDAE0', minHeight: '84px' }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="p-2 bg-white rounded-3 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '46px', height: '46px' }}>
                    <FaFlask size={24} color="#A32845" />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: '15px' }}>Lab Tests</h6>
                    <span className="fw-bold text-uppercase d-flex align-items-center gap-1" style={{ fontSize: '11px', color: '#A32845' }}>AT HOME <FaArrowRight size={9} /></span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <Link to="/Profile" className="text-decoration-none d-flex align-items-center justify-content-between p-3 rounded-4 shadow-sm h-100" style={{ backgroundColor: '#FEF7E6', border: '1px solid #FBE8BE', minHeight: '84px' }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="p-2 bg-white rounded-3 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '46px', height: '46px' }}>
                    <FaShieldAlt size={24} color="#925C0C" />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: '15px' }}>Health Insurance</h6>
                    <span className="fw-bold text-uppercase d-flex align-items-center gap-1" style={{ fontSize: '11px', color: '#925C0C' }}>EXPLORE PLANS <FaArrowRight size={9} /></span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>


<div className='d-block d-md-none'>
<ShopByCategory/>
</div>


      <section className="py-4 bg-white border-bottom">
        <div className="container-xl">
          <ProductSlider title="Minimum 50 Percent Off" products={fiftyPercentProducts} viewAllLink="/products?discount=50" />
        </div>
      </section>


            <section className="py-4 bg-white border-bottom">
        <div className="container-xl">
          <VitaminsSupplements
          />
        </div>
      </section>

      <section className="py-4 bg-light border-bottom">
        <div className="container-xl">
          <ProductSlider title="Popular Medicines & Remedies" subtitle="COMMONLY PRESCRIBED" products={popularMedicines} viewAllLink="/products" />
        </div>
      </section>

      <PopularBrandsSection />

      <section className="py-4 bg-white border-bottom">
        <div className="container-xl">
          <ProductSlider title="Best Selling Healthcare Products" subtitle="CUSTOMER FAVORITES" products={bestSellers} viewAllLink="/products" />
        </div>
      </section>

      <section className="py-5 bg-white border-bottom">
        <div className="container-xl">
          <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-2">
            <div>
              <span className="text-primary-green fw-bold text-uppercase" style={{ fontSize: '12px', letterSpacing: '1px' }}>CERTIFIED PATHOLOGY</span>
              <h3 className="fw-bold mb-0 text-dark">Book Diagnostics & Health Checkups</h3>
            </div>
            <Link to="/lab-tests" className="btn btn-sm btn-auramed">View All Tests <FaArrowRight size={11} /></Link>
          </div>
          <div className="row g-3">
            {LAB_TESTS.slice(0, 3).map(test => (
              <div key={test.id} className="col-md-4">
                <div className="card-auramed p-4 h-100 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className="badge bg-light text-primary-green border border-success fw-bold" style={{ fontSize: '11px' }}>{test.parameters} Parameters Included</span>
                    <span className="badge bg-danger text-white">{test.discount}% OFF</span>
                  </div>
                  <h5 className="fw-bold text-dark mb-2" style={{ fontSize: '16px' }}>{test.title}</h5>
                  <p className="text-secondary flex-grow-1" style={{ fontSize: '12px' }}>{test.description}</p>
                  <div className="d-flex align-items-center justify-content-between pt-2 border-top mt-auto">
                    <div>
                      <span className="fs-5 fw-bold text-dark">₹{(test.price * 25).toFixed(0)}</span>
                      <span className="text-secondary text-decoration-line-through ms-2" style={{ fontSize: '12px' }}>₹{(test.mrp * 25).toFixed(0)}</span>
                    </div>
                    <Link to="/lab-tests" className="btn btn-sm btn-auramed">Book Test</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-4 bg-white border-top border-bottom">
        <div className="container-xl">
          <ProductSlider title="Trending Healthcare Innovations" subtitle="NOW TRENDING" products={trendingProducts} viewAllLink="/products" />
        </div>
      </section>

      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
}