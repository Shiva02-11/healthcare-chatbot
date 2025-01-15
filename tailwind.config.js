// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
      },
      colors: {
        darkBlue: "#03045E",
        blue: "#0077B6",
        cyan: "#00B4D8",
        lightCyan: "#90E0EF",
        paleBlue: "#CAF0F8",
      },
    },
  },
  darkMode: "class", // Enable class-based dark mode
  plugins: [],
};
