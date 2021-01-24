<template>
  <div class="app-container">
    <MainHeader :placeholder="$t('searchPlaceholder')" @on-search="onSearch">{{
      $t("appTitle")
    }}</MainHeader>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import MainHeader from "@/components/MainHeader.vue";

@Component({
  components: {
    MainHeader
  }
})
export default class App extends Vue {
  onSearch(searchTerm: string) {
    this.$router.push({
      name: "Search",
      query: { searchTerm }
    });
  }
}
</script>

<style lang="scss">
@import "./style/global";
</style>
