import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import VitaminsSupplementsimg from '../../assets/images/Vitamins&Supplements.png';

const VitaminsSupplements = () => {
  return (
    <section className=" bg-white py-2">
      <div className="">
        {/* Main Banner */}
        <div
          className="row g-0 overflow-hidden rounded-2 bg-light align-items-stretch"
          style={{ minHeight: "190px" }}
        >
          {/* Doctor Image */}
          <div className="col-12 col-md-7">
            <img
              src={VitaminsSupplementsimg}
              alt="Online doctor consultation"
              className="w-100 h-100 d-block"
              style={{ objectFit: "cover", minHeight: "190px" }}
            />
          </div>

          {/* Content */}
          <div
            className="col-12 col-md-5 d-flex flex-column justify-content-center align-items-center align-items-md-start text-center text-md-start px-3 px-md-4 py-3 py-md-4"
            style={{ background: "#f8fafb" }}
          >
            <span
              className="fw-bold text-uppercase mb-2"
              style={{ fontSize: "9px", color: "#737d84", letterSpacing: "1px" }}
            >
              Expert Care, From Where You Are
            </span>

            <h2
              className="fw-bold mb-2 lh-sm"
              style={{ fontSize: "clamp(20px, 2.4vw, 27px)", color: "#171d22" }}
            >
              Consult Online
              <br className="d-none d-md-inline" /> With Our Doctors
            </h2>

            <p
              className="mb-3"
              style={{ fontSize: "12px", lineHeight: 1.5, color: "#65717a", maxWidth: "330px" }}
            >
              Get professional guidance from the comfort of home
              with video consultation, prescription & treatment
              guidance, and follow-ups as needed.
            </p>

            <button
              onClick={() => { window.location.href = "/doctors"; }}
              className="btn d-inline-flex align-items-center justify-content-center gap-2 px-3 py-2 fw-bold border-0 w-100 w-md-auto"
              style={{
                background: "#086341",
                color: "#fff",
                borderRadius: "5px",
                fontSize: "12px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.12)",
                whiteSpace: "nowrap",
              }}
            >
              Book a Consultation
              <FaArrowRight size={11} />
            </button>
          </div>
        </div>

        {/* Customer Reviews Heading */}
        <div className="d-flex align-items-center flex-wrap gap-2 mt-3"></div>
      </div>

      {/* Small custom tweak Bootstrap doesn't cover: button auto-width on md+ */}
      <style>{`
        @media (min-width: 768px) {
          .w-md-auto { width: auto !important; }
        }
        @media (max-width: 767.98px) {
          .row > .col-12:first-child img { max-height: 220px; }
        }
      `}</style>
    </section>
  );
};

export default VitaminsSupplements;