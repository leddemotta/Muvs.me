describe("Registration test", () => {
  it("register successfully", () => {
    cy.visit("/signin");
    cy.get('#form_item_firstName').type("Usuario");
    cy.get('#form_item_lastName').type("Teste");
    cy.get('#form_item_email').type("teste@muvs.me");
  });
});
