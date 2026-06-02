/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        ink: '#111827',
        graphite: '#1f2937',
        steel: '#475569',
        ember: '#ff8f1f',
        shinwa: '#0b5ed7',
        midnight: '#071527',
        amberline: '#ffb020',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 22px 60px rgba(15, 23, 42, 0.16)',
      },
    },
  },
  plugins: [],
};
