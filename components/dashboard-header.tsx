'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Bell, User, LayoutDashboard, ShoppingCart, Package, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function DashboardHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const [unreadCount] = useState(3);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Sur desktop, le menu reste fermé par défaut
      if (!mobile) setMenuOpen(false);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tabs = [
    { key: 'dashboard', label: 'Tableau de bord', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { key: 'orders', label: 'Commandes', icon: <ShoppingCart size={20} />, path: '/dashboard/orders' },
    { key: 'products', label: 'Produits', icon: <Package size={20} />, path: '/dashboard/products' }
  ];

  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="flex items-center justify-between px-4 py-3 md:px-8 md:py-4">
          <div className="flex items-center">
            <button 
              className="text-gray-600 hover:text-blue-600 mr-4"
              onClick={toggleMenu}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 select-none">Tableau de bord</h1>
            </Link>
          </div>
          
         
        </div>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay pour mobile */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black z-30"
                onClick={toggleMenu}
              />
            )}

            <motion.aside 
              initial={{ x: isMobile ? '-100%' : 0 }}
              animate={{ x: 0 }}
              exit={{ x: isMobile ? '-100%' : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`fixed left-0 top-0 h-full bg-white shadow-lg flex flex-col z-40 mt-16 ${isMobile ? 'w-4/5' : 'w-64'}`}
            >
             
              <nav className="flex flex-col flex-grow mt-4 overflow-y-auto">
                {tabs.map(tab => (
                  <Link
                    key={tab.key}
                    href={tab.path}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-6 py-3 text-left font-semibold hover:bg-blue-50 transition ${
                      isActive(tab.path) ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </Link>
                ))}
              </nav>

              <div className="mt-auto p-6 border-t border-gray-200">
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full w-full hover:shadow-lg transition"
                >
                  <LogOut size={20} />
                  <span className="font-semibold">Déconnexion</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}