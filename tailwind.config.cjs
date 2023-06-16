/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    backgroundImage: {
      login: "url('./src/assets/Group 21.svg')",
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
