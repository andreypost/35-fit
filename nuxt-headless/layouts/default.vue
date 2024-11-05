<template>
  <div>
    <HeaderNavigate />
    <Nuxt />
    <Footer />
    <MenuModal />
  </div>
</template>

<script>
import MenuModal from '~/modals/MenuModal.vue'

export default {
  name: 'DefaultLayout',
  scrollToTop: true,
  components: {
    MenuModal,
  },
  methods: {
    keyDownHandler(e) {
      e.key === 'Escape' && this.$store.commit('unsetAllModal')
    },
  },
  mounted() {
    window.addEventListener('keydown', this.keyDownHandler)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keyDownHandler)
  },
}
</script>

<style lang="scss"></style>
