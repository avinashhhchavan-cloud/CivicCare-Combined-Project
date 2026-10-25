import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ComplaintService } from '../../services/complaintService';
import StatusBadge from '../../components/common/StatusBadge';
import EmptyState from '../../components/feedback/EmptyState';
import Button from '../../components/common/Button';

export default function MyComplaintsPage() {
  const [complaints, setComplaints] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    loadComplaints();
  }, []);

  const loadComplaints = () => {
    const list = ComplaintService.getUserComplaints();
    setComplaints(list);
  };

  const filtered = complaints.filter(c => {
    const matchesTab =
      activeTab === 'all' ||
      c.status.toLowerCase().replace(/\s+/g, '-') === activeTab;

    const matchesSearch =
      !searchQuery.trim() ||
      c.ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.ward.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const totalComplaints = complaints.length;
  const inProgressCount = complaints.filter(c => c.status === 'In Progress').length;
  const underReviewCount = complaints.filter(c => c.status === 'Under Review').length;
  const resolvedCount = complaints.filter(c => c.status === 'Resolved').length;

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface antialiased py-space-xl">
      <div className="max-w-[1280px] mx-auto px-gutter-mobile md:px-gutter-desktop">
        {/* Breadcrumb / Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-lg">
          <div>
            <div className="flex items-center gap-space-xs text-xs text-on-surface-variant mb-1">
              <Link to="/" className="hover:text-on-surface">Home</Link>
              <span>/</span>
              <span className="text-on-surface font-semibold">Citizen Portal</span>
              <span>/</span>
              <span>My Grievances</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
              My Reported Grievances
            </h1>
            <p className="font-body-md text-on-surface-variant mt-1 text-sm">
              Track real-time municipal telemetry, crew dispatches, and SLA milestones for your filed issues in Solapur.
            </p>
          </div>

          <div className="flex items-center gap-space-sm">
            <Link to="/report">
              <Button variant="primary">
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Report New Issue</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* High-Density Metric Ribbons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl">
          <div className="bg-surface-container-lowest border border-surface-container p-space-md rounded">
            <div className="text-xs uppercase font-label-sm text-on-surface-variant font-semibold tracking-wider">
              Total Filed
            </div>
            <div className="text-2xl font-bold font-headline-md text-on-surface mt-1">
              {totalComplaints}
            </div>
            <div className="text-xs text-on-surface-variant mt-1">
              Logged to Solapur Municipal CAD
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-surface-container p-space-md rounded">
            <div className="text-xs uppercase font-label-sm text-on-surface-variant font-semibold tracking-wider">
              In Progress
            </div>
            <div className="text-2xl font-bold font-headline-md text-secondary mt-1">
              {inProgressCount}
            </div>
            <div className="text-xs text-on-surface-variant mt-1">
              Field crew dispatched / work order active
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-surface-container p-space-md rounded">
            <div className="text-xs uppercase font-label-sm text-on-surface-variant font-semibold tracking-wider">
              Under Triage
            </div>
            <div className="text-2xl font-bold font-headline-md text-on-surface-variant mt-1">
              {underReviewCount}
            </div>
            <div className="text-xs text-on-surface-variant mt-1">
              Ward engineer verification pending
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-surface-container p-space-md rounded">
            <div className="text-xs uppercase font-label-sm text-on-surface-variant font-semibold tracking-wider">
              Resolved & Verified
            </div>
            <div className="text-2xl font-bold font-headline-md text-green-700 mt-1">
              {resolvedCount}
            </div>
            <div className="text-xs text-on-surface-variant mt-1">
              Inspected & closed with completion audit
            </div>
          </div>
        </div>

        {/* Filter and Search Controls */}
        <div className="bg-surface-container-lowest border border-surface-container p-space-md rounded mb-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1 w-full md:w-auto">
            {[
              { id: 'all', label: 'All Issues', count: totalComplaints },
              { id: 'in-progress', label: 'In Progress', count: inProgressCount },
              { id: 'under-review', label: 'Under Review', count: underReviewCount },
              { id: 'resolved', label: 'Resolved', count: resolvedCount },
              { id: 'escalated', label: 'Escalated', count: complaints.filter(c => c.status === 'Escalated').length },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-surface-container text-on-surface-variant'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reference, ward, title..."
              className="w-full h-9 pl-9 pr-3 text-xs bg-surface border border-outline-variant rounded focus:outline-none focus:border-primary text-on-surface placeholder:text-outline"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Complaints Listing */}
        {filtered.length === 0 ? (
          <EmptyState
            title={searchQuery ? "No matching grievances found" : "No grievances in this category"}
            description={
              searchQuery
                ? `No issues matched your query "${searchQuery}". Clear your search or check your reference number.`
                : "You currently have no complaints registered under this status filter."
            }
            actionLabel="Report New Issue"
            actionLink="/report"
          />
        ) : (
          <div className="space-y-space-md">
            {filtered.map(complaint => (
              <div
                key={complaint.id}
                className="bg-surface-container-lowest border border-surface-container rounded p-space-md hover:border-outline transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md"
              >
                {/* Left side: Photo & details */}
                <div className="flex items-start gap-space-md flex-1">
                  <div className="w-20 h-20 rounded bg-surface-container flex-shrink-0 overflow-hidden border border-surface-container">
                    <img
                      src={complaint.photo}
                      alt={complaint.title}
                      className="w-full h-full object-cover grayscale contrast-125"
                      onError={(e) => {
                        e.currentTarget.src = '/images/issue-pothole.webp';
                      }}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-space-sm mb-1">
                      <span className="font-mono text-xs font-bold bg-surface-container px-2 py-0.5 rounded text-on-surface">
                        {complaint.ref}
                      </span>
                      <StatusBadge status={complaint.status} />
                      <span className="text-xs text-on-surface-variant font-medium">
                        {complaint.category}
                      </span>
                      <span className="text-xs text-outline-variant">•</span>
                      <span className="text-xs text-on-surface-variant">
                        Filed: {complaint.dateFiled}
                      </span>
                    </div>

                    <h2 className="text-base font-semibold text-on-surface font-headline-sm hover:underline">
                      <Link to={`/track?ref=${complaint.ref}`}>{complaint.title}</Link>
                    </h2>

                    <div className="flex flex-wrap items-center gap-x-space-md gap-y-1 text-xs text-on-surface-variant mt-1.5">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">location_on</span>
                        <span>{complaint.address} ({complaint.ward})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">timer</span>
                        <span>{complaint.sla}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">engineering</span>
                        <span>{complaint.officer}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side: Action links */}
                <div className="flex items-center gap-space-sm w-full md:w-auto justify-end border-t md:border-t-0 pt-space-sm md:pt-0 border-surface-container">
                  <Link
                    to={`/track?ref=${complaint.ref}`}
                    className="inline-flex items-center gap-1.5 px-space-md py-2 bg-primary text-on-primary hover:bg-[#222222] rounded text-xs font-semibold transition-colors"
                  >
                    <span>Track Live Status</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
