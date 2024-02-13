import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Paper } from "@mui/material";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import SnackBar from "../../components/alert/SnackBar";
import { GET_AREA_LIST, GET_PURCHASERETURN } from "../../utils/config";

export default function AddPurchaseReturn() {
  const [productCode, setProductCode] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [expiryDate, setExpiryDate] = useState("");
  const [bonus, setBonus] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [batchCode, setBatchCode] = useState("");
  const [salesTax, setSalesTax] = useState(0);
  const [tradeRate, setTradeRate] = useState(0);
  const [netTotal, setNetTotal] = useState(0);

  const [customerCode, setCustomerCode] = useState("");
  const [salesman, setSalesman] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [total, setTotal] = useState(0);

  const [areas, setAreas] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  useEffect(() => {
    axios
      .get(GET_AREA_LIST)
      .then((response) => {
        setAreas(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching areas:", error);
      });
  }, []);

  const addPurchaseReturn = () => {
    const purchaseReturnData = {
      productCode,
      quantity,
      expiryDate,
      bonus,
      discount,
      batchCode,
      salesTax,
      tradeRate,
      netTotal,
      customerCode,
      salesman,
      paymentMode,
      total,
    };

    axios
      .post(GET_PURCHASERETURN, purchaseReturnData)
      .then(function (response) {
        if (response.data.error) {
          handleSnackbar("error", response.data.error);
        } else {
          handleSnackbar("success", response.data.success);
          resetForm();
        }
        console.log("New Data Success :", purchaseReturnData);
        console.log("Success Message :", response.data.message);
      })
      .catch(function (error) {
        console.error("Error adding purchase return:", error);
        handleSnackbar("error", error.response.data.error);
      });
  };

  const validation = () => {
    if (
      !productCode ||
      !quantity ||
      !expiryDate ||
      !bonus ||
      !discount ||
      !batchCode ||
      !salesTax ||
      !tradeRate ||
      !netTotal ||
      !customerCode ||
      !salesman ||
      !paymentMode ||
      !total
    ) {
      handleSnackbar("error", "All fields are required");
    } else {
      addPurchaseReturn();
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
    setProductCode("");
    setQuantity(0);
    setExpiryDate("");
    setBonus(0);
    setDiscount(0);
    setBatchCode("");
    setSalesTax(0);
    setTradeRate(0);
    setNetTotal(0);
    setCustomerCode("");
    setSalesman("");
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
            Add Purchase Return
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={4} sm={3}>
              <TextField
                required
                id="productCode"
                name="productCode"
                label="Product Code"
                fullWidth
                variant="outlined"
                value={productCode}
                onChange={(event) => setProductCode(event.target.value)}
              />
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
              <TextField
                required
                id="customerCode"
                name="customerCode"
                label="Customer Code"
                fullWidth
                variant="outlined"
                value={customerCode}
                onChange={(event) => setCustomerCode(event.target.value)}
              />
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
