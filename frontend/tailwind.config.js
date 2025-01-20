/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#64D3BA',
        'custom-white': '#FFFFFF',
      },
    },
  },
  plugins: [],
}