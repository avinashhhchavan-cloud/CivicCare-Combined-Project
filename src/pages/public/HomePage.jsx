import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, PLATFORM_STATS, INITIAL_COMPLAINTS } from '../../data/mockData';
import StatusBadge from '../../components/common/StatusBadge';
import StatCard from '../../components/common/StatCard';
import { ComplaintService } from '../../services/complaintService';

export default function HomePage() {
  const [activeMarker, setActiveMarker] = useState(1);
  const [complaints] = useState(() => ComplaintService.getComplaints().slice(0, 5));
  const stats = ComplaintService.getStats();

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full px-gutter-desktop max-w-[1600px] mx-auto pt-space-xl pb-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
          {/* Left Copy Column */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-space-md z-10">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xs bg-surface-container rounded font-label-sm text-label-sm uppercase tracking-wider text-on-surface">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              A Better Way to Improve Our Cities
            </div>

            {/* Headline */}
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
              Your City. Your Voice. Real Change.
            </h1>

            {/* Subtitle */}
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
              A transparent municipal complaint resolution platform. Report civic issues, monitor department workflows in real time, and analyze community trends.
            </p>

            {/* CTA Action Group */}
            <div className="flex flex-wrap items-center gap-space-sm pt-space-xs w-full sm:w-auto">
              <Link
                to="/report"
                className="w-full sm:w-auto inline-flex items-center justify-center h-11 px-space-lg bg-primary text-on-primary hover:bg-[#222222] font-label-lg text-label-lg rounded shadow-sm transition-all group tracking-wide"
              >
                Report a Problem
                <span className="material-symbols-outlined ml-space-xs text-[18px] group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </Link>
              <Link
                to="/track"
                className="w-full sm:w-auto inline-flex items-center justify-center h-11 px-space-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-lg text-label-lg rounded shadow-sm transition-all border border-surface-container"
              >
                <span className="material-symbols-outlined mr-space-xs text-[18px] text-on-surface-variant">
                  search
                </span>
                Track a Complaint
              </Link>
            </div>

            {/* Quick Telemetry Micro-Pill */}
            <div className="flex flex-wrap items-center gap-space-md pt-space-sm text-on-surface-variant">
              <div className="flex items-center gap-space-xs font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  verified_user
                </span>
                <span>Zero-Trust Civic Auditing</span>
              </div>
              <span className="text-outline-variant font-light">•</span>
              <div className="flex items-center gap-space-xs font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  bolt
                </span>
                <span>Real-time SMS & Web Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Visual Dashboard Showcase */}
          <div className="lg:col-span-6 relative mt-space-md lg:mt-0">
            {/* Dashboard Mock Card with Tonal Depth */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-md relative overflow-hidden border border-surface-container">
              {/* Mock Header Bar */}
              <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-surface-container">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-surface-container-highest" />
                  <span className="w-2.5 h-2.5 rounded-full bg-surface-container-highest" />
                  <span className="w-2.5 h-2.5 rounded-full bg-surface-container-highest" />
                  <span className="font-label-sm text-label-sm text-on-surface-variant ml-space-xs uppercase tracking-wider">
                    CIVIC-CAD v3.2 // LIVE FEED
                  </span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="inline-flex items-center px-space-xs py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold">
                    ZONE: SOLAPUR METRO
                  </span>
                </div>
              </div>

              {/* Interactive Monochromatic Geospatial & Incident Preview */}
              <div className="relative w-full h-[320px] bg-surface-container-low rounded flex items-center justify-center overflow-hidden">
                {/* Vector Grid Background Pattern */}
                <svg
                  className="absolute inset-0 w-full h-full text-surface-container-high opacity-70"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      height="32"
                      id="grid-pattern"
                      patternUnits="userSpaceOnUse"
                      width="32"
                    >
                      <path
                        d="M 32 0 L 0 0 0 32"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.8"
                      />
                    </pattern>
                  </defs>
                  <rect fill="url(#grid-pattern)" height="100%" width="100%" />
                  {/* Municipal Transit / Arteries Outline Simulation */}
                  <path
                    d="M -20,160 C 120,130 220,240 400,180 S 560,90 700,120"
                    stroke="currentColor"
                    strokeDasharray="4 2"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M 180,-10 C 220,120 300,180 340,340"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="280"
                    cy="190"
                    r="48"
                    stroke="currentColor"
                    strokeDasharray="2 3"
                    strokeWidth="1.2"
                  />
                </svg>

                {/* Incident Radar Marker 1 (Interactive) */}
                <div
                  className="absolute top-12 left-1/4 group cursor-pointer z-10"
                  onClick={() => setActiveMarker(1)}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-primary opacity-20" />
                    <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-primary text-on-primary text-[10px] font-bold">
                      1
                    </span>
                  </div>
                  <div className={`absolute left-8 -top-3 ${activeMarker === 1 ? 'flex' : 'hidden'} group-hover:flex flex-col bg-surface-container-lowest p-space-xs rounded shadow-lg min-w-[170px] z-20 border border-surface-container`}>
                    <span className="font-label-sm text-label-sm text-on-surface font-bold">
                      CC-2026-0841
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Pothole • In Progress
                    </span>
                    <Link
                      to="/track?ref=CC-2026-0841"
                      className="text-[11px] text-primary font-semibold hover:underline mt-1"
                    >
                      Inspect Live Dossier →
                    </Link>
                  </div>
                </div>

                {/* Incident Radar Marker 2 (Interactive) */}
                <div
                  className="absolute bottom-16 right-1/3 group cursor-pointer z-10"
                  onClick={() => setActiveMarker(2)}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-surface-container-highest text-on-surface font-bold text-[10px]">
                      2
                    </span>
                  </div>
                  <div className={`absolute -right-2 top-8 ${activeMarker === 2 ? 'flex' : 'hidden'} group-hover:flex flex-col bg-surface-container-lowest p-space-xs rounded shadow-lg min-w-[170px] z-20 border border-surface-container`}>
                    <span className="font-label-sm text-label-sm text-on-surface font-bold">
                      CC-2026-0839
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Sanitation • Resolved
                    </span>
                    <Link
                      to="/track?ref=CC-2026-0839"
                      className="text-[11px] text-primary font-semibold hover:underline mt-1"
                    >
                      View Resolution Proof →
                    </Link>
                  </div>
                </div>

                {/* Incident Radar Marker 3 */}
                <div
                  className="absolute top-20 right-16 group cursor-pointer z-10"
                  onClick={() => setActiveMarker(3)}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-surface-container-highest text-on-surface font-bold text-[10px]">
                      3
                    </span>
                  </div>
                  <div className={`absolute right-8 -top-2 ${activeMarker === 3 ? 'flex' : 'hidden'} group-hover:flex flex-col bg-surface-container-lowest p-space-xs rounded shadow-lg min-w-[170px] z-20 border border-surface-container`}>
                    <span className="font-label-sm text-label-sm text-on-surface font-bold">
                      CC-2026-0792
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Electrical • Under Review
                    </span>
                    <Link
                      to="/track?ref=CC-2026-0792"
                      className="text-[11px] text-primary font-semibold hover:underline mt-1"
                    >
                      Track Verification →
                    </Link>
                  </div>
                </div>

                {/* Overlaid Live Telemetry HUD */}
                <div className="absolute bottom-3 left-3 bg-surface-container-lowest/95 backdrop-blur px-space-sm py-space-xs rounded shadow-sm flex items-center gap-space-sm border border-surface-container">
                  <div className="flex items-center gap-space-xs">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="font-label-sm text-label-sm uppercase text-on-surface font-semibold">
                      Dispatcher Queue: ACTIVE
                    </span>
                  </div>
                  <span className="text-outline-variant">|</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                    LAT: 17.6599° N
                  </span>
                </div>

                <div className="absolute top-3 right-3 bg-surface-container-lowest/95 backdrop-blur px-space-sm py-space-xs rounded shadow-sm text-right border border-surface-container">
                  <div className="font-label-sm text-label-sm uppercase text-on-surface-variant">
                    Avg Triage Speed
                  </div>
                  <div className="font-tabular-stat text-headline-sm text-on-surface font-bold">
                    {stats.triageSpeedMins}m
                  </div>
                </div>
              </div>

              {/* Bottom Micro Stats Stream */}
              <div className="grid grid-cols-3 gap-space-xs pt-space-sm mt-space-xs text-center">
                <div className="p-space-xs bg-surface-container rounded">
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                    Current Shift
                  </p>
                  <p className="font-label-md text-label-md text-on-surface font-bold mt-0.5">
                    {stats.activeFieldCrews} Field Crews
                  </p>
                </div>
                <div className="p-space-xs bg-surface-container rounded">
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                    Clearance SLA
                  </p>
                  <p className="font-label-md text-label-md text-on-surface font-bold mt-0.5">
                    {stats.slaCompliancePercent}% On-Target
                  </p>
                </div>
                <div className="p-space-xs bg-surface-container rounded">
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                    Audited By
                  </p>
                  <p className="font-label-md text-label-md text-on-surface font-bold mt-0.5">
                    Citizens & Depts
                  </p>
                </div>
              </div>
            </div>

            {/* Layered Floating Highlight Card (Asymmetric Layout Accent) */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-surface-container-lowest p-space-sm rounded-xl shadow-lg items-center gap-space-sm max-w-xs border border-surface-container">
              <div className="w-10 h-10 rounded bg-primary text-on-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
              </div>
              <div>
                <div className="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider font-semibold">
                  Recent Resolution
                </div>
                <div className="font-label-md text-label-md text-on-surface font-semibold truncate">
                  {stats.recentResolution.title}
                </div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">
                  {stats.recentResolution.time}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Statistics Metric Ribbon */}
      <section className="w-full bg-surface-container-low py-space-xl border-y border-surface-container">
        <div className="w-full max-w-[1600px] mx-auto px-gutter-desktop">
          {/* Section Meta Tag */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-space-md gap-space-sm">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                Operational Analytics Overview
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                Civic Performance Indicators
              </h2>
            </div>
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xs bg-surface-container-highest rounded text-on-surface font-label-sm text-label-sm uppercase tracking-wide self-start sm:self-auto">
              <span className="material-symbols-outlined text-[14px]">info</span>
              Sample Demonstration Data (Solapur)
            </div>
          </div>

          {/* High-Density Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            <StatCard
              label="Total Complaints"
              value={stats.totalComplaints.toLocaleString()}
              icon="inbox"
              subtitle={
                <>
                  <span className="font-semibold text-on-surface">100%</span>
                  <span>logged on municipal ledger</span>
                </>
              }
              progress={100}
            />

            <StatCard
              label="Complaints Resolved"
              value={stats.resolvedComplaints.toLocaleString()}
              icon="task_alt"
              subtitle={
                <>
                  <span className="font-semibold text-on-surface">{stats.resolutionRatePercent}%</span>
                  <span>verified civic closure rate</span>
                </>
              }
              progress={stats.resolutionRatePercent}
            />

            <StatCard
              label="Currently In Progress"
              value={stats.inProgressComplaints.toLocaleString()}
              icon="pending_actions"
              subtitle={
                <>
                  <span className="font-semibold text-on-surface">12.7%</span>
                  <span>active field crew dispatch</span>
                </>
              }
              progress={12.7}
              progressColor="bg-on-surface-variant"
            />

            <StatCard
              label="Avg Resolution Time"
              value={`${stats.avgResolutionHours} Hrs`}
              icon="schedule"
              subtitle={
                <>
                  <span className="font-semibold text-on-surface">-4.2h</span>
                  <span>improvement from last month</span>
                </>
              }
              progress={70}
            />
          </div>
        </div>
      </section>

      {/* How It Works (4 Structured Steps) */}
      <section id="how-it-works" className="w-full py-space-xl px-gutter-desktop max-w-[1600px] mx-auto">
        <div className="mb-space-lg">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
            Streamlined Municipal Lifecycle
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
            How CivicCare Operates
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-space-xs">
            An end-to-end transparent process connecting citizen reports directly with municipal field teams without administrative red tape.
          </p>
        </div>

        {/* 4-Step Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* Step 01 */}
          <div className="bg-surface-container-lowest p-space-md rounded shadow-sm flex flex-col justify-between group hover:bg-surface-container-low transition-colors border border-surface-container">
            <div>
              <div className="flex items-center justify-between mb-space-md">
                <span className="font-tabular-stat text-headline-sm text-on-surface font-mono">01</span>
                <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-on-surface group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-[18px]">add_location_alt</span>
                </div>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Report an Issue</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Pin exact coordinates on an interactive map, attach high-resolution photo evidence, and categorize the urgency.
              </p>
            </div>
            <div className="pt-space-md mt-space-md border-t border-surface-container/60">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Channel: Mobile & Web CAD</span>
            </div>
          </div>

          {/* Step 02 */}
          <div className="bg-surface-container-lowest p-space-md rounded shadow-sm flex flex-col justify-between group hover:bg-surface-container-low transition-colors border border-surface-container">
            <div>
              <div className="flex items-center justify-between mb-space-md">
                <span className="font-tabular-stat text-headline-sm text-on-surface font-mono">02</span>
                <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-on-surface group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-[18px]">alt_route</span>
                </div>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Department Assignment</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Incident is automatically parsed and dispatched directly to the municipal authority responsible for that ward zone.
              </p>
            </div>
            <div className="pt-space-md mt-space-md border-t border-surface-container/60">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Engine: Auto-Triage Router</span>
            </div>
          </div>

          {/* Step 03 */}
          <div className="bg-surface-container-lowest p-space-md rounded shadow-sm flex flex-col justify-between group hover:bg-surface-container-low transition-colors border border-surface-container">
            <div>
              <div className="flex items-center justify-between mb-space-md">
                <span className="font-tabular-stat text-headline-sm text-on-surface font-mono">03</span>
                <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-on-surface group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-[18px]">timeline</span>
                </div>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Transparent Tracking</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Track status progression through stage changes: Acknowledged, Crew Dispatched, Work in Progress, with zero opacity.
              </p>
            </div>
            <div className="pt-space-md mt-space-md border-t border-surface-container/60">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Telemetry: Real-Time Webhooks</span>
            </div>
          </div>

          {/* Step 04 */}
          <div className="bg-surface-container-lowest p-space-md rounded shadow-sm flex flex-col justify-between group hover:bg-surface-container-low transition-colors border border-surface-container">
            <div>
              <div className="flex items-center justify-between mb-space-md">
                <span className="font-tabular-stat text-headline-sm text-on-surface font-mono">04</span>
                <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-on-surface group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </div>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Verified Resolution</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Before ticket closure, inspection teams upload proof of completion, complemented by citizen satisfaction sign-off.
              </p>
            </div>
            <div className="pt-space-md mt-space-md border-t border-surface-container/60">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Protocol: Public Consensus</span>
            </div>
          </div>
        </div>
      </section>

      {/* Common Issue Categories Grid */}
      <section className="w-full bg-surface-container-low py-space-xl border-t border-surface-container">
        <div className="w-full max-w-[1600px] mx-auto px-gutter-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                Classified Problem Vectors
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
                Common Issue Categories
              </h2>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md mt-space-xs md:mt-0">
              Targeted dispatch units maintain dedicated equipment queues for rapid localized resolution across all wards.
            </p>
          </div>

          {/* Categories 6-Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/report?category=${cat.id}`}
                className="bg-surface-container-lowest p-space-md rounded shadow-sm hover:shadow-md transition-all flex flex-col justify-between group border border-surface-container overflow-hidden"
              >
                <div className="flex items-start gap-space-md mb-space-sm">
                  <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined text-[24px]">
                      {cat.icon}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-normal">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-space-sm border-t border-surface-container/60 flex items-center justify-between">
                  <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">
                    Median SLA: {cat.sla}
                  </span>
                  <span className="text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform inline-flex items-center">
                    Report Issue →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Public Complaints Feed */}
      <section className="w-full py-space-xl px-gutter-desktop max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm mb-space-md">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
              Public Verification Stream
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Recent Public Complaints
            </h2>
          </div>
          <div className="flex items-center gap-space-xs">
            <Link
              to="/explore"
              className="inline-flex items-center gap-space-xs px-space-sm py-space-xs bg-surface-container hover:bg-surface-container-high rounded text-on-surface font-label-md text-label-md transition-colors"
            >
              <span>View All Incidents</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Incident Table Container */}
        <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-surface-container">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container text-on-surface-variant font-label-md text-label-md uppercase tracking-wider border-b border-surface-container">
                  <th className="py-space-sm px-space-md">Incident ID</th>
                  <th className="py-space-sm px-space-md">Description</th>
                  <th className="py-space-sm px-space-md">Category</th>
                  <th className="py-space-sm px-space-md">Ward / Location</th>
                  <th className="py-space-sm px-space-md">Reported</th>
                  <th className="py-space-sm px-space-md text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container text-body-md text-on-surface font-body-md">
                {complaints.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-surface-container-low transition-colors group"
                  >
                    <td className="py-space-md px-space-md font-mono font-bold text-on-surface whitespace-nowrap">
                      <Link
                        to={`/track?ref=${item.ref}`}
                        className="hover:underline flex items-center gap-space-xs text-primary"
                      >
                        <span>{item.ref}</span>
                        <span className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 transition-opacity">
                          open_in_new
                        </span>
                      </Link>
                    </td>
                    <td className="py-space-md px-space-md font-medium text-on-surface">
                      <div className="max-w-md truncate">{item.title}</div>
                    </td>
                    <td className="py-space-md px-space-md whitespace-nowrap text-on-surface-variant">
                      {item.category}
                    </td>
                    <td className="py-space-md px-space-md whitespace-nowrap text-on-surface-variant">
                      {item.ward}
                    </td>
                    <td className="py-space-md px-space-md whitespace-nowrap text-on-surface-variant font-mono text-xs">
                      {item.dateFiled}
                    </td>
                    <td className="py-space-md px-space-md text-right whitespace-nowrap">
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
