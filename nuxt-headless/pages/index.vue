<template>
  <div>
    <button class="green_button" @click="refresh">Refresh the page</button>
    <!-- <button v-if="renderedOn === 'client'" class="grey_button" @click="$fetch">
      Call fetch method
    </button> -->
    <h1>I am rendered on {{ renderedOn }}</h1>
    <p @click="changeLocale" v-html="$t('common.book_your_training')"></p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  async asyncData(context) {
    console.log('asyncData contex: ', context)
    try {
      const getFileData = await context.$axios.$get(
        `${context.env.apiUrl}/file/read`
      )
      console.log(
        'asyncData: /file/read - read file data: ',
        getFileData?.length
      )
    } catch (error: any) {
      console.error(error)
    }
    return { renderedOn: process.client ? 'client' : 'server' }
  },
  async fetch(context) {
    console.log('fetch contex: ', this)
    try {
      const getFileData = await context.$axios.$get(
        `${context.env.apiUrl}/file/read`
      )
      console.log('fetch: /file/read - read file data: ', getFileData)
    } catch (error: any) {
      console.error(error)
    }
  },
  beforeCreate() {
    console.log('on beforeCreate: ', this)
  },
  created() {
    console.log('on created: ', this.renderedOn)
  },
  methods: {
    refresh() {
      this.$nuxt.refresh()
    },
    changeLocale() {
      this.$i18n.locale = 'de'
    },
  },
  mounted() {
    console.log('on mounted: ', this.renderedOn)
    console.log('on mounted: ', this, window)
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 1000)
    })
  },
})
</script>

<style lang="scss" scoped></style>
