import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Paper, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import SnackBar from "../../components/alert/SnackBar";
import { GET_ALL_PRODUCTS, GET_CUSTOMERS_LIST, GET_SALESMEN_LIST, GET_SALESRETURN_LIST } from "../../utils/config";

export default function AddSaleReturn() {
  const [productCode, setProductCode] = useState({});
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [expiryDate, setExpiryDate] = useState("");
  const [bonus, setBonus] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [batchCode, setBatchCode] = useState("");
  const [salesTax, setSalesTax] = useState(0);
  const [tradeRate, setTradeRate] = useState(0);
  const [netTotal, setNetTotal] = useState(0);
  const [customerCode, setCustomerCode] = useState("");
  const [selectedSalesman, setSelectedSalesman] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [customers, setCustomers] = useState([]);
  const [salesmen, setSalesmen] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(GET_SALESMEN_LIST)
      .then((response) => {
        console.log("Salesmen API response:", response.data);
        setSalesmen(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching salesmen:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(GET_CUSTOMERS_LIST)
      .then((response) => {
        console.log("CUSTOMERS API response:", response.data);
        setCustomers(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(GET_ALL_PRODUCTS)
      .then((response) => {
        console.log("PRODUCTS API response:", response.data);
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const addSaleReturn = () => {
    const saleReturnData = {
      productCode: selectedProduct,
      quantity,
      expiryDate,
      bonus,
      discount,
      batchCode,
      salesTax,
      tradeRate,
      netTotal,
      customerCode,
      salesmen: selectedSalesman,
      paymentMode,
      total,
    };

    axios
      .post(GET_SALESRETURN_LIST, saleReturnData)
      .then(function (response) {
        if (response.data.error) {
          handleSnackbar("error", response.data.error);
        } else {
          handleSnackbar("success", response.data.success);
          resetForm();
        }
        console.log("New Data Success :", saleReturnData);
        console.log("Success Message :", response.data.message);
      })
      .catch(function (error) {
        console.error("Error adding sale return:", error);
        handleSnackbar("error", error.response.data.error);
      });
  };

  const validation = () => {
    if (
      !selectedProduct ||
      !quantity ||
      !expiryDate ||
      !bonus ||
      !discount ||
      !batchCode ||
      !salesTax ||
      !tradeRate ||
      !netTotal ||
      !customerCode ||
      !selectedSalesman ||
      !paymentMode ||
      !total
    ) {
      handleSnackbar("error", "All fields are required");
    } else {
      addSaleReturn();
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "click away") {
      return;
    }
    setOpen(false);
  };

  const handleSnackbar = (severity, message) => {
    setOpen(true);
    setSeverity(severity);
    setMessage(message);
  };

  const resetForm = () => {
    setProductCode({});
    setSelectedProduct("");
    setQuantity(0);
    setExpiryDate("");
    setBonus(0);
    setDiscount(0);
    setBatchCode("");
    setSalesTax(0);
    setTradeRate(0);
    setNetTotal(0);
    setCustomerCode("");
    setSelectedSalesman("");
    setPaymentMode("");
    setTotal(0);
  };

  return (
    <div className="box">
      <SideBar />
      <div className="box-container">
        <Navbar />
        <Paper className="form-container">
          <Typography variant="h6" gutterBottom>
            Add SaleReturn
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={4} sm={3}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="productCode-label">Product Code</InputLabel>
                <Select
                  labelId="productCode-label"
                  id="productCode"
                  value={selectedProduct}
                  onChange={(event) => setSelectedProduct(event.target.value)}
                  label="Product Code"
                >
                  {products.map((product) => (
                    <MenuItem key={product._id} value={product._id}>
                      {product.code}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} sm={3}>
              <TextField
                required
                id="quantity"
                name="quantity"
                label="Quantity"
                fullWidth
                type="number"
                variant="outlined"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
              />
            </Grid>
            <Grid item xs={4} sm={3}>
              <TextField
                required
                id="expiryDate"
                name="expiryDate"
                label="Expiry Date"
                fullWidth
                type="date"
                variant="outlined"
                value={expiryDate}
                onChange={(event) => setExpiryDate(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={4} sm={3}>
              <TextField
                required
                id="bonus"
                name="bonus"
                label="Bonus"
                fullWidth
                type="number"
                variant="outlined"
                value={bonus}
                onChange={(event) => setBonus(event.target.value)}
              />
            </Grid>
            <Grid item xs={4} sm={3}>
              <TextField
                required
                id="discount"
                name="discount"
                label="Discount"
                fullWidth
                type="number"
                variant="outlined"
                value={discount}
                onChange={(event) => setDiscount(event.target.value)}
              />
            </Grid>
            <Grid item xs={4} sm={3}>
              <TextField
                required
                id="batchCode"
                name="batchCode"
                label="Batch Code"
                fullWidth
                variant="outlined"
                value={batchCode}
                onChange={(event) => setBatchCode(event.target.value)}
              />
            </Grid>
            <Grid item xs={4} sm={3}>
              <TextField
                required
                id="salesTax"
                name="salesTax"
                label="Sales Tax"
                fullWidth
                type="number"
                variant="outlined"
                value={salesTax}
                onChange={(event) => setSalesTax(event.target.value)}
              />
            </Grid>
            <Grid item xs={4} sm={3}>
              <TextField
                required
                id="tradeRate"
                name="tradeRate"
                label="Trade Rate"
                fullWidth
                type="number"
                variant="outlined"
                value={tradeRate}
                onChange={(event) => setTradeRate(event.target.value)}
              />
            </Grid>
            <Grid item xs={4} sm={3}>
              <TextField
                required
                id="netTotal"
                name="netTotal"
                label="Net Total"
                fullWidth
                type="number"
                variant="outlined"
                value={netTotal}
                onChange={(event) => setNetTotal(event.target.value)}
              />
            </Grid>
            <Grid item xs={4} sm={3}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="customerCode-label">Customer Code</InputLabel>
                <Select
                  labelId="customerCode-label"
                  id="customerCode"
                  value={customerCode}
                  onChange={(event) => setCustomerCode(event.target.value)}
                  label="Customer Code"
                >
                  {customers.map((customerItem) => (
                    <MenuItem key={customerItem._id} value={customerItem._id}>
                      {customerItem.code}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} sm={3}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="salesmen-label">Salesman</InputLabel>
                <Select
                  labelId="salesmen-label"
                  id="salesmen"
                  value={selectedSalesman}
                  onChange={(event) => setSelectedSalesman(event.target.value)}
                  label="Salesman"
                >
                  {salesmen.map((salesmanItem) => (
                    <MenuItem key={salesmanItem._id} value={salesmanItem._id}>
                      {salesmanItem.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} sm={3}>
              <TextField
                required
                id="paymentMode"
                name="paymentMode"
                label="Payment Mode"
                fullWidth
                variant="outlined"
                value={paymentMode}
                onChange={(event) => setPaymentMode(event.target.value)}
              />
            </Grid>
            <Grid item xs={4} sm={3}>
              <TextField
                required
                id="total"
                name="total"
                label="Total"
                fullWidth
                type="number"
                variant="outlined"
                value={total}
                onChange={(event) => setTotal(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={12}>
              <Grid
                justifyContent={"flex-end"}
                container
                spacing={1}
                direction={"row"}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    size="medium"
                    color="success"
                    onClick={validation}
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    size="medium"
                    color="error"
                    // onClick={() => setOpenPopup(false)}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <SnackBar
          open={open}
          severity={severity}
          message={message}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
}
