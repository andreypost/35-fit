<template>
  <main data-aos="fade" class="faq_page page_view">
    <HeaderBanner
      className="faq"
      title="nav.faq"
      description="header_banner.training_becomes"
    >
      <section class="section faq">
        <TestingRoles />
        <!-- <div>
          <h1 class="faq">Hello from FAQ page!</h1>
          <h1>I am rendered on {{ renderedOn }}</h1>
        </div> -->
      </section>
    </HeaderBanner>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import HeaderBanner from '~/components/HeaderBanner.vue'
import TestingRoles from '~/components/TestingRoles.vue'

export default Vue.extend({
  name: 'FaqPage',
  scrollToTop: true,
  async asyncData({ env, $axios }: any) {
    try {
      const getAuthAllUsers = await axios.get(`${env.apiUrl}/user/users`, {
        withCredentials: true,
      })
      console.log('/user/users - get all users: ', getAuthAllUsers.data)
    } catch (error: any) {
      console.error(error)
    }
    return { renderedOn: process.client ? 'client' : 'server' }
  },
})
</script>

<style lang="scss" scoped>
.faq {
  background: url(~/assets/icons/Logo.svg);
  background: url('~assets/img/patterns/main_header.svg') no-repeat center
    center / cover;
}
</style>
