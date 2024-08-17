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
      <div :key="holdings" v-for="holding in holdings">
        <h2 class="text-3xl font-kode"><br>|> {{ $util.capitalizeFirst(holding.stock.catColor) }}: <br>
          <a class="text-fuchsia-600">{{ Number(holding.numberOfShares).toLocaleString() }}</a> Shares<br>
          <a class="text-fuchsia-400">{{ Number(holding.totalValue).toLocaleString() }}</a> CatBux</h2>
      </div>
    </LoadingWrapper>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useLoadingStore } from '@/stores/loading';
import {useRoute} from "nuxt/app";
const { $api } = useNuxtApp();
const route = useRoute()

const loadingStore = useLoadingStore();
let cb = ref("");
let job = ref("");
let limit = ref("");
let totalVal = ref("");
let holdings: any = ref([]);

const fetchPortfolio = async () => {

  try {
    const data = await $api(`/portfolio/${route.params.id}`, { method: 'GET' });
    if (data) {
      console.log(data)
      holdings.value = data.holdings;
      cb.value = data.catBux;
      job.value = data.job;
      limit.value = data.limit;
      totalVal.value = data.totalStockValue;
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
