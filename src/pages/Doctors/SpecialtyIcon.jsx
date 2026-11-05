import React from 'react';

export default function SpecialtyIcon({ name, size = 48, className = '' }) {
  const norm = (name || '').toLowerCase();

  if (norm.includes('physician') || norm.includes('general')) {
    // Doctor with stethoscope
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
        <circle cx="24" cy="14" r="8" stroke="#159B64" strokeWidth="2.5" fill="#E8F8F0" />
        <path d="M12 38C12 31.373 17.373 26 24 26C30.627 26 36 31.373 36 38" stroke="#159B64" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M18 24V28C18 31.314 20.686 34 24 34C27.314 34 30 31.314 30 28V24" stroke="#005F40" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="37" r="2.5" fill="#005F40" />
        <path d="M21 12H27M24 9V15" stroke="#159B64" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes('derm')) {
    // Face outline with hair
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
        <path d="M16 28C16 33.523 20.477 38 26 38C31.523 38 36 33.523 36 28C36 22.477 31.523 18 26 18" stroke="#E67E22" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M14 24C14 17.373 19.373 12 26 12C32.627 12 38 17.373 38 24C38 26.5 37 30 35 32" stroke="#D35400" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M12 20C12 14 17 9 24 9" stroke="#E67E22" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 3" />
        <circle cx="28" cy="24" r="2" fill="#E67E22" />
        <circle cx="15" cy="33" r="3" fill="#FDEBD0" stroke="#E67E22" strokeWidth="1.5" />
      </svg>
    );
  }

  if (norm.includes('obstet') || norm.includes('gynae')) {
    // Female reproductive system / Ob-Gyn
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
        <path d="M24 16C19 16 16 21 16 27C16 32 20 36 24 38C28 36 32 32 32 27C32 21 29 16 24 16Z" fill="#FCE4EC" stroke="#C2185B" strokeWidth="2.5" />
        <path d="M16 22C12 20 8 20 8 24C8 27 11 28 14 26" stroke="#C2185B" strokeWidth="2" strokeLinecap="round" />
        <path d="M32 22C36 20 40 20 40 24C40 27 37 28 34 26" stroke="#C2185B" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="27" r="3" fill="#E91E63" />
      </svg>
    );
  }

  if (norm.includes('ortho')) {
    // Knee joint / bone outline
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
        <path d="M20 10C20 8 28 8 28 10V21C28 23 26 24 24 24C22 24 20 23 20 21V10Z" fill="#FFF3E0" stroke="#E65100" strokeWidth="2.5" />
        <path d="M20 38C20 40 28 40 28 38V27C28 25 26 24 24 24C22 24 20 25 20 27V38Z" fill="#FFF3E0" stroke="#E65100" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="5" fill="#FFE082" stroke="#F57C00" strokeWidth="2" />
        <path d="M16 24H18M30 24H32" stroke="#E65100" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm === 'ent' || norm.includes('ent')) {
    // ENT (Doctor/hearing/throat)
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
        <circle cx="24" cy="18" r="9" fill="#E3F2FD" stroke="#1565C0" strokeWidth="2.5" />
        <path d="M15 36C15 30 19 28 24 28C29 28 33 30 33 36" stroke="#1565C0" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M20 18H28M24 14V22" stroke="#0D47A1" strokeWidth="2" strokeLinecap="round" />
        <path d="M35 15C37 17 37 21 35 23" stroke="#1E88E5" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes('neuro') && !norm.includes('surg')) {
    // Brain (Neurology)
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
        <path d="M24 10C18 10 13 14 13 21C13 25 15 28 18 30C18 34 21 38 24 38C27 38 30 34 30 30C33 28 35 25 35 21C35 14 30 10 24 10Z" fill="#FCE4EC" stroke="#AD1457" strokeWidth="2.5" />
        <path d="M24 10V38" stroke="#AD1457" strokeWidth="2" />
        <path d="M19 18C21 20 22 24 19 26" stroke="#880E4F" strokeWidth="2" strokeLinecap="round" />
        <path d="M29 18C27 20 26 24 29 26" stroke="#880E4F" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes('cardio')) {
    // Heart with pulse wave
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
        <path d="M24 38L22 36C12 26 8 22 8 16C8 11.5 11.5 8 16 8C19 8 22 10 24 12C26 10 29 8 32 8C36.5 8 40 11.5 40 16C40 22 36 26 26 36L24 38Z" fill="#FFEBEE" stroke="#D32F2F" strokeWidth="2.5" />
        <path d="M12 21H18L21 16L24 27L28 18L30 21H36" stroke="#C62828" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (norm.includes('uro')) {
    // Kidneys & bladder (Urology)
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
        <path d="M16 16C13 18 13 24 16 27C18 29 21 28 21 25C21 20 18 15 16 16Z" fill="#FFF3E0" stroke="#EF6C00" strokeWidth="2.2" />
        <path d="M32 16C35 18 35 24 32 27C30 29 27 28 27 25C27 20 30 15 32 16Z" fill="#FFF3E0" stroke="#EF6C00" strokeWidth="2.2" />
        <path d="M18 26C19 32 22 33 22 36" stroke="#E65100" strokeWidth="2" strokeLinecap="round" />
        <path d="M30 26C29 32 26 33 26 36" stroke="#E65100" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="24" cy="38" rx="5" ry="4" fill="#FFE0B2" stroke="#E65100" strokeWidth="2" />
      </svg>
    );
  }

  if (norm.includes('gastro') && !norm.includes('surg')) {
    // Stomach (Gastroenterology)
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
        <path d="M22 10V15C22 18 15 20 15 26C15 33 21 38 28 38C34 38 36 32 36 28C36 22 30 20 27 19C24 18 25 15 25 10" fill="#FFF8E1" stroke="#F57F17" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M20 24C23 26 26 27 29 26" stroke="#F57F17" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes('psychiatry')) {
    // Head with mental swirl
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
        <path d="M18 36V32C15 30 13 26 13 22C13 15 18 11 25 11C32 11 36 15 36 22C36 27 34 30 31 32V36" stroke="#4527A0" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M21 21C21 18 28 17 28 20C28 23 23 21 23 24C23 26 27 26 27 28" stroke="#7E57C2" strokeWidth="2" strokeLinecap="round" />
        <circle cx="25" cy="31" r="1.5" fill="#4527A0" />
      </svg>
    );
  }

  if (norm.includes('paed') || norm.includes('ped')) {
    // Cute newborn baby
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
        <circle cx="24" cy="20" r="10" fill="#E1F5FE" stroke="#0288D1" strokeWidth="2.5" />
        <path d="M14 36C14 30 18 28 24 28C30 28 34 30 34 36" fill="#B3E5FC" stroke="#0288D1" strokeWidth="2.5" />
        <circle cx="21" cy="19" r="1.5" fill="#01579B" />
        <circle cx="27" cy="19" r="1.5" fill="#01579B" />
        <path d="M22 23C23 24 25 24 26 23" stroke="#01579B" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M23 12C24 10 25 10 26 12" stroke="#0288D1" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes('pulmon')) {
    // Lungs (Pulmonology)
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
        <path d="M24 10V24" stroke="#00695C" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M24 18L19 22M24 18L29 22" stroke="#00695C" strokeWidth="2" strokeLinecap="round" />
        <path d="M19 22C14 24 13 32 15 36C17 39 21 38 22 34C23 29 22 24 19 22Z" fill="#E0F2F1" stroke="#00796B" strokeWidth="2.2" />
        <path d="M29 22C34 24 35 32 33 36C31 39 27 38 26 34C25 29 26 24 29 22Z" fill="#E0F2F1" stroke="#00796B" strokeWidth="2.2" />
      </svg>
    );
  }

  if (norm.includes('endo')) {
    // Thyroid gland (Endocrinology)
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
        <rect x="22" y="8" width="4" height="32" rx="2" fill="#E0E0E0" />
        <path d="M16 18C12 20 12 26 15 30C18 33 22 30 22 26C22 22 19 17 16 18Z" fill="#FCE4EC" stroke="#C2185B" strokeWidth="2.2" />
        <path d="M32 18C36 20 36 26 33 30C30 33 26 30 26 26C26 22 29 17 32 18Z" fill="#FCE4EC" stroke="#C2185B" strokeWidth="2.2" />
        <path d="M20 25H28" stroke="#AD1457" strokeWidth="2.5" />
      </svg>
    );
  }

  if (norm.includes('nephro')) {
    // Kidneys (Nephrology)
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
        <path d="M16 16C12 19 12 28 16 32C19 35 23 33 23 28C23 22 20 15 16 16Z" fill="#FBE9E7" stroke="#D84315" strokeWidth="2.5" />
        <path d="M32 16C36 19 36 28 32 32C29 35 25 33 25 28C25 22 28 15 32 16Z" fill="#FBE9E7" stroke="#D84315" strokeWidth="2.5" />
        <path d="M20 26C22 28 26 28 28 26" stroke="#BF360C" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes('neurosurg')) {
    // Brain with surgical pointer (Neurosurgery)
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
        <path d="M22 12C17 12 13 16 13 22C13 26 15 29 17 31C17 35 20 38 23 38" stroke="#6A1B9A" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M25 12C30 12 34 16 34 22C34 26 32 29 30 31C30 35 27 38 24 38" stroke="#6A1B9A" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M36 10L24 24M36 10L32 8M36 10L38 14" stroke="#D81B60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (norm.includes('rheuma')) {
    // Knee joint / inflamed joint (Rheumatology)
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
        <path d="M21 12V22M27 12V22" stroke="#4E342E" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M21 28V38M27 28V38" stroke="#4E342E" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="24" cy="25" rx="7" ry="4" fill="#FFCDD2" stroke="#C62828" strokeWidth="2" />
        <path d="M14 25L11 25M37 25L34 25" stroke="#C62828" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes('ophthal')) {
    // Eye with lens (Ophthalmology)
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
        <path d="M10 24C10 24 16 14 24 14C32 14 38 24 38 24C38 24 32 34 24 34C16 34 10 24 10 24Z" fill="#E8EAF6" stroke="#283593" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="6" fill="#3F51B5" />
        <circle cx="25.5" cy="22.5" r="2" fill="white" />
      </svg>
    );
  }

  if (norm.includes('surgical gastro')) {
    // Surgical abdomen / gastro
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
        <path d="M20 14C16 16 14 22 16 28C18 34 24 36 28 34C32 32 34 26 32 20C30 15 24 13 20 14Z" fill="#FFF3E0" stroke="#E65100" strokeWidth="2.2" />
        <line x1="12" y1="36" x2="26" y2="22" stroke="#1565C0" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="26" cy="22" r="2" fill="#1565C0" />
      </svg>
    );
  }

  if (norm.includes('infectious')) {
    // Microbes / viral pathogen
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
        <circle cx="24" cy="24" r="9" fill="#FFF8E1" stroke="#F57F17" strokeWidth="2.5" />
        <path d="M24 11V15M24 33V37M11 24H15M33 24H37" stroke="#F57F17" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="21" cy="21" r="1.5" fill="#E65100" />
        <circle cx="27" cy="26" r="2" fill="#E65100" />
        <circle cx="36" cy="14" r="3" fill="#FFE082" stroke="#F57F17" strokeWidth="1.5" />
      </svg>
    );
  }

  if (norm.includes('laparo') || norm.includes('surgery')) {
    // Laparoscopic surgery scalpel & incision
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
        <path d="M12 36C18 32 30 32 36 36" stroke="#37474F" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M34 12L22 28L18 32L16 30L20 26L32 10L34 12Z" fill="#CFD8DC" stroke="#263238" strokeWidth="2" />
        <circle cx="26" cy="34" r="1.5" fill="#D32F2F" />
      </svg>
    );
  }

  if (norm.includes('psycholog')) {
    // Psychology (profile + empathy)
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
        <circle cx="24" cy="18" r="8" fill="#F3E5F5" stroke="#7B1FA2" strokeWidth="2.5" />
        <path d="M14 36C14 30 18 28 24 28C30 28 34 30 34 36" stroke="#7B1FA2" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M22 17C22 15 26 15 26 17C26 19 24 19 24 21" stroke="#9C27B0" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="23" r="0.8" fill="#9C27B0" />
      </svg>
    );
  }

  if (norm.includes('oncol')) {
    // Cancer ribbon (Medical Oncology)
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
        <path d="M24 12C21 12 18 15 18 19C18 24 22 29 27 36" stroke="#8E24AA" strokeWidth="3" strokeLinecap="round" />
        <path d="M24 12C27 12 30 15 30 19C30 24 26 29 21 36" stroke="#8E24AA" strokeWidth="3" strokeLinecap="round" />
        <circle cx="24" cy="18" r="4" fill="#F3E5F5" />
      </svg>
    );
  }

  if (norm.includes('diabet')) {
    // Glucometer / blood drop (Diabetology)
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
        <rect x="15" y="10" width="18" height="28" rx="6" fill="#E0F7FA" stroke="#00838F" strokeWidth="2.5" />
        <rect x="18" y="14" width="12" height="9" rx="2" fill="white" stroke="#006064" strokeWidth="1.5" />
        <circle cx="24" cy="30" r="3" fill="#00838F" />
        <path d="M33 26C35 24 37 26 37 28C37 30 35 32 33 32" fill="#FFCDD2" stroke="#D32F2F" strokeWidth="1.5" />
      </svg>
    );
  }

  if (norm.includes('dent')) {
    // Tooth / dental drill (Dentist)
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
        <path d="M16 14C18 12 22 13 24 15C26 13 30 12 32 14C35 17 35 23 33 28C32 31 31 36 29 36C27 36 27 30 24 30C21 30 21 36 19 36C17 36 16 31 15 28C13 23 13 17 16 14Z" fill="#F5F5F5" stroke="#424242" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="20" cy="20" r="1.5" fill="#9E9E9E" />
        <circle cx="28" cy="20" r="1.5" fill="#9E9E9E" />
      </svg>
    );
  }

  // Fallback medical cross
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="16" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="2.5" />
      <path d="M24 16V32M16 24H32" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
