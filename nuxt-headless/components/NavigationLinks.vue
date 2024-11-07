<template>
  <ul v-if="links.length" :class="styleName">
    <li v-for="{ route, dictionary } in links" :key="dictionary">
      <NuxtLink
        :class="bold"
        :style="{
          color: $route.path == route ? '#000044' : color,
        }"
        :to="route"
        >{{ $t(dictionary) }}</NuxtLink
      >
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  props: {
    styleName: { type: String, default: '' },
    links: {
      type: Array as () => { route: string; dictionary: string }[],
      required: true,
    },
    bold: { type: String, default: '' },
    color: { type: String, default: '' },
  },
}
</script>
