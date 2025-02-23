/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', "sans-serif"],
      },
    },
  },
  safelist: [{ pattern: /pl-./ }, { pattern: /w-./ }],
  plugins: [],
};
