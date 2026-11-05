// Re-exported from pure custom hook to eliminate React Context
import React from 'react';
export * from '../hooks/useHealthcare';
export { useHealthcare as default } from '../hooks/useHealthcare';

export const HealthcareProvider = ({ children }) => <>{children}</>;
