<template>
  <div class="flex-grow sm:w-1/3 mx-4">
    <h1 class="text-center text-5xl font-kode font-bold">Portfolio</h1>
    <LoadingWrapper>
      <h2 class="text-3xl font-kode">Stats<br></h2>
      <h2 class="text-3xl font-kode" :key="cb">|> CatBux: <a class="text-fuchsia-400">{{ Number(cb).toLocaleString() }}</a></h2>
      <h2 class="text-3xl font-kode" :key="job">|> Job: <a class="text-fuchsia-400">{{ job }}</a></h2>
<!--      <h2 class="text-3xl font-kode" :key="limit">|> CatBux Limit: <a class="text-fuchsia-400">{{ Number(Number(limit) / 100).toLocaleString() }}</a></h2>-->
      <h2 class="text-3xl font-kode" :key="totalVal">|> Total Stock Value: <a class="text-fuchsia-400">{{ Number(totalVal).toLocaleString() }}</a></h2>
      <h2 class="text-3xl font-kode"><br>Stocks<br></h2>
      <div :key="response.stocks" v-for="stock in response.stocks">
        <h2 class="text-3xl font-kode"><br>|> {{ $util.capitalizeFirst(stock.catColor) }}: <br>
          <a class="text-fuchsia-600">{{ Number(stock.numberOfShares).toLocaleString() }}</a> Shares<br>
          <a class="text-fuchsia-400">{{ Number(stock.totalValue).toLocaleString() }}</a> CatBux</h2>
      </div>
    </LoadingWrapper>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useLoadingStore } from '@/stores/loading';
const { $api } = useNuxtApp();

const loadingStore = useLoadingStore();
let cb = ref("");
let job = ref("");
let limit = ref("");
let totalVal = ref("");
let response: any = ref({});

const fetchPortfolio = async () => {

  try {
    const data = await $api('/portfolio', { method: 'GET' });
    if (data) {
      response.value = data.response;
      cb.value = data.response.catBux;
      job.value = data.response.job;
      limit.value = data.response.limit;
      totalVal.value = data.response.totalStockValue;
    }
  } catch (error) {
    console.error('Error fetching portfolio:', error);
  }
};

onMounted(() => {
  loadingStore.setLoading(true);
  fetchPortfolio(); // Initial fetch
  loadingStore.setLoading(false);
  const interval = setInterval(fetchPortfolio, 3000); // Refresh every 3 seconds

  // Clear the interval when the component is unmounted
  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>
