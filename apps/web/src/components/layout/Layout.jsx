/* ============================================================
   🌉 UNIBRIDGE - LAYOUT COMPONENT
   Main layout wrapper with header and content area
   ============================================================ */

import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-900 transition-colors duration-300">
      {/* Header Navigation */}
      <Header />

      {/* Main Content Area */}
      <main id="main-content" className="relative">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
