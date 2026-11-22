/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      // Premium neutral color palette
      colors: {
        base: "#ffffff",
        muted: "#f5f5f5",
        primary: "#000000",
        secondary: "#555555",
        "border-muted": "#e5e5e5",
        success: "#28a745",
        warning: "#ffc107",
        error: "#dc3545",
      },
      // Typography
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"]
      },
      fontSize: {
        h1: ["3rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        h2: ["2.25rem", { lineHeight: "1.3", letterSpacing: "-0.015em" }],
        h3: ["1.875rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        h4: ["1.5rem", { lineHeight: "1.5", letterSpacing: "-0.005em" }],
        base: ["1rem", { lineHeight: "1.6" }],
        sm: ["0.875rem", { lineHeight: "1.6" }],
        xs: ["0.75rem", { lineHeight: "1.5" }]
      },
      // Spacing
      spacing: {
        14: "3.5rem",
        18: "4.5rem",
        22: "5.5rem"
      },
      // Border radius
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem"
      },
      // Shadows
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.05)",
        DEFAULT: "0 1px 3px rgba(0,0,0,0.1)",
        md: "0 4px 6px rgba(0,0,0,0.1)",
        lg: "0 10px 15px rgba(0,0,0,0.1)"
      },
      // Transitions
      transitionDuration: {
        DEFAULT: "150ms",
        200: "200ms",
        300: "300ms"
      }
    },
    // Container configuration (must be top‑level under theme, not inside extend)
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px"
      }
    }
  },
  plugins: []
};
