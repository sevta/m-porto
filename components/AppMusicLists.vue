<template>
  <div
    class="musicLists absolute w-60 pb-20 bottom-14 transform origin-bottom left-0 bg-white dark:bg-black p-4"
  >
    <div class="space-y-2">
      <div class="text-sm dark:text-white" v-for="item in 10" :key="item">
        music lists
      </div>
    </div>
  </div>
</template>
