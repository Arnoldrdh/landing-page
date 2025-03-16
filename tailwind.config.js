/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
       'hero-pattern': "url('./dist/asset/bgimg.jpg')", 
      }
    },
  },
  plugins: [],
}

