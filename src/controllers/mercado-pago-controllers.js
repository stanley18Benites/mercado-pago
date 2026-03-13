const { default: axios } = require("axios");

exports.createPos = async (req, res, next) => {
    try {
        const body = req.body;

        if (!body || typeof body !== 'object') {
            return res.status(400).send({
                retorno: { status: 400, mensagem: 'Requisição inválida. Tente novamente.' },
                registros: []
            });
        }

        const requiredFields = ['name', 'store_id', 'external_id'];
        for (const field of requiredFields) {
            if (!body?.[field]) {
                return res.status(400).send({
                    retorno: { status: 400, mensagem: `O campo '${field}' deve ser informado. Tente novamente.` },
                    registros: []
                });
            }
        }

        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.APP_USR_MP}`
            }
        };

        const response = await axios.post('https://api.mercadopago.com/pos', body, requestOptions)

        return res.status(201).send({
            retorno: {
                status: 201,
                mensagem: response.data?.message || "Ponto de venda criado com sucesso."
            },
            registros: response.data
        });
    } catch (error) {
        const status = error.response?.status || 500;
        const mensagem = error.response?.data?.message || error.message || 'Erro ao criar ponto de venda';
        return res.status(status).send({
            retorno: {
                status,
                mensagem
            },
            registros: []
        });
    }
}

exports.verificaAuthorization = async (req, res, next) => {
    try {
        const authorization = req.headers['authorization'];

        if (!authorization) {
            return res.status(400).send({
                retorno: {
                    status: 400,
                    mensagem: "Authorization não encontrado"
                },
                registros: []
            });
        }

        return res.status(200).send({
            retorno: {
                status: 200,
                mensagem: "Teste authorization"
            },
            registros: authorization
        });
    } catch (error) {
        return res.status(500).send({
            retorno: {
                status: 500,
                mensagem: 'Erro ao realizar teste',
                error
            },
            registros: []
        });
    }
}