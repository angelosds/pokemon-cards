import axios from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

import { sortCards } from "@/util/cardUtils";

import Card from "@/models/card";
import store from "@/store";

export interface CardState {
  cards: Array<Card>;
  loading: boolean;
}

@Module({ dynamic: true, store, name: "user" })
export default class Cards extends VuexModule implements CardState {
  public cards: Array<Card> = [];
  public loading = false;

  @Mutation
  private SET_CARDS(cards: Array<Card>) {
    this.cards = cards;
  }

  @Mutation
  private SET_LOADING(loading: boolean) {
    this.loading = loading;
  }

  @Action
  public async fetAllCards() {
    this.SET_LOADING(true);

    try {
      const { data } = await axios.get("cards", {
        params: { supertype: "Pokémon" }
      });

      this.SET_CARDS(data.cards.sort(sortCards));
    } finally {
      this.SET_LOADING(false);
    }
  }

  @Action
  public async fetchCardsByName(name: string) {
    this.SET_LOADING(true);

    try {
      const { data } = await axios.get("cards", {
        params: { name, supertype: "Pokémon" }
      });

      this.SET_CARDS(data.cards.sort(sortCards));
    } finally {
      this.SET_LOADING(false);
    }
  }
}
