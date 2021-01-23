import CardType from "@/enums/cardType";

type Attack = {
  convertedEnergyCost: number;
  cost: Array<CardType>;
  damage: string;
  name: string;
  text: string;
};

export default Attack;
