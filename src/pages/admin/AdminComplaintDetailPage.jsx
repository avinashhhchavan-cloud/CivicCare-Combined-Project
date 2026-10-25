import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ComplaintService } from '../../services/complaintService';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';

export default function AdminComplaintDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [newRemark, setNewRemark] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    loadComplaint();
  }, [id]);

  const loadComplaint = () => {
    const data = ComplaintService.getComplaintById(id);
    setComplaint(data);
  };

  const handleStatusUpdate = (targetStatus) => {
    if (!complaint) return;
    const note = newRemark.trim() || `Administrative desk updated status to ${targetStatus}`;
    ComplaintService.updateComplaintStatus(complaint.ref, targetStatus, note);
    setNewRemark('');
    setFeedbackMsg(`Complaint status updated to "${targetStatus}"`);
    setTimeout(() => setFeedbackMsg(''), 3500);
    loadComplaint();
  };

  if (!complaint) {
    return (
      <div className="py-space-2xl text-center space-y-space-md">
        <h2 className="text-xl font-bold text-on-surface">Complaint Dossier Not Found</h2>
        <p className="text-xs text-on-surface-variant">
          No record matched reference identifier "{id}".
        </p>
        <Link to="/admin/complaints">
          <Button variant="primary">Return to Ingestion Queue</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-space-lg">
      {/* Breadcrumb & Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-sm border-b border-surface-container">
        <div>
          <div className="flex items-center gap-space-xs text-xs text-on-surface-variant mb-1">
            <Link to="/admin" className="hover:text-on-surface">CAD Command</Link>
            <span>/</span>
            <Link to="/admin/complaints" className="hover:text-on-surface">Grievance Ledger</Link>
            <span>/</span>
            <span className="font-mono text-on-surface font-semibold">{complaint.ref}</span>
          </div>
          <div className="flex flex-wrap items-center gap-space-sm">
            <h1 className="text-2xl font-bold font-headline-lg text-on-surface font-mono">
              {complaint.ref}
            </h1>
            <StatusBadge status={complaint.status} />
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              complaint.severity === 'Urgent / Hazard'
                ? 'bg-red-100 text-red-800'
                : 'bg-surface-container text-on-surface-variant'
            }`}>
              {complaint.severity}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link to={`/track?ref=${complaint.ref}`} target="_blank">
            <Button variant="outline" size="sm">
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              <span>Citizen View</span>
            </Button>
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/admin/complaints')}
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to Queue</span>
          </Button>
        </div>
      </div>

      {feedbackMsg && (
        <div className="p-space-sm bg-green-50 border border-green-200 text-green-800 rounded text-xs flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">check_circle</span>
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Grid: Left Column Details & Right Column Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
        {/* Left Column (2 spans): Primary Dossier Information */}
        <div className="lg:col-span-2 space-y-space-lg">
          {/* Main Complaint Overview */}
          <div className="bg-surface-container-lowest border border-surface-container rounded p-space-lg shadow-xs">
            <div className="flex items-start justify-between gap-space-md mb-space-md">
              <div>
                <span className="text-xs font-semibold text-on-surface-variant uppercase font-label-sm">
                  {complaint.category} • Filed {complaint.dateFiled}
                </span>
                <h2 className="text-lg font-bold text-on-surface mt-1">
                  {complaint.title}
                </h2>
              </div>
              <div className="text-right">
                <span className="text-xs text-on-surface-variant font-mono">
                  Work Order: {complaint.workOrder || '#WO-4029'}
                </span>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed mb-space-lg bg-surface-container-low p-space-md rounded border border-surface-container">
              {complaint.description}
            </p>

            {/* Photographic Evidence */}
            <div>
              <h3 className="text-xs font-bold text-on-surface uppercase font-label-sm tracking-wider mb-space-sm flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                <span>Photographic Evidence & Site Inspection</span>
              </h3>
              <div className="rounded overflow-hidden border border-surface-container bg-surface-container max-w-md">
                <img
                  src={complaint.photo}
                  alt={complaint.title}
                  className="w-full h-64 object-cover grayscale contrast-125"
                  onError={(e) => {
                    e.currentTarget.src = '/images/issue-pothole.webp';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Audit Lifecycle Trail */}
          <div className="bg-surface-container-lowest border border-surface-container rounded p-space-lg shadow-xs">
            <h3 className="text-xs font-bold text-on-surface uppercase font-label-sm tracking-wider mb-space-md flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">timeline</span>
              <span>Municipal Execution Audit Log</span>
            </h3>

            <div className="space-y-space-md relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-surface-container">
              {complaint.steps?.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-space-md pl-8">
                  <span className={`absolute left-1.5 top-1 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 ${
                    step.completed
                      ? 'bg-primary border-primary'
                      : 'bg-surface-container border-outline'
                  }`} />

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-on-surface">
                        {step.title}
                      </span>
                      <span className="text-[10px] text-on-surface-variant font-mono">
                        {step.time}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      {step.desc}
                    </p>
                    {step.details && (
                      <div className="mt-1 font-mono text-[11px] text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded inline-block">
                        {step.details}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Actions & Administrative Metadata */}
        <div className="space-y-space-lg">
          {/* Dispatch Action Panel */}
          <div className="bg-surface-container-lowest border border-surface-container rounded p-space-md shadow-xs">
            <h3 className="text-xs font-bold text-on-surface uppercase font-label-sm tracking-wider mb-space-sm flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              <span>Administrative CAD Actions</span>
            </h3>

            <div className="space-y-space-sm">
              <button
                type="button"
                onClick={() => handleStatusUpdate('In Progress')}
                className="w-full h-9 px-3 bg-secondary text-on-secondary rounded text-xs font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">engineering</span>
                <span>Assign Field Crew & Start Work</span>
              </button>

              <button
                type="button"
                onClick={() => handleStatusUpdate('Resolved')}
                className="w-full h-9 px-3 bg-green-700 text-white rounded text-xs font-semibold hover:bg-green-800 transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">task_alt</span>
                <span>Sign Off as Resolved</span>
              </button>

              <button
                type="button"
                onClick={() => handleStatusUpdate('Escalated')}
                className="w-full h-9 px-3 bg-red-100 text-red-800 border border-red-200 rounded text-xs font-semibold hover:bg-red-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">priority_high</span>
                <span>Escalate to Municipal Commissioner</span>
              </button>
            </div>

            {/* Remark appending */}
            <div className="mt-space-md pt-space-md border-t border-surface-container">
              <label className="block text-[11px] font-semibold text-on-surface-variant uppercase mb-1">
                Append Field Dispatch Note / Remark
              </label>
              <textarea
                rows={3}
                value={newRemark}
                onChange={(e) => setNewRemark(e.target.value)}
                placeholder="Log internal field inspection remarks or crew notes..."
                className="w-full p-2 text-xs bg-surface border border-outline-variant rounded focus:outline-none focus:border-primary text-on-surface"
              />
            </div>
          </div>

          {/* Citizen Contact Dossier */}
          <div className="bg-surface-container-lowest border border-surface-container rounded p-space-md shadow-xs text-xs space-y-space-sm">
            <h3 className="font-bold text-on-surface uppercase font-label-sm tracking-wider">
              Citizen Complainant
            </h3>

            <div className="space-y-1 text-on-surface-variant">
              <div>Name: <strong className="text-on-surface">{complaint.citizenName}</strong></div>
              <div>Email: <strong className="text-on-surface">{complaint.citizenEmail}</strong></div>
              <div>Contact: <strong className="text-on-surface">{complaint.contactPhone}</strong></div>
              <div>Author Status: <span className="text-green-700 font-semibold">{complaint.isCitizenAuthor ? 'Verified Resident' : 'Anonymous Report'}</span></div>
            </div>
          </div>

          {/* GIS Location Details */}
          <div className="bg-surface-container-lowest border border-surface-container rounded p-space-md shadow-xs text-xs space-y-space-sm">
            <h3 className="font-bold text-on-surface uppercase font-label-sm tracking-wider">
              Solapur GIS Grid Telemetry
            </h3>

            <div className="space-y-1 text-on-surface-variant">
              <div>Ward: <strong className="text-on-surface">{complaint.ward}</strong></div>
              <div>Address: <strong className="text-on-surface">{complaint.address}</strong></div>
              <div>Latitude: <span className="font-mono">{complaint.coordinates?.lat || 17.6599}° N</span></div>
              <div>Longitude: <span className="font-mono">{complaint.coordinates?.lng || 75.9064}° E</span></div>
              <div>SLA Target: <strong className="text-on-surface">{complaint.sla}</strong></div>
              <div>Time Elapsed: <span className="font-mono">{complaint.timeElapsed}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
