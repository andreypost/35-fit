<template>
  <div>
    <h1 class="faq">Hello from FAQ page!</h1>
    <h1>I am rendered on {{ renderedOn }}</h1>
  </div>
</template>

<script lang="ts">
export default {
  name: 'FaqPage',
  async asyncData({ env, $axios }: any) {
    try {
      const getAuthAllUsers = await $axios.get(`${env.apiUrl}/auth/users`, {
        withCredentials: true,
      })
      console.log('/auth/users - get all users: ', getAuthAllUsers.data)
    } catch (error: any) {
      console.error(error)
    }
    return { renderedOn: process.client ? 'client' : 'server' }
  },
}
</script>

<style lang="scss" scoped>
.faq {
  background: url(~/assets/icons/logo.svg);
  background: url('~assets/img/patterns/main_header.svg') no-repeat center
    center / cover;
}
</style>
