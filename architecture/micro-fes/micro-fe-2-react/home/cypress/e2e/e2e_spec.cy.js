describe("My first E2E test", () => {
    it("Should add an item to the cart", () => {
        cy.visit("http://localhost:3000/");
        cy.get("#showlogin").click();
        cy.get("#loginbtn").click();
        cy.get("#showcart").click();
        cy.get(".flex-grow > #clearcart").click();
        cy.get("#addtocart_1").click();
        // cy.get("#grand_total").should("contain", "$5.99")
        cy.get(".text-right").should("contain", "$5.99")
    });
});
