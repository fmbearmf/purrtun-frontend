<template>
    <div class="bg-black min-h-dvh flex flex-col">
      <Header />
      <div class="flex-grow flex flex-col sm:flex-row my-5">
        <div class="flex-grow sm:w-1/3 hidden md:block">
            <!-- Ad space maybe-->
        </div>
        <div class="flex-grow sm:w-1/3 mx-4">
            <h1 class="text-center text-5xl font-kode font-bold">Order</h1>
        </div>
        <div class="flex-grow sm:w-1/3 hidden md:block">
            <!-- Ad space maybe-->
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
import { pack, unpack } from "msgpackr";

const { $util } = useNuxtApp();

let accessTokenCookie = useCookie("token", { sameSite: true, maxAge: 60 * 60 * 24 });
let accessToken = accessTokenCookie.value;

console.log("accessTokenCookie: " + accessToken);

let response: any = ref({});

const conf = useRuntimeConfig();
const backend = conf.public.backend;
</script>
