/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0a192f',
          900: '#112240',
          800: '#1a2f4c',
          700: '#233554',
        },
      },
    },
  },
  plugins: [],
};