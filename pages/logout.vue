<script setup lang="ts">
import { useCookie } from 'nuxt/app';
const accessTokenCookie = useCookie("accessToken");
const idCookie = useCookie("discordId")
accessTokenCookie.value = null;
idCookie.value = null;
navigateTo("/");
</script>
<template>
</template>