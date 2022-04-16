import React from "react";
import { Grid } from "@material-ui/core";
import { Manufacturer } from "../../models/Manufacturer";
import { ProductType } from "../../models/ProductType";
import { useStylesAuxiliary } from "../../styles/AuxiliaryElementsStyle";
import ManageManufacturers from "./AuxiliaryElements/ManageManufacturers";
import ManageProductType from "./AuxiliaryElements/ManageProductType";

interface Props {
  appendManufacturers: (m: Manufacturer) => void;
  appendProductTypes: (pt: ProductType) => void;
}

function AuxiliaryElements(props: Props) {
  const classes = useStylesAuxiliary();
  return (
    <Grid className={classes.root}>
      <Grid item xs={5}>
        <ManageManufacturers appendManufacturers={props.appendManufacturers} />
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={5}>
        <ManageProductType appendProductTypes={props.appendProductTypes} />
      </Grid>
    </Grid>
  );
}

export default AuxiliaryElements;
