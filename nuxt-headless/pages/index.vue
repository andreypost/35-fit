<template>
  <div class="flex_center_bet">
    <NuxtLink to="/" class="navigate_logo">
      <Logo class="icon_class" />
    </NuxtLink>
    <NuxtLink to="/faq">Faq</NuxtLink>
    <NuxtLink to="/training">Training</NuxtLink>
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
