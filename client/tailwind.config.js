/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'wave': "url('assets/cream_blanc_xl.png')",
      },
      fontFamily: {
        poppins: ["Poppins", "poppins"],
        bahnschrift: ["Bahnschrift", "bahnschrift"],        
        bubblegum: ["Bubblegum", "bubblegum"],
    },
    },
  },
  plugins: [],
}

