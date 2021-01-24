<template>
  <div class="modal">
    <section class="modal__container">
      <h2 class="modal__title">{{ title }}</h2>
      <div class="modal__content">
        <slot />
      </div>

      <div class="modal__footer">
        <primary-button
          class="modal__button"
          type="button"
          @on-click="onClose"
          >{{ $t("close") }}</primary-button
        >
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

import PrimaryButton from "@/components/PrimaryButton.vue";

@Component({
  components: {
    PrimaryButton
  }
})
export default class Modal extends Vue {
  @Prop() private readonly title: string;

  @Emit()
  onClose(event: Event) {
    return event;
  }
}
</script>

<style lang="scss" scoped>
.modal {
  align-items: center;
  background-color: $modal-background-color;
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  padding: 24px;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 10;

  &__container {
    background-color: $background-color;
    border-radius: 16px;
    max-width: 460px;
    width: 100%;
  }

  &__content {
    padding: 24px;
  }

  &__footer {
    border-top: 1px solid $secondary-color;
    display: flex;
    justify-content: flex-end;
    padding: 16px 24px;
  }

  &__title {
    border-bottom: 1px solid $secondary-color;
    font-size: 20px;
    font-weight: 700;
    margin: 0;
    padding: 16px 24px;
  }
}
</style>
