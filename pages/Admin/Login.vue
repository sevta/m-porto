<template>
  <div>
    <div class="text-4xl font-medium tracking-tighter mb-5">
      Login
    </div>
    <div>
      <input class="p-3 border" type="text" placeholder="username" />
    </div>

    <div>
      <input class="p-3 border" type="password" placeholder="password" />
    </div>
    <div class="mt-4">
      <NuxtLink to="/admin" class="px-5 py-2 bg-black text-white"
        >Signin</NuxtLink
      >
    </div>
  </div>
</template>

<script>
export default {
  layout: 'Admin'
}
</script>
