/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'MTNIrancell-Bold': 'MTNIrancell-Bold',
        'MTNIrancell-DemiBold': 'MTNIrancell-DemiBold',
        'MTNIrancell-ExtraLight': 'MTNIrancell-ExtraLight',
        'MTNIrancell-Light': 'MTNIrancell-Light',
        'MTNIrancell-Medium': 'MTNIrancell-Medium'
      },
      colors: {
        'primary-light': '#F0F2F5',
        'secondary-light' : '#FDFDFD',
        'text-light' : '#343F43',
        'text-secondary-light' : '#6C757D',
        'active-light' : '#6C7537',
        'chart-light' : '#8887349',
        'icons-light' : '#555555',

        'primary-dark': '#1C1C1D',
        'secondary-dark' : '#2A2A2B',
        'text-dark' : '#F0F0F0',
        'text-secondary-dark' : '#B0B0C0',
        'active-dark' : '#4CAF50',
        'chart-dark' : '#66BB6A',
        'icons-dark' : '#C0C0C0'

        
      }
    },
  },
  plugins: [],
}