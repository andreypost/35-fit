<template>
  <div>
    <div class="flex_center_bet">
      <NuxtLink to="/" class="navigate_logo">
        <Logo class="icon_class" />
      </NuxtLink>
      <NuxtLink to="/faq">Faq</NuxtLink>
      <NuxtLink to="/training">Training</NuxtLink>
    </div>
    <button class="green_button" @click="refresh">Refresh the page</button>
    <h1>I am rendered on {{ renderedOn }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '~/assets/icons/logo.svg?inline'

export default Vue.extend({
  name: 'IndexPage',
  components: {
    Logo,
  },
  async asyncData(context) {
    console.log('contex: ', context)
    try {
      const getFileData = await context.$axios.$get(
        `${context.env.apiUrl}/file/read`
      )
      console.log('/file/read - read file data: ', getFileData)
    } catch (error: any) {
      console.error(error)
    }
    return { renderedOn: process.client ? 'client' : 'server' }
  },
  created() {
    console.log('on created: ', this.renderedOn)
  },
  methods: {
    refresh() {
      this.$nuxt.refresh()
    },
  },
  mounted() {
    console.log(this, window, 'on mounted: ', this.renderedOn)
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 1000)
    })
  },
})
</script>

<style lang="scss" scoped>
.navigate_logo svg {
  width: 100px;
  height: 44px;
  display: block;
  fill: #000044;
  transition: fill 0.2s;
  @media (hover: hover) {
    &:hover {
      fill: #59b894;
    }
  }
}
</style>
