/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#5AB963',
        'accent-orange': '#FF8C42',
        'dark-blue': '#1E3A5F',
        'background': '#F5F5F0',
      },
    },
  },
  plugins: [],
}
