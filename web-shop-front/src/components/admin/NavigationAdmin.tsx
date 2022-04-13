import React, { useState } from "react";
import {
  Paper,
  Tabs,
  Tab,
  Theme,
  Badge,
  makeStyles,
  withStyles,
  createStyles,
} from "@material-ui/core";
import { Link, Outlet } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function NavigationAdmin() {
  const [value, setValue] = useState(0);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab component={Link} to="auxiliary" label="Auxiliary elements" />
        <Tab component={Link} to="manageProducts" label="Add new product" />
        <Tab component={Link} to="viewProducts" label="View products" />
        <Tab component={Link} to="manageOrders" label="Manage orders" />
      </Tabs>
    </Paper>
  );
}

export default NavigationAdmin;
