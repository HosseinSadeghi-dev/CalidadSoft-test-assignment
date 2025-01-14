/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"JetBrains Sans"', "sans-serif"],
      },
    },
  },
  safelist: [{ pattern: /pl-./ }],
  plugins: [],
};
