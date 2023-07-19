import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';

const Page1 = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/users');
      const data = await response.json();

      if (Array.isArray(data)) {
        setUsers(data);
      } else if (typeof data === 'object' && data !== null) {
        // If the data is an object, convert it to an array with one item.
        setUsers([data]);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const columns = [
    { Header: 'Name', accessor: 'firstname' }, // Update accessor to 'firstname'
    { Header: 'Last Name', accessor: 'lastname' }, // Add accessor for 'lastname'
    { Header: 'Username', accessor: 'username' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Phone', accessor: 'phone' },
    { Header: 'Website', accessor: 'website' },
  ];

  return (
    <div>
      <h2>This is Page 1</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={users.map((user) => ({ ...user, id: user.id.toString() }))} />
      )}
    </div>
  );
};

export default Page1;
