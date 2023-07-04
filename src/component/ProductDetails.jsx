import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useNavigate} from "react-router-dom"


import productData from './productData';
import '../ProductDetails.css';

const ProductDetails = ({ addToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    // Fetch the product details based on the productId
    const productDetails = getProductDetails(productId);
    setProduct(productDetails);
  }, [productId]);

  const handleAddToCart = () => {
    const productDetails = {
      id: productId,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: quantity,
    };
    addToCart(productDetails);
    alert('Your order is confirmed.');
  };

  const getProductDetails = (productId) => {
    // Find the product details from the product data using the productId
    return productData.find((product) => product.id === Number(productId));
  };

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  

  return (
    <div className="product-detail-container" style={{ overflowY: 'auto' }}>
      <Grid container spacing={2} className="product-grid">
        <Grid item xs={9} md={10} className="left-side">
          <Card className="images">
            <div className="image-gallery">
              <img src={product.image} alt="{product.name}" width="100%" className="selected-image" />
            </div>
          </Card>
        </Grid>
        <Grid item xs={6} md={7}>
          <Grid container spacing={2} className="row-container">
            <Grid item xs={8} className="middle-side">
              <Card style={{ height: '510px' }}>
                <Box sx={{ p: 2 }}>
                  <h3 style={{ fontSize: '30px' }}>{product.name}</h3>
                  <hr className="divider" />
                  <h6 style={{ fontSize: '15px', marginBottom: '5px' }}>Product price:</h6>
                  <span className="price">
                    <span className="rupees-symbol">₹</span>
                    <h4>{product.price}</h4>
                  </span>
                  <div className="product-description">
                    <h6 style={{ fontSize: '15px', marginBottom: '5px' }}>Product Description:</h6>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste animi quisquam iure cupiditate veritatis repudiandae blanditiis? Nulla eum quae distinctio quam rem dolores atque, ducimus, a illo earum consequatur eos?</p>
                  </div>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={4} className="right-side">
              <Card>
                <div className="addTocart">Add to cart</div>
                <Box sx={{ p: 2 }}>
                    <div className="quantity-input">
                      <h6 style={{ fontSize: '15px', marginBottom: '10px' }}>Add Quantity:</h6>
                      <TextField
                        label="Quantity"
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                      />
                      <p style={{ fontSize: '10px', margin: '5px 0px', color: 'blue', fontWeight: 'bold' }}>
                        Note:
                        <span style={{ color: 'black', fontWeight: 'lighter' }}>
                          Verify quantity before adding the product to the cart
                        </span>
                      </p>
                    </div>
                    <Button  onClick={() => {handleAddToCart(); navigate("/place-order");}} className="place-order-btn">
        Place Order
      </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDetails;
