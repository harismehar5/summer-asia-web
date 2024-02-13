import React, { useEffect, useState } from "react";
import { IconButton, Grid, TextField, Button, InputLabel, Select, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { salesmenColumns } from "../../dataTableColumns";
import { GET_AREA_LIST, GET_SALESMEN_LIST } from "../../utils/config";
import SnackBar from "../../components/alert/SnackBar";
import Popup from "../../components/popup/Popup";

export default function GetSalesmenList() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [code, setCode] = useState("");
  const [id, setId] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [qualification, setQualification] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [areaCommission, setAreaCommission] = useState("");
  const [target, setTarget] = useState("");
  const [dateOfJoin, setDateOfJoin] = useState("");
  const [refPerson, setRefPerson] = useState("");
  const [refPersonNumber, setRefPersonNumber] = useState("");
  const [cnic, setCnic] = useState("");
  const [description, setDescription] = useState("");
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

    // Fetch salesmen data
    axios
      .get(GET_SALESMEN_LIST)
      .then(function (response) {
        console.log("Salesmen list:", response.data);
        if (response.data.error) {
          handleSnackbar("error", response.data.error_msg);
        } else {
          const formattedData = response.data.data.map((salesman) => ({
            ...salesman,
            dateOfJoin: salesman.dateOfJoin
              ? new Date(salesman.dateOfJoin).toISOString().split("T")[0]
              : null,
          }));
          setData(formattedData);
        }
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
        handleSnackbar("error", "Error: " + error);
      });
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
            onClick={() => deleteSalesmen(params.row._id)}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </div>
      ),
    },
  ];

  const deleteSalesmen = (id) => {
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
    const updatedSalesmen = {
      name: name,
      fatherName: fatherName,
      address: address,
      areaCode: areaCode,
      code: code,
      qualification: qualification,
      phoneNo: phoneNo,
      areaCommission: areaCommission,
      target: target,
      dateOfJoin: dateOfJoin,
      refPerson: refPerson,
      refPersonNumber: refPersonNumber,
      cnic: cnic,
      description: description,
    };

    axios
      .put(GET_SALESMEN_LIST + `/${id}`, updatedSalesmen)
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
          resetForm();
        }
      })
      .catch(function (error) {
        handleSnackbar("error", "Error: " + error);
      });
  };

  const addSalesmen = () => {
    const newSalesmen = {
      name: name,
      fatherName: fatherName,
      address: address,
      areaCode: areaCode,
      code: code,
      qualification: qualification,
      phoneNo: phoneNo,
      areaCommission: areaCommission,
      target: target,
      dateOfJoin: dateOfJoin,
      refPerson: refPerson,
      refPersonNumber: refPersonNumber,
      cnic: cnic,
      description: description,
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
          refreshData();
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
    const salesmenData = {
      name: name,
      fatherName: fatherName,
      address: address,
      areaCode: areaCode,
      code: code,
      qualification: qualification,
      phoneNo: phoneNo,
      areaCommission: areaCommission,
      target: target,
      dateOfJoin: dateOfJoin,
      refPerson: refPerson,
      refPersonNumber: refPersonNumber,
      cnic: cnic,
      description: description,
    };

    const isMissingField = Object.values(salesmenData).some(
      (field) => field === undefined || field.length === 0
    );

    if (isMissingField) {
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
    setAddress("");
    setAreaCode("");
    setCode("");
    setFatherName("");
    setQualification("");
    setPhoneNo("");
    setAreaCommission("");
    setTarget("");
    setDateOfJoin("");
    setRefPerson("");
    setRefPersonNumber("");
    setCnic("");
    setDescription("");
  };

  const editSalesmen = (salesman) => {
    console.log("CODE :", salesman?.areaCode?.code);
    console.log("Edited salesperson ID :", salesman._id);
    setOpenPopup(true);
    setId(salesman._id);
    setName(salesman.name);
    setFatherName(salesman.fatherName);
    setAddress(salesman.address);
    setAreaCode(salesman?.areaCode?.code);
    setCode(salesman.code);
    setQualification(salesman.qualification);
    setPhoneNo(salesman.phoneNo);
    setAreaCommission(salesman.areaCommission);
    setTarget(salesman.target);
    setDateOfJoin(
      new Date(salesman.dateOfJoin).toISOString().split("T")[0]
    );
    setRefPerson(salesman.refPerson);
    setRefPersonNumber(salesman.refPersonNumber);
    setCnic(salesman.cnic);
    setDescription(salesman.description);
  };

  const refreshData = () => {
    console.log("Refreshing data...");
    axios
      .get(GET_SALESMEN_LIST)
      .then(function (response) {
        console.log("Salesmen list:", response.data);
        if (response.data.error) {
          handleSnackbar("error", response.data.error_msg);
        } else {
          const formattedData = response.data.data.map((salesman) => ({
            ...salesman,
            dateOfJoin: salesman.dateOfJoin
              ? new Date(salesman.dateOfJoin).toISOString().split("T")[0]
              : null,
          }));
          setData(formattedData);
        }
      })
      .catch(function (error) {
        console.error("Error refreshing data:", error);
        handleSnackbar("error", "Error: " + error);
      });
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
        <Popup title="Salesmen Form" openPopup={openPopup} setOpenPopup={setOpenPopup}>
          {/* Form fields... */}
          <Grid container spacing={3}>
            {/* Form fields... */}
            <Grid item xs={6} sm={4}>
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
            <Grid item xs={6} sm={4}>
              <TextField
                required
                id="fatherName"
                name="fatherName"
                label="Father's Name"
                fullWidth
                variant="outlined"
                value={fatherName}
                onChange={(event) => setFatherName(event.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                required
                id="phoneNo"
                name="phoneNo"
                label="Phone Number"
                fullWidth
                variant="outlined"
                value={phoneNo}
                onChange={(event) => setPhoneNo(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={4} sm={3}>
              <TextField
                required
                id="areaCommission"
                name="areaCommission"
                label="Area Commission"
                fullWidth
                variant="outlined"
                value={areaCommission}
                onChange={(event) => setAreaCommission(event.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                required
                id="target"
                name="target"
                label="Target"
                fullWidth
                variant="outlined"
                value={target}
                onChange={(event) => setTarget(event.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                required
                id="qualification"
                name="qualification"
                label="Qualification"
                fullWidth
                variant="outlined"
                value={qualification}
                onChange={(event) => setQualification(event.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
  <TextField
    required
    id="cnic"
    name="cnic"
    label="CNIC"
    fullWidth
    variant="outlined"
    value={cnic}
    onChange={(event) => setCnic(event.target.value)}
  />
</Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                required
                id="dateOfJoin"
                name="dateOfJoin"
                label="Date of Join"
                type="date"
                fullWidth
                variant="outlined"
                value={dateOfJoin}
                onChange={(event) => setDateOfJoin(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                required
                id="refPerson"
                name="refPerson"
                label="Reference Person"
                fullWidth
                variant="outlined"
                value={refPerson}
                onChange={(event) => setRefPerson(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="refPersonNumber"
                name="refPersonNumber"
                label="Reference Person Number"
                fullWidth
                variant="outlined"
                value={refPersonNumber}
                onChange={(event) => setRefPersonNumber(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="description"
                name="description"
                label="Description"
                fullWidth
                variant="outlined"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Grid>
          </Grid>
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
