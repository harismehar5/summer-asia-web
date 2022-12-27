import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Paper } from "@material-ui/core";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import { Alert, Button } from "@mui/material";
import axios from "axios";
import { ADD_SUPPLIER } from "../../utils/config";
import SnackBar from "../../components/alert/SnackBar";

export default function AddSupplier() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [openingBalance, setOpeningBalance] = useState("");
  const [status, setStatus] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  var supplier = {
    name: "",
    phone: "",
    address: "",
    opening_balance: "",
  };
  const addSupplier = () => {
    supplier = {
      name: name,
      phone: phone,
      address: address,
      opening_balance: openingBalance,
    };
    axios
      .post(ADD_SUPPLIER, supplier)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error_msg);
          setSeverity("error");
        } else {
          setOpen(true);
          setMessage(response.data.success_msg);
          setSeverity("success");
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage(error);
        setSeverity("error");
      });
  };
  const validation = () => {
    if (
      name.length === 0 ||
      phone.length === 0 ||
      address.length === 0 ||
      openingBalance.length === 0
    ) {
      setOpen(true);
      setMessage("Some fields are missing");
      setSeverity("error");
    } else {
      addSupplier();
    }
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
            Add Supplier
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="phone"
                name="phone"
                label="Phone"
                fullWidth
                variant="outlined"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="address"
                name="address"
                label="Address"
                fullWidth
                variant="outlined"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="openingBalance"
                name="openingBalance"
                label="Opening Balance"
                fullWidth
                variant="outlined"
                value={openingBalance}
                onChange={(event) => setOpeningBalance(event.target.value)}
              />
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
