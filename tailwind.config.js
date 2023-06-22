/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      binance: "rgb(252, 213, 53)",
      binanceLight: "rgb(254, 246, 216)"
    },
  },
  plugins: [],
}