/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // App background & surfaces
        "ns-bg": "#f3f4f6", // light background (gray-100)
        "ns-bg-dark": "#020617", // dark background (slate-950)
        "ns-surface": "#ffffff", // cards / panels light
        "ns-surface-dark": "#020617", // cards / panels dark

        // Borders
        "ns-border": "#e5e7eb",
        "ns-border-dark": "#1f2937",

        // Primary brand
        "ns-live-light": "#34d399",      // Light mode pulse dot (emerald-400)
        "ns-live-dark": "#16a34a",      // Dark mode pulse dot (green-600)
        "ns-primary": "#16a34a", // green-600
        "ns-primary-dark": "#22c55e", // green-500/400
        "ns-primary-soft": "#4ade80",

        // Text
        "ns-text": "#111827",
        "ns-text-muted": "#6b7280",
        "ns-text-dark": "#e5e7eb",
        "ns-text-muted-dark": "#9ca3af",

        // Danger
        "ns-danger": "#ef4444",
        "ns-danger-soft": "#fee2e2",
        "ns-danger-soft-dark": "#7f1d1d",
      },

      keyframes: {
        dotMove: {
          "0%": { transform: "translateX(0px)", opacity: "1" },
          "25%": { transform: "translateX(2px)", opacity: "0.8" },
          "50%": { transform: "translateX(4px)", opacity: "0.5" },
          "75%": { transform: "translateX(2px)", opacity: "0.8" },
          "100%": { transform: "translateX(0px)", opacity: "1" },
        },

        tailFade: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
      },

      animation: {
        liveDot: "dotMove 1.2s ease-in-out infinite",
        liveTail: "tailFade 1.2s ease-out infinite",
      },
    },
  },
  plugins: [],
};
