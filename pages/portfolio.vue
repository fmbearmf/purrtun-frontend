<template>
    <div class="bg-black min-h-dvh flex flex-col">
      <Header />
      <div class="flex-grow flex flex-col sm:flex-row my-5">
        <div class="flex-grow sm:w-1/3 hidden md:block">
            <!-- Ad space maybe-->
        </div>
        <div class="flex-grow sm:w-1/3 mx-4">
            <h1 class="text-center text-5xl font-kode font-bold">Portfolio</h1>
            <h2 class="text-3xl font-kode">Stats<br></h2>
            <h2 class="text-3xl font-kode" :key="cb">|> CatBux: <a class="text-fuchsia-400">{{ Number(cb).toLocaleString() }}</a></h2>
            <h2 class="text-3xl font-kode" :key="job">|> Job: <a class="text-fuchsia-400">{{ job }}</a></h2>
            <h2 class="text-3xl font-kode" :key="limit">|> CatBux Limit: <a class="text-fuchsia-400">{{ Number(Number(limit) / 100).toLocaleString() }}</a></h2>
            <h2 class="text-3xl font-kode" :key="totalVal">|> Total Stock Value: <a class="text-fuchsia-400">{{ Number(totalVal).toLocaleString() }}</a></h2>
            <h2 class="text-3xl font-kode"><br>Stocks<br></h2>
            <div :key="response.stocks" v-for="stock in response.stocks"><h2 class="text-3xl font-kode"><br>|> {{ $util.capitalizeFirst(stock.catColor) }}: <br> <a class="text-fuchsia-400">{{ Number(stock.numberOfShares).toLocaleString() }}</a>/<a class="text-fuchsia-600">{{ Number(stock.totalShares).toLocaleString() }}</a> shares, <br> <a class="text-fuchsia-400">{{ Number(stock.totalValue).toLocaleString() }}</a> CatBux</h2></div>
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

let cb = ref("");
let job = ref("");
let limit = ref("");
let totalVal = ref("");

console.log("accessTokenCookie: " + accessToken);

let response: any = ref({});

const conf = useRuntimeConfig();
const backend = conf.public.backend;

fetch(backend + "/portfolio", {
    method: "POST",
    body: pack({
        "authToken": `${accessToken}`,
    }),
    headers: {
        'Content-Type': 'application/msgpack',
    }
}).then((response) => {
  if (response.status == 401) {
    navigateTo("/register");
  }
  if (response.status == 400) {
    navigateTo("/auth");
  }
  return response.arrayBuffer();
})
.then(arrayBuffer => unpack(new Uint8Array(arrayBuffer)))
.then((data) => {
  console.log(data);
  const json = data.response;
  response = ref(json);
  console.log(response);

  if (data.error) {
    if (process.client) document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    navigateTo("/");
    return;
  }
  
  cb.value = json.catBux;
  job.value = json.job;
  limit.value = json.limit;
  totalVal.value = json.totalStockValue;
});
</script>
