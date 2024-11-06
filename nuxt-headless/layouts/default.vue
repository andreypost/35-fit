<template>
  <div class="default_layout">
    <HeaderNavigate />
    <Nuxt />
    <Footer />
    <MenuModal />
  </div>
</template>

<script lang="ts">
import AOS from 'aos'
import 'aos/dist/aos.css'
import MenuModal from '~/modals/MenuModal.vue'

export default {
  name: 'DefaultLayout',
  // scrollToTop: true,
  components: {
    MenuModal,
  },
  methods: {
    keyDownHandler(this: any, event: KeyboardEvent) {
      event.key === 'Escape' && this.$store.commit('unsetAllModal')
    },
  },
  mounted(this: any) {
    window.addEventListener('keydown', this.keyDownHandler)
  },
  beforeDestroy(this: any) {
    window.removeEventListener('keydown', this.keyDownHandler)
  },
  watch: {
    '$i18n.locale'() {
      setTimeout(() => AOS.refresh(), 0)
    },
  },
}
</script>

<style lang="scss"></style>
