import React, { useState } from 'react';
import { WARDS } from '../../data/mockData';

export default function HelpPage() {
  const [activeFaq, setActiveFaq] = useState(0);
  const [supportName, setSupportName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [supportMsg, setSupportMsg] = useState('');
  const [toast, setToast] = useState('');

  const faqs = [
    {
      q: 'How do I submit a civic complaint?',
      a: 'Navigate to "Report an Issue", select the appropriate municipal category (Roads, Water, Garbage, etc.), tap on the interactive GIS map to pinpoint the exact curb coordinate, attach a photo, and click Submit. A unique reference code (e.g. CC-2026-0841) will be generated.'
    },
    {
      q: 'How does the Municipal SLA tracking work?',
      a: 'Every complaint category has a maximum resolution threshold defined by the Solapur Citizen Charter: Urgent road craters (24h), Sanitation & Garbage (12-24h), Water supply leaks (36h), Streetlights (18-48h), and Public Infrastructure (72h). If this threshold is breached, the ticket is flagged to the Executive Magistrate.'
    },
    {
      q: 'Can I report a complaint anonymously?',
      a: 'Yes. In Section D of the complaint intake form, choose "Submit Anonymously". Personal identifying metadata, email, and contact numbers will be omitted from the public ledger, but you will need to save your complaint reference number manually to track progress.'
    },
    {
      q: 'How do I track an existing complaint?',
      a: 'Click "Track Complaint" in the main navigation or enter your CC-2026-XXXX reference in the search console. You will see real-time 4-step execution lifecycle telemetry, engineer notes, and on-site photos.'
    },
    {
      q: 'What is Community Explorer and Upvoting?',
      a: 'If enabled during submission, your complaint appears on the Explore Issues page. Fellow residents in your ward can upvote the ticket. Complaints with higher citizen consensus receive priority escalation in the morning dispatch queue.'
    }
  ];

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    setToast('Your inquiry has been submitted to the Solapur Municipal Grievance Support Desk.');
    setSupportName('');
    setSupportEmail('');
    setSupportMsg('');
    setTimeout(() => setToast(''), 4000);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-gutter-desktop py-space-xl">
      {/* Header */}
      <div className="mb-space-xl text-center max-w-2xl mx-auto">
        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
          Citizen Assistance & Directory
        </span>
        <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mt-1 mb-space-xs">
          Help & Support Center
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Find answers to frequently asked questions about filing complaints, monitoring department SLAs, or reaching your local ward officer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        {/* Left Column: FAQs & Ward Directory (7 cols) */}
        <div className="lg:col-span-7 space-y-space-xl">
          {/* FAQ Accordion */}
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-space-md">
              Frequently Asked Questions
            </h2>
            <div className="space-y-space-xs">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-surface-container-lowest rounded-lg border border-surface-container overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
                    className="w-full p-space-md text-left flex items-center justify-between font-label-md text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                      {activeFaq === idx ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {activeFaq === idx && (
                    <div className="p-space-md pt-0 text-sm text-on-surface-variant leading-relaxed border-t border-surface-container/60 bg-surface-container-low/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Ward Contact Directory */}
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-space-sm">
              Solapur Ward Maintenance Desks
            </h2>
            <div className="bg-surface-container-lowest rounded-xl border border-surface-container overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-container text-on-surface-variant uppercase font-semibold border-b border-surface-container">
                  <tr>
                    <th className="p-3">Ward / Zone</th>
                    <th className="p-3">Superintendent</th>
                    <th className="p-3 text-right">Helpline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {WARDS.map((w) => (
                    <tr key={w.id} className="hover:bg-surface-container-low">
                      <td className="p-3 font-semibold text-on-surface">{w.name}</td>
                      <td className="p-3 text-on-surface-variant">Ward Officer Desk</td>
                      <td className="p-3 text-right font-mono font-bold text-primary">
                        0217-2740{Math.floor(100 + Math.random() * 899)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Support Form & Emergency Lines (5 cols) */}
        <div className="lg:col-span-5 space-y-space-lg sticky top-20">
          {/* Emergency Card */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-surface-container">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">phone_in_talk</span>
              <span>24/7 Municipal Hotlines</span>
            </h3>
            <div className="space-y-space-xs text-xs">
              <div className="p-2.5 bg-surface-container-low rounded flex items-center justify-between">
                <span className="font-semibold text-on-surface">Central Toll-Free CAD Hub</span>
                <span className="font-mono font-bold text-primary text-sm">1800-419-CIVIC</span>
              </div>
              <div className="p-2.5 bg-surface-container-low rounded flex items-center justify-between">
                <span className="font-semibold text-on-surface">Emergency Water Pipe Breach</span>
                <span className="font-mono font-bold text-primary text-sm">0217-2740333</span>
              </div>
              <div className="p-2.5 bg-surface-container-low rounded flex items-center justify-between">
                <span className="font-semibold text-on-surface">Streetlight Power Hazard</span>
                <span className="font-mono font-bold text-primary text-sm">0217-2740444</span>
              </div>
            </div>
          </div>

          {/* Citizen Inquiry Form */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-surface-container">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">
              Submit an Inquiry
            </h3>
            <p className="font-body-sm text-xs text-on-surface-variant mb-space-md">
              Need assistance with an escalated complaint or administrative inquiry? Our support officers respond within 4 hours.
            </p>

            <form onSubmit={handleSupportSubmit} className="space-y-space-sm">
              <div>
                <label className="text-xs font-semibold block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={supportName}
                  onChange={(e) => setSupportName(e.target.value)}
                  placeholder="e.g. Ramesh Kulkarni"
                  className="w-full h-9 px-3 bg-surface border border-surface-container rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  placeholder="ramesh@example.com"
                  className="w-full h-9 px-3 bg-surface border border-surface-container rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Message / Question</label>
                <textarea
                  required
                  rows={3}
                  value={supportMsg}
                  onChange={(e) => setSupportMsg(e.target.value)}
                  placeholder="Inquire about ward dispatch, escalation procedure, or platform access..."
                  className="w-full p-2.5 bg-surface border border-surface-container rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full h-10 bg-primary text-on-primary rounded font-semibold text-xs tracking-wide hover:bg-[#222222] transition-colors shadow-xs"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-space-md py-space-sm rounded-lg shadow-xl font-body-sm text-body-sm flex items-center gap-space-sm animate-slideUp">
          <span className="material-symbols-outlined text-[18px]">task_alt</span>
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
