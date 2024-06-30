<template>
  <div class="bg-black min-h-dvh flex flex-col">
    <Header />
    <div class="flex-grow flex flex-col sm:flex-row my-5">
      <div class="flex-grow sm:w-1/3 hidden md:block">
        <!-- Ad space maybe-->
      </div>
      <slot/>
      <div class="flex-grow sm:w-1/3 hidden md:block">
        <!-- Ad space maybe-->
      </div>
    </div>
  </div>
</template>