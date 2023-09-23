/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "	hsl(332, 87%, 61%)",
        spinner: "	hsl(332, 100%, 51%)",
        secondary: "	hsl(327, 62%, 61%)",
        third: "hsl(299, 96%, 48%)",
        forth: "	hsl(265, 33%, 49%)",
      },
    },
  },
  plugins: [],
}
