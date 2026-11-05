import { useState, useEffect } from 'react';

// Module-level reactive state without React Context
let cartState = {
  cartItems: (() => {
    try {
      const saved = localStorage.getItem('auramed_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: 'prod-1',
          name: 'AuraC-Zinc 1000mg Effervescent Tablets (20s)',
          brand: 'CureOn Naturals',
          price: 240.00,
          mrp: 320.00,
          image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
          prescriptionRequired: false,
          quantity: 2,
          stock: 85
        },
        {
          id: 'prod-6',
          name: 'DoloCalm 650mg Paracetamol Tablets (15s)',
          brand: 'MicroLabs Health',
          price: 34.00,
          mrp: 45.00,
          image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&auto=format&fit=crop&q=80',
          prescriptionRequired: false,
          quantity: 1,
          stock: 350
        }
      ];
    } catch {
      return [];
    }
  })(),
  savedItems: (() => {
    try {
      const saved = localStorage.getItem('auramed_saved_later');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  })(),
  coupon: null,
  couponError: '',
  toastMessage: ''
};

const listeners = new Set();

const updateCartState = (updater) => {
  if (typeof updater === 'function') {
    cartState = updater(cartState);
  } else {
    cartState = { ...cartState, ...updater };
  }
  try {
    localStorage.setItem('auramed_cart', JSON.stringify(cartState.cartItems));
    localStorage.setItem('auramed_saved_later', JSON.stringify(cartState.savedItems));
  } catch (e) {
    console.error('Failed to sync cart storage', e);
  }
  listeners.forEach(fn => fn(cartState));
};

const showToast = (msg) => {
  updateCartState({ toastMessage: msg });
  setTimeout(() => {
    updateCartState({ toastMessage: '' });
  }, 3000);
};

export const cartActions = {
  addToCart: (product, quantity = 1) => {
    updateCartState(prev => {
      const existing = prev.cartItems.find(item => item.id === product.id);
      let updated;
      if (existing) {
        showToast(`Updated "${product.name}" in cart`);
        updated = prev.cartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, item.stock || 99) }
            : item
        );
      } else {
        showToast(`Added "${product.name}" to cart`);
        updated = [...prev.cartItems, {
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          mrp: product.mrp,
          image: product.image,
          prescriptionRequired: product.prescriptionRequired,
          quantity: quantity,
          stock: product.stock || 50
        }];
      }
      return { ...prev, cartItems: updated };
    });
  },

  removeFromCart: (productId) => {
    updateCartState(prev => ({
      ...prev,
      cartItems: prev.cartItems.filter(item => item.id !== productId)
    }));
    showToast('Item removed from cart');
  },

  updateQuantity: (productId, delta) => {
    updateCartState(prev => ({
      ...prev,
      cartItems: prev.cartItems.map(item => {
        if (item.id === productId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          return { ...item, quantity: Math.min(newQty, item.stock || 99) };
        }
        return item;
      }).filter(Boolean)
    }));
  },

  saveForLater: (productId) => {
    const itemToSave = cartState.cartItems.find(item => item.id === productId);
    if (!itemToSave) return;
    updateCartState(prev => ({
      ...prev,
      cartItems: prev.cartItems.filter(item => item.id !== productId),
      savedItems: [...prev.savedItems.filter(item => item.id !== productId), itemToSave]
    }));
    showToast('Saved for later');
  },

  moveToCart: (productId) => {
    const itemToMove = cartState.savedItems.find(item => item.id === productId);
    if (!itemToMove) return;
    updateCartState(prev => ({
      ...prev,
      savedItems: prev.savedItems.filter(item => item.id !== productId)
    }));
    cartActions.addToCart(itemToMove, itemToMove.quantity || 1);
  },

  removeSavedItem: (productId) => {
    updateCartState(prev => ({
      ...prev,
      savedItems: prev.savedItems.filter(item => item.id !== productId)
    }));
  },

  clearCart: () => {
    updateCartState(prev => ({
      ...prev,
      cartItems: [],
      coupon: null
    }));
  },

  applyCoupon: (code) => {
    const upper = code.trim().toUpperCase();
    updateCartState({ couponError: '' });
    if (upper === 'HEALTH20') {
      updateCartState({ coupon: { code: 'HEALTH20', discountPercent: 20, name: '20% Wellness Discount' } });
      showToast('Coupon HEALTH20 applied: 20% OFF!');
      return true;
    } else if (upper === 'FIRST50') {
      updateCartState({ coupon: { code: 'FIRST50', discountPercent: 50, maxDiscount: 150, name: '50% First Order (Max ₹150)' } });
      showToast('Coupon FIRST50 applied!');
      return true;
    } else if (upper === 'CARE10') {
      updateCartState({ coupon: { code: 'CARE10', discountPercent: 10, name: '10% Healthcare Care Discount' } });
      showToast('Coupon CARE10 applied: 10% OFF!');
      return true;
    } else {
      updateCartState({ couponError: 'Invalid coupon code. Try HEALTH20, FIRST50, or CARE10.' });
      return false;
    }
  },

  removeCoupon: () => {
    updateCartState({ coupon: null, couponError: '' });
    showToast('Coupon removed');
  },

  showToast
};

export function useCart() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick(t => t + 1);
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  const { cartItems, savedItems, coupon, couponError, toastMessage } = cartState;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const itemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  let couponDiscount = 0;
  if (coupon) {
    if (coupon.discountPercent) {
      couponDiscount = (subtotal * coupon.discountPercent) / 100;
      if (coupon.maxDiscount && couponDiscount > coupon.maxDiscount) {
        couponDiscount = coupon.maxDiscount;
      }
    }
  }

  const shippingFee = subtotal > 499 || subtotal === 0 ? 0 : 40;
  const tax = Number((subtotal * 0.05).toFixed(2));
  const finalTotal = Math.max(0, subtotal - couponDiscount + (cartItems.length > 0 ? shippingFee : 0) + tax);

  return {
    cartItems,
    savedItems,
    itemsCount,
    subtotal,
    couponDiscount,
    shippingFee,
    tax,
    finalTotal,
    coupon,
    couponError,
    toastMessage,
    ...cartActions
  };
}
