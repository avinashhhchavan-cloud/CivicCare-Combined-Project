import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MUNICIPAL_WARDS } from '../../data/mockData';
import { ComplaintService } from '../../services/complaintService';
import Button from '../../components/common/Button';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    wardId: 'ward_14_central',
    password: '',
    confirmPassword: '',
    agreeAadhaar: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Password and confirmation password do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Save profile to local service
      ComplaintService.updateUserProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        wardId: formData.wardId,
        ward: MUNICIPAL_WARDS.find(w => w.id === formData.wardId)?.name || 'Central Ward 14',
      });
      navigate('/citizen/complaints');
    }, 700);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center py-space-xl px-gutter-mobile sm:px-gutter-desktop antialiased">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        {/* Brand Header */}
        <div className="text-center mb-space-lg">
          <Link to="/" className="inline-flex items-center gap-2 mb-space-sm">
            <img
              src="/assets/civiccare-symbol.svg"
              alt="CivicCare Symbol"
              className="w-8 h-8"
              onError={(e) => {
                e.currentTarget.src = '/civiccare-symbol.svg';
              }}
            />
            <span className="font-bold text-xl tracking-tight text-on-surface font-headline-md">
              CIVICCARE
            </span>
          </Link>
          <h1 className="text-xl font-bold text-on-surface font-headline-sm">
            Register Citizen Account
          </h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Connect your residence to Solapur Municipal Corporation civic grievance network
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-surface-container-lowest border border-surface-container rounded p-space-lg shadow-sm">
          {error && (
            <div className="mb-space-md p-space-sm bg-red-50 border border-red-200 text-red-800 rounded text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">error</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-space-md">
            <div>
              <label className="block text-xs font-semibold uppercase font-label-sm text-on-surface-variant mb-1">
                Full Legal Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Anand Deshmukh"
                required
                className="w-full h-10 px-3 text-xs bg-surface border border-outline-variant rounded focus:outline-none focus:border-primary text-on-surface"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div>
                <label className="block text-xs font-semibold uppercase font-label-sm text-on-surface-variant mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="anand@example.com"
                  required
                  className="w-full h-10 px-3 text-xs bg-surface border border-outline-variant rounded focus:outline-none focus:border-primary text-on-surface"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase font-label-sm text-on-surface-variant mb-1">
                  Mobile Number (+91)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98220 98765"
                  required
                  className="w-full h-10 px-3 text-xs bg-surface border border-outline-variant rounded focus:outline-none focus:border-primary text-on-surface"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase font-label-sm text-on-surface-variant mb-1">
                Residential Ward Binding
              </label>
              <select
                value={formData.wardId}
                onChange={(e) => setFormData({ ...formData, wardId: e.target.value })}
                className="w-full h-10 px-3 text-xs bg-surface border border-outline-variant rounded focus:outline-none focus:border-primary text-on-surface"
              >
                {MUNICIPAL_WARDS.map(w => (
                  <option key={w.id} value={w.id}>
                    {w.name} — {w.zone}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div>
                <label className="block text-xs font-semibold uppercase font-label-sm text-on-surface-variant mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="At least 6 characters"
                  required
                  className="w-full h-10 px-3 text-xs bg-surface border border-outline-variant rounded focus:outline-none focus:border-primary text-on-surface"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase font-label-sm text-on-surface-variant mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Repeat password"
                  required
                  className="w-full h-10 px-3 text-xs bg-surface border border-outline-variant rounded focus:outline-none focus:border-primary text-on-surface"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2 cursor-pointer text-xs text-on-surface-variant">
                <input
                  type="checkbox"
                  checked={formData.agreeAadhaar}
                  onChange={(e) => setFormData({ ...formData, agreeAadhaar: e.target.checked })}
                  required
                  className="rounded border-outline-variant text-primary focus:ring-0 mt-0.5"
                />
                <span>
                  I declare that my residency is within Solapur Municipal Corporation boundaries and agree to RTSA civic grievance guidelines.
                </span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center mt-2"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Registering Citizen Profile...</span>
                </div>
              ) : (
                <span>Complete Citizen Registration</span>
              )}
            </Button>
          </form>
        </div>

        {/* Footer Navigation */}
        <div className="text-center mt-space-md text-xs text-on-surface-variant">
          Already registered?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Sign In to Existing Account
          </Link>
        </div>
      </div>
    </div>
  );
}
