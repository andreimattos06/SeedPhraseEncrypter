/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      primary: '#3f51b5',
      primarylight: '#757de8',
      primarydark: '#002984',
      white: '#ffffff',
      redwarning: '#de0417',
      greenright: '#04b012',
      black: "#000000",
    },
    extend: {},
  },
  plugins: [],
}