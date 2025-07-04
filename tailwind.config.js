/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{js,ts,jsx,tsx,astro}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
} 