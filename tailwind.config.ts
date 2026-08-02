import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Trust-first palette: deep indigo primary, warm saffron accent
        // (a nod to both Canadian civility and Indian warmth).
        primary: {
          50: "#eef4ff",
          100: "#dce6fd",
          200: "#c0d3fc",
          300: "#94b6fa",
          400: "#618ff5",
          500: "#3d68ef",
          600: "#2748e3",
          700: "#1f36d0",
          800: "#202ea9",
          900: "#1f2c85",
          950: "#171d51",
        },
        saffron: {
          50: "#fff8ed",
          100: "#ffefd4",
          200: "#ffdba8",
          300: "#ffc171",
          400: "#ff9c38",
          500: "#fe7f11",
          600: "#ef6407",
          700: "#c64a08",
          800: "#9d3a0f",
          900: "#7e3210",
        },
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
