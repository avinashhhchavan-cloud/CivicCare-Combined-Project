import { INITIAL_COMPLAINTS, PLATFORM_STATS, CURRENT_USER } from '../data/mockData.js';

const STORAGE_KEY_COMPLAINTS = 'civiccare_complaints_v1';
const STORAGE_KEY_NOTIFICATIONS = 'civiccare_notifications_v1';
const STORAGE_KEY_USER = 'civiccare_user_v1';

// Initialize storage with demonstration data if not present
function initializeStorage() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (!localStorage.getItem(STORAGE_KEY_COMPLAINTS)) {
        localStorage.setItem(STORAGE_KEY_COMPLAINTS, JSON.stringify(INITIAL_COMPLAINTS));
      }
      if (!localStorage.getItem(STORAGE_KEY_NOTIFICATIONS)) {
        localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(CURRENT_USER.notifications));
      }
      if (!localStorage.getItem(STORAGE_KEY_USER)) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(CURRENT_USER));
      }
    }
  } catch (err) {
    console.warn('LocalStorage unavailable, defaulting to memory state:', err);
  }
}

initializeStorage();

export const ComplaintService = {
  getComplaints() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_COMPLAINTS);
      return data ? JSON.parse(data) : INITIAL_COMPLAINTS;
    } catch {
      return INITIAL_COMPLAINTS;
    }
  },

  getComplaintById(refOrId) {
    if (!refOrId) return null;
    const clean = refOrId.trim().toUpperCase();
    const complaints = this.getComplaints();
    return complaints.find(c => c.ref.toUpperCase() === clean || c.id.toUpperCase() === clean) || null;
  },

  getUserComplaints() {
    const complaints = this.getComplaints();
    return complaints.filter(c => c.isCitizenAuthor);
  },

  submitComplaint(formData) {
    const complaints = this.getComplaints();
    
    // Generate unique sequential reference
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newRef = `CC-2026-${randomSuffix}`;
    
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) + ', ' + now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const newComplaint = {
      id: newRef,
      ref: newRef,
      title: formData.title || 'Reported Civic Issue',
      category: formData.categoryName || 'Roads & Potholes',
      categoryId: formData.categoryId || 'roads',
      ward: formData.wardName || 'Central Ward 14',
      wardId: formData.wardId || 'ward_14_central',
      address: formData.address || 'Solapur Municipal Limits',
      coordinates: formData.coordinates || { lat: 17.6599, lng: 75.9064 },
      severity: formData.severity || 'Medium',
      status: 'Under Review',
      dateFiled: formattedDate,
      dept: formData.dept || 'Solapur Municipal Public Works & Grievance Cell',
      sla: 'SLA Target: 48 Hours',
      slaHoursLeft: 48,
      timeElapsed: '0h / 48h max',
      wardAverage: '38.4h',
      activeStep: 2,
      upvotes: 1,
      hasUpvoted: true,
      isPublic: formData.isPublic !== false,
      isCitizenAuthor: formData.identityMode !== 'anon',
      citizenName: formData.identityMode === 'anon' ? 'Anonymous Citizen' : 'Rohit Sharma',
      citizenEmail: formData.identityMode === 'anon' ? 'anonymous@civiccare.demo' : 'rohit.sharma@example.com',
      contactPhone: formData.contactPhone || '+91 98220 12345',
      photo: formData.photo || '/images/issue-pothole.webp',
      description: formData.description || 'Civic infrastructure defect logged via municipal cad intake form.',
      fieldNote: '"Complaint logged into dispatch queue. Officer assignment queued for ward sector."',
      officer: 'Automated CAD Dispatch Desk',
      workOrder: `#WO-${Math.floor(4000 + Math.random() * 999)}`,
      steps: [
        {
          step: 1,
          title: 'Complaint Submitted',
          time: formattedDate,
          desc: 'Complaint registered by citizen with GPS coordinates and photographic evidence. Unique telemetry ID hash appended.',
          details: `GPS: ${formData.coordinates?.lat?.toFixed(4) || '17.6599'}° N, ${formData.coordinates?.lng?.toFixed(4) || '75.9064'}° E`,
          completed: true
        },
        {
          step: 2,
          title: 'Under Review & Triage',
          time: 'Active',
          desc: 'Queued for site validation and priority verification by Ward Maintenance Officer.',
          details: 'Status: Initial Triage Node',
          current: true,
          completed: false
        },
        {
          step: 3,
          title: 'Crew Dispatched',
          time: 'Pending Review',
          desc: 'Municipal maintenance division work order assignment.',
          details: 'Awaiting Crew Allocation',
          completed: false
        },
        {
          step: 4,
          title: 'Resolved & Closed',
          time: 'Target SLA: 48 Hours',
          desc: 'Field verification and final resolution proof sign-off.',
          details: 'Pending Resolution',
          completed: false
        }
      ]
    };

    const updated = [newComplaint, ...complaints];
    localStorage.setItem(STORAGE_KEY_COMPLAINTS, JSON.stringify(updated));

    // Also add to user notifications
    this.addNotification({
      title: 'Complaint Registered',
      message: `Your grievance ${newRef} has been assigned to ${newComplaint.dept}.`,
      complaintId: newRef
    });

    return newComplaint;
  },

  updateComplaintStatus(id, newStatus, remarks, officerName) {
    const complaints = this.getComplaints();
    const updated = complaints.map(c => {
      if (c.id === id || c.ref === id) {
        let activeStep = c.activeStep;
        if (newStatus === 'Under Review') activeStep = 2;
        if (newStatus === 'In Progress') activeStep = 3;
        if (newStatus === 'Resolved') activeStep = 4;

        const updatedSteps = c.steps.map(s => {
          if (s.step < activeStep) return { ...s, completed: true, current: false };
          if (s.step === activeStep) return { ...s, completed: activeStep === 4, current: activeStep !== 4 };
          return { ...s, completed: false, current: false };
        });

        return {
          ...c,
          status: newStatus,
          activeStep,
          fieldNote: remarks ? `"${remarks}"` : c.fieldNote,
          officer: officerName || c.officer,
          steps: updatedSteps
        };
      }
      return c;
    });

    localStorage.setItem(STORAGE_KEY_COMPLAINTS, JSON.stringify(updated));
    return this.getComplaintById(id);
  },

  toggleUpvote(id) {
    const complaints = this.getComplaints();
    const updated = complaints.map(c => {
      if (c.id === id || c.ref === id) {
        const hasUpvoted = !c.hasUpvoted;
        const upvotes = hasUpvoted ? c.upvotes + 1 : Math.max(0, c.upvotes - 1);
        return { ...c, hasUpvoted, upvotes };
      }
      return c;
    });

    localStorage.setItem(STORAGE_KEY_COMPLAINTS, JSON.stringify(updated));
    return this.getComplaintById(id);
  },

  getNotifications() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
      return data ? JSON.parse(data) : CURRENT_USER.notifications;
    } catch {
      return CURRENT_USER.notifications;
    }
  },

  markNotificationRead(id) {
    const notifs = this.getNotifications();
    const updated = notifs.map(n => n.id === id ? { ...n, read: true } : n);
    localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(updated));
    return updated;
  },

  markAllNotificationsRead() {
    const notifs = this.getNotifications();
    const updated = notifs.map(n => ({ ...n, read: true }));
    localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(updated));
    return updated;
  },

  addNotification({ title, message, complaintId }) {
    const notifs = this.getNotifications();
    const newNotif = {
      id: `notif_${Date.now()}`,
      title,
      text: message,
      message,
      time: 'Just now',
      read: false,
      complaintRef: complaintId,
      complaintId
    };
    const updated = [newNotif, ...notifs];
    localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(updated));
    return updated;
  },

  getUser() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_USER);
      return data ? JSON.parse(data) : CURRENT_USER;
    } catch {
      return CURRENT_USER;
    }
  },

  getUserProfile() {
    return this.getUser();
  },

  updateUser(userData) {
    const current = this.getUser();
    const updated = { ...current, ...userData };
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
    return updated;
  },

  updateUserProfile(userData) {
    return this.updateUser(userData);
  },

  getStats() {
    const complaints = this.getComplaints();
    const total = PLATFORM_STATS.totalComplaints + (complaints.length - INITIAL_COMPLAINTS.length);
    const resolved = PLATFORM_STATS.resolvedComplaints + complaints.filter(c => c.status === 'Resolved' && !INITIAL_COMPLAINTS.some(ic => ic.id === c.id)).length;
    const inProgress = complaints.filter(c => c.status === 'In Progress').length;
    
    return {
      ...PLATFORM_STATS,
      totalComplaints: total,
      resolvedComplaints: resolved,
      inProgressComplaints: inProgress
    };
  }
};
