import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, MenuItem, Paper, Select, InputLabel, FormControl } from "@mui/material";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import SnackBar from "../../components/alert/SnackBar";
import { GET_CUSTOMERS_LIST, GET_AREA_LIST } from "../../utils/config";

export default function AddCustomers() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [license, setLicense] = useState("");
  const [licenseExpiryDate, setLicenseExpiryDate] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [code, setCode] = useState("");
  const [areas, setAreas] = useState([]); // New state to store areas data
  const [bankAccount, setBankAccount] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  useEffect(() => {
    // Fetch areas data from the API
    axios
      .get(GET_AREA_LIST)
      .then((response) => {
        setAreas(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching areas:", error);
      });
  }, []); // Run the effect only once on component mount

  const addCustomer = () => {
    const customerData = {
      name: name,
      phone: phone,
      address: address,
      gender: gender,
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
        console.log("New Data :", customerData);
        if (response.data.error) {
          handleSnackbar("error", response.data.error);
        } else {
          handleSnackbar("success", response.data.success);
          resetForm();
        }
        console.log("New Data Success :", customerData);
      })
      .catch(function (error) {
        console.error("Error adding customer:", error);
        handleSnackbar("error",  error.response.data.error);
      });
  };

  const validation = () => {
    if (
      name.length === 0 ||
      phone.length === 0 ||
      address.length === 0 ||
      gender.length === 0 ||
      email.length === 0 ||
      license.length === 0 ||
      licenseExpiryDate.length === 0 ||
      areaCode.length === 0 ||
      bankAccount.length === 0 ||
      code.length === 0
    ) {
      handleSnackbar("error", "All fields are required");
    } else {
      addCustomer();
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
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
    setGender("");
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
          <Grid item xs={4} sm={3}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  value={gender}
                  onChange={(event) => setGender(event.target.value)}
                  label="Gender"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} sm={3}>
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
            </Grid>
            <Grid item xs={4} sm={3}>
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
            </Grid>
            <Grid item xs={4} sm={3}>
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
            </Grid>
            
            <Grid item xs={4} sm={3}>
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
            </Grid>
<<<<<<< HEAD
            <Grid item xs={4} sm={3}>
  <TextField
    required
    id="licenseExpiryDate"
    name="licenseExpiryDate"
    label="License Expiry Date"
    type="date"
    fullWidth
    variant="outlined"
    value={licenseExpiryDate}
    onChange={(event) => setLicenseExpiryDate(event.target.value)}
    InputLabelProps={{
      shrink: true,
    }}
  />
</Grid>
            <Grid item xs={4} sm={3}>
=======
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="licenseExpiryDate"
                name="licenseExpiryDate"
                label="License Expiry Date"
                type="date"
                fullWidth
                variant="outlined"
                value={licenseExpiryDate}
                onChange={(event) => setLicenseExpiryDate(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
>>>>>>> 2ca07db3d10f22476f6bbb51e1d3fe5c0c147488
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
            </Grid>
            <Grid item xs={4} sm={3}>
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
            </Grid>
            <Grid item xs={4} sm={3}></Grid>
            <Grid item xs={4} sm={3}>
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
