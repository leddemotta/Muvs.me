 describe("Login test", () => {
  it("makes login successfully", () => {
    cy.visit("/login");
    cy.get("#form_item_email").type("ledde.motta@gmail.com");
    cy.get("#form_item_password").type("my028");
    cy.get('.ant-form-item-control-input-content > .ant-btn').click();
  });
});