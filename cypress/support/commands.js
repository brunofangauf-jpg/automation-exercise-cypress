// Funciones de acortamiento de código para los tests de Cypress

Cypress.Commands.add('validarCargaHome', () => { 
    cy.get('.shop-menu > .nav').should('be.visible');
});
Cypress.Commands.add('navegarMenu', (nombreBoton) => {
  cy.get('.shop-menu').contains(nombreBoton).click();
});
Cypress.Commands.add('hacerclic', (selector) => {
    cy.get(selector).click();
});
Cypress.Commands.add('validarTextoVisible', (texto) => {
  cy.contains(texto).should('be.visible');
});
Cypress.Commands.add('agregarAlCarritoPorAPI', (idProducto) => {
  cy.request('GET', `/add_to_cart/${idProducto}`);
});
// ==========================================
// MÓDULO API: PREPARACIÓN DE DATOS (CREAR USUARIO RÁPIDO)
// ==========================================
Cypress.Commands.add('crearUsuarioPorAPI', (email, password) => {
  cy.request({
    method: 'POST',
    url: 'https://automationexercise.com/api/createAccount',
    form: true,
    body: {
      name: 'Usuario Test API',
      email: email,
      password: password,
      title: 'Mr',
      birth_date: '22',
      birth_month: '04',
      birth_year: '2000',
      firstname: 'Lalo',
      lastname: 'Landa',
      company: 'Empresa',
      address1: 'Calle Falsa 123',
      address2: 'Apto 1',
      country: 'United States',
      state: 'Cordoba',
      city: 'Cordoba',
      zipcode: '5000',
      mobile_number: '123456789'
    }
  });
});