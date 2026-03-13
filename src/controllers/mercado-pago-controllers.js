const { default: axios } = require("axios");

exports.createPos = async (req, res, next) => {
    try {

        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.APP_USR_MP}`
            }
        };

        const body = {
            "name": "PONTO VENDA-2",
            "store_id": "79584422",
            "external_id": "22714341000161"
        };

        const response = await axios.post('https://api.mercadopago.com/pos', JSON.stringify(body), requestOptions)
        console.log(response.data);

        return res.status(200).send({
            retorno: {
                status: 200,
                mensagem: "Teste API"
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