export const app =
  'Step: ' +
  Cypress.config()
    .integrationFolder.split('\\')
    .find(pathSegment => /[0-9]/.test(pathSegment));

describe(app, () => {
  before(() => {
    cy.visit('/');
  });
  describe('navigation', () => {
    it('should start on dashboard screen', () => {
      cy.get('.card-title').then(titles => {
        expect(titles.eq(0)).to.contain('Profile');
        expect(titles.eq(1)).to.contain('Todo List');
        expect(titles.eq(2)).to.contain('Upcoming Meetings');
        expect(titles.eq(3)).to.contain('Who is in meetings');
      });
    });

    it('can navigate to employee browser', () => {
      cy.contains('a', 'Employee Browser').click();
      cy.contains('.card-title', 'Employees').should('exist');
    });
  });

  describe('dashboard', () => {
    before(() => {
      cy.contains('a', 'Dashboard').click();
    });

    it('hides and shows the profile', () => {
      cy.get('button').click();
      cy.get('button').should('contain', 'Show Profile');
      cy.get('.pad-around').should('not.exist');
      cy.get('button').click();
      cy.get('button').should('contain', 'Hide Profile');
      cy.get('.pad-around').should('exist');
    });

    it('adds more todo items', () => {
      cy.get('.material-icons').click();
      cy.get('.todo > .card-content > .collection')
        .children()
        .should('have.length', 4);
    });
  });

  describe('employee browser', () => {
    before(() => {
      cy.contains('a', 'Employee Browser').click();
    });

    it('should display all employee roles', () => {
      cy.get('strong').should('have.length', 8);
      // TODO: test role counts
    });
  });
});
