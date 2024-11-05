<template>
  <div :class="['header_banner', className]">
    <section class="section">
      <h1 class="b900 blue">{{ title && $t(title) }}</h1>
      <p class="grey">{{ description && $t(description) }}</p>
      <slot />
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HeaderBanner',
  props: {
    className: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
  },
}
</script>

<style lang="scss" scoped>
.header_banner {
  section {
    padding-top: 144px;
  }
  h1 {
    font-size: 36px;
    margin-bottom: 40px;
  }
  p {
    max-width: 400px;
    font-size: 18px;
    padding-bottom: 70px;
  }
  &.main h1 {
    margin-bottom: 120px;
    text-transform: uppercase;
    text-align: center;
    @media (min-width: 1024px) {
      margin-bottom: 210px;
    }
  }
  @media (max-width: 1023px) {
    section {
      h3 {
        font-size: 16px;
      }
    }
  }
  @media (min-width: 1024px) {
    section {
      padding-top: 170px;
      h1 {
        font-size: 48px;
      }
      h3 {
        padding-bottom: 140px;
      }
    }
  }
}
</style>
