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
              <img src={product.image} alt="{product.name}" width="100%" className="image" />
          </Card>
        </Grid>
        <Grid item xs={6} md={7}>
          <Grid container spacing={2} className="row-container">
            <Grid item xs={8} className="middle-side">
              <Card style={{ height: '510px' }}>
                <Box sx={{ p: 2 }}>
                  <h3 style={{ fontSize: '30px' }}>{product.name}</h3>
                  <hr className="divider" />
                  <span className="price">
                  <h5 style={{ fontSize: '18px', marginBottom: '5px', marginTop:'5px' }}>Product price:</h5>
                  <span style={{ fontSize: '25px', marginBottom: '10px' }}>₹{product.price}</span>   
                  </span>
                  <div className="product-description">
                    <h5 style={{ fontSize: '18px', margin: '20px 0px 3px 0px' }}>Product Description:</h5>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi nihil laborum, commodi, animi tenetur cum corporis sunt laudantium asperiores, voluptatum consectetur esse omnis aliquam sit officia. Odio illum cum quis ipsa itaque. Aspernatur assumenda nesciunt voluptatem vel ex optio error laboriosam tempore suscipit dignissimos debitis ullam dicta quidem, commodi voluptatibus tenetur similique nostrum eaque. Quaerat eius beatae rerum id alias quo ex maxime debitis sint, dolores nesciunt quae molestias quod voluptate autem doloribus reiciendis cumque voluptas dolorem pariatur deserunt, dignissimos reprehenderit accusantium? Quia non consectetur optio repudiandae consequatur perspiciatis ipsum expedita esse, maiores aliquid ipsam, quos veritatis voluptatum reprehenderit mollitia.</p>
                  </div>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={4} className="right-side">
              <Card Width='280px'>
                <div className="addTocart">Add to cart</div>
                <Box sx={{ p: 2 }}>
                    <div className="quantity-input">
                      <h6 style={{ fontSize: '15px', margin: ' 5px 0px 10px 0px' }}>Add Quantity:</h6>
                      <TextField
                        label="Quantity"
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                      />
                      <p style={{ fontSize: '10px', margin: '10px 0px 20px 0px', color: 'blue', fontWeight: 'bold' }}>
                        Note:
                        <span className='note' style={{ color: 'black', fontWeight: 'lighter' }}>
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
