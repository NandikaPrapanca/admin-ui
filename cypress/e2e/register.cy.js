describe("User register", () => {
  it("should navigate to register page and fill register form", () => {
    cy.viewport(550, 750);

    cy.visit("http://localhost:5173/");
    cy.url().should("include", "/login");

    cy.contains("Create an account").click();

    cy.url().should("include", "/register");

    cy.get("#name")
      .should("be.visible")
      .should("have.attr", "placeholder", "Nandika Rizki Prapanca")
      .type("Nandika Rizki Prapanca")
      .should("have.value", "Nandika Rizki Prapanca");

    cy.get("#email")
      .should("be.visible")
      .should("have.attr", "placeholder", "hello@example.com")
      .type("nandika@test.com")
      .should("have.value", "nandika@test.com");

    cy.get("#password")
      .should("be.visible")
      .should("have.attr", "placeholder", "********")
      .type("123456")
      .should("have.value", "123456");

    cy.get("button").contains("Sign Up").click();

    cy.url().should("include", "/register");

    cy.wait(3000);
  });
});