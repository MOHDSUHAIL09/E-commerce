
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function PopularBrandsSection() {
  const sliderRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [hoveredBrand, setHoveredBrand] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenWidth <= 576;
  const isTablet = screenWidth > 576 && screenWidth <= 992;
  const isDesktop = screenWidth > 992;

  const brands = [
    {
      id: "dhootapapeshwar",
      name: "Dhootapapeshwar",
      discount: "15%",
      type: "UP TO",
      logo: (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "25px", color: "#159B64" }}>🌿</div>
          <div style={{
            color: "#0878B7",
            fontSize: "19px",
            fontWeight: 700,
            fontFamily: "Georgia, serif"
          }}>
            Dhootapapeshwar
          </div>
          <small style={{
            color: "#D45B48",
            fontSize: "9px",
            fontStyle: "italic"
          }}>
            Serving Ayurveda since 1872
          </small>
        </div>
      ),
    },
    {
      id: "avp",
      name: "AVP",
      discount: "15%",
      type: "UP TO",
      logo: (
        <div style={{
          width: "88px",
          height: "88px",
          border: "3px solid #555",
          outline: "1px solid #555",
          outlineOffset: "3px",
          borderRadius: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#444",
        }}>
          <strong style={{
            fontSize: "38px",
            fontFamily: "Georgia"
          }}>
            AVP
          </strong>
          <small style={{ fontSize: "7px" }}>ESTD 1943</small>
        </div>
      ),
    },
    {
      id: "himalaya",
      name: "Himalaya",
      discount: "50%",
      type: "UP TO",
      logo: (
        <div style={{
          textAlign: "center",
          color: "#08745E",
          paddingTop: "10px"
        }}>
          <strong style={{
            fontSize: "29px",
            letterSpacing: "-1px"
          }}>
            Himalaya
          </strong>
          <div style={{
            fontSize: "11px",
            letterSpacing: "4px"
          }}>
            SINCE 1930
          </div>
        </div>
      ),
    },
    {
      id: "kottakkal",
      name: "Kottakkal Ayurveda",
      discount: "5%",
      type: "FLAT",
      logo: (
        <div style={{
          textAlign: "center",
          paddingTop: "12px"
        }}>
          <div style={{
            fontSize: "29px",
            fontFamily: "Georgia, serif"
          }}>
            Kottakkal
          </div>
          <small style={{
            fontStyle: "italic",
            letterSpacing: "2px"
          }}>
            ayurveda
          </small>
        </div>
      ),
    },
    {
      id: "rasayanam",
      name: "Rasayanam",
      discount: "70%",
      type: "UP TO",
      logo: (
        <div style={{
          textAlign: "center",
          paddingTop: "8px",
          color: "#40382D"
        }}>
          <div style={{ fontSize: "30px" }}>⌁</div>
          <strong style={{
            fontSize: "18px",
            letterSpacing: "2px"
          }}>
            RASAYANAM
          </strong>
          <div style={{
            fontSize: "8px",
            letterSpacing: "2px"
          }}>
            NATURE'S BEST
          </div>
        </div>
      ),
    },
    {
      id: "zandu",
      name: "Zandu",
      discount: "50%",
      type: "UP TO",
      logo: (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "29px" }}>🦋</div>
          <strong style={{
            fontSize: "31px",
            fontWeight: 900,
            letterSpacing: "1px"
          }}>
            ZANDU
          </strong>
        </div>
      ),
    },
    {
      id: "dabur",
      name: "Dabur",
      discount: "30%",
      type: "UP TO",
      logo: (
        <div style={{
          textAlign: "center",
          paddingTop: "10px"
        }}>
          <div style={{ fontSize: "25px" }}>🌳</div>
          <strong style={{
            color: "#15803D",
            fontSize: "25px"
          }}>
            Dabur
          </strong>
          <div style={{ fontSize: "10px" }}>
            Celebrate Health
          </div>
        </div>
      ),
    },
    {
      id: "baidyanath",
      name: "Baidyanath",
      discount: "25%",
      type: "UP TO",
      logo: (
        <div style={{
          textAlign: "center",
          paddingTop: "25px"
        }}>
          <strong style={{
            color: "#991B1B",
            fontSize: "25px",
            fontFamily: "Georgia"
          }}>
            Baidyanath
          </strong>
          <div style={{ fontSize: "10px" }}>
            Asli Ayurveda
          </div>
        </div>
      ),
    },
  ];

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const distance = slider.clientWidth * 0.8;

    slider.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  const cardWidth = isMobile
    ? "calc((100% - 14px) / 2)"
    : isTablet
    ? "calc((100% - 40px) / 3)"
    : "calc((100% - 64px) / 5)";

  const cardHeight = isMobile ? "165px" : isTablet ? "195px" : "220px";
  const cardGap = isMobile ? "14px" : isTablet ? "20px" : "16px";

  return (
    <section
      className="container"
      style={{
        width: "100%",
        padding: isMobile ? "22px 0 30px" : "8px 0 35px",
        boxSizing: "border-box",
      }}
    >
      {/* Main Centered Container */}
      <div
        style={{
          width: "100%",
          maxWidth: "1660px",
          margin: "0 auto",
          padding: isMobile ? "0 12px" : "0 25px",
          boxSizing: "border-box",
        }}
      >
        {/* Section Heading */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: isMobile ? "22px" : "30px",
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "24px" : "32px",
              fontWeight: 750,
              color: "#111111",
              margin: 0,
              letterSpacing: "-0.7px",
              lineHeight: 1.3,
            }}
          >
            Popular Brands
          </h2>

          {!isMobile && (
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => scroll("left")}
                aria-label="Previous brands"
                style={arrowStyle}
              >
                <FaChevronLeft size={15} />
              </button>

              <button
                onClick={() => scroll("right")}
                aria-label="Next brands"
                style={arrowStyle}
              >
                <FaChevronRight size={15} />
              </button>
            </div>
          )}
        </div>

        {/* Slider Wrapper */}
        <div
          style={{
            position: "relative",
            width: "100%",
          }}
        >
          {/* Brands Slider */}
          <div
            ref={sliderRef}
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: cardGap,
              width: "100%",
              overflowX: "auto",
              overflowY: "hidden",
              scrollBehavior: "smooth",
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              padding: "3px 2px 12px",
              boxSizing: "border-box",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {brands.map((brand) => (
              <div
                key={brand.id}
                // to={`/products?search=${encodeURIComponent(brand.name)}`}
                onMouseEnter={() => setHoveredBrand(brand.id)}
                onMouseLeave={() => setHoveredBrand(null)}
                style={{
                  flex: `0 0 ${cardWidth}`,
                  minWidth: isDesktop ? "0" : "145px",
                  width: cardWidth,
                  textDecoration: "none",
                  color: "#111111",
                  textAlign: "center",
                  scrollSnapAlign: "start",
                  display: "block",
                  transform:
                    hoveredBrand === brand.id
                      ? "translateY(-5px)"
                      : "translateY(0)",
                  transition: "transform 0.3s ease",
                }}
              >
                {/* Brand Card */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: cardHeight,
                    borderRadius: isMobile ? "14px" : "18px",
                    background: "#F2FFDF",
                    overflow: "hidden",
                    boxShadow:
                      hoveredBrand === brand.id
                        ? "0 10px 25px rgba(16,87,43,0.16)"
                        : "0 2px 8px rgba(0,0,0,0.04)",
                    transition: "box-shadow 0.3s ease",
                  }}
                >
                  {/* Brand Logo */}
                  <div
                    style={{
                      position: "absolute",
                      top: isMobile ? "8px" : "12px",
                      left: "5px",
                      right: "5px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {brand.logo}
                  </div>

                  {/* Discount Background */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: isMobile ? "75px" : "100px",
                      background: "#10572B",
                      borderRadius: "100% 100% 0 0 / 30% 30% 0 0",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      paddingBottom: "4px",
                      boxSizing: "border-box",
                      color: "#ffffff",
                    }}
                  >
                    <span
                      style={{
                        fontSize: isMobile ? "11px" : "14px",
                        lineHeight: "18px",
                        fontWeight: 500,
                      }}
                    >
                      {brand.type}
                    </span>

                    <strong
                      style={{
                        fontSize: isMobile ? "29px" : "40px",
                        lineHeight: isMobile ? "30px" : "41px",
                        fontWeight: 800,
                        letterSpacing: "-1.5px",
                      }}
                    >
                      {brand.discount}
                    </strong>

                    <span
                      style={{
                        fontSize: isMobile ? "16px" : "21px",
                        lineHeight: isMobile ? "20px" : "23px",
                        fontWeight: 500,
                      }}
                    >
                      OFF
                    </span>
                  </div>
                </div>

                {/* Brand Name */}
                <h3
                  style={{
                    fontSize: isMobile ? "13px" : isTablet ? "16px" : "19px",
                    fontWeight: 500,
                    color: "#080808",
                    margin: isMobile ? "13px 0 0" : "18px 0 0",
                    whiteSpace: "normal",
                    textAlign: "center",
                    lineHeight: 1.35,
                    minHeight: "2.7em",
                  }}
                >
                  {brand.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const arrowStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  color: "#10572B",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  transition: "all 0.25s ease",
};
