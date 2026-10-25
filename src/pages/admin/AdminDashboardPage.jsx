import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ComplaintService } from '../../services/complaintService';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';

export default function AdminDashboardPage() {
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
    loadData();
  }, []);

  const loadData = () => {
    const list = ComplaintService.getComplaints();
    const st = ComplaintService.getStats();
    setComplaints(list);
    setStats(st);
  };

  const handleQuickStatusChange = (ref, newStatus) => {
    ComplaintService.updateComplaintStatus(ref, newStatus, `Operational desk updated status to ${newStatus}`);
    loadData();
  };

  const filtered = complaints.filter(c => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'urgent') return c.severity === 'Urgent / Hazard' || c.status === 'Escalated';
    return c.categoryId === filterCategory;
  });

  return (
    <div className="space-y-space-xl">
      {/* Top Banner / Operational Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-md border-b border-surface-container">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-green-600 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider font-bold text-on-surface">
              SOLAPUR CAD DISPATCH CORE ONLINE
            </span>
          </div>
          <h1 className="text-2xl font-bold font-headline-lg text-on-surface">
            Municipal Operational Dashboard
          </h1>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Real-time grievance ingestion, field crew dispatch monitoring, and SLA telemetry
          </p>
        </div>

        <div className="flex items-center gap-space-sm">
          <Link to="/admin/analytics">
            <Button variant="outline" size="sm">
              <span className="material-symbols-outlined text-[16px]">bar_chart</span>
              <span>Analytics & SLA Reports</span>
            </Button>
          </Link>

          <Link to="/admin/complaints">
            <Button variant="primary" size="sm">
              <span className="material-symbols-outlined text-[16px]">table_view</span>
              <span>Full Ingestion Queue</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* High-Density Operational KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md">
        <div className="bg-surface-container-lowest border border-surface-container p-space-md rounded">
          <div className="flex items-center justify-between text-xs font-semibold text-on-surface-variant uppercase font-label-sm">
            <span>Total Ingested (2026)</span>
            <span className="material-symbols-outlined text-[16px]">receipt_long</span>
          </div>
          <div className="text-2xl font-bold font-headline-md text-on-surface mt-2 font-mono">
            {stats?.totalComplaints?.toLocaleString() || '2,841'}
          </div>
          <div className="text-xs text-on-surface-variant mt-1 flex items-center gap-1">
            <span className="text-green-700 font-semibold">+18.4%</span>
            <span>from prior quarter</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container p-space-md rounded">
          <div className="flex items-center justify-between text-xs font-semibold text-on-surface-variant uppercase font-label-sm">
            <span>Active Field Backlog</span>
            <span className="material-symbols-outlined text-[16px]">engineering</span>
          </div>
          <div className="text-2xl font-bold font-headline-md text-secondary mt-2 font-mono">
            {stats?.inProgress?.toLocaleString() || '142'}
          </div>
          <div className="text-xs text-on-surface-variant mt-1">
            Assigned to 38 municipal field crews
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container p-space-md rounded">
          <div className="flex items-center justify-between text-xs font-semibold text-on-surface-variant uppercase font-label-sm">
            <span>Average Resolution Time</span>
            <span className="material-symbols-outlined text-[16px]">timer</span>
          </div>
          <div className="text-2xl font-bold font-headline-md text-on-surface mt-2 font-mono">
            38.4 hrs
          </div>
          <div className="text-xs text-green-700 font-semibold mt-1">
            9.6 hrs inside statutory 48h SLA
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container p-space-md rounded">
          <div className="flex items-center justify-between text-xs font-semibold text-on-surface-variant uppercase font-label-sm">
            <span>Critical SLA Watch</span>
            <span className="material-symbols-outlined text-[16px] text-red-600">warning</span>
          </div>
          <div className="text-2xl font-bold font-headline-md text-red-600 mt-2 font-mono">
            {complaints.filter(c => c.severity === 'Urgent / Hazard' || c.status === 'Escalated').length}
          </div>
          <div className="text-xs text-red-700 font-semibold mt-1">
            Requires priority field intervention
          </div>
        </div>
      </div>

      {/* Operational Dispatch Triage Feed */}
      <div className="bg-surface-container-lowest border border-surface-container rounded shadow-xs">
        {/* Header with Quick Filter Tabs */}
        <div className="p-space-md border-b border-surface-container flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div>
            <h2 className="text-base font-bold text-on-surface font-headline-sm">
              Live Ingestion & Triage Queue
            </h2>
            <p className="text-xs text-on-surface-variant">
              Solapur ward grievance stream with direct status transition actions
            </p>
          </div>

          <div className="flex flex-wrap gap-1">
            {[
              { id: 'all', label: 'All Ingested' },
              { id: 'urgent', label: 'Urgent / Escalated' },
              { id: 'roads', label: 'Roads & Potholes' },
              { id: 'garbage', label: 'Solid Waste' },
              { id: 'water', label: 'Water Supply' },
              { id: 'drainage', label: 'Drainage' },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterCategory(tab.id)}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                  filterCategory === tab.id
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant uppercase font-label-sm tracking-wider border-b border-surface-container">
              <tr>
                <th className="py-3 px-4 font-semibold">Ref ID</th>
                <th className="py-3 px-4 font-semibold">Grievance / Ward</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Severity</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">SLA Window</th>
                <th className="py-3 px-4 font-semibold text-right">Quick Transition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {filtered.map(complaint => (
                <tr key={complaint.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-on-surface whitespace-nowrap">
                    <Link
                      to={`/admin/complaints/${complaint.ref}`}
                      className="hover:underline text-primary"
                    >
                      {complaint.ref}
                    </Link>
                  </td>

                  <td className="py-3 px-4 max-w-xs">
                    <div className="font-semibold text-on-surface truncate">
                      {complaint.title}
                    </div>
                    <div className="text-[11px] text-on-surface-variant flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[13px]">location_on</span>
                      <span>{complaint.ward}</span>
                    </div>
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

                  <td className="py-3 px-4 whitespace-nowrap font-mono text-on-surface-variant">
                    {complaint.timeElapsed || '0h / 48h'}
                  </td>

                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1">
                      {complaint.status === 'Under Review' && (
                        <button
                          type="button"
                          onClick={() => handleQuickStatusChange(complaint.ref, 'In Progress')}
                          className="px-2 py-1 bg-surface-container hover:bg-surface-container-high rounded text-[11px] font-semibold text-on-surface transition-colors"
                        >
                          Dispatch Crew
                        </button>
                      )}

                      {complaint.status === 'In Progress' && (
                        <button
                          type="button"
                          onClick={() => handleQuickStatusChange(complaint.ref, 'Resolved')}
                          className="px-2 py-1 bg-green-100 text-green-800 hover:bg-green-200 rounded text-[11px] font-semibold transition-colors"
                        >
                          Resolve & Sign Off
                        </button>
                      )}

                      <Link
                        to={`/admin/complaints/${complaint.ref}`}
                        className="px-2 py-1 bg-surface-container hover:bg-surface-container-high rounded text-[11px] font-semibold text-on-surface transition-colors inline-flex items-center gap-0.5"
                      >
                        <span>Dossier</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
