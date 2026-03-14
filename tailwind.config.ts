import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        haven: {
          primary: "#C26B4A",     // terracotta
          secondary: "#6B8D73",   // sage
          accent: "#D4A017",      // gold
          cream: "#F9F5EB",
          dark: "#2C2118",
        },
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;