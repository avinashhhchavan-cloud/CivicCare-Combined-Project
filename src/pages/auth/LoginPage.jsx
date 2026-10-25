import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../components/common/Button';

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get('role') === 'admin' ? 'admin' : 'citizen';

  const [role, setRole] = useState(defaultRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both identification email and security credentials.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/citizen/complaints');
      }
    }, 600);
  };

  const handleQuickDemo = (demoRole) => {
    setRole(demoRole);
    if (demoRole === 'admin') {
      setEmail('admin.dispatch@solapur.gov.in');
      setPassword('demo-admin-pass');
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate('/admin');
      }, 400);
    } else {
      setEmail('rohit.sharma@example.com');
      setPassword('demo-citizen-pass');
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate('/citizen/complaints');
      }, 400);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center py-space-xl px-gutter-mobile sm:px-gutter-desktop antialiased">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
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
            Access Grievance Telemetry
          </h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Solapur Municipal Corporation Citizen & Operations Sign-in
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="bg-surface-container-low p-1 rounded border border-surface-container flex mb-space-md">
          <button
            type="button"
            onClick={() => { setRole('citizen'); setError(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded transition-colors flex items-center justify-center gap-1.5 ${
              role === 'citizen'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">person</span>
            <span>Citizen Portal</span>
          </button>

          <button
            type="button"
            onClick={() => { setRole('admin'); setError(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded transition-colors flex items-center justify-center gap-1.5 ${
              role === 'admin'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
            <span>Municipal CAD Admin</span>
          </button>
        </div>

        {/* Login Card */}
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
                {role === 'admin' ? 'Municipal Officer ID / Email' : 'Email Address'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'admin' ? 'officer.cad@solapur.gov.in' : 'name@domain.com'}
                required
                className="w-full h-10 px-3 text-xs bg-surface border border-outline-variant rounded focus:outline-none focus:border-primary text-on-surface"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold uppercase font-label-sm text-on-surface-variant">
                  Security Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-on-surface-variant hover:text-on-surface hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full h-10 px-3 pr-10 text-xs bg-surface border border-outline-variant rounded focus:outline-none focus:border-primary text-on-surface"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                <span>Sign in to {role === 'admin' ? 'Municipal CAD' : 'Citizen Account'}</span>
              )}
            </Button>
          </form>

          {/* Quick Demo Instant-Access Buttons */}
          <div className="mt-space-lg pt-space-md border-t border-surface-container">
            <div className="text-center text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold mb-2">
              Instant Demonstration Access
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('citizen')}
                className="px-2 py-2 bg-surface-container text-xs font-semibold text-on-surface hover:bg-surface-container-high rounded border border-outline-variant transition-colors flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">person</span>
                <span>Demo Citizen</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="px-2 py-2 bg-surface-container text-xs font-semibold text-on-surface hover:bg-surface-container-high rounded border border-outline-variant transition-colors flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
                <span>Demo CAD Admin</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="text-center mt-space-md text-xs text-on-surface-variant">
          Don't have a verified citizen account?{' '}
          <Link to="/register" className="text-primary font-bold hover:underline">
            Register New Citizen
          </Link>
        </div>
      </div>
    </div>
  );
}
