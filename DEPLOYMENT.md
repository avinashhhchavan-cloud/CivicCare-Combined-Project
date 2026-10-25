# CivicCare — Production Deployment Guide (Vercel & Render)

This project is fully configured and optimized for zero-configuration, 1-click deployments to **Vercel** and **Render**.

---

## 🚀 Option 1: Deploy to Vercel (Recommended — Free & Global Edge CDN)

Vercel provides instant previews, automatic SSL, and global edge routing.

### Method A: Deploy via GitHub (Recommended)
1. Push your project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: CivicCare production release"
   git branch -M main
   git remote add origin https://github.com/<your-username>/civiccare.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and sign in.
3. Click **"Add New..."** → **"Project"**.
4. Import your `civiccare` GitHub repository.
5. Vercel automatically detects Vite:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**. Your site will be live on an `.vercel.app` URL in ~30 seconds!

### Method B: Deploy via Vercel CLI
```bash
npm i -g vercel
vercel
# Follow the interactive prompts and choose default settings
vercel --prod
```

> **Why it works seamlessly on Vercel:**  
> The included [`vercel.json`](file:///e:/Projects/Collage%20Projects/FSD1%20,%20DBMS%20,%20EDADV%20Project/vercel.json) configures SPA path rewrites (`/(.*)` → `/index.html`) so refreshing `/report`, `/track`, or `/admin` routes never throws a 404 error. It also configures long-term immutable caching for `/assets/` and `/images/`.

---

## 🌐 Option 2: Deploy to Render (Static Site)

Render provides free hosting with automatic git builds and SSL.

### Method A: Deploy via Render Blueprint (`render.yaml`)
1. Push your project to GitHub or GitLab.
2. Go to the [Render Dashboard](https://dashboard.render.com).
3. Click **"New +"** → **"Blueprint"**.
4. Select your repository.
5. Render reads [`render.yaml`](file:///e:/Projects/Collage%20Projects/FSD1%20,%20DBMS%20,%20EDADV%20Project/render.yaml) and automatically creates the static site with:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `./dist`
   - **SPA Rewrite Rule**: `/*` → `/index.html`
6. Click **Apply**.

### Method B: Manual Static Site Creation on Render
1. In the Render Dashboard, click **"New +"** → **"Static Site"**.
2. Connect your GitHub repository.
3. Configure settings:
   - **Name**: `civiccare`
   - **Branch**: `main`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. Under **Redirects/Rewrites**:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`
5. Click **Create Static Site**.

---

## ⚡ What Optimizations Were Added

1. **SPA Route Rewriting**:
   - `vercel.json` rewrite: routes all clean URLs to `/index.html`.
   - `render.yaml` rewrite rule: prevents 404s on browser reloads.
   - `public/_redirects`: universal fallback for Netlify, Render, and Cloudflare Pages.

2. **Chunk Splitting & Bundle Optimization**:
   - Split large vendor dependencies in [`vite.config.js`](file:///e:/Projects/Collage%20Projects/FSD1%20,%20DBMS%20,%20EDADV%20Project/vite.config.js):
     - `vendor-react` (`react`, `react-dom`, `react-router-dom`) ~163 kB
     - `vendor-recharts` (`recharts`) ~410 kB
     - Main application bundle dropped from **795 kB down to 218 kB** (41 kB gzip).
   - Instant initial load times and optimized Core Web Vitals (LCP, INP).

3. **Production Cache Headers**:
   - Static assets (`/assets/*` and `/images/*`) are delivered with `Cache-Control: public, max-age=31536000, immutable`.

4. **Universal Node & Preview Scripts**:
   - Added `"start": "vite preview --host"` to `package.json` for Render web service container compatibility.
   - Added clean [`.gitignore`](file:///e:/Projects/Collage%20Projects/FSD1%20,%20DBMS%20,%20EDADV%20Project/.gitignore) to exclude `node_modules` and local artifacts from git pushes.
