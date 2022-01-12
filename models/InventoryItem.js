var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inventoryItemSchema = new Schema({
    name: String,
    uuid: String,
    dateRegistered: Date
});

module.exports = mongoose.model('Expense', inventoryItemSchema);
