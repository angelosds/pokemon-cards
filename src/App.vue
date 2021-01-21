<template>
  <div class="app-container">
    <MainHeader :placeholder="$t('searchPlaceholder')">{{
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
export default class App extends Vue {}
</script>

<style lang="scss">
@import "./style/global";
</style>
