<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { watch } from 'vue'

const colorMode = useColorMode()

watch(
    () => colorMode.preference,
    (newValue) => {
      document.body.className = newValue === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100'
    },
    { immediate: true }
)
</script>
