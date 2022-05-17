describe("Login test", () => {
  it("should visit profile properly", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-test-id="enter-login"]').click();
    cy.get('[data-test-id="login-email"]').type("esteban16.rodas@gmail.com");
    cy.get('[data-test-id="login-password"]').type("123");
    cy.get('[data-test-id="login-success"]').click();
    cy.get('[data-test-id="open-menu"]').click();
    cy.wait(1000);
    cy.get('[data-test-id="visit-profile"]').click();
    cy.url().should("include", "/profile");
    cy.get('[data-test-id="edit-profile"]').click();
    cy.get('[data-test-id="edit-name"]').clear().type("Esteban Rodas R.");
    cy.get('[data-test-id="edit-genre"]').type("Terror");
    cy.get('[data-test-id="edit-description"]').type(
      "Me encanta ir al cine y ver peliculas!!"
    );
    cy.get('[data-test-id="edit-finished"]').click();
    cy.get('[data-test-id="name-profile"]').should(
      "contain",
      "Esteban Rodas R."
    );
    cy.get('[data-test-id="genre-profile"]').should("contain", "Terror");
    cy.get('[data-test-id="description-profile"]').should(
      "contain",
      "Me encanta ir al cine y ver peliculas!!"
    );
  });
});
