import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Paper } from "@material-ui/core";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import axios from "axios";

import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import {
  EXPENSE_BASE_URL,
  EXPENSE_CATAGORY_BASE_URL,
} from "../../utils/config";
import SnackBar from "../../components/alert/SnackBar";

export default function AddExpense() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [catagoryName, setCatagoryName] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    getExpenseCatagoryList();
  }, []);

  const getExpenseCatagoryList = () => {
    axios
      .get(EXPENSE_CATAGORY_BASE_URL)
      .then(function (response) {
        console.log("response ==", JSON.stringify(response, null, 2));
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error_msg);
          setSeverity("error");
        } else {
          // console.log(response.data.data);
          setCatagoryName(response.data.data);
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };
  const addExpense = () => {
    let payload = {
      expenseCategory: selectedId,
      amount: amount,
      description: description,
    };

    axios
      .post(EXPENSE_BASE_URL, payload)
      .then(function (response) {
        if (response.status === 200) {
          setOpen(true);
          setMessage(response.data.message);
          setSeverity("success");
          setName("");
          setAmount("");
          setDescription("");
        } else {
          setOpen(true);
          setMessage(response.error_msg);
          setSeverity("error");
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
      // getExpenseCatagoryList();
      // console.log(catagoryName);
      addExpense();
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setName(event.target.value);
    // You can perform additional actions with the selected value if needed
    // For example, you can find the corresponding item in your data array and do something with it
    const selectedItem = catagoryName.find(
      (item) => item.name === selectedValue
    );
    if (selectedItem) {
      // Do something with the selected item or its _id
      const selectedId = selectedItem._id;
      console.log("Selected ID:", selectedId);
      setSelectedId(selectedId);
    }
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
              {/* <TextField
                required
                id="name"
                name="name"
                label="Name"
                fullWidth
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
              /> */}

              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="name-label">Name</InputLabel>
                <Select
                  labelId="name-label"
                  id="name"
                  label="Name"
                  value={name}
                  onChange={handleSelectChange}
                >
                  {catagoryName.map((item) => (
                    <MenuItem value={item.name}>{item.name}</MenuItem>
                  ))}

                  {/* Add more MenuItem components as needed */}
                </Select>
              </FormControl>
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
