describe('Открытие модального окна с описанием ингредиента', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:3000');
  });

  it('Открытие окна с подробными данными при клике на ингредиент', function () {
    cy.contains('Краторная булка').click();
    cy.get('[class^=Modal_modal_]').should('exist');
    cy.contains('Детали ингредиента');
    cy.contains('Краторная булка N-200i');
    cy.contains('Калории');
    cy.contains('420');
    cy.contains('80');
    cy.contains('24');
    cy.contains('53');
  });

  it('Закрытие окна при клике на кнопку закрытия', function () {
    cy.contains('Краторная булка').click();
    cy.get('[class^=Modal_buttonClose_]').first().as('close');
    cy.get('@close').click();
    cy.get('[class^=Modal_modal_]').should('not.exist');
  });
});
