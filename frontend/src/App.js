import React, { useEffect, useState } from 'react';
import './index.css'; // Import your CSS file for global styles
import CreateItem from './components/CreateItem';
import ItemList from './components/ItemList';
import UpdateItem from './components/UpdateItem';

function App() {
  const [items, setItems] = useState([]);

  // Fetch items from the backend
  const fetchItems = async () => {
    const response = await fetch('http://localhost:5001/api/items');
    if (response.ok) {
      const data = await response.json();
      setItems(data);
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

  return (
    <div className="App">
      <h1>CRUD App</h1>
      <CreateItem onItemCreated={handleItemCreated} />
      <ItemList items={items} />
      <UpdateItem items={items} onUpdate={handleUpdate} /> {/* Pass items and update function */}
    </div>
  );
}

export default App;
