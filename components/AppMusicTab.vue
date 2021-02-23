<template>
  <div
    class="flex rounded-br-xl rounded-bl-xl items-center border-t fixed bottom-0 left-0 w-full px-5 py-3 font-semibold bg-white space-x-4 text-gray-700 text-xs"
  >
    <div class="cursor-pointer" @click="$emit('currentTab', 'discover')">
      Discover
    </div>
    <div class="cursor-pointer" @click="$emit('currentTab', 'playlists')">
      Playlists
    </div>
  </div>
</template>
