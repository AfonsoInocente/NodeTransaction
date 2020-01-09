const axios = require('axios');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const MsTransactions = require('../model/msTransaction');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.get('/', async (req,res)=>{
    try {
        const admin = req.headers.admin;
        if(!admin) return res.status(403).send({error: 'Rota não permitida'});

        var filter = {};

        if(req.headers.user_id)  filter.user_id = req.headers.user_id;
        if(req.headers.payment_service)  filter.payment_service = req.headers.payment_service;

        const transaction = await MsTransactions.find(filter);
        if(Object.entries(transaction).length === 0) return res.status(404).send({error: 'Nenhuma transação encontrada'});
        return res.send(transaction);
    }catch(err){
        return res.status(500).send({error: 'Erro na consulta de transações'});
    }
});

router.get('/all',auth,async (req,res)=>{
    var customer = null;

    try{
        customer = await axios.get(`http://localhost:3001/customers/ById/${res.locals.auth_user_id.id}`,{params:{}, headers:{'admin': true}});
        if(!customer.data) return res.status(404).send({error:'Usuário não encontrado.'});
    }catch(e) {
        return res.status(404).send({error:'Usuário não encontrado'});
    }

    try{
        const transaction = await MsTransactions.find({ user_id: customer.data._id});

        if(Object.entries(transaction).length === 0) return res.status(404).send({error: 'Nenhuma transação encontrada'});
        return res.send(transaction);
    }catch(e) {
        return res.status(500).send({error:'Erro na consulta de transações'});
    }
    
});

router.post('/create',auth, async (req,res)=>{
    if(!req.body.amount) return res.status(400).send({error:'Dados insuficientes'});
    if(isNaN(req.body.amount)) return res.status(400).send({error:'Amount só aceita números'});

    try {
        const payment_services = {
            "1": 'paypal',
            "2": 'stripe'
        };
        
        let customer = await axios.get(`http://localhost:3001/customers/ById/${res.locals.auth_user_id.id}`,{params:{}, headers:{'admin': true}});
        if(!customer.data) return res.status(404).send({error:'Usuário não encontrado.'});

        var save = {
            user_id: customer.data._id,
            payment_service: payment_services[Math.floor(Math.random() * 2) + 1],
            payment_token: await bcrypt.hashSync(Math.floor(Math.random() * 500) + 100),
            amount: req.body.amount.toFixed(2)
        }

        var transaction = await MsTransactions.create(save);
        return res.status(201).send(transaction);
    }catch(err){
        return res.status(500).send({error: 'Erro ao Cadastrar Usuário'});
    }
}); 

module.exports = router;  