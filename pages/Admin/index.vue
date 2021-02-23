<template>
  <div class="flex flex-col">
    <div class="text-5xl font-medium tracking-tighter">
      Music
    </div>
    <div class="relative mt-3">
      <input
        type="text"
        class="w-full"
        placeholder="Search.."
        v-model="query"
        @keydown.enter="search"
      />
      <div
        v-if="result.length > 0"
        class="absolute top-1/2 transform -translate-y-1/2 right-8 cursor-pointer underline text-sm"
        @click="clearSearch"
      >
        clear
      </div>
    </div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else class="grid grid-cols-5 gap-5 mt-10">
      <div
        class="shadow-lg rounded-lg overflow-hidden relative pb-8"
        v-for="(item, key) in result"
        :key="key"
      >
        <div class="w-full h-44 overflow-hidden">
          <img :src="item.thumbnails[0].url" alt="" />
        </div>
        <div class="p-3 relative">
          <div class="text-sm">{{ item.title }}</div>
        </div>
        <button
          class="absolute bottom-0 left-0 w-full text-white bg-pink-500 text-sm"
          @click="saveMusic(item)"
        >
          <div v-if="loadingAddMusic && item.id == saveMusicId">
            Loading...
          </div>
          <div v-else>
            add
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'Admin',

  data() {
    return {
      music: {
        id: 'dsifs98ym4rmlfksd',
        title: '',
        url: ''
      },
      query: '',
      loading: false,
      loadingAddMusic: false,
      result: [],
      saveMusicId: '',
      myMusic: []
    }
  },

  async asyncData({ $content }) {
    const musicData = await $content('music').fetch()

    return {
      musicData
    }
  },

  async mounted() {
    const myMusic = await this.$content('music').fetch()
    this.myMusic = myMusic
  },

  methods: {
    async saveMusic(item) {
      this.saveMusicId = item.id
      this.loadingAddMusic = true
      let music = {
        title: item.title,
        thumbnail: item.thumbnails[0].url,
        url: item.url,
        duration: item.duration,
        id: item.id
      }
      try {
        const resp = await this.$axios.post('/api/music/save', music)
        console.log(resp)
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingAddMusic = false
        this.saveMusicId = null
      }
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
    },

    clearSearch() {
      this.result = []
      this.query = ''
    }
  }
}
</script>
