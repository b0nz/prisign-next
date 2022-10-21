/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        privgreen: "#54B78A",
        privblack: {
          50: "#343747",
          100: "#282A36",
        },
      },
    },
  },
  plugins: [],
};
