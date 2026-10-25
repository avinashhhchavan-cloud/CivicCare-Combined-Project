import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low py-space-xl border-t border-surface-container">
      <div className="w-full max-w-[1600px] mx-auto px-gutter-desktop">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-space-lg mb-space-xl">
          {/* Brand & Platform Summary */}
          <div className="md:col-span-2 space-y-space-sm">
            <div className="flex items-center gap-space-xs">
              <img
                src="/images/civiccare-symbol.svg"
                alt="CivicCare"
                className="h-6 w-6 object-contain"
              />
              <span className="font-headline-sm text-headline-sm text-on-surface uppercase tracking-tight">
                CivicCare
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md leading-relaxed">
              Smart Public Complaint Management & Analytics Platform. High-efficiency reporting, transparent ticket tracking, and municipal triage performance intelligence for urban Indian jurisdictions.
            </p>
            <div className="flex items-center gap-space-md pt-space-xs text-on-surface-variant">
              <span className="font-label-sm text-label-sm text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Zero-Trust Civic Auditing
              </span>
              <span className="text-outline-variant font-light">•</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Solapur Metro Hub #04
              </span>
            </div>
          </div>

          {/* Platform Navigation */}
          <div>
            <h4 className="font-label-md text-label-md text-on-surface uppercase mb-space-sm tracking-wider font-bold">
              Platform
            </h4>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <Link to="/about" className="hover:text-on-surface transition-colors">
                  About CivicCare
                </Link>
              </li>
              <li>
                <Link to="/#how-it-works" className="hover:text-on-surface transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-on-surface transition-colors">
                  Community Issues Explorer
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-on-surface transition-colors">
                  Help Center & Ward Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Operations */}
          <div>
            <h4 className="font-label-md text-label-md text-on-surface uppercase mb-space-sm tracking-wider font-bold">
              Compliance & Legal
            </h4>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <Link to="/help#sla" className="hover:text-on-surface transition-colors">
                  Municipal SLA Charter
                </Link>
              </li>
              <li>
                <Link to="/help#privacy" className="hover:text-on-surface transition-colors">
                  Privacy Policy & Data Security
                </Link>
              </li>
              <li>
                <Link to="/help#terms" className="hover:text-on-surface transition-colors">
                  Citizen Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-on-surface transition-colors font-medium text-primary">
                  Municipal Officer Portal →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Metadata & Academic Project Pill */}
        <div className="pt-space-md border-t border-surface-container flex flex-col md:flex-row items-center justify-between gap-space-md">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            © 2025–2026 CivicCare Platform. All rights reserved.
          </p>
          <p className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-space-sm py-space-xs rounded text-center">
            CivicCare is an academic demonstration project (DBMS / EDA / FSD-1) and is not an official municipal service.
          </p>
        </div>
      </div>
    </footer>
  );
}
