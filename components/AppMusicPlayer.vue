<template>
  <div class="fixed bottom-0 left-0 w-full flex py-5 z-20 px-10">
    <div ref="ytPlayer" class="absolute -left-full"></div>
    <div
      class="musicPanel w-auto px-5 py-5 relative rounded-3xl shadow-xl flex flex-col justify-center"
    >
      <div class="flex items-center">
        <div
          class="relative w-28 cursor-pointer hover:scale-110 transform transition-all duration-200"
          @click="doToggleMusicLists"
        >
          <div
            ref="musicCover"
            class="music-cover absolute  -top-20 overflow-hidden w-24 h-24 ring-2 ring-gray-200 rounded-full flex items-center justify-center bg-red-500"
          >
            <div class="w-5 h-5 rounded-full z-10 bg-black "></div>
            <img
              class="w-full h-full object-cover object-center z-0"
              :src="currentPlaying.thumbnail"
              alt=""
            />
          </div>
        </div>
        <div class="relative flex flex-col w-52">
          <div class="mb-1 dark:text-white truncate text-sm">
            <a :href="currentPlaying.url" target="_blank">
              {{ currentPlaying.title }}
            </a>
          </div>
          <div class="text-gray-500 text-xs">
            title song
          </div>
        </div>
        <div class="relative flex items-center justify-center ml-2 space-x-2">
          <div class="cursor-pointer">
            <svg
              class="w-6 h-6 dark:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"
              ></path>
            </svg>
          </div>
          <div class="cursor-pointer" @click="play">
            <svg
              v-if="!isPlaying"
              class="w-10 h-10 dark:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              v-else
              class="w-10 h-10 dark:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div class="cursor-pointer">
            <svg
              class="w-6 h-6 dark:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <transition name="fade">
        <div class="flex divide-y-2 flex-col pt-5" v-if="toggleMusicLists">
          <div
            class="flex items-center cursor-pointer py-2 hover:mr-2 transition"
            v-for="item in music"
            :key="item"
            @click="playYtMusic(item)"
          >
            <div class="w-8 hidden h-8 mr-2 rounded overflow-hidden">
              <img :src="item.thumbnail" alt="" />
            </div>
            <div class="text-sm mr-2 font-semibold">
              {{ item.duration }}
            </div>
            <div class="text-xs text-gray-500">
              {{ item.title }}
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { TweenLite, Linear } from 'gsap/all'
import YTPlayer from 'yt-player'

export default {
  data() {
    return {
      isPlaying: false,
      tl: null,
      toggleMusicLists: false,
      music: [],
      player: null,
      currentPlaying: {}
    }
  },

  mounted() {
    console.log(this.musicData)
    this.$content('music')
      .sortBy('updatedAt', 'desc')
      .fetch()
      .then(data => {
        this.music = data
        this.currentPlaying = data[0]
      })
  },

  methods: {
    play() {
      this.isPlaying = !this.isPlaying
      this.$nextTick(() => {
        console.log('is playing', this.isPlaying)

        if (this.isPlaying) {
          // this.aniamtePlay()
          if (this.player) this.aniamtePlay()
          this.player?.play()
          if (!this.player) {
            this.playYtMusic(this.currentPlaying)
          }
        } else {
          this.animatePause()
          this.player?.pause()
        }
      })
    },
    aniamtePlay() {
      this.tl = TweenLite.to(this.$refs.musicCover, 5, {
        rotation: '+=360',
        repeat: -1,
        transformOrigin: '50% 50%',
        ease: Linear.easeNone
      })
    },
    animatePause() {
      this.tl.pause()
    },
    playYtMusic(item) {
      this.currentPlaying = item
      this.player && this.animatePause()
      this.player?.destroy()
      this.player = new YTPlayer(this.$refs.ytPlayer)
      this.player.load(item.id)
      this.player.setVolume(100)
      this.player.play()
      this.aniamtePlay()
      this.isPlaying = true
    },
    doToggleMusicLists() {
      this.toggleMusicLists = !this.toggleMusicLists
    },
    playMedia() {}
  }
}
</script>

<style scoped>
.music-cover.animate {
  animation-name: spin;
  animation-duration: 5000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
  .musicPanel {
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.5);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
