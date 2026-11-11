import { useState, useEffect } from 'react';

export const ROLE_PROFILES = {
  customer: {
    id: 'usr-1',
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 234-5678',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    loyaltyPoints: 480,
    tier: 'Gold Health Club Member'
  },
  pharmacist: {
    id: 'usr-2',
    name: 'Dr. Nathan Cross, PharmD',
    email: 'nathan.pharm@auramed.com',
    phone: '+1 (555) 345-6789',
    role: 'pharmacist',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80',
    licenseNumber: 'RPH-NY-98231',
    assignedBranch: 'AuraMed Manhattan Central'
  },
  delivery: {
    id: 'usr-3',
    name: 'Liam Hayes',
    email: 'liam.rider@auramed.com',
    phone: '+1 (555) 456-7890',
    role: 'delivery',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    vehicle: 'Electric Courier Van #12',
    rating: 4.95,
    todayDeliveries: 14
  },
  admin: {
    id: 'usr-4',
    name: 'Elena Rostova',
    email: 'admin@auramed.com',
    phone: '+1 (555) 123-0000',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    roleTitle: 'Director of Healthcare Operations'
  },
  super_admin: {
    id: 'usr-5',
    name: 'Chief Admin (Super Admin)',
    email: 'superadmin@auramed.com',
    phone: '+91 98765 43210',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    roleTitle: 'Chief Technology & Healthcare Executive (Full Access)'
  }
};

const DEFAULT_ADDRESSES = [
  {
    id: 'addr-1',
    type: 'Home',
    recipient: 'Alex Morgan',
    phone: '+1 (555) 234-5678',
    addressLine: '742 Evergreen Terrace, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    isDefault: true
  },
];

// Module-level auth state without React Context
let authState = {
  currentRole: (() => {
    try {
      return localStorage.getItem('auramed_current_role') || 'customer';
    } catch {
      return 'customer';
    }
  })(),
  currentUser: null,
  addresses: (() => {
    try {
      const saved = localStorage.getItem('auramed_addresses');
      return saved ? JSON.parse(saved) : DEFAULT_ADDRESSES;
    } catch {
      return DEFAULT_ADDRESSES;
    }
  })(),
  isLoggedIn: (() => {
    try {
      return localStorage.getItem('auramed_is_logged_in') === 'true';
    } catch {
      return false;
    }
  })(),
  selectedAddressId: 'addr-1',
  selectedLocation: (() => {
    try {
      return localStorage.getItem('auramed_location') || 'Moradabad 244001, Ut...';
    } catch {
      return 'Moradabad 244001, Ut...';
    }
  })()
};
authState.currentUser = ROLE_PROFILES[authState.currentRole] || ROLE_PROFILES.customer;

const listeners = new Set();

const updateAuthState = (updater) => {
  if (typeof updater === 'function') {
    authState = updater(authState);
  } else {
    authState = { ...authState, ...updater };
  }
  try {
    localStorage.setItem('auramed_current_role', authState.currentRole);
    localStorage.setItem('auramed_is_logged_in', authState.isLoggedIn ? 'true' : 'false');
    localStorage.setItem('auramed_addresses', JSON.stringify(authState.addresses));
    localStorage.setItem('auramed_location', authState.selectedLocation);
  } catch (e) {
    console.error('Failed to sync auth storage', e);
  }
  listeners.forEach(fn => fn(authState));
};

export const authActions = {
  switchRole: (role) => {
    if (ROLE_PROFILES[role]) {
      updateAuthState({
        currentRole: role,
        currentUser: ROLE_PROFILES[role]
      });
    }
  },

  login: (role = 'customer') => {
    updateAuthState({
      currentRole: role,
      currentUser: ROLE_PROFILES[role] || ROLE_PROFILES.customer,
      isLoggedIn: true
    });
  },

  logout: () => {
    updateAuthState({
      isLoggedIn: false
    });
  },

  setSelectedLocation: (loc) => {
    updateAuthState({ selectedLocation: loc });
  },

  setSelectedAddressId: (id) => {
    updateAuthState({ selectedAddressId: id });
  },

  addAddress: (newAddr) => {
    updateAuthState(prev => {
      const created = {
        ...newAddr,
        id: `addr-${Date.now()}`,
        isDefault: prev.addresses.length === 0
      };
      return {
        ...prev,
        addresses: [...prev.addresses, created],
        selectedAddressId: prev.addresses.length === 0 ? created.id : prev.selectedAddressId
      };
    });
  },

  deleteAddress: (id) => {
    updateAuthState(prev => ({
      ...prev,
      addresses: prev.addresses.filter(a => a.id !== id)
    }));
  },

  setDefaultAddress: (id) => {
    updateAuthState(prev => ({
      ...prev,
      addresses: prev.addresses.map(a => ({
        ...a,
        isDefault: a.id === id
      })),
      selectedAddressId: id
    }));
  },

  updateProfile: (fields) => {
    updateAuthState(prev => ({
      ...prev,
      currentUser: { ...prev.currentUser, ...fields }
    }));
  }
};

export function useAuth() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick(t => t + 1);
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  return {
    ...authState,
    ...authActions
  };
}
