describe('Random Sampling Module', () => {
    beforeEach(function () {
        // 1. Visit the application frontend
        cy.visit('/front/');

        // 2. Load credentials and login
        cy.fixture('cred').then((cred) => {
            this.cred = cred;
            cy.get('input[type="text"]').type(this.cred.username);
            cy.get('input[type="password"]').type(this.cred.password);
            cy.get('button[type="submit"]').click();

            // Ensure login is successful
            cy.contains('Welcome').should('be.visible');

            // 3. Navigate to the Random Sampling section (under Claims -> Reviews)
            cy.contains('Claims').click();
            cy.contains('Reviews').click();
        });
    });

    it('Displays the random sampling controls on the Reviews page', function () {
        // Verify that the 'Random Filter' configuration section is present
        cy.contains('Random Filter').should('be.visible');

        // Verify that the 'CLAIM SAMPLE' button is visible
        cy.contains(/CLAIM SAMPLE/i).should('be.visible');
    });

    it('Can successfully initiate a random sampling of claims', function () {
        // Click on the button to initiate claim sampling
        cy.contains(/CLAIM SAMPLE/i).click();

        // Verify that the search results are displayed (e.g., 'Claims Found' text)
        cy.contains('Claims Found').should('be.visible');

        // Check that at least one claim is visible in the results table
        cy.get('table').should('be.visible');
    });
});
