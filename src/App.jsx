import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import ExploreIssuesPage from './pages/public/ExploreIssuesPage';
import AboutPage from './pages/public/AboutPage';
import HelpPage from './pages/public/HelpPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Citizen Pages
import ReportIssuePage from './pages/citizen/ReportIssuePage';
import TrackComplaintPage from './pages/citizen/TrackComplaintPage';
import MyComplaintsPage from './pages/citizen/MyComplaintsPage';
import CitizenProfilePage from './pages/citizen/CitizenProfilePage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminComplaintsPage from './pages/admin/AdminComplaintsPage';
import AdminComplaintDetailPage from './pages/admin/AdminComplaintDetailPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';

export default function App() {
  return (
    <Routes>
      {/* Public & Citizen Portal Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="report" element={<ReportIssuePage />} />
        <Route path="track" element={<TrackComplaintPage />} />
        <Route path="explore" element={<ExploreIssuesPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="citizen/complaints" element={<MyComplaintsPage />} />
        <Route path="citizen/profile" element={<CitizenProfilePage />} />
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Authentication Pages (Standalone minimal layout) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Municipal CAD Administrator Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="complaints" element={<AdminComplaintsPage />} />
        <Route path="complaints/:id" element={<AdminComplaintDetailPage />} />
        <Route path="analytics" element={<AdminAnalyticsPage />} />
      </Route>
    </Routes>
  );
}
