/**
 * Dashboard E2E Test
 * Scenario: Login → Verify dashboard renders correctly
 */

const BASE_URL = "http://localhost:5173";

// Reusable login command via UI
const loginAsStudent = () => {
  cy.visit(BASE_URL);
  cy.url().should("include", "/login");

  cy.get("input#email")
    .should("be.visible")
    .type("hello@example.com");

  cy.get("input#password")
    .should("be.visible")
    .type("123456");

  cy.get("button").contains("Login").click();
};

describe("Dashboard", () => {
  beforeEach(() => {
    // Clear state sebelum setiap test
    cy.clearLocalStorage();
  });

  it("1. should visit the app and redirect to login when not authenticated", () => {
    cy.visit(BASE_URL);
    cy.url().should("include", "/login");
  });

  it("2. should login successfully with valid student credentials", () => {
    loginAsStudent();

    // Tunggu redirect selesai (network request ke backend)
    cy.url({ timeout: 10000 }).should("not.include", "/login");
  });

  it("3. should redirect to dashboard after successful login", () => {
    loginAsStudent();

    cy.url({ timeout: 10000 }).should("eq", `${BASE_URL}/`);
  });

  it("4. should display the navbar after login", () => {
    loginAsStudent();

    // Sidebar / nav ada di <aside>
    cy.get("aside", { timeout: 10000 }).should("be.visible");

    // Menu items harus tampil
    cy.get("aside").contains("Overview").should("be.visible");
    cy.get("aside").contains("Expenses").should("be.visible");
  });

  it("5. should display the Overview (balance, goal, upcoming bill) cards", () => {
    loginAsStudent();

    // Tunggu redirect ke dashboard
    cy.url({ timeout: 10000 }).should("eq", `${BASE_URL}/`);

    // CardBalance
    cy.contains("Balances", { timeout: 8000 }).should("exist");

    // CardGoal
    cy.contains("Goals", { timeout: 8000 }).should("exist");

    // CardUpcomingBill
    cy.contains("Upcoming Bill", { timeout: 8000 }).should("exist");
  });

  it("6. should display Upcoming Bill section with data or skeleton", () => {
    loginAsStudent();

    cy.url({ timeout: 10000 }).should("eq", `${BASE_URL}/`);

    // Section heading ada
    cy.contains("Upcoming Bill", { timeout: 8000 }).should("be.visible");
  });

  it("7. should navigate to Expenses page and display expenses", () => {
    loginAsStudent();

    cy.url({ timeout: 10000 }).should("eq", `${BASE_URL}/`);

    // Klik menu Expenses di sidebar
    cy.get("aside").contains("Expenses").click();

    cy.url().should("include", "/expense");

    // Heading expenses ada
    cy.contains("Expenses", { timeout: 10000 }).should("be.visible");
  });

  it("8. should have no uncaught exceptions", () => {
    // Intercept uncaught exceptions — test gagal jika ada JS error fatal
    cy.on("uncaughtException", (err) => {
      // Lempar ulang agar Cypress menandai sebagai gagal
      throw err;
    });

    loginAsStudent();

    cy.url({ timeout: 10000 }).should("eq", `${BASE_URL}/`);

    // Tunggu sebentar untuk memastikan semua request selesai
    cy.wait(3000);
  });
});
