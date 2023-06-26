import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShippingFast, faMoneyBill, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';


import '../ProductDetails.css';

const galleryImages = [
  require('../womens-clothing1.jpg'),
  require('../womens-clothing.jpg'),
  require('../womens-clothing2.jpg'),
  require('../womens-clothing3.jpg'),
  require('../womens-clothing4.jpg'),
  // Add more image URLs as needed
];

const sizeChart = [
  { size: 'S', india: 'S', bust: 34, waist: 29 },
  { size: 'M', india: 'M', bust: 36, waist: 31 },
  { size: 'L', india: 'L', bust: 38, waist: 33 },
  { size: 'XL', india: 'XL', bust: 40, waist: 36 },
  { size: 'XXL', india: 'XXL', bust: 42, waist: 38 },
  { size: 'XXXL', india: 'XXXL', bust: 46, waist: 42 },
];

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('XL');
  const [selectedImage, setSelectedImage] = useState(require('../womens-clothing.jpg'));
  const [openModal, setOpenModal] = React.useState(false);

  const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'];

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleImageHover = (image) => {
    setSelectedImage(image);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} items to cart`);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  
  const renderSizeChart = () => {
    return (
      <table className="bordered-table">
      <thead>
          <tr>
            <th>Brand Size</th>
            <th>India</th>
            <th>Bust (in)</th>
            <th>Waist (in)</th>
          </tr>
        </thead>
        <tbody>
          {sizeChart.map((row, index) => (
            <tr key={index}>
              <td>{row.size}</td>
              <td>{row.india}</td>
              <td>{row.bust}</td>
              <td>{row.waist}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };


  return (
    <div className="product-detail-container" style={{overflowY: 'auto' }}>
      <Grid container spacing={2} className="product-grid">
        <Grid item xs={9} md={10} className="left-side">
          <Card className="images">
            <Box sx={{ p: 2 }} className='gallery'>
              <Grid container spacing={1} className="gallery-style">
                {galleryImages.map((image) => (
                  <Grid item key={image}>
                    <img
                      src={image}
                      alt="Gallery Image"
                      className={`gallery-image ${image === selectedImage ? 'selected' : ''}`}
                      onMouseEnter={() => handleImageHover(image)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <div className="image-gallery">
              <img src={selectedImage} alt="Product Image" width="100%" className="selected-image" />
            </div>
          </Card>
        </Grid>
        <Grid item xs={6} md={7}>
          <Grid container spacing={2} className="row-container">
            <Grid item xs={8} className="middle-side">
              <Card style={{ height: '510px' }}>
                <Box sx={{ p: 2 }}>
                  <h3 style={{ fontSize: '30px' }}>Product Title</h3>
                  <hr className='divider' />
                  <h6 style={{ fontSize: '15px', marginBottom: '5px' }}>Product price:</h6>
                  <span className='price'><span className='rupees-symbol'>₹</span><h4>549</h4></span>
                  <div className="product-description">
                    <h6 style={{ fontSize: '15px', marginBottom: '5px' }}>Product Description:</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Duis sed mi sed justo vestibulum viverra sed eget ligula. Quisque et nisl posuere, convallis ipsum ut, dignissim arcu. Morbi auctor, libero vel facilisis tincidunt, massa dolor interdum nisl, et iaculis neque nunc eget dui. Sed dapibus pharetra velit a eleifend. Aliquam mattis mi nec ultricies iaculis. Sed ullamcorper, justo non congue dignissim, enim nulla consequat est, non tempus eros tortor vitae lorem. Etiam commodo quam lectus, non pulvinar eros tincidunt in. Integer eget ligula in eros ullamcorper mattis at vitae elit. Praesent ut justo lorem. In maximus mollis ligula at finibus. Vestibulum mollis laoreet leo, in condimentum arcu efficitur id.</p>
                  </div>
                  <hr className='divider' />
                  <div className="features">
                    <ul>
                      <li><FontAwesomeIcon icon={faShippingFast} className='icon' /><p>Fast Delivery</p></li>
                      <li><FontAwesomeIcon icon={faMoneyBill} className='icon' /><p>Cash on Delivery</p></li>
                      <li><FontAwesomeIcon icon={faBoxOpen} className='icon' /><p>10 days return policy</p></li>
                    </ul>
                  </div>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={4} className="right-side">
              <Card>
                <div className="addTocart">Add to cart</div>
                <Box sx={{ p: 2 }}>
                  <div className="product-actions">
                    <div className="product-info">
                      <h6 style={{ fontSize: '15px', marginBottom: '10px'}}>Size:</h6>
                      <TextField
                        select
                        value={selectedSize}
                        onChange={handleSizeChange}
                        label="Size"
                      >
                        {sizeOptions.map((size) => (
                          <MenuItem key={size} value={size}>
                            {size}
                          </MenuItem>
                        ))}
                      </TextField>
                      <p onClick={handleOpenModal}>Size Chart</p>
                      <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                            Size Chart
                          </Typography>
                          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {renderSizeChart()}
                          </Typography>
                        </Box>
                      </Modal>
                    </div>
                    <div className="quantity-input">
                      <h6 style={{ fontSize: '15px', marginBottom: '10px' }}>Add Quantity:</h6>
                      <TextField
                        label="Quantity"
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                      />
                      <p style={{ fontSize: '10px', margin: '5px 0px', color: 'blue', fontWeight: 'bold' }}>Note:<p style={{ color: 'black', fontWeight: 'lighter' }}>Verify quantity before adding product to cart</p></p>
                    </div>
                    <Button variant="contained" onClick={handleAddToCart} className='place-order-btn'>
                      Place Order
                    </Button>

                  </div>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDetailPage;
