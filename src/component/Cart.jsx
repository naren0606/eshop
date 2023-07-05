import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import '../Cart.css';

const Cart = ({ cart, onUpdateQuantity, onDeleteItem }) => {
  // Merge products with the same name and sum their quantities
  const mergedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  const calculateTotalCartValue = () => {
    let total = 0;
    for (const item of mergedCart) {
      total += item.price * item.quantity;
    }
    return total.toFixed(2);
  };

  const handleQuantityChange = (itemId, event) => {
    const quantity = parseInt(event.target.value, 10);
    onUpdateQuantity(itemId, quantity);
  };

  return (
    <div className='main'>
      {mergedCart.map((item) => (
        <Card className="cart-card" key={item.id}>
          <CardMedia className="cart-image" image={item.image} title={item.name} />
          <CardContent className='card-content'>
            <Typography variant="h6" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: ₹{item.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Quantity:
              <input
                type="number"
                value={item.quantity}
                onChange={(event) => handleQuantityChange(item.id, event)}
                min={1}
              />
            </Typography>
            <Typography variant="body2" color="black" align="right">
              Sub-total: ₹{(item.price * item.quantity).toFixed(2)}
            </Typography>
            <div className="cart-actions">
              <DeleteIcon onClick={() => onDeleteItem(item.id)} style={{marginRight:'5px', scale:'0.85'}}/> Remove from cart
            </div>
          </CardContent>
        </Card>
      ))}
      <hr/>
      <h3 style={{ margin: '20px 35px' }}>Total Cart Value: ₹ {calculateTotalCartValue()}</h3>
    </div>
  );
};

export default Cart;
