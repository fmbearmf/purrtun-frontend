<script setup lang="ts">
import { useCookie } from 'nuxt/app';
const accessTokenCookie = useCookie("token");
accessTokenCookie.value = null;
navigateTo("/");
</script>
<template>
</template>