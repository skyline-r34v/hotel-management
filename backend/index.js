const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define schema for customers
const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  members: Number,
  roomType: String,
  daysOfStay: Number,
  status: {
    type: String,
    default: 'pending'
  },
  total_amt: {
    type: Number,
    default: 0.0
  }
});

// Define model for the "customer" collection in the "hotel" database
const Customer = mongoose.model('Customer', customerSchema, 'customer');

// Route to fetch all customers with status "pending"
app.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.find({ status: 'pending' });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to fetch details of a specific customer
app.get('/customers/:id', async (req, res) => {
  const customerId = req.params.id;
  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to add a customer
app.post('/customers/add', async (req, res) => {
  try {
    const { name, email, members, roomType, daysOfStay, status } = req.body;
    const newCustomer = new Customer({ name, email, members, roomType, daysOfStay, status });
    await newCustomer.save();
    res.status(201).json({ message: 'Customer added successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to calculate and update total amount for a specific customer
app.put('/customers/:id/calculate-total', async (req, res) => {
  const customerId = req.params.id;
  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Calculate total amount based on room rate and number of days of stay
    let roomRate;
    switch (customer.roomType) {
      case 'Single':
        roomRate = 100;
        break;
      case 'Double':
        roomRate = 150;
        break;
      case 'Suite':
        roomRate = 200;
        break;
      default:
        roomRate = 100; // Default room rate
    }

    const totalAmt = roomRate * customer.daysOfStay * customer.members;

    // Update the total_amt field of the customer document
    customer.total_amt = totalAmt;
    await customer.save();

    res.json({ message: 'Total amount calculated and updated successfully', totalAmt });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to update customer details
app.put('/customers/:id/update', async (req, res) => {
  const customerId = req.params.id;
  try {
    const { name, email, members, roomType, daysOfStay } = req.body;
    const updatedCustomer = await Customer.findByIdAndUpdate(customerId, { name, email, members, roomType, daysOfStay }, { new: true });
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json({ message: 'Customer details updated successfully', updatedCustomer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to update status from pending to paid
app.put('/customers/:id/update-status', async (req, res) => {
  const customerId = req.params.id;
  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Update status to "paid"
    customer.status = 'paid';
    await customer.save();

    res.json({ message: 'Status updated successfully', customer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to fetch all customers with status "paid"
app.get('/customers-paid', async (req, res) => {
  try {
    const customers = await Customer.find({ status: 'paid' });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to delete a customer
app.delete('/customers/:id', async (req, res) => {
  const customerId = req.params.id;
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(customerId);
    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.listen(PORT, () => console.log(`Server started at ${PORT}`));