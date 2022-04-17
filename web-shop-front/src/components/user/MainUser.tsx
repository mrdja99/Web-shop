import React, { createContext, useState } from "react";
import { Grid } from "@material-ui/core";
import { Outlet } from "react-router-dom";
import { useStyles } from "../../styles/Style";
import { User } from "../../models/User";
import { OrderItem } from "../../models/OrderItem";
import NavigationUser from "./NavigationUser";

interface Props {
  user: User | null;
  orders: OrderItem[] | null;
}

function MainUser(props: Props) {
  const classes = useStyles();

  return (
    <>
      <NavigationUser user={props.user} orders={props.orders} />
      <Outlet />
    </>
  );
}

export default MainUser;
