<template>
  <div>
    <h3 class="b900 margin_b_60_30 blue">Additional Forms</h3>
    <div class="additional_forms margin_b_120_80 relative">
      <fieldset>
        <legend>Search Query</legend>
        <input
          type="text"
          v-model="searchQuery"
          @input="debouncedSearch"
          placeholder="Search user by name..."
        />
      </fieldset>
    </div>
  </div>
</template>

<script lang="ts">
import { debounce, throttle } from '~/utils/debounce'

export default {
  name: 'TestingRoles',
  data() {
    return {
      searchQuery: '',
      debouncedSearch: (...args: any[]): void => {},
    }
  },
  created() {
    // this.debouncedSearch = debounce(this.executeSearch, 300)
    this.debouncedSearch = throttle(this.executeSearch, 300)
  },
  methods: {
    async executeSearch() {
      if (!this.searchQuery.trim()) return
      try {
        console.log('Executing search for:', this.searchQuery)
        const response = await this.$axios.get(
          `${process.env.apiUrl}/user/search`,
          {
            params: { query: this.searchQuery },
            withCredentials: true,
          }
        )
        console.log('Search results:', response.data)
      } catch (error) {
        console.error('Search failed:', error)
      }
    },
  },
  watch: {},
}
</script>

<style lang="scss" scoped>
.privileges_button {
  flex-flow: column;
  span {
    font-weight: 400;
    font-size: 12px;
  }
}
.search_users_list {
  background-color: white;
  top: 55px;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 420px;
  z-index: 999;
  border: 2px solid #ff6376;
  border-radius: 6px;
  padding: 10px;
  box-sizing: border-box;
  @media (hover: hover) {
    li {
      cursor: pointer;
    }
  }
}
</style>
