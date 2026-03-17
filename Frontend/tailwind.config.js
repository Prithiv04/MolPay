/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bitcoin-blue': '#1E3A8A',
        'sbtc-gold': '#F59E0B',
        'success-green': '#10B981',
        'glass-bg': 'rgba(255,255,255,0.1)',
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
