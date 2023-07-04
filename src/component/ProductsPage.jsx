import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { Outlet, Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import Button from '@mui/material/Button';
import Skeleton from 'react-loading-skeleton';
import productData from './productData';

import '../Product.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    'jewelery',
    "women's clothing",
    "men's clothing",
    'electronics',
  ]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortingOption, setSortingOption] = useState('default');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize products data
    initializeProducts();
  }, []);

  const initializeProducts = () => {
    // Assuming you have the product data with IDs
   
    
    setLoading(true);
    setTimeout(() => {
      setProducts(productData);
      setLoading(false);
    }, 1200);
  };

  
  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (category === '') {
        // If the category is empty, deselect all categories
        return [];
      } else if (prevSelectedCategories.includes(category)) {
        // If the category is already selected, remove it from the selected categories
        return prevSelectedCategories.filter((cat) => cat !== category);
      } else {
        // If the category is not selected, add it to the selected categories
        return [...prevSelectedCategories, category];
      }
    });
  };

  
  const handleSortingOptionChange = (event) => {
    setSortingOption(event.target.value);
  
    if (event.target.value === 'default') {
      // Fetch the categories again to revert to the original order
      initializeProducts(); // Reset the products array to its original state
    } else if (event.target.value === 'price-low-to-high') {
      // Sort the products by price in ascending order
      const sortedProducts = [...products].sort((a, b) => a.price - b.price);
      setProducts(sortedProducts);
    } else if (event.target.value === 'price-high-to-low') {
      // Sort the products by price in descending order
      const sortedProducts = [...products].sort((a, b) => b.price - a.price);
      setProducts(sortedProducts);
    } else if (event.target.value === 'rating') {
      // Sort the products by rating in descending order
      const sortedProducts = [...products].sort((a, b) => b.rating - a.rating);
      setProducts(sortedProducts);
    } else if (event.target.value === 'newest') {
      // Sort the products by date of upload in descending order (newest first)
      const sortedProducts = [...products].sort((a, b) => {
        const dateA = new Date(a.dateofUpload);
        const dateB = new Date(b.dateofUpload);
        return dateB - dateA;
      });
      setProducts(sortedProducts);
    }
  };
  

  return (
    <div>
      <div className="filters">
        <div className="categories">
          <ToggleButton
            value=""
            selected={selectedCategories.length === 0}
            onChange={() => handleCategoryChange('')}
            size="small"
            className="category-btn"
          >
            All
          </ToggleButton>
          {categories.map((category) => (
            <ToggleButton
              key={category}
              value={category}
              selected={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              size="small"
              variant="outlined"
              className="category-btn"
            >
              {category}
            </ToggleButton>
          ))}
        </div>

        <select value={sortingOption} onChange={handleSortingOptionChange} className='select-input'>
          <option value="default">Default Sorting</option>
          <option value="price-low-to-high">Price: Low to High</option>
          <option value="price-high-to-low">Price: High to Low</option>
          <option value="rating">Ratings</option>
          <option value="date">Newest First</option>
        </select>
      </div>

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
  {products
    .filter((product) => selectedCategories.length === 0 || selectedCategories.includes(product.category))
    .map((product) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
        <Card sx={{ width: '97%' }} className='product-card'>
          <img src={product.image} alt={product.name} className="product-image" />
          <Box p={2} className='product-details'>
            <h4 className="product-title">{product.name}...</h4>
            <p className="product-price"><b>₹{product.price}</b></p>
            <Link to={`/product-details/${product.id}`}>
            <Button variant="contained" className="buyNow">
              Buy Now
            </Button>
            </Link>
          </Box>
        </Card>
      </Grid>
    ))}
</Grid>

      )}
    </div>
  );
};

export default ProductsPage;
