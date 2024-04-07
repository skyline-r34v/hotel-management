import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import './test.css'; // Import CSS file

function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null); // State to hold error message
  const [selectedCustomer, setSelectedCustomer] = useState(null); // State to hold selected customer for checkout
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility
  const [editedCustomer, setEditedCustomer] = useState({
    name: "",
    email: "",
    members: "",
    roomType: "",
    daysOfStay: ""
  }); // State to hold edited customer information
  const [checkoutClicked, setCheckoutClicked] = useState(false); // State to track if checkout button is clicked

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
    setCheckoutClicked(true); // Set checkout button clicked to true
    setModalOpen(true); // Open the 2nd modal for checkout
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

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setEditedCustomer(customer);
    setCheckoutClicked(false); // Reset checkout button clicked to false
    setModalOpen(true); // Open the 1st modal for editing
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:7859/customers/${selectedCustomer._id}/update`, editedCustomer);
      fetchCustomers();
      closeModal();
    } catch (error) {
      console.error('Error updating customer information:', error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCustomer(null);
    setEditedCustomer({
      name: "",
      email: "",
      members: "",
      roomType: "",
      daysOfStay: ""
    });
    setCheckoutClicked(false); // Reset checkout button clicked to false when closing modal
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
      <h1>Welcome to Taj Hotel Management System</h1>
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
              <th>Edit</th> {/* New column for edit button */}
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
                <td>
                  <button onClick={() => handleEdit(customer)}>Edit</button> {/* Button to edit customer details */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br></br>
      {/* Button to navigate to '/customer-add' page */}
      <Link to="/customer-add"><button>Add Customer</button></Link> {/* Use Link component for navigation */}
      <br></br>
      <br></br>
      {/* Button to navigate to '/customer/paid' page */}
      <Link to="/customer/paid"><button>Paid Customer List</button></Link> {/* Use Link component for navigation */}

      {/* Modal for displaying customer details */}
      {modalOpen && selectedCustomer && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span> {/* Cross button to close modal */}
            <h2>{checkoutClicked ? 'Customer Details' : 'Edit Customer Details'}</h2>
            {checkoutClicked ? (
              <div>
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
            ) : (
              <div>
                <label>Name:</label>
                <input type="text" name="name" value={editedCustomer.name} onChange={handleInputChange} /><br />
                <label>Email:</label>
                <input type="email" name="email" value={editedCustomer.email} onChange={handleInputChange} /><br />
                <label>Members:</label>
                <input type="number" name="members" value={editedCustomer.members} onChange={handleInputChange} /><br />
                <label>Room Type:</label>
                <input type="text" name="roomType" value={editedCustomer.roomType} onChange={handleInputChange} /><br />
                <label>Days of Stay:</label>
                <input type="number" name="daysOfStay" value={editedCustomer.daysOfStay} onChange={handleInputChange} /><br />
                <div className="modal-buttons">
                  <button onClick={handleSaveChanges}>Save Changes</button>
                  <button onClick={closeModal}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
