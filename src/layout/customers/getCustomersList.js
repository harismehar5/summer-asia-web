import React, { useEffect, useState } from "react";
import {
  IconButton,
  Grid,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { customersColumns } from "../../dataTableColumns";
import { ADD_EXPENSE, GET_AREA_LIST, GET_CUSTOMERS_LIST } from "../../utils/config";
import SnackBar from "../../components/alert/SnackBar";
import Popup from "../../components/popup/Popup";

export default function GetCustomersList() {
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
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    // Fetch areas on component mount
    axios
      .get(GET_AREA_LIST)
      .then((response) => {
        setAreas(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching areas:", error);
      });

    // Fetch customers data
    axios
      .get(GET_CUSTOMERS_LIST)
      .then(function (response) {
        console.log("Customers list:", response.data);
        if (response.data.error) {
          handleSnackbar("error", response.data.error_msg);
        } else {
          // Map through the response data and format the date
          const formattedData = response.data.data.map((customer) => ({
            ...customer,
            licenseExpiryDate: new Date(customer.licenseExpiryDate)
              .toISOString()
              .split("T")[0],
          }));
          setData(formattedData);
        }
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
        handleSnackbar("error", "Error: " + error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on mount

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
            onClick={() => editCustomer(params.row)}
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

  const deleteCustomer = (id) => {
    axios
      .delete(GET_CUSTOMERS_LIST + `/${id}`)
      .then(function (response) {
        handleSnackbar(
          response.data.error ? "error" : "success",
          response.data.error
            ? response.data.error_msg
            : response.data.success_msg
        );
        if (!response.data.error) {
          // Remove refreshData call
          setData((prevData) =>
            prevData.filter((customer) => customer._id !== id)
          );
        }
      })
      .catch(function (error) {
        handleSnackbar("error", "Error: " + error);
      });
  };

  const updateCustomer = () => {
    const updatedCustomer = {
      name: name,
      phone: phone,
      address: address,
      gender: gender,
      email: email,
      license: license,
      // Format the date for the server (assuming it expects a standard format)
      licenseExpiryDate: new Date(licenseExpiryDate).toISOString(),
      areaCode: areaCode,
      bankAccount: bankAccount,
      code: code,
    };

    axios
      .put(GET_CUSTOMERS_LIST + `/${id}`, updatedCustomer)
      .then(function (response) {
        handleSnackbar(
          response.data.error ? "error" : "success",
          response.data.error
            ? response.data.error_msg
            : response.data.success_msg
        );
        if (!response.data.error) {
          setOpenPopup(false);
          resetForm();
        }
      })
      .catch(function (error) {
        handleSnackbar("error", "Error: " + error);
      });
  };

  const addCustomer = () => {
    const newCustomer = {
      name: name,
      phone: phone,
      address: address,
      gender: gender,
      email: email,
      license: license,
      licenseExpiryDate: licenseExpiryDate,
      areaCode: areaCode,
      bankAccount: bankAccount,
      code: code,
    };
    axios
      .post(ADD_EXPENSE, newCustomer)
      .then(function (response) {
        handleSnackbar(
          response.data.error ? "error" : "success",
          response.data.error
            ? response.data.error_msg
            : response.data.success_msg
        );
        if (!response.data.error) {
          setOpenPopup(false);
          setData((prevData) => [...prevData, response.data.data]);
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
      !name ||
      !phone ||
      !address ||
      !gender ||
      !email ||
      !license ||
      !licenseExpiryDate ||
      !areaCode ||
      !bankAccount ||
      !code ||
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
        updateCustomer();
      } else {
        addCustomer();
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

  const editCustomer = (customer) => {
    setOpenPopup(true);
    // Log the area code to the console for debugging
    console.log("Area Code:", customer.areaCode);
    
    // Set state values
    setName(customer.name);
    setPhone(customer.phone);
    setAddress(customer.address);
    setGender(customer.gender);
    setEmail(customer.email);
    setLicense(customer.license);
    setLicenseExpiryDate(
      new Date(customer.licenseExpiryDate).toISOString().split("T")[0]
    );
    setAreaCode(customer.areaCode._id);
    setBankAccount(customer.bankAccount);
    setId(customer._id);
    setCode(customer.code);
  };
  
  

  return (
    <div className="list">
      <Sidebar />
      <div className="list-container">
        <Navbar />
        <DataTable
          data={data}
          columns={customersColumns.concat(actionColumn)}
          isForTransaction={false}
        />
        <Popup title="Customer Form" openPopup={openPopup} setOpenPopup={setOpenPopup}>
          <Grid container spacing={3}>
            {/* Form fields... */}
            <Grid item xs={4} sm={3}>
            <FormControl fullWidth variant="outlined" required>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                value={gender}
                label="Gender"
                fullWidth
                onChange={(event) => setGender(event.target.value)}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} sm={3}>
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
            <Grid item xs={4} sm={3}>
              <TextField
                required
                id="phone"
                name="phone"
                label="Phone"
                type="number" 
                fullWidth
                variant="outlined"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </Grid>


            <Grid item xs={4} sm={3}>
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
            <Grid item xs={4} sm={3}>
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
            <Grid item xs={4} sm={3}>
              <TextField
                required
                id="licenseExpiryDate"
                name="licenseExpiryDate"
                label="License Expiry Date"
                type="date"
                fullWidth
                variant="outlined"
                value={licenseExpiryDate}
                onChange={(event) => setLicenseExpiryDate(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={4} sm={3}>
            <FormControl fullWidth variant="outlined" required>
  <InputLabel id="areaCodeLabel">Area Code</InputLabel>
  <Select
    labelId="areaCodeLabel"
    id="areaCode"
    value={areaCode}
    label="Area Code"
    fullWidth
    onChange={(event) => setAreaCode(event.target.value)}
  >
    {areas.map((area) => (
      <MenuItem key={area._id} value={area._id}>
        {area.code}
      </MenuItem>
    ))}
  </Select>
  </FormControl>
</Grid>


            <Grid item xs={4} sm={3}>
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
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={1} direction="row" justifyContent="flex-end">
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
                <Grid item>
                  <Button
                    variant="contained"
                    size="medium"
                    color="error"
                    onClick={() => setOpenPopup(false)}
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
