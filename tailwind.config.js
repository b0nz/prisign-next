/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        privgreen: {
          50: '#D2EAC3',
          100: '#B7E1AC',
          200: '#96D795',
          300: '#7FCD8D',
          400: '#69C289',
          500: '#54B78A',
          600: '#48A28C',
          700: '#3C8C8A',
          800: '#316976',
          900: '#27495F',
        },
        privblack: {
          50: '#343747',
          100: '#282A36',
        },
        privgray: {
          50: '#D5DADB',
          100: '#C4CACC',
          200: '#B3B9BE',
          300: '#A2A7AF',
          400: '#9294A0',
          500: '#818191',
          600: '#74717F',
          700: '#66606D',
          800: '#57505B',
          900: '#484049',
        },
      },
      fontFamily: {
        popins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
