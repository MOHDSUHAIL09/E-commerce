import { useState, useEffect } from 'react';

export const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'AuraC-Zinc 1000mg Effervescent Tablets (20s)',
    brand: 'AuraMed Naturals',
    manufacturer: 'AuraMed Healthcare Labs Ltd.',
    category: 'Vitamins & Supplements',
    categorySlug: 'vitamins-supplements',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    mrp: 18.00,
    price: 13.50,
    discount: 25,
    rating: 4.8,
    reviewsCount: 342,
    stock: 85,
    inStock: true,
    prescriptionRequired: false,
    isPopular: true,
    isBestSeller: true,
    isTrending: true,
    isFeatured: true,
    description: 'High-absorption Vitamin C paired with elemental Zinc to boost natural cellular immunity and promote radiant skin vitality.',
    composition: 'Phyllanthus emblica extract (1000mg), Zinc sulphate monohydrate equivalent to elemental Zinc (10mg).',
    uses: 'Immune system defense, antioxidant protection against oxidative stress.',
    dosage: 'Drop 1 tablet into 200ml fresh water daily after breakfast.'
  },
  {
    id: 'prod-2',
    name: 'GlucoSense Plus Digital Blood Glucose Monitoring System',
    brand: 'AccuCheck Med',
    manufacturer: 'Roche Diagnostics Global',
    category: 'Diabetes Care',
    categorySlug: 'diabetes-care',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600&auto=format&fit=crop&q=80',
    mrp: 35.00,
    price: 26.25,
    discount: 25,
    rating: 4.9,
    reviewsCount: 512,
    stock: 42,
    inStock: true,
    prescriptionRequired: false,
    isPopular: true,
    isBestSeller: true,
    isTrending: false,
    isFeatured: true,
    description: 'Advanced biosensor technology delivering laboratory-accurate blood sugar readings in under 5 seconds with tiny 0.6 µL sample.',
    composition: '1 Meter, 25 Strips, 1 Lancing Device, 10 Lancets, Case.'
  },
  {
    id: 'prod-3',
    name: 'AmoxiClav 625 Duo Tablets (10s)',
    brand: 'Clavam Health',
    manufacturer: 'Alkem Laboratories Inc.',
    category: 'Prescription Medicines',
    categorySlug: 'prescription-medicines',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80',
    mrp: 14.50,
    price: 11.60,
    discount: 20,
    rating: 4.7,
    reviewsCount: 198,
    stock: 120,
    inStock: true,
    prescriptionRequired: true,
    isPopular: true,
    isBestSeller: false,
    isTrending: false,
    isFeatured: true,
    description: 'Broad-spectrum antibiotic combining amoxicillin with potassium clavulanate to treat bacterial infections.',
    composition: 'Amoxicillin 500mg + Clavulanic Acid 125mg.'
  },
  {
    id: 'prod-4',
    name: 'Omron Hem-7120 Fully Automatic Blood Pressure Monitor',
    brand: 'Omron Healthcare',
    manufacturer: 'Omron Dalian Co. Ltd.',
    category: 'Medical Devices',
    categorySlug: 'medical-devices',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80',
    mrp: 48.00,
    price: 36.00,
    discount: 25,
    rating: 4.9,
    reviewsCount: 680,
    stock: 30,
    inStock: true,
    prescriptionRequired: false,
    isPopular: true,
    isBestSeller: true,
    isTrending: true,
    isFeatured: true,
    description: 'Clinically validated upper arm blood pressure monitor with Intellisense technology for comfortable inflation.',
    composition: '1 Main unit, Standard Cuff (22-32 cm), 4 AA Batteries.'
  },
  {
    id: 'prod-5',
    name: 'Omega-3 Triple Strength Fish Oil 1250mg (60 Softgels)',
    brand: 'AuraMed Wellness',
    manufacturer: 'AuraMed Healthcare Labs Ltd.',
    category: 'Cardiac Care',
    categorySlug: 'cardiac-care',
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=600&auto=format&fit=crop&q=80',
    mrp: 24.00,
    price: 18.00,
    discount: 25,
    rating: 4.8,
    reviewsCount: 284,
    stock: 65,
    inStock: true,
    prescriptionRequired: false,
    isPopular: true,
    isBestSeller: true,
    isTrending: true,
    isFeatured: true,
    description: 'Molecularly distilled deep-sea fish oil providing 560mg EPA and 400mg DHA per softgel.',
    composition: 'Deep Sea Fish Oil 1250mg (EPA 560mg, DHA 400mg).'
  },
  {
    id: 'prod-6',
    name: 'DoloCalm 650mg Paracetamol Tablets (15s)',
    brand: 'MicroLabs Health',
    manufacturer: 'Micro Labs Corporation',
    category: 'OTC Medicines',
    categorySlug: 'otc-medicines',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&auto=format&fit=crop&q=80',
    mrp: 4.00,
    price: 3.20,
    discount: 20,
    rating: 4.9,
    reviewsCount: 1240,
    stock: 350,
    inStock: true,
    prescriptionRequired: false,
    isPopular: true,
    isBestSeller: true,
    isTrending: false,
    isFeatured: false,
    description: 'Trusted fast-action antipyretic and analgesic for relief from fever and body aches.',
    composition: 'Paracetamol IP 650mg.'
  },
  {
    id: 'prod-7',
    name: 'CeraHydra Daily Moisturizing Ceramide Lotion 250ml',
    brand: 'DermaClinique',
    manufacturer: 'Galderma Skin Sciences',
    category: 'Skin Care',
    categorySlug: 'skin-care',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
    mrp: 22.00,
    price: 17.60,
    discount: 20,
    rating: 4.7,
    reviewsCount: 420,
    stock: 90,
    inStock: true,
    prescriptionRequired: false,
    isPopular: true,
    isBestSeller: true,
    isTrending: true,
    isFeatured: true,
    description: 'Formulated with dermatologists, contains 3 essential ceramides and hyaluronic acid for 48h moisture.',
    composition: 'Ceramides NP, AP, EOP, Hyaluronic Acid, Glycerin.'
  },
  {
    id: 'prod-8',
    name: 'AtorvaCare 20mg Cardiovascular Tablets (15s)',
    brand: 'CardioPharma Inc.',
    manufacturer: 'Pfizer Global Health',
    category: 'Prescription Medicines',
    categorySlug: 'prescription-medicines',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    mrp: 16.00,
    price: 12.80,
    discount: 20,
    rating: 4.8,
    reviewsCount: 164,
    stock: 80,
    inStock: true,
    prescriptionRequired: true,
    isPopular: false,
    isBestSeller: false,
    isTrending: false,
    isFeatured: true,
    description: 'HMG-CoA reductase inhibitor for lowering high LDL cholesterol and triglycerides.',
    composition: 'Atorvastatin Calcium Trihydrate 20mg.'
  },
  {
    id: 'prod-9',
    name: 'PlantPro Clean Organic Vegan Protein Vanilla 1kg',
    brand: 'PureNutra Active',
    manufacturer: 'PureNutra Labs USA',
    category: 'Protein & Nutrition',
    categorySlug: 'protein-nutrition',
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600&auto=format&fit=crop&q=80',
    mrp: 52.00,
    price: 39.00,
    discount: 25,
    rating: 4.8,
    reviewsCount: 189,
    stock: 45,
    inStock: true,
    prescriptionRequired: false,
    isPopular: true,
    isBestSeller: false,
    isTrending: true,
    isFeatured: false,
    description: '25g bio-fermented pea and brown rice protein per serving with BCAAs and digestive enzymes.',
    composition: 'Organic Pea Protein, Brown Rice Protein, DigeZyme.'
  },
  {
    id: 'prod-10',
    name: 'Ashwagandha KSM-66 Organic Stress Relief (60 Veg Caps)',
    brand: 'AuraMed Botanicals',
    manufacturer: 'AuraMed Healthcare Labs Ltd.',
    category: 'Ayurvedic Medicines',
    categorySlug: 'ayurvedic-medicines',
    image: 'https://images.unsplash.com/photo-1616671285442-992383c26759?w=600&auto=format&fit=crop&q=80',
    mrp: 19.50,
    price: 14.60,
    discount: 25,
    rating: 4.9,
    reviewsCount: 310,
    stock: 95,
    inStock: true,
    prescriptionRequired: false,
    isPopular: true,
    isBestSeller: true,
    isTrending: true,
    isFeatured: true,
    description: 'Full-spectrum root extract clinically proven to balance cortisol and promote restorative sleep.',
    composition: 'KSM-66 Withania somnifera 500mg, BioPerine 5mg.'
  },
  {
    id: 'prod-11',
    name: 'ReliefFast Analgesic Diclofenac Gel 50g',
    brand: 'Voveran Active',
    manufacturer: 'Novartis Healthcare',
    category: 'Pain Relief',
    categorySlug: 'pain-relief',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80',
    mrp: 8.50,
    price: 6.80,
    discount: 20,
    rating: 4.7,
    reviewsCount: 245,
    stock: 140,
    inStock: true,
    prescriptionRequired: false,
    isPopular: true,
    isBestSeller: false,
    isTrending: false,
    isFeatured: false,
    description: 'Deep penetrating gel providing immediate cooling relief for back pain, muscle sprains and stiff joints.',
    composition: 'Diclofenac Diethylamine 1.16%, Menthol 5%.'
  },
  {
    id: 'prod-12',
    name: 'BabyCare Gentle Hypoallergenic Head-to-Toe Wash 400ml',
    brand: 'Sebamed Baby',
    manufacturer: 'Sebapharma GmbH',
    category: 'Baby & Mother Care',
    categorySlug: 'baby-mother-care',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&auto=format&fit=crop&q=80',
    mrp: 18.00,
    price: 15.30,
    discount: 15,
    rating: 4.9,
    reviewsCount: 380,
    stock: 75,
    inStock: true,
    prescriptionRequired: false,
    isPopular: true,
    isBestSeller: true,
    isTrending: false,
    isFeatured: true,
    description: 'Soap-free formula with pH 5.5 to support baby natural skin barrier. Tear-free cleansing.',
    composition: 'Aqua, Decyl Glucoside, Chamomile extract, Panthenol.'
  },
  // Minimum 50% Off Products
  {
    id: 'prod-50-1',
    name: 'Nivea Body Milk Nourishing Lotion, 600 ml',
    brand: 'Nivea',
    category: 'Personal Care',
    categorySlug: 'personal-care',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
    mrp: 34.40,
    price: 17.20,
    inrMrp: 860,
    inrPrice: 430,
    discount: 50,
    rating: 4.5,
    reviewsCount: 820,
    stock: 120,
    inStock: true,
    size: '600 ml Lotion',
    form: 'Bottle',
    attributes: 'Almond Oil • Deep Moisture 48h',
    deliveryDay: 'SUN, 08 NOV',
    prescriptionRequired: false,
    isFiftyPercentOff: true,
    isPopular: true
  },
  {
    id: 'prod-50-2',
    name: 'Bajaj Coconut Hair Oil, 525 ml',
    brand: 'Bajaj',
    category: 'Hair Care',
    categorySlug: 'hair-care',
    image: 'https://images.unsplash.com/photo-1608248597359-54332467d93b?w=600&auto=format&fit=crop&q=80',
    mrp: 16.00,
    price: 8.00,
    inrMrp: 400,
    inrPrice: 200,
    discount: 50,
    rating: 4.4,
    reviewsCount: 1450,
    stock: 200,
    inStock: true,
    size: '525 ml Oil',
    form: 'Bottle',
    attributes: 'Coconut Oil • Dry Scalp • Shine',
    deliveryDay: 'SUN, 08 NOV',
    prescriptionRequired: false,
    isFiftyPercentOff: true,
    isPopular: true
  },
  {
    id: 'prod-50-3',
    name: 'Clean & Clear Foaming Face Wash, 240 ml',
    brand: 'Clean & Clear',
    category: 'Skin Care',
    categorySlug: 'skin-care',
    image: 'https://images.unsplash.com/photo-1556228722-d0b503026723?w=600&auto=format&fit=crop&q=80',
    mrp: 21.56,
    price: 10.78,
    inrMrp: 539,
    inrPrice: 269.50,
    discount: 50,
    rating: 4.5,
    reviewsCount: 940,
    stock: 150,
    inStock: true,
    size: '240 ml Face Wash',
    form: 'Bottle',
    attributes: 'Acne Defense • Oil Free • Purifying',
    deliveryDay: 'SUN, 08 NOV',
    prescriptionRequired: false,
    isFiftyPercentOff: true,
    isPopular: true
  },
  {
    id: 'prod-50-4',
    name: 'Vaseline Sun Protect SPF 50 PA++++ Body Lotion, 400 ml',
    brand: 'Vaseline',
    category: 'Skin Care',
    categorySlug: 'skin-care',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80',
    mrp: 31.96,
    price: 15.98,
    inrMrp: 799,
    inrPrice: 399.50,
    discount: 50,
    rating: 4.6,
    reviewsCount: 1120,
    stock: 95,
    inStock: true,
    size: '400 ml Lotion',
    form: 'Bottle',
    attributes: 'UV Defense • SPF 50 Broad Spectrum',
    deliveryDay: 'TUE, 10 NOV',
    prescriptionRequired: false,
    isFiftyPercentOff: true,
    isPopular: true
  },
  {
    id: 'prod-50-5',
    name: 'Dabur Red Toothpaste Family Dual Pack 350 gm',
    brand: 'Dabur',
    category: 'Dental Care',
    categorySlug: 'dental-care',
    image: 'https://images.unsplash.com/photo-1559567249-664ff0226771?w=600&auto=format&fit=crop&q=80',
    mrp: 14.00,
    price: 7.00,
    inrMrp: 350,
    inrPrice: 175,
    discount: 50,
    rating: 4.5,
    reviewsCount: 780,
    stock: 180,
    inStock: true,
    size: '2×175 gm Toothpaste',
    form: 'Pack',
    attributes: 'Ayurvedic Clove & Pudina • Cavity Defense',
    deliveryDay: 'SUN, 08 NOV',
    prescriptionRequired: false,
    isFiftyPercentOff: true,
    isPopular: true
  },
  {
    id: 'prod-50-6',
    name: 'Mamaearth Ubtan Moisturizing Bodywash, 500 ml',
    brand: 'Mamaearth',
    category: 'Personal Care',
    categorySlug: 'personal-care',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop&q=80',
    mrp: 23.96,
    price: 11.98,
    inrMrp: 599,
    inrPrice: 299.50,
    discount: 50,
    rating: 4.7,
    reviewsCount: 650,
    stock: 110,
    inStock: true,
    size: '500 ml Body Wash',
    form: 'Bottle',
    attributes: 'Tan Removal • Saffron & Turmeric',
    deliveryDay: 'SUN, 08 NOV',
    prescriptionRequired: false,
    isFiftyPercentOff: true,
    isPopular: true
  }
];

export const SAMPLE_ORDERS = [
  {
    id: 'ORD-98214',
    date: '2026-11-01',
    total: 39.75,
    itemsCount: 3,
    status: 'Delivered',
    trackingNumber: 'AUR-EXP-88912',
    deliveryAddress: '742 Evergreen Terrace, New York, NY 10001',
    items: [
      { id: 'prod-1', name: 'AuraC-Zinc 1000mg Effervescent Tablets', quantity: 2, price: 13.50 },
      { id: 'prod-6', name: 'DoloCalm 650mg Paracetamol Tablets', quantity: 4, price: 3.20 }
    ]
  },
  {
    id: 'ORD-98289',
    date: '2026-11-03',
    total: 62.25,
    itemsCount: 2,
    status: 'Out for Delivery',
    trackingNumber: 'AUR-EXP-99231',
    deliveryAddress: '42 Wallaby Way, Suite 4B, New York, NY 10002',
    items: [
      { id: 'prod-4', name: 'Omron Hem-7120 Blood Pressure Monitor', quantity: 1, price: 36.00 },
      { id: 'prod-2', name: 'GlucoSense Plus Digital Monitor', quantity: 1, price: 26.25 }
    ]
  }
];

export const SAMPLE_PRESCRIPTIONS = [
  {
    id: 'RX-7712',
    patientName: 'Alex Morgan',
    doctorName: 'Dr. Michael Hayes, MD',
    clinicName: 'St. Jude Health Pavilion',
    uploadDate: '2026-11-02',
    status: 'Approved',
    fileUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=800&auto=format&fit=crop&q=80',
    fileName: 'prescription_alex_nov2.jpg',
    pharmacistNotes: 'Verified with prescriber license. Valid for 60 days. Dispense Amoxiclav 625 Duo 10s.'
  },
  {
    id: 'RX-7789',
    patientName: 'Emma Watson',
    doctorName: 'Dr. Rachel Bennett',
    clinicName: 'AuraMed Women Care Clinic',
    uploadDate: '2026-11-03',
    status: 'Pending Verification',
    fileUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
    fileName: 'rx_metformin_500.pdf',
    pharmacistNotes: 'Queued for pharmacist verification.'
  }
];

// Module-level reactive healthcare state without React Context
let healthcareState = {
  productsList: (() => {
    try {
      const saved = localStorage.getItem('auramed_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  })(),
  prescriptions: (() => {
    try {
      const saved = localStorage.getItem('auramed_prescriptions');
      return saved ? JSON.parse(saved) : SAMPLE_PRESCRIPTIONS;
    } catch {
      return SAMPLE_PRESCRIPTIONS;
    }
  })(),
  orders: (() => {
    try {
      const saved = localStorage.getItem('auramed_orders');
      return saved ? JSON.parse(saved) : SAMPLE_ORDERS;
    } catch {
      return SAMPLE_ORDERS;
    }
  })(),
  doctorAppointments: (() => {
    try {
      const saved = localStorage.getItem('auramed_doctor_appointments');
      return saved ? JSON.parse(saved) : [
        {
          id: 'APT-1049',
          doctorId: 'doc-1',
          doctorName: 'Dr. Evelyn Reed',
          specialization: 'General Physician',
          date: '2026-11-05',
          slot: '11:00 AM',
          patientName: 'Alex Morgan',
          consultationFee: 599.00,
          status: 'Confirmed',
          type: 'Video Consultation',
          hospital: 'AuraMed Central Medical Center'
        }
      ];
    } catch {
      return [];
    }
  })(),
  labBookings: (() => {
    try {
      const saved = localStorage.getItem('auramed_lab_bookings');
      return saved ? JSON.parse(saved) : [
        {
          id: 'LAB-5510',
          testId: 'lab-1',
          testName: 'AuraComprehensive Full Body Health Checkup (84 Tests)',
          date: '2026-11-06',
          slot: '08:00 AM - 09:00 AM',
          patientName: 'Alex Morgan',
          price: 39.99,
          status: 'Scheduled',
          homeCollection: true,
          collectionAddress: '742 Evergreen Terrace, Apt 4B, New York, NY 10001'
        }
      ];
    } catch {
      return [];
    }
  })(),
  // compareItems: (() => {
  //   try {
  //     const saved = localStorage.getItem('auramed_compare');
  //     return saved ? JSON.parse(saved) : [];
  //   } catch {
  //     return [];
  //   }
  // })
  
  // ()
};

const listeners = new Set();

const updateHealthcareState = (updater) => {
  if (typeof updater === 'function') {
    healthcareState = updater(healthcareState);
  } else {
    healthcareState = { ...healthcareState, ...updater };
  }
  try {
    localStorage.setItem('auramed_products', JSON.stringify(healthcareState.productsList));
    localStorage.setItem('auramed_prescriptions', JSON.stringify(healthcareState.prescriptions));
    localStorage.setItem('auramed_orders', JSON.stringify(healthcareState.orders));
    localStorage.setItem('auramed_doctor_appointments', JSON.stringify(healthcareState.doctorAppointments));
    localStorage.setItem('auramed_lab_bookings', JSON.stringify(healthcareState.labBookings));
    // localStorage.setItem('auramed_compare', JSON.stringify(healthcareState.compareItems));
  } catch (e) {
    console.error('Failed to sync healthcare storage', e);
  }
  listeners.forEach(fn => fn(healthcareState));
};

export const healthcareActions = {
  uploadPrescription: (newRx) => {
    const rxRecord = {
      id: `RX-${Math.floor(1000 + Math.random() * 9000)}`,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'Pending Verification',
      pharmacistNotes: 'Assigned to pharmacist queue for validation.',
      ...newRx
    };
    updateHealthcareState(prev => ({
      ...prev,
      prescriptions: [rxRecord, ...prev.prescriptions]
    }));
    return rxRecord;
  },

  updatePrescriptionStatus: (id, status, notes) => {
    updateHealthcareState(prev => ({
      ...prev,
      prescriptions: prev.prescriptions.map(rx =>
        rx.id === id ? { ...rx, status, pharmacistNotes: notes || rx.pharmacistNotes } : rx
      )
    }));
  },

  bookDoctorAppointment: (aptData) => {
    const newApt = {
      id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Confirmed',
      ...aptData
    };
    updateHealthcareState(prev => ({
      ...prev,
      doctorAppointments: [newApt, ...prev.doctorAppointments]
    }));
    return newApt;
  },

  cancelDoctorAppointment: (aptId) => {
    updateHealthcareState(prev => ({
      ...prev,
      doctorAppointments: prev.doctorAppointments.map(apt =>
        apt.id === aptId ? { ...apt, status: 'Cancelled' } : apt
      )
    }));
  },

  bookLabTest: (bookingData) => {
    const newBooking = {
      id: `LAB-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Scheduled',
      ...bookingData
    };
    updateHealthcareState(prev => ({
      ...prev,
      labBookings: [newBooking, ...prev.labBookings]
    }));
    return newBooking;
  },

  cancelLabBooking: (bookingId) => {
    updateHealthcareState(prev => ({
      ...prev,
      labBookings: prev.labBookings.map(item =>
        item.id === bookingId ? { ...item, status: 'Cancelled' } : item
      )
    }));
  },

  placeOrder: (orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      trackingNumber: `AUR-EXP-${Math.floor(10000 + Math.random() * 90000)}`,
      ...orderData
    };
    updateHealthcareState(prev => ({
      ...prev,
      orders: [newOrder, ...prev.orders]
    }));
    return newOrder;
  },

  updateOrderStatus: (orderId, status) => {
    updateHealthcareState(prev => ({
      ...prev,
      orders: prev.orders.map(ord =>
        ord.id === orderId ? { ...ord, status } : ord
      )
    }));
  },

  // toggleCompare: (productId) => {
  //   if (healthcareState.compareItems.includes(productId)) {
  //     updateHealthcareState(prev => ({
  //       ...prev,
  //       compareItems: prev.compareItems.filter(id => id !== productId)
  //     }));
  //   } else {
  //     if (healthcareState.compareItems.length >= 4) {
  //       alert('You can compare a maximum of 4 products at a time.');
  //       return;
  //     }
  //     updateHealthcareState(prev => ({
  //       ...prev,
  //       compareItems: [...prev.compareItems, productId]
  //     }));
  //   }
  // },

  // removeFromCompare: (productId) => {
  //   updateHealthcareState(prev => ({
  //     ...prev,
  //     compareItems: prev.compareItems.filter(id => id !== productId)
  //   }));
  // },

  // clearCompare: () => {
  //   updateHealthcareState({ compareItems: [] });
  // },

  addProduct: (prod) => {
    const newProd = {
      ...prod,
      id: `prod-${Date.now()}`,
      categorySlug: prod.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      reviewsCount: 0,
      rating: 5.0,
      inStock: Number(prod.stock) > 0
    };
    updateHealthcareState(prev => ({
      ...prev,
      productsList: [newProd, ...prev.productsList]
    }));
  },

  editProduct: (id, updatedFields) => {
    updateHealthcareState(prev => ({
      ...prev,
      productsList: prev.productsList.map(p =>
        p.id === id ? { ...p, ...updatedFields } : p
      )
    }));
  },

  deleteProduct: (id) => {
    updateHealthcareState(prev => ({
      ...prev,
      productsList: prev.productsList.filter(p => p.id !== id)
    }));
  }
};

export function useHealthcare() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick(t => t + 1);
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  return {
    ...healthcareState,
    ...healthcareActions
  };
}
