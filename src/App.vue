<template>
  <div class="app-container">
    <MainHeader :placeholder="$t('searchPlaceholder')" @on-search="onSearch">{{
      $t("appTitle")
    }}</MainHeader>
    <main class="content">
      <transition name="fade" mode="out-in">
        <router-view class="content__child" :key="$route.name" />
      </transition>
    </main>
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

$page-min-height: calc(100vh - 80px);

.content {
  align-items: flex-start;
  display: flex;
  justify-content: center;
  min-height: $page-min-height;

  &__child {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    min-height: $page-min-height;

    > .loader {
      min-height: $page-min-height;
    }
  }
}
</style>
