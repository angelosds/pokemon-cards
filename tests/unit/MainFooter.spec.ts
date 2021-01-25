import { shallowMount } from "@vue/test-utils";

import MainFooter from "@/components/MainFooter.vue";

describe("MainFooter.vue", () => {
  const build = (propsData?: object, slots?: object) => {
    const wrapper = shallowMount(MainFooter, {
      propsData: { actionText: "button", ...propsData },
      slots: { ...slots },
      mocks: {
        $t: (text: string) => text
      }
    });

    const button = () => wrapper.find(".main-footer__button");
    const text = () => wrapper.find(".main-footer__text");

    return { button, text, wrapper };
  };

  it("renders the component", () => {
    const { wrapper } = build();

    expect(wrapper).toMatchSnapshot();
  });

  it("renders text in a defautl slot", () => {
    const footerText = "Copyright 2021";
    const { text } = build(undefined, { default: footerText });

    expect(text().text()).toMatch(footerText);
  });

  it("renders a different language in a button", () => {
    const languageText = "click to portuguese";
    const { button } = build({ actionText: languageText });

    expect(button().text()).toMatch(languageText);
  });

  it("emits an on-click event", () => {
    const { button, wrapper } = build();

    button().trigger("click");

    expect(wrapper.emitted("on-click")).toBeTruthy();
  });
});
