import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Report an Issue', path: '/report' },
    { name: 'Track Complaint', path: '/track' },
    { name: 'Explore Issues', path: '/explore' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Team', path: '/team' },
    { name: 'Admin Access', path: '/admin' }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container">
      <div className="h-16 w-full px-gutter-desktop max-w-[1600px] mx-auto flex items-center justify-between gap-space-md">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-space-lg">
          <Link to="/" className="flex items-center gap-space-sm group">
            <img
              src="/images/civiccare-symbol.svg"
              alt="CivicCare"
              className="h-8 w-8 object-contain"
            />
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight uppercase group-hover:text-primary transition-colors">
              CivicCare
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-space-xs">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                aria-current={isActive(link.path) ? 'page' : undefined}
                className={`px-space-sm py-space-xs rounded transition-colors text-label-md font-label-md ${
                  isActive(link.path)
                    ? 'bg-surface-container text-on-surface font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-space-sm">
          <Link
            to="/login"
            className="hidden sm:inline-flex items-center justify-center h-9 px-space-md bg-surface-container-low text-on-surface hover:bg-surface-container font-label-md text-label-md rounded transition-colors"
          >
            Login
          </Link>

          <Link
            to="/report"
            className="inline-flex items-center justify-center h-9 px-space-md bg-primary text-on-primary hover:bg-[#222222] font-label-md text-label-md rounded transition-colors tracking-wide shadow-sm"
          >
            Report a Problem
          </Link>

          <Link
            to="/citizen/complaints"
            title="Citizen Portal / My Complaints"
            className="w-8 h-8 rounded-full bg-primary hover:bg-[#222222] flex items-center justify-center ml-space-xs shrink-0 transition-transform hover:scale-105"
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">
              person
            </span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors ml-1"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-container-lowest border-b border-surface-container-high px-gutter-desktop py-space-md shadow-lg animate-fadeIn">
          <nav className="flex flex-col gap-space-xs">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-space-md py-space-sm rounded transition-colors text-label-md font-label-md flex items-center justify-between ${
                  isActive(link.path)
                    ? 'bg-surface-container text-on-surface font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                }`}
              >
                <span>{link.name}</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </Link>
            ))}

            <div className="pt-space-sm mt-space-xs border-t border-surface-container flex flex-col gap-space-sm">
              <Link
                to="/citizen/complaints"
                onClick={() => setMobileMenuOpen(false)}
                className="px-space-md py-space-sm rounded bg-surface-container-low text-on-surface font-label-md flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">account_circle</span>
                <span>Citizen Dashboard & My Complaints</span>
              </Link>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-space-md py-space-sm rounded bg-surface-container-lowest border border-outline-variant text-on-surface text-center font-label-md"
              >
                Portal Login (Citizen & Staff)
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
