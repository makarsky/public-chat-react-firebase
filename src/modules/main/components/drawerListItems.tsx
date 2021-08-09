import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import FilterVintageIcon from '@material-ui/icons/FilterVintage';
import GitHubIcon from '@material-ui/icons/GitHub';
import LayersIcon from '@material-ui/icons/Layers';

export const mainListItems = (
  <div>
    <ListItem
      button
      component='a'
      href='https://www.instagram.com/igor_makarsky'
      target='_blank'
    >
      <ListItemIcon>
        <InstagramIcon />
      </ListItemIcon>
      <ListItemText primary='Instagram' />
    </ListItem>
    <ListItem
      button
      component='a'
      href='https://www.facebook.com/profile.php?id=100017176034290'
      target='_blank'
    >
      <ListItemIcon>
        <FacebookIcon />
      </ListItemIcon>
      <ListItemText primary='Facebook' />
    </ListItem>
    <ListItem
      button
      component='a'
      href='https://www.sololearn.com/profile/779917?ref=app'
      target='_blank'
    >
      <ListItemIcon>
        <FilterVintageIcon />
      </ListItemIcon>
      <ListItemText primary='SoloLearn' />
    </ListItem>
    <ListItem
      button
      component='a'
      href='https://github.com/makarsky'
      target='_blank'
    >
      <ListItemIcon>
        <GitHubIcon />
      </ListItemIcon>
      <ListItemText primary='GitHub' />
    </ListItem>
    <ListItem
      button
      component='a'
      href='https://linktr.ee/makarsky'
      target='_blank'
    >
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary='Linktree' />
    </ListItem>
    <ListItem
      button
      component='a'
      href='https://github.com/makarsky/public-chat-react-firebase'
      target='_blank'
    >
      <ListItemIcon>
        <GitHubIcon />
      </ListItemIcon>
      <ListItemText primary='Source Code' />
    </ListItem>
  </div>
);
