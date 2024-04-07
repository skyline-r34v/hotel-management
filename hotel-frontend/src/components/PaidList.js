import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './test.css';

function PaidCustomersTable() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:7859/customers-paid');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching paid customers:', error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (customerId) => {
    try {
      await axios.delete(`http://localhost:7859/customers/${customerId}`);
      setCustomers(customers.filter(customer => customer._id !== customerId));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const redirectToDashboard = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div class="paid">
      <h2>Paid Customers</h2>
      <button onClick={redirectToDashboard}>Go back to dashboard</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Members</th>
            <th>Room Type</th>
            <th>Days of Stay</th>
            <th>Total Amount</th>
            <th>Action</th> {/* New column for delete button */}
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer._id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.members}</td>
              <td>{customer.roomType}</td>
              <td>{customer.daysOfStay}</td>
              <td>{customer.total_amt}</td>
              <td>
                <button onClick={() => handleDelete(customer._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaidCustomersTable;
