/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#0D1B2A",
        "gunmetal": "#1B263B",
        "steel-blue": "#415A77",
        "shadow-blue": "#778DA9",
        "platinum-white": "#E0E1DD",
      },
      animation: {
        "background-shine": "background-shine 2s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "background-shine": {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
    },
  },
  safelist: [
    {
      pattern: /bg-(blue|emerald|orange|cyan|violet)-(400|500)/,
    },
    {
      pattern: /text-(blue|emerald|orange|cyan|violet)-(100|200|300)/,
    },
    {
      pattern: /border-(blue|emerald|orange|cyan|violet)-(300|400)/,
    },
    {
      pattern: /from-(blue|emerald|orange|cyan|violet)-(400|500)/,
    },
    {
      pattern: /to-(blue|emerald|orange|cyan|violet)-(400|500)/,
    },
  ],
  plugins: [],
};