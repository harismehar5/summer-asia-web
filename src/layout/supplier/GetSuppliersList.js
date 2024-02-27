//GetSupplierList

import React, { useEffect, useState } from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { supplierColumn, userColumns } from "../../dataTableColumns";
import {
  DELETE_SUPPLIER_BY_ID,
  GET_ALL_COMPANIES,
  UPDATE_SUPPLIER_BY_ID,
} from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";
import SnackBar from "../../components/alert/SnackBar";
import Popup from "../../components/popup/Popup";

export default function GetSuppliersList() {
  const [data, setData] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [id, setId] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [personName, setPersonName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [license, setLicense] = useState("");
  const [email, setEmail] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [openingBalance, setOpeningBalance] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  // const [code, setCode] = useState("");
  var supplier = {
    name: "",
    phone: "",
    address: "",
    opening_balance: "",
  };
  useEffect(() => {
    getSuppliersList();
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
              aria-label="delete"
              size="medium"
              onClick={() => editSupplier(params.row)}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="medium"
              onClick={() => deleteSupplier(params.row._id)}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
        );
      },
    },
  ];
  const getSuppliersList = () => {
    axios
      .get(GET_ALL_COMPANIES)
      .then(function (response) {
        // console.log(response.data.data);
        // if (response.data.error) {
        // setOpen(true);
        // setMessage(response.data.error);
        // setSeverity("error");
        // } else {
        setData(response.data.data);
        // }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage(error);
        setSeverity("error");
      });
  };
  const deleteSupplier = (id) => {
    axios
      .delete(DELETE_SUPPLIER_BY_ID + id)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error);
          setSeverity("error");
        } else {
          setOpen(true);
          setMessage(response.data.message);
          setSeverity("success");
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage(error);
        setSeverity("error");
      });
  };
  const updateSupplier = () => {
    let supplier = {
      code: code,
      name: name,
      person: personName,
      email: email,
      phoneNumber: phone,
      address: address,
      license: license,
      accountNumber: accountNumber,
      description: description,
    };
    axios
      .put(UPDATE_SUPPLIER_BY_ID + id, supplier)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error);
          setSeverity("error");
        } else {
          setOpen(true);
          setMessage(response.data.message);
          setSeverity("success");
          setOpenPopup(false);
          setId("");
          setName("");
          setPhone("");
          // setOpeningBalance("");
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
      phone.length === 0
      // openingBalance.length === 0
    ) {
      setOpen(true);
      setMessage("Some fields are missing");
      setSeverity("error");
    } else {
      updateSupplier();
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const editSupplier = (customer) => {
    setOpenPopup(true);
    setId(customer._id);
    setCode(customer.code);
    setName(customer.name);
    setPersonName(customer.person);
    setEmail(customer.email);
    setPhone(customer.phoneNumber);
    setAddress(customer.address);
    setLicense(customer.license);
    setAccountNumber(customer.accountNumber);
    setDescription(customer.description);

    // setOpeningBalance(customer.opening_balance);
  };
  return (
    <div className="list">
      <Sidebar />
      <div className="list-container">
        <Navbar />
        <ListHeader
          header={"Company List"}
          firstButton={true}
          firstButtonText={"Add New Supplier"}
          firstLink={"/supplier/add"}
        />
        <DataTable
          data={data}
          columns={supplierColumn.concat(actionColumn)}
          isForTransaction={false}
        />
        <Popup
          title="Company Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}></Grid>
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address"
                fullWidth
                variant="outlined"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                fullWidth
                variant="outlined"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="License Number"
                fullWidth
                variant="outlined"
                value={license}
                onChange={(event) => setLicense(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Account Number"
                fullWidth
                variant="outlined"
                value={accountNumber}
                onChange={(event) => setAccountNumber(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
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
                  <Button
                    variant="contained"
                    size="medium"
                    color="error"
                    onClick={() => {
                      setName("");
                      setPhone("");
                      setOpenPopup(false);
                    }}
                  >
                    Cancel
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
