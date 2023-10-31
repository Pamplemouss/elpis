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
        'firstColor': '#22d3ee',
        'secondColor': '#4ade80',
        'backgroundColor': '#192236'
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}