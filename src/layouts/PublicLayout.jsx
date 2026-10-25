import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface font-sans text-on-surface antialiased">
      <Navbar />
      <main className="flex-1 w-full pt-16 bg-surface">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
