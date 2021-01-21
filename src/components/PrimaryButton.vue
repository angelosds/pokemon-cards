<template>
  <button class="primary-button" :type="type" @click="onClick">
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class PrimaryButton extends Vue {
  @Prop({ default: "button" }) private readonly type?: string;

  @Emit()
  onClick(event: Event) {
    return event;
  }
}
</script>

<style lang="scss" scoped>
.primary-button {
  background-color: $primary-color;
  border-radius: 8px;
  border: 0;
  color: $text-color-inverse;
  font-weight: 700;
  outline: 0;
  padding: 12px 24px;

  &:hover,
  &:focus {
    background-color: $primary-feedback-color;
  }

  &:focus {
    box-shadow: inset 0 0 0 4px $primary-color;
  }
}
</style>
