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
import { getModule } from "vuex-module-decorators";

import Cards from "@/store/cards";

import MainHeader from "@/components/MainHeader.vue";

@Component({
  components: {
    MainHeader
  }
})
export default class App extends Vue {
  private cardsModule = getModule(Cards);

  onSearch(serachTerm: string) {
    this.cardsModule.fetchCardsByName(serachTerm);
  }
}
</script>

<style lang="scss">
@import "./style/global";
</style>
