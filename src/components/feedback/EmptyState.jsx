import React from 'react';
import { Link } from 'react-router-dom';

export default function EmptyState({
  title = "No Complaints Found",
  description = "No active municipal grievances recorded under this view. Report a new issue to notify maintenance crews.",
  actionText = "Report a Problem",
  actionLink = "/report",
  onAction,
  className = ""
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-space-xl text-center bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container ${className}`}>
      <div className="w-56 h-56 sm:w-64 sm:h-64 mb-space-md flex items-center justify-center">
        <img
          src="/images/empty-complaints.svg"
          alt="No complaints registered"
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
        {title}
      </h3>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-space-lg leading-relaxed">
        {description}
      </p>
      {actionText && (
        actionLink ? (
          <Link
            to={actionLink}
            className="inline-flex items-center justify-center h-10 px-space-lg bg-primary text-on-primary hover:bg-[#222222] font-label-md text-label-md rounded shadow-sm transition-colors"
          >
            {actionText}
          </Link>
        ) : (
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center justify-center h-10 px-space-lg bg-primary text-on-primary hover:bg-[#222222] font-label-md text-label-md rounded shadow-sm transition-colors"
          >
            {actionText}
          </button>
        )
      )}
    </div>
  );
}
