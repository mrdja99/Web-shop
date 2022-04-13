import React, { useState } from "react";
import {
  Button,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Tooltip,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SaveIcon from "@material-ui/icons/Save";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useStylesManageManufacturers } from "../../../styles/AuxiliaryElementsStyle";
import { ProductType } from "../../../models/ProductType";
import { AddProductType } from "../../../services/Api";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props {
  appendProductTypes: (pt: ProductType) => void;
}

function ManageProductType(props: Props) {
  const classes = useStylesManageManufacturers();

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [openAlertError, setOpenAlertError] = useState<boolean>(false);

  const [name, setName] = useState<string | null>(null);
  const [openName, setOpenName] = useState<boolean>(false);

  const handleClickAlert = () => {
    setOpenAlert(true);
  };
  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };
  const handleClickAlertError = () => {
    setOpenAlertError(true);
  };
  const handleCloseAlertError = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertError(false);
  };

  const handleCancel = () => {
    setName(null);
  };
  const handleAddType = () => {
    if (name !== null || name !== "") {
      let type: ProductType = new ProductType(name!);
      onAddType(type);
    }
  };

  const onAddType = async (type: ProductType) => {
    try {
      const res = await AddProductType(type);
      console.log(res);
      if (res.status === 404) {
        console.log("error");
        handleClickAlertError();
      } else {
        handleClickAlert();
        handleCancel();
        props.appendProductTypes(type);
      }
    } catch (e) {
      console.log("error while adding manufacturer");
      console.log(e);
      handleClickAlertError();
    }
  };

  return (
    <Grid component={Paper} className={classes.root}>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          Product type created successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openAlertError}
        autoHideDuration={6000}
        onClose={handleCloseAlertError}
      >
        <Alert onClose={handleCloseAlertError} severity="error">
          Cannot save new product type!
        </Alert>
      </Snackbar>
      <Grid item xs={12} className={classes.gridItem}>
        <label className={classes.labelMain}>Add Product Type...</label>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <label className={classes.label}>Name </label>
        <Tooltip
          open={openName}
          title="Please enter a valid name!"
          placement="right"
        >
          <TextField
            required
            id="standard-required-name"
            variant="outlined"
            value={name || ""}
            onChange={(e) => {
              setName(e.target.value);
              setOpenName(false);
            }}
            className={classes.textFieldItem}
          />
        </Tooltip>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <Grid item xs={6}>
          <Button
            id="removeMan"
            variant="contained"
            startIcon={<DeleteForeverIcon />}
            onClick={handleCancel}
            style={{ backgroundColor: "#676d92", color: "white" }}
            className={classes.btns}
          >
            Dismiss
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            id="addMan"
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleAddType}
            style={{ backgroundColor: "#222431", color: "white" }}
            className={classes.btns}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ManageProductType;
