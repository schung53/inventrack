var express = require('express');
var router = require('./routes/routes.js');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('dotenv').config();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

mongoose.connect(
    `mongodb+srv://schung53:${process.env.MONGODB_PW}@shopify-be-challenge.crngp.mongodb.net/inventory?retryWrites=true&w=majority`
);

app.use('/', router);

module.exports=app;
