import React, { createContext, useState } from "react";
import { Grid } from "@material-ui/core";
import { Outlet } from "react-router-dom";
import { useStyles } from "../../styles/Style";
import { User } from "../../models/User";
import NavigationUser from "./NavigationUser";

interface Props {
  user: User;
}

function MainUser() {
  const classes = useStyles();

  return (
    <>
      <NavigationUser user={null} orders={null} />
      <Outlet />
    </>
  );
}

export default MainUser;
