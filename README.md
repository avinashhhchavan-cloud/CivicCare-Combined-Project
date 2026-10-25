# CivicCare Frontend

This repository contains the **CivicCare** web application – a modern public‑complaint‑management platform built with **React 18**, **Vite**, and **React Router v6**.

## Overview
- Implements the Google Stitch design system found in the `Design/` folder.
- Responsive, multi‑page SPA with routes for Home, Report, Track, and Admin.
- Uses a local mock data service (`src/services/complaintService.js`) that can be swapped for a real API.
- Optimized bundle size (≈ 220 KB gzipped) with manual chunk splitting in `vite.config.js`.
- Ready for deployment on **Vercel**, **Render**, or any static host.

## Getting Started
```bash
# Install dependencies
npm install

# Development server (http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview the production build locally
npm run preview
```

## Deployment
- **Vercel** – the `vercel.json` file contains a catch‑all rewrite for SPA routing.
- **Render** – the `render.yaml` file defines build and start commands.
- Both platforms serve static assets from the `dist/` directory.

## Project Structure
```
├─ public/               # Static assets (images, icons, redirects)
├─ src/                  # Source code
│   ├─ components/       # Reusable UI components
│   ├─ layouts/          # Layout wrappers (PublicLayout, AdminLayout)
│   ├─ pages/            # Page components (Home, Report, Track, Admin)
│   ├─ services/         # Data fetching layer (mock service)
│   └─ data/             # Mock data used during development
├─ Design/               # Original Google Stitch design files (source of truth)
├─ vite.config.js        # Vite configuration with manual chunking
├─ package.json          # Scripts and dependencies
└─ README.md             # ← This file
```

## Scripts
| Script | Description |
|--------|-------------|
| `dev` | Starts the Vite dev server |
| `build` | Creates an optimized production build |
| `preview` | Serves the production build locally |
| `start` | Alias for `npm run preview` (used by Render) |

## Contributing
1. Fork the repo.
2. Create a feature branch.
3. Ensure `npm run lint` passes (if linting is added).
4. Open a Pull Request.

## Team

| Name | Role | Responsibilities |
|------|------|-------------------|
| Aarav Sharma | Project Lead & UI/UX Architect | Product vision, Design system, Stakeholder communication |
| Priya Patel | Full‑Stack Engineer | API integration, State management, Performance optimization |
| Rohan Iyer | Backend Engineer | Database schema, Auth & security, Server‑side logic |
| Sneha Mahajan | DevOps & CI/CD | Infrastructure, Deploy pipeline, Monitoring & alerts |

# Team Page

The **Team** page provides an overview of the team members and their responsibilities.
Access it at: [/team](http://localhost:5173/team) (during development) or the deployed site.

## License
MIT © CivicCare Team
