<template>
  <div>
    <grid-carousel>
      <card
        v-for="card in cards"
        :key="card.id"
        :buttonText="$t('details')"
        :imageUrl="card.imageUrl"
        :name="card.name"
        :number="card.number"
        :types="card.types"
        @on-click="redirectToCardDetailsPage(card.id)"
        class="grid-carousel--item"
      />
    </grid-carousel>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import Cards from "@/store/cards";

import Card from "@/components/Card.vue";
import GridCarousel from "@/components/GridCarousel.vue";

@Component({
  components: {
    Card,
    GridCarousel
  }
})
export default class Home extends Vue {
  private cardsModule = getModule(Cards);

  get cards() {
    return this.cardsModule.cards;
  }

  get loading() {
    return this.cardsModule.loading;
  }

  mounted() {
    if (this.cards.length === 0) {
      this.cardsModule.fetAllCards();
    }
  }

  private redirectToCardDetailsPage(cardId: number) {
    this.$router.push({
      name: "CardDetails",
      params: {
        id: cardId.toString()
      }
    });
  }
}
</script>
