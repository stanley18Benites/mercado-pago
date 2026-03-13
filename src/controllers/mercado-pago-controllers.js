const { default: axios } = require("axios");

exports.createPos = async (req, res, next) => {
    try {
        const body = req.body;

        if (!body?.name) {
            return res.status(404).send({
                retorno: {
                    status: 404,
                    mensagem: "O campo 'name' deve ser informado. Tente novamente."
                },
                registros: []
            });
        }

        if (!body?.store_id) {
            return res.status(404).send({
                retorno: {
                    status: 404,
                    mensagem: "O campo 'store_id' deve ser informado. Tente novamente."
                },
                registros: []
            });
        }

        if (!body?.external_id) {
            return res.status(404).send({
                retorno: {
                    status: 404,
                    mensagem: "O campo 'external_id' deve ser informado. Tente novamente."
                },
                registros: []
            });
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