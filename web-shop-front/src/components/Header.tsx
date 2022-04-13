import React from "react";
import Logout from '@mui/icons-material/Logout';
import { IconButton, AppBar, Toolbar } from "@mui/material";
import { useStyles } from "../styles/Style";
import {Link} from 'react-router-dom';

function Header() {
  const classes = useStyles();
  const signOut = () => {
    localStorage.clear();
  };
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar style={{ marginLeft: "auto"}}>
        <label>Odjavi se</label>
        <IconButton
          edge="end"
          color="inherit"
          onClick={signOut}
          component={Link}
          to="/"
        >
          <Logout/>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
