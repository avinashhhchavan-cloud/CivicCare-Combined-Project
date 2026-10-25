export const CATEGORIES = [
  {
    id: "roads",
    name: "Roads & Potholes",
    slug: "roads-and-potholes",
    icon: "traffic",
    sla: "48h",
    slaHours: 48,
    description: "Surface cratering, asphalt degradation, broken medians, and illegal road cuts.",
    image: "/images/issue-pothole.webp",
    dept: "Municipal Public Works Department (Road Maintenance Division)"
  },
  {
    id: "garbage",
    name: "Garbage & Sanitation",
    slug: "garbage-and-sanitation",
    icon: "delete",
    sla: "24h",
    slaHours: 24,
    description: "Overflowing community bins, uncollected residential waste, and street sweeping gaps.",
    image: "/images/issue-garbage.webp",
    dept: "Municipal Solid Waste Management & Health Dept"
  },
  {
    id: "water",
    name: "Water Leakage & Supply",
    slug: "water-leakage-and-supply",
    icon: "water_drop",
    sla: "36h",
    slaHours: 36,
    description: "Pipeline bursts, contaminated water lines, low pressure zones, and valve defects.",
    image: "/images/issue-water-leakage.webp",
    dept: "Solapur Municipal Water Supply & Sewerage Board"
  },
  {
    id: "streetlights",
    name: "Streetlights & Electrical",
    slug: "streetlights-and-electrical",
    icon: "light",
    sla: "18h",
    slaHours: 18,
    description: "Outages, exposed wiring, flickering luminaires, and damaged high-voltage poles.",
    image: "/images/issue-streetlight.webp",
    dept: "Solapur City Electricity Utility (Lighting Grid Division)"
  },
  {
    id: "drainage",
    name: "Drainage & Sewage",
    slug: "drainage-and-sewage",
    icon: "waves",
    sla: "30h",
    slaHours: 30,
    description: "Clogged storm water canals, overflowing manholes, and hazardous road waterlogging.",
    image: "/images/issue-drainage.webp",
    dept: "Drainage Infrastructure & Canal Operations"
  },
  {
    id: "infrastructure",
    name: "Public Infrastructure",
    slug: "public-infrastructure",
    icon: "domain",
    sla: "72h",
    slaHours: 72,
    description: "Damaged bus shelters, compromised sidewalk pavers, pedestrian guardrail collapse.",
    image: "/images/issue-public-infrastructure.webp",
    dept: "Town Planning & Pedestrian Infrastructure Directorate"
  }
];

export const WARDS = [
  { id: "ward_14_navi_peth", name: "Navi Peth (Zone 2 - Ward 14)", zone: "Zone 2" },
  { id: "ward_14_central", name: "Central Ward 14", zone: "Zone 1" },
  { id: "ward_08_railway", name: "Railway Lines Administrative Zone (Ward 08)", zone: "Zone 3" },
  { id: "ward_22_jule", name: "Jule Solapur Sector 4 (Ward 22)", zone: "Zone 4" },
  { id: "ward_05_bhavani", name: "Bhavani Peth Market Sector (Ward 05)", zone: "Zone 1" },
  { id: "ward_19_ashok", name: "Ashok Nagar (Ward 19)", zone: "Zone 2" },
  { id: "ward_03_market", name: "Market Yard Commercial Zone (Ward 03)", zone: "Zone 3" },
  { id: "ward_11_saat_rasta", name: "Saat Rasta Transit Hub (Ward 11)", zone: "Zone 1" }
];

export const INITIAL_COMPLAINTS = [
  {
    id: "CC-2026-0841",
    ref: "CC-2026-0841",
    title: "Deep Pothole & Damaged Asphalt Surface",
    category: "Roads & Potholes",
    categoryId: "roads",
    ward: "Solapur Central (Ward 14)",
    wardId: "ward_14_central",
    address: "Opposite City Central Library, near Old Bus Stand Junction",
    coordinates: { lat: 17.6599, lng: 75.9064 },
    severity: "Urgent/Hazard",
    status: "In Progress",
    dateFiled: "Oct 24, 2026, 09:15 AM",
    dept: "Municipal Public Works Department (Road Maintenance Division)",
    sla: "Oct 27, 2026 (72h SLA)",
    slaHoursLeft: 34,
    timeElapsed: "22h / 72h max",
    wardAverage: "41.8h",
    activeStep: 3,
    upvotes: 42,
    hasUpvoted: false,
    isPublic: true,
    isCitizenAuthor: true,
    citizenName: "Rohit Sharma",
    citizenEmail: "rohit.sharma@example.com",
    contactPhone: "+91 98220 12345",
    photo: "/images/issue-pothole.webp",
    description: "Deep crater approximately 1.5 meters wide with exposed reinforced rebar right at the turn near the municipal library. Several two-wheelers have skidded during evening hours. Immediate road patching or barricade needed.",
    fieldNote: '"Asphalt cold mix and steamroller allocated. Patching work scheduled for completion by 18:00 today. Traffic diversions in place on Ward 14 Westbound Lane."',
    officer: "Engr. K. Patil, Road Works Superintendent",
    workOrder: "#WO-4921",
    steps: [
      {
        step: 1,
        title: "Complaint Submitted",
        time: "Oct 24, 09:15 AM",
        desc: "Complaint registered by citizen with GPS coordinates and photographic evidence. Unique telemetry ID hash CC-2026-0841 appended.",
        details: "GPS: 17.6599° N, 75.9064° E",
        completed: true
      },
      {
        step: 2,
        title: "Under Review & Triage",
        time: "Oct 24, 11:30 AM",
        desc: "Verified by CivicCare Ward Officer. Categorized as High Priority Road Hazard due to vehicular lane encroachment and moisture accumulation.",
        details: "Reviewer: Officer S. Kulkarni • Priority: High",
        completed: true
      },
      {
        step: 3,
        title: "Assigned & In Progress",
        time: "Oct 25, 08:00 AM",
        desc: "Work order #WO-4921 issued to Junior Engineer K. Patil. Repair crew dispatched with specialized asphalt compaction equipment.",
        details: "Team Lead: Engr. K. Patil (PW-Div-4) • Crew On-Site",
        current: true,
        completed: false
      },
      {
        step: 4,
        title: "Resolved & Closed",
        time: "Pending Field Sign-Off",
        desc: "Awaiting field supervisor sign-off and before/after verification upload. Final citizen feedback trigger queued.",
        details: "Target Clearance SLA: Oct 27, 2026",
        completed: false
      }
    ]
  },
  {
    id: "CC-2026-0839",
    ref: "CC-2026-0839",
    title: "Broken Streetlamp Array & Exposed Wire Hazard",
    category: "Streetlights & Electrical",
    categoryId: "streetlights",
    ward: "Navi Peth (Ward 07)",
    wardId: "ward_14_navi_peth",
    address: "Subhash Chowk, near Post Office Junction",
    coordinates: { lat: 17.6712, lng: 75.9125 },
    severity: "Medium",
    status: "Resolved",
    dateFiled: "Oct 22, 2026, 07:40 PM",
    dept: "Solapur City Electricity Utility (Lighting Grid Division)",
    sla: "Resolved within 24 Hours",
    slaHoursLeft: 0,
    timeElapsed: "18h / 24h max",
    wardAverage: "22.4h",
    activeStep: 4,
    upvotes: 18,
    hasUpvoted: false,
    isPublic: true,
    isCitizenAuthor: false,
    citizenName: "Pooja Deshmukh",
    citizenEmail: "pooja.d@example.com",
    contactPhone: "+91 98223 99881",
    photo: "/images/issue-streetlight.webp",
    description: "Municipal streetlight luminaire casing cracked with hanging bulb and loose live electrical wiring at pedestrian height near bus shelter.",
    fieldNote: '"LED fixture replaced, terminal junction insulated and weatherproofed. Luminance test passed at 45 lux."',
    officer: "Senior Wireman D. Rao, Power Grid",
    workOrder: "#WO-4889",
    steps: [
      {
        step: 1,
        title: "Complaint Submitted",
        time: "Oct 22, 07:40 PM",
        desc: "Night patrol citizen complaint filed with street photo.",
        details: "Telemetry ID CC-2026-0839",
        completed: true
      },
      {
        step: 2,
        title: "Triage & Wire Safety Inspection",
        time: "Oct 22, 08:15 PM",
        desc: "Electrical feed isolated to eliminate electrocution risk.",
        details: "Safety Isolation Confirmed",
        completed: true
      },
      {
        step: 3,
        title: "Component Replacement Dispatched",
        time: "Oct 23, 09:30 AM",
        desc: "Bucket truck dispatched with replacement 90W LED luminaire.",
        details: "Crew: Solapur Electric Maintenance",
        completed: true
      },
      {
        step: 4,
        title: "Resolved & Closed",
        time: "Oct 23, 01:40 PM",
        desc: "Luminance verified at 45 lux. Case signed off by citizen and municipal inspector.",
        details: "Closure SLA: 18 Hours (Within SLA)",
        completed: true
      }
    ]
  },
  {
    id: "CC-2026-0792",
    ref: "CC-2026-0792",
    title: "Overflowing Garbage Skips & Drainage Blockage",
    category: "Garbage & Sanitation",
    categoryId: "garbage",
    ward: "Ashok Nagar (Ward 19)",
    wardId: "ward_19_ashok",
    address: "Behind Vegetable Mandi, Ashok Chowk",
    coordinates: { lat: 17.6541, lng: 75.9018 },
    severity: "High",
    status: "Under Review",
    dateFiled: "Oct 25, 2026, 06:10 AM",
    dept: "Municipal Solid Waste Management & Health Dept",
    sla: "Oct 28, 2026 (Under Assessment)",
    slaHoursLeft: 16,
    timeElapsed: "4h / 24h max",
    wardAverage: "19.5h",
    activeStep: 2,
    upvotes: 29,
    hasUpvoted: false,
    isPublic: true,
    isCitizenAuthor: false,
    citizenName: "Amit Joshi",
    citizenEmail: "amit.j@example.com",
    contactPhone: "+91 94220 54321",
    photo: "/images/issue-garbage.webp",
    description: "Overflowing commercial refuse bins on curb blocking stormwater flow. Stray cattle and odor causing significant inconvenience to local shops.",
    fieldNote: '"Initial site inspection queued for morning route. Sanitary Inspector visiting site at 11:00 AM."',
    officer: "Inspector V. Shinde, Health Inspectorate",
    workOrder: "#WO-4935",
    steps: [
      {
        step: 1,
        title: "Complaint Submitted",
        time: "Oct 25, 06:10 AM",
        desc: "Citizen uploaded photographic evidence of overflowing municipal bin.",
        details: "GPS: 17.6541° N, 75.9018° E",
        completed: true
      },
      {
        step: 2,
        title: "Under Review & Sanitary Triage",
        time: "Oct 25, 07:30 AM",
        desc: "Sanitary inspector assigned to assess waste tonnage and compaction loader requirement.",
        details: "Reviewer: Inspector V. Shinde",
        current: true,
        completed: false
      },
      {
        step: 3,
        title: "Compactor Truck Dispatch",
        time: "Queued for 11:30 AM",
        desc: "Sanitation vehicle route rerouted to empty community skips and disinfect perimeter.",
        details: "Fleet ID: COMP-09",
        completed: false
      },
      {
        step: 4,
        title: "Resolved & Closed",
        time: "Pending",
        desc: "Post-clearance photo verification required.",
        details: "Target SLA: Today, 18:00",
        completed: false
      }
    ]
  },
  {
    id: "CC-2026-0750",
    ref: "CC-2026-0750",
    title: "Major Drinking Water Pipeline Rupture Flooding Footpath",
    category: "Water Leakage & Supply",
    categoryId: "water",
    ward: "Railway Lines Administrative Zone (Ward 08)",
    wardId: "ward_08_railway",
    address: "Station Road opposite Goods Shed Gate 2",
    coordinates: { lat: 17.6625, lng: 75.9042 },
    severity: "Urgent/Hazard",
    status: "In Progress",
    dateFiled: "Oct 24, 2026, 02:30 PM",
    dept: "Solapur Municipal Water Supply & Sewerage Board",
    sla: "Oct 26, 2026 (36h SLA)",
    slaHoursLeft: 12,
    timeElapsed: "19h / 36h max",
    wardAverage: "28.1h",
    activeStep: 3,
    upvotes: 35,
    hasUpvoted: false,
    isPublic: true,
    isCitizenAuthor: true,
    citizenName: "Rohit Sharma",
    citizenEmail: "rohit.sharma@example.com",
    contactPhone: "+91 98220 12345",
    photo: "/images/issue-water-leakage.webp",
    description: "Main cast iron supply collar fractured. High pressure clean drinking water gushing onto sidewalk and pooling onto vehicle carriageway.",
    fieldNote: '"Main supply gate valve throttled to prevent road foundation erosion. Trenching crew active with replacement collar."',
    officer: "Asst. Engineer M. Deshmukh, Water Works",
    workOrder: "#WO-4912",
    steps: [
      {
        step: 1,
        title: "Complaint Submitted",
        time: "Oct 24, 02:30 PM",
        desc: "Filed by citizen with high-resolution photo evidence of water line breach.",
        details: "GPS: 17.6625° N, 75.9042° E",
        completed: true
      },
      {
        step: 2,
        title: "Valve Throttling & Pressure Control",
        time: "Oct 24, 03:45 PM",
        desc: "Emergency hydraulic valve shut to curb drinking water wastage.",
        details: "Engineer M. Deshmukh",
        completed: true
      },
      {
        step: 3,
        title: "Excavation & Pipe Sleeve Fitting",
        time: "Oct 25, 09:00 AM",
        desc: "Excavation underway to install heavy-gauge mechanical coupling.",
        details: "Crew: Water Works Rapid Response",
        current: true,
        completed: false
      },
      {
        step: 4,
        title: "Pressure Testing & Backfill",
        time: "Pending",
        desc: "Water line pressure verification and road trench backfilling.",
        details: "Target SLA: Oct 26, 12:00 PM",
        completed: false
      }
    ]
  },
  {
    id: "CC-2026-0715",
    ref: "CC-2026-0715",
    title: "Blocked Stormwater Culvert Causing Roadway Waterlogging",
    category: "Drainage & Sewage",
    categoryId: "drainage",
    ward: "Bhavani Peth Market Sector (Ward 05)",
    wardId: "ward_05_bhavani",
    address: "Cloth Merchant Lane, near Ghadial Chowk",
    coordinates: { lat: 17.6745, lng: 75.9189 },
    severity: "Medium",
    status: "In Progress",
    dateFiled: "Oct 23, 2026, 11:15 AM",
    dept: "Drainage Infrastructure & Canal Operations",
    sla: "Oct 26, 2026 (30h SLA)",
    slaHoursLeft: 6,
    timeElapsed: "24h / 30h max",
    wardAverage: "31.2h",
    activeStep: 3,
    upvotes: 22,
    hasUpvoted: false,
    isPublic: true,
    isCitizenAuthor: false,
    citizenName: "Sunil Mane",
    citizenEmail: "sunil.mane@example.com",
    contactPhone: "+91 97654 32100",
    photo: "/images/issue-drainage.webp",
    description: "Heavy silt and plastic debris jammed in roadside concrete drain grate causing stagnant water backup in front of commercial shops.",
    fieldNote: '"Suction jetting machine deployed to clear compressed silt blockage. 60% flow restored."',
    officer: "Sanitation Supervisor G. Pawar",
    workOrder: "#WO-4902",
    steps: [
      {
        step: 1,
        title: "Complaint Submitted",
        time: "Oct 23, 11:15 AM",
        desc: "Registered with landmark location opposite Ghadial Chowk.",
        details: "GPS: 17.6745° N, 75.9189° E",
        completed: true
      },
      {
        step: 2,
        title: "Hydro-Jetting Crew Dispatched",
        time: "Oct 23, 02:00 PM",
        desc: "Site inspected and culvert clearing crew assigned.",
        details: "Supervisor G. Pawar",
        completed: true
      },
      {
        step: 3,
        title: "Culvert Jetting & Silt Removal",
        time: "Oct 24, 10:30 AM",
        desc: "High-pressure water jetting in progress to dislodge underground blockages.",
        details: "Vehicle: JET-VAC-02",
        current: true,
        completed: false
      },
      {
        step: 4,
        title: "Drain Flow Clearance & Inspection",
        time: "Pending",
        desc: "Sign-off on unhindered storm water discharge.",
        details: "Target SLA: Today, 17:00",
        completed: false
      }
    ]
  },
  {
    id: "CC-2026-0688",
    ref: "CC-2026-0688",
    title: "Cracked Sidewalk Pavers and Collapsed Footpath Curb",
    category: "Public Infrastructure",
    categoryId: "infrastructure",
    ward: "Jule Solapur Sector 4 (Ward 22)",
    wardId: "ward_22_jule",
    address: "Near D-Mart Circle, Dnyaneshwar Nagar",
    coordinates: { lat: 17.6420, lng: 75.8921 },
    severity: "Low",
    status: "Resolved",
    dateFiled: "Oct 20, 2026, 04:00 PM",
    dept: "Town Planning & Pedestrian Infrastructure Directorate",
    sla: "Resolved within 72 Hours",
    slaHoursLeft: 0,
    timeElapsed: "46h / 72h max",
    wardAverage: "52.0h",
    activeStep: 4,
    upvotes: 14,
    hasUpvoted: false,
    isPublic: true,
    isCitizenAuthor: false,
    citizenName: "Rajesh Kulkarni",
    citizenEmail: "rajesh.k@example.com",
    contactPhone: "+91 94231 66554",
    photo: "/images/issue-public-infrastructure.webp",
    description: "Pedestrian walkway tiles broken and loosened over 15 meters, creating trip hazards for morning walkers and senior citizens.",
    fieldNote: '"Subgrade re-leveled and 45 square meters of interlocking paver blocks re-installed and compacted with sand joints."',
    officer: "Junior Engineer S. Jadhav",
    workOrder: "#WO-4860",
    steps: [
      {
        step: 1,
        title: "Complaint Submitted",
        time: "Oct 20, 04:00 PM",
        desc: "Citizen report logged with photo of displaced paver tiles.",
        details: "GPS: 17.6420° N, 75.8921° E",
        completed: true
      },
      {
        step: 2,
        title: "Civil Engineering Estimate",
        time: "Oct 21, 10:00 AM",
        desc: "Material requisition issued for new concrete interlocking pavers.",
        details: "JE S. Jadhav",
        completed: true
      },
      {
        step: 3,
        title: "Pavement Laying & Compaction",
        time: "Oct 21, 02:00 PM",
        desc: "Old cracked stones excavated, base leveled and re-tiled.",
        details: "Civil Contractor: Solapur Infra Works",
        completed: true
      },
      {
        step: 4,
        title: "Pedestrian Walkway Reopened",
        time: "Oct 22, 02:00 PM",
        desc: "Inspected by Ward Officer and cleared for public use.",
        details: "Resolved in 46h (Target: 72h)",
        completed: true
      }
    ]
  }
];

export const PLATFORM_STATS = {
  totalComplaints: 14820,
  resolvedComplaints: 12410,
  inProgressComplaints: 1890,
  avgResolutionHours: 42.6,
  resolutionRatePercent: 83.7,
  activeFieldCrews: 38,
  slaCompliancePercent: 94.2,
  triageSpeedMins: 18.4,
  recentResolution: {
    title: "Water Pipeline Main #44",
    time: "Cleared in 3h 12m"
  }
};

export const ANALYTICS_DATA = {
  monthlyTrend: [
    { month: "May", registered: 1120, resolved: 980, pending: 140 },
    { month: "Jun", registered: 1450, resolved: 1220, pending: 230 },
    { month: "Jul", registered: 1980, resolved: 1610, pending: 370 },
    { month: "Aug", registered: 2150, resolved: 1840, pending: 310 },
    { month: "Sep", registered: 1820, resolved: 1690, pending: 130 },
    { month: "Oct", registered: 1482, resolved: 1241, pending: 189 }
  ],
  categoryBreakdown: [
    { name: "Roads & Potholes", value: 4320, percentage: 29.1, color: "#111111" },
    { name: "Garbage & Sanitation", value: 3780, percentage: 25.5, color: "#3a485b" },
    { name: "Water Leakage & Supply", value: 2410, percentage: 16.3, color: "#515f74" },
    { name: "Streetlights & Electrical", value: 2140, percentage: 14.4, color: "#747878" },
    { name: "Drainage & Sewage", value: 1420, percentage: 9.6, color: "#94a3b8" },
    { name: "Public Infrastructure", value: 750, percentage: 5.1, color: "#cbd5e1" }
  ],
  wardGrievanceLoad: [
    { ward: "Ward 14 (Navi Peth)", complaints: 2840, resolved: 2490, rate: "87.6%" },
    { ward: "Ward 08 (Railway Lines)", complaints: 2310, resolved: 1980, rate: "85.7%" },
    { ward: "Ward 22 (Jule Solapur)", complaints: 2190, resolved: 1820, rate: "83.1%" },
    { ward: "Ward 05 (Bhavani Peth)", complaints: 1940, resolved: 1610, rate: "82.9%" },
    { ward: "Ward 19 (Ashok Nagar)", complaints: 1850, resolved: 1540, rate: "83.2%" },
    { ward: "Ward 03 (Market Yard)", complaints: 1620, resolved: 1390, rate: "85.8%" },
    { ward: "Ward 11 (Saat Rasta)", complaints: 1480, resolved: 1290, rate: "87.1%" }
  ],
  slaPerformance: [
    { range: "< 12h", count: 4210, label: "Immediate Rapid Triage" },
    { range: "12-24h", count: 5120, label: "Standard Target SLA" },
    { range: "24-48h", count: 2340, label: "Complex Ground Works" },
    { range: "48-72h", count: 740, label: "Heavy Excavation" },
    { range: "> 72h (Breached)", count: 320, label: "Escalated Review" }
  ]
};

export const CURRENT_USER = {
  id: "user_rohit_01",
  name: "Rohit Sharma",
  email: "rohit.sharma@example.com",
  phone: "+91 98220 12345",
  ward: "Central Ward 14",
  wardId: "ward_14_central",
  city: "Solapur (MH-13)",
  avatarInitials: "RS",
  role: "citizen",
  notifications: [
    {
      id: "notif_1",
      title: "Field Crew On-Site",
      message: "Repair crew dispatched for Pothole report CC-2026-0841 at Navi Peth Main.",
      time: "2 hours ago",
      read: false,
      complaintId: "CC-2026-0841"
    },
    {
      id: "notif_2",
      title: "Ticket Resolved",
      message: "Streetlight fault CC-2026-0839 marked resolved. Please sign off.",
      time: "1 day ago",
      read: true,
      complaintId: "CC-2026-0839"
    },
    {
      id: "notif_3",
      title: "Complaint Acknowledged",
      message: "Water leakage CC-2026-0750 verified by Ward 08 Superintendent.",
      time: "2 days ago",
      read: true,
      complaintId: "CC-2026-0750"
    }
  ]
};

// Aliases for component convenience
export const MUNICIPAL_WARDS = WARDS;
export const CIVIC_CATEGORIES = CATEGORIES;
export const MONTHLY_ANALYTICS = (ANALYTICS_DATA?.monthlyTrend || []).map(m => ({
  month: m.month,
  filed: m.registered,
  resolved: m.resolved,
  pending: m.pending,
}));
export const WARD_GRIEVANCE_DATA = (ANALYTICS_DATA?.wardGrievanceLoad || []).map(w => ({
  ward: w.ward,
  complaints: w.complaints,
  resolvedPct: parseFloat(w.rate || '80'),
  slaAvg: "38.2h",
}));
