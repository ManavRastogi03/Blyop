/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
        'neon-green': '#4ade80',  // Tailwind green-400 or your custom hex
        'futuristic-blue': '#0ea5e9', // Tailwind blue-500 or your custom hex
      },
  },
  plugins: [],
}

