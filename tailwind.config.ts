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
