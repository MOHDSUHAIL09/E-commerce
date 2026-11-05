import { useState, useEffect } from 'react';

// Module-level reactive wishlist state without React Context
let wishlist = (() => {
  try {
    const saved = localStorage.getItem('auramed_wishlist');
    return saved ? JSON.parse(saved) : ['prod-2', 'prod-5'];
  } catch {
    return ['prod-2', 'prod-5'];
  }
})();

const listeners = new Set();

const updateWishlist = (newWishlist) => {
  wishlist = newWishlist;
  try {
    localStorage.setItem('auramed_wishlist', JSON.stringify(wishlist));
  } catch (e) {
    console.error('Failed to sync wishlist storage', e);
  }
  listeners.forEach(fn => fn(wishlist));
};

export const wishlistActions = {
  addToWishlist: (productId) => {
    if (!wishlist.includes(productId)) {
      updateWishlist([...wishlist, productId]);
    }
  },

  removeFromWishlist: (productId) => {
    updateWishlist(wishlist.filter(id => id !== productId));
  },

  toggleWishlist: (productId) => {
    if (wishlist.includes(productId)) {
      wishlistActions.removeFromWishlist(productId);
    } else {
      wishlistActions.addToWishlist(productId);
    }
  },

  isInWishlist: (productId) => wishlist.includes(productId)
};

export function useWishlist() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick(t => t + 1);
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  return {
    wishlist,
    wishlistCount: wishlist.length,
    ...wishlistActions
  };
}
