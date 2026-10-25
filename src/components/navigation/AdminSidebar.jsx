import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AdminSidebar({ isOpen, onClose }) {
  const location = useLocation();

  const links = [
    { name: 'Command Center', path: '/admin', icon: 'dashboard' },
    { name: 'Complaint Queue', path: '/admin/complaints', icon: 'assignment' },
    { name: 'Civic Analytics', path: '/admin/analytics', icon: 'analytics' },
    { name: 'Public Explorer', path: '/explore', icon: 'travel_explore' },
    { name: 'Public Portal', path: '/', icon: 'home' }
  ];

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-surface-container-lowest border-r border-surface-container flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Header */}
          <div className="h-16 px-space-md border-b border-surface-container flex items-center justify-between">
            <Link to="/" className="flex items-center gap-space-sm">
              <img
                src="/images/civiccare-symbol.svg"
                alt="CivicCare"
                className="h-7 w-7 object-contain"
              />
              <div>
                <span className="font-headline-sm text-sm text-on-surface uppercase tracking-tight font-bold block">
                  CivicCare CAD
                </span>
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider block">
                  Municipal Dispatcher
                </span>
              </div>
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1 text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Quick Node Status */}
          <div className="p-space-md bg-surface-container-low border-b border-surface-container">
            <div className="flex items-center justify-between font-label-sm text-[11px] text-on-surface-variant uppercase">
              <span>Jurisdiction:</span>
              <span className="text-on-surface font-semibold">Solapur Central</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-primary font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>CAD Live Node 04 Active</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-space-sm space-y-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={`flex items-center gap-space-sm px-space-md py-2.5 rounded font-label-md text-sm transition-colors ${
                  isActive(link.path)
                    ? 'bg-surface-container text-on-surface font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {link.icon}
                </span>
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer Area */}
        <div className="p-space-md border-t border-surface-container space-y-space-sm bg-surface-container-low/40">
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-label-sm text-xs text-on-surface font-bold truncate">
                Admin Dispatcher #14
              </p>
              <p className="font-body-sm text-[11px] text-on-surface-variant truncate">
                admin.cad@solapur.gov
              </p>
            </div>
          </div>

          <Link
            to="/login"
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-surface-container hover:bg-surface-container-high rounded text-xs font-semibold text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            <span>Switch Role / Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
