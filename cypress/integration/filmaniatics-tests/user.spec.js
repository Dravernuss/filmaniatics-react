describe("Login test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get('[data-test-id="enter-login"]').click();
    cy.get('[data-test-id="login-email"]').type("esteban16.rodas@gmail.com");
    cy.get('[data-test-id="login-password"]').type("123");
    cy.get('[data-test-id="login-success"]').click();
  });

  afterEach("Should end session", () => {
    cy.get('[data-test-id="open-menu"]').click();
    cy.wait(1000);
    cy.get('[data-test-id="end-session"]').click();
    cy.url().should("include", "/");
  });

  it("should visit profile properly", () => {
    cy.get('[data-test-id="open-menu"]').click();
    cy.wait(1000);
    cy.get('[data-test-id="visit-profile"]').click();
    cy.url().should("include", "/profile");
  });

  it("should visit principal page properly", () => {
    cy.wait(1000);
    cy.get('[data-test-id="principal-page"]').click();
    cy.url().should("include", "/principalpage");
  });

  it("should visit movies page properly", () => {
    cy.wait(1000);
    cy.get('[data-test-id="movies"]').click();
    cy.url().should("include", "/movies");
  });

  it("should visit my list page properly", () => {
    cy.get('[data-test-id="my-list"]').click();
    cy.wait(1000);
    cy.url().should("include", "/mylist");
  });
});
