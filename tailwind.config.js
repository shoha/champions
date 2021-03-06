module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: ["even"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
  safelist: [
    {
      pattern: /bg-.*-/,
      variants: ["hover"],
    },
  ],
};
