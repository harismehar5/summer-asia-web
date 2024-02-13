import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Paper } from "@material-ui/core";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import { Button } from "@mui/material";
import axios from "axios";
import { ADD_PRODUCT } from "../../utils/config";
import SnackBar from "../../components/alert/SnackBar";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("")
  const [packing, setPacking] = useState("")
  const [strength, setStrength] = useState("")
  const [tradeRate, setTradeRate] = useState("")
  const [purchaseRate, setPurchaseRate] = useState("")
  const [maximumRetailPrice, setMaximumRetailPrice] = useState("")
  const [distributerPrice, setDistributerPrice] = useState("")

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  var product = {
    "companyCode": "",
    "code": "",
    "name": "",
    "packing": "",
    "strength": "",
    "tradeRate": "",
    "purchaseRate": "",
    "maximumRetailPrice": "",
    "distributerPrice": ""
  };
  const addProduct = () => {
    product = {
      "code": code,
      "name": name,
      "packing": packing,
      "strength": strength,
      "tradeRate": tradeRate,
      "purchaseRate": purchaseRate,
      "maximumRetailPrice": maximumRetailPrice,
      "distributerPrice": distributerPrice
    };
    axios
      .post(ADD_PRODUCT, product)
      .then(function (response) {
        console.log(response)
        // if (response.data.error) {
        //   setOpen(true);
        //   setMessage(response.data.error_msg);
        //   setSeverity("error");
        // } else {
        setOpen(true);
        // setMessage(response.data.success_msg);
        setSeverity("success");
        setName("");
        setCode("")
        setName("")
        setPacking("")
        setStrength("")
        setTradeRate("")
        setPurchaseRate("")
        setMaximumRetailPrice("")
        setDistributerPrice("")
        // }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };
  const validation = () => {
    if (name.length === 0) {
      setOpen(true);
      setMessage("Name is required");
      setSeverity("error");
    } else {
      addProduct();
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
            Add Product
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
            <Grid item xs={12} sm={12}>
              <TextField
                required
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
                label="Packing"
                fullWidth
                variant="outlined"
                value={packing}
                onChange={(event) => setPacking(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Strength"
                fullWidth
                variant="outlined"
                value={strength}
                onChange={(event) => setStrength(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Trade Rate"
                fullWidth
                variant="outlined"
                value={tradeRate}
                onChange={(event) => setTradeRate(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Purchase Rate"
                fullWidth
                variant="outlined"
                value={purchaseRate}
                onChange={(event) => setPurchaseRate(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Retail Price (Max)"
                fullWidth
                variant="outlined"
                value={maximumRetailPrice}
                onChange={(event) => setMaximumRetailPrice(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Distributer Price"
                fullWidth
                variant="outlined"
                value={distributerPrice}
                onChange={(event) => setDistributerPrice(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
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
                    onClick={() => setName("")}
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
