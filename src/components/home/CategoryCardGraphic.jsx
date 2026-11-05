import React from 'react';

export default function CategoryCardGraphic({ slug }) {
  switch (slug) {
    case 'prescription-medicines':
      return (
        <svg width="74" height="74" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="rxGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#D1FAE5" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="bottleGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#F1F5F9" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="capGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="blisterGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
            <linearGradient id="blueCapsule" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <filter id="shadowRx" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="1" dy="3" stdDeviation="2" floodColor="#0F172A" floodOpacity="0.15" />
            </filter>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#rxGlow)" />
          {/* Leaves in background */}
          <path d="M22 42C18 36 24 28 32 30C36 38 28 44 22 42Z" fill="#34D399" opacity="0.8" />
          <path d="M30 32C28 36 24 38 22 42" stroke="#059669" strokeWidth="1" strokeLinecap="round" />
          {/* Blister Pack */}
          <rect x="14" y="44" width="38" height="42" rx="4" transform="rotate(-18 14 44)" fill="url(#blisterGrad)" filter="url(#shadowRx)" />
          {/* Foil Pockets */}
          <rect x="22" y="38" width="8" height="12" rx="3" transform="rotate(-18 22 38)" fill="url(#blueCapsule)" />
          <rect x="34" y="34" width="8" height="12" rx="3" transform="rotate(-18 34 34)" fill="url(#blueCapsule)" />
          <rect x="26" y="52" width="8" height="12" rx="3" transform="rotate(-18 26 52)" fill="url(#blueCapsule)" />
          <rect x="38" y="48" width="8" height="12" rx="3" transform="rotate(-18 38 48)" fill="url(#blueCapsule)" />
          {/* Medicine Bottle */}
          <g filter="url(#shadowRx)">
            <rect x="52" y="30" width="36" height="48" rx="6" fill="url(#bottleGrad)" stroke="#E2E8F0" />
            {/* Neck & Cap */}
            <rect x="57" y="24" width="26" height="7" rx="2" fill="url(#capGrad)" />
            <path d="M57 26H83" stroke="#059669" strokeWidth="1" />
            {/* Green Rx Cross */}
            <rect x="67" y="44" width="6" height="18" rx="1.5" fill="#059669" />
            <rect x="61" y="50" width="18" height="6" rx="1.5" fill="#059669" />
          </g>
          {/* Loose White Pills */}
          <ellipse cx="44" cy="78" rx="7" ry="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" filter="url(#shadowRx)" />
          <line x1="44" y1="74" x2="44" y2="82" stroke="#CBD5E1" strokeWidth="0.8" />
          <circle cx="58" cy="82" r="5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" filter="url(#shadowRx)" />
        </svg>
      );

    case 'otc-medicines':
      return (
        <svg width="74" height="74" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="otcGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="boxBlue" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="60%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
            <linearGradient id="boxTop" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#7DD3FC" />
            </linearGradient>
            <filter id="shadowOtc" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="1" dy="3" stdDeviation="2" floodColor="#0F172A" floodOpacity="0.15" />
            </filter>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#otcGlow)" />
          {/* 3D Isometric Pain Relief Box */}
          <g filter="url(#shadowOtc)">
            {/* Front Face */}
            <path d="M26 36L62 30V76L26 84V36Z" fill="url(#boxBlue)" />
            {/* Top Flap */}
            <path d="M26 36L44 24L78 20L62 30L26 36Z" fill="url(#boxTop)" />
            {/* Side Face */}
            <path d="M62 30L78 20V62L62 76V30Z" fill="#0284C7" />
            {/* Box Typography / Details */}
            <text x="30" y="52" fill="#FFFFFF" fontSize="9" fontWeight="800" fontFamily="sans-serif">Pain</text>
            <text x="30" y="63" fill="#BAE6FD" fontSize="8" fontWeight="700" fontFamily="sans-serif">Relief</text>
            <rect x="30" y="68" width="22" height="2" rx="1" fill="#FFFFFF" opacity="0.8" />
            <rect x="30" y="72" width="14" height="2" rx="1" fill="#FFFFFF" opacity="0.6" />
          </g>
          {/* Scattered Blue Capsules in Foreground */}
          <g filter="url(#shadowOtc)">
            {/* Capsule 1 */}
            <g transform="rotate(35 68 76)">
              <rect x="62" y="70" width="16" height="8" rx="4" fill="#0284C7" />
              <path d="M70 70H74C76.2 70 78 71.8 78 74C78 76.2 76.2 78 74 78H70V70Z" fill="#38BDF8" />
            </g>
            {/* Capsule 2 */}
            <g transform="rotate(-25 78 84)">
              <rect x="72" y="80" width="15" height="7" rx="3.5" fill="#0369A1" />
              <path d="M72 80H77V87H72C70 87 68.5 85.5 68.5 83.5C68.5 81.5 70 80 72 80Z" fill="#BAE6FD" />
            </g>
          </g>
        </svg>
      );

    case 'diabetes-care':
      return (
        <svg width="74" height="74" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="diabGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#CCFBF1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="meterBody" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="50%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
            <filter id="shadowDiab" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="1" dy="3" stdDeviation="2" floodColor="#0F172A" floodOpacity="0.15" />
            </filter>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#diabGlow)" />
          {/* Leaves */}
          <path d="M18 64C12 58 16 48 24 50C28 58 22 66 18 64Z" fill="#10B981" opacity="0.75" />
          {/* Glucometer Main Unit */}
          <g filter="url(#shadowDiab)">
            <rect x="28" y="22" width="38" height="56" rx="14" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
            <path d="M30 24C30 32 64 32 64 24" fill="#0369A1" opacity="0.3" />
            {/* Screen */}
            <rect x="34" y="30" width="26" height="24" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
            <text x="37" y="46" fill="#0F172A" fontSize="13" fontWeight="900" fontFamily="monospace">98</text>
            <text x="38" y="52" fill="#0284C7" fontSize="5" fontWeight="700" fontFamily="sans-serif">mg/dL</text>
            <circle cx="55" cy="36" r="1.5" fill="#EF4444" />
            {/* Main Center Button */}
            <circle cx="47" cy="64" r="5" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
            <circle cx="47" cy="64" r="2.5" fill="#0284C7" />
            {/* Bottom Test Strip */}
            <rect x="44" y="78" width="6" height="14" rx="1" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="0.8" />
            <rect x="45.5" y="87" width="3" height="3" fill="#EF4444" />
          </g>
          {/* Lancet Pen */}
          <g filter="url(#shadowDiab)" transform="rotate(15 72 50)">
            <rect x="68" y="24" width="8" height="52" rx="4" fill="#F1F5F9" stroke="#CBD5E1" />
            <rect x="68" y="32" width="8" height="6" fill="#0284C7" />
            <rect x="70.5" y="76" width="3" height="6" rx="1" fill="#94A3B8" />
          </g>
        </svg>
      );

    case 'cardiac-care':
      return (
        <svg width="74" height="74" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="cardGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEE2E2" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="heartGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FF4D6D" />
              <stop offset="40%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#9F1239" />
            </radialGradient>
            <filter id="shadowHeart" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="1" dy="3" stdDeviation="3" floodColor="#881337" floodOpacity="0.25" />
            </filter>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#cardGlow)" />
          {/* Stethoscope Tubing behind heart */}
          <path d="M26 62C22 72 32 86 52 86C72 86 82 72 78 58" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
          {/* 3D Glossy Red Heart */}
          <g filter="url(#shadowHeart)">
            <path 
              d="M50 34C44 24 28 24 24 36C18 52 42 68 50 78C58 68 82 52 76 36C72 24 56 24 50 34Z" 
              fill="url(#heartGrad)" 
            />
            {/* Heart Highlight / Sheen */}
            <path 
              d="M30 32C34 26 42 27 46 32C42 34 34 38 32 44C30 40 28 35 30 32Z" 
              fill="#FFFFFF" 
              opacity="0.4" 
            />
            {/* ECG Pulse Wave across Heart */}
            <path 
              d="M28 50H38L42 42L48 58L54 46L58 52H72" 
              stroke="#FFFFFF" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </g>
          {/* Stethoscope Chest Piece & Earpieces */}
          <g filter="url(#shadowHeart)">
            <circle cx="76" cy="66" r="7" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
            <circle cx="76" cy="66" r="4" fill="#0F172A" />
            {/* Stethoscope binaural arms */}
            <path d="M22 36C18 28 20 20 28 16" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="28" cy="16" r="2" fill="#0F172A" />
          </g>
        </svg>
      );

    case 'ayurvedic-medicines':
      return (
        <svg width="74" height="74" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="ayurGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#DCFCE7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="woodBowl" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="50%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>
            <filter id="shadowAyur" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="1" dy="3" stdDeviation="2" floodColor="#451A03" floodOpacity="0.2" />
            </filter>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#ayurGlow)" />
          {/* Fresh Green Herbal Leaves Sprouting */}
          <g>
            <path d="M38 34C32 20 44 14 54 18C56 30 46 36 38 34Z" fill="#10B981" />
            <path d="M42 22C46 26 48 30 48 34" stroke="#047857" strokeWidth="1" strokeLinecap="round" />
            <path d="M26 40C16 32 22 20 32 24C36 34 30 42 26 40Z" fill="#34D399" />
            <path d="M62 38C72 30 78 40 70 48C62 50 58 42 62 38Z" fill="#059669" />
          </g>
          {/* Wooden / Stone Mortar (Bowl) */}
          <g filter="url(#shadowAyur)">
            <ellipse cx="50" cy="54" rx="28" ry="10" fill="#92400E" />
            <path d="M22 54C22 76 34 84 50 84C66 84 78 76 78 54Z" fill="url(#woodBowl)" />
            <ellipse cx="50" cy="54" rx="24" ry="7" fill="#78350F" />
            {/* Leaves inside bowl */}
            <circle cx="46" cy="54" r="4" fill="#10B981" />
            <circle cx="54" cy="55" r="3" fill="#34D399" />
            {/* Pestle */}
            <path 
              d="M34 26L54 58" 
              stroke="#B45309" 
              strokeWidth="10" 
              strokeLinecap="round" 
            />
            <path 
              d="M34 26L54 58" 
              stroke="#D97706" 
              strokeWidth="5" 
              strokeLinecap="round" 
              opacity="0.6" 
            />
          </g>
          {/* Scattered Herbal Roots / Seeds */}
          <circle cx="30" cy="84" r="2.5" fill="#D97706" />
          <circle cx="68" cy="82" r="3" fill="#92400E" />
        </svg>
      );

    case 'vitamins-supplements':
      return (
        <svg width="74" height="74" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="vitGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="amberJar" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="40%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <linearGradient id="goldCap" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <filter id="shadowVit" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="1" dy="3" stdDeviation="2" floodColor="#78350F" floodOpacity="0.2" />
            </filter>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#vitGlow)" />
          {/* Background Citrus Leaf */}
          <path d="M68 34C74 24 84 26 86 36C82 46 72 44 68 34Z" fill="#10B981" />
          {/* Transparent Amber Vitamin C Bottle */}
          <g filter="url(#shadowVit)">
            {/* Jar Body */}
            <rect x="30" y="32" width="34" height="46" rx="8" fill="url(#amberJar)" opacity="0.92" />
            {/* White Label */}
            <rect x="30" y="44" width="34" height="24" fill="#FFFFFF" opacity="0.95" />
            <text x="41" y="62" fill="#D97706" fontSize="17" fontWeight="900" fontFamily="sans-serif">C</text>
            {/* Cap */}
            <rect x="33" y="24" width="28" height="9" rx="2.5" fill="url(#goldCap)" />
            <path d="M35 27H59" stroke="#78350F" strokeWidth="0.8" />
          </g>
          {/* Glowing Golden Softgel Capsules & Effervescent Tablets */}
          <g filter="url(#shadowVit)">
            <ellipse cx="68" cy="74" rx="7" ry="5" fill="#FBBF24" stroke="#D97706" strokeWidth="0.8" />
            <ellipse cx="69" cy="73" rx="4" ry="2" fill="#FEF3C7" />
            <ellipse cx="56" cy="82" rx="7" ry="5" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
            <ellipse cx="78" cy="80" rx="6" ry="4.5" fill="#FBBF24" stroke="#D97706" strokeWidth="0.8" />
          </g>
        </svg>
      );

    case 'protein-nutrition':
      return (
        <svg width="74" height="74" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="protGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F3F4F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="blackTub" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#374151" />
              <stop offset="50%" stopColor="#1F2937" />
              <stop offset="100%" stopColor="#111827" />
            </linearGradient>
            <filter id="shadowProt" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="1" dy="3" stdDeviation="2" floodColor="#0F172A" floodOpacity="0.2" />
            </filter>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#protGlow)" />
          {/* Green Leaf Accent */}
          <path d="M22 66C16 58 20 46 30 50C34 58 28 68 22 66Z" fill="#10B981" />
          {/* Black Whey Protein Tub */}
          <g filter="url(#shadowProt)">
            {/* Jar Body */}
            <rect x="30" y="28" width="40" height="52" rx="6" fill="url(#blackTub)" stroke="#4B5563" strokeWidth="1" />
            {/* Cap */}
            <rect x="33" y="20" width="34" height="9" rx="2" fill="#111827" stroke="#4B5563" strokeWidth="0.8" />
            {/* Label with WHEY PROTEIN */}
            <rect x="30" y="40" width="40" height="26" fill="#111827" />
            <text x="33" y="52" fill="#FFFFFF" fontSize="8" fontWeight="900" fontFamily="sans-serif">WHEY</text>
            <text x="33" y="61" fill="#10B981" fontSize="6.5" fontWeight="800" fontFamily="sans-serif">PROTEIN</text>
            <rect x="33" y="64" width="34" height="1.5" fill="#EF4444" />
          </g>
          {/* Measuring Scoop with Powder */}
          <g filter="url(#shadowProt)">
            <ellipse cx="74" cy="74" rx="10" ry="7" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="0.8" />
            <path d="M72 74L86 64" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
            <ellipse cx="73" cy="73" rx="7" ry="4" fill="#FDE68A" />
          </g>
        </svg>
      );

    case 'baby-mother-care':
      return (
        <svg width="74" height="74" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="babyGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="bearFur" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <filter id="shadowBaby" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="1" dy="3" stdDeviation="2" floodColor="#78350F" floodOpacity="0.15" />
            </filter>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#babyGlow)" />
          {/* Plush Teddy Bear */}
          <g filter="url(#shadowBaby)">
            {/* Ears */}
            <circle cx="28" cy="38" r="6" fill="url(#bearFur)" />
            <circle cx="28" cy="38" r="3" fill="#FDE68A" />
            <circle cx="48" cy="38" r="6" fill="url(#bearFur)" />
            <circle cx="48" cy="38" r="3" fill="#FDE68A" />
            {/* Bear Head */}
            <circle cx="38" cy="48" r="14" fill="url(#bearFur)" />
            {/* Snout */}
            <ellipse cx="38" cy="52" rx="6" ry="4.5" fill="#FEF3C7" />
            <ellipse cx="38" cy="50" rx="2" ry="1.2" fill="#78350F" />
            {/* Eyes */}
            <circle cx="33" cy="46" r="1.5" fill="#1F2937" />
            <circle cx="43" cy="46" r="1.5" fill="#1F2937" />
            {/* Blue Bowtie */}
            <polygon points="34,62 38,60 38,64" fill="#38BDF8" />
            <polygon points="42,62 38,60 38,64" fill="#38BDF8" />
            <circle cx="38" cy="62" r="1.5" fill="#0284C7" />
            {/* Body */}
            <ellipse cx="38" cy="72" rx="13" ry="12" fill="url(#bearFur)" />
            <ellipse cx="38" cy="73" rx="8" ry="7" fill="#FEF3C7" />
          </g>
          {/* Baby Feeding Milk Bottle */}
          <g filter="url(#shadowBaby)">
            {/* Bottle Body */}
            <rect x="58" y="44" width="18" height="36" rx="4" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="1" />
            <rect x="60" y="52" width="14" height="26" fill="#F0F9FF" />
            {/* Measurement Graduations */}
            <line x1="61" y1="58" x2="65" y2="58" stroke="#38BDF8" strokeWidth="1" />
            <line x1="61" y1="64" x2="67" y2="64" stroke="#38BDF8" strokeWidth="1" />
            <line x1="61" y1="70" x2="65" y2="70" stroke="#38BDF8" strokeWidth="1" />
            {/* Blue Collar / Ring */}
            <rect x="57" y="38" width="20" height="7" rx="2" fill="#38BDF8" />
            {/* Nipple Teat */}
            <path d="M62 38C62 32 65 28 67 28C69 28 72 32 72 38Z" fill="#FDE68A" opacity="0.85" />
          </g>
        </svg>
      );

    default:
      return (
        <div 
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: '64px', height: '64px', backgroundColor: '#E8F7F0', color: '#159B64' }}
        >
          <span style={{ fontSize: '24px' }}>💊</span>
        </div>
      );
  }
}
