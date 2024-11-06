<template>
  <ul
    :class="[
      'lang_box flex_center_center b700 grey relative',
      langList && 'active',
    ]"
    @mouseenter="handleMouseEnter()"
    @mouseleave="handleMouseLeave()"
  >
    <li class="lang_base">{{ language.toLocaleUpperCase() }}</li>
    <li class="lang_list absolute">
      <ul>
        <li
          v-for="lang in filteredVersions"
          :key="lang"
          @click="changeLanguage(lang)"
        >
          {{ lang.toUpperCase() }}
        </li>
      </ul>
    </li>
    <li class="lang_arrow">
      <LangArrow />
    </li>
  </ul>
</template>

<script lang="ts">
import LangArrow from '~/assets/icons/LangArrow.svg?inline'

interface LanguageSwitchData {
  langList: boolean
  language: string
  versions: string[]
}

export default {
  name: 'LanguageSwitch',
  components: {
    LangArrow,
  },
  data(): LanguageSwitchData {
    return {
      langList: false,
      language: (this as any).$i18n.locale,
      versions: ['en', 'ee', 'de'],
    }
  },
  computed: {
    filteredVersions(this: LanguageSwitchData): string[] {
      return this.versions.filter((lang) => lang !== this.language)
    },
  },
  methods: {
    changeLanguage(
      this: LanguageSwitchData & { $i18n: any; $router: any },
      lang: string
    ): void {
      this.$i18n.locale = lang
      this.language = lang
      window.localStorage.setItem('i18nextLng', lang)
      // this.$router.go(0)
    },
    handleMouseEnter(this: LanguageSwitchData) {
      this.langList = true
    },
    handleMouseLeave(this: LanguageSwitchData) {
      this.langList = false
    },
  },
  watch: {
    language: function (this: LanguageSwitchData) {
      this.langList = false
    },
  },
}
</script>

<style lang="scss" scoped>
.lang_box {
  margin-left: auto;
  font-size: 20px;
  .lang_base {
    width: 26px;
  }
  .lang_list {
    visibility: hidden;
    opacity: 0;
    top: 34px;
    left: 0;
    transition: opacity 0.5s linear;
    li:hover {
      color: #ff6376;
    }
  }
  .lang_arrow svg {
    width: 16px;
    height: 11px;
    margin-left: 8px;
    margin-bottom: 1px;
    fill: #737373;
    transition: transform 0.2s;
  }
  &.active {
    .lang_base {
      color: #ff6376;
    }
    .lang_list {
      visibility: visible;
      opacity: 1;
    }
    .lang_arrow svg {
      fill: #ff6376;
      transform: rotate(180deg);
    }
  }
  @media (hover: hover) {
    cursor: pointer;
  }
}
</style>
