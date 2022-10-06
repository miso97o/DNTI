/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        dntiblue: "#7a08ff",
        dntidarkgray: "#444444",
        dntilightgray: "#F0F0F0",
        dntiwhite: "fafafa",
        dntiyellow: "e3e400",
      },
    },
    fontFamily: {
      dnti: ["nanumsquare"],
    },
  },
  plugins: [],
};
