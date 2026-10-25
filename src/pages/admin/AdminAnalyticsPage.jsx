import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { MONTHLY_ANALYTICS, WARD_GRIEVANCE_DATA, CIVIC_CATEGORIES } from '../../data/mockData';
import Button from '../../components/common/Button';

const CATEGORY_COLORS = ['#111111', '#444444', '#747878', '#999999', '#CCCCCC', '#E5E5E5'];

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6m');

  const categoryPieData = CIVIC_CATEGORIES.map((cat, i) => ({
    name: cat.name,
    value: cat.count,
    color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
  }));

  return (
    <div className="space-y-space-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-sm border-b border-surface-container">
        <div>
          <div className="flex items-center gap-space-xs text-xs text-on-surface-variant mb-1">
            <Link to="/admin" className="hover:text-on-surface">CAD Command</Link>
            <span>/</span>
            <span className="text-on-surface font-semibold">Civic Intelligence & Analytics</span>
          </div>
          <h1 className="text-2xl font-bold font-headline-lg text-on-surface">
            Municipal Telemetry & SLA Analytics
          </h1>
          <p className="text-xs text-on-surface-variant">
            Empirical breakdown of grievance ingestion velocity, resolution SLA performance, and ward density
          </p>
        </div>

        <div className="flex items-center gap-space-sm">
          <div className="flex bg-surface-container p-0.5 rounded text-xs font-semibold">
            {[
              { id: '30d', label: '30 Days' },
              { id: '6m', label: '6 Months' },
              { id: '1y', label: 'Full Year' },
            ].map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => setTimeRange(r.id)}
                className={`px-3 py-1 rounded transition-colors ${
                  timeRange === r.id
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>Print Report</span>
          </Button>
        </div>
      </div>

      {/* KPI Performance Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md">
        <div className="bg-surface-container-lowest border border-surface-container p-space-md rounded">
          <div className="text-xs font-semibold text-on-surface-variant uppercase font-label-sm">
            Statutory SLA Compliance
          </div>
          <div className="text-2xl font-bold font-headline-md text-green-700 mt-2 font-mono">
            94.2%
          </div>
          <div className="text-xs text-on-surface-variant mt-1">
            Grievances resolved within mandated 48 hours
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container p-space-md rounded">
          <div className="text-xs font-semibold text-on-surface-variant uppercase font-label-sm">
            Mean Time to Resolution (MTTR)
          </div>
          <div className="text-2xl font-bold font-headline-md text-on-surface mt-2 font-mono">
            38.4 hrs
          </div>
          <div className="text-xs text-on-surface-variant mt-1">
            Historical municipal benchmark: 54.2 hrs
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container p-space-md rounded">
          <div className="text-xs font-semibold text-on-surface-variant uppercase font-label-sm">
            Citizen Satisfaction Rating
          </div>
          <div className="text-2xl font-bold font-headline-md text-on-surface mt-2 font-mono">
            4.6 / 5.0
          </div>
          <div className="text-xs text-on-surface-variant mt-1">
            Based on post-resolution SMS verification
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container p-space-md rounded">
          <div className="text-xs font-semibold text-on-surface-variant uppercase font-label-sm">
            Total Resolved YTD
          </div>
          <div className="text-2xl font-bold font-headline-md text-on-surface mt-2 font-mono">
            2,699
          </div>
          <div className="text-xs text-green-700 font-semibold mt-1">
            Active clearance rate 95.0%
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
        {/* Chart 1: Monthly Grievance Intake vs Resolution */}
        <div className="bg-surface-container-lowest border border-surface-container p-space-lg rounded shadow-xs">
          <div className="flex items-center justify-between mb-space-md">
            <div>
              <h2 className="text-sm font-bold text-on-surface uppercase font-label-sm tracking-wider">
                Monthly Ingestion vs Resolution
              </h2>
              <p className="text-xs text-on-surface-variant">
                Trajectory of complaints filed versus field crew sign-offs
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_ANALYTICS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEEEEE" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#747878' }} />
                <YAxis tick={{ fontSize: 11, fill: '#747878' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111111',
                    color: '#FFFFFF',
                    borderRadius: 4,
                    fontSize: 12,
                    border: 'none',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                <Bar dataKey="filed" name="Ingested" fill="#111111" radius={[2, 2, 0, 0]} />
                <Bar dataKey="resolved" name="Resolved" fill="#747878" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Category Distribution */}
        <div className="bg-surface-container-lowest border border-surface-container p-space-lg rounded shadow-xs">
          <div className="flex items-center justify-between mb-space-md">
            <div>
              <h2 className="text-sm font-bold text-on-surface uppercase font-label-sm tracking-wider">
                Grievance Category Breakdown
              </h2>
              <p className="text-xs text-on-surface-variant">
                Proportion of issues across Solapur municipal departments
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111111',
                    color: '#FFFFFF',
                    borderRadius: 4,
                    fontSize: 12,
                    border: 'none',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Ward Level Grievance Density */}
      <div className="bg-surface-container-lowest border border-surface-container p-space-lg rounded shadow-xs">
        <div className="mb-space-md">
          <h2 className="text-sm font-bold text-on-surface uppercase font-label-sm tracking-wider">
            Ward-Level Incident Density (Solapur Municipal Corporation)
          </h2>
          <p className="text-xs text-on-surface-variant">
            Data sourced from Solapur GIS Ward telemetry records (Solid Waste, Water, Roads, Drainage)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
          {WARD_GRIEVANCE_DATA.map((w, idx) => (
            <div
              key={idx}
              className="p-space-md rounded bg-surface-container-low border border-surface-container"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-on-surface">{w.ward}</span>
                <span className="font-mono text-on-surface-variant font-semibold">
                  {w.complaints} reports
                </span>
              </div>
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: `${Math.min(100, (w.complaints / 700) * 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-on-surface-variant mt-2">
                <span>Avg SLA: {w.slaAvg}</span>
                <span className="text-green-700 font-semibold">{w.resolvedPct}% resolved</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
