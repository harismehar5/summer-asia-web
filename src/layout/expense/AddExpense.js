import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Paper } from "@material-ui/core";
import axios from "axios";

import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import { ADD_EXPENSE } from "../../utils/config";
import SnackBar from "../../components/alert/SnackBar";

export default function AddExpense() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  var expense = {
    name: "",
    amount: "",
    description: "",
  };
  const addExpense = () => {
    expense = {
      name: name,
      amount: amount,
      description: description,
    };
    axios
      .post(ADD_EXPENSE, expense)
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
          setAmount("");
          setDescription("");
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };
  const validation = () => {
    if (name.length === 0 || amount.length === 0 || description.length === 0) {
      setOpen(true);
      setMessage("Amount should be greater then 0");
      setSeverity("success");
    } else {
      addExpense();
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
            Add Expense
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
                id="amount"
                name="amount"
                label="Amount"
                fullWidth
                variant="outlined"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="description"
                name="description"
                label="Description"
                fullWidth
                variant="outlined"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
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
