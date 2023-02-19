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
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  var product = {
    name: "",
    price: "",
    quantity: "",
  };
  const addProduct = () => {
    product = {
      name: name,
      price: 0,
      quantity: 0,
    };
    axios
      .post(ADD_PRODUCT, product)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error_msg);
          setSeverity("error");
        } else {
          setOpen(true);
          setMessage(response.data.success_msg);
          setSeverity("success");
          setName("");
        }
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
