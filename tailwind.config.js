/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
       matcha : {
        100: "#F8EDE3",
        200: "#BDD2B6",
        300: "#A2B29F",
        350: "#748763",
        400: "#798777",
        500: "#76885B",
        600: "#627254",
       }
      },
    },
  },
  plugins: [],
}

