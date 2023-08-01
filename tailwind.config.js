/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html", "./src/*.js"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Poppins", "sans-serif"],
        curly: ["Libre Baskerville", "serif"],
        lobster: ["Lobster", "cursive"],
      },
      backgroundImage: {
        cloudy: "url('/dist/assets/cloudy.jpg')",
        sunny: "url('/dist/assets/sunny.jpg')",
        rainy: "url('/dist/assets/raining.jpg')",
        snowy: "url('/dist/assets/snowy.jpg')",
        night: "url('/dist/assets/night.jpg')",
      },
      colors: {
        themeColor: "rgb(var(--theme-color) / 1)",
        textColor: "rgb(var(--themeText-color) / 1)",
      },
    },
  },
  plugins: [],
};
