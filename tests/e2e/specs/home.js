/// <reference types="Cypress" />

describe("Home page", () => {
  it("Visits the app root url", () => {
    cy.intercept("https://api.pokemontcg.io/v1/cards?supertype=Pok%C3%A9mon", {
      fixture: "cards/list.json"
    });

    cy.visit("/");
  });

  it("Renders a header", () => {
    cy.get(".main-header").should("exist");
  });

  it("Renders a pokémon cards list", () => {
    cy.get(".card").should("have.length", 10);
  });

  it("Renders a pokémon cards list alphabetically", () => {
    cy.get(".card")
      .eq(0)
      .find(".card__name")
      .should("contain.text", "Absol");

    cy.get(".card")
      .eq(9)
      .find(".card__name")
      .should("contain.text", "Vespiquen");
  });

  it("Searchs for Pikachu cards", () => {
    cy.intercept(
      "https://api.pokemontcg.io/v1/cards?name=Pikachu&supertype=Pok%C3%A9mon",
      {
        fixture: "cards/pikachuList.json"
      }
    );

    cy.get(".main-header__button").click();
    cy.get(".main-header__input").type("Pikachu{enter}");

    cy.get(".card")
      .eq(0)
      .find(".card__name")
      .should("contain.text", "Pikachu");
  });

  it("Redirects to a card details page", () => {
    cy.get(".card")
      .eq(0)
      .find(".card__button")
      .click();

    cy.location("pathname").should("eq", "/card/swshp-SWSH020");
  });
});
