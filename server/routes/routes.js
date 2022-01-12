var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var InventoryItem = require('../../models/InventoryItem');

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

    InventoryItem.updateOne({_id: req.body._id}, doc, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'Inventory item successfully updated.', newDocument: result });
        }
    });
});

// Route for deleting an existing inventory item
router.get('/delete', (req,res) => {
    var id = req.query.id;
    InventoryItem
    .find({_id: id})
    .remove()
    .exec((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send('Inventory item successfully deleted.');
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
