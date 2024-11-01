// models/Item.js

const mongoose = require('mongoose');

// Define the item schema
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the item
  description: { type: String, required: true }, // Description of the item
  price: { type: Number, required: true }, // Price of the item
});

// Export the model
module.exports = mongoose.model('Item', itemSchema);
