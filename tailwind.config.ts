/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Activa modo oscuro manual (puedes alternar con un botón)
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        white: '#FFF',
        primary: {
          DEFAULT: '#0EA5A3',
          light: '#14B8A6',
          dark: '#0D9488',
        },
        secondary: {
          DEFAULT: '#155E75',
          light: '#1E749B',
          dark: '#134E61',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#DC2626',
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      boxShadow: {
        card: '0 2px 10px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
