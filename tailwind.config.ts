import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        ink: {
          50: "#f7f7f8",
          100: "#ececf0",
          200: "#d5d6de",
          300: "#b0b2c0",
          400: "#8588a0",
          500: "#666a85",
          600: "#51546c",
          700: "#434558",
          800: "#3a3c4a",
          900: "#1a1b22",
          950: "#0c0c10",
        },
        accent: {
          DEFAULT: "#6366f1",
          dim: "#4f46e5",
          glow: "#818cf8",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, rgb(12 12 16)), linear-gradient(rgb(12 12 16 / 0.85), rgb(12 12 16 / 0.85)), linear-gradient(rgb(99 102 241 / 0.08) 1px, transparent 1px), linear-gradient(90deg, rgb(99 102 241 / 0.08) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "64px 64px",
      },
    },
  },
  plugins: [],
};

export default config;
