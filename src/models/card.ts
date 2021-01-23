import Attack from "./attack";
import PokemonType from "@/enums/pokemonType";
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
};

export default Card;
