<template>
  <div class="section" data-cy="error">
    <h1 v-if="error.statusCode === 404">404 - Page not found'</h1>
    <p v-if="error.statusCode === 404 && error.message">
      {{ error.message }}
    </p>
    <p v-if="error.statusCode === 500 && error.message">
      {{ error.message }}
    </p>
    <div v-if="error.statusCode === 503 && error.message">
      <h1>{{ error.message }}</h1>
      <p>This site is being upgraded, and can't currently be accessed.</p>
      <p>
        It should be back up and running very soon. Please check back in a bit!
      </p>
    </div>
    <p v-else-if="error.statusCode">
      "Sorry, we couldn't find the page you were looking for."
    </p>
    <h1 v-else>'An error occurred'</h1>
    <NuxtLink to="/" class="green_button">'Visit Home page</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error',
  mounted() {
    console.log(this.error)
  },
}
</script>
