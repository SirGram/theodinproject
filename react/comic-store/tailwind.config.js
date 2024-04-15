/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: { brightness: {
      35: '.35',
    }},  gridTemplateColumns: {
      'auto-fill': 'repeat(auto-fill, minmax(13rem, 1fr))',
      'auto-fit': 'repeat(auto-fit, minmax(13rem, 1fr))',
    },
  },
  plugins: [],
};
