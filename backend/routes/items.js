const express = require('express');
const router = express.Router();
const Item = require('../models/Item'); // Ensure this path is correct

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find(); // Fetch all items from the database
    res.status(200).json(items); // Send the items as a response
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create a new item
router.post('/', async (req, res) => {
  console.log('Received item data:', req.body); // Log the incoming data
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE route for removing an item
router.delete('/:id', async (req, res) => {
  const { id } = req.params; // Get the item ID from the request parameters
  try {
    const deletedItem = await Item.findByIdAndDelete(id); // Attempt to delete the item
    if (!deletedItem) {
      return res.status(404).send('Item not found'); // Handle item not found
    }
    res.json({ message: 'Item deleted successfully' }); // Send confirmation message
  } catch (error) {
    console.error('Error deleting item:', error); // Log the error for debugging
    res.status(500).send('Server error'); // Send server error response
  }
});

module.exports = router; // Export the router to be used in index.js
