import Attack from "./attack";
import PokemonType from "@/enums/pokemonType";
import Resistance from "./resistance";
import Weakness from "./weakness";

type Card = {
  id: string;
  name: string;
  imageUrl: string;
  imageUrlHiRes: string;
  types: Array<PokemonType>;
  number: string;
  attacks: Array<Attack>;
  weaknesses: Array<Weakness>;
  resistances: Array<Resistance>;
};

export default Card;
