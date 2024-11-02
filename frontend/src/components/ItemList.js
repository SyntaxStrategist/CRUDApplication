import React, { useEffect, useState } from 'react';

function ItemList() {
  const [items, setItems] = useState([]);

  // Fetch items when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('https://crudapplication-y75j.onrender.com/api/items'); // Update the URL to your deployed backend
        if (response.ok) {
          const data = await response.json();
          setItems(data);
        } else {
          console.error('Failed to fetch items:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []); // Empty dependency array means this runs once on mount

  // Function to handle item deletion with confirmation
  const handleDelete = async (id) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (!confirmDelete) return; // Exit if the user cancels

    try {
      const response = await fetch(`https://crudapplication-y75j.onrender.com/api/items/${id}`, { // Update the URL to your deployed backend
        method: 'DELETE',
      });

      if (response.ok) {
        setItems(items.filter(item => item._id !== id)); // Update state to remove deleted item
        console.log('Item deleted successfully');
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
