<template>
    <nav class="shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Brand -->
          <div class="flex-shrink-0">
            <a href="#" class="flex items-center">
              <img class="block lg:hidden h-10 w-auto" src="~/assets/img/logo-color.png" alt="Logo">
              <img class="hidden lg:block h-10 w-auto" src="~/assets/img/logo-color.png" alt="Logo">
            </a>
          </div>
  
          <!-- Desktop menu -->
          <div class="hidden md:flex flex-grow items-center justify-center">
            <div class="flex items-center space-x-4">
              <nuxt-link
                  v-for="header in headers"
                  :key="header.name"
                  :to="`${header.route}`"
                  class="text-green-700 hover:text-emerald-200 hover:outline hover:outline-green-400 hover:outline-4 px-3 py-2 rounded-md text-sm font-bold"
              >
                {{ header.name }}
              </nuxt-link>
            </div>
          </div>
  
          <!-- Mobile menu button -->
          <div class="flex md:hidden">
            <button @click="toggleMobileMenu" class="text-green-700 hover:text-green-500 focus:outline-none focus:text-green-500">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
  
      <!-- Mobile menu -->
      <div :class="{ 'block': isMobileMenuOpen, 'hidden': !isMobileMenuOpen }" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <nuxt-link
              v-for="header in headers"
              :key="header.name"
              :to="`${header.route}`"
              class="text-green-700 hover:text-emerald-200 hover:outline hover:outline-green-400 hover:outline-4 px-3 py-2 rounded-md text-sm font-bold"
          >
            {{ header.name }}
          </nuxt-link>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isMobileMenuOpen: false,
        headers: [
          //  Portfolio, market prices, charms, gembox
          { name: "Home", route: "" },
          //  Market prices, charts, ordering
          { name: "Market", route: "/market" },
          //  Leaderboard
          { name: "Leaderboard", route: "/leaderboard" }
        ]
      }
    },
    methods: {
      toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
      }
    }
  }
  </script>
  