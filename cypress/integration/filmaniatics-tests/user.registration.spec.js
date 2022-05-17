describe("Registration test", () => {
  it("should register new user properly", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-test-id="enter-register"]').click();
    cy.get('[data-test-id="name-register"]').type("Esteban Rodas");
    cy.get('[data-test-id="email-register"]').type("esteban16.rodas@gmail.com");
    cy.get('[data-test-id="password-register"]').type("123");
    cy.get('[data-test-id="choose-file"]').click();
    cy.get("iframe")
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .and("be.visible")
      .then(cy.wrap)
      .find('input[type="file"]')
      .selectFile("cypress/fixtures/user-photo.jpg");
    cy.get("iframe")
      .its("0.contentDocument.body")
      .find('[data-test="queue-done"]')
      .click();
    cy.get('[data-test-id="end-register"]').click();
    cy.wait(1000);
    cy.get('[data-test-id="registration-success"]').should("be.visible");
  });
});
