import React, { useState } from 'react';

function CreateItem({ onItemCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = { name, description, price: parseFloat(price) };
    console.log('Form submitted:', newItem);

    try {
      const response = await fetch('http://localhost:5001/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        console.log('Item created successfully');
        setName('');
        setDescription('');
        setPrice('');
        setSuccessMessage('Item created successfully!'); // Set success message
        setErrorMessage(''); // Clear any previous error messages
        onItemCreated(); // Notify parent to refetch items

        // Clear the success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error('Failed to create item:', errorData.message);
        setErrorMessage(errorData.message || 'Failed to create item');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      setErrorMessage('Error during fetch: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Create Item</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Display success message */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <br />
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <br />
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Create Item</button>
      </form>
    </div>
  );
}

export default CreateItem;
