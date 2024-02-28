import React, { useEffect, useState } from "react";
import { IconButton, Grid, TextField, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { areaColumns } from "../../dataTableColumns";
import { GET_AREA_LIST } from "../../utils/config";
import SnackBar from "../../components/alert/SnackBar";
import Popup from "../../components/popup/Popup";
import ListHeader from "../../components/listHeader/ListHeader";

export default function GetAreaList() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [abbreviation, setAbbreviation] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    refreshData();
  });

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => (
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
      ),
    },
  ];

  const refreshData = () => {
    axios
      .get(GET_AREA_LIST)
      .then(function (response) {
        if (response.data.error) {
          handleSnackbar("error", response.data.error);
        } else {
          setData(response.data.data);
        }
      })
      .catch(function (error) {
        handleSnackbar("error", "Error: " + error);
      });
  };

  const deleteExpense = (id) => {
    axios
      .delete(GET_AREA_LIST + `/${id}`)
      .then(function (response) {
        handleSnackbar(
          response.data.error ? "error" : "success",
          response.data.error
            ? response.data.error
            : response.data.message
        );
        if (!response.data.error) {
          refreshData();
        }
      })
      .catch(function (error) {
        handleSnackbar("error", "Error: " + error);
      });
  };

  const updateArea = () => {
    const updatedExpense = {
      abbreviation: abbreviation,
      code: code,
      description: description,
    };
    axios
      .put(GET_AREA_LIST + `/${id}`, updatedExpense)
      .then(function (response) {
        handleSnackbar(
          response.data.error ? "error" : "success",
          response.data.error
            ? response.data.error
            : response.data.message
        );
        if (!response.data.error) {
          resetForm();
          setOpenPopup(false);
          refreshData();
          setData((prevData) =>
          prevData.map(item => (item._id === id ? { ...item, ...updatedExpense } : item))
        );
        }
      })
      .catch(function (error) {
        handleSnackbar("error", "Error: " + error);
      });
  };

  const addExpense = () => {
    const newExpense = {
      abbreviation: abbreviation,
      code: code,
      description: description,
    };
    axios
      .post(GET_AREA_LIST, newExpense)
      .then(function (response) {
        // console.log("AREA List :",response.data);
        handleSnackbar(
          response.data.error ? "error" : "success",
          response.data.error
            ? response.data.error
            : response.data.message
        );
        if (!response.data.error) {
          resetForm();
          setOpenPopup(false);
          refreshData();

          setData((prevData) =>
          prevData.map(item => (item._id === id ? { ...item, ...newExpense } : item))
        );

        }
      })
      .catch(function (error) {
        handleSnackbar("error", "Error: " + error);
      });
  };

  const handleSnackbar = (severity, message) => {
    setOpen(true);
    setSeverity(severity);
    setMessage(message);
  };

  const validation = () => {
    if (
      abbreviation.length === 0 ||
      code.length === 0 ||
      description.length === 0
    ) {
      handleSnackbar("error", "Some fields are missing");
    } else {
      if (id) {
        updateArea();
      } else {
        addExpense();
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason !== "click away") {
      setOpen(false);
    }
  };

  const resetForm = () => {
    setAbbreviation("");
    setCode("");
    setDescription("");
    setId("");
  };

  const editExpense = (expense) => {
    setOpenPopup(true);
    setAbbreviation(expense.abbreviation);
    setDescription(expense.description);
    setCode(expense.code);
    setId(expense._id);
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="list-container">
        <Navbar />
        <ListHeader
          header={"Area List"}
          firstButton={true}
          firstButtonText={"Add New Area"}
          firstLink={"add"}
        />
        <DataTable
          data={data}
          columns={areaColumns.concat(actionColumn)}
          isForTransaction={false}
        />
        <Popup
          title="Area Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <Grid container spacing={3}>
            {/* Form fields... */}
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
            <Grid item xs={4} sm={3}>
              <TextField
                required
                id="abbreviation"
                name="abbreviation"
                label="Area"
                fullWidth
                variant="outlined"
                value={abbreviation}
                onChange={(event) => setAbbreviation(event.target.value)}
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
                container
                spacing={1}
                direction="row"
                justifyContent="flex-end"
              >
                <Grid item>
                  <Button
                    variant="contained"
                    size="medium"
                    color="success"
                    onClick={validation}
                  >
                    {id ? "Update" : "Add"}
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
