describe("Movie Page test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get('[data-test-id="enter-login"]').click();
    cy.get('[data-test-id="login-email"]').type("esteban16.rodas@gmail.com");
    cy.get('[data-test-id="login-password"]').type("123");
    cy.get('[data-test-id="login-success"]').click();
    cy.wait(2000);
    cy.get('[data-test-id="movies"]').click();
    cy.url().should("include", "/movies");
  });

  it("Should filter movies by genre", () => {
    cy.get(":nth-child(3) > .MuiChip-label").click();
    cy.wait(1000);
    cy.get('[data-test-id="genre-selected"]').should("contain", "AVENTURA");
  });

  it("Should search a movies", () => {
    cy.get(".search").type("Avatar");
    cy.get(".lupa").click();
    cy.url().should("include", "/Avatar");
    cy.wait(1000);
  });
});
