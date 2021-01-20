import { shallowMount } from "@vue/test-utils";

import Badge from "@/components/Badge.vue";
import PokemonType from "@/enums/pokemonType";

describe("Badge.vue", () => {
  const build = (propsData?: object, slots?: object) => {
    const wrapper = shallowMount(Badge, {
      propsData: { ...propsData },
      slots: { ...slots }
    });

    return { wrapper };
  };

  it("renders the component", () => {
    const { wrapper } = build();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders a text in a default slot", () => {
    const defaultSlotText = "Water";
    const { wrapper } = build(undefined, { default: defaultSlotText });

    expect(wrapper.text()).toMatch(defaultSlotText);
  });

  it("concats a pokémon type and insert a color modifier class", () => {
    const color = PokemonType.Grass;
    const { wrapper } = build({ color });

    expect(
      wrapper.element.classList.contains(
        `badge--color-${PokemonType.Grass.toLowerCase()}`
      )
    ).toBe(true);
  });
});
