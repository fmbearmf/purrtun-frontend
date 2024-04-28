<template>
    <div class="bg-black h-dvh flex flex-col">
      <Header />
      <div class="flex-grow flex flex-col sm:flex-row my-5">
        <div class="flex-grow sm:w-1/3 hidden md:block">
            <!-- Ad space maybe-->
        </div>
        <div class="flex-grow sm:w-1/3 mx-4">
            <h1 class="text-center text-5xl font-bold">Portfolio</h1>
            <h2 class="text-3xl font-kode" :key="cb">|> CatBux: <a class="text-fuchsia-400">{{ Number(cb).toLocaleString() }}</a></h2>
            <h2 class="text-3xl font-kode" :key="job">|> Job: <a class="text-fuchsia-400">{{ job }}</a></h2>
            <h2 class="text-3xl font-kode" :key="limit">|> CatBux Limit: <a class="text-fuchsia-400">{{ Number(limit).toLocaleString() }}</a></h2>
            <h2 class="text-3xl font-kode" :key="totalVal">|> Total Stock Value: <a class="text-fuchsia-400">{{ Number(totalVal).toLocaleString() }}</a></h2>
        </div>
        <div class="flex-grow sm:w-1/3 hidden md:block">
            <!-- Ad space maybe-->
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
let accessToken = useCookie("accessToken").value;
let accessTokenCookie = useCookie("accessToken");

let cb = ref("");
let job = ref("");
let limit = ref("");
let totalVal = ref("");

console.log("accessTokenCookie: " + accessToken);
if (!accessToken) {
  navigateTo("/auth");
}

let response;

const conf = useRuntimeConfig();
const backend = conf.public.backend;

fetch(backend + "/api/portfolio", {
    method: "POST",
    body: JSON.stringify({
        "authToken": `${accessToken}`,
    }),
    headers: {
        'Content-Type': 'application/json',
    }
}).then(async (result) => {
    return result.json();
}).then((data) => {
  const json = data.response;
  console.log(json);

  cb.value = json.catBux;
  job.value = json.job;
  limit.value = json.limit;
  totalVal.value = json.totalStockValue;
});
</script>
