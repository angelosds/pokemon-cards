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
    <main-footer :actionText="actionText" @on-click="changeLocale">
      <span v-html="apiLinkString"></span>
    </main-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import MainFooter from "@/components/MainFooter.vue";
import MainHeader from "@/components/MainHeader.vue";

@Component({
  components: {
    MainFooter,
    MainHeader
  }
})
export default class App extends Vue {
  get otherLocale() {
    if (this.$i18n.locale === "pt") {
      return "en";
    }

    return "pt";
  }

  get actionText() {
    return this.$t("chanageLanguage", {
      language: this.$t(`languages.${this.otherLocale}`)
    });
  }

  get apiLinkString() {
    const linkString = `<a href="https://pokemontcg.io/" target="_blank">https://pokemontcg.io/</a>`;
    return this.$t("footerText", { link: linkString });
  }

  onSearch(searchTerm: string) {
    this.$router.push({
      name: "Search",
      query: { searchTerm }
    });
  }

  changeLocale() {
    this.$i18n.locale = this.otherLocale;
  }
}
</script>

<style lang="scss">
@import "./style/global";

$footer-height: 70px;
$header-height: 80px;
$page-min-height: calc(100vh - #{$header-height} - #{$footer-height});

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
