const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const Customers = require('../model/msCustomer');
const config = require('../config/config');

//FUNÇÕES AUXILIARES
const createCustomerToken = (customerId) => {
    return jwt.sign({id:customerId},config.jwt_pass,{expiresIn:config.jwt_expires});
}

router.get('/ById/:id', async (req,res) => {
    const admin = req.headers.admin;
    if(!admin) return res.status(403).send({error: 'Rota não permitida'});
    
    try {
        const customer = await Customers.findOne({_id:req.params.id});
        if(Object.entries(customer).length === 0) return res.status(404).send({error: 'Nenhum cliente encontrado'});
        return res.status(200).send(customer);
    }catch(err){
        return res.status(500).send({error: 'Erro na consulta de clientes'});
    }
});

router.get('/', async (req,res) => {
    const admin = req.headers.admin;
    if(!admin) return res.status(403).send({error: 'Rota não permitida'});

    try {
        const customer = await Customers.find({});
        if(Object.entries(customer).length === 0) return res.status(404).send({error: 'Nenhum cliente encontrado'});
        return res.send(customer);
    }catch(err){
        return res.status(500).send({error: 'Erro na consulta de clientes'});
    }
});

router.post('/create', async (req,res) => {
    const {full_name, email, password} = req.body;
    if(!full_name || !email || !password) return res.status(400).send({error:'Dados insuficientes'});
    
    try {
        if(await Customers.findOne({email})) return res.status(400).send({error: 'Cliente já cadastrado'});
        var customer = await Customers.create(req.body);
        customer.password = undefined;
        return res.send({customer, token: createCustomerToken(customer.id)});
    }catch(err){
        return res.status(500).send({error: 'Erro ao cadastrar cliente'})
    }
}); 

router.post('/auth', async (req,res) => {
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).send({error:'Dados insuficientes'});

    try{
        const customer = await Customers.findOne({email}).select('+password');
        if(!customer) return res.status(400).send({ error: 'Cliente não encontrado'})

        const pass_ok = await bcrypt.compareSync(password.toString(),customer.password);
        if(!pass_ok) return res.status(401).send({ error: 'Erro ao autenticar cliente'});

        customer.password = undefined;
        return res.send({customer, token: createCustomerToken(customer.id)});
    }catch(err){
        return res.status(500).send({error: 'Erro ao buscar cliente'});
    }
});

module.exports = router;  