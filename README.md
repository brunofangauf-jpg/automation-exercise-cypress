# Automation Exercise — Cypress

Suite de pruebas automatizadas con Cypress para Automation Exercise.

Este proyecto forma parte de mi práctica de QA y combina pruebas mediante interfaz de usuario con peticiones API utilizadas como apoyo para preparar determinadas condiciones de prueba.

## Cobertura

Se automatizaron **12 casos de prueba** de los escenarios oficiales de Automation Exercise:

* **TC1–TC10**
* **TC12**
* **TC16**

Los casos cubren flujos de registro, autenticación, navegación, formularios, productos, carrito y checkout.

## Decisiones técnicas

* **Custom Commands:** separé acciones repetitivas en comandos reutilizables para mantener los casos de prueba más claros.
* **Datos dinámicos:** utilicé `Date.now()` para generar datos únicos al crear usuarios.
* **API como apoyo:** utilicé `cy.request()` para preparar determinadas condiciones de prueba, principalmente la creación de usuarios y el estado del carrito.
* **Workaround en el carrito:** en el caso del carrito, la interacción mediante UI presentó problemas de confiabilidad. Como alternativa, utilicé API para preparar el estado necesario y continuar con las validaciones posteriores.
* **Carga de archivos:** incorporé una prueba de subida de archivos mediante un fixture específico para el formulario de contacto.
* **Stubs:** utilicé un stub sobre `window.confirm` para controlar el diálogo de confirmación del formulario de contacto.

## Aspectos practicados

Durante el desarrollo practiqué:

* Selectores y búsqueda de elementos.
* Navegación, `click`, `type`, scroll y aserciones.
* Organización y reutilización mediante Custom Commands.
* Preparación de datos y condiciones de prueba mediante API.
* Uso de datos dinámicos para evitar conflictos entre ejecuciones.
* Carga de archivos y manejo de diálogos mediante stubs.

## Requisitos

* Node.js
* Google Chrome

Cypress se instala automáticamente a partir de las dependencias definidas en `package.json`.

## Cómo ejecutar

Instalar las dependencias:

```bash
npm ci
```

Ejecutar la suite en Chrome:

```bash
npm test
```

Abrir Cypress en modo interactivo:

```bash
npm run cypress:open
```

## Estructura del proyecto

```text
automation-exercise-cypress/
├── cypress/
│   ├── e2e/
│   │   └── mi-primer-test.cy.js
│   ├── fixtures/
│   │   └── contact-upload.txt
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── .gitignore
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md
```
