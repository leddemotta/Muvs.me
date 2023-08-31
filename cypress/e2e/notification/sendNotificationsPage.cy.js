describe("Send notification test", () => {
  it("send notifications successfully", () => {
    cy.viewport(1600, 1000);
    cy.visit("/notifications/sender");
    cy.get("#form_item_title").type("Teste de notificação");
    cy.get("#form_item_content").type(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sodales est et neque finibus vehicula. "
    );
    cy.get("#form_item_url").type("/");
    cy.get(".text-center > .ant-btn").click();
  });
});
