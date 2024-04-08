<script setup lang="ts">
const conf = useRuntimeConfig();
const backend = conf.public.backend;
navigateTo(String(backend + "/api/bounce?callbackUri=callback"), { external: true });
</script>

<template>   
</template>