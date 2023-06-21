import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ProductsPage = () => {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortingOption, setSortingOption] = useState('default');

  useEffect(() => {
    // Check if the user is logged in, otherwise navigate to login page
    const isLoggedIn = checkIfLoggedIn(); // Implement your own login check function
    if (!isLoggedIn) {
      history('/login'); // Navigate to the login page
    }

    // Fetch categories from the backend API endpoint
    fetchCategories();

    // Fetch all products from the backend API endpoint
    fetchProducts();
  }, []);

  const checkIfLoggedIn = () => {
    // Implement your own logic to check if the user is logged in
    // Return true if logged in, false otherwise
    // You can use local storage, cookies, or authentication context for this
    return true; // Replace with your implementation
  };

  const fetchCategories = async () => {
    try {
      // Make API call to fetch categories
      const response = await fetch('/products/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      // Make API call to fetch all products
      const response = await fetch('/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleCategoryChange = (event, newCategory) => {
    setSelectedCategory(newCategory);
    // Update the displayed products based on the selected category
    // Implement your own logic to filter products by category
  };

  const handleSortingOptionChange = (event, newSortingOption) => {
    setSortingOption(newSortingOption);
    // Update the displayed products based on the selected sorting option
    // Implement your own logic to sort the products accordingly
  };

  return (
    <div>
      <ToggleButtonGroup
        value={selectedCategory}
        exclusive
        onChange={handleCategoryChange}
        aria-label="Product Categories"
      >
        {categories.map(category => (
          <ToggleButton key={category.id} value={category.id}>
            {category.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <ToggleButtonGroup
        value={sortingOption}
        exclusive
        onChange={handleSortingOptionChange}
        aria-label="Sorting Options"
      >
        <ToggleButton value="default">Default</ToggleButton>
        <ToggleButton value="priceHighToLow">Price High to Low</ToggleButton>
        <ToggleButton value="priceLowToHigh">Price Low to High</ToggleButton>
        <ToggleButton value="newest">Newest</ToggleButton>
      </ToggleButtonGroup>

      <div>
        {products.map(product => (
          <Card key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            {/* Display other product details */}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
