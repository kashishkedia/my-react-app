// Page2.js
import React, { useState } from 'react';
import ReusableForm from './ReusableForm';
import DataDisplayTable from './DataDisplayTable';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const Page2 = () => {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null); // New state to store the selected data

  const handleFormSubmit = (formData) => {
    if (selectedData) {
      // If selectedData has a value, update the existing data item
      setData((prevData) =>
        prevData.map((item) => (item.id === selectedData.id ? { ...formData, id: item.id } : item))
      );
    } else {
      // If selectedData is null, add a new data item
      setData((prevData) => [...prevData, { ...formData, id: Date.now().toString() }]);
    }
    setShowForm(false);
    setSelectedData(null); // Reset selectedData after form submission
  };

  const handleEdit = (id) => {
    const selected = data.find((item) => item.id === id);
    setSelectedData(selected);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h2>This is Page 2</h2>
      {!showForm && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setShowForm(true)}
        >
          Click Me
        </Button>
      )}
      {showForm && (
        <ReusableForm onSubmit={handleFormSubmit} initialData={selectedData} />
      )}
      {data.length > 0 && (
        <DataDisplayTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Page2;
