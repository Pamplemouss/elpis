/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        flip: '-1',
      },
      colors: {
        'firstColor': '#3B82F6',
        'secondColor': '#E879F9'
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}