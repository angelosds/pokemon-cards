import { mount } from "@vue/test-utils";

import Card from "@/components/Card.vue";
import PokemonType from "@/enums/pokemonType";

describe("Card.vue", () => {
  const build = (propsData?: object) => {
    const wrapper = mount(Card, {
      propsData: { buttonText: "Details", name: "Pokémon name", ...propsData }
    });

    const button = () => wrapper.find(".card__button");
    const image = () => wrapper.find(".card__image");
    const name = () => wrapper.find(".card__name");
    const number = () => wrapper.find(".card__number");
    const types = () => wrapper.findAll(".card__type");

    return { button, image, name, number, types, wrapper };
  };

  it("renders the component", () => {
    const { wrapper } = build();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders a card name", () => {
    const nameText = "Pikachu";
    const { name } = build({ name: nameText });

    expect(name().text()).toMatch(nameText);
  });

  it("renders a pokémon number", () => {
    const numberValue = 25;
    const { number } = build({ number: numberValue });

    expect(number().text()).toMatch(numberValue.toString());
  });

  it("renders pokémon types list", () => {
    const typesListValues = [PokemonType.Electric];

    const { types } = build({ types: typesListValues });

    expect(types().length).toEqual(typesListValues.length);
    expect(
      types()
        .at(0)
        .text()
    ).toMatch(PokemonType.Electric.toString());
  });

  it("renders a button text", () => {
    const buttonText = "Details";
    const { button } = build({ buttonText });

    expect(button().text()).toMatch(buttonText);
  });

  it("emits on-click event", async () => {
    const { button, wrapper } = build();

    await button().trigger("click");

    expect(wrapper.emitted("on-click")).toBeTruthy();
  });

  it("renders a card image", () => {
    const imageUrl = "https://images.pokemontcg.io/np/35.png";
    const { image } = build({ imageUrl });

    expect(image().exists()).toBe(true);
    expect(image().attributes("src")).toMatch(imageUrl);
  });
});
