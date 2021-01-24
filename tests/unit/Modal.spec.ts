import { mount } from "@vue/test-utils";

import Modal from "@/components/Modal.vue";

describe("Modal.vue", () => {
  const build = (propsData?: object, slots?: object) => {
    const wrapper = mount(Modal, {
      propsData: { title: "Modal", ...propsData },
      slots: { ...slots },
      mocks: {
        $t: (text: string) => text
      }
    });

    const button = () => wrapper.find(".modal__button");
    const content = () => wrapper.find(".modal__content");
    const title = () => wrapper.find(".modal__title");

    return { button, content, title, wrapper };
  };

  it("renders the component", () => {
    const { wrapper } = build();

    expect(wrapper).toMatchSnapshot();
  });

  it("renders a title", () => {
    const titleText = "Attacks summary";
    const { title } = build({ title: titleText });

    expect(title().text()).toMatch(titleText);
  });

  it("renders a content in a default slot", () => {
    const contentText = "Attack list";
    const { content } = build(undefined, { default: contentText });

    expect(content().html()).toMatch(contentText);
  });

  it("emits on-close event", () => {
    const { button, wrapper } = build();

    button().trigger("click");

    expect(wrapper.emitted("on-close")).toBeTruthy();
  });
});
