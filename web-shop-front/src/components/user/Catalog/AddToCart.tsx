import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import { Product } from "../../../models/Product";
import { OrderItem } from "../../../models/OrderItem";

const TransitionAddToCart = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

interface Props {
  open: boolean;
  onClose: (value: boolean) => void;
  product: Product | null;
  onAddToCart: (item: OrderItem | null) => void;
  orderItemsNumber: number;
}

function AddToCart(props: Props) {
  const [openAddToCart, setOpenAddToCart] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const handleClose = () => {
    setQuantity(1);
    props.onClose(true);
  };
  const handleAddItem = () => {
    if (props.product) {
      let item: OrderItem = new OrderItem(
        props.orderItemsNumber,
        quantity,
        props.product?.price * quantity,
        props.product
      );
      props.onAddToCart(item);
    }
  };
  return (
    <Dialog
      open={props.open}
      TransitionComponent={TransitionAddToCart}
      keepMounted
      onClose={setOpenAddToCart}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title" style={{ margin: "auto" }}>
        Da li zelite da dodate{" "}
        <label style={{ width: "25%", fontWeight: "bold" }}>
          {props.product ? props.product.name : ""}
        </label>{" "}
        u korpu?
      </DialogTitle>
      <DialogContent style={{ alignContent: "center", marginLeft: "12%" }}>
        <DialogContentText id="alert-dialog-slide-description">
          <label style={{ width: "25%" }}>Kolicina: </label>
          <TextField
            id="standard-number"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{ inputProps: { min: 1, max: 999 } }}
            style={{ maxWidth: "25%", marginLeft: "2%", marginRight: "5%" }}
          />

          <label style={{ width: "25%" }}>Cena: </label>
          <TextField
            id="standard-number-price"
            disabled
            value={
              props.product?.price
                ? (props.product.price * quantity).toFixed(2)
                : 0
            }
            style={{ maxWidth: "25%", marginLeft: "2%" }}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ margin: "auto" }}>
        <Button
          onClick={() => {
            handleAddItem();
            handleClose();
          }}
          color="primary"
        >
          Potvrdi
        </Button>
        <Button onClick={handleClose} color="primary">
          Odustani
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddToCart;
