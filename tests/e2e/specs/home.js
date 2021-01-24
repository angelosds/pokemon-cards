/// <reference types="Cypress" />

describe("Home page", () => {
  it("Visits the app root url and shows a loader", () => {
    cy.intercept("https://api.pokemontcg.io/v1/cards?supertype=Pok%C3%A9mon", {
      fixture: "cards/list.json",
      delayMs: 500
    }).as("fetchCards");

    cy.visit("/");
    cy.get(".loader").should("exist");
    cy.wait("@fetchCards");
    cy.get(".loader").should("not.exist");
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

  it("Redirects to a card details page", () => {
    cy.get(".card")
      .eq(0)
      .find(".card__button")
      .click();

    cy.location("pathname").should("eq", "/card/swsh35-38");
  });

  it("Redirects to search page", () => {
    cy.get(".main-header__button").click();
    cy.get(".main-header__input").type("Squirtle{enter}");

    cy.location("search").should("eq", "?searchTerm=Squirtle");
  });
});
