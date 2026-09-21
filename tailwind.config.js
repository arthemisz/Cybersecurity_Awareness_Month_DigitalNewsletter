/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Cormorant Garamond"', '"Instrument Serif"', 'Georgia', 'serif'],
        script: ['"Imperial Script"', 'cursive'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: '#0d0d0f',
        surface: '#161618',
        's2': '#1c1c1f',
        accent: '#5b8af5',
        // Editorial warm palette
        paper: '#E5E5DC',
        'paper-light': '#EEEEE6',
        bone: '#E2E2D8',
        charcoal: '#1B1B18',
        'charcoal-mid': '#2A2A26',
      },
      letterSpacing: {
        'editorial': 'normal',
        'editorial-tight': 'normal',
      },
      lineHeight: {
        'editorial': '1.2',
        'editorial-relaxed': '1.5',
      },
    },
  },
  plugins: [],
};
