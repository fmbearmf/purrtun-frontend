import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,
  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: { value: "#2DC842" },
          secondary: { value: "#5E2BFF" },
          accent: { value: "#257232" },
          background: { value: "#050505" },
          text: { value: "#FDECEF" },
        }
      }
    },
  },

  // The output directory for your css system
  outdir: "src/styled-system",
  jsxFramework: "react"
});
