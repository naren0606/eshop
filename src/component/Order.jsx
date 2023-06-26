import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, TextField, MenuItem } from '@mui/material';

import '../Order.css';

const CreateOrderPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    phoneNo: '',
    alternateNo: '',
    mailId: '',
    country: 'India',
    address1: '',
    address2: '',
    city: '',
    landmark: '',
    state: 'Arunachal Pradesh',
    pincode: '',
  });

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Product 1',
      price: 999,
      quantity: 2,
    },
    {
      id: 2,
      title: 'Product 2',
      price: 459,
      quantity: 1,
    },
  ]);

  const handleQuantityChange = (itemId, quantity) => {
    // Update the quantity of the specified item in the cart
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: quantity };
      }
      return item;
    });
    // Update the cart items state
    setCartItems(updatedCartItems);
  };
  
  const [totalCartValue, setTotalCartValue] = useState(0);
  useEffect(() => {
    const calculateTotalCartValue = () => {
      let total = 0;
      for (const item of cartItems) {
        total += item.price * item.quantity;
      }
      setTotalCartValue(total);
    };
  
    calculateTotalCartValue();
  }, [cartItems]);
  
  const getTotalCartValue = () => {
    let total = 0;
    for (const item of cartItems) {
      total += item.price * item.quantity;
    }
    return total.toFixed(0); // Round off to 0 decimal places
  };

  const steps = ['Shipping Details', 'Confirm Order'];

  const handleNext = () => {
    if (activeStep === 0) {
      // Validate the address fields
      if (
        !address.firstName ||
        !address.lastName ||
        !address.phoneNo ||
        !address.alternateNo ||
        !address.mailId ||
        !address.address1 ||
        !address.country ||
        !address.city ||
        !address.state ||
        !address.pincode
      ) 
      {
        alert('Please fill in all the mandatory fields.');
        return;
      }
      // Validate phone no
      if (address.phoneNo.length !== 10 || !/^\d+$/.test(address.phoneNo)) {
        alert('Phone number should contain exactly 10 numeric digits.');
        return;
      }

      // Validate alternate number
      if (address.alternateNo.length !== 10 ||
        !/^\d+$/.test(address.alternateNo)
      ) {
        alert('Alternate number should contain exactly 10 numeric digits.');
        return;
      }

      // Validate pincode
      if (address.pincode.length !== 6) {
        alert('Pincode should have exactly 6 digits.');
        return;
      }

      if (!/^\d+$/.test(address.pincode)) {
        alert('Pincode should contain only numeric digits.');
        return;
      }
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleConfirmOrder = () => {
    // Perform actions to create the order and add the address
    // You can make API calls to /orders and /addresses endpoints

    // Display confirmation message
    setCartItems([
      {
        id: 1,
        title: 'Product 1',
        price: 999,
        quantity: 2,
      },
      {
        id: 2,
        title: 'Product 2',
        price: 459,
        quantity: 1,
      },
    ]);

    // Update the cart items, address, and personal details
    // You can replace the dummy data above with the actual data received from API

    alert("Your order have been submitted");
  };

  const handleChange = (field, value) => {
    if (activeStep === 0) {
      setAddress((prevaddress) => ({
        ...prevaddress,
        [field]: value,
      }));
    }
  };



  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel className='stepper'>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <div style={{ padding: '20px' }}>
          <Typography variant="h5">Shipping Details</Typography>
          <hr className='divider'/>
          <Typography variant="h6" fontSize='20px'>Personal Details</Typography>
          <div>
          <TextField
            label="First Name"
            value={address.firstName}
            placeholder="John"
            className='input'
            onChange={(e) => handleChange('firstName', e.target.value)}
            required
          />
              
            <TextField
            label="Last Name"
            value={address.lastName}
            placeholder="Jackson"
            className='input'
            onChange={(e) => handleChange('lastName', e.target.value)}
            required
          />
           <TextField
            label="Mail ID"
            value={address.mailId}
            placeholder="E.g: name@domain.com"
            className='input'
            onChange={(e) => handleChange('mailId', e.target.value)}
            required
          />
          <TextField
            label="Mobile No."
            value={address.phoneNo}
            placeholder="+91 XXXXXXXXXX"
            className='input'
            onChange={(e) => handleChange('phoneNo', e.target.value)}
            required
            inputProps={{ pattern: '[0-9]*' }}
          />
          <TextField
            label="Alternate No."
            value={address.alternateNo}
            placeholder="+91 XXXXXXXXXX"
            className='input'
            onChange={(e) => handleChange('alternateNo', e.target.value)}
            required
            inputProps={{ pattern: '[0-9]*' }}
          />
         

          </div>
          <hr className='divider'/>
          <Typography variant="h6" fontSize='20px'>Shipping Address</Typography>
          <div>
          <TextField
            select
            label="Country"
            value={address.country}
            className='input'
            onChange={(e) => handleChange('country', e.target.value)}
            required
          >
            <MenuItem value="India">India</MenuItem>
          </TextField>
          <TextField
            label="Flat, House No., Building, Company, Apartment"
            value={address.address1}
            className='input'
            onChange={(e) => handleChange('address1', e.target.value)}
            required
          />
          <TextField
            label="Area, Street, Sector, Village"
            value={address.address2}
            className='input'
            onChange={(e) => handleChange('address2', e.target.value)}
          />
           <TextField
            label="Landmark"
            value={address.landmark}
            className='input'
            onChange={(e) => handleChange('landmark', e.target.value)}
            required
          />
          <TextField
            label="Town/City"
            value={address.city}
            placeholder="E.g: Mumbai"
            className='input'
            onChange={(e) => handleChange('city', e.target.value)}
            required
          />
          <TextField
            select
            label="State"
            value={address.state}
            className='input'
            onChange={(e) => handleChange('state', e.target.value)}
            required
          >
            <MenuItem value="Andhra Pradesh" className='input'>Andhra Pradesh</MenuItem>
            <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
            <MenuItem value="Assam">Assam</MenuItem>
            <MenuItem value="Bihar">Bihar</MenuItem>
            <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
            <MenuItem value="Goa">Goa</MenuItem>
            <MenuItem value="Gujarat">Gujarat</MenuItem>
            <MenuItem value="Haryana ">Haryana </MenuItem>
            <MenuItem value="Himachal Pradesh">Himachal Pradesh</MenuItem>
            <MenuItem value="Jharkhand">Jharkhand</MenuItem>
            <MenuItem value="Karnataka">Karnataka</MenuItem>
            <MenuItem value="Kerala">Kerala</MenuItem>
            <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
            <MenuItem value="Maharashtra">Maharashtra</MenuItem>
            <MenuItem value="Sikkim">Sikkim</MenuItem>
            <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
            <MenuItem value="Telangana">Telangana</MenuItem>
            <MenuItem value="Tripura">Tripura</MenuItem>
            <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
            <MenuItem value="West Bengal">West Bengal</MenuItem>
            <MenuItem value="UT : Chandigarh">UT : Chandigarh</MenuItem>
            <MenuItem value="UT: Dadra and Nagar Haveli and Daman & Diu">
              UT: Dadra and Nagar Haveli and Daman & Diu
            </MenuItem>
            <MenuItem value="UT: Delhi">UT: Delhi</MenuItem>
            <MenuItem value="UT : Puducherry">UT : Puducherry</MenuItem>
          </TextField>

          <TextField
            label="Pincode"
            value={address.pincode}
            className='input'
            onChange={(e) => handleChange('pincode', e.target.value)}
            required
          />
          </div>
        </div>
      )}

      {activeStep === 1 && (
        <div style={{ padding: '20px' }}>
          <Typography variant="h6">Confirm Order</Typography>
          <Typography variant="body1">Please review your order details.</Typography>
          <div>
            <hr className='divider'/>

          <Typography variant="subtitle1">Cart Items:</Typography>
      {cartItems.map((item) => (
        <div key={item.id }>
          <img src='../electronics.jpg' alt={item.title} />
          <Typography>{item.title}</Typography>
          <Typography>Price: {item.price}</Typography>
          <Typography>Quantity:</Typography>
          <TextField
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
            inputProps={{ min: 1 }} // Optionally set a minimum value for the quantity
          />
        </div>
      ))}
<Typography>Total Cart Value:</Typography>
<Typography>{getTotalCartValue()}</Typography>


          </div>
          <div>
            <Typography variant="subtitle1">Shipping Address:</Typography>
            <Typography>
              Name :{address.firstName} {address.lastName}
            </Typography>
            <Typography>Address 1 :{address.address1}</Typography>
            <Typography>Address 2 :{address.address2}</Typography>
            <Typography>Landmark :{address.landmark}</Typography>
            <Typography>City :{address.city}</Typography>
            <Typography>State :{address.state}</Typography>
            <Typography>Pincode :{address.pincode}</Typography>
          </div>
        </div>
      )}

      <div>
        {activeStep !== 1 && (
          <Button variant="contained" color="primary" className='save-btn' onClick={handleNext}>
            Save Details
          </Button>
        )}
        {activeStep === 1 && (
          <Button variant="contained" color="primary" className='save-btn'  onClick={handleConfirmOrder}>
            Confirm Order
          </Button>
        )}
        {activeStep !== 0 && (
          <Button variant="contained" color="secondary"  className='save-btn' onClick={handleBack}>
            Back
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateOrderPage;
