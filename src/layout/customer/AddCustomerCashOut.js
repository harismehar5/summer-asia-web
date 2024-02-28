import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Paper } from "@material-ui/core";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import { Autocomplete, Box, Button, FormHelperText } from "@mui/material";
import axios from "axios";
import {
  GET_ALL_COMPANIES,
  GET_CUSTOMERS_CASH_OUT,
  GET_CUSTOMERS_LIST,
} from "../../utils/config";
import SnackBar from "../../components/alert/SnackBar";

export default function AddCustomerCashOut() {
  const [customerList, setCustomerList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState("customer");
  const [selectedList, setSelectedList] = useState([]);
  const [customerObject, setCustomerObject] = useState({});
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [paymentMediumObject, setPaymentMediumObject] = useState({});

  // Error States
const [customerObjectError, setCustomerObjectError] = useState("");
const [amountError, setAmountError] = useState("");
const [descriptionError, setDescriptionError] = useState("");
const [paymentMediumObjectError, setPaymentMediumObjectError] = useState("");


  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  useEffect(() => {
    if (selectedRadio === "customer") {
      getCustomersList();
    } else if (selectedRadio === "company") {
      getCompanyList();
    }
  }, [selectedRadio]);

  const addCashIn = () => {
    const cashIn = {
      credit: amount,
      description: description,
      paymentMode: paymentMediumObject.name,
      [selectedRadio === "customer" ? "customerId" : "companyId"]:
        customerObject._id,
    };
    axios
      .post(GET_CUSTOMERS_CASH_OUT, cashIn)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error);
          setSeverity("error");
        } else {
          setOpen(true);
          setMessage(response.data.message);
          setSeverity("success");
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };

  // const validation = () => {
  //   if (amount.trim() === "" || !paymentMediumObject || !customerObject) {
  //     return <Alert severity="error">Some Fields are missing</Alert>;
  //   } else if (parseInt(amount) <= 0) {
  //     return <Alert severity="error">Amount should be greater than 0</Alert>;
  //   } else {
  //     addCashIn();
  //   }
  // };
  const validation = () => {
    setCustomerObjectError("");
    setAmountError("");
    setDescriptionError("");
    setPaymentMediumObjectError("");
    let isValid = true;
  
    if (!customerObject || !customerObject.name || customerObject.name.trim() === "") {
      setCustomerObjectError("Enter customer/company");
      isValid = false;
    }
    if (!amount || amount.trim() === "") {
      setAmountError("Enter debit/credit");
      isValid = false;
    }
    if (!description || description.trim() === "") {
      setDescriptionError("Enter description");
      isValid = false;
    }
    if (!paymentMediumObject || !paymentMediumObject.name || paymentMediumObject.name.trim() === "") {
      setPaymentMediumObjectError("Enter payment medium");
      isValid = false;
    }
  
    if (isValid) {
      addCashIn();
    } else {
      handleSnackbar("error", "Enter valid values!");
    }
  };
  

  const handleSnackbar = (severity, message) => {
    setOpen(true);
    setSeverity(severity);
    setMessage(message);
  };

  const getCustomersList = () => {
    axios
      .get(GET_CUSTOMERS_LIST)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error);
          setSeverity("error");
        } else {
          setCustomerList(response.data.data);
          setSelectedList(response.data.data);
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };

  const getCompanyList = () => {
    axios
      .get(GET_ALL_COMPANIES)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error);
          setSeverity("error");
        } else {
          setCompanyList(response.data.data);
          setSelectedList(response.data.data);
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };

  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value);
    setCustomerObject({});
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
              <div>
                <label>
                  <input
                    type="radio"
                    value="customer"
                    checked={selectedRadio === "customer"}
                    onChange={handleRadioChange}
                  />
                  Customer
                </label>
                <span style={{ marginRight: "10px" }}></span>{" "}
                <label>
                  <input
                    type="radio"
                    value="company"
                    checked={selectedRadio === "company"}
                    onChange={handleRadioChange}
                  />
                  Company
                </label>
              </div>
            </Grid>

            <Grid item xs={12} sm={12}>
              {selectedList && selectedList.length > 0 ? (
                <>
                <Autocomplete
                  options={selectedList}
                  getOptionLabel={(item) => item.name}
                  disablePortal
                  fullWidth
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  onChange={(event, newInputValue) => {
                    setCustomerObject(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField  
  required
                      {...params}
                      label={
                        selectedRadio === "customer"
                          ? "Select Customer"
                          : "Select Company"
                      }
                    />
                  )}
                  renderOption={(props, item) => (
                    <Box component="li" {...props} key={item._id}>
                      {item.name}
                    </Box>
                  )}
                />
                  <FormHelperText style={{ color: "red" }}>{customerObjectError}</FormHelperText>
                  </>
              ) : (
                <Typography variant="body2">
                  No {selectedRadio} data available.
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField  
  required
                name={selectedRadio === "customer" ? "debit" : "credit"}
                label={selectedRadio === "customer" ? "Debit" : "Credit"}
                fullWidth
                type="number"
                variant="outlined"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
              <FormHelperText style={{ color: "red" }}>{amountError}</FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={[
                  { id: 1, name: "Cash" },
                  { id: 2, name: "Bank" },
                  { id: 3, name: "Cheque" },
                  { id: 4, name: "Other" },
                ]}
                getOptionLabel={(payment) => payment.name}
                disablePortal
                fullWidth
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, newInputValue) => {
                  setPaymentMediumObject(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField  
  required {...params} label="Select Payment Medium" />
                )}
                renderOption={(props, payment) => (
                  <Box component="li" {...props} key={payment.id}>
                    {payment.name}
                  </Box>
                )}
              />
               <FormHelperText style={{ color: "red" }}>{paymentMediumObjectError}</FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField  
  required
                name="description"
                label="Description"
                fullWidth
                variant="outlined"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <FormHelperText style={{ color: "red" }}>{descriptionError}</FormHelperText>
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
