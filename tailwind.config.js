/** @type {import('tailwindcss').Config} */
export default {
  darkMode: [
    "variant",
    [
      "@media (prefers-color-scheme: dark) { &:not(.light *) }",
      "&:is(.dark *)",
    ],
  ],
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
