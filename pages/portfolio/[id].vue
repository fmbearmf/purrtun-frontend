<template>
  <div class="flex-grow sm:w-1/3 mx-4">
    <h1 class="text-center text-5xl font-kode font-bold">Portfolio</h1>
    <LoadingWrapper>
      <h2 class="text-3xl font-kode">|> CatBux<br></h2>
      <h2 class="text-3xl font-kode">
        <CatBux/> <a class="text-fuchsia-400">{{ formatNumber(cb) }}</a>
        <span class="ml-1"> Balance</span>
        <br>
        <CatBux/> <a class="text-fuchsia-400">{{ formatNumber(totalVal) }}</a>
        <span class="ml-1"> Assets</span>
      </h2>
      <h2 class="text-3xl font-kode">|> Job: <a class="text-fuchsia-400">{{ job }}</a></h2>
      <h2 class="text-3xl font-kode"><br>Stocks<br></h2>
      <div :key="holdings" v-for="holding in holdings">
        <h2 class="text-3xl font-kode"><br>|> {{ $util.capitalizeFirst(holding.stock.catColor) }}: <br>
          <a class="text-fuchsia-600">{{ formatNumber(holding.numberOfShares) }}</a> Shares<br>
          <CatBux/> <a class="text-fuchsia-400">{{ formatNumber(holding.totalValue) }}</a>
        </h2>
      </div>
    </LoadingWrapper>
  </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue';
import {useLoadingStore} from '@/stores/loading';
import {useRoute} from "nuxt/app";
import CatBux from "~/components/CatBux.vue";

const {$api} = useNuxtApp();
const route = useRoute()

const loadingStore = useLoadingStore();
let cb = ref("");
let job = ref("");
let limit = ref("");
let totalVal = ref("");
let holdings: any = ref([]);

const fetchPortfolio = async () => {

  try {
    const data = await $api(`/portfolio/${route.params.id}`, {method: 'GET'});
    if (data) {
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

const formatNumber = (num: number) => {
  return Number(num).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

onMounted(() => {
  loadingStore.setLoading(true);
  fetchPortfolio(); // Initial fetch
  loadingStore.setLoading(false);
  const interval = setInterval(fetchPortfolio, 1500); // Refresh at interval

  // Clear the interval when the component is unmounted
  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>
