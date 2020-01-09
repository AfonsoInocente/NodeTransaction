const axios = require('axios');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//Criar Transação
router.post('/create', async (req,res)=>{
    try {
        let transaction = await axios.post(`http://localhost:3002/transactions/create`,{
                ...req.body
            },{params:{}, headers:{...req.headers}}
        );
        return res.status(201).send({...transaction.data});
    }catch(err){
        return res.status(err.response.status).send({...err.response.data});
    }
});

//Buscar Todas As Transações do Usuário
router.get('/', async (req,res)=>{
    try {
        let transaction = await axios.get(`http://localhost:3002/transactions/all`,
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