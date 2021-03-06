import { shallowMount } from "@vue/test-utils";

import MainHeader from "@/components/MainHeader.vue";

describe("MainHeader.vue", () => {
  const build = (propsData?: object, slots?: object) => {
    const wrapper = shallowMount(MainHeader, {
      slots: { ...slots },
      propsData: { ...propsData },
      stubs: ["router-link"]
    });

    const closeButton = () => wrapper.find(".main-header__close");
    const searchButton = () => wrapper.find(".main-header__button--open");
    const search = () => wrapper.find(".main-header__search");
    const searchInput = () => wrapper.find(".main-header__input");
    const title = () => wrapper.find(".main-header__title");

    return { closeButton, searchButton, search, searchInput, title, wrapper };
  };

  it("renders the component", () => {
    const { wrapper } = build();

    expect(wrapper).toMatchSnapshot();
  });

  it("renders a title in a default slot", () => {
    const titleText = "Pokémon cards";
    const { title } = build(undefined, { default: titleText });

    expect(title().text()).toMatch(titleText);
  });

  it("does not shows search input by default", () => {
    const { search } = build();

    expect(
      search()
        .classes()
        .indexOf("main-header__search--active")
    ).toBe(-1);
  });

  it("shows search input when click on search button", async () => {
    const { searchButton, search } = build();

    expect(
      search()
        .classes()
        .indexOf("main-header__search--active")
    ).toBe(-1);

    await searchButton().trigger("click");

    expect(
      search()
        .classes()
        .indexOf("main-header__search--active")
    ).toBeGreaterThanOrEqual(0);
  });

  it("hides search input when click on close button", async () => {
    const { closeButton, searchButton, search } = build();

    expect(
      search()
        .classes()
        .indexOf("main-header__search--active")
    ).toBe(-1);

    await searchButton().trigger("click");

    expect(
      search()
        .classes()
        .indexOf("main-header__search--active")
    ).toBeGreaterThanOrEqual(0);

    await closeButton().trigger("click");

    expect(
      search()
        .classes()
        .indexOf("main-header__search--active")
    ).toBe(-1);
  });

  it("renders a input placeholder", async () => {
    const placeholderText = "Search by pokémon name";
    const { searchButton, searchInput } = build({
      placeholder: placeholderText
    });

    await searchButton().trigger("click");

    expect(searchInput().attributes("placeholder")).toMatch(placeholderText);
  });

  it("does not emits on-search when submit an empty form", async () => {
    const pokemonName = "";
    const { searchButton, searchInput, wrapper } = build();

    await searchButton().trigger("click");
    await searchInput().setValue(pokemonName);
    await wrapper.find("form").trigger("submit");

    expect(wrapper.emitted("on-search")).toBeFalsy();
  });

  it("does not emits on-search when submit a input is smaller then 3 characters", async () => {
    const pokemonName = "ab";
    const { searchButton, searchInput, wrapper } = build();

    await searchButton().trigger("click");
    await searchInput().setValue(pokemonName);
    await wrapper.find("form").trigger("submit");

    expect(wrapper.emitted("on-search")).toBeFalsy();
  });

  it("emits on-search when submit the form", async () => {
    const pokemonName = "pikachu";
    const { searchButton, searchInput, wrapper } = build();

    await searchButton().trigger("click");
    await searchInput().setValue(pokemonName);
    await wrapper.find("form").trigger("submit");

    expect(wrapper.emitted("on-search")).toBeTruthy();
    expect(wrapper.emitted("on-search")?.[0]?.[0]).toEqual(pokemonName);
  });
});
