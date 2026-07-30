/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#ffffff',
        light: '#ffffff', // Removed the grey for stark white
        border: '#000000', // Black borders
        muted: '#000000', // No muted grays, keep it stark
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        manga: ['Bangers', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        manga: '6px 6px 0px 0px rgba(0,0,0,1)',
        'manga-hover': '2px 2px 0px 0px rgba(0,0,0,1)',
      }
    },
  },
  plugins: [],
};
