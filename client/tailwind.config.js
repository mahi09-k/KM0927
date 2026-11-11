/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAFAF8',
        charcoal: '#1C1C1A',
        terracotta: '#E8572A',
        golden: '#F5C842',
        softgray: '#F0EFEB',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        shell: '430px',
      },
    },
  },
  plugins: [],
};
