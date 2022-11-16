import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Paper } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import { Autocomplete, Box, Button } from "@mui/material";
import axios from "axios";
import {
  ADD_SUPPLIER_CASH_IN,
  ADD_SUPPLIER_CASH_OUT,
  GET_SUPPLIERS_LIST,
} from "../../utils/config";
import SnackBar from "../../components/alert/SnackBar";

export default function AddSupplierCashOut() {
  const [supplierList, setSupplierList] = useState([]);
  const [supplierObject, setSupplierObject] = useState({});
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [submittedDate, setSubmittedDate] = useState("");
  const paymentMediumList = [
    {
      id: 1,
      name: "Bank Transfer",
    },
    {
      id: 2,
      name: "By Hand",
    },
    {
      id: 3,
      name: "Jazz Cash/Easy Paisa ",
    },
    {
      id: 4,
      name: "By Someone",
    },
  ];
  const [paymentMediumObject, setPaymentMediumObject] = useState({});
  //   const [status, setStatus] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}/${month}/${year}`;

  var cashOut = {
    amount: "",
    description: "",
    payment_medium: "",
    submit_date: "",
    cash_type: "",
  };

  useEffect(() => {
    getSuppliersList();
  }, []);
  const addCashOut = () => {
    cashOut = {
      amount: amount,
      description: description,
      payment_medium: paymentMediumObject.name,
      submit_date: submittedDate,
      cash_type: "Cash Out",
    };
    axios
      .patch(ADD_SUPPLIER_CASH_OUT+supplierObject._id, cashOut)
      .then(function (response) {
        if (response.data.error) {
          console.log(response.data.error_msg);
          setOpen(true);
          setMessage(response.data.error_msg);
          setSeverity("error");
        } else {
          console.log(response);
          setOpen(true);
          setMessage(response.data.success_msg);
          setSeverity("success");
        }
      })
      .catch(function (error) {
        console.log("error: " + error);
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };

  const validation = () => {
    if (
      amount.length === 0 ||
      paymentMediumObject === {} ||
      submittedDate.length === 0 ||
      supplierObject === {}
    ) {
      <Alert severity="error">Some Fields are missing</Alert>;
    } else if (parseInt(amount) <= 0) {
      <Alert severity="error">Amount should be greater then 0</Alert>;
    } else {
      addCashOut();
    }
  };
  const getSuppliersList = () => {
    axios
      .get(GET_SUPPLIERS_LIST)
      .then(function (response) {
        if (response.data.error) {
          console.log(response.data.error_msg);
          setOpen(true);
          setMessage(response.data.error_msg);
          setSeverity("error");
        } else {
          setSupplierList(response.data.suppliers);
        }
      })
      .catch(function (error) {
        console.log("error: " + error);
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <div className="box">
      <SideBar />
      <div className="box-container">
        <Navbar />
        <Paper className="form-container">
          <Typography variant="h6" gutterBottom>
            Add Cash Out
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                options={supplierList}
                getOptionLabel={(supplier, index) => supplier.name}
                disablePortal
                fullWidth
                isOptionEqualToValue={(option, value) =>
                  option._id === value._id
                }
                onChange={(event, newInputValue) => {
                  setSupplierObject(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Supplier" />
                )}
                renderOption={(props, supplier) => (
                  <Box component="li" {...props} key={supplier._id}>
                    {supplier.name}
                  </Box>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="amount"
                label="Amount"
                fullWidth
                variant="outlined"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={paymentMediumList}
                getOptionLabel={(payment, index) => payment.name}
                disablePortal
                fullWidth
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, newInputValue) => {
                  setPaymentMediumObject(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Payment Medium" />
                )}
                renderOption={(props, payment) => (
                  <Box component="li" {...props} key={payment.id}>
                    {payment.name}
                  </Box>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Select Date"
                type="date"
                defaultValue={currentDate}
                onChange={(event) => {
                  console.log(event.target.value);
                  setSubmittedDate(event.target.value);
                }}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="description"
                label="Description"
                fullWidth
                variant="outlined"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Grid>
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
                    onClick={() => validation()}
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" size="medium" color="error">
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
