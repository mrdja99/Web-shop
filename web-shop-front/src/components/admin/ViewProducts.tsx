import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Grid,
  TextField,
  InputAdornment,
  Button,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Slide,
  Snackbar,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TransitionProps } from "@material-ui/core/transitions";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useStylesViewProducts } from "../../styles/ViewProductsStyle";
import { StyledTableCell } from "../../styles/ViewProductsStyle";
import { StyledTableRow } from "../../styles/ViewProductsStyle";
import { Product } from "../../models/Product";
import { ProductTypeContext, ManufacturerContext } from "../../App";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { GetAllProducts, DeleteProduct } from "../../services/Api";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  onEditProduct: (product: Product) => any;
}

function ViewProducts(props: Props) {
  const classes = useStylesViewProducts();

  const [products, setProducts] = useState<Product[]>([]);
  const productType = useContext(ProductTypeContext);
  const manufacturer = useContext(ManufacturerContext);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [type, setType] = useState<string | null>(null);
  const [man, setMan] = useState<string | null>(null);

  const [product, setProduct] = useState<number>(0);

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [openAlertError, setOpenAlertError] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const chosenProduct = products?.find((p) => p.id === product);

  const handleDelete = (productId: number | null) => {
    if (productId !== null) {
      OnDeleteProduct(productId);
    }
  };

  const OnDeleteProduct = async (productID: number) => {
    try {
      const res = await DeleteProduct(productID);

      if (!res.ok) {
        handleClickAlertError();
      } else {
        let products2: Product[] = [...products];
        let product: Product | undefined = products.find(
          (p: Product) => p.id === productID
        );

        if (product !== undefined) {
          products2.splice(products2.indexOf(product), 1);
          handleClickAlert();
          setProducts(products2);
          setFilteredProducts(products2);
        }
      }
    } catch {
      console.log("error in deleting product");
      handleClickAlertError();
    }
  };

  const handleEditProduct = (productID: number | null) => {
    let p;
    if (productID !== null) {
      p = products.find((pr) => pr.id === productID);
    }

    if (p !== undefined) {
      console.log(p);
      props.onEditProduct(p);
    }
  };

  const componentRef: any = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
    console.log("error");
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

  const getData = async () => {
    const products = await GetAllProducts();

    setProducts(products);
    setFilteredProducts(products);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const newFilteredProducts = products?.filter((p: Product) => {
      if (type === null && man === null && search !== "")
        return p.name.toLocaleLowerCase() === search.toLocaleLowerCase();
      if (
        search === "" &&
        type !== null &&
        man === null &&
        p.productType !== null
      )
        return (
          p.productType.name.toLocaleLowerCase() === type?.toLocaleLowerCase()
        );
      if (
        search === "" &&
        type === null &&
        man !== null &&
        p.manufacturer !== null
      )
        return (
          p.manufacturer.name.toLocaleLowerCase() === man?.toLocaleLowerCase()
        );
      if (
        search !== "" &&
        type !== null &&
        man === null &&
        p.productType !== null
      ) {
        return (
          p.productType.name.toLocaleLowerCase() ===
            type?.toLocaleLowerCase() &&
          p.name.toLocaleLowerCase() === search.toLocaleLowerCase()
        );
      }
      if (
        search !== "" &&
        type === null &&
        man !== null &&
        p.manufacturer !== null
      ) {
        return (
          p.manufacturer.name.toLocaleLowerCase() ===
            man?.toLocaleLowerCase() &&
          p.name.toLocaleLowerCase() === search.toLocaleLowerCase()
        );
      }
      if (
        search === "" &&
        type !== null &&
        man !== null &&
        p.manufacturer !== null &&
        p.productType !== null
      ) {
        return (
          p.manufacturer.name.toLocaleLowerCase() ===
            man?.toLocaleLowerCase() &&
          p.productType.name.toLocaleLowerCase() === type?.toLocaleLowerCase()
        );
      }
      if (
        search !== "" &&
        type !== null &&
        man !== null &&
        p.manufacturer !== null &&
        p.productType !== null
      ) {
        return (
          p.manufacturer.name.toLocaleLowerCase() ===
            man?.toLocaleLowerCase() &&
          p.productType.name.toLocaleLowerCase() ===
            type?.toLocaleLowerCase() &&
          p.name.toLocaleLowerCase() === search.toLocaleLowerCase()
        );
      }
      return products;
    });

    if (newFilteredProducts.length > 0) {
      setFilteredProducts(newFilteredProducts);
    } else {
      setFilteredProducts([]);
    }
  }, [search, type, man]);

  return (
    <div className={classes.root}>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          Uspesno obrisan proizvod!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openAlertError}
        autoHideDuration={6000}
        onClose={handleCloseAlertError}
      >
        <Alert onClose={handleCloseAlertError} severity="warning">
          Nije moguce obrisati proizvod.
        </Alert>
      </Snackbar>
      <Grid container>
        <Grid
          container
          className={classes.search}
          style={{ marginBottom: "1%" }}
        >
          <Grid
            item
            xs={2}
            className={classes.searchItem}
            style={{ margin: "auto", flex: "unset" }}
          >
            <label className={classes.label}>Pretraga:</label>
          </Grid>
          <Grid item xs={3} className={classes.searchItem}>
            <TextField
              label="Naziv proizvoda"
              margin="normal"
              variant="outlined"
              style={{ width: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>
          <Grid item xs={3} className={classes.searchItem}>
            <Autocomplete
              id="grouped-demo-manufacturer"
              options={manufacturer?.map((m) => m.name)}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Proizvodjac"
                  margin="normal"
                  variant="outlined"
                />
              )}
              onChange={(event: any, value: string | null) => setMan(value)}
            />
          </Grid>
          <Grid item xs={3} className={classes.searchItem}>
            <Autocomplete
              id="grouped-demo-type"
              options={productType?.map((p) => p.name)}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tip proizvoda"
                  margin="normal"
                  variant="outlined"
                />
              )}
              onChange={(event: any, value: string | null) => setType(value)}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={10}></Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              startIcon={<PictureAsPdfIcon />}
              onClick={handlePrint}
              className={classes.pdf}
            >
              PDF
            </Button>
          </Grid>
        </Grid>
        <TableContainer component={Paper} className={classes.paper}>
          <Table className={classes.table} ref={componentRef}>
            <TableHead>
              <TableRow>
                <StyledTableCell>Slika</StyledTableCell>
                <StyledTableCell align="right">Naziv proizvoda</StyledTableCell>
                <StyledTableCell align="right">Proizvodjac</StyledTableCell>
                <StyledTableCell align="right">Kategorija</StyledTableCell>
                <StyledTableCell align="right">Cena</StyledTableCell>
                <StyledTableCell align="right">Karakteristike</StyledTableCell>
                <StyledTableCell align="right">Obrisi/Izmeni</StyledTableCell>
              </TableRow>
            </TableHead>
            {filteredProducts?.length > 0 ? (
              <TableBody>
                {filteredProducts?.map((row: Product) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row" align="center">
                      <img src={row.imageUrl} alt="slika_proizvoda" style={{width: "100px", height: "100px"}}/>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row?.manufacturer?.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row?.productType?.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row?.price}
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      <IconButton>
                        <InfoIcon
                          onClick={() => {
                            setProduct(Number(row?.id));
                            handleClickOpen();
                          }}
                        />
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        onClick={() => handleDelete(row?.id)}
                        startIcon={
                          <DeleteIcon color="inherit" fontSize="large" />
                        }
                      />
                      <Button
                        onClick={() => handleEditProduct(row?.id)}
                        startIcon={
                          <EditIcon color="inherit" fontSize="large" />
                        }
                        component={Link}
                        to="/home/admin/manageProducts"
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            ) : (
              <h3 style={{ marginLeft: "15px" }}>
                Ne postoje proizvodi po zadatom kriterijumu!
              </h3>
            )}
          </Table>
        </TableContainer>
      </Grid>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        style={{ height: "100%" }}
      >
        <DialogTitle id="alert-dialog-slide-title">
          Karakteristike proizvoda
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Naziv</TableCell>
                  <TableCell align="right">Vrednost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {chosenProduct?.characteristics.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Zatvori
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ViewProducts;
