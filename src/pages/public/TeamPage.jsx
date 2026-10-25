import React from 'react';
import { Link } from 'react-router-dom';

// Mock team data – replace with real data or fetch from API as needed
const teamMembers = [
  {
    name: 'Aarav Sharma',
    role: 'Project Lead & UI/UX Architect',
    avatar: '/images/team/aarav.jpg',
    responsibilities: ['Product vision', 'Design system', 'Stakeholder communication']
  },
  {
    name: 'Priya Patel',
    role: 'Full‑Stack Engineer',
    avatar: '/images/team/priya.jpg',
    responsibilities: ['API integration', 'State management', 'Performance optimization']
  },
  {
    name: 'Rohan Iyer',
    role: 'Backend Engineer',
    avatar: '/images/team/rohan.jpg',
    responsibilities: ['Database schema', 'Auth & security', 'Server‑side logic']
  },
  {
    name: 'Sneha Mahajan',
    role: 'DevOps & CI/CD',
    avatar: '/images/team/sneha.jpg',
    responsibilities: ['Infrastructure', 'Deploy pipeline', 'Monitoring & alerts']
  }
];

export default function TeamPage() {
  return (
    <section className="w-full max-w-[1600px] mx-auto px-gutter-desktop py-space-xl">
      <h1 className="font-headline-xl text-headline-xl text-on-surface mb-space-md">Our Team</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-space-lg">
        CivicCare is built by a passionate multi‑disciplinary crew that blends civic engineering, software craftsmanship, and design thinking. Below is a quick overview of who does what.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-space-lg">
        {teamMembers.map((member) => (
          <article key={member.name} className="flex gap-space-md p-space-md bg-surface-container-low rounded shadow-sm border border-surface-container">
            <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full object-cover border-2 border-primary" />
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">{member.name}</h2>
                <p className="font-label-md text-label-md text-on-surface-variant">{member.role}</p>
                <ul className="mt-space-xs list-disc list-inside text-body-sm text-on-surface-variant">
                  {member.responsibilities.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
              </div>
              <Link to="/contact" className="mt-space-sm inline-flex items-center gap-space-xs text-primary font-label-md">
                Get in touch <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
