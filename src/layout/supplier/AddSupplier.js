import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Paper } from "@material-ui/core";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import { Alert, Button, FormHelperText } from "@mui/material";
import axios from "axios";
import { ADD_COMPANY } from "../../utils/config";
import SnackBar from "../../components/alert/SnackBar";

export default function AddSupplier() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [personName, setPersonName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [license, setLicense] = useState("");
  const [email, setEmail] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  // error states
  const [codeError, setCodeError] = useState("");
  const [nameError, setNameError] = useState("");
  const [personNameError, setPersonNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [licenseError, setLicenseError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [accountNumberError, setAccountNumberError] = useState("");

  const [openingBalance, setOpeningBalance] = useState("");
  const [status, setStatus] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  var supplier = {
    code: "",
    name: "",
    person: "",
    phoneNumber: "",
    description: "",
    license: "",
    address: "",
    email: "",
    accountNumber: "",
  };
  const addSupplier = () => {
    supplier = {
      code: code,
      name: name,
      person: personName,
      phoneNumber: phone,
      description: description,
      license: license,
      address: address,
      email: email,
      accountNumber: accountNumber,
    };

    axios
      .post(ADD_COMPANY, supplier)
      .then(function (response) {
        console.log(response);
        // if (response.data.error) {
        //   setOpen(true);
        //   setMessage(response.data.error_msg);
        //   setSeverity("error");
        // } else {
        setOpen(true);
        // setMessage(response.data.success_msg);
        setSeverity("success");
        setCode("");
        setName("");
        setPhone("");
        setAccountNumber("");
        setPersonName("");
        setDescription("");
        setAddress("");
        setLicense("");
        setEmail("");
        // }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage(error);
        setSeverity("error");
      });
  };
  // const validation = () => {
  //   if (
  //     name.length === 0 ||
  //     phone.length === 0
  //   ) {
  //     setOpen(true);
  //     setMessage("Some fields are missing");
  //     setSeverity("error");
  //   } else {
  //     addSupplier();
  //   }
  // };

  const validation = () => {
    setNameError("");
    setPhoneError("");
    setAddressError("");
    setEmailError("");
    setLicenseError("");
    setCodeError("");
    setDescriptionError("");
    setAccountNumberError("");
    setPersonNameError("");

    let isValid = true;

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

    if (email.trim() === "") {
      setEmailError("Enter email");
      isValid = false;
    }

    if (license.trim() === "") {
      setLicenseError("Enter license");
      isValid = false;
    }

    if (description.trim() === "") {
      setDescriptionError("Enter Descrption");
      isValid = false;
    }

    if (accountNumber.trim() === "") {
      setAccountNumberError("Enter Descrption");
      isValid = false;
    }

    if (personName.trim() === "") {
      setPersonNameError("Enter Account Number");
      isValid = false;
    }

    if (isValid) {
      addSupplier();
    } else {
      handleSnackbar("error", "Enter valid values!");
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
  return (
    <div className="box">
      <SideBar />
      <div className="box-container">
        <Navbar />
        <Paper className="form-container">
          <Typography variant="h6" gutterBottom>
            Add Company
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              {/* <TextField
                required
                label="Company Name"
                fullWidth
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
              /> */}
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                label="Code"
                fullWidth
                variant="outlined"
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                label="Company Name"
                fullWidth
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <FormHelperText style={{ color: "red" }}>
                {nameError}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                label="Contacted Person Name"
                fullWidth
                variant="outlined"
                value={personName}
                onChange={(event) => setPersonName(event.target.value)}
              />
              <FormHelperText style={{ color: "red" }}>
                {personNameError}
              </FormHelperText>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                required
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
            <Grid item xs={12} sm={6}>
              <TextField
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
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                fullWidth
                variant="outlined"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
              <FormHelperText style={{ color: "red" }}>
                {phoneError}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="License Number"
                fullWidth
                variant="outlined"
                value={license}
                onChange={(event) => setLicense(event.target.value)}
              />
              <FormHelperText style={{ color: "red" }}>
                {licenseError}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Account Number"
                fullWidth
                variant="outlined"
                value={accountNumber}
                onChange={(event) => setAccountNumber(event.target.value)}
              />
              <FormHelperText style={{ color: "red" }}>
                {accountNumberError}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Description"
                fullWidth
                variant="outlined"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <FormHelperText style={{ color: "red" }}>
                {descriptionError}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <FormControlLabel
                control={
                  <Checkbox color="secondary" name="status" value="false" />
                }
                label="Status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              /> */}
            </Grid>
            <Grid item xs={12} sm={6}>
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
                  <Button
                    variant="contained"
                    size="medium"
                    color="error"
                    onClick={() => {
                      setName("");
                      setPhone("");
                      setOpeningBalance("");
                    }}
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
