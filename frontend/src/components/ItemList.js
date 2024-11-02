import React, { useEffect, useState } from 'react';

function ItemList({ items, onDelete }) { // Accept items as a prop
  // Fetch items when the component mounts
  useEffect(() => {
    // No need to fetch items here since they are passed as props
  }, []); // Empty dependency array means this runs once on mount

  // Function to handle item deletion with confirmation
  const handleDelete = async (id) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (!confirmDelete) return; // Exit if the user cancels

    try {
      const response = await fetch(`https://crudapplication-y75j.onrender.com/api/items/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Item deleted successfully');
        if (onDelete) {
          onDelete(id); // Notify parent with the id of the deleted item
        }
      } else {
        console.error('Failed to delete item:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <h2>Item List</h2>
      {items.length === 0 ? (
        <p>No items available.</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item._id}>
              <strong>{item.name}</strong>: {item.description} - ${item.price}
              <button
                onClick={() => handleDelete(item._id)}
                style={{
                  marginLeft: '10px',
                  backgroundColor: '#e74c3c', // Red background for delete button
                  color: '#fff', // White text color
                  border: 'none', // No border
                  borderRadius: '5px', // Rounded corners
                  cursor: 'pointer', // Pointer cursor on hover
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemList;
