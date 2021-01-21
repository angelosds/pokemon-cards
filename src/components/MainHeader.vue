<template>
  <header class="main-header">
    <div class="main-header__content">
      <span class="main-header__title">
        <slot />
      </span>

      <button class="main-header__button" type="button" @click="onSearchClick">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="main-header__icon"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </div>

    <div class="main-header__search" v-if="isSearchActive">
      <button class="main-header__close" type="button" @click="onCloseClick">
        &times;
      </button>

      <form @submit.prevent="onSubmit">
        <input
          type="search"
          class="main-header__input"
          :placeholder="placeholder"
          v-model="searchText"
        />
      </form>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class MainHeader extends Vue {
  @Prop() private readonly placeholder?: string;

  private isSearchActive = false;
  private searchText = "";

  private onCloseClick() {
    this.isSearchActive = false;
  }

  private onSearchClick() {
    this.isSearchActive = true;
  }

  private onSubmit() {
    const { searchText } = this;

    this.isSearchActive = !searchText.trim();

    if (searchText.trim()) {
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

  &__close {
    font-size: 32px;
    justify-self: end;
  }

  &__content {
    align-items: center;
    display: grid;
    grid-gap: 16px;
    grid-template-columns: 1fr 40px;
    justify-content: center;
    width: 100%;
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
  }

  &__title {
    font-size: 2.2rem;
    font-weight: 700;
    justify-self: center;
  }

  &__search {
    background-color: $search-background-color;
    display: grid;
    grid-gap: 16px;
    grid-template-rows: 40px 1fr;
    height: 100vh;
    left: 0;
    padding: 20px 16px;
    position: fixed;
    top: 0;
    width: 100vw;
  }
}
</style>
