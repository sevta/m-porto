<template>
  <div class="space-y-10 divide-y-2">
    <div class="pt-10">
      <div class="text-5xl tracking-tighter mb-4">
        Heading
      </div>
      <div class="space-y-4">
        <div class="flex flex-col text-sm">
          <label class="text-gray-500 mb-2 capitalize" for=""
            >heading name</label
          >
          <input type="text" v-model="content.headingName" />
        </div>
        <div class="flex flex-col text-sm">
          <label class="text-gray-500 mb-2 capitalize" for=""
            >heading content</label
          >
          <textarea
            v-model="content.headingContent"
            name=""
            id=""
            cols="30"
            rows="10"
            class="p-3 border"
          ></textarea>
        </div>
        <div class="flex flex-col text-sm">
          <label class="text-gray-500 mb-2 capitalize" for=""
            >heading name</label
          >
          <input type="text" name="" value="" />
        </div>
        <div>
          <button @click="save">Save</button>
        </div>
      </div>
    </div>
    <div class="pt-10">
      <div class="text-5xl tracking-tighter mb-4">
        Timeline
      </div>
      <div class="space-y-4">
        <div class="flex flex-col text-sm">
          <label class="text-gray-500 mb-2 capitalize" for=""
            >heading name</label
          >
          <input type="text" v-model="content.headingName" />
        </div>
        <div class="flex flex-col text-sm">
          <label class="text-gray-500 mb-2 capitalize" for=""
            >heading content</label
          >
          <textarea
            v-model="content.headingContent"
            name=""
            id=""
            cols="30"
            rows="10"
            class="p-3 border"
          ></textarea>
        </div>
        <div class="flex flex-col text-sm">
          <label class="text-gray-500 mb-2 capitalize" for=""
            >heading name</label
          >
          <input type="text" name="" value="" />
        </div>
        <div>
          <button @click="save">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'Admin',
  data() {
    return {
      content: {
        headingName: '',
        headingContent: ''
      }
    }
  },

  mounted() {
    this.getContent()
  },

  methods: {
    async getContent() {
      const homeContent = await this.$content('home').fetch()
      this.content.headingName = homeContent.headingName
      this.content.headingContent = homeContent.headingContent
      console.log(homeContent)
    },
    async save() {
      try {
        const resp = await this.$axios.post('/api/content/save', this.content)
        if (resp.data.msg == 'success') {
          alert('success')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
