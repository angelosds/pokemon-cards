import { shallowMount } from "@vue/test-utils";

import GridCarousel from "@/components/GridCarousel.vue";

describe("GridCarousel.vue", () => {
  const build = (slots?: object) => {
    const wrapper = shallowMount(GridCarousel, {
      slots: { ...slots }
    });

    return { wrapper };
  };

  it("renders the component", () => {
    const { wrapper } = build();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders content in a default slot", () => {
    const defaultSlotText = "default";
    const { wrapper } = build({ default: defaultSlotText });

    expect(wrapper.text()).toMatch(defaultSlotText);
  });
});
