import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CATEGORIES, WARDS } from '../../data/mockData';
import { ComplaintService } from '../../services/complaintService';

export default function ReportIssuePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prefillCat = searchParams.get('category');

  // Form State
  const [title, setTitle] = useState('Severe road crater causing vehicle skids on Navi Peth Main');
  const [category, setCategory] = useState(prefillCat || 'roads');
  const [severity, setSeverity] = useState('urgent');
  const [description, setDescription] = useState(
    'Deep crater approximately 1.5 meters wide with exposed reinforced rebar right at the turn near the municipal library. Several two-wheelers have skidded during evening hours. Immediate road patching or barricade needed.'
  );
  const [ward, setWard] = useState('ward_14_navi_peth');
  const [address, setAddress] = useState('Opposite City Central Library, near Old Bus Stand Junction');
  const [coordinates, setCoordinates] = useState({ lat: 17.6599, lng: 75.9064 });
  const [pinPosition, setPinPosition] = useState({ top: 52, left: 48 });
  const [photo, setPhoto] = useState('/images/issue-pothole.webp');
  const [photoName, setPhotoName] = useState('pothole_evidence_solapur.jpg');
  const [identityMode, setIdentityMode] = useState('auth');
  const [phone, setPhone] = useState('+91 98220 12345');
  const [isPublic, setIsPublic] = useState(true);

  // UI Feedback States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedComplaint, setSubmittedComplaint] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (prefillCat) {
      setCategory(prefillCat);
      const catObj = CATEGORIES.find(c => c.id === prefillCat);
      if (catObj) {
        setPhoto(catObj.image);
        setPhotoName(`${prefillCat}_evidence_solapur.jpg`);
      }
    }
  }, [prefillCat]);

  // Handle category change and auto-suggest image preview
  const handleCategoryChange = (e) => {
    const newCat = e.target.value;
    setCategory(newCat);
    const catObj = CATEGORIES.find(c => c.id === newCat);
    if (catObj) {
      setPhoto(catObj.image);
      setPhotoName(`${newCat}_evidence_solapur.jpg`);
    }
  };

  // Interactive GIS Pin Placement
  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const leftPct = Math.round((x / rect.width) * 100);
    const topPct = Math.round((y / rect.height) * 100);

    setPinPosition({ top: topPct, left: leftPct });

    // Derive simulated realistic Solapur coordinates
    const newLat = 17.6500 + (topPct / 100) * 0.025;
    const newLng = 75.8950 + (leftPct / 100) * 0.025;
    setCoordinates({ lat: Number(newLat.toFixed(4)), lng: Number(newLng.toFixed(4)) });
  };

  const simulateGPSDetection = () => {
    setCoordinates({ lat: 17.6599, lng: 75.9064 });
    setPinPosition({ top: 52, left: 48 });
    showToast('GPS Lock Confirmed: Solapur Central (Accuracy ±3.2m)');
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
      showToast('Photo evidence attached and EXIF metadata verified');
    }
  };

  const removePhoto = () => {
    setPhoto('');
    setPhotoName('');
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const selectedCategoryObj = CATEGORIES.find(c => c.id === category) || CATEGORIES[0];
    const selectedWardObj = WARDS.find(w => w.id === ward) || WARDS[0];

    setTimeout(() => {
      const created = ComplaintService.submitComplaint({
        title,
        categoryName: selectedCategoryObj.name,
        categoryId: category,
        wardName: selectedWardObj.name,
        wardId: ward,
        address,
        coordinates,
        severity: severity === 'urgent' ? 'Urgent/Hazard' : severity === 'medium' ? 'Medium' : 'Low',
        description,
        identityMode,
        contactPhone: phone,
        photo: photo || selectedCategoryObj.image,
        isPublic
      });

      setIsSubmitting(false);
      setSubmittedComplaint(created);
    }, 600);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Progress & Header Context Strip */}
      <div className="w-full bg-surface-container-low px-gutter-desktop py-space-md shadow-sm border-b border-surface-container">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            <span className="px-space-sm py-space-xs bg-primary text-on-primary font-label-sm text-label-sm rounded uppercase tracking-wider font-semibold">
              CIVIC-INTAKE-FORM
            </span>
            <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <span>Triage Node:</span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                Solapur Municipal Hub #04
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-lg">
            <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-primary">
                verified_user
              </span>
              <span>Encrypted Submission via Citizen Ledger</span>
            </div>
            <div className="hidden lg:flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <span>Est. Dispatch Latency:</span>
              <span className="font-label-md text-label-md text-primary font-bold">
                ~18 mins
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="w-full max-w-[1600px] mx-auto px-gutter-desktop py-space-xl">
        {/* Title Hierarchy Section */}
        <div className="flex flex-col mb-space-xl">
          <div className="flex items-center gap-space-xs mb-space-xs">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">
              Step 01 • Direct Municipal Intake
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mb-space-xs">
            Report a Civic Issue
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
            Provide accurate details and location to route your complaint directly to the relevant municipal maintenance department in Solapur.
          </p>
        </div>

        {/* Grid Container: 8 Col Form + 4 Col Context/SLA Aside */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Left Column: Form Core (8 Cols) */}
          <form onSubmit={handleSubmit} className="lg:col-span-8 flex flex-col gap-space-xl">
            {/* SECTION A: ISSUE DETAILS */}
            <div className="bg-surface-container-lowest p-space-lg rounded shadow-sm flex flex-col gap-space-md border border-surface-container">
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <span className="w-6 h-6 rounded bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold">
                    A
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    Issue Details
                  </h2>
                </div>
                <span className="font-label-sm text-label-sm text-error bg-error-container/40 px-space-sm py-space-xs rounded uppercase font-bold">
                  Mandatory Fields
                </span>
              </div>

              {/* Issue Title */}
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="issue-title">
                  Issue Title <span className="text-error">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-secondary text-[18px]">
                    edit_note
                  </span>
                  <input
                    id="issue-title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Severe road damage on Main Street"
                    className="w-full h-10 pl-10 pr-space-md bg-surface text-on-surface font-body-md text-body-md rounded focus:outline-none focus:ring-2 focus:ring-primary border border-surface-container shadow-inner"
                  />
                </div>
              </div>

              {/* Category & Severity Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="issue-category">
                    Municipal Category <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="issue-category"
                      required
                      value={category}
                      onChange={handleCategoryChange}
                      className="w-full h-10 px-space-md bg-surface text-on-surface font-body-md text-body-md rounded focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer border border-surface-container"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                      <option value="other">Other Uncategorized Defect</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-2.5 pointer-events-none text-secondary text-[18px]">
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Severity / Hazard Priority */}
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-md text-label-md text-on-surface font-semibold">
                    Severity / Hazard Priority <span className="text-error">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-space-xs h-10">
                    <button
                      type="button"
                      onClick={() => setSeverity('low')}
                      className={`flex items-center justify-center font-label-sm text-label-sm rounded uppercase transition-colors font-semibold border ${
                        severity === 'low'
                          ? 'bg-primary text-on-primary border-primary'
                          : 'bg-surface text-on-surface-variant hover:bg-surface-container border-surface-container'
                      }`}
                    >
                      Low
                    </button>
                    <button
                      type="button"
                      onClick={() => setSeverity('medium')}
                      className={`flex items-center justify-center font-label-sm text-label-sm rounded uppercase transition-colors font-semibold border ${
                        severity === 'medium'
                          ? 'bg-primary text-on-primary border-primary'
                          : 'bg-surface text-on-surface-variant hover:bg-surface-container border-surface-container'
                      }`}
                    >
                      Medium
                    </button>
                    <button
                      type="button"
                      onClick={() => setSeverity('urgent')}
                      className={`flex items-center justify-center font-label-sm text-label-sm rounded uppercase transition-colors font-semibold border ${
                        severity === 'urgent'
                          ? 'bg-error text-on-error border-error shadow-sm'
                          : 'bg-surface text-on-surface-variant hover:bg-surface-container border-surface-container'
                      }`}
                    >
                      Urgent/Hazard
                    </button>
                  </div>
                </div>
              </div>

              {/* Issue Description & Counter */}
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="issue-description">
                    Technical Description & Ground Hazards <span className="text-error">*</span>
                  </label>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {description.length} / 500 characters
                  </span>
                </div>
                <textarea
                  id="issue-description"
                  required
                  rows={4}
                  maxLength={500}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the defect dimensions, obstruction type, duration of damage, or immediate hazards to pedestrian and vehicular traffic..."
                  className="w-full p-space-md bg-surface text-on-surface font-body-md text-body-md rounded focus:outline-none focus:ring-2 focus:ring-primary resize-y border border-surface-container"
                />
              </div>
            </div>

            {/* SECTION B: LOCATION VERIFICATION */}
            <div className="bg-surface-container-lowest p-space-lg rounded shadow-sm flex flex-col gap-space-md border border-surface-container">
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <span className="w-6 h-6 rounded bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold">
                    B
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    Location Verification
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={simulateGPSDetection}
                  className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm rounded transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    my_location
                  </span>
                  <span>Detect My Current Location</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                {/* City (Locked) */}
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-md text-label-md text-on-surface font-semibold">
                    Municipal Jurisdiction (City)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value="Solapur (MH-13 Demo City)"
                      className="w-full h-10 px-space-md bg-surface-container-low text-on-surface font-body-md text-body-md rounded cursor-not-allowed border border-surface-container text-opacity-80 font-medium"
                    />
                    <span className="material-symbols-outlined absolute right-3 top-2.5 text-secondary text-[18px]">
                      lock
                    </span>
                  </div>
                </div>

                {/* Ward/Locality */}
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="locality-ward">
                    Ward / Administrative Sector <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="locality-ward"
                      required
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                      className="w-full h-10 px-space-md bg-surface text-on-surface font-body-md text-body-md rounded focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer border border-surface-container"
                    >
                      {WARDS.map((w) => (
                        <option key={w.id} value={w.id}>
                          {w.name}
                        </option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-2.5 pointer-events-none text-secondary text-[18px]">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>

              {/* Street Address */}
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="street-address">
                  Street Address / Nearby Physical Landmark <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-[18px]">
                    pin_drop
                  </span>
                  <input
                    id="street-address"
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Opposite City Library, near Bus Stop"
                    className="w-full h-10 pl-10 pr-space-md bg-surface text-on-surface font-body-md text-body-md rounded focus:outline-none focus:ring-2 focus:ring-primary border border-surface-container"
                  />
                </div>
              </div>

              {/* Interactive GIS Spatial Coordinate Picker */}
              <div className="flex flex-col gap-space-xs pt-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Spatial Coordinate Picker (Click map to position pin)
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface bg-surface-container px-space-sm py-0.5 rounded font-mono font-semibold">
                    Lat: {coordinates.lat}° N, Long: {coordinates.lng}° E
                  </span>
                </div>

                {/* Map View Canvas with GIS styling grid */}
                <div
                  onClick={handleMapClick}
                  className="relative w-full h-64 bg-surface-container rounded overflow-hidden cursor-crosshair shadow-inner border border-surface-container-high group"
                >
                  {/* Grid background simulation */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000d_1px,transparent_1px),linear-gradient(to_bottom,#0000000d_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

                  {/* Solapur Urban Center Road Lines Simulation */}
                  <svg className="absolute inset-0 w-full h-full text-surface-container-highest opacity-70 pointer-events-none" fill="none">
                    <path d="M 0,130 C 140,110 320,180 500,140 S 700,90 850,110" stroke="currentColor" strokeWidth="6" />
                    <path d="M 280,0 C 290,100 310,200 330,300" stroke="currentColor" strokeWidth="4" />
                    <circle cx="310" cy="150" r="32" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
                  </svg>

                  {/* HUD Elements */}
                  <div className="absolute top-3 left-3 bg-surface-container-lowest/90 px-space-sm py-1 rounded backdrop-blur font-label-sm text-label-sm text-on-surface flex items-center gap-space-xs pointer-events-none border border-surface-container shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span>GIS QUADRANT: SOL-NW-14B</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-surface-container-lowest/90 px-space-sm py-1 rounded backdrop-blur font-label-sm text-label-sm text-on-surface pointer-events-none border border-surface-container shadow-xs">
                    Elevation: 458m • Accuracy: ±3.2m
                  </div>

                  {/* Repositionable Pin Indicator */}
                  <div
                    className="absolute -translate-x-1/2 -translate-y-full transition-all duration-200 pointer-events-none z-10"
                    style={{ top: `${pinPosition.top}%`, left: `${pinPosition.left}%` }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="px-space-xs py-0.5 bg-primary text-on-primary font-label-sm text-[10px] rounded mb-1 shadow whitespace-nowrap font-bold">
                        INCIDENT LOCUS
                      </div>
                      <span className="material-symbols-outlined text-[36px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                        location_on
                      </span>
                      <div className="w-3 h-1 bg-on-surface/40 rounded-full blur-[1px]" />
                    </div>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Tip: Tap anywhere on the GIS grid to adjust exact maintenance dispatch coordinates.
                </p>
              </div>
            </div>

            {/* SECTION C: PHOTO EVIDENCE & VERIFICATION */}
            <div className="bg-surface-container-lowest p-space-lg rounded shadow-sm flex flex-col gap-space-md border border-surface-container">
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <span className="w-6 h-6 rounded bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold">
                    C
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    Photo Evidence & Verification
                  </h2>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Direct Ground Inspection Proof
                </span>
              </div>

              {/* Drag and Drop Zone */}
              <label className="w-full p-space-xl bg-surface-container-low hover:bg-surface-container rounded flex flex-col items-center justify-center gap-space-sm text-center transition-colors cursor-pointer group border border-dashed border-outline-variant">
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-surface-container-high transition-colors">
                  <span className="material-symbols-outlined text-primary text-[28px]">
                    cloud_upload
                  </span>
                </div>
                <div className="flex flex-col">
                  <p className="font-label-md text-label-md text-on-surface font-semibold">
                    Drop complaint photo here or <span className="underline text-primary">Browse files</span>
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Supported formats: WebP, PNG, JPG (maximum 10MB per file)
                  </p>
                </div>
              </label>

              {/* Attached Photo Thumbnail Container */}
              {photo && (
                <div className="p-space-md bg-surface-container-low rounded flex items-center justify-between gap-space-md border border-surface-container">
                  <div className="flex items-center gap-space-md min-w-0">
                    <div className="w-16 h-16 rounded overflow-hidden shrink-0 bg-surface-container border border-surface-container-high">
                      <img
                        src={photo}
                        alt="Issue Evidence Proof"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                        {photoName || 'evidence_proof.webp'}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        High Resolution EXIF Validated
                      </span>
                      <span className="font-label-sm text-label-sm text-primary flex items-center gap-1 mt-0.5 font-semibold">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        Geotag Matched
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="px-space-sm py-1 bg-surface-container hover:bg-error hover:text-on-error text-on-surface font-label-sm text-label-sm rounded transition-colors flex items-center gap-1 shrink-0 font-medium"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                    <span>Remove</span>
                  </button>
                </div>
              )}
            </div>

            {/* SECTION D: CITIZEN CONTACT INFO */}
            <div className="bg-surface-container-lowest p-space-lg rounded shadow-sm flex flex-col gap-space-md border border-surface-container">
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <span className="w-6 h-6 rounded bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold">
                    D
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    Citizen Contact & Tracking Credentials
                  </h2>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Accountability Tier
                </span>
              </div>

              {/* Radio Identity Mode */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <label className={`flex items-start gap-space-sm p-space-md rounded cursor-pointer transition-colors border ${
                  identityMode === 'auth' ? 'bg-surface-container border-primary' : 'bg-surface border-surface-container hover:bg-surface-container-low'
                }`}>
                  <input
                    type="radio"
                    name="identity-mode"
                    value="auth"
                    checked={identityMode === 'auth'}
                    onChange={() => setIdentityMode('auth')}
                    className="mt-1 accent-primary"
                  />
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      Submit as logged-in citizen
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Rohit Sharma • rohit.sharma@example.com
                    </span>
                    <span className="font-label-sm text-label-sm text-secondary mt-1 font-medium">
                      Direct escalation SLA updates to registered mailbox
                    </span>
                  </div>
                </label>

                <label className={`flex items-start gap-space-sm p-space-md rounded cursor-pointer transition-colors border ${
                  identityMode === 'anon' ? 'bg-surface-container border-primary' : 'bg-surface border-surface-container hover:bg-surface-container-low'
                }`}>
                  <input
                    type="radio"
                    name="identity-mode"
                    value="anon"
                    checked={identityMode === 'anon'}
                    onChange={() => setIdentityMode('anon')}
                    className="mt-1 accent-primary"
                  />
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      Submit Anonymously
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Stripped metadata & no citizen trace record
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                      Requires saving tracking token manually
                    </span>
                  </div>
                </label>
              </div>

              {/* Mobile Phone for SMS */}
              <div className="flex flex-col gap-space-xs max-w-md">
                <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="contact-phone">
                  Mobile Number for SMS Tracking Dispatches (Optional)
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-[18px]">
                    smartphone
                  </span>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 90000 00000"
                    className="w-full h-10 pl-10 pr-space-md bg-surface text-on-surface font-body-md text-body-md rounded focus:outline-none focus:ring-2 focus:ring-primary border border-surface-container"
                  />
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  You will receive dispatch confirmation and technician resolution OTP.
                </p>
              </div>
            </div>

            {/* SECTION E: PRIVACY & SUBMISSION CONTROLS */}
            <div className="bg-surface-container-lowest p-space-lg rounded shadow-sm flex flex-col gap-space-lg border border-surface-container">
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <span className="w-6 h-6 rounded bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold">
                    E
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    Privacy & Submission Authorization
                  </h2>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Step 5 of 5
                </span>
              </div>

              {/* Public Visibility Checkbox */}
              <label className="flex items-start gap-space-md p-space-md bg-surface-container-low rounded cursor-pointer border border-surface-container">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded accent-primary cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Allow this report to be publicly visible in Community Explorer
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Other citizens in Solapur Central can upvote this issue to accelerate municipal prioritization. Personal identity, email, and phone number remain completely hidden.
                  </p>
                </div>
              </label>

              {/* Final Action Buttons & SLA Consent */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-xs">
                <div className="flex flex-wrap items-center gap-space-sm w-full sm:w-auto">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center h-11 px-space-xl bg-primary text-on-primary hover:bg-[#222222] font-label-md text-label-md rounded tracking-wide transition-colors shadow-sm disabled:opacity-50 font-semibold"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Routing to CAD Dispatch...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[18px] mr-2">send</span>
                        Submit Complaint
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => showToast('Draft saved securely to your browser storage')}
                    className="w-full sm:w-auto inline-flex items-center justify-center h-11 px-space-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md rounded transition-colors font-medium"
                  >
                    <span className="material-symbols-outlined text-[18px] mr-1">bookmark</span>
                    Save Draft
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="font-label-md text-label-md text-on-surface-variant hover:text-error transition-colors px-space-sm py-2"
                >
                  Cancel & Discard
                </button>
              </div>
            </div>
          </form>

          {/* Right Column: Municipal Intelligence Aside (4 Cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-space-lg sticky top-20">
            {/* Live Intake Status Box */}
            <div className="bg-surface-container-lowest p-space-lg rounded shadow-sm flex flex-col gap-space-md border border-surface-container">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                  Dispatcher Status
                </span>
                <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-on-surface bg-surface-container px-2 py-0.5 rounded font-semibold">
                  <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim" /> ACTIVE SHIFT
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Solapur Municipal Corporation
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Ward 14 Road Maintenance Desk
                </h3>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
                <div className="p-space-sm bg-surface-container-low rounded border border-surface-container/60">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase block font-semibold">
                    Resolved Today
                  </span>
                  <span className="font-tabular-stat text-tabular-stat text-on-surface">38</span>
                  <span className="font-label-sm text-label-sm text-on-secondary-container bg-secondary-container px-1.5 py-0.5 rounded block mt-1 w-fit font-bold">
                    94.2% on SLA
                  </span>
                </div>
                <div className="p-space-sm bg-surface-container-low rounded border border-surface-container/60">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase block font-semibold">
                    Queue Pending
                  </span>
                  <span className="font-tabular-stat text-tabular-stat text-on-surface">12</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant block mt-1">
                    Normal load
                  </span>
                </div>
              </div>
            </div>

            {/* Municipal SLA Commitment Card */}
            <div className="bg-surface-container-lowest p-space-lg rounded shadow-sm flex flex-col gap-space-md border border-surface-container">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[20px]">schedule</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Estimated Resolution SLAs
                </h3>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Based on Solapur Civic Charter guidelines for category and priority levels.
              </p>
              <div className="flex flex-col gap-space-sm">
                <div className="p-space-sm bg-surface-container-low rounded flex items-center justify-between border border-surface-container/60">
                  <div className="flex items-center gap-space-xs">
                    <span className="w-2 h-2 rounded-full bg-error" />
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      Urgent Road Crater
                    </span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface font-bold">
                    ≤ 24 Hours
                  </span>
                </div>
                <div className="p-space-sm bg-surface-container-low rounded flex items-center justify-between border border-surface-container/60">
                  <div className="flex items-center gap-space-xs">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      Medium Surface Damage
                    </span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface font-bold">
                    ≤ 72 Hours
                  </span>
                </div>
                <div className="p-space-sm bg-surface-container-low rounded flex items-center justify-between border border-surface-container/60">
                  <div className="flex items-center gap-space-xs">
                    <span className="w-2 h-2 rounded-full bg-outline" />
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      Sanitation & Garbage
                    </span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface font-bold">
                    ≤ 12 Hours
                  </span>
                </div>
                <div className="p-space-sm bg-surface-container-low rounded flex items-center justify-between border border-surface-container/60">
                  <div className="flex items-center gap-space-xs">
                    <span className="w-2 h-2 rounded-full bg-outline" />
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      Streetlight Fault
                    </span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface font-bold">
                    ≤ 48 Hours
                  </span>
                </div>
              </div>
            </div>

            {/* Reporting Guidelines */}
            <div className="bg-surface-container-lowest p-space-lg rounded shadow-sm flex flex-col gap-space-md border border-surface-container">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[20px]">gavel</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Citizen Filing Guidelines
                </h3>
              </div>
              <ul className="flex flex-col gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
                <li className="flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">
                    check
                  </span>
                  <span>
                    <strong>Clear Ground Photos:</strong> Capture photos in ambient daylight showing context and landmarks.
                  </span>
                </li>
                <li className="flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">
                    check
                  </span>
                  <span>
                    <strong>Precise GPS Placement:</strong> Ensure the pin marker matches the exact curb coordinate.
                  </span>
                </li>
                <li className="flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">
                    check
                  </span>
                  <span>
                    <strong>Duplicate Prevention:</strong> If a ticket already exists for Navi Peth, upvote it instead of refiling.
                  </span>
                </li>
              </ul>
              <div className="mt-space-xs pt-space-sm border-t border-surface-container flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                <span>Audit Protocol: IEEE-730</span>
                <button
                  type="button"
                  onClick={() => showToast('Opening Municipal SLA Charter PDF...')}
                  className="text-primary hover:underline font-semibold"
                >
                  Read SLA Terms →
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Submission Success Confirmation Modal */}
      {submittedComplaint && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-xl shadow-2xl border border-surface-container p-space-xl flex flex-col items-center text-center animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center mb-space-md shadow-md">
              <span className="material-symbols-outlined text-[32px]">task_alt</span>
            </div>

            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
              Dispatch Successfully Registered
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface mt-1">
              Grievance Dossier Created
            </h2>

            <div className="my-space-md p-space-md bg-surface-container-low rounded-lg w-full text-left space-y-1.5 border border-surface-container">
              <div className="flex items-center justify-between">
                <span className="text-xs text-on-surface-variant uppercase font-semibold">Complaint Reference:</span>
                <span className="font-mono text-base font-bold text-primary">{submittedComplaint.ref}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-on-surface-variant uppercase font-semibold">Assigned Ward:</span>
                <span className="text-xs font-semibold text-on-surface">{submittedComplaint.ward}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-on-surface-variant uppercase font-semibold">Department:</span>
                <span className="text-xs font-semibold text-on-surface">{submittedComplaint.dept}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-on-surface-variant uppercase font-semibold">Target SLA:</span>
                <span className="text-xs font-bold text-error">{submittedComplaint.sla}</span>
              </div>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg leading-relaxed">
              Your grievance has been encrypted and appended to the Solapur Municipal Dispatch Queue. An automated SMS alert has been scheduled.
            </p>

            <div className="flex flex-col sm:flex-row gap-space-sm w-full">
              <button
                type="button"
                onClick={() => navigate(`/track?ref=${submittedComplaint.ref}`)}
                className="flex-1 h-11 bg-primary text-on-primary hover:bg-[#222222] rounded font-label-md text-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
                <span>Track This Ticket Now</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/explore')}
                className="flex-1 h-11 bg-surface-container hover:bg-surface-container-high rounded font-label-md text-sm font-semibold text-on-surface"
              >
                View in Explorer
              </button>
            </div>
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
