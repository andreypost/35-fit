<template>
  <div
    :class="['base_modal_styles menu_modal_styles', $store.state.menuActive]"
    @click="
      (e) => e.target === e.currentTarget && $store.commit('unsetMenuModal')
    "
  >
    <nav class="relative shadow_radius">
      <CrossRed
        class="cross_icon absolute"
        @click="$store.commit('unsetMenuModal')"
      />
      <ul class="flex_center_bet_col center">
        <NavigationLinks :links="publicLinks" bold="b700" color="#737373" />
        <li :class="['login', $store.state.user ? 'signOut' : 'signIn']">
          <User :user="$store.state.user" styleName="menu_modal" />
        </li>
        <li class="buyСlass">
          <NuxtLink :to="RESERVE_ROUTE" class="flex_center_center b700 white">
            {{ $t('nav.buy') }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import CrossRed from '~/assets/icons/CrossRed.svg?inline'
import { publicLinks, RESERVE_ROUTE } from '~/constants/routes'

export default {
  name: 'MenuModal',
  components: {
    CrossRed,
  },
  data() {
    return {
      publicLinks,
      RESERVE_ROUTE,
    }
  },
}
</script>

<style lang="scss" scoped>
.menu_modal_styles {
  nav ul {
    padding: 40px;
    li {
      width: 100%;
      max-width: 280px;
      a {
        display: inline-block;
        font-size: 20px;
        padding-top: 9.5px;
        padding-bottom: 9.5px;
        &:hover {
          color: #ff6376 !important;
        }
      }
      &.login {
        margin: 40px auto 20px;
      }
      &.buyСlass a {
        display: flex;
        box-sizing: border-box;
        height: 42px;
        border-radius: 32px;
        font-size: 14px;
        background-color: #59b894;
        transition: background-color 0.2s;
        &:hover {
          background-color: #000044;
        }
      }
    }
  }
}
</style>
