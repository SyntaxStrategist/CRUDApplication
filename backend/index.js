const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import the Item model
const Item = require('./models/Item'); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Import item routes
const itemRoutes = require('./routes/items'); // Ensure this path is correct

// Use item routes
app.use('/api/items', itemRoutes); // This line ensures the routes work

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// PUT route for updating an item
app.put('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;

  try {
    const result = await Item.findByIdAndUpdate(id, updatedItem, { new: true });
    if (!result) {
      console.error('Item not found with ID:', id); // Log if item not found
      return res.status(404).send('Item not found'); // Handle item not found
    }
    res.json(result); // Send back the updated item
  } catch (error) {
    console.error('Error updating item:', error); // Log the error for debugging
    res.status(500).send('Server error');
  }
});

// DELETE route for deleting an item
app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Item.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send('Item not found'); // Handle item not found
    }
    res.sendStatus(204); // Send no content status for successful deletion
  } catch (error) {
    console.error('Error deleting item:', error); // Log the error for debugging
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Corrected line
});

