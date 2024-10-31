<template>
  <ul v-if="links.length" class="navigate_routes">
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

<script>
export default {
  props: { links: [], bold: '', color: '' },
}
</script>
