const express = require('express');
const routes = express.Router();

const mercadoPagoController = require("../controllers/mercado-pago-controllers");

routes.post('/', mercadoPagoController.createPos);

module.exports = routes;