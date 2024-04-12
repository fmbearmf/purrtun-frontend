// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", ["@pinia/nuxt", {
    autoImports: ["defineStore", "acceptHMRUpdate"]
  }]],
  imports: {
    dirs: ["stores"]
  },
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
  runtimeConfig: {
    public: {
      backend: process.env.NUXT_BACKEND,
    }
  },
  watch: ["./assets/**/*.css", "./app.vue", "./pages/**/*.vue", "./components/**/*.{vue,js,ts}", "./*.{ts,js}"],
})
