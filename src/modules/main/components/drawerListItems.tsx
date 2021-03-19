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
    <ListItem button>
      <ListItemIcon>
        <InstagramIcon />
      </ListItemIcon>
      <ListItemText primary='Instagram' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <FacebookIcon />
      </ListItemIcon>
      <ListItemText primary='Facebook' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <FilterVintageIcon />
      </ListItemIcon>
      <ListItemText primary='SoloLearn' />
    </ListItem>
    <ListItem button href='https://github.com/makarsky'>
      <ListItemIcon>
        <GitHubIcon />
      </ListItemIcon>
      <ListItemText primary='GitHub' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary='Linktree' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <GitHubIcon />
      </ListItemIcon>
      <ListItemText primary='Source Code' />
    </ListItem>
  </div>
);
