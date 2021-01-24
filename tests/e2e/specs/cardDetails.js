/// <reference types="Cypress" />

describe("Card details", () => {
  it("Visit the page", () => {
    cy.intercept(" https://api.pokemontcg.io/v1/cards/swsh4-177", {
      fixture: "cards/details.json"
    });

    cy.visit("/card/swsh4-177");
  });

  it("Renders an card image", () => {
    cy.get(".card-details__image").should(
      "have.attr",
      "src",
      "https://images.pokemontcg.io/swsh4/177_hires.png"
    );
  });

  it("Renders an card name", () => {
    cy.get(".card-details__name").should("contain.text", "Aegislash V");
  });

  it("Renders pokémon types", () => {
    cy.get(".card-details__type").should("have.length", 1);
    cy.get(".card-details__type")
      .eq(0)
      .should("contain.text", "Metal");
  });

  it("Renders pokémon resistances", () => {
    cy.get(".card-details__text--resistance").should(
      "contain.text",
      "Grass -30"
    );
  });

  it("Renders pokémon weaknesses", () => {
    cy.get(".card-details__text--weakness").should("contain.text", "Fire ×2");
  });

  it("Renders pokémon's attacks", () => {
    cy.get(".card-details__button--atack").should("have.length", 2);
    cy.get(".card-details__button--atack")
      .eq(0)
      .should("contain.text", "Slash");
  });

  it("Shows a modal, when click on an attack button", () => {
    cy.get(".card-details__button--atack")
      .eq(1)
      .click();

    cy.get(".modal").should("exist");
  });

  it("Render attack details in modal", () => {
    cy.get(".modal__title").should("contain.text", "Sonic Edge");
    cy.get(".card-details__text--cost").should(
      "contain.text",
      "Metal ×2 | Colorless ×1"
    );
    cy.get(".card-details__text--damage").should("contain.text", "130");
    cy.get(".card-details__text--description").should(
      "contain.text",
      "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
    );
  });

  it("Closes the modal, when click in the close button", () => {
    cy.get(".modal__button--close").click();

    cy.get(".modal").should("not.exist");
  });
});
