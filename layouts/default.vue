<template>
  <div class="relative w-full min-h-screen bg-gray-200 font-inter">
    <div class="w-full h-screen fixed top-0 left-0 z-0">
      <!-- <img
        class="w-full h-full object-center object-cover"
        src="https://buffer.com/library/content/images/library/wp-content/uploads/2017/09/13-Places-to-Find-Background-Music-for-Video-Cover-Image-2.jpg"
        alt=""
      /> -->
      <canvas
        class="w-full h-full"
        ref="granimCanvas"
        id="canvas-complex"
      ></canvas>
    </div>
    <div class="appWrapper z-10 relative  w-full min-h-screen ">
      <nuxt />
    </div>
    <AppMusicPlayer :music="musicData" />
  </div>
</template>

<script>
import Granim from 'granim'
export default {
  data() {
    return {
      granimInstance: null
    }
  },
  created() {
    let playlists = localStorage.getItem('playlists')
    if (playlists) {
      this.$store.commit('INIT_DATA', JSON.parse(playlists))
      console.log('parse', JSON.parse(playlists))
    }
  },
  mounted() {
    this.setupGranim()
  },
  methods: {
    setupGranim() {
      this.granimInstance = new Granim({
        element: this.$refs.granimCanvas,
        direction: 'left-right',
        isPausedWhenNotInView: true,
        states: {
          'default-state': {
            gradients: [
              ['#ff9966', '#ff5e62'],
              ['#00F260', '#0575E6'],
              ['#e1eec3', '#f05053']
            ]
          }
        }
      })
    }
  }
}
</script>

<style scoped>
@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
  .appWrapper {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.8);
  }
}
</style>
