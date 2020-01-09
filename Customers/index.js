const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');

const url = config.bd_string;
const options = {poolSize: 5, useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => console.log('Erro na Conexão com o Banco de Dados: ' + err));
mongoose.connection.on('disconnect', () => console.log('A Conexão com o Banco de Dados foi Desconectada.'));
// mongoose.connection.on('connected', (err) => console.log('Aplicação Conectada ao Banco de Dados'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const customersRoute = require('./routes/customers');
app.use('/customers',customersRoute);

app.listen(config.port).listen
module.exports = app;