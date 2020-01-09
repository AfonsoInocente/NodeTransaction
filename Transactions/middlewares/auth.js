const jwt = require('jsonwebtoken');
const config = require('../config/config');

const auth = (req,res,next) => {
    const token_header = req.headers.auth;
    if(!token_header) return res.status(400).send({error:'Token não enviado'});

    try{
        jwt.verify(token_header,config.jwt_pass,(err,decoded) => {
            if(err) return res.status(401).send({error:'Token inválido'});
            res.locals.auth_user_id = decoded;
            return next();
        });
    }catch(e) {
        return res.status(503).send({error:'Serviço indisponivel, tente novamente mais tarde.'});
    }
}
module.exports = auth;