var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var InventoryItem = require('../../models/InventoryItem');
var mongoose = require('mongoose');

router.get('/', function(req, res){
    res.render('index')
});

// Route for creating a new inventory item
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

// Route for updating an existing inventory item
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

// Route for deleting an existing inventory item
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

// Route for fetching 20 of the latest registered items
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

module.exports = router;
