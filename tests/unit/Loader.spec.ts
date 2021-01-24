import { mount } from "@vue/test-utils";

import Loader from "@/components/Loader.vue";

describe("Loader.vue", () => {
  const build = () => {
    const wrapper = mount(Loader);

    return { wrapper };
  };

  it("renders the component", () => {
    const { wrapper } = build();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
