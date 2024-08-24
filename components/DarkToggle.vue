<!--Icons: https://icones.js.org/collection/ic-->
<template>
  <div class="flex flex-row items-center justify-center">
    <Icon
        @click="toggleTheme"
        name="ic:baseline-wb-sunny"
        v-show="colorMode.preference === 'light'"
        size="1em"
        class="theme-icon"
    />
    <Icon
        @click="toggleTheme"
        name="ic:twotone-dark-mode"
        v-show="colorMode.preference === 'dark'"
        size="1em"
        class="theme-icon"
    />
  </div>
</template>

<script setup>
const colorMode = useColorMode();
const toggleTheme = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
};
</script>

<style scoped>
.theme-icon {
  @apply w-7 h-7 cursor-pointer transition-transform duration-100;
}
.theme-icon:hover {
  @apply scale-125;
}
</style>
