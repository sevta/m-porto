<template>
  <div>
    <div>
      <input
        type="text"
        class="w-full p-2 bg-transparent text-sm"
        placeholder="search from youtube"
        v-model="query"
        @keydown.enter="search"
      />
    </div>
    <div v-if="loading">
      Loading...
    </div>
    <div class=" divide-y-2">
      <div
        class="text-sm py-2 space-x-2 flex justify-between pr-5"
        v-for="(item, key) in result"
        :key="key"
      >
        <div class="flex items-center space-x-2">
          <div class="bg-red-400 text-white px-1 rounded" v-if="item.isLive">
            LIVE
          </div>
          <div class="font-semibold">
            {{ item.duration }}
          </div>
          <div>
            {{ item.title }}
          </div>
        </div>
        <div class="cursor-pointer" @click="addToPlaylists(item)">
          +
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      loading: false,
      result: []
    }
  },
  mounted() {
    // this.query = 'sev'
    // this.search()
  },
  methods: {
    addToPlaylists(item) {
      this.$store.dispatch('addToPlaylists', item)
    },
    async search() {
      this.loading = true
      try {
        const resp = await this.$axios.get(
          `/api/music/yt/search/?q=${this.query}`
        )
        this.result = resp.data.result
        console.log(this.result)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
