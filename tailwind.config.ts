import type { Config } from "tailwindcss";

// Design system: warm-modern Canadian fintech (Wealthsimple-school) —
// cream canvas, warm ink, editorial serif display type, one confident
// spruce-green action color, saffron used deliberately as the brand
// accent (not for warnings — those use semantic amber/rose).
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FBF9F5",
          deep: "#F4F0E8",
        },
        ink: {
          DEFAULT: "#211E18",
          soft: "#57534A",
          muted: "#8A8478",
        },
        line: {
          DEFAULT: "#E9E4DA",
          soft: "#F1EDE5",
        },
        spruce: {
          50: "#EEF6F1",
          100: "#D8EBE0",
          200: "#B0d6C2",
          300: "#7FBA9C",
          400: "#4E9974",
          500: "#2E7D57",
          600: "#1E6644",
          700: "#175537",
          800: "#12432C",
          900: "#0E3423",
        },
        saffron: {
          50: "#FEF6EC",
          100: "#FCEAD3",
          200: "#F8D3A5",
          300: "#F3B36B",
          400: "#EC8F35",
          500: "#E1761A",
          600: "#C75E10",
          700: "#A44A10",
          800: "#843B14",
          900: "#6C3213",
        },
        // Validated chart palette (CVD-safe as ordered in BreakdownBar)
        chart: {
          takehome: "#2F855A",
          federal: "#2B6CB0",
          provincial: "#B83280",
          cpp: "#B7791F",
          ei: "#6D5BD0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(33,30,24,0.04), 0 4px 16px rgba(33,30,24,0.05)",
        lift: "0 2px 4px rgba(33,30,24,0.06), 0 12px 32px rgba(33,30,24,0.10)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
