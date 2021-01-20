import { shallowMount } from "@vue/test-utils";

import PrimaryButton from "@/components/PrimaryButton.vue";

describe("PrimaryButton.vue", () => {
  const build = (propsData?: object, slots?: object) => {
    const wrapper = shallowMount(PrimaryButton, {
      propsData: { ...propsData },
      slots: { ...slots }
    });

    return { wrapper };
  };

  it("renders the component", () => {
    const { wrapper } = build();

    expect(wrapper).toMatchSnapshot();
  });

  it("renders text in a slot", () => {
    const defaultSlotText = "default slot text";
    const { wrapper } = build(undefined, { default: defaultSlotText });

    expect(wrapper.text()).toMatch(defaultSlotText);
  });

  it("sets a button default type", () => {
    const { wrapper } = build();

    expect(wrapper.attributes("type")).toEqual("button");
  });

  it("sets a button custom type", () => {
    const type = "submit";
    const { wrapper } = build({ type });

    expect(wrapper.attributes("type")).toEqual(type);
  });

  it("emits a onClick event", () => {
    const { wrapper } = build();

    wrapper.trigger("click");

    expect(wrapper.emitted("on-click")).toBeTruthy();
  });
});
