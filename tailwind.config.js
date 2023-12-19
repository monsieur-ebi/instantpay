/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      binance: "#2483ff",
      binanceLight: "rgb(254, 246, 216)"
    },
  },
  plugins: [],
}