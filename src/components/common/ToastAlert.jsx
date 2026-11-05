import React from 'react';
import { useCart } from '../../context/CartContext';
import { FaCheckCircle } from 'react-icons/fa';

export default function ToastAlert() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div
      className="position-fixed bottom-0 end-0 m-3 bg-dark text-white p-3 rounded-3 shadow-lg d-flex align-items-center gap-2 z-3"
      style={{ zIndex: 1120, fontSize: '13px', borderLeft: '4px solid #159B64' }}
    >
      <FaCheckCircle color="#159B64" size={16} />
      <span>{toastMessage}</span>
    </div>
  );
}
