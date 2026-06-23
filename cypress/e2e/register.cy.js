describe("User register", () => {
  it("should display register form", () => {
    cy.viewport(550, 750);

    cy.visit("http://localhost:5173/register");

    cy.url().should("include", "/register");

    cy.get("#name")
      .should("be.visible")
      .type("Nandika Rizki Prapanca")
      .should("have.value", "Nandika Rizki Prapanca");

    cy.get("#email")
      .should("be.visible")
      .type("nandika@test.com")
      .should("have.value", "nandika@test.com");

    cy.get("#password")
      .should("be.visible")
      .type("123456")
      .should("have.value", "123456");

    cy.get("button").contains("Sign Up").click();

    cy.url().should("include", "/register");
  });
});