import React, { useState } from 'react';
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

const Navbar = ({ isLoggedIn =true, isAdmin }) => {

  const [openModal, setOpenModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handleRegister = () => {
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)) {
      alert('Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.');
    } else if (password !== confirmPassword) {
      alert('Password and confirm password do not match.');
    } else {
      // Perform registration logic here
      alert('Registration successful!');
      handleCloseRegisterModal();
    }
  };

  return (
    <AppBar position="static" color="primary" style={{ zIndex: 999, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', backgroundColor: '#232F3E' }}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          <b>upGrad</b>
        </Typography>

        {(isAdmin && isLoggedIn) && (
          <React.Fragment>
            <div>
              <Button color="inherit">
                <HomeIcon fontSize='medium' className='icon btn' />Home
              </Button>
              <Button color="inherit" className='btn'>Add Products</Button>
            </div>
          </React.Fragment>
        )}

        <Stack direction="row" spacing={2} alignItems="center" sx={{ flexGrow: 1 }}>
          {!isLoggedIn || (!isAdmin && isLoggedIn) && (
            <React.Fragment>
              <Button color="inherit" style={{ border: 'none', margin: '5px' }} className='btn'>
                <HomeIcon fontSize='medium' className='icon' />Home
              </Button>
              <Button color="inherit" className='btn'>
                Products
              </Button>
              <div className='searchBar'>
                <input
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  className='search-input'
                />
                <SearchIcon fontSize='large' className='search-icon' />
              </div>
            </React.Fragment>
          )}
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          {!isLoggedIn ? (
            <React.Fragment>
              {/* Login Button */}
              <Button color="inherit" className='btn' onClick={handleOpenModal}>
                <LoginIcon className='icon' fontSize='medium' />
                Login
              </Button>

              {/* Login Modal */}
              <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', width: '500px', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                  <CloseIcon onClick={handleCloseModal} style={{ position: 'absolute', top: 40, right: 25, cursor: 'pointer' }} />
                  <Typography id="modal-modal-title" variant="h5" component="h2">
                    Login
                  </Typography>
                  <hr className='divider' />
                  <TextField label="Username" fullWidth className='modal-input' />
                  <TextField label="Password" fullWidth type="password" className='modal-input' />
                  <Button variant="contained" fullWidth sx={{ mt: 2 }} className='modal-btn'>
                    Login
                  </Button>
                  <Typography sx={{ mt: 2 }}>
                    Don't have an account?{' '}
                    <Button onClick={handleOpenRegisterModal} color="inherit" style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                      Register
                    </Button>
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    Forgot Password
                  </Typography>
                </Box>
              </Modal>

              {/* Register Button */}
              <Button color="inherit" className='btn' onClick={handleOpenRegisterModal}>
                <FontAwesomeIcon icon={faUserPlus} className='icon' />
                Register
              </Button>

              {/* Register Modal */}
              <Modal
                open={openRegisterModal}
                onClose={handleCloseRegisterModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                  <CloseIcon onClick={handleCloseRegisterModal} style={{ position: 'absolute', top: 40, right: 25, cursor: 'pointer' }} />
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Register
                  </Typography>
                  <hr className='divider' />
                  <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth className='register-modal-input' />
                  <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth className='register-modal-input' />
                  <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth className='register-modal-input' />
                  <TextField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth type="password" className='register-modal-input' inputProps={{ minLength: 8, pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$' }} />
                  <TextField label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} fullWidth type="password" className='register-modal-input' />
                  <Button variant="contained" sx={{ mt: 2 }} fullWidth onClick={handleRegister}>
                    Register
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
                <Button color="inherit" className='btn'>
                  <ShoppingCartIcon fontSize='medium' className='icon' />
                  Cart (0)
                </Button>
              )}
              <Button color="inherit" className='btn'>
                <LogoutIcon fontSize='medium' className='icon' />
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
