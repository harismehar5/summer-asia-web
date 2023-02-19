import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Paper } from "@material-ui/core";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import { Button } from "@mui/material";
import axios from "axios";
import { STOCK_IN } from "../../utils/config";
import SnackBar from "../../components/alert/SnackBar";

export default function StockIn() {
  const [quantity, setQuantity] = useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  var product = {
    quantity: "",
  };
  const addProduct = () => {
    product = {
      quantity: quantity,
    };
    axios
      .post(STOCK_IN, product)
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
        setMessage("error: " + error);
        setSeverity("error");
      });
  };
  const validation = () => {
    if (quantity.length === 0) {
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
            Stock In
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                label="Quantity"
                fullWidth
                variant="outlined"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
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
