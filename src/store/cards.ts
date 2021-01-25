import axios from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

import { sortCards } from "@/util/cardUtils";

import Card from "@/models/card";
import store from "@/store";

export interface CardState {
  card: Card;
  cards: Array<Card>;
  loading: boolean;
  searchCards: Array<Card>;
}

@Module({ dynamic: true, store, name: "user" })
export default class Cards extends VuexModule implements CardState {
  public card: Card = {} as Card;
  public cards: Array<Card> = [];
  public searchCards: Array<Card> = [];
  public loading = false;

  @Mutation
  private SET_CARD(card: Card) {
    this.card = card;
  }

  @Mutation
  private SET_CARDS(cards: Array<Card>) {
    this.cards = cards;
  }

  @Mutation
  private SET_SEARCH_CARDS(cards: Array<Card>) {
    this.searchCards = cards;
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
        params: { pageSize: 20, supertype: "Pokémon" }
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
        params: { name, pageSize: 1000, supertype: "Pokémon" }
      });

      this.SET_SEARCH_CARDS(data.cards.sort(sortCards));
    } finally {
      this.SET_LOADING(false);
    }
  }

  @Action
  public async fetchCardDetails(cardId: string) {
    this.SET_LOADING(true);

    try {
      const { data } = await axios.get(`cards/${cardId}`);

      this.SET_CARD(data.card);
    } finally {
      this.SET_LOADING(false);
    }
  }
}
