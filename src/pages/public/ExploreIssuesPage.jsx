import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, WARDS } from '../../data/mockData';
import { ComplaintService } from '../../services/complaintService';
import StatusBadge from '../../components/common/StatusBadge';
import EmptyState from '../../components/feedback/EmptyState';

export default function ExploreIssuesPage() {
  const [complaints, setComplaints] = useState(() => ComplaintService.getComplaints());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWard, setSelectedWard] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      if (!c.isPublic) return false;

      // Search matching
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matchesTitle = c.title?.toLowerCase().includes(q);
        const matchesRef = c.ref?.toLowerCase().includes(q);
        const matchesWard = c.ward?.toLowerCase().includes(q);
        const matchesDesc = c.description?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesRef && !matchesWard && !matchesDesc) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && c.categoryId !== selectedCategory) {
        return false;
      }

      // Ward filter
      if (selectedWard !== 'all' && c.wardId !== selectedWard) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'all' && c.status.toLowerCase() !== selectedStatus.toLowerCase()) {
        return false;
      }

      return true;
    });
  }, [complaints, searchTerm, selectedCategory, selectedWard, selectedStatus]);

  const handleUpvote = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    ComplaintService.toggleUpvote(id);
    setComplaints(ComplaintService.getComplaints());
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-gutter-desktop py-space-xl">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
        <div>
          <div className="inline-flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider font-semibold mb-space-xs">
            <span className="w-2 h-2 rounded-full bg-primary inline-block animate-pulse" />
            <span>Community Transparency Feed</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
            Explore Civic Issues in Solapur
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
            Browse active and resolved public complaints across all city wards. Upvote critical neighborhood hazards to help municipal teams prioritize dispatch.
          </p>
        </div>

        <Link
          to="/report"
          className="inline-flex items-center justify-center h-11 px-space-lg bg-primary text-on-primary hover:bg-[#222222] font-label-md text-label-md rounded shadow-sm tracking-wide shrink-0 font-semibold"
        >
          <span className="material-symbols-outlined mr-space-xs text-[18px]">add</span>
          Report a Problem
        </Link>
      </div>

      {/* Filter and Search Bar Console */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container mb-space-xl space-y-space-md">
        {/* Search input */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by keywords, street name, ward, or reference (e.g. CC-2026-0841)..."
            className="w-full h-11 pl-10 pr-space-md bg-surface text-on-surface font-body-md text-body-md rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-surface-container"
          />
        </div>

        {/* Dropdown Filters & Status Pills */}
        <div className="flex flex-wrap items-center justify-between gap-space-md pt-space-xs">
          <div className="flex flex-wrap items-center gap-space-sm">
            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-9 px-space-sm bg-surface text-on-surface font-label-md text-xs rounded border border-surface-container cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Ward Dropdown */}
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="h-9 px-space-sm bg-surface text-on-surface font-label-md text-xs rounded border border-surface-container cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">All Wards / Sectors</option>
              {WARDS.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Switcher Tabs */}
          <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg border border-surface-container">
            {['all', 'in progress', 'under review', 'resolved'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1 rounded text-xs font-semibold capitalize transition-all ${
                  selectedStatus === st
                    ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Issues */}
      {filteredComplaints.length === 0 ? (
        <EmptyState
          title="No Matching Complaints Found"
          description="Try clearing your search query or adjusting category and ward filters to view more neighborhood issues."
          actionText="Clear All Filters"
          actionLink=""
          onAction={() => {
            setSearchTerm('');
            setSelectedCategory('all');
            setSelectedWard('all');
            setSelectedStatus('all');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {filteredComplaints.map((item) => (
            <div
              key={item.id}
              className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col border border-surface-container overflow-hidden group"
            >
              {/* Photo Evidence with Overlaid Status */}
              <div className="relative h-48 bg-surface-container overflow-hidden">
                <img
                  src={item.photo}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <StatusBadge status={item.status} />
                </div>
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  {item.ref}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-space-md flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-on-surface-variant mb-1 font-semibold">
                    <span className="uppercase">{item.category}</span>
                    <span className="font-mono">{item.dateFiled}</span>
                  </div>

                  <h3 className="font-headline-sm text-base text-on-surface font-bold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2 mb-3">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-1 text-xs text-on-surface-variant bg-surface-container-low px-2 py-1 rounded w-fit mb-4">
                    <span className="material-symbols-outlined text-[14px] text-secondary">location_on</span>
                    <span className="truncate max-w-[240px]">{item.ward}</span>
                  </div>
                </div>

                {/* Footer Strip with Upvote & Track Link */}
                <div className="pt-space-sm border-t border-surface-container flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => handleUpvote(item.id, e)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors border ${
                      item.hasUpvoted
                        ? 'bg-primary text-on-primary border-primary'
                        : 'bg-surface-container-low text-on-surface hover:bg-surface-container border-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {item.hasUpvoted ? 'thumb_up' : 'thumb_up_off_alt'}
                    </span>
                    <span>{item.upvotes} Upvotes</span>
                  </button>

                  <Link
                    to={`/track?ref=${item.ref}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    <span>Track Dossier</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
