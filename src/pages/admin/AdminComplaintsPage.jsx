import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ComplaintService } from '../../services/complaintService';
import { MUNICIPAL_WARDS, CIVIC_CATEGORIES } from '../../data/mockData';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';

export default function AdminComplaintsPage() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [wardFilter, setWardFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState([]);
  const [notificationMsg, setNotificationMsg] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    loadComplaints();
  }, []);

  const loadComplaints = () => {
    setComplaints(ComplaintService.getComplaints());
  };

  const filtered = complaints.filter(c => {
    const matchesSearch =
      !search.trim() ||
      c.ref.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.address.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || c.categoryId === categoryFilter;
    const matchesWard = wardFilter === 'all' || c.wardId === wardFilter;
    const matchesStatus = statusFilter === 'all' || c.status.toLowerCase().replace(/\s+/g, '-') === statusFilter;

    return matchesSearch && matchesCategory && matchesWard && matchesStatus;
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filtered.map(c => c.ref));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (ref) => {
    setSelectedIds(prev =>
      prev.includes(ref) ? prev.filter(r => r !== ref) : [...prev, ref]
    );
  };

  const handleBulkStatus = (newStatus) => {
    if (selectedIds.length === 0) return;
    selectedIds.forEach(ref => {
      ComplaintService.updateComplaintStatus(ref, newStatus, `Bulk action transition to ${newStatus}`);
    });
    setSelectedIds([]);
    loadComplaints();
    setNotificationMsg(`Successfully updated ${selectedIds.length} complaints to "${newStatus}"`);
    setTimeout(() => setNotificationMsg(''), 4000);
  };

  const handleExportCSV = () => {
    const headers = 'Reference,Title,Category,Ward,Status,DateFiled,Severity,SLA\n';
    const rows = filtered
      .map(c => `"${c.ref}","${c.title}","${c.category}","${c.ward}","${c.status}","${c.dateFiled}","${c.severity}","${c.sla}"`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `civiccare-export-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-space-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-sm border-b border-surface-container">
        <div>
          <div className="flex items-center gap-space-xs text-xs text-on-surface-variant mb-1">
            <Link to="/admin" className="hover:text-on-surface">CAD Command</Link>
            <span>/</span>
            <span className="text-on-surface font-semibold">Grievance Ingestion Ledger</span>
          </div>
          <h1 className="text-2xl font-bold font-headline-lg text-on-surface">
            Municipal Complaint Queue
          </h1>
          <p className="text-xs text-on-surface-variant">
            Full audit log of civic incident reports filed across Solapur Municipal Corporation wards
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Export CSV</span>
          </Button>
          <Link to="/report">
            <Button variant="primary" size="sm">
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Manual Intake</span>
            </Button>
          </Link>
        </div>
      </div>

      {notificationMsg && (
        <div className="p-space-sm bg-green-50 border border-green-200 text-green-800 rounded text-xs flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">check_circle</span>
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-surface-container-lowest border border-surface-container p-space-md rounded space-y-space-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-sm">
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reference, title, address..."
              className="w-full h-9 pl-9 pr-3 text-xs bg-surface border border-outline-variant rounded focus:outline-none focus:border-primary text-on-surface"
            />
          </div>

          {/* Category */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full h-9 px-2.5 text-xs bg-surface border border-outline-variant rounded focus:outline-none focus:border-primary text-on-surface"
            >
              <option value="all">All Categories</option>
              {CIVIC_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Ward */}
          <div>
            <select
              value={wardFilter}
              onChange={(e) => setWardFilter(e.target.value)}
              className="w-full h-9 px-2.5 text-xs bg-surface border border-outline-variant rounded focus:outline-none focus:border-primary text-on-surface"
            >
              <option value="all">All Municipal Wards</option>
              {MUNICIPAL_WARDS.map(w => (
                <option key={w.id} value={w.id}>{w.name}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full h-9 px-2.5 text-xs bg-surface border border-outline-variant rounded focus:outline-none focus:border-primary text-on-surface"
            >
              <option value="all">All Statuses</option>
              <option value="under-review">Under Review</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="escalated">Escalated</option>
            </select>
          </div>
        </div>

        {/* Bulk Action Controls */}
        {selectedIds.length > 0 && (
          <div className="pt-space-sm border-t border-surface-container flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-low p-2 rounded">
            <span className="text-xs font-semibold text-on-surface">
              {selectedIds.length} item(s) selected
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleBulkStatus('In Progress')}
                className="px-2.5 py-1 bg-surface-container hover:bg-surface-container-high rounded text-xs font-semibold text-on-surface transition-colors"
              >
                Mark In Progress
              </button>
              <button
                type="button"
                onClick={() => handleBulkStatus('Resolved')}
                className="px-2.5 py-1 bg-green-100 hover:bg-green-200 rounded text-xs font-semibold text-green-800 transition-colors"
              >
                Mark Resolved
              </button>
              <button
                type="button"
                onClick={() => setSelectedIds([])}
                className="text-xs text-on-surface-variant hover:text-on-surface underline ml-2"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Ledger Table */}
      <div className="bg-surface-container-lowest border border-surface-container rounded shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant uppercase font-label-sm tracking-wider border-b border-surface-container">
              <tr>
                <th className="py-3 px-3 w-10">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={filtered.length > 0 && selectedIds.length === filtered.length}
                    className="rounded border-outline-variant text-primary focus:ring-0"
                  />
                </th>
                <th className="py-3 px-4 font-semibold">Ref ID</th>
                <th className="py-3 px-4 font-semibold">Grievance Subject</th>
                <th className="py-3 px-4 font-semibold">Ward & Sector</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Severity</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Filing Date</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-on-surface-variant">
                    No complaints matching the selected filters.
                  </td>
                </tr>
              ) : (
                filtered.map(complaint => (
                  <tr
                    key={complaint.id}
                    className={`hover:bg-surface-container-low/50 transition-colors ${
                      selectedIds.includes(complaint.ref) ? 'bg-surface-container/60' : ''
                    }`}
                  >
                    <td className="py-3 px-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(complaint.ref)}
                        onChange={() => handleSelectOne(complaint.ref)}
                        className="rounded border-outline-variant text-primary focus:ring-0"
                      />
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-on-surface whitespace-nowrap">
                      <Link
                        to={`/admin/complaints/${complaint.ref}`}
                        className="hover:underline text-primary"
                      >
                        {complaint.ref}
                      </Link>
                    </td>

                    <td className="py-3 px-4 max-w-sm">
                      <div className="font-semibold text-on-surface truncate">
                        {complaint.title}
                      </div>
                      <div className="text-[11px] text-on-surface-variant truncate">
                        {complaint.address}
                      </div>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap text-on-surface-variant">
                      {complaint.ward}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap text-on-surface-variant">
                      {complaint.category}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        complaint.severity === 'Urgent / Hazard'
                          ? 'bg-red-100 text-red-800'
                          : complaint.severity === 'High'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-surface-container text-on-surface-variant'
                      }`}>
                        {complaint.severity}
                      </span>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <StatusBadge status={complaint.status} />
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap text-on-surface-variant">
                      {complaint.dateFiled}
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <Link
                        to={`/admin/complaints/${complaint.ref}`}
                        className="px-2.5 py-1 bg-surface-container hover:bg-surface-container-high rounded text-xs font-semibold text-on-surface transition-colors inline-flex items-center gap-1"
                      >
                        <span>Examine</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Ledger Footer */}
        <div className="p-space-sm border-t border-surface-container bg-surface-container-low flex items-center justify-between text-xs text-on-surface-variant">
          <span>Showing {filtered.length} of {complaints.length} municipal records</span>
          <span>Solapur City Municipal Corporation GIS Telemetry</span>
        </div>
      </div>
    </div>
  );
}
