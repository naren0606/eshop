import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [address, setAddress] = useState({
    name: '',
    contactNumber: '',
    city: '',
    landmark: '',
    street: '',
    state: '',
    zipCode: '',
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage or wherever it is stored
      const response = await axios.get('http://localhost:3001/api/v1/addresses', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header with the "Bearer" scheme
        },
      });
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
    // Update the form fields with the selected address
    const selected = addresses.find((addr) => addr._id === event.target.value);
    setAddress(selected);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (selectedAddress) {
        // Use the addAddress function for updating an existing address
        await axios.post('http://localhost:3001/api/v1/addresses', address);
        console.log('Selected address submitted successfully');
      } else {
        // Use the addAddress function for adding a new address
        await axios.post('http://localhost:3001/api/v1/addresses', address);
        console.log('New address submitted successfully');
      }
      // Fetch the updated addresses after submitting
      fetchAddresses();
      // Reset the form fields
      setAddress({
        name: '',
        contactNumber: '',
        city: '',
        landmark: '',
        street: '',
        state: '',
        zipCode: '',
      });
      setSelectedAddress('');
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting address:', error);
    }
  };

  const handleAddAddressClick = () => {
    setShowForm(true);
    setSelectedAddress('');
    setAddress({
      name: '',
      contactNumber: '',
      city: '',
      landmark: '',
      street: '',
      state: '',
      zipCode: '',
    });
  };

  return (
    <div>
      {!showForm ? (
        <div>
          <TextField
            select
            label="Saved Addresses"
            value={selectedAddress}
            onChange={handleAddressChange}
          >
            <MenuItem value="">None</MenuItem>
            {addresses.map((addr) => (
              <MenuItem key={addr._id} value={addr._id}>
                {addr.name}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" onClick={handleAddAddressClick}>
            Add Address
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={address.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Contact Number"
            name="contactNumber"
            value={address.contactNumber}
            onChange={handleChange}
            required
          />
          <TextField
            label="City"
            name="city"
            value={address.city}
            onChange={handleChange}
            required
          />
          <TextField
            label="Landmark"
            name="landmark"
            value={address.landmark}
            onChange={handleChange}
          />
          <TextField
            label="Street"
            name="street"
            value={address.street}
            onChange={handleChange}
            required
          />
          <TextField
            label="State"
            name="state"
            value={address.state}
            onChange={handleChange}
            required
          />
          <TextField
            label="Zip Code"
            name="zipCode"
            value={address.zipCode}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Button variant="contained" onClick={() => setShowForm(false)}>
            Cancel
          </Button>
        </form>
      )}
    </div>
  );
};

export default Address;
