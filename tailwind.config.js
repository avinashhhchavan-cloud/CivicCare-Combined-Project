/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind CSS configuration with a shared design system inspired by Apple.com
  // ---------------------------------------------------------------
  // 1️⃣ Content – all files that use Tailwind classes
  // ---------------------------------------------------------------
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  // ---------------------------------------------------------------
  // 2️⃣ Theme – extend the default Tailwind theme with our design tokens
  // ---------------------------------------------------------------
  theme: {
    extend: {
      // ---- Colors ------------------------------------------------
      colors: {
        // Core palette – neutral and premium tones
        base: "#ffffff",          // White surfaces
        muted: "#f5f5f5",          // Light gray backgrounds
        primary: "#000000",      // Primary actions & text
        secondary: "#555555",    // Secondary text / UI elements
        "border-muted": "#e5e5e5",
        // Status colors
        success: "#28a745",
        warning: "#ffc107",
        error: "#dc3545",
      },
      // ---- Font family -------------------------------------------
      fontFamily: {
        // Keep Inter (already used) but align with Apple’s system‑font philosophy
        sans: ["-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
      },
      // ---- Font sizes – modular scale similar to Apple -------------
      fontSize: {
        "h1": ["3rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }], // ~48px
        "h2": ["2.25rem", { lineHeight: "1.3", letterSpacing: "-0.015em" }], // ~36px
        "h3": ["1.875rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }], // ~30px
        "h4": ["1.5rem", { lineHeight: "1.5", letterSpacing: "-0.005em" }], // ~24px
        base: ["1rem", { lineHeight: "1.6" }], // 16px
        sm: ["0.875rem", { lineHeight: "1.6" }], // 14px
        xs: ["0.75rem", { lineHeight: "1.5" }], // 12px
      },
      // ---- Spacing (vertical rhythm) -----------------------------
      spacing: {
        14: "3.5rem", // 56px – used for section gaps
        18: "4.5rem",
        22: "5.5rem",
      },
      // ---- Border radius ------------------------------------------
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
      },
      // ---- Box shadow (subtle, premium) --------------------------
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.05)",
        DEFAULT: "0 1px 3px rgba(0,0,0,0.1)",
        md: "0 4px 6px rgba(0,0,0,0.1)",
        lg: "0 10px 15px rgba(0,0,0,0.1)",
      },
      // ---- Transition durations (fast, restrained) ---------------
      transitionDuration: {
        DEFAULT: "150ms",
        200: "200ms",
        300: "300ms",
      },
      // ---- Container – centered with responsive padding -----------
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1440px",
        },
      },
    },
  },

  // ---------------------------------------------------------------
  // 3️⃣ Plugins – add any Tailwind plugins you need (future‑proof)   
  // ---------------------------------------------------------------
  plugins: [],
};

// End of Tailwind configuration
  content: [
    "./index.html",

