import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ComplaintService } from '../../services/complaintService';
import StatusBadge from '../../components/common/StatusBadge';

export default function TrackComplaintPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialRef = searchParams.get('ref') || 'CC-2026-0841';

  const [searchInput, setSearchInput] = useState(initialRef);
  const [activeComplaint, setActiveComplaint] = useState(() =>
    ComplaintService.getComplaintById(initialRef) || ComplaintService.getComplaints()[0]
  );
  const [notFoundQuery, setNotFoundQuery] = useState('');

  // Modals
  const [smsModalOpen, setSmsModalOpen] = useState(false);
  const [smsPhone, setSmsPhone] = useState('+91 98220 12345');
  const [escalationModalOpen, setEscalationModalOpen] = useState(false);
  const [escalationReason, setEscalationReason] = useState('SLA breach threshold reached without on-site asphalt repair.');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const urlRef = searchParams.get('ref');
    if (urlRef) {
      handleSearch(urlRef);
    }
  }, [searchParams]);

  const handleSearch = (refToFind) => {
    const query = (refToFind || searchInput).trim().toUpperCase();
    if (!query) return;

    setNotFoundQuery('');
    const found = ComplaintService.getComplaintById(query);
    if (found) {
      setActiveComplaint(found);
      setSearchInput(found.ref);
      setSearchParams({ ref: found.ref });
    } else {
      setNotFoundQuery(query);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleDownloadPDF = () => {
    showToast(`Generating certified PDF inspection audit dossier for ${activeComplaint.ref}...`);
  };

  const handleSubscribeSms = (e) => {
    e.preventDefault();
    setSmsModalOpen(false);
    showToast(`Subscribed! Real-time SMS dispatches enabled for ${smsPhone}`);
  };

  const handleEscalate = (e) => {
    e.preventDefault();
    setEscalationModalOpen(false);
    showToast(`Priority Grievance Escalation logged directly with Ward Executive Magistrate.`);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Operational Banner / Breadcrumb Area */}
      <section className="w-full bg-surface-container-low py-space-xl border-b border-surface-container">
        <div className="w-full max-w-[1600px] mx-auto px-gutter-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
            <div className="space-y-space-xs">
              <div className="inline-flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                <span>Municipal Service Registry</span>
                <span className="text-outline">/</span>
                <span>Citizen Portal</span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                Track Your Complaint
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                Enter your unique complaint reference number to view real-time department updates, field inspection notes, and resolution status.
              </p>
            </div>
            <div className="flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-space-sm rounded-lg shadow-sm border border-surface-container">
              <span className="material-symbols-outlined text-primary text-[20px]">
                verified_user
              </span>
              <div className="text-left">
                <p className="font-label-sm text-label-sm text-on-surface uppercase font-bold">
                  Live Sync Active
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Central Ward Database v4.19
                </p>
              </div>
            </div>
          </div>

          {/* Prominent Search Console */}
          <div className="bg-surface-container-lowest p-space-md md:p-space-lg rounded-xl shadow-md border border-surface-container">
            <form
              className="flex flex-col lg:flex-row items-stretch gap-space-sm"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(searchInput);
              }}
            >
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 pl-space-md flex items-center pointer-events-none text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </span>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="e.g. CC-2026-0841"
                  className="w-full h-12 pl-11 pr-space-md font-headline-sm text-headline-sm text-on-surface bg-surface-container-low rounded-lg focus:outline-none focus:bg-surface-container-lowest border border-surface-container transition-all"
                />
              </div>
              <button
                type="submit"
                className="h-12 px-space-xl bg-primary text-on-primary font-label-lg text-label-lg hover:bg-[#222222] rounded-lg transition-colors flex items-center justify-center gap-space-xs tracking-wide shrink-0 font-semibold shadow-sm"
              >
                <span>Track Complaint</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </form>

            {/* Quick Select Demo Chips */}
            <div className="mt-space-md pt-space-md flex flex-wrap items-center gap-space-sm bg-surface-container-low/50 -mx-space-md -mb-space-md p-space-md rounded-b-lg border-t border-surface-container">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                Quick Presets:
              </span>
              <button
                type="button"
                onClick={() => handleSearch('CC-2026-0841')}
                className={`px-space-sm py-1 rounded text-on-surface transition-all flex items-center gap-space-xs shadow-xs font-label-sm text-label-sm border ${
                  activeComplaint?.ref === 'CC-2026-0841'
                    ? 'bg-surface-container border-primary font-bold'
                    : 'bg-surface-container-lowest border-surface-container hover:bg-surface-container'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span>CC-2026-0841 (In Progress)</span>
              </button>
              <button
                type="button"
                onClick={() => handleSearch('CC-2026-0839')}
                className={`px-space-sm py-1 rounded text-on-surface transition-all flex items-center gap-space-xs shadow-xs font-label-sm text-label-sm border ${
                  activeComplaint?.ref === 'CC-2026-0839'
                    ? 'bg-surface-container border-primary font-bold'
                    : 'bg-surface-container-lowest border-surface-container hover:bg-surface-container'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>CC-2026-0839 (Resolved)</span>
              </button>
              <button
                type="button"
                onClick={() => handleSearch('CC-2026-0792')}
                className={`px-space-sm py-1 rounded text-on-surface transition-all flex items-center gap-space-xs shadow-xs font-label-sm text-label-sm border ${
                  activeComplaint?.ref === 'CC-2026-0792'
                    ? 'bg-surface-container border-primary font-bold'
                    : 'bg-surface-container-lowest border-surface-container hover:bg-surface-container'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container" />
                <span>CC-2026-0792 (Under Review)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tracking Workspace */}
      <div className="w-full max-w-[1600px] mx-auto px-gutter-desktop py-space-xl">
        {notFoundQuery ? (
          <div className="p-space-xl bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container text-center flex flex-col items-center">
            <span className="material-symbols-outlined text-[48px] text-error mb-2">
              search_off
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              No Record Found for "{notFoundQuery}"
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-1 mb-space-md">
              The entered grievance reference was not found in the demonstration database. Please check the reference code or choose a preset above.
            </p>
            <div className="flex gap-space-sm">
              <button
                type="button"
                onClick={() => handleSearch('CC-2026-0841')}
                className="px-space-md py-2 bg-primary text-on-primary rounded text-sm font-semibold"
              >
                Load Demo Incident CC-2026-0841
              </button>
              <Link
                to="/report"
                className="px-space-md py-2 bg-surface-container hover:bg-surface-container-high rounded text-sm font-semibold text-on-surface"
              >
                Report a New Issue
              </Link>
            </div>
          </div>
        ) : activeComplaint ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            {/* Primary Case Overview & Stepper (8 cols) */}
            <div className="lg:col-span-8 space-y-space-lg">
              {/* Result Summary Card */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm relative overflow-hidden border border-surface-container">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-surface-container-high" />
                
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-space-md pb-space-md">
                  <div className="space-y-space-xs">
                    <div className="flex items-center gap-space-sm">
                      <span className="font-tabular-stat text-tabular-stat tracking-tight text-on-surface font-bold">
                        {activeComplaint.ref}
                      </span>
                      <StatusBadge status={activeComplaint.status} />
                    </div>
                    <h2 className="font-headline-md text-headline-md text-on-surface">
                      {activeComplaint.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-space-xs bg-surface-container-low px-space-md py-space-sm rounded-lg shrink-0 border border-surface-container">
                    <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                      timer
                    </span>
                    <div>
                      <p className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">
                        Est. Resolution
                      </p>
                      <p className="font-label-md text-label-md text-on-surface font-bold">
                        {activeComplaint.sla}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Metadata Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md py-space-md bg-surface-container-low/60 rounded-lg px-space-md mb-space-md border border-surface-container/60">
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                      Category
                    </p>
                    <p className="font-body-md text-body-md text-on-surface font-semibold flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[16px] text-secondary">
                        alt_route
                      </span>
                      <span>{activeComplaint.category}</span>
                    </p>
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                      Locality & Ward
                    </p>
                    <p className="font-body-md text-body-md text-on-surface font-semibold flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[16px] text-secondary">
                        location_on
                      </span>
                      <span>{activeComplaint.ward}</span>
                    </p>
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                      Date & Time Filed
                    </p>
                    <p className="font-body-md text-body-md text-on-surface font-semibold flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[16px] text-secondary">
                        calendar_today
                      </span>
                      <span>{activeComplaint.dateFiled}</span>
                    </p>
                  </div>
                </div>

                {/* Assigned Department Ribbon */}
                <div className="flex items-center justify-between flex-wrap gap-space-sm text-on-surface-variant bg-surface-container px-space-md py-space-sm rounded">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[18px]">account_balance</span>
                    <span className="font-body-sm text-body-sm">
                      Assigned: <strong className="text-on-surface font-semibold">{activeComplaint.dept}</strong>
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm bg-surface-container-lowest px-2 py-0.5 rounded text-on-surface font-bold border border-surface-container">
                    Escalation Tier 1
                  </span>
                </div>
              </div>

              {/* Interactive Stepper Flow */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-surface-container">
                <div className="flex items-center justify-between mb-space-lg pb-space-sm bg-surface-container-low/40 p-space-sm rounded-lg border border-surface-container/60">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[20px] text-primary">
                      flowsheet
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">
                      Execution Lifecycle & Audit Log
                    </h3>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                    SLA Target: 72 Hours
                  </span>
                </div>

                {/* Stepper Container */}
                <div className="relative pl-6 space-y-space-lg before:content-[''] before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-surface-container-highest">
                  {activeComplaint.steps?.map((stepItem) => {
                    const isCompleted = stepItem.completed;
                    const isCurrent = stepItem.current;

                    return (
                      <div
                        key={stepItem.step}
                        className={`relative flex items-start gap-space-md group ${
                          !isCompleted && !isCurrent ? 'opacity-60' : ''
                        }`}
                      >
                        <div
                          className={`absolute -left-6 top-1 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-surface-container-lowest shadow-sm ${
                            isCompleted
                              ? 'bg-primary text-on-primary'
                              : isCurrent
                              ? 'bg-secondary text-on-secondary animate-pulse'
                              : 'bg-surface-container-highest text-on-surface-variant'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {isCompleted ? 'check' : isCurrent ? 'construction' : 'schedule'}
                          </span>
                        </div>

                        <div
                          className={`flex-1 p-space-md rounded-lg border ${
                            isCurrent
                              ? 'bg-secondary-container/20 border-secondary-container'
                              : 'bg-surface-container-low/40 border-surface-container/60'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <div className="flex items-center gap-space-xs">
                              <h4 className="font-label-lg text-label-lg text-on-surface font-bold">
                                Step {stepItem.step}: {stepItem.title}
                              </h4>
                              {isCurrent && (
                                <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-fixed text-[10px] font-bold uppercase">
                                  Current
                                </span>
                              )}
                            </div>
                            <time className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                              {stepItem.time}
                            </time>
                          </div>
                          <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
                            {stepItem.desc}
                          </p>
                          {stepItem.details && (
                            <div className="mt-space-xs inline-flex items-center gap-1 text-on-surface font-label-sm text-label-sm bg-surface-container-lowest px-2 py-0.5 rounded border border-surface-container">
                              <span className="material-symbols-outlined text-[14px] text-secondary">
                                gps_fixed
                              </span>
                              <span>{stepItem.details}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Municipal SLA Metrics Strip */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center gap-space-md border border-surface-container">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-[24px]">hourglass_top</span>
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                      Time Elapsed
                    </p>
                    <p className="font-tabular-stat text-tabular-stat text-on-surface font-bold">
                      {activeComplaint.timeElapsed || '22h / 72h max'}
                    </p>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center gap-space-md border border-surface-container">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary shrink-0">
                    <span className="material-symbols-outlined text-[24px]">speed</span>
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                      Ward Average
                    </p>
                    <p className="font-tabular-stat text-tabular-stat text-on-surface font-bold">
                      {activeComplaint.wardAverage || '41.8h'}
                    </p>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center gap-space-md border border-surface-container">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface shrink-0">
                    <span className="material-symbols-outlined text-[24px]">verified</span>
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                      Public Transparency
                    </p>
                    <p className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      100% Audited
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Evidence, Field Notes, & Action Hub (4 cols) */}
            <div className="lg:col-span-4 space-y-space-lg">
              {/* Evidence & Department Notes Panel */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md border border-surface-container">
                <div className="flex items-center justify-between pb-space-sm bg-surface-container-low/50 -mx-space-lg -mt-space-lg p-space-md rounded-t-xl border-b border-surface-container">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[20px] text-primary">
                      perm_media
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">
                      Field Evidence
                    </h3>
                  </div>
                  <span className="font-label-sm text-label-sm bg-surface-container-highest px-2 py-0.5 rounded text-on-surface font-bold">
                    Official Photo
                  </span>
                </div>

                {/* Citizen Photographic Proof */}
                <div>
                  <p className="font-label-sm text-label-sm uppercase text-on-surface-variant mb-space-xs font-semibold">
                    Registered Ground Proof
                  </p>
                  <div className="relative group overflow-hidden rounded-lg bg-surface-container-high h-48 border border-surface-container">
                    <img
                      src={activeComplaint.photo}
                      alt={activeComplaint.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-space-sm">
                      <div className="text-on-primary">
                        <p className="font-label-sm text-label-sm font-semibold">Original Submission Photo</p>
                        <p className="font-body-sm text-body-sm text-surface-container-highest text-[10px]">
                          {activeComplaint.dateFiled} • Exif Verified
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Official Field Note Container */}
                <div className="bg-surface-container-low p-space-md rounded-lg space-y-space-xs border border-surface-container">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm uppercase text-on-surface-variant font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-secondary">
                        edit_note
                      </span>
                      <span>Official Field Note</span>
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Inspection Log
                    </span>
                  </div>
                  <blockquote className="font-body-md text-body-md text-on-surface italic pl-space-sm border-l-2 border-primary">
                    {activeComplaint.fieldNote || '"Inspection queued by maintenance supervisor."'}
                  </blockquote>
                  <p className="font-label-sm text-label-sm text-on-surface-variant pt-space-xs">
                    — Signee: <strong>{activeComplaint.officer}</strong>
                  </p>
                </div>

                {/* Locality Mini-Map Container */}
                <div className="space-y-space-xs">
                  <p className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">
                    Incident Location
                  </p>
                  <div className="w-full h-36 bg-surface-container rounded-lg shadow-inner relative flex items-end p-space-xs overflow-hidden border border-surface-container">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:24px_24px]" />
                    <svg className="absolute inset-0 w-full h-full text-surface-container-highest opacity-70" fill="none">
                      <path d="M 0,60 C 90,40 200,90 350,60" stroke="currentColor" strokeWidth="4" />
                      <circle cx="180" cy="70" r="16" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        location_on
                      </span>
                    </div>
                    <div className="relative z-10 bg-surface-container-lowest/90 backdrop-blur px-space-sm py-1 rounded shadow text-on-surface font-body-sm text-body-sm flex items-center gap-1 border border-surface-container">
                      <span className="material-symbols-outlined text-[16px] text-error">pin_drop</span>
                      <span className="font-semibold text-xs truncate">{activeComplaint.ward}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Operations Hub */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md border border-surface-container">
                <h4 className="font-headline-sm text-headline-sm text-on-surface">
                  Citizen Actions
                </h4>
                <div className="space-y-space-sm">
                  <button
                    type="button"
                    onClick={handleDownloadPDF}
                    className="w-full h-11 px-space-md bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-label-md text-label-md flex items-center justify-between transition-colors border border-surface-container"
                  >
                    <span className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                        picture_as_pdf
                      </span>
                      <span>Download PDF Report</span>
                    </span>
                    <span className="material-symbols-outlined text-[18px]">download</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSmsModalOpen(true)}
                    className="w-full h-11 px-space-md bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-label-md text-label-md flex items-center justify-between transition-colors border border-surface-container"
                  >
                    <span className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                        sms
                      </span>
                      <span>Subscribe to SMS Alerts</span>
                    </span>
                    <span className="material-symbols-outlined text-[18px]">notifications_active</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEscalationModalOpen(true)}
                    className="w-full h-11 px-space-md bg-surface-container-low hover:bg-error-container hover:text-on-error-container text-error rounded-lg font-label-md text-label-md flex items-center justify-between transition-colors border border-surface-container"
                  >
                    <span className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-[20px]">warning</span>
                      <span>Raise Grievance Escalation</span>
                    </span>
                    <span className="material-symbols-outlined text-[18px]">flag</span>
                  </button>
                </div>

                <div className="pt-space-sm bg-surface-container-low p-space-sm rounded-lg flex items-center gap-space-sm border border-surface-container">
                  <span className="material-symbols-outlined text-secondary text-[22px]">
                    contact_support
                  </span>
                  <div className="text-left">
                    <p className="font-label-sm text-label-sm text-on-surface font-semibold">
                      Need Ward Support?
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Helpline: 1800-419-CIVIC (Toll-free)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* SMS Modal */}
      {smsModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-md w-full rounded-xl p-space-lg shadow-xl border border-surface-container animate-scaleUp">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">
              Subscribe to Real-Time SMS Updates
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
              Receive instant technician dispatch and closure OTP alerts for ticket {activeComplaint.ref}.
            </p>
            <form onSubmit={handleSubscribeSms}>
              <label className="font-label-md text-sm font-semibold block mb-1">Mobile Number</label>
              <input
                type="tel"
                required
                value={smsPhone}
                onChange={(e) => setSmsPhone(e.target.value)}
                className="w-full h-10 px-3 bg-surface border border-surface-container rounded mb-space-md focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
              />
              <div className="flex justify-end gap-space-sm">
                <button
                  type="button"
                  onClick={() => setSmsModalOpen(false)}
                  className="px-space-md py-2 text-sm text-on-surface-variant hover:text-on-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-space-md py-2 bg-primary text-on-primary rounded text-sm font-semibold hover:bg-[#222222]"
                >
                  Confirm Subscription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Escalation Modal */}
      {escalationModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-xl p-space-lg shadow-xl border border-surface-container animate-scaleUp">
            <div className="flex items-center gap-2 text-error mb-2">
              <span className="material-symbols-outlined text-[24px]">flag</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Executive Grievance Escalation
              </h3>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
              Flag complaint {activeComplaint.ref} directly to the Solapur Municipal Commissioner's Executive Oversight Queue.
            </p>
            <form onSubmit={handleEscalate}>
              <label className="font-label-md text-sm font-semibold block mb-1">Reason for Escalation</label>
              <textarea
                required
                rows={3}
                value={escalationReason}
                onChange={(e) => setEscalationReason(e.target.value)}
                className="w-full p-2 bg-surface border border-surface-container rounded mb-space-md focus:outline-none focus:ring-2 focus:ring-error text-sm"
              />
              <div className="flex justify-end gap-space-sm">
                <button
                  type="button"
                  onClick={() => setEscalationModalOpen(false)}
                  className="px-space-md py-2 text-sm text-on-surface-variant hover:text-on-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-space-md py-2 bg-error text-on-error rounded text-sm font-semibold hover:bg-[#991b1b]"
                >
                  Submit Escalation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-space-md py-space-sm rounded-lg shadow-xl font-body-sm text-body-sm flex items-center gap-space-sm animate-slideUp">
          <span className="material-symbols-outlined text-[18px]">info</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
