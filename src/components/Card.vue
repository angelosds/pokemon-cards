<template>
  <article class="card">
    <div class="card__container" v-if="imageUrl">
      <img class="card__image" loading="lazy" :alt="name" :src="imageUrl" />
    </div>

    <div class="card__description">
      <h1 class="card__name">{{ name }}</h1>
      <span class="card__number">{{ number }}</span>

      <ul class="card__types" v-if="types">
        <li class="card__item" v-for="type in types" :key="type">
          <badge class="card__type" :color="type">{{ type }}</badge>
        </li>
      </ul>

      <primary-button class="card__button" @on-click="onClick">{{
        buttonText
      }}</primary-button>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

import Badge from "@/components/Badge.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";

import PokemonType from "@/enums/pokemonType";

@Component({
  components: {
    Badge,
    PrimaryButton
  }
})
export default class Card extends Vue {
  @Prop() readonly buttonText: string;
  @Prop() readonly imageUrl?: string;
  @Prop() readonly name: string;
  @Prop() readonly number?: number;
  @Prop() readonly types?: Array<PokemonType>;

  @Emit()
  onClick(event: Event) {
    return event;
  }
}
</script>

<style lang="scss" scoped>
$card-padding: 24px;

.card {
  border-radius: 16px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &__button {
    grid-area: button;
  }

  &__container {
    padding: $card-padding;
  }

  &__description {
    background-color: $secondary-color;
    display: grid;
    grid-gap: 16px;
    grid-template-columns: 1fr 40px;
    grid-template-areas:
      "name number"
      "types types"
      "button button";
    padding: $card-padding;
  }

  &__image {
    border-radius: 8px;
    width: 100%;
  }

  &__item {
    display: flex;

    &:not(:first-child) {
      margin-left: 4px;
    }

    &:not(:last-child) {
      margin-right: 4px;
    }
  }

  &__name {
    font-size: 2.4rem;
    grid-area: name;
    margin: 0;
  }

  &__number {
    font-size: 2.4rem;
    font-weight: 700;
    grid-area: number;
    justify-self: end;
  }

  &__types {
    display: flex;
    grid-area: types;
    justify-content: center;
    margin: 0;
    padding: 0;
  }
}
</style>
