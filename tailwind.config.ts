import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "primary-100": "#E5F1FF",
      "primary-200": "#BFDBFF",
      "primary-300": "#8EB7ED",
      "primary-400": "#6A97D4",
      "primary-500": "#4A7ABA",
      "primary-600": "#2056A1",
      "primary-700": "#002E6D",
      "primary-800": "#002454",
      "primary-900": "#000E21",
      "neutral-100": "#F7F7F7",
      "neutral-200": "#F2F2F2",
      "neutral-300": "#E8E8E8",
      "neutral-400": "#E0E0E0",
      "neutral-500": "#D6D9D6",
      "neutral-600": "#CCCCCC",
      "neutral-700": "#BFBFBF",
      "neutral-800": "#A6A6A6",
      "neutral-900": "#8C8C8C",
      "accent-100": "#D9FAFF",
      "accent-200": "#B2F5FF",
      "accent-300": "#66DFF2",
      "accent-400": "#2EBBD1",
      "accent-500": "#17A2B8",
      "accent-600": "#03899E",
      "accent-700": "#007285",
      "accent-800": "#005766",
      "accent-900": "#002126",
      white: "#FFFFFF",
      black: "#000000",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      desktop: "1920px",
      "large-desktop": "2300px",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
