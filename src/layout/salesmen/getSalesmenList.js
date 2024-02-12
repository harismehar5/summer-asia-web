import React, { useEffect, useState } from "react";
import { IconButton, Grid, TextField, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { salesmenColumns } from "../../dataTableColumns";
import {  GET_SALESMEN_LIST } from "../../utils/config";
import SnackBar from "../../components/alert/SnackBar";
import Popup from "../../components/popup/Popup";

export default function GetSalesmenList() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [license, setLicense] = useState("");
  const [licenseExpiryDate, setLicenseExpiryDate] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [code, setCode] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    refreshData();
  }, []);

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
            onClick={() => editSalesmen(params.row)}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="medium"
            onClick={() => deleteCustomer(params.row._id)}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </div>
      ),
    },
  ];

  const refreshData = () => {
    console.log("Refreshing data...");
    axios
      .get(GET_SALESMEN_LIST)
      .then(function (response) {
        console.log("Salesmen list:", response.data);
        if (response.data.error) {
          handleSnackbar("error", response.data.error_msg);
        } else {
          setData(response.data.data);
        }
      })
      .catch(function (error) {
        console.error("Error refreshing data:", error);
        handleSnackbar("error", "Error: " + error);
      });
  };
  
  const deleteCustomer = (id) => {
    axios
      .delete(GET_SALESMEN_LIST + `/${id}`)
      .then(function (response) {
        handleSnackbar(
          response.data.error ? "error" : "success",
          response.data.error
            ? response.data.error_msg
            : response.data.success_msg
        );
        if (!response.data.error) {
          refreshData();
        }
      })
      .catch(function (error) {
        handleSnackbar("error", "Error: " + error);
      });
  };

  const updateSalesmen = () => {
    const updatedCustomer = {
      name: name,
      phone: phone,
      address: address,
      gender: gender,
      email: email,
      license: license,
      licenseExpiryDate: licenseExpiryDate,
      areaCode: areaCode,
      bankAccount: bankAccount,
      code:code,
    };
  
    axios
      .put(GET_SALESMEN_LIST + `/${id}`, updatedCustomer)
      .then(function (response) {
        handleSnackbar(
          response.data.error ? "error" : "success",
          response.data.error
            ? response.data.error_msg
            : response.data.success_msg
        );
        if (!response.data.error) {
          refreshData();
          setOpenPopup(false);
          resetForm(); // Move resetForm after refreshData
        }
      })
      .catch(function (error) {
        handleSnackbar("error", "Error: " + error);
      });
  };
  
  
  const addSalesmen = () => {
    const newSalesmen = {
      name: name,
      phone: phone,
      address: address,
      gender: gender,
      email: email,
      license: license,
      licenseExpiryDate: licenseExpiryDate,
      areaCode: areaCode,
      bankAccount: bankAccount,
      code:code,
    };
    axios
      .post(GET_SALESMEN_LIST, newSalesmen)
      .then(function (response) {
        handleSnackbar(
          response.data.error ? "error" : "success",
          response.data.error
            ? response.data.error_msg
            : response.data.success_msg
        );
        if (!response.data.error) {
          setOpenPopup(false);
          refreshData(); // Move refreshData inside the success block
          resetForm();
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
      name.length === 0 ||
      phone.length === 0 ||
      address.length === 0 ||
      gender.length === 0 ||
      email.length === 0 ||
      license.length === 0 ||
      licenseExpiryDate.length === 0 ||
      areaCode.length === 0 ||
      bankAccount.length === 0 ||
      code.length === 0
    ) {
      handleSnackbar("error", "Some fields are missing");
    } else {
      if (id) {
        updateSalesmen();
      } else {
        addSalesmen();
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason !== "clickaway") {
      setOpen(false);
    }
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setAddress("");
    setGender("");
    setEmail("");
    setLicense("");
    setLicenseExpiryDate("");
    setAreaCode("");
    setBankAccount("");
    setId("");
    setCode("");
  };

  const editSalesmen = (customer) => {
    setOpenPopup(true);
    setName(customer.name);
    setPhone(customer.phone);
    setAddress(customer.address);
    setGender(customer.gender);
    setEmail(customer.email);
    setLicense(customer.license);
    setLicenseExpiryDate(customer.licenseExpiryDate);
    setAreaCode(customer.areaCode);
    setBankAccount(customer.bankAccount);
    setId(customer._id);
    setCode(customer.Code);
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="list-container">
        <Navbar />
        <DataTable
          data={data}
          columns={salesmenColumns.concat(actionColumn)}
          isForTransaction={false}
        />
        <Popup title="Customer Form" openPopup={openPopup} setOpenPopup={setOpenPopup}>
          <Grid container spacing={3}>
            {/* Form fields... */}
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
                required
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
                required
                id="gender"
                name="gender"
                label="Gender"
                fullWidth
                variant="outlined"
                value={gender}
                onChange={(event) => setGender(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="license"
                name="license"
                label="License"
                fullWidth
                variant="outlined"
                value={license}
                onChange={(event) => setLicense(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="licenseExpiryDate"
                name="licenseExpiryDate"
                label="License expiry date"
                fullWidth
                variant="outlined"
                value={licenseExpiryDate}
                onChange={(event) => setLicenseExpiryDate(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="areaCode"
                name="areaCode"
                label="Area code"
                fullWidth
                variant="outlined"
                value={areaCode}
                onChange={(event) => setAreaCode(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="bankAccount"
                name="bankAccount"
                label="Bank Account"
                fullWidth
                variant="outlined"
                value={bankAccount}
                onChange={(event) => setBankAccount(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={1} direction="row" justifyContent="flex-end">
                <Grid item>
                  <Button variant="contained" size="medium" color="success" onClick={validation}>
                    {id ? "Update" : "Add"}
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" size="medium" color="error" onClick={() => setOpenPopup(false)}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Popup>
        <SnackBar open={open} severity={severity} message={message} handleClose={handleClose} />
      </div>
    </div>
  );
}
