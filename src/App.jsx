import React, { useState } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';

// Common Layout & Overlay Components
import AnnouncementBar from './components/common/AnnouncementBar';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AnimatedSidebar from './components/sidebar/AnimatedSidebar';
import RoleSwitcherModal from './components/common/RoleSwitcherModal';
import ToastAlert from './components/common/ToastAlert';
import ScrollToTop from './components/common/ScrollToTop';
import MobileBottomNavbar from './components/common/MobileBottomNavbar';

// Dedicated Routing Architecture
import AppRoute from './routes/AppRoute';

// ✅ Helper Component to handle Layout Logic
function AppLayout() {
  const location = useLocation();
  
  // ✅ Check if current page is an Admin, Login, or Register page
  const isAuthOrAdminPage = 
    location.pathname.includes('admin-dashboard') || 
    location.pathname.includes('super-admin-dashboard') || 
    location.pathname.includes('delivery-dashboard') ||
    location.pathname.includes('login') || 
    location.pathname.includes('register');

  // Overlay States (Only needed for main website)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  return (
    <div className="d-flex flex-column min-vh-100" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      
      {/* ✅ Show Header/Footer ONLY if NOT on Admin/Auth pages */}
      {!isAuthOrAdminPage && (
        <>
          <AnnouncementBar onOpenRoleModal={() => setIsRoleModalOpen(true)} />
          <Header 
            onOpenSidebar={() => setIsSidebarOpen(true)}
            onOpenRoleModal={() => setIsRoleModalOpen(true)}
          />
          <AnimatedSidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)}
            onOpenRoleModal={() => setIsRoleModalOpen(true)}
          />
        </>
      )}

      {/* Main Application Routing */}
      <main className="flex-grow-1">
        <AppRoute />
      </main>

      {/* ✅ Show Footer & Bottom Nav ONLY if NOT on Admin/Auth pages */}
      {!isAuthOrAdminPage && (
        <>
          <RoleSwitcherModal 
            isOpen={isRoleModalOpen}
            onClose={() => setIsRoleModalOpen(false)}
          />
          <Footer />
          <MobileBottomNavbar />
        </>
      )}

      {/* Toast Alert can be global */}
      <ToastAlert />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppLayout />
    </BrowserRouter>
  );
}