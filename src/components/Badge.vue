<template>
  <span class="badge" :class="colorClassName">
    <slot />
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import PokemonType from "@/enums/pokemonType";

@Component
export default class Badge extends Vue {
  @Prop() readonly color?: PokemonType;

  get colorClassName() {
    return this.color ? `badge--color-${this.color.toLowerCase()}` : undefined;
  }
}
</script>

<style lang="scss" scoped>
.badge {
  background-color: $type-normal-color;
  border-radius: 6px;
  display: inline-flex;
  padding: 6px;
  font-size: 1.6rem;
  color: $text-color-inverse;

  @each $pokemon-type, $color in $pokemon-types {
    &--color-#{$pokemon-type} {
      background-color: $color;
    }
  }
}
</style>
