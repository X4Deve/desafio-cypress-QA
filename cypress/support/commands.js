import { fakerPT_BR as faker } from '@faker-js/faker';

const selectors = {
    home: {
        productLink: '.product-block.grid a.product-image'
    }
};

Cypress.Commands.add('visitHome', () => {
    cy.visit('/');
});

Cypress.Commands.add('validateQuantity', (expected, index = 0) => {
    cy.get('input[title="Qty"]')
        .eq(index)
        .should('have.value', String(expected));
});

Cypress.Commands.add('removeFirstCartItem', () => {
    cy.get('body').then(($body) => {
        if ($body.find('p.cart-empty').length > 0) {
            return;
        }

        if ($body.find('form.woocommerce-cart-form').length > 0) {
            cy.get('form.woocommerce-cart-form a.remove:visible').then(($buttons) => {
                const total = $buttons.length;

                for (let i = 0; i < total; i += 1) {
                    cy.get('form.woocommerce-cart-form a.remove:visible')
                        .first()
                        .click();
                }
            });
        }
    });
});

Cypress.Commands.add('selectSize', (size) => {
    cy.get(`li.button-variable-item[data-value="${size}"]`)
        .should('be.visible')
        .click();
});

Cypress.Commands.add('selectColor', (color) => {
    cy.get(`li.button-variable-item[data-value="${color}"]`)
        .should('be.visible')
        .click();
});

Cypress.Commands.add('clickAddToCart', () => {
    cy.get('button.single_add_to_cart_button')
        .should('be.visible')
        .click();
});

Cypress.Commands.add('addFirstProductToCart', () => {
    cy.get(selectors.home.productLink)
        .first()
        .click();

    cy.selectSize('M');
    cy.selectColor('White');
    cy.clickAddToCart();

    cy.contains('div[role="alert"]', 'foi adicionado no seu carrinho')
        .should('be.visible')
        .and('contain', 'foi adicionado no seu carrinho');
});

Cypress.Commands.add('goToCartFrom', () => {
    cy.contains('a.button.wc-forward', 'Ver carrinho')
        .should('be.visible')
        .click();

    cy.validateQuantity(1);

    cy.get('tbody tr:first-child td:nth-child(5) span bdi')
        .invoke('text')
        .then((valor) => {
            cy.log('Subtotal do item:', valor);
        });
});

Cypress.Commands.add('updateCart', () => {
    cy.contains('a.button.wc-forward', 'Ver carrinho')
        .should('be.visible')
        .click();

    cy.get('input[type="button"][value="+"]')
        .should('be.visible')
        .click();

    cy.validateQuantity(2);

    cy.get('tbody tr:first-child td:nth-child(5) span bdi')
        .invoke('text')
        .then((valor) => {
            cy.log('Subtotal do item:', valor);
        });

    cy.contains('div.woocommerce-message', 'Carrinho atualizado')
        .should('be.visible')
        .and('contain', 'Carrinho atualizado');
});

Cypress.Commands.add('delitItensOfCart', () => {
    cy.contains('a.button.wc-forward', 'Ver carrinho')
        .should('be.visible')
        .click();

    cy.removeFirstCartItem();

    cy.contains('p.cart-empty', 'Seu carrinho está vazio.')
        .should('be.visible')
        .and('contain', 'Seu carrinho está vazio.');
});

Cypress.Commands.add('checkout', () => {
    cy.contains('a.checkout-button', 'Concluir compra').click();
});

Cypress.Commands.add('fillCheckoutForm', () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });
    const phone = faker.phone.number('119########');
    const street = faker.location.streetAddress();
    const city = faker.location.city();
    const postcode = faker.location.zipCode('########');

    cy.get('#billing_first_name').type(firstName);
    cy.get('#billing_last_name').type(lastName);
    cy.get('#billing_address_1').type(street);
    cy.get('#billing_city').type(city);
    cy.get('#billing_postcode').type(postcode);
    cy.get('#billing_phone').type(phone);
    cy.get('#billing_email').type(email);

    cy.get('input#createaccount[type="checkbox"][name="createaccount"]')
        .should('exist')
        .check({ force: true });

    cy.get('input#account_password[type="password"][name="account_password"]')
        .should('be.visible')
        .type('password 12345');

    cy.get('input#terms[type="checkbox"][name="terms"]')
        .should('exist')
        .check({ force: true });

    cy.get('input#place_order[type="submit"][name="woocommerce_checkout_place_order"]')
        .should('be.visible')
        .click();
});

Cypress.Commands.add('validatReceivedOrder', () => {
    cy.contains('p.woocommerce-thankyou-order-received', 'pedido foi recebido')
        .should('be.visible');
});
