describe("MovieList test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get('[data-test-id="enter-login"]').click();
    cy.get('[data-test-id="login-email"]').type("esteban16.rodas@gmail.com");
    cy.get('[data-test-id="login-password"]').type("123");
    cy.get('[data-test-id="login-success"]').click();
  });

  it("Add a movie to my list and favorite movies", () => {
    cy.wait(2000);
    cy.get(
      ':nth-child(2) > .react-multi-carousel-list > .react-multi-carousel-track > [data-index="0"] > .cardContainer > .movieImage'
    ).click();
    cy.wait(1000);
    cy.get('[data-test-id="add-list"]').click();
    cy.get('[data-test-id="remove-list"]').should("be.visible");
    cy.get('[data-test-id="add-favorite"]').click();
    cy.get('[data-test-id="remove-favorite"]').should("be.visible");
  });

  it("Remove a movie to my list and favorite movies", () => {
    cy.wait(2000);
    cy.get(
      ':nth-child(2) > .react-multi-carousel-list > .react-multi-carousel-track > [data-index="0"] > .cardContainer > .movieImage'
    ).click();
    cy.wait(1000);
    cy.get('[data-test-id="remove-favorite"]').click();
    cy.get('[data-test-id="add-favorite"]').should("be.visible");
    cy.get('[data-test-id="remove-list"]').click();
    cy.get('[data-test-id="add-list"]').should("be.visible");
  });

  it("Should play trailer from movie", () => {
    cy.wait(2000);
    cy.get(
      ':nth-child(2) > .react-multi-carousel-list > .react-multi-carousel-track > [data-index="0"] > .cardContainer > .movieImage'
    ).click();
    cy.wait(1000);
    cy.get('[data-test-id="trailer-player"]').click();
    cy.get(".modalBody").should("be.visible");
  });
});
