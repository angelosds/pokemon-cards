<template>
  <article class="card-details">
    <template v-if="card">
      <img
        class="card-details__image"
        :src="card.imageUrlHiRes"
        :alt="card.name"
      />

      <article class="card-details__details">
        <header class="card-details__header">
          <h1 class="card-details__name">{{ card.name }}</h1>
          <span class="card-details__number">#{{ card.number }}</span>
        </header>

        <div>
          <ul class="card-details__list" v-if="card.types">
            <li
              class="card-details__item"
              v-for="type in card.types"
              :key="type"
            >
              <badge class="card-details__type" :color="type">{{ type }}</badge>
            </li>
          </ul>
        </div>

        <div
          class="card-details__stats"
          v-if="card.resistances || card.weaknesses"
        >
          <div v-if="card.resistances">
            <h2 class="card-details__subtitle">{{ $t("resistance") }}</h2>
            <p class="card-details__text card-details__text--resistance">
              {{ cardResistances }}
            </p>
          </div>
          <div v-if="card.weaknesses">
            <h2 class="card-details__subtitle">{{ $t("weakness") }}</h2>
            <p class="card-details__text card-details__text--weakness">
              {{ cardWeaknesses }}
            </p>
          </div>
        </div>

        <div v-if="card.attacks">
          <h2 class="card-details__subtitle">{{ $t("attacks") }}</h2>
          <ul class="card-details__list" v-if="card.attacks">
            <li
              class="card-details__item"
              v-for="attack in card.attacks"
              :key="attack.name"
            >
              <button
                type="button"
                class="card-details__button card-details__button--atack"
              >
                {{ attack.name }}
              </button>
            </li>
          </ul>
        </div>
      </article>
    </template>
  </article>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import Cards from "@/store/cards";

import Resistance from "@/models/resistance";
import Weakness from "@/models/weakness";

import Badge from "@/components/Badge.vue";

@Component({
  components: {
    Badge
  }
})
export default class Home extends Vue {
  private cardsModule = getModule(Cards);

  private mapResistancesAndWeaknesses(items: Array<Resistance | Weakness>) {
    return items.map(item => `${item.type} ${item.value}`).join(" | ");
  }

  get card() {
    return this.cardsModule.card;
  }

  get loading() {
    return this.cardsModule.loading;
  }

  get cardResistances() {
    return this.mapResistancesAndWeaknesses(this.card.resistances);
  }

  get cardWeaknesses() {
    return this.mapResistancesAndWeaknesses(this.card.weaknesses);
  }

  mounted() {
    const { id } = this.$route.params;

    this.cardsModule.fetchCardDetails(id);
  }
}
</script>

<style lang="scss" scoped>
.card-details {
  display: grid;
  grid-gap: 24px;
  margin: 0 auto;
  max-width: 1024px;
  padding: 24px;

  @media screen and (min-width: $breakpoint-mobile) {
    grid-template-columns: 360px 1fr;
  }

  &__button {
    background-color: transparent;
    border: 0;
    color: $text-color;
    cursor: pointer;
    font-family: $font-family-roboto;
    font-size: 16px;
    font-weight: 400;
    outline: 0;
    padding: 0;
    text-decoration: underline;
  }

  &__details {
    display: grid;
    grid-gap: 16px;
    grid-template-rows: minmax(40px, auto) 26px auto 1fr;
  }

  &__header {
    align-items: center;
    display: grid;
    grid-template-columns: 3fr 1fr;
  }

  &__image {
    border-radius: 16px;
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

  &__list {
    margin: 0;
    padding: 0;
    display: flex;
  }

  &__name,
  &__number {
    font-size: 24px;
    font-weight: 700;
  }

  &__name {
    margin: 0;
  }

  &__number {
    justify-self: flex-end;
  }

  &__stats {
    display: grid;
    grid-gap: 16px;

    @media screen and (min-width: $breakpoint-mobile) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__subtitle {
    font-size: 20px;
    margin: 0 0 8px 0;
  }

  &__text {
    margin: 0;
  }
}
</style>
