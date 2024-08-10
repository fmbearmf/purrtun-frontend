<template>
  <LoadingWrapper>
    <div class="flex-grow sm:w-2/3 mx-auto items-center text-center">
      <h1 class="text-5xl font-kode font-bold">Registration</h1>
      <h2 class="text-3xl font-kode mt-4">If you're here, it's because you need a Purrtun account!</h2>
      <h2 class="text-3xl font-kode mt-2">Just press the button below to register.</h2>
      <button
          @click="register"
          class="mt-6 bg-green-500 text-black hover:bg-green-600 hover:text-black hover:outline hover:outline-green-400 hover:outline-4 px-3 py-2 rounded-md text-sm font-bold"
      >
        Start Investing
      </button>
      <h1>{{errorResponse}}</h1>
    </div>
  </LoadingWrapper>
</template>


<script setup lang="ts">
import { navigateTo, useRoute } from 'nuxt/app';
import {useLoadingStore} from "~/stores/loading";

const { $api } = useNuxtApp();
const loadingStore = useLoadingStore();
const route = useRoute();
import {ref} from "vue"
let errorResponse = ref("")
const register = async () => {
  loadingStore.setLoading(true);

  try {
    const response = await $api("/register", { method: "POST" });
    const redirectPath = route.query.redirect || "/";
    navigateTo(redirectPath);
  } catch (error) {
    console.error('Error during registration:', error);
    if (error.response.status === 422) { // is already a user
      navigateTo("/");
    } else if (error.response.status === 400) { // user hasn't logged in with Discord
      navigateTo("/auth");
    } else {
      errorResponse.value = `Error in registering: ${error.data.error}`
    }
  } finally {
    loadingStore.setLoading(false);
  }
}
</script>
