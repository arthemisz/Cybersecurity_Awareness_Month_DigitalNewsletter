/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        bg: '#0d0d0f',
        surface: '#161618',
        's2': '#1c1c1f',
        accent: '#5b8af5',
      },
    },
  },
  plugins: [],
};
