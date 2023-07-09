import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../common.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Navbar = ({ isAdmin }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [contactNumber, setContactNumber] = useState('');
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);



  const handleOpenModal = () => {
    setOpenModal(true);
    setOpenRegisterModal(false);
  };

  const handleOpenRegisterModal = () => {
    setOpenRegisterModal(true);
    setOpenModal(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseRegisterModal = () => {
    setOpenRegisterModal(false);
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/users', {
        firstName,
        lastName,
        email,
        password,
        contactNumber,
      });

      if (response.status === 200) {
        alert('Registration successful!');
        handleCloseRegisterModal();
      } else {
        alert('An error occurred during registration.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('An error occurred during registration.');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    navigate('/');
  };


  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Logged in:', data);
        alert('Successfully logged in');
        handleCloseModal();
        setLoggedIn(true);
        navigate('/products');
      } else {
        const error = await response.text();
        console.log('Login error:', error);
        alert(error);
      }
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery !== '') {
      if (location.pathname === '/products') {
        const filteredProducts = products.filter((product) =>
          product.name.toLowerCase().includes(trimmedQuery.toLowerCase())
        );
        setFilteredProducts(filteredProducts);
      } else {
        navigate('/products', { state: { searchQuery: trimmedQuery } });
      }
    }
  };
  
  
  return (
    <AppBar position="static" color="primary" style={{ zIndex: 999, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', backgroundColor: '#3f51b5' }}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          <b>upGrad</b>
        </Typography>

        {isAdmin && loggedIn && (
          <React.Fragment>
            <div>
              <Link to="/">
                <Button color="#fff" className="btn">
                  <HomeIcon fontSize="medium" className="btn" />
                  Home
                </Button>
              </Link>
              <Link to="/products">
                <Button color="#fff" className="btn">
                  Products
                </Button>
              </Link>
              <Link to="/addproducts">
                <Button color="#fff" className="btn">
                  Add Products
                </Button>
              </Link>
            </div>
          </React.Fragment>
        )}



<Stack direction="row" spacing={2} alignItems="center" sx={{ flexGrow: 1 }}>
  {loggedIn && (
    <React.Fragment>
      <Link to="/">
        <Button color="inherit" className="btn" style={{ color: '#fff' }}>
          <HomeIcon fontSize="medium" className="icon" />
          Home
        </Button>
      </Link>
      <Link to="/products">
        <Button color="inherit" className="btn" style={{ color: '#fff' }}>
          Products
        </Button>
      </Link>
      <Link to="/address">
        <Button color="inherit" className="btn" style={{ color: '#fff' }}>
          Address
        </Button>
      </Link>
      <form onSubmit={handleSearch} className="searchBar">
              <input
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <button type="submit" className="search-icon">
search              </button>
            </form> 
            </React.Fragment>
  )}
</Stack>



        <Stack direction="row" spacing={2} alignItems="center">
          {!loggedIn ? (
            <React.Fragment>
              {/* Login Button */}
              <Button color="inherit" className="btn" onClick={handleOpenModal}>
                <LoginIcon className="icon" fontSize="medium" />
                Login
              </Button>

              {/* Login Modal */}
              <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <CloseIcon
            onClick={handleCloseModal}
            style={{ position: 'absolute', top: 40, right: 25, cursor: 'pointer' }}
          />
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Login
          </Typography>
          <hr className="divider" />
          <TextField
            label="Email"
            fullWidth
            className="modal-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            fullWidth
            type="password"
            className="modal-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            className="modal-btn"
            onClick={() => {
              handleLogin();
            }}
          >
            Login
          </Button>
        </Box>
      </Modal>

              {/* Register Button */}
              <Button color="inherit" className="btn" onClick={handleOpenRegisterModal}>
                <FontAwesomeIcon icon={faUserPlus} className="icon" />
                Register
              </Button>

              {/* Register Modal */}
             <Modal
                open={openRegisterModal}
                onClose={handleCloseRegisterModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '500px',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <CloseIcon
                    onClick={handleCloseRegisterModal}
                    style={{ position: 'absolute', top: 40, right: 25, cursor: 'pointer' }}
                  />
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Register
                  </Typography>
                  <hr className="divider" />
                  <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth className="register-modal-input" />
                  <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth className="register-modal-input" />
                  <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth className="register-modal-input" />
                  <TextField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth type="password" className="register-modal-input" inputProps={{ minLength: 8, pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$' }} />
                  <TextField label="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} fullWidth className="register-modal-input" />
                  <Button variant="contained" sx={{ mt: 2 }} fullWidth onClick={handleRegister}>
                    Sign Up
                  </Button>
                  <Typography sx={{ mt: 2 }}>
                    Already have an account?{' '}
                    <Button onClick={handleOpenModal} color="inherit" style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                      Login
                    </Button>
                  </Typography>
                </Box>
              </Modal>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {!isAdmin && (
                <Link to="/cart">
                  <Button color="inherit" className="btn" style={{ color: '#fff' }}>
                    <ShoppingCartIcon fontSize="medium" className="icon" />
                    Cart (0)
                  </Button>
                </Link>
              )}
              <Button color="inherit" className="btn" onClick={() => {handleLogout(); navigate('/');}}>
                <LogoutIcon fontSize="medium" className="icon" />
                Logout
              </Button>
            </React.Fragment>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
