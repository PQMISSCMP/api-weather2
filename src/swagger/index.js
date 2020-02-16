const swaggerUi = require('swagger-ui-express');
const specification = require('./specification');

const runSwagger = (app) => {
    app.use( '/', swaggerUi.serve, swaggerUi.setup(specification) );
}

module.exports = { runSwagger }
