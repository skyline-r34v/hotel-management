// AddCustomerForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './form.css'

function AddCustomerForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    members: '',
    roomType: '',
    daysOfStay: '',
    status: 'pending' // Set default status to 'pending'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7859/customers/add', formData);
      // Redirect to the dashboard after adding the customer
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  return (
    <div className="add-customer-form">
      <h1>Add Customer</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        <label>Members:</label>
        <input type="number" name="members" value={formData.members} onChange={handleChange} required />
        <label>Room Type:</label>
        <select name="roomType" value={formData.roomType} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Suite">Suite</option>
          {/* Add more options as needed */}
        </select>
        <label>Days of Stay:</label>
        <input type="text" name="daysOfStay" value={formData.daysOfStay} onChange={handleChange} required />
        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange} required>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddCustomerForm;