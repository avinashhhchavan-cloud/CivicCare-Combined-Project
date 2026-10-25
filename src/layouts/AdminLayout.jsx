import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import AdminSidebar from '../components/navigation/AdminSidebar';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface antialiased flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Administrative Work Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Admin Header Bar */}
        <header className="h-16 bg-surface-container-lowest border-b border-surface-container px-gutter-desktop flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-space-md">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
            <div className="flex items-center gap-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant hidden sm:inline">
                Solapur Municipal CAD
              </span>
              <span className="text-outline-variant hidden sm:inline">/</span>
              <h1 className="font-headline-sm text-sm text-on-surface font-semibold">
                Operational Control Desk
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-space-sm">
            <div className="hidden sm:flex items-center gap-1.5 px-space-sm py-1 bg-surface-container rounded text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>Shift: Active (38 Field Crews)</span>
            </div>

            <Link
              to="/admin/complaints"
              className="inline-flex items-center gap-1 h-8 px-space-sm bg-primary text-on-primary hover:bg-[#222222] rounded text-xs font-semibold"
            >
              <span className="material-symbols-outlined text-[16px]">inbox</span>
              <span>Live Queue</span>
            </Link>

            <Link
              to="/"
              title="Return to Public Portal"
              className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded"
            >
              <span className="material-symbols-outlined text-[20px]">exit_to_app</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Outlet */}
        <main className="flex-1 p-space-md lg:p-space-xl max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>

        {/* Admin Footer */}
        <footer className="h-12 border-t border-surface-container px-gutter-desktop flex items-center justify-between text-xs text-on-surface-variant bg-surface-container-low">
          <span>Solapur City Municipal Complaint Triage Engine v4.19</span>
          <span className="bg-surface-container px-2 py-0.5 rounded">
            Academic Demonstration System (DBMS / EDA / FSD-1)
          </span>
        </footer>
      </div>
    </div>
  );
}
