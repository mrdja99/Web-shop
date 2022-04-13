import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import { Order } from "../../models/Order";
import { OrderItem } from "../../models/OrderItem";
import { User } from "../../models/User";
import { useStylesMyCart } from "../../styles/MyCartStyle";
import { AddOrder } from "../../services/Api";
import Alerts from "../Alerts";

interface Props {
  user: User | null;
  items: OrderItem[];
  onCancelOrder: (cancel: boolean) => void;
  onRemoveOrderItem: (productID: number) => void;
  onCreatedOrder: (order: Order) => void;
  onChangeOrderItem: (productID: number | null, quantity: number) => void;
}

function MyCart(props: Props) {
  const classes = useStylesMyCart();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const minDate = new Date(new Date().getTime() + 86400000 * 7);

  const [selectedDate, setSelectedDate] = useState<Date>(minDate);
  const [sum, setSum] = useState<number>(0);

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [openAlertError, setOpenAlertError] = useState<boolean>(false);
  const [serverAlert, setServerAlert] = useState<boolean>(false);

  const [editable, setEditable] = useState<boolean>(false);
  const [newQuantity, setNewQuantity] = useState<number>(0);
  const [productToEdit, setProductToEdit] = useState<number | null>(0);

  useEffect(() => {
    setOrderItems(props.items);
    calculateTotalPrice();
    console.log(props.items);
  }, [props.items, props.onChangeOrderItem]);

  function calculateTotalPrice() {
    let sum = 0;
    props.items.forEach((element) => {
      sum = sum + element.orderItemPrice;
    });
    setSum(sum);
  }

  const generateKey = (pre: String) => {
    return `${pre}_${new Date().getTime()}`;
  };

  const handleRemoveOrderItem = (id: number | null) => {
    if (id) {
      props.onRemoveOrderItem(id);
    }
  };

  const handleCancelOrder = () => {
    props.onCancelOrder(true);
  };

  const handleDateChange = (date: Date | null) => {
    if (date !== null) setSelectedDate(date);
  };

  const handleAddOrder = () => {
    let order: Order;
    if (
      selectedDate !== null ||
      sum !== 0 ||
      props.user !== null ||
      orderItems.length !== 0
    ) {
      let deadline: Date = new Date();

      deadline = new Date(
        Date.UTC(
          selectedDate!.getFullYear(),
          selectedDate!.getMonth(),
          selectedDate!.getDate()
        )
      );

      order = new Order(
        new Date(),
        deadline,
        sum,
        props.user,
        orderItems,
        "Obrada"
      );
      onAddOrder(order);
    }
  };

  const onAddOrder = async (order: Order) => {
    try {
      const res = await AddOrder(order);
      console.log(res);
      if (res?.error?.status === "400") {
        handleClickAlertError();
      } else {
        handleClickAlert();
        props.onCreatedOrder(order);
        handleCancelOrder();
      }
    } catch {
      console.log("error in adding order");
      handleClickAlertError();
    }
  };

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleClickAlertError = () => {
    setOpenAlertError(true);
  };

  return (
    <div
      className={classes.myCart}
      style={{ maxWidth: "80%", marginLeft: "10%" }}
    >
      {openAlert ? (
        <Alerts
          text="Uspesno kreirana porudzbina!"
          type="success"
          setText={() => setOpenAlert(false)}
          setType={() => setOpenAlert(false)}
        />
      ) : null}
      {openAlertError ? (
        <Alerts
          text="Nije moguce kreirati porudzbinu!"
          type="error"
          setText={() => setOpenAlertError(false)}
          setType={() => setOpenAlertError(false)}
        />
      ) : null}
      {serverAlert ? (
        <Alerts
          text="Nije moguce povezati se sa serverom!"
          type="error"
          setText={() => setServerAlert(false)}
          setType={() => setServerAlert(false)}
        />
      ) : null}
      <Grid container className={classes.gridContainer}>
        <Grid item xs={5}>
          <label className={classes.label}>Datum porudzbine:</label>
          <span>{moment(new Date()).format("DD-MM-YYYY")}</span>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={5}>
          <label className={classes.label}>Zeljeni datum pristizanja:</label>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd-MM-yyyy"
              id="date-picker-inline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              style={{ width: "200px" }}
              minDate={minDate}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>

      <TableContainer className={classes.table}>
        <Table size="medium">
          <TableHead className={classes.thead}>
            <TableRow>
              <TableCell style={{ color: "white" }}>Naziv proizvoda</TableCell>
              <TableCell style={{ color: "white" }}>Jedinicna cena</TableCell>
              <TableCell style={{ color: "white" }}>Kolicina</TableCell>
              <TableCell style={{ color: "white" }}>Iznos stavke</TableCell>
              <TableCell style={{ color: "white" }}>
                Izmeni/Obrisi stavku
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tbody}>
            {orderItems?.map((row) => {
              return (
                <TableRow
                  key={generateKey(String(row.id))}
                  className={classes.trow}
                  style={{ color: "white" }}
                >
                  <TableCell>{row.product.name}</TableCell>
                  <TableCell>{row.product.price}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.orderItemPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      startIcon={<CreateIcon />}
                      onClick={() => {
                        setNewQuantity(row.quantity);
                        setEditable(true);
                        setProductToEdit(row.product.id);
                      }}
                    />
                    <Button
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        handleRemoveOrderItem(row.product.id);
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={7}></Grid>
        <Grid item xs={2}>
          <label className={classes.label}>Ukupan iznos:</label>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="outlined-basic"
            margin="dense"
            InputProps={{
              readOnly: true,
            }}
            value={sum.toFixed(2)}
            name="message"
          />
        </Grid>
      </Grid>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={5} style={{ textAlign: "left" }}>
          <Button className={classes.btnReject} onClick={handleCancelOrder}>
            Odustani
          </Button>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={5} style={{ textAlign: "right" }}>
          <Button className={classes.btnConfirm} onClick={handleAddOrder}>
            Potvrdi
          </Button>
        </Grid>
      </Grid>
      <Dialog open={editable}>
        <DialogTitle>Izmenite kolicinu...</DialogTitle>
        <DialogContent>
          <TextField
            id="standard-number-quantity"
            type="number"
            value={newQuantity}
            onChange={(e) => setNewQuantity(Number(e.target.value))}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{ inputProps: { min: 1, max: 999 } }}
            style={{ maxWidth: "25%", marginLeft: "2%", marginRight: "5%" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.onChangeOrderItem(productToEdit, newQuantity);
              setEditable(false);
            }}
            color="primary"
          >
            Potvrdi
          </Button>
          <Button onClick={() => setEditable(false)} color="primary">
            Odustani
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MyCart;
