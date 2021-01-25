/// <reference types="Cypress" />

describe("Search page", () => {
  it("Visits the search page", () => {
    cy.intercept(
      encodeURI(
        "https://api.pokemontcg.io/v1/cards?name=Pikachu&pageSize=1000&supertype=Pokémon"
      ),
      {
        delayMs: 500,
        fixture: "cards/pikachuList.json"
      }
    ).as("fetchCards");

    cy.visit("/search?searchTerm=Pikachu");
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

  it("Render Pikachu only cards", () => {
    cy.get(".card").should(el => {
      expect(el.find(".card__name")).to.contain("Pikachu");
    });
  });

  it("Redirects to a card details page", () => {
    cy.get(".card")
      .eq(0)
      .find(".card__button")
      .click();

    cy.location("pathname").should("eq", "/card/swshp-SWSH020");
  });

  it("Shows a 'no cards found' message", () => {
    cy.intercept(
      encodeURI(
        "https://api.pokemontcg.io/v1/cards?name=Test&pageSize=1000&supertype=Pokémon"
      ),
      {
        fixture: "cards/empty.json"
      }
    );

    cy.visit("/search?searchTerm=Test");
    cy.get(".search-page__empty").should("exist");
  });
});
