import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Divider from '@material-ui/core/Divider';

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
      href='https://github.com/makarsky'
      target='_blank'
    >
      <ListItemIcon>
        <GitHubIcon />
      </ListItemIcon>
      <ListItemText primary='GitHub' />
    </ListItem>
    <Divider />
    <ListItem
      button
      component='a'
      href='https://github.com/makarsky/public-chat-react-firebase/tree/limited'
      target='_blank'
    >
      <ListItemIcon>
        <GitHubIcon />
      </ListItemIcon>
      <ListItemText primary='Source Code' />
    </ListItem>
    <ListItem
      button
      component='a'
      href='https://public-chat-react-firebase.vercel.app'
      target='_blank'
    >
      <ListItemIcon>
        <OpenInNewIcon />
      </ListItemIcon>
      <ListItemText primary='Open in new window' />
    </ListItem>
  </div>
);
