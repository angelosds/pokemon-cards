<template>
  <footer class="main-footer">
    <span class="main-footer__text">
      <slot />
    </span>
    <button class="main-footer__button" type="button" @click="onClick">
      {{ actionText }}
    </button>
  </footer>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class MainFooter extends Vue {
  @Prop() private readonly actionText: string;

  @Emit()
  onClick(event: Event) {
    return event;
  }
}
</script>

<style lang="scss" scoped>
.main-footer {
  align-items: center;
  display: flex;
  height: 70px;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1024px;
  padding: 0 24px;

  &__button {
    background-color: transparent;
    border: 0;
    color: $text-color;
    font-size: 1.6rem;
    text-decoration: underline;
    cursor: pointer;
    font-family: $font-family-roboto;
    outline: 0;
  }
}
</style>
