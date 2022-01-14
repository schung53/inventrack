var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inventoryItemSchema = new Schema({
    name: String,
    trackingNumber: String,
    dateRegistered: Date,
    imageURL: String,
    thumbnailURL: String 
});

module.exports = mongoose.model('items', inventoryItemSchema);
