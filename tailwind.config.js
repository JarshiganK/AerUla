/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aerulaBlue: {
          50: "#F3F7FF",
          100: "#E0ECFF",
          400: "#3888F5",
          500: "#156DED",
          700: "#0B4AB0",
        },
      },
      boxShadow: {
        float: "0 20px 45px rgba(15, 23, 42, 0.18)",
      },
      borderRadius: {
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
};
