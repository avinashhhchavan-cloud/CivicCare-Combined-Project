import React from 'react';

export default function StatusBadge({ status, className = '', showPulse = true }) {
  const norm = (status || '').toLowerCase().trim();

  let bgClass = 'bg-[#F1F5F9] text-[#475569] border-[#cbd5e1]';
  let dotClass = 'bg-[#475569]';
  let pulse = false;

  if (norm.includes('progress') || norm.includes('active') || norm.includes('assigned')) {
    bgClass = 'bg-[#d5e3fc] text-[#0d1c2e] border-[#b9c7df]';
    dotClass = 'bg-[#515f74]';
    pulse = showPulse;
  } else if (norm.includes('resolve') || norm.includes('closed') || norm.includes('complete')) {
    bgClass = 'bg-[#DCFCE7] text-[#166534] border-[#86efac]';
    dotClass = 'bg-[#166534]';
  } else if (norm.includes('reject') || norm.includes('critical') || norm.includes('hazard') || norm.includes('escalat')) {
    bgClass = 'bg-[#FEE2E2] text-[#991B1B] border-[#fca5a5]';
    dotClass = 'bg-[#991B1B]';
    pulse = showPulse;
  } else if (norm.includes('review') || norm.includes('triage') || norm.includes('registered')) {
    bgClass = 'bg-surface-container text-on-surface-variant border-surface-container-highest';
    dotClass = 'bg-on-surface-variant';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded font-label-sm text-[11px] font-semibold tracking-wider uppercase border ${bgClass} ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${dotClass} ${pulse ? 'animate-pulse' : ''}`}
      />
      <span>{status || 'Logged'}</span>
    </span>
  );
}
