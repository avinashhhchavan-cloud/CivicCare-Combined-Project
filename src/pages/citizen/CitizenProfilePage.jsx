import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ComplaintService } from '../../services/complaintService';
import { MUNICIPAL_WARDS } from '../../data/mockData';
import Button from '../../components/common/Button';

export default function CitizenProfilePage() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    wardId: 'ward_14_central',
    smsAlerts: true,
    emailAlerts: true,
    whatsappAlerts: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    loadUserData();
  }, []);

  const loadUserData = () => {
    const u = ComplaintService.getUserProfile();
    const notifs = ComplaintService.getNotifications();
    setUser(u);
    setNotifications(notifs);
    setEditForm({
      name: u.name || 'Rohit Sharma',
      email: u.email || 'rohit.sharma@example.com',
      phone: u.phone || '+91 98220 12345',
      wardId: u.wardId || 'ward_14_central',
      smsAlerts: true,
      emailAlerts: true,
      whatsappAlerts: true,
    });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = ComplaintService.updateUserProfile({
      ...user,
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone,
      ward: MUNICIPAL_WARDS.find(w => w.id === editForm.wardId)?.name || user.ward,
      wardId: editForm.wardId,
    });
    setUser(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleMarkAllRead = () => {
    const updated = ComplaintService.markAllNotificationsRead();
    setNotifications(updated);
  };

  const handleMarkSingleRead = (id) => {
    const updated = ComplaintService.markNotificationRead(id);
    setNotifications(updated);
  };

  if (!user) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface antialiased py-space-xl">
      <div className="max-w-[1280px] mx-auto px-gutter-mobile md:px-gutter-desktop">
        {/* Header Breadcrumbs */}
        <div className="flex items-center gap-space-xs text-xs text-on-surface-variant mb-space-sm">
          <Link to="/" className="hover:text-on-surface">Home</Link>
          <span>/</span>
          <span className="text-on-surface font-semibold">Citizen Portal</span>
          <span>/</span>
          <span>Profile & Settings</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-xl">
          <div>
            <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
              Citizen Account & Telemetry Center
            </h1>
            <p className="font-body-md text-on-surface-variant mt-1 text-sm">
              Manage your verified municipal registration, dispatch notifications, and Solapur administrative ward binding.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-xs font-semibold">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Aadhaar Verified Citizen</span>
            </span>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-xl">
          {/* Left Column: Profile Card & Settings Form */}
          <div className="lg:col-span-2 space-y-space-lg">
            {/* Citizen Identity Card */}
            <div className="bg-surface-container-lowest border border-surface-container rounded p-space-lg shadow-xs">
              <div className="flex items-center gap-space-md pb-space-md border-b border-surface-container">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center font-bold text-xl text-on-surface border border-outline-variant">
                  RS
                </div>
                <div>
                  <h2 className="text-lg font-bold text-on-surface">{user.name}</h2>
                  <div className="text-xs text-on-surface-variant flex items-center gap-2 mt-0.5">
                    <span>{user.email}</span>
                    <span>•</span>
                    <span>{user.phone}</span>
                  </div>
                  <div className="text-xs text-on-surface-variant mt-1">
                    Registered Ward: <strong className="text-on-surface">{user.ward}</strong> (Citizen ID: <span className="font-mono">{user.citizenId}</span>)
                  </div>
                </div>
              </div>

              {savedSuccess && (
                <div className="mt-space-md p-space-sm bg-green-50 border border-green-200 text-green-800 rounded text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>Citizen profile settings updated successfully!</span>
                </div>
              )}

              {/* Form to update info */}
              <form onSubmit={handleSaveProfile} className="mt-space-lg space-y-space-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase font-label-sm">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      required
                      className="w-full h-10 px-3 text-xs bg-surface border border-outline-variant rounded focus:outline-none focus:border-primary text-on-surface"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase font-label-sm">
                      Primary Contact Email
                    </label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      required
                      className="w-full h-10 px-3 text-xs bg-surface border border-outline-variant rounded focus:outline-none focus:border-primary text-on-surface"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase font-label-sm">
                      Mobile Number (for SMS Dispatches)
                    </label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      required
                      className="w-full h-10 px-3 text-xs bg-surface border border-outline-variant rounded focus:outline-none focus:border-primary text-on-surface"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase font-label-sm">
                      Default Municipal Ward
                    </label>
                    <select
                      value={editForm.wardId}
                      onChange={(e) => setEditForm({ ...editForm, wardId: e.target.value })}
                      className="w-full h-10 px-3 text-xs bg-surface border border-outline-variant rounded focus:outline-none focus:border-primary text-on-surface"
                    >
                      {MUNICIPAL_WARDS.map(w => (
                        <option key={w.id} value={w.id}>{w.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Communication channels */}
                <div className="pt-space-md border-t border-surface-container">
                  <h3 className="text-xs uppercase font-label-sm font-semibold text-on-surface mb-space-sm">
                    Municipal Notification Channels
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-space-sm cursor-pointer text-xs text-on-surface">
                      <input
                        type="checkbox"
                        checked={editForm.smsAlerts}
                        onChange={(e) => setEditForm({ ...editForm, smsAlerts: e.target.checked })}
                        className="rounded border-outline-variant text-primary focus:ring-0"
                      />
                      <span>SMS Alerts on status transitions (Acknowledge, Crew Dispatched, Resolved)</span>
                    </label>

                    <label className="flex items-center gap-space-sm cursor-pointer text-xs text-on-surface">
                      <input
                        type="checkbox"
                        checked={editForm.emailAlerts}
                        onChange={(e) => setEditForm({ ...editForm, emailAlerts: e.target.checked })}
                        className="rounded border-outline-variant text-primary focus:ring-0"
                      />
                      <span>Email Dossier & Resolution Completion Certificates</span>
                    </label>

                    <label className="flex items-center gap-space-sm cursor-pointer text-xs text-on-surface">
                      <input
                        type="checkbox"
                        checked={editForm.whatsappAlerts}
                        onChange={(e) => setEditForm({ ...editForm, whatsappAlerts: e.target.checked })}
                        className="rounded border-outline-variant text-primary focus:ring-0"
                      />
                      <span>WhatsApp Municipal Updates & Ward Maintenance Alerts</span>
                    </label>
                  </div>
                </div>

                <div className="pt-space-sm">
                  <Button type="submit" variant="primary">
                    <span className="material-symbols-outlined text-[18px]">save</span>
                    <span>Save Account Settings</span>
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: In-App Notifications Feed */}
          <div className="space-y-space-lg">
            <div className="bg-surface-container-lowest border border-surface-container rounded p-space-md shadow-xs">
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-container mb-space-md">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">notifications</span>
                  <h2 className="text-sm font-bold text-on-surface uppercase tracking-wider font-label-sm">
                    Municipal Notifications
                  </h2>
                  {unreadCount > 0 && (
                    <span className="bg-primary text-on-primary text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                      {unreadCount} new
                    </span>
                  )}
                </div>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={handleMarkAllRead}
                    className="text-xs text-on-surface-variant hover:text-on-surface font-semibold underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {notifications.length === 0 ? (
                <div className="py-space-xl text-center text-on-surface-variant text-xs">
                  No notifications recorded.
                </div>
              ) : (
                <div className="space-y-space-sm max-h-[500px] overflow-y-auto pr-1">
                  {notifications.map(notif => (
                    <div
                      key={notif.id}
                      onClick={() => !notif.read && handleMarkSingleRead(notif.id)}
                      className={`p-space-sm rounded border transition-colors cursor-pointer text-xs ${
                        notif.read
                          ? 'bg-surface border-surface-container text-on-surface-variant'
                          : 'bg-surface-container-low border-primary/20 text-on-surface font-medium'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[10px] font-bold bg-surface-container px-1.5 py-0.5 rounded text-on-surface">
                          {notif.complaintRef || notif.complaintId}
                        </span>
                        <span className="text-[10px] text-on-surface-variant">
                          {notif.time}
                        </span>
                      </div>
                      <p className="text-xs">{notif.text || notif.message}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <Link
                          to={`/track?ref=${notif.complaintRef || notif.complaintId}`}
                          className="text-[11px] text-primary hover:underline font-semibold flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Inspect Telemetry</span>
                          <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                        </Link>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-primary" title="Unread" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Municipal Links */}
            <div className="bg-surface-container-low border border-surface-container rounded p-space-md text-xs text-on-surface-variant space-y-2">
              <div className="font-bold text-on-surface uppercase font-label-sm">
                Solapur Citizen Rights
              </div>
              <p>
                Under the Maharashtra Right to Public Services Act (RTSA), civic grievances must be acknowledged within 24 hours and addressed within stipulated SLA windows.
              </p>
              <Link to="/help" className="text-primary font-semibold hover:underline block pt-1">
                View RTSA Grievance Timelines & Ward Contacts →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
