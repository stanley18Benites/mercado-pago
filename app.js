require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

// Importando as rotas
const mercadoPagoRoutes = require('./src/routes/mercado-pago.routes.js');

// Usando o morgan para logs
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Permite apenas o frontend específico

    res.header("Access-Control-Allow-Credentials", "true"); // Permite cookies e credenciais
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).send({});
    }

    next();
});

// Defina suas rotas e configure o servidor Express
app.use('/mercado-pago', mercadoPagoRoutes);

// Middleware para tratamento de URL não encontrada
app.use((req, res, next) => {
    const error = new Error("Url não encontrada, tente novamente");
    error.status = 404;
    next(error);
});

// Middleware para tratamento de erros gerais
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        retorno: {
            status: error.status || 500,
            mensagem: error.message,
        },
        registros: []
    });
});

module.exports = app;