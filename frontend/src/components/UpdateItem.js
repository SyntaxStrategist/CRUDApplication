import React, { useState, useEffect } from 'react';

function UpdateItem({ items, onUpdate }) {
  const [selectedItemId, setSelectedItemId] = useState('');
  const [itemDetails, setItemDetails] = useState({ name: '', description: '', price: '' });
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  useEffect(() => {
    if (selectedItemId) {
      const item = items.find(item => item._id === selectedItemId);
      if (item) {
        setItemDetails({ name: item.name, description: item.description, price: item.price });
      }
    }
  }, [selectedItemId, items]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5001/api/items/${selectedItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemDetails),
      });

      if (response.ok) {
        console.log('Item updated successfully');
        setSuccessMessage('Item updated successfully!'); // Set the success message
        onUpdate(); // Call the function to refresh the item list
      } else {
        console.error('Failed to update item:', response.statusText);
        setSuccessMessage('Failed to update item.'); // Set failure message
      }
    } catch (error) {
      console.error('Error updating item:', error);
      setSuccessMessage('Error updating item.'); // Set error message
    }
  };

  return (
    <div>
      <h2>Update Item</h2>
      <select value={selectedItemId} onChange={(e) => setSelectedItemId(e.target.value)}>
        <option value="">Select an item to update</option>
        {items.map(item => (
          <option key={item._id} value={item._id}>{item.name}</option>
        ))}
      </select>
      {selectedItemId && (
        <form onSubmit={handleUpdate}>
          <label>
            Name:
            <input 
              type="text" 
              value={itemDetails.name} 
              onChange={(e) => setItemDetails({ ...itemDetails, name: e.target.value })} 
              required 
            />
          </label>
          <br />
          <label>
            Description:
            <input 
              type="text" 
              value={itemDetails.description} 
              onChange={(e) => setItemDetails({ ...itemDetails, description: e.target.value })} 
              required 
            />
          </label>
          <br />
          <label>
            Price:
            <input 
              type="number" 
              value={itemDetails.price} 
              onChange={(e) => setItemDetails({ ...itemDetails, price: e.target.value })} 
              required 
            />
          </label>
          <br />
          <button type="submit">Update Item</button>
        </form>
      )}
      {successMessage && <p>{successMessage}</p>} {/* Display success message */}
    </div>
  );
}

export default UpdateItem;
