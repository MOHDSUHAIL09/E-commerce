// Re-exported from pure custom hook to eliminate React Context
import React from 'react';
export * from '../hooks/useAuth';
export { useAuth as default } from '../hooks/useAuth';

export const AuthProvider = ({ children }) => <>{children}</>;
