module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'Space Grotesk'", 'monospace'],
        sans: ["'Inter'", 'sans-serif'],
      },
    },
  },
  plugins: [],
};
