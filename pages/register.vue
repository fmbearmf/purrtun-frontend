<template>
  <div class="flex-grow sm:w-1/3 mx-4">
    <h1 class="text-center text-5xl font-kode font-bold">Registration</h1>
    <h2 class="text-3xl font-kode">If you're here, it's because you need a Purrtun account!</h2>
    <h2 class="text-3xl font-kode">Just wait, you'll be registered automatically.</h2>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from 'nuxt/app';
const { $api } = useNuxtApp();

try {
  const response = await $api("/register", {method: "POST"});

  if (response.status === 422) { // is already a user
    navigateTo("/");
  } else if (response.status === 400) { // user hasnt logged in with discord
    navigateTo("/auth");
  }
} catch (error) {
  console.error('Error during registration:', error);
}
</script>
