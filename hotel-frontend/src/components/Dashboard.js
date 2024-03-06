import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import './test.css'; // Import CSS file

function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null); // State to hold error message
  const [selectedCustomer, setSelectedCustomer] = useState(null); // State to hold selected customer for checkout
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:7859/customers');
      setCustomers(response.data);
    } catch (error) {
      // If there's an error fetching customers, set the error state
      setError('Error fetching customers. Please try again later.');
      console.error('Error fetching customers:', error);
    }
  };

  const handleCheckout = async (customerId) => {
    const selected = customers.find(customer => customer._id === customerId);
    await calculateTotalAmt(selected._id); // Calculate total amount before opening modal
    setSelectedCustomer(selected);
    setModalOpen(true);
  };

  const checkPrice = async (customerId) => {
    try {
      const response = await axios.put(`http://localhost:7859/customers/${customerId}/calculate-total`);
      const totalAmt = response.data.totalAmt;
      // Update the UI to display the calculated total amount
      alert(`Total amount for customer: ${totalAmt}`);
    } catch (error) {
      console.error('Error checking price:', error);
    }
  };


  const closeModal = () => {
    setModalOpen(false);
    setSelectedCustomer(null);
  };

  const confirmCheckout = async () => {
    try {
      await axios.put(`http://localhost:7859/customers/${selectedCustomer._id}/update-status`);
      console.log('Checkout confirmed');
      closeModal(); // Close the modal after checkout confirmation
    } catch (error) {
      console.error('Error confirming checkout:', error);
    }
  };

  const calculateTotalAmt = async (customerId) => {
    try {
      await axios.put(`http://localhost:7859/customers/${customerId}/calculate-total`);
      // After calculating total amount, fetch the updated customer details
      fetchCustomers();
    } catch (error) {
      console.error('Error calculating total amount:', error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Welcome to Hotel Management System</h1>
      {error && <p className="error">{error}</p>} {/* Display error message if there's an error */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Members</th>
              <th>Room Type</th>
              <th>Days of Stay</th>
              <th>Check Price</th> {/* New column for price check button */}
              <th>Action</th> {/* New column for checkout button */}
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.members}</td>
                <td>{customer.roomType}</td>
                <td>{customer.daysOfStay}</td>
                <td>
                  <button onClick={() => checkPrice(customer._id)}>Check Price</button>
                </td>
                <td>
                  <button onClick={() => handleCheckout(customer._id)}>Checkout</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Button to navigate to '/customer-add' page */}
      <Link to="/customer-add"><button>Add Customer</button></Link> {/* Use Link component for navigation */}

      {/* Button to navigate to '/customer/paid' page */}
      <Link to="/customer/paid"><button>Paid Customer List</button></Link> {/* Use Link component for navigation */}

      {/* Modal for displaying customer details */}
      {modalOpen && selectedCustomer && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span> {/* Cross button to close modal */}
            <h2>Customer Details</h2>
            <p><strong>Name:</strong> {selectedCustomer.name}</p>
            <p><strong>Email:</strong> {selectedCustomer.email}</p>
            <p><strong>Members:</strong> {selectedCustomer.members}</p>
            <p><strong>Room Type:</strong> {selectedCustomer.roomType}</p>
            <p><strong>Days of Stay:</strong> {selectedCustomer.daysOfStay}</p>
            <p><strong>Amount:</strong> {selectedCustomer.total_amt}</p>
            <div className="modal-buttons">
              <button onClick={closeModal}>Close</button> {/* Button to close the modal */}
              <button onClick={confirmCheckout}>Confirm Checkout</button> {/* Button to confirm checkout */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;