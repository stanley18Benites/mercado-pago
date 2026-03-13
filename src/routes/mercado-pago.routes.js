const express = require('express');
const routes = express.Router();

const mercadoPagoController = require("../controllers/mercado-pago-controllers");

routes.get('/', mercadoPagoController.createPos);

module.exports = routes;