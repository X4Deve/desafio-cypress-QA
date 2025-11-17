import { slowCypressDown } from 'cypress-slow-down';

describe('Fluxo de checkout - EBAC Shop', () => {
  // aqui controla o tempo de execução
  slowCypressDown(1000);

  beforeEach(() => {
    cy.visitHome();
  });

  it('CT01 - Deve adicionar um produto ao carrinho e exibir subtotal corretamente', () => {
    cy.addFirstProductToCart();
    cy.goToCartFrom();
    cy.get('.cart_item').should('have.length.at.least', 1);
    cy.get('.cart-subtotal .amount').should('be.visible');
  });

  it('CT02 - Deve permitir alterar a quantidade do item no carrinho e atualizar o total', () => {
    cy.addFirstProductToCart();
    cy.updateCart();
  });

  it('CT03 - Deve permitir remover item do carrinho', () => {
    cy.addFirstProductToCart();
    cy.delitItensOfCart();
  });

  it('CT04 - Deve concluir checkout com dados válidos', () => {
    cy.addFirstProductToCart();
    cy.goToCartFrom();
    cy.checkout();
    cy.fillCheckoutForm();
  });

  it('CT05 - Deve validar o checkout com sucesso', () => {
    cy.addFirstProductToCart();
    cy.goToCartFrom();
    cy.checkout();
    cy.fillCheckoutForm();
    cy.validatReceivedOrder();
  });
});
