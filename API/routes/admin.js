const axios = require('axios');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//Buscar Todos Os Usuários
router.get('/customers', async (req,res)=>{
    try {
        let transaction = await axios.get(`http://localhost:3001/customers`,
            {
                params: {},
                headers: { 
                    ...req.headers
                }
            }
        );
        return res.status(200).send({...transaction.data});
    }catch(err){
        return res.status(err.response.status).send({...err.response.data});
    }
});

//Buscar Todas As Transações Filtrando por Usuário || Serviço de Pagamento
router.get('/transactions', async (req,res)=>{
    try {
        let transaction = await axios.get(`http://localhost:3002/transactions`,
            {
                params: {},
                headers: { 
                    ...req.headers
                }
            }
        );
        return res.status(200).send({...transaction.data});
    }catch(err){
        return res.status(err.response.status).send({...err.response.data});
    }
});
module.exports = router;  