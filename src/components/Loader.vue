<template>
  <div class="loader">
    <div class="loader__circle"></div>
  </div>
</template>

<style lang="scss" scoped>
$border-size: 12px;
$loader-size: 120px;

.loader {
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 100%;

  &__circle {
    animation: 1s spin ease-out infinite;
    border-bottom: $border-size solid $primary-color;
    border-left: $border-size solid $primary-color;
    border-radius: $loader-size;
    border-right: $border-size solid $primary-color;
    border-top: $border-size solid $secondary-color;
    height: $loader-size;
    width: $loader-size;
  }
}
</style>
