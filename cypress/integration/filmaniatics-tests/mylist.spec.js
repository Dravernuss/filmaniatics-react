describe("MyList test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get('[data-test-id="enter-login"]').click();
    cy.get('[data-test-id="login-email"]').type("esteban16.rodas@gmail.com");
    cy.get('[data-test-id="login-password"]').type("123");
    cy.get('[data-test-id="login-success"]').click();
    cy.get('[data-test-id="my-list"]').click();
    cy.wait(1000);
    cy.url().should("include", "/mylist");
  });

  it("Should open Filmaniatics levels", () => {
    cy.wait(1000);
    cy.get('[data-test-id="levels-filmaniatics"]').click();
    cy.get(".modalBody").should("be.visible");
  });

  it("Should get # of favorite movies in My List", () => {
    cy.wait(1000);
    cy.get(
      ":nth-child(1) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel1a-content"
    ).should("have.length", 1);
  });

  it.only("Should get # of movies in My List", () => {
    cy.wait(1000);
    cy.get(
      ':nth-child(3) > #panel1a-header > .MuiAccordionSummary-expandIconWrapper > [data-testid="ExpandMoreIcon"]'
    ).click();
    cy.expect(
      ":nth-child(3) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel1a-content"
    ).to.exist;
  });
});
