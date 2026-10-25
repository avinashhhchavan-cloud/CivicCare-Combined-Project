import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] bg-surface flex flex-col items-center justify-center py-space-2xl px-gutter-mobile text-center antialiased">
      <div className="max-w-md mx-auto space-y-space-md">
        <div className="font-mono text-6xl font-bold tracking-tight text-primary">
          404
        </div>

        <div className="w-12 h-0.5 bg-outline-variant mx-auto my-space-sm" />

        <h1 className="text-xl font-bold font-headline-md text-on-surface">
          Civic Telemetry Endpoint Not Found
        </h1>

        <p className="text-xs text-on-surface-variant leading-relaxed">
          The requested municipal page or grievance reference could not be located on the Solapur Municipal Corporation network.
        </p>

        <div className="pt-space-md flex flex-wrap items-center justify-center gap-space-sm">
          <Link to="/">
            <Button variant="primary">
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>Return Home</span>
            </Button>
          </Link>

          <Link to="/track">
            <Button variant="outline">
              <span className="material-symbols-outlined text-[16px]">search</span>
              <span>Track Complaint</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
