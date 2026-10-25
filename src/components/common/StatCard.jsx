import React from 'react';

export default function StatCard({
  label,
  value,
  subtitle,
  icon,
  progress = 100,
  progressColor = 'bg-primary',
  className = ''
}) {
  return (
    <div
      className={`bg-surface-container-lowest p-space-md rounded shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="flex items-center justify-between text-on-surface-variant mb-space-xs">
          <span className="font-label-md text-label-md uppercase tracking-wider">{label}</span>
          {typeof icon === 'string' ? (
            <span className="material-symbols-outlined text-[20px]">{icon}</span>
          ) : (
            icon
          )}
        </div>
        <div className="font-tabular-stat text-tabular-stat text-on-surface mt-space-xs tracking-tight">
          {value}
        </div>
        {subtitle && (
          <div className="flex items-center gap-space-xs mt-space-sm font-body-sm text-body-sm text-on-surface-variant">
            {subtitle}
          </div>
        )}
      </div>

      {progress !== undefined && (
        <div className="w-full h-1 bg-surface-container-highest rounded-full mt-space-md overflow-hidden">
          <div
            className={`h-full ${progressColor} transition-all duration-500`}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </div>
  );
}
