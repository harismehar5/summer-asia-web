import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

// import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { expenseColumns } from "../../dataTableColumns";

import {
  EXPENSE_BASE_URL,
  EXPENSE_CATAGORY_BASE_URL,
} from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";
import SnackBar from "../../components/alert/SnackBar";
import Popup from "../../components/popup/Popup";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

export default function GetExpensesList() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [catagoryName, setCatagoryName] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedCatagory, setSelectedCatagory] = useState("");
  var expense = {
    name: "",
    amount: "",
    description: "",
  };

  useEffect(() => {
    getExpensesList();
    getExpenseCatagoryList();
  }, []);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cell-action">
            <IconButton
              aria-label="edit"
              size="medium"
              onClick={() => editExpense(params.row)}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="medium"
              onClick={() => deleteExpense(params.row._id)}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const getExpenseCatagoryList = () => {
    axios
      .get(EXPENSE_CATAGORY_BASE_URL)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage("");
          setSeverity("error");
        } else {
          setCatagoryName(response.data.data);
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };
  const getExpensesList = () => {
    axios
      .get(EXPENSE_BASE_URL)
      .then(function (response) {
        // console.log(JSON.stringify(response, null, 2));
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error);
          setSeverity("error");
        } else {
          // console.log(response.data.data);
          setData(response.data.data);
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };
  const deleteExpense = (id) => {
    axios
      .delete(EXPENSE_BASE_URL + "/" + id)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error);
          setSeverity("error");
        } else {
          setOpen(true);
          setMessage(response.data.message);
          setSeverity("success");
       
          // Update the data state after successful deletion
          setData((prevData) => prevData.filter(item => item._id !== id));
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage(error);
        setSeverity("error");
      });
  };
  const updateExpense = () => {
    expense = {
      expenseCategory: selectedCatagory,
      amount: amount,
      description: description,
    };
    axios
      .put(EXPENSE_BASE_URL + "/" + id, expense)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error);
          setSeverity("error");
        } else {
          setOpen(true);
          setMessage("Data Updated Successfully ");
          setSeverity("success");
          setName("");
          setAmount("");
          setDescription("");
          setId("");
          setOpenPopup(false);
          getExpensesList();

            // Update the data state after successful update
            setData((prevData) =>
            prevData.map(item => (item._id === id ? { ...item, ...expense } : item))
          );
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
      setMessage("Some fields are missing");
      setSeverity("error");
    } else {
      updateExpense();
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const editExpense = (expense) => {
    setOpenPopup(true);
    setName(expense?.expenseCategory?.name);
    setDescription(expense.description);
    setAmount(expense.amount);
    setId(expense._id);
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setName(event.target.value);

    const selectedItem = catagoryName.find(
      (item) => item.name === selectedValue
    );

    setSelectedCatagory(selectedItem._id);
    if (selectedItem) {
      const selectedId = selectedItem._id;
      setSelectedId(selectedId);
    }
  };
  return (
    <div className="list">
      <Sidebar />
      <div className="list-container">
        <Navbar />
        <ListHeader
          header={"Expenses List"}
          firstButton={true}
          firstButtonText={"Add Expense"}
          firstLink={"/expense/add"}
        />
        <DataTable
          data={data}
          columns={expenseColumns.concat(actionColumn)}
          isForTransaction={false}
        />
        <Popup
          title="Expense Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <Grid container spacing={3}>
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
              </Select>
            </FormControl>

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
                    Update
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Popup>
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
