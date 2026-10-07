describe('Suite de Pruebas Automation Exercise', () => {

  beforeEach(() => {
    cy.visit('https://automationexercise.com/')
    cy.validarCargaHome()
  })

  it('TC1: Debería registrar un usuario manualmente y borrar la cuenta', () => {
    // 1. Preparar datos dinámicos del test

    const nombreUsuariotc1 = `brunotc1`;
    const emailDinamicotc1 = `${nombreUsuariotc1}_${Date.now()}@dominio.com`;
    const passwordtc1 = 'claveSegura123';

    // 2. Navegar e ir al formulario y registrar usuario
    cy.navegarMenu('Signup / Login');
    cy.get('[data-qa="signup-name"]').type(nombreUsuariotc1);
    cy.get('[data-qa="signup-email"]').type(emailDinamicotc1);
    cy.get('[data-qa="signup-button"]').click();
    cy.get('[data-qa="password"]').should('be.enabled').type(passwordtc1);

    // 4. Completar datos de la cuenta

    cy.contains('Enter Account Information').should('be.visible');
    cy.get('#id_gender1').check();
    
    cy.get('[data-qa="days"]').select('22');
    cy.get('[data-qa="months"]').select('4');
    cy.get('[data-qa="years"]').select('2000');
    cy.get('[name="newsletter"]').check();
    cy.get('[name="optin"]').check();

    // 5. Completar datos personales y de dirección

    cy.get('[data-qa="first_name"]').type('lalo landa');
    cy.get('[data-qa="last_name"]').type('farzante');
    cy.get('[data-qa="company"]').type('empresa');
    cy.get('[data-qa="address"]').type('address');
    cy.get('[data-qa="country"]').select(2);
    cy.get('[data-qa="state"]').type('fati');
    cy.get('[data-qa="city"]').type('minecraft');
    cy.get('[data-qa="zipcode"]').type('00000');
    cy.get('[data-qa="mobile_number"]').type('123456789');

    // 6. Enviar y confirmar creación

    cy.hacerclic('[data-qa="create-account"]');
    cy.contains('Account Created!').should('be.visible');
    cy.hacerclic('[data-qa="continue-button"]');

    // 7. Borrar la cuenta para dejar el entorno limpio (Cleanup)

    cy.navegarMenu('Delete Account');
    cy.contains('Account Deleted!').should('be.visible');
    cy.hacerclic('[data-qa="continue-button"]');

  });

  it('TC2: Debería iniciar sesión correctamente con credenciales válidas y borrar la cuenta', () => {
    
    // 1. Crear usuario por API (precondición rápida y aislada)
    const emailDinamicotc2 = `bruno_login_${Date.now()}@dominio.com`;
    const passwordtc2 = 'claveSegura123';
    cy.crearUsuarioPorAPI(emailDinamicotc2, passwordtc2);
    
    // 2. Navegar al login e iniciar sesión
    cy.navegarMenu('Signup / Login');
    cy.validarTextoVisible('Login to your account');
    cy.get('[data-qa="login-email"]').type(emailDinamicotc2);
    cy.get('[data-qa="login-password"]').type(passwordtc2);
    cy.hacerclic('[data-qa="login-button"]');
    cy.validarTextoVisible('Logged in as');
    
    // 3. Borrar cuenta y confirmar cierre
    cy.navegarMenu('Delete Account');
    cy.validarTextoVisible('Account Deleted!');
    cy.hacerclic('[data-qa="continue-button"]');
  });

  it('TC3: Debería mostrar error con credenciales truchas', () => {
    cy.navegarMenu('Signup / Login');
    cy.get('[data-qa="login-email"]').type('invalido@dominio.com');
    cy.get('[data-qa="login-password"]').type('clave_falsa123');
    cy.hacerclic('[data-qa="login-button"]');
    cy.validarTextoVisible('Your email or password is incorrect!');
  });

  it('TC4: Debería iniciar sesión correctamente y hacer logout', () => {

    // 1. Precondición: Crea usuario dinámico por API para testear el flujo de Login/Logout en UI
    const emailDinamicotc4 = `bruno_test_${Date.now()}@dominio.com`
    const passwordDinamicatc4 = 'clave123'
    cy.crearUsuarioPorAPI(emailDinamicotc4, passwordDinamicatc4)

    // 2. Iniciar sesión con el usuario creado y validar que se muestra el mensaje de bienvenida

    cy.navegarMenu('Signup / Login');
    cy.validarTextoVisible('Login to your account');
    cy.get('[data-qa="login-email"]').type(emailDinamicotc4);
    cy.get('[data-qa="login-password"]').type(passwordDinamicatc4);
    cy.hacerclic('[data-qa="login-button"]');
    cy.validarTextoVisible('Logged in as');

    // 3. Hacer logout y validar que vuelve a la pantalla de login

    cy.navegarMenu('Logout');
    cy.validarTextoVisible('Login to your account');

  });
  
  it('TC5: Debería mostrar error al registrar un usuario existente', () => {
    // 1. Precondición: Crear usuario dinámico por API para testear el flujo de registro con email existente
    const emailExistentetc5 = `existente_${Date.now()}@dominio.com`
    cy.crearUsuarioPorAPI(emailExistentetc5, 'clave123')

    // 2. Intentar registrar el mismo usuario nuevamente y validar el mensaje de error
    cy.navegarMenu('Signup / Login');
    cy.validarTextoVisible('New User Signup!');
    cy.get('[data-qa="signup-name"]').type('Usuario Test API');
    cy.get('[data-qa="signup-email"]').type(emailExistentetc5);
    cy.hacerclic('[data-qa="signup-button"]')
    cy.validarTextoVisible('Email Address already exist!')
  });

  it('TC6: Debería enviar el formulario de contacto correctamente', () => {
    // 1. Navegar al menú "Contact us" y validar la pantalla
    cy.navegarMenu('Contact us');
    cy.validarTextoVisible('Get In Touch');

    // 2. Completar el formulario con datos de prueba y subir un archivo
    cy.get('[data-qa="name"]').type('Lalo Landa');
    cy.get('[data-qa="email"]').type('lalo.landa@dominio.com');
    cy.get('[data-qa="subject"]').type('Asunto de prueba');
    cy.get('[data-qa="message"]').type('Mensaje de prueba');
    cy.get('input[name="upload_file"]').selectFile('cypress/fixtures/contact-upload.txt');

    // 3. Override de la función confirm del navegador antes del click
    cy.window().then((win) => {
        cy.stub(win, 'confirm').returns(true);
    });

    // 4. Enviar el formulario y validar el mensaje de éxito
    cy.hacerclic('[data-qa="submit-button"]');
    cy.validarTextoVisible('Success! Your details have been submitted successfully.');
    cy.navegarMenu('Home');
  });

  it('TC7: Debería navegar a la página de Test Cases correctamente', () => {
    // 1. Navegar al menú "Test Cases"
    cy.navegarMenu('Test Cases');

    // 2. Validar que la URL contiene "/test_cases" y que el título de la página es visible
    cy.url().should('include', '/test_cases');
    cy.validarTextoVisible('Test Cases');
  });

  it('TC8: Debería verificar la lista de productos y la información detallada del primer producto', () => {
    // 1. Navegar a productos y validar la pantalla
    cy.navegarMenu('Products');
    cy.url().should('include', '/products');
    cy.validarTextoVisible('All Products');
    cy.get('.features_items').should('be.visible');

    // 2. Ir al detalle del primer producto
    cy.get('a[href*="/product_details/"]').first().click();
    cy.url().should('include', '/product_details/1');

    // 3. Validar los detalles del producto (Paso 9)
   // 4. Validar redirección y campos clave en el detalle
    cy.url().should('include', '/product_details/');
    cy.get('.product-information').within(() => {
      cy.get('h2').should('be.visible'); // Nombre del producto
      cy.contains('Category:').should('be.visible');
      cy.contains('Rs.').should('be.visible'); // Precio
      cy.contains('Availability:').should('be.visible');
      cy.contains('Condition:').should('be.visible');
      cy.contains('Brand:').should('be.visible');
    });
  });
  // --- TC9: Buscar producto ---
  it('TC9: Debería buscar un producto y mostrar los resultados relacionados', () => {
    cy.navegarMenu('Products');
    cy.url().should('include', '/products');
    
    // 1. Escribir el término de búsqueda
    cy.get('[name="search"]').type('blue top');
    
    // 2. Ejecutar la búsqueda con la lupita
    cy.hacerclic('#submit_search');
    
    // 3. Validar la respuesta de la interfaz
    cy.validarTextoVisible('Searched Products');
    cy.get('.features_items .col-sm-4')
      .should('have.length.greaterThan', 0)
      .and('be.visible');
  });
  // --- TC10: Verificar la suscripción en la página principal ---
  it('TC10: Verificar la suscripción en la página principal', () => {
  // 1. Bajar al footer y validar el título de la sección
  cy.get('#footer').scrollIntoView();
  cy.validarTextoVisible('Subscription');

  // 2. Ingresar email dinámico y enviar
  const emailDinamico = `brunotest${Date.now()}@mailinator.com`;
  cy.get('#susbscribe_email').type(emailDinamico);
  cy.hacerclic('#subscribe');

  // 3. Validar mensaje de confirmación
  cy.validarTextoVisible('You have been successfully subscribed!');
  });
  it('TC12: Agregar productos al carrito y verificar precios y cantidades', () => {
    cy.agregarAlCarritoPorAPI(1);
    cy.agregarAlCarritoPorAPI(2);

    cy.navegarMenu('Cart');

    cy.get('#product-1').should('be.visible');
    cy.get('#product-2').should('be.visible');
  });
  it('TC16: Debería realizar un pedido completo (Checkout E2E)', () => {
    // Precondición: Crear usuario dinámico por API
    const emailDinamico = `bruno_checkout_${Date.now()}@dominio.com`;
    const password = 'claveCheckout123';
    cy.crearUsuarioPorAPI(emailDinamico, password);

    // 1. Iniciar sesión con el usuario creado
    cy.navegarMenu('Signup / Login');
    cy.get('[data-qa="login-email"]').type(emailDinamico);
    cy.get('[data-qa="login-password"]').type(password);
    cy.hacerclic('[data-qa="login-button"]');
    cy.validarTextoVisible('Logged in as');

    // 2. Agregar productos al carrito por API
    cy.agregarAlCarritoPorAPI(1);
    cy.agregarAlCarritoPorAPI(2);

    // 3. Navegar al carrito y proceder al checkout
    cy.navegarMenu('Cart');
    cy.hacerclic('.check_out');

    // 4. Validar dirección/orden y colocar comentario
    cy.get('.form-control').type('Comentario de prueba QA sobre el envío');
    cy.contains('Place Order').click();

    // 5. Completar datos de tarjeta y pagar
    cy.get('[data-qa="name-on-card"]').type('Bruno QA');
    cy.get('[data-qa="card-number"]').type('4111111111111111');
    cy.get('[data-qa="cvc"]').type('311');
    cy.get('[data-qa="expiry-month"]').type('12');
    cy.get('[data-qa="expiry-year"]').type('2028');
    cy.get('[data-qa="pay-button"]').click();

    // 6. Validar mensaje de éxito de la orden
    cy.get('[data-qa="order-placed"]').should('be.visible');
  });
});
