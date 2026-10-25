import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 600);
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
            Password Recovery
          </h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Generate an authentication reset link for your municipal account
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface-container-lowest border border-surface-container rounded p-space-lg shadow-sm">
          {sent ? (
            <div className="text-center space-y-space-md">
              <div className="w-12 h-12 rounded-full bg-green-50 text-green-700 flex items-center justify-center mx-auto border border-green-200">
                <span className="material-symbols-outlined text-[24px]">mark_email_read</span>
              </div>
              <h2 className="text-base font-bold text-on-surface">
                Recovery Instructions Dispatched
              </h2>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                If an account exists under <strong className="text-on-surface">{email}</strong>, a secure password reset token has been issued with 15-minute validity.
              </p>
              <div className="pt-space-sm">
                <Link to="/login">
                  <Button variant="primary" className="w-full justify-center">
                    Return to Login
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-space-md">
              <div>
                <label className="block text-xs font-semibold uppercase font-label-sm text-on-surface-variant mb-1">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  required
                  className="w-full h-10 px-3 text-xs bg-surface border border-outline-variant rounded focus:outline-none focus:border-primary text-on-surface"
                />
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
                    <span>Transmitting recovery token...</span>
                  </div>
                ) : (
                  <span>Send Recovery Instructions</span>
                )}
              </Button>
            </form>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="text-center mt-space-md text-xs text-on-surface-variant">
          Remembered your credentials?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
