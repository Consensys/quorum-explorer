import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
const nodesConfig = require('../config/nodes.json');

const pages = ['Dashboard', 'Explorer', 'Contracts'];
const nodes = Object.keys(nodesConfig);

function Navigation() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Container maxWidth="xl">
      
      <AppBar position="static" >
        <Toolbar disableGutters>

        <Grid container spacing={1} >

          {/* logo */}
          <Grid item xs={2}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ ml:2, mt:1, display:'flex' }}
            >
            Quorum Explorer
            </Typography>
          </Grid>

          {/* pages */}
          <Grid item xs={9}>
            <Box display="flex" justifyContent="flex-beginning" >
            {pages.map((page) => (
              <Link href={`${page}`}>
              <a>
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ mt: 1, display: { color: "white" } }}
                >
                  {page}
                </Button>
              </a>
            </Link>
            ))}
            </Box>
          </Grid>

          {/* nodes drop down */}
          <Grid item xs={1}>
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ mt: 1, alignItems: 'center' }}>
                <MenuRoundedIcon style={{ color: 'white' }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ color: 'white' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {nodes.map((node) => (
                <MenuItem key={node} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{node}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          </Grid>
        </Grid>




          {/* spacer   */}
      
        </Toolbar>
      </AppBar>
    </Container>
  );
};
export default Navigation;
