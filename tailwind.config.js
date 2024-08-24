/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.vue",
    "./app.vue",
    "./error.vue",
    "./components/**/*.{js,vue,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
        kode: ['Kode Mono'],
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}

