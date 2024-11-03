<template>
  <div
    :class="[
      'user_box light_grey_button',
      styleName,
      user ? ' loggedOut' : ' loggedIn',
    ]"
  >
    <!-- onClick={() =>
        styleName === 'dashboard_modal'
          ? dispatch(unsetDashModal())
          : user
          ? dispatch(dashModal())
          : dispatch(loginModal())
      } -->

    <p class="user_name b700 green">
      {{ user?.displayName || user?.name || $t('nav.login') }}
    </p>
    <img
      :src="user?.photoURL || require('~/assets/img/empty_user.png')"
      class="user_face"
      alt="user's face"
    />
    <!-- @error="handleError" -->
    <LangArrow class="user_arrow" />
  </div>
</template>

<script>
import LangArrow from '~/assets/icons/lang-arrow.svg?inline'

export default {
  name: 'User',
  props: { user: null, styleName: '' },
  components: {
    LangArrow,
  },
//   methods: {
//     handleError(event) {
//       event.target.onerror = null
//       event.target.src = '@/assets/img/empty_user.png'
//     },
//   },
}
</script>

<style lang="scss">
.user_box {
  .user_name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    transition: color 0.2s;
  }
  .user_face {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  .user_arrow {
    display: none;
  }
  @media (hover: hover) {
    cursor: pointer;
  }
  &:hover {
    background-color: #59b894;
    .user_name {
      color: white;
    }
  }
  &.header_nav {
    @media (max-width: 1023px) {
      width: 120px;
    }
    width: 140px;
    padding-left: 8px;
    padding-right: 2px;
    justify-content: space-between;
    &.loggedIn {
      justify-content: center;
      .user_face {
        display: none;
      }
    }
  }
  &.menu_modal {
    @media (max-width: 1023px) {
      width: 100%;
      justify-content: space-between;
      column-gap: 10px;
      padding-left: 8px;
      padding-right: 2px;
      &.loggedIn {
        justify-content: center;
        .user_face {
          display: none;
        }
      }
    }
  }
  &.dashboard_modal {
    width: 100%;
    height: 100%;
    justify-content: space-between;
    column-gap: 10px;
    border-radius: unset;
    border: unset;
    margin-bottom: 10px;
    padding: 0 20px 16px;
    border-bottom: 2px solid #e8e8e8;
    .user_name {
      width: 100%;
      order: 2;
      font-size: 16px;
      color: #004;
    }
    .user_face {
      order: 1;
    }
    .user_arrow {
      display: inline-block;
      order: 3;
      width: 36px;
      height: 11px;
      fill: #737373;
      transition: transform 0.2s;
    }
    &:hover {
      background-color: unset;
      .user_name {
        color: #ff6376;
      }
      .user_arrow {
        fill: #ff6376;
        transform: rotate(180deg);
      }
    }
  }
}
</style>
