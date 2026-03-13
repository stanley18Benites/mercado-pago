const express = require('express');
const routes = express.Router();

const mercadoPagoController = require("../controllers/mercado-pago-controllers");

routes.post('/', mercadoPagoController.createPos);
routes.post('/authorization', mercadoPagoController.verificaAuthorization);

module.exports = routes;