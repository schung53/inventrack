var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inventoryItemSchema = new Schema({
    name: String,
    trackingNumber: String,
    dateRegistered: Date
});

module.exports = mongoose.model('items', inventoryItemSchema);
