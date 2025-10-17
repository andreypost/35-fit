<template>
  <main data-aos="fade" class="main_page page_view">
    <HeaderBanner className="main" title="nav.personal_training">
      <div class="header_new blue">
        <h4 class="b900 uppercase relative">
          <TieFit class="absolute" />
          {{ $t('header_banner.new_standard') }}
        </h4>
        <p class="b900 uppercase">
          35<span>€</span>
          <span class="header_month">/{{ $t('header_banner.month') }}</span>
        </p>
      </div>
      <!-- <button class="green_button" @click="refresh">Refresh the page</button>
      <h1 :[dataAos]="attr">I am rendered on {{ renderedOn }}</h1> -->
    </HeaderBanner>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import TieFit from '~/assets/icons/TieFit.svg?inline'

export default Vue.extend({
  name: 'IndexPage',
  scrollToTop: true,
  components: {
    TieFit,
  },
  data() {
    return {
      dataAos: 'data-aos',
      attr: 'off',
    }
  },
  async asyncData(context) {
    // this - is undefined
    // console.log('asyncData contex: ', context)
    try {
      const getFileData = await context.$axios.$get(
        `${context.env.apiUrl}/file/csv/read`
      )
      console.log('async asyncData: /file/read: ', getFileData?.length)
    } catch (error: unknown) {
      console.error('async asyncData: ', error)
    }
    return { renderedOn: process.client ? 'client' : 'server' }
  },
  async fetch(context) {
    // console.log('fetch this: ', this)
    // console.log('fetch contex: ', context)
    try {
      const getFileData = await context.$axios.$get(
        `${context.env.apiUrl}/file/csv/read`
      )
      console.log('async fetch: /file/read: ', getFileData.length)
    } catch (error: unknown) {
      console.error('async fetch: ', error)
    }
  },
  beforeCreate() {
    // console.log('on beforeCreate: ', this)
  },
  created() {
    // console.log('on created: ', this.renderedOn)
  },
  computed: {
    // message() {
    //   return 'Hello!!!'.split('').reverse().join('') + ' ' + Date.now()
    // },
  },
  methods: {
    // message() {
    //   return 'Hello!!!'.split('').reverse().join('') + ' ' + Date.now()
    // },
    // refresh() {
    //   this.attr = 'on'
    //   this.dataAos = 'data'
    //   this.$nuxt.refresh()
    // },
  },
  // mounted() {
  // console.log('on mounted: ', this.renderedOn)
  // console.log('on mounted: ', this, window)
  // this.$nextTick(() => {
  //   this.$nuxt.$loading.start()
  //   setTimeout(() => this.$nuxt.$loading.finish(), 1000)
  // })
  // },
})
</script>

<style lang="scss" scoped>
.main_page {
  .header_new {
    display: grid;
    justify-content: center;
    padding-bottom: 121px;
    h4 {
      font-size: 22px;
      svg {
        left: -60px;
        top: -68px;
      }
    }
    p {
      font-size: 54px;
      span {
        font-size: 28px;
      }
      .header_month {
        color: #ff6376;
      }
    }
  }
  .rupor {
    display: grid;
    gap: 25px;
    text-align: center;
    .rupor_trial,
    .rupor_book {
      padding: 30px 20px;
    }
    .rupor_trial {
      background: #000044;
      svg {
        top: -70px;
        left: -30px;
        @media (max-width: 1023px) {
          width: 120px;
          height: 120px;
        }
      }
      h6 {
        font-size: 86px;
        span {
          font-size: 64px;
        }
      }
      p {
        font-size: 24px;
        margin-bottom: 23px;
      }
    }
    .rupor_book {
      display: flex;
      flex-flow: column;
      p {
        font-size: 32px;
        margin-bottom: 76px;
      }
      a {
        height: 54px;
        font-size: 15px;
      }
    }
  }
  .rupor_member {
    box-sizing: border-box;
    max-width: 765px;
    margin: 25px auto 0;
    padding: 28px 30px 13px;
    h6 {
      font-size: 22px;
    }
    p {
      font-size: 16px;
    }
  }
  .main_icons {
    gap: 40px;
    h3 {
      max-width: 280px;
    }
  }
  .main_wow article {
    margin-bottom: 30px;
    p {
      svg {
        width: 160px;
        left: -60px;
        top: -65px;
      }
      font-size: 46px;
      span {
        font-size: 24px;
      }
      .header_month {
        color: #ff6376;
      }
    }
    h2 {
      font-size: 32px;
    }
  }
  @media (max-width: 1023px) {
    h4 svg {
      width: 163px;
      height: 90px;
    }
    .rupor_trial,
    .rupor_book,
    .rupor_member {
      box-sizing: border-box;
      width: 100%;
      max-width: 330px;
      justify-self: center;
    }
    .main_icons {
      flex-flow: column;
    }
    .main_wow article {
      flex-flow: column;
      gap: 75px;
    }
  }
  @media (min-width: 1024px) {
    .header_new {
      h4 svg {
        left: -80px;
        top: -91px;
      }
    }
    .rupor {
      grid-template-columns: 370px 370px;
      justify-content: center;
      .rupor_trial,
      .rupor_book {
        padding: 37px 47px;
      }
      .rupor_trial svg {
        top: -100px;
        left: -100px;
      }
      .rupor_book a {
        height: 64px;
        font-size: 18px;
      }
    }
    .main_wow article {
      gap: 120px;
    }
  }
}
</style>
