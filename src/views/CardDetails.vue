<template>
  <div>
    <transition name="fade" mode="out-in">
      <loader v-if="loading" />
      <div class="details-content" v-else>
        <transition name="fade" mode="out-in">
          <modal
            v-if="isModalActive"
            :title="selectedAttack.name"
            @on-close="onModalClose"
          >
            <p
              class="card-details__text card-details__text--modal card-details__text--cost"
            >
              <strong>{{ $t("cost") }}:</strong> {{ selectedAttackCost }}
            </p>
            <p
              class="card-details__text card-details__text--modal card-details__text--damage"
              v-if="selectedAttack.damage"
            >
              <strong>{{ $t("damage") }}:</strong> {{ selectedAttack.damage }}
            </p>
            <p
              class="card-details__text card-details__text--modal card-details__text--description"
              v-if="selectedAttack.text"
            >
              {{ selectedAttack.text }}
            </p>
          </modal>
        </transition>

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
                    <badge class="card-details__type" :color="type">{{
                      $t(`cardTypes.${type}`)
                    }}</badge>
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
                      @click="onAttackClick(attack)"
                    >
                      {{ attack.name }}
                    </button>
                  </li>
                </ul>
              </div>
            </article>
          </template>
        </article>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import Cards from "@/store/cards";

import Attack from "@/models/attack";
import Resistance from "@/models/resistance";
import Weakness from "@/models/weakness";

import Badge from "@/components/Badge.vue";
import Loader from "@/components/Loader.vue";
import Modal from "@/components/Modal.vue";

type reduceAttack = {
  name: string;
  total: number;
};

@Component({
  components: {
    Badge,
    Loader,
    Modal
  }
})
export default class Home extends Vue {
  private cardsModule = getModule(Cards);

  private isModalActive = false;
  private selectedAttack = {} as Attack;

  private mapResistancesAndWeaknesses(items: Array<Resistance | Weakness>) {
    return items
      .map(item => `${this.$t(`cardTypes.${item.type}`)} ${item.value}`)
      .join(" | ");
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

  get selectedAttackCost() {
    return this.selectedAttack.cost
      .reduce((costs: Array<reduceAttack>, cost: string) => {
        const currentCost = costs.find(
          (item: reduceAttack) => item.name === cost
        );

        if (currentCost) {
          currentCost.total++;
          return costs;
        }

        const newCost = {
          name: cost,
          total: 1
        } as reduceAttack;

        return [...costs, newCost];
      }, [])
      .map(cost => `${this.$t(`cardTypes.${cost.name}`)} ×${cost.total}`)
      .join(" | ");
  }

  beforeMount() {
    const { id } = this.$route.params;

    this.cardsModule.fetchCardDetails(id);
  }

  onAttackClick(attack: Attack) {
    this.selectedAttack = attack;
    this.isModalActive = true;
  }

  onModalClose() {
    this.isModalActive = false;
  }
}
</script>

<style lang="scss" scoped>
.card-details {
  display: grid;
  grid-gap: 24px;
  margin: 0 auto;
  max-width: 1024px;
  min-height: 100%;
  padding: 24px;
  width: 100%;

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

    &--modal:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}

.details-content {
  width: 100%;
}
</style>
