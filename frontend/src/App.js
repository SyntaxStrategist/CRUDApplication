import React, { useEffect, useState } from 'react';
import './index.css'; // Import your CSS file for global styles
import CreateItem from './components/CreateItem';
import ItemList from './components/ItemList';
import UpdateItem from './components/UpdateItem';

function App() {
  const [items, setItems] = useState([]);

  // Fetch items from the backend
  const fetchItems = async () => {
    const response = await fetch('https://crudapplication-y75j.onrender.com/api/items'); // Updated URL
    if (response.ok) {
      const data = await response.json();
      setItems(data);
    } else {
      console.error('Failed to fetch items:', response.statusText);
    }
  };

  useEffect(() => {
    fetchItems(); // Fetch items when the component mounts
  }, []);

  const handleItemCreated = () => {
    fetchItems(); // Refetch items after a new item is created
  };

  const handleUpdate = () => {
    fetchItems(); // Refetch items after an item is updated
  };

  const handleDelete = async (id) => {
    // Call the API to delete the item on the backend
    try {
      const response = await fetch(`https://crudapplication-y75j.onrender.com/api/items/${id}`, {
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
    <div className="App">
      <h1>CRUD App</h1>
      <CreateItem onItemCreated={handleItemCreated} fetchItems={fetchItems} />
      <ItemList items={items} onDelete={handleDelete} /> {/* Pass handleDelete to ItemList */}
      <UpdateItem items={items} onUpdate={handleUpdate} /> {/* Pass items and update function */}
    </div>
  );
}

export default App;
