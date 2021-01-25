<template>
  <div class="grid-carousel">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.grid-carousel {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 24px;
  overflow-x: auto;
  padding: 24px;
  scroll-snap-type: x mandatory;
  width: 100%;

  > .grid-carousel--item {
    min-width: calc(100vw - 80px);
    scroll-snap-align: center;
    justify-self: center;
  }

  @media screen and (min-width: $breakpoint-mobile) {
    grid-auto-flow: row;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    overflow-x: unset;

    > .grid-carousel--item {
      min-width: auto;
    }
  }
}
</style>
