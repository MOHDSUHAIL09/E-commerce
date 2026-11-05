import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

// Pure Custom Hooks & Props Architecture (Zero React Context Providers)

// Common Layout & Overlay Components
import AnnouncementBar from './components/common/AnnouncementBar';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AnimatedSidebar from './components/sidebar/AnimatedSidebar';
import CompareBar from './components/common/CompareBar';
import RoleSwitcherModal from './components/common/RoleSwitcherModal';
import ToastAlert from './components/common/ToastAlert';
import ScrollToTop from './components/common/ScrollToTop';
import MobileBottomNavbar from './components/common/MobileBottomNavbar';

// Dedicated Routing Architecture
import AppRoute from './routes/AppRoute';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="d-flex flex-column min-vh-100" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
        
        {/* Top Announcement Bar */}
        <AnnouncementBar onOpenRoleModal={() => setIsRoleModalOpen(true)} />

        {/* Main Header & Navigation with Mega Menu */}
        <Header 
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onOpenRoleModal={() => setIsRoleModalOpen(true)}
        />

        {/* Animated Framer Motion Sidebar Drawer */}
        <AnimatedSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          onOpenRoleModal={() => setIsRoleModalOpen(true)}
        />

        {/* Main Application Routing */}
        <main className="flex-grow-1">
          <AppRoute />
        </main>

        {/* Sticky Comparison Bar when products are compared */}
        <CompareBar />

        {/* Role Switcher Modal (includes Customer, Pharmacist, Delivery, Store Admin, Super Admin) */}
        <RoleSwitcherModal 
          isOpen={isRoleModalOpen}
          onClose={() => setIsRoleModalOpen(false)}
        />

        {/* Action Feedback Toast */}
        <ToastAlert />

        {/* Complete Footer */}
        <Footer />

        {/* Mobile Bottom Navigation Bar (matches image_76bd4eb4) */}
        <MobileBottomNavbar />

      </div>
    </BrowserRouter>
  );
}
