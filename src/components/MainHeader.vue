<template>
  <header class="main-header">
    <div class="main-header__content">
      <router-link class="main-header__title" :to="homeRedirectObject">
        <slot />
      </router-link>

      <button
        class="main-header__button main-header__button--open"
        type="button"
        @click="onSearchClick"
      >
        <search-icon />
      </button>
    </div>

    <div class="main-header__search" :class="searchClasses">
      <button class="main-header__close" type="button" @click="onCloseClick">
        &times;
      </button>

      <form class="main-header__form" @submit.prevent="onSubmit">
        <input
          type="search"
          class="main-header__input"
          :placeholder="placeholder"
          v-model="searchText"
        />

        <button
          class="main-header__button main-header__button--submit"
          type="submit"
          @click="onSearchClick"
        >
          <search-icon />
        </button>
      </form>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import SearchIcon from "@/icons/search.vue";

@Component({
  components: {
    SearchIcon
  }
})
export default class MainHeader extends Vue {
  @Prop() private readonly placeholder?: string;

  private isSearchActive = false;
  private searchText = "";

  get homeRedirectObject() {
    return { name: "Home" };
  }

  get searchClasses() {
    return { "main-header__search--active": this.isSearchActive };
  }

  private onCloseClick() {
    this.isSearchActive = false;
  }

  private onSearchClick() {
    this.isSearchActive = true;
  }

  private onSubmit() {
    const { searchText } = this;

    this.isSearchActive = !searchText.trim();

    if (searchText.trim() && searchText.trim().length >= 3) {
      this.searchText = "";
      this.$emit("on-search", searchText);
    }
  }
}
</script>

<style lang="scss" scoped>
.main-header {
  background-color: $header-background-color;
  height: 80px;
  padding: 0 16px;
  display: flex;
  align-items: center;

  @media screen and (min-width: $breakpoint-tablet) {
    display: grid;
    grid-gap: 16px;
    grid-template-columns: 1fr 1fr;
  }

  &__button,
  &__close {
    align-items: center;
    background-color: transparent;
    border-radius: 8px;
    border: 0;
    color: $primary-color;
    display: flex;
    height: 40px;
    justify-content: center;
    outline: 0;
    padding: 0;
    width: 40px;

    &:hover {
      background-color: $primary-color;
      color: $text-color-inverse;
    }
  }

  &__button {
    &--open {
      @media screen and (min-width: $breakpoint-tablet) {
        display: none;
      }
    }

    &--submit {
      display: none;

      @media screen and (min-width: $breakpoint-tablet) {
        display: block;
      }
    }
  }

  &__close {
    font-size: 32px;
    justify-self: end;

    @media screen and (min-width: $breakpoint-tablet) {
      display: none;
    }
  }

  &__content {
    align-items: center;
    display: grid;
    grid-gap: 16px;
    grid-template-columns: 1fr 40px;
    justify-content: center;
    width: 100%;

    @media screen and (min-width: $breakpoint-tablet) {
      grid-template-columns: 1fr;
      justify-content: flex-start;
    }
  }

  &__form {
    @media screen and (min-width: $breakpoint-tablet) {
      display: grid;
      grid-gap: 16px;
      grid-template-columns: 1fr 40px;
    }
  }

  &__icon {
    height: 24px;
    width: 24px;
  }

  &__input {
    background-color: transparent;
    border-bottom: 4px solid $primary-color;
    border-left: 0;
    border-right: 0;
    border-top: 0;
    height: 40px;
    outline: 0;
    padding: 4px;
    width: 100%;

    @media screen and (min-width: $breakpoint-tablet) {
      border-bottom: 0;
      background-color: $background-color;
      border-radius: 8px;
      padding: 4px 16px;
    }
  }

  &__title {
    font-size: 2.2rem;
    font-weight: 700;
    justify-self: center;
    text-decoration: none;
    color: $text-color;
  }

  &__search {
    background-color: $search-background-color;
    display: none;
    grid-gap: 16px;
    grid-template-rows: 40px 1fr;
    height: 100vh;
    left: 0;
    padding: 20px 16px;
    position: fixed;
    top: 0;
    width: 100vw;

    &--active {
      display: grid;
    }

    @media screen and (min-width: $breakpoint-tablet) {
      display: grid;
      position: relative;
      height: auto;
      width: auto;
      grid-template-rows: 1fr;
    }
  }
}
</style>
