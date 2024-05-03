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
          450: "#5E6B5D",
          500: "#76885B",
          600: "#627254",
          700: "#3E4A3D",
        },

        color: {
          'text': '#363e28',
          'background': '#b0bc9a',
          'primary': '#5B6A46',
          'secondary': '#77875B',
          'accent': '#1A1E15',
        },
        colors: {
          'text': '#1c1917',
          'text2': '#b9b4b0',
          'background': '#d6d3d1',
          'primary': '#78716c',
          'secondary': '#57534e',
          'accent': '#292524',
        },
      },
    },
  },
  plugins: [],
}

