 describe("Login test", () => {
  it("makes login successfully", () => {
    cy.visit("/login");
    cy.get("#form_item_email").type("ledde.motta@gmail.com");
    cy.get("#form_item_password").type("my028");
    cy.get(
      ":nth-child(6) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .css-dev-only-do-not-override-icpph8"
    ).click();
  });
});