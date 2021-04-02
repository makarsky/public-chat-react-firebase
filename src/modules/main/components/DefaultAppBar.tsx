import React, { useState, FunctionComponent } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import MoodIcon from '@material-ui/icons/Mood';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Box from '@material-ui/core/Box';
import { mainListItems } from './drawerListItems';

const DefaultAppBar: FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography component='h1' variant='h6' color='inherit'>
            Emoji Chat
          </Typography>
          <Box color='inherit' clone m={1}>
            <MoodIcon />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer open={open} className='app-drawer' onClose={handleDrawerClose}>
        <Box className='app-drawer-close-icon'>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box color='inherit' clone p={2}>
          <Typography component='h1' variant='h6' color='inherit'>
            Follow me for more!
          </Typography>
        </Box>
        <Divider />
        <List>{mainListItems}</List>
      </Drawer>
    </>
  );
};

export default DefaultAppBar;
