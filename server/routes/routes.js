var express = require('express');
var router = express.Router();
require('body-parser');
var InventoryItem = require('../../models/InventoryItem');
var mongoose = require('mongoose');
var AWS = require('aws-sdk');
var multer = require("multer")
var upload = multer({ dest: 'public/uploads' });
var fs =  require('fs');

router.get('/', function(req, res){
    res.render('index')
});

// Endpoint for creating a new inventory item
router.route('/create')
.post((req,res) => {
    var inventoryItem = new InventoryItem();
    inventoryItem.name = req.body.name;
    inventoryItem.trackingNumber = req.body.trackingNumber;
    inventoryItem.dateRegistered = req.body.dateRegistered;

    inventoryItem.save((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'Inventory item successfully added.', newDocument: result });
        }
    })
});

// Endpoint for updating an existing inventory item
router.route('/update')
.post((req,res) => {
    const doc = {
        name: req.body.name,
        trackingNumber: req.body.trackingNumber,
        dateRegistered: req.body.dateRegistered
    };
    var id = mongoose.Types.ObjectId(req.body._id);

    InventoryItem.findByIdAndUpdate(id, { $set: doc }, { new: true }, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'Inventory item successfully updated.', newDocument: result });
        }
    });
});

// Endpoint for deleting an existing inventory item
router.get('/delete', (req,res) => {
    var id = mongoose.Types.ObjectId(req.query.id);

    InventoryItem
    .findByIdAndRemove(id, (err) => {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'Inventory item successfully deleted.', _id: id });
        }
    });
});

// Endpoint for fetching 20 of the latest registered items
router.get('/fetchInitial', (req,res) => {
    InventoryItem
    .find()
    .sort({'dateRegistered': -1})
    .limit(20)
    .exec((err, items) => {
        if (err) {
            res.send(err);
        } else {
            res.json(items);
        }
    });
});

// Initialize S3 service object
var s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: process.env.BUCKET_NAME }
});

// Endpoint for uploading an image to S3 bucket
router.route('/image')
.post(upload.single('file'), (req,res) => {
    fs.readFile(req.file.path, (err, fileBuffer) => {
        var randomString = Math.random().toString(36).slice(2);

        var params = {
            Bucket: process.env.BUCKET_NAME,
            Key: randomString + "-" + req.file.originalname,
            Body: fileBuffer
        };

        var promise = s3.putObject(params).promise();

        promise.then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err.message);
        })
    });
});

// Endpoint for uploading an image received as a Blob to S3
router.route('/blob')
.post(upload.single('file'), (req,res) => {
    var randomString = Math.random().toString(36).slice(2);
    var fileToUpload = new File([req.file], 'eqs.png')
    var fileContent = fs.readFileSync(fileToUpload);
    console.log(fileContent)

    var params = {
        Bucket: process.env.BUCKET_NAME,
        Key: randomString+".png",
        Body: fileContent
    };

    var promise = s3.putObject(params).promise();

    promise.then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err.message);
    })
});

module.exports = router;
