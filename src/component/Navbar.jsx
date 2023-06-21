import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';

const Navbar = ({ isLoggedIn, isAdmin }) => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          upGrad
        </Typography>
      

        {(isAdmin && isLoggedIn) && (
          <React.Fragment>
            <Button color="inherit" >
              <FontAwesomeIcon icon={faHome} />{' '}
            </Button>
            <Button color="inherit">Add Products</Button>
          </React.Fragment>
        )}

        <Stack direction="row" spacing={2} alignItems="center" sx={{ flexGrow: 1 }}>
          {!isLoggedIn || (!isAdmin && isLoggedIn) && (
            <React.Fragment>
                  <Button color="inherit"                 
          style={{ border: 'none', margin: '5px 12px' }}>
          <FontAwesomeIcon icon={faHome}/>
        </Button>
              <Button color="inherit">
                Products
              </Button>
              <input
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ border: 'none', padding: '5px 12px' }}
              />
            <SearchIcon />

            </React.Fragment>
          )}
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          {!isLoggedIn ? (
            <React.Fragment>
              <Button color="inherit">
                <FontAwesomeIcon icon={faSignInAlt} />
                Login
              </Button>
              <Button color="inherit">
                <FontAwesomeIcon icon={faUserPlus} />
                Register
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {!isAdmin && (
                <Button color="inherit">
                  <i className="fa fa-shopping-cart"></i>
                  Cart (0)
                </Button>
              )}
              <Button color="inherit">
                <FontAwesomeIcon icon={faArrowRight} />
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
