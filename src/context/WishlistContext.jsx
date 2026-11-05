// Re-exported from pure custom hook to eliminate React Context
import React from 'react';
export * from '../hooks/useWishlist';
export { useWishlist as default } from '../hooks/useWishlist';

export const WishlistProvider = ({ children }) => <>{children}</>;
