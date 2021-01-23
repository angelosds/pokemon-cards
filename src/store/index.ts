import Vue from "vue";
import Vuex from "vuex";

import { CardState } from "@/store/cards";

Vue.use(Vuex);

export interface RootState {
  cards: CardState;
}

export default new Vuex.Store<RootState>({});
