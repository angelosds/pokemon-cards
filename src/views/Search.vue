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
import { Component, Vue, Watch } from "vue-property-decorator";
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
    return this.cardsModule.searchCards;
  }

  get loading() {
    return this.cardsModule.loading;
  }

  get searchTerm() {
    return this.$route.query.searchTerm;
  }

  mounted() {
    this.fetchCards();
  }

  private redirectToCardDetailsPage(cardId: number) {
    this.$router.push({
      name: "CardDetails",
      params: {
        id: cardId.toString()
      }
    });
  }

  private fetchCards() {
    this.cardsModule.fetchCardsByName(this.searchTerm as string);
  }

  @Watch("searchTerm")
  private onSearchTermChange() {
    this.fetchCards();
  }
}
</script>
