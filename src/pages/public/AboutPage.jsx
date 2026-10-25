import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-gutter-desktop py-space-xl">
      {/* Header */}
      <div className="mb-space-xl text-center max-w-3xl mx-auto">
        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
          Civic Precision • Municipal Operating System
        </span>
        <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mt-1 mb-space-sm">
          About the CivicCare Platform
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          CivicCare is a next-generation municipal grievance and urban infrastructure intelligence platform built to bridge the gap between citizens and municipal authorities in Solapur, Maharashtra.
        </p>
      </div>

      {/* Hero Banner Visual with custom Hero image */}
      <div className="w-full h-80 rounded-xl overflow-hidden shadow-md mb-space-xl relative border border-surface-container">
        <img
          src="/images/hero-city.webp"
          alt="Clean Indian City Boulevard"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-space-lg text-white">
          <div>
            <span className="px-2 py-0.5 bg-white/20 backdrop-blur rounded text-xs font-mono uppercase tracking-wider">
              Solapur Urban Renewal Initiative
            </span>
            <h2 className="text-2xl font-bold mt-1">Data-Driven Accountability for Modern Indian Cities</h2>
          </div>
        </div>
      </div>

      {/* 3 Core Design Principles */}
      <div className="mb-space-xl">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-space-md">
          Core Operating Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-surface-container">
            <div className="w-10 h-10 rounded bg-primary text-on-primary flex items-center justify-center font-bold mb-space-sm">
              01
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">
              Utilitarian Decisiveness
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Every interface primitive exists strictly to communicate operational state, priority, or action. Form strictly follows municipal consequence.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-surface-container">
            <div className="w-10 h-10 rounded bg-primary text-on-primary flex items-center justify-center font-bold mb-space-sm">
              02
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">
              Zero-Trust Civic Auditing
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Complaint lifecycles are immutable and logged. Tickets cannot be arbitrarily closed without on-site photographic proof and geo-coordinate sign-off.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-surface-container">
            <div className="w-10 h-10 rounded bg-primary text-on-primary flex items-center justify-center font-bold mb-space-sm">
              03
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">
              Data-Dense Legibility
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Aggressively monochromatic chrome highlights telemetry data, SLA countdowns, and spatial radar feeds to reduce operator fatigue.
            </p>
          </div>
        </div>
      </div>

      {/* Academic Project Context */}
      <div className="p-space-lg bg-surface-container-low rounded-xl border border-surface-container mb-space-xl">
        <div className="flex items-center gap-space-xs text-xs font-mono uppercase tracking-wider text-on-surface-variant font-bold mb-1">
          <span className="material-symbols-outlined text-[16px] text-primary">school</span>
          Academic Demonstration Project Notice
        </div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
          College Curriculum Implementation (DBMS • EDADV • FSD-1)
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-sm">
          CivicCare was engineered as a comprehensive full-stack and database management demonstration system. It models municipal service level agreements, relational data schemas for urban grievance tracking, and spatial dispatch routing for Solapur Municipal Corporation.
        </p>
        <div className="flex flex-wrap gap-space-sm">
          <Link
            to="/analytics"
            className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
          >
            Explore Grievance Analytics →
          </Link>
          <span className="text-outline-variant">•</span>
          <Link
            to="/track?ref=CC-2026-0841"
            className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
          >
            Inspect Sample Case Dossier →
          </Link>
        </div>
      </div>
    </div>
  );
}
