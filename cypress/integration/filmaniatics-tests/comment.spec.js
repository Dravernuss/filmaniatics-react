describe("Comment test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get('[data-test-id="enter-login"]').click();
    cy.get('[data-test-id="login-email"]').type("esteban16.rodas@gmail.com");
    cy.get('[data-test-id="login-password"]').type("123");
    cy.get('[data-test-id="login-success"]').click();
    cy.get('[data-test-id="open-menu"]').click();
    cy.wait(1000);
    cy.get('[data-test-id="visit-profile"]').click();
    cy.url().should("include", "/profile");
  });

  it("should add a comment for a movie properly", () => {
    cy.get(".movieTitle").click();
    cy.wait(1000);
    cy.get('[data-test-id="add-comment"]').click();
    cy.get('[data-test-id="comment"]').type(
      "Me fascino la película, es realmente muy entretenida!"
    );
    cy.get('[data-test-id="create-comment"]').click();
    cy.get(".commentText").should(
      "contain",
      "Me fascino la película, es realmente muy entretenida!"
    );
  });
});
