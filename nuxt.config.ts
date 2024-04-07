// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon"],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  css: ["./assets/css/main.css"],
  experimental: {
    payloadExtraction: false,
  },
  ssr: true,
  watch: ["./assets/**/*.css", "./app.vue", "./pages/**/*.vue", "./components/**/*.{vue,js,ts}", "./*.{ts,js}"],
})
