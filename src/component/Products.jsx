import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import productData from './productData';
import { useHistory } from 'react-router-dom';


import '../Products.css';

const Products = () => {
  const [loading, setLoading] = useState(false);
  const productsToDisplay = productData.slice(0, 8); 


  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

 

  return (
    <div>
      {loading ? (
        <Grid container spacing={3} className="grid">
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={8} md={4} lg={3} key={index}>
              <Card sx={{ height: '500px' }}>
                <Skeleton height={1} />
                <Box p={2}>
                  <Skeleton height={60} />
                  <Skeleton height={20} width="60%" />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3} className='grid'>
          {productsToDisplay.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card sx={{ width: '97%' }} className='product-card'>
                <img src={product.image} alt={product.name} className="product-image" />
                <Box p={2} className='product-details'>
                  <h4 className="product-title">{product.name}...</h4>
                  <p className="product-price"><b>₹{product.price}</b></p>
                  <div className="product-rating">
              {Array(5)
                .fill()
                .map((_, index) => (
                  <StarIcon
                    key={index}
                    className={index < product.rating ? 'filled' : 'unfilled'}
                  />
                ))}
              <p className="product-rating-figure">{product.rating.toFixed(1)}</p>
            </div>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <div className='loadMore'>
      <Button variant="contained" style={{padding: '10px 20px', background:'#232F3E'}} >Load More</Button>
      </div>

    </div>
  );
};

export default Products;
