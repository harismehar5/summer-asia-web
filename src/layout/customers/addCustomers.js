import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  Button,
  MenuItem,
  Paper,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import SnackBar from "../../components/alert/SnackBar";
import { GET_CUSTOMERS_LIST, GET_AREA_LIST } from "../../utils/config";

export default function AddCustomers() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [ntn, setNtn] = useState("");
  const [email, setEmail] = useState("");
  const [license, setLicense] = useState("");
  const [licenseExpiryDate, setLicenseExpiryDate] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [code, setCode] = useState("");
  const [areas, setAreas] = useState([]);
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [ntnError, setNtnError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [licenseError, setLicenseError] = useState("");
  const [licenseExpiryDateError, setLicenseExpiryDateError] = useState("");
  const [areaCodeError, setAreaCodeError] = useState("");
  const [bankAccountError, setBankAccountError] = useState("");
  const [codeError, setCodeError] = useState("");
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
        // console.error("Error fetching areas:", error);
      });
  }, []);

  const handleExpiryDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();

    // Check if the selected date is before the current date
    if (selectedDate < currentDate) {
      // Provide feedback to the user, for example:
      alert("Please select a future date.");

      // Set the input value back to the current date
      // setExpiryDate(currentDate.toISOString().split("T")[0]);
      return;
    } else {
      // Update the state if the selected date is valid
      setLicenseExpiryDate(event.target.value);
    }
  };

  const addCustomer = () => {
    const customerData = {
      name: name,
      phone: phone,
      address: address,
      ntn: ntn,
      email: email,
      license: license,
      licenseExpiryDate: licenseExpiryDate,
      areaCode: areaCode,
      bankAccount: bankAccount,
      code: code,
    };

    axios
      .post(GET_CUSTOMERS_LIST, customerData)
      .then(function (response) {
        if (response.data.error) {
          handleSnackbar("error", response.data.error);
        } else {
          handleSnackbar("success", response.data.message);
          resetForm();
        }
      })
      .catch(function (error) {
        // console.error("Error adding customer:", error);
        handleSnackbar("error", error.response.data.error);
      });
  };

  const validation = () => {
    setNameError("");
    setPhoneError("");
    setAddressError("");
    setNtnError("");
    setEmailError("");
    setLicenseError("");
    setLicenseExpiryDateError("");
    setAreaCodeError("");
    setBankAccountError("");
    setCodeError("");

    let isValid = true;

    if (code.trim() === "") {
      setCodeError("Enter code");
      isValid = false;
    }

    if (name.trim() === "") {
      setNameError("Enter name");
      isValid = false;
    }

    if (phone.trim() === "") {
      setPhoneError("Enter phone");
      isValid = false;
    }

    if (address.trim() === "") {
      setAddressError("Enter address");
      isValid = false;
    }

    if (ntn.trim() === "") {
      setNtnError("Enter NTN");
      isValid = false;
    }

    if (email.trim() === "") {
      setEmailError("Enter email");
      isValid = false;
    }

    if (license.trim() === "") {
      setLicenseError("Enter license");
      isValid = false;
    }

    if (licenseExpiryDate.trim() === "") {
      setLicenseExpiryDateError("Enter license expiry date");
      isValid = false;
    }

    if (areaCode.trim() === "") {
      setAreaCodeError("Select area code");
      isValid = false;
    }

    if (bankAccount.trim() === "") {
      setBankAccountError("Enter bank account");
      isValid = false;
    }

    if (isValid) {
      addCustomer();
    } else {
      handleSnackbar("error", "Enter valid values!");
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
    setName("");
    setPhone("");
    setAddress("");
    setNtn("");
    setEmail("");
    setLicense("");
    setLicenseExpiryDate("");
    setAreaCode("");
    setBankAccount("");
    setCode("");
  };

  return (
    <div className="box">
      <SideBar />
      <div className="box-container">
        <Navbar />
        <Paper className="form-container">
          <Typography variant="h6" gutterBottom>
            Add Customer
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={6} md={6}>
              <TextField
                required
                id="code"
                name="code"
                label="Code"
                fullWidth
                variant="outlined"
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
              <FormHelperText style={{ color: "red" }}>
                {codeError}
              </FormHelperText>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <TextField
                required
                id="name"
                name="name"
                label="Name"
                fullWidth
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <FormHelperText style={{ color: "red" }}>
                {nameError}
              </FormHelperText>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <TextField
                required
                id="phone"
                name="phone"
                label="Phone"
                type="number"
                fullWidth
                variant="outlined"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
              <FormHelperText style={{ color: "red" }}>
                {phoneError}
              </FormHelperText>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <TextField
                required
                id="ntn"
                name="ntn"
                label="NTN"
                fullWidth
                variant="outlined"
                value={ntn}
                onChange={(event) => setNtn(event.target.value)}
              />
              <FormHelperText style={{ color: "red" }}>
                {ntnError}
              </FormHelperText>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <FormHelperText style={{ color: "red" }}>
                {emailError}
              </FormHelperText>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <TextField
                required
                id="license"
                name="license"
                label="License"
                fullWidth
                variant="outlined"
                value={license}
                onChange={(event) => setLicense(event.target.value)}
              />
              <FormHelperText style={{ color: "red" }}>
                {licenseError}
              </FormHelperText>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <TextField
                required
                id="licenseExpiryDate"
                name="licenseExpiryDate"
                label="License Expiry Date"
                type="date"
                fullWidth
                variant="outlined"
                value={licenseExpiryDate}
                // onChange={(event) => setLicenseExpiryDate(event.target.value)}
                onChange={handleExpiryDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormHelperText style={{ color: "red" }}>
                {licenseExpiryDateError}
              </FormHelperText>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="areaCode-label">Area Code</InputLabel>
                <Select
                  labelId="areaCode-label"
                  id="areaCode"
                  value={areaCode}
                  onChange={(event) => setAreaCode(event.target.value)}
                  label="Area Code"
                >
                  {areas.map((area) => (
                    <MenuItem key={area._id} value={area._id}>
                      {area.code}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormHelperText style={{ color: "red" }}>
                {areaCodeError}
              </FormHelperText>
            </Grid>
            <Grid item xs={4} sm={3}>
              <TextField
                required
                id="bankAccount"
                name="bankAccount"
                label="Bank Account"
                fullWidth
                variant="outlined"
                value={bankAccount}
                onChange={(event) => setBankAccount(event.target.value)}
              />
              <FormHelperText style={{ color: "red" }}>
                {bankAccountError}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="address"
                name="address"
                label="Address"
                fullWidth
                variant="outlined"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
              <FormHelperText style={{ color: "red" }}>
                {addressError}
              </FormHelperText>
            </Grid>
            <Grid item xs={6} sm={6} md={6}></Grid>
            <Grid item xs={6} sm={6} md={6}>
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
