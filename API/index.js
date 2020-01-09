const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config/config');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const transactionsRoute = require('./routes/transactions');
app.use('/transactions',transactionsRoute);

const customersRoute = require('./routes/customers');
app.use('/customers',customersRoute);

const adminRoute = require('./routes/admin');
app.use('/admin',adminRoute);

app.listen(config.port).listen
module.exports = app;