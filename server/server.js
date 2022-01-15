var express = require('express');
var router = require('./routes/routes.js');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
require('dotenv').config();
var AWS = require("aws-sdk");

app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));

// To parse multipart/form-data
app.use(express.static('public'));

mongoose.connect(
    `mongodb+srv://schung53:${process.env.MONGODB_PW}@shopify-be-challenge.crngp.mongodb.net/inventory?retryWrites=true&w=majority`
);

app.use('/', router);

AWS.config.update({
  region: process.env.BUCKET_REGION,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.IDENTITY_POOL_ID
  })
});

const port = process.env.PORT || 3000;
app.listen(port);
