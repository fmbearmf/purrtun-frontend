<template>
    <div class="bg-gradient-to-b from-gray-950 to-gray-900 h-dvh flex flex-col">
      <Header />
      <div class="flex-grow flex flex-col sm:flex-row my-5">
        <div class="flex-grow sm:w-1/3 hidden md:block">
            <!-- Ad space maybe-->
        </div>
        <div class="flex-grow sm:w-1/3 mx-4">
            <h1 class="text-center text-5xl font-bold">Portfolio</h1>
        </div>
        <div class="flex-grow sm:w-1/3 hidden md:block">
            <!-- Ad space maybe-->
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
const accessTokenCookie = useCookie("accessToken").value;

console.log("accessTokenCookie: " + accessTokenCookie);
if (!accessTokenCookie) {
  navigateTo("/auth");
}

let response = "";

const conf = useRuntimeConfig();
const backend = conf.public.backend;

await fetch(backend + "/api/portfolio", {
    method: "POST",
    body: JSON.stringify({
        "authToken": `${accessTokenCookie}`,
    }),
    headers: {
        'Content-Type': 'application/json',
    }
}).then(async (result) => {
    response = await result.json();

    console.log(response);
});
</script>