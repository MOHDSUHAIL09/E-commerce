// Re-exported from pure custom hook to eliminate React Context
import React from 'react';
export * from '../hooks/useCart';
export { useCart as default } from '../hooks/useCart';

export const CartProvider = ({ children }) => <>{children}</>;
