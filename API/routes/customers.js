const axios = require('axios');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//Criar Usuário
router.post('/create', async (req,res)=>{
    try {
        let customer = await axios.post(`http://localhost:3001/customers/create`,{
                ...req.body
            }
        );
        return res.status(201).send({...customer.data});
    }catch(err){
        return res.status(err.response.status).send({...err.response.data});
    }
});

//Autenticar Usuário
router.post('/auth', async (req,res)=>{
    try {
        let customer = await axios.post(`http://localhost:3001/customers/auth`,{
                ...req.body
            }
        );
        return res.status(200).send({...customer.data});
    }catch(err){
        return res.status(err.response.status).send({...err.response.data});
    }
});

module.exports = router;  