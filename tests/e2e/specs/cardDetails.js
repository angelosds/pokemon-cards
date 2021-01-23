/// <reference types="Cypress" />

describe("Card details", () => {
  it("Visit the page", () => {
    cy.intercept(" https://api.pokemontcg.io/v1/cards/base1-47", {
      fixture: "cards/details.json"
    });

    cy.visit("/card/base1-47");
  });

  it("Renders an card image", () => {
    cy.get(".card-details__image").should(
      "have.attr",
      "src",
      "https://images.pokemontcg.io/base1/47_hires.png"
    );
  });

  it("Renders an card name", () => {
    cy.get(".card-details__name").should("contain.text", "Diglett");
  });

  it("Renders pokémon types", () => {
    cy.get(".card-details__type").should("have.length", 1);
    cy.get(".card-details__type")
      .eq(0)
      .should("contain.text", "Fighting");
  });

  it("Renders pokémon resistances", () => {
    cy.get(".card-details__text--resistance").should(
      "contain.text",
      "Lightning -30"
    );
  });

  it("Renders pokémon weaknesses", () => {
    cy.get(".card-details__text--weakness").should("contain.text", "Grass ×2");
  });

  it("Renders pokémon's attacks", () => {
    cy.get(".card-details__button--atack").should("have.length", 2);
    cy.get(".card-details__button--atack")
      .eq(0)
      .should("contain.text", "Dig");
  });
});
