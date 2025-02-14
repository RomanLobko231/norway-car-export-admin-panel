/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lighthouse: "#F7F8F8",
        lightwhite: "#F5F6F6",
        cornsilk: "#FEFAF0",
        gunmental: "#1c2628",
        swamp: "#34474B",
        "swamp-500": "#416858",
        "swamp-300": "#a7beb3",
        "swamp-100": "#EDF2EF",
        "distant-cloud": "#EFF2F0",
        mirage: "#001f3f",
        "medium-gray": "#333333",
        "light-gray": "#888888",
        "danger-red": "#800000",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
      },
    },
  },
  plugins: [],
};
