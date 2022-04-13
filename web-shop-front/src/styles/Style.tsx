import { makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      background: "#222431!important",
      height: "100%",
      backgroundImage: `url(
          ${"https://www.transparenttextures.com/patterns/asfalt-dark.png"}
        )`,
    },
    gridOne: {
      float: "left",
    },
    gridTwo: {
      overflow: "hidden",
    },
    container: {
      padding: 0,
      margin: 0,
      maxWidth: "100%",
      color: "#222431",
      maxHeight: "100vh",
    },
    paper: {
      position: "relative",
      maxWidth: "12vw",
      height: "90vh",
      float: "left",
      marginTop: "64px",
      backgroundColor: "#E1E2EB",

    },
    content: {
      overflow: "hidden",
      position: "relative",
      paddingTop: "5px",
    },
    loginBackground: {
      backgroundColor: "#222431",
      height: "100vh",

      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      backgroundImage: `url(
          ${"https://www.transparenttextures.com/patterns/asfalt-dark.png"}
        )`,
    },
    loginContainer: {
      height: "60%",
      width: "40%",
      borderRadius: "10px",
      position: "relative",
      padding: "3%",
      boxShadow: "10px  10px  5px",
      background: "#e1e2eb",
      flexDirection: "column",
      display: "flex",
      flexWrap: "wrap",
      alignContent: "center",
    },
    loginElements: {
      marginBottom: "3%!important",
      borderRadius: "10px",
    },
    loginButton: {
      borderRadius: "5px",
      margin: "5px!important",
      backgroundColor: "#4EB8CE",
      color: "#222431",
    },
    loginLabel: {
      marginBottom: "7%",
      alignSelf: "center",
      fontSize: "3vh",
      fontWeight: "bold",
      color: "#222431",
    },
  })
);
