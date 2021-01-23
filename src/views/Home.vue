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
    this.cardsModule.fetAllCards();
  }
}
</script>
