import React from "react";
import { Container } from "@material-ui/core";
import Header from "./Header";
import MainAdmin from "./admin/MainAdmin";
import MainUser from "./user/MainUser";
import { useStyles } from "../styles/Style";
import { Outlet } from "react-router-dom";

function Home() {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.container}>
        <Header />
        <Outlet />
      </Container>
    </>
  );
}

export default Home;
