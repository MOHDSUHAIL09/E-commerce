import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import HomePage from '../pages/Home/HomePage';
import ProductsPage from '../pages/Products/ProductsPage';
import ProductDetailsPage from '../pages/ProductDetails/ProductDetailsPage';
import CategoriesPage from '../pages/Categories/CategoriesPage';
import CategoryDetailPage from '../pages/Categories/CategoryDetailPage';
import CartPage from '../pages/Cart/CartPage';
import CheckoutPage from '../pages/Checkout/CheckoutPage';
import PrescriptionPage from '../pages/Prescription/PrescriptionPage';
import DoctorsPage from '../pages/Doctors/DoctorsPage';
import LabTestsPage from '../pages/LabTests/LabTestsPage';
import WishlistPage from '../pages/Wishlist/WishlistPage';
import CustomerProfile from '../pages/Profile/CustomerProfile';
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard';
import SuperAdminDashboard from '../pages/AdminDashboard/SuperAdminDashboard';
import DeliveryDashboard from '../pages/DeliveryDashboard/DeliveryDashboard';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';


export default function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/categories/:slug" element={<CategoryDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/prescription" element={<PrescriptionPage />} />
      <Route path="/prescriptions" element={<Navigate to="/prescription" replace />} />
      <Route path="/insurance" element={<CustomerProfile />} />
      <Route path="/doctors" element={<DoctorsPage />} />
      <Route path="/lab-tests" element={<LabTestsPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/Profile" element={<CustomerProfile />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/super-admin-dashboard" element={<SuperAdminDashboard />} />
      <Route path="/delivery-dashboard" element={<DeliveryDashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      
    </Routes>
  );
}
