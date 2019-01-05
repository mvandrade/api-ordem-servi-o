'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

// Connectar no DB
mongoose.connect(config.connectionString);

// Carregar Models
const Order = require('./models/order');
const Pessoa = require('./models/pessoa');
const Product = require('./models/product');
const Usuario = require('./models/usuario');


// Carregar rotas
const indexRoute = require('./routes/index-route');
const authRoute = require('./routes/auth-route');
const orderRoute = require('./routes/order-route');
const pessoaRoute = require('./routes/pessoa-route');
const productRoute = require('./routes/product-route');
const usuarioRoute = require('./routes/usuario-route');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', indexRoute);
app.use('/authenticate', authRoute);
app.use('/orders', orderRoute);
app.use('/pessoas', pessoaRoute);
app.use('/products', productRoute);
app.use('/usuarios', usuarioRoute);


module.exports = app;