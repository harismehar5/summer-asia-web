import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Paper, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import SnackBar from "../../components/alert/SnackBar";
import { GET_salesman_LIST, GET_AREA_LIST } from "../../utils/config";

export default function AddSalesMan() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [code, setCode] = useState("");
  const [areas, setAreas] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [areaCommission, setAreaCommission] = useState();
  const [cnic, setCnic] = useState();
  const [dateOfJoin, setDateOfJoin] = useState("");
  const [description, setDescription] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [qualification, setQualification] = useState("");
  const [refPerson, setRefPerson] = useState("");
  const [refPersonNumber, setRefPersonNumber] = useState("");
  const [target, setTarget] = useState();
  useEffect(() => {
    axios
      .get(GET_AREA_LIST)
      .then((response) => {
        setAreas(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching areas:", error);
      });
  }, []);

  const addCustomer = () => {
    const customerData = {
      name: name,
      address: address,
      areaCode: areaCode,
      code: code,
      areaCommission: areaCommission,
      cnic: cnic,
      dateOfJoin: dateOfJoin,
      description: description,
      fatherName: fatherName,
      phoneNo: phoneNo,
      qualification: qualification,
      refPerson: refPerson,
      refPersonNumber: refPersonNumber,
      target: target,
    };

    axios
      .post(GET_salesman_LIST, customerData)
      .then(function (response) {

        if (response.data.error) {
          handleSnackbar("error", response.data.error);
        } else {
          handleSnackbar("success", response.data.success);
          resetForm();
        }
        console.log("New Data Success :", customerData);
        console.log("Success Message :", response.data.message);
      })
      .catch(function (error) {
        console.error("Error adding customer:", error);
        handleSnackbar("error", error.response.data.error);
      });
  };

  const validation = () => {
    if (
      name.length === 0 ||
      address.length === 0 ||
      areaCode.length === 0 ||
      code.length === 0 ||
      areaCommission.length === 0 ||
      cnic.length === 0 ||
      dateOfJoin.length === 0 ||
      description.length === 0 ||
      fatherName.length === 0 ||
      phoneNo.length === 0 ||
      qualification.length === 0 ||
      refPerson.length === 0 ||
      refPersonNumber.length === 0 ||
      target.length === 0
    ) {
      handleSnackbar("error", "All fields are required");
    } else {
      addCustomer();
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "click away") {
      return;
    }
    setOpen(false);
  };

  const handleSnackbar = (severity, message) => {
    setOpen(true);
    setSeverity(severity);
    setMessage(message);
  };

  const resetForm = () => {
    setName("");
    setAddress("");
    setAreaCode();
    setCode("");
    setAreaCommission();
    setCnic();
    setDateOfJoin("");
    setDescription("");
    setFatherName("");
    setPhoneNo();
    setQualification("");
    setRefPerson("");
    setRefPersonNumber();
    setTarget();
  };

  return (
    <div className="box">
      <SideBar />
      <div className="box-container">
        <Navbar />
        <Paper className="form-container">
          <Typography variant="h6" gutterBottom>
            Add Sales Man
          </Typography>
          <Grid container spacing={3}>
            <Grid xs={6} sm={6} md={6} />
            <Grid item xs={6} sm={6} md={6}>
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
            <Grid item xs={6} sm={6} md={6}>
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
            <Grid item xs={6} sm={6} md={6}>
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
            <Grid item xs={6} sm={6} md={6}>
              <TextField
                required
                id="phoneNo"
                name="phoneNo"
                label="Phone No"
                fullWidth
                type="number"
                variant="outlined"
                value={phoneNo}
                onChange={(event) => setPhoneNo(event.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <TextField
                required
                id="cnic"
                name="cnic"
                label="CNIC"
                fullWidth
                type="number"
                variant="outlined"
                value={cnic}
                onChange={(event) => setCnic(event.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
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
            <Grid item xs={6} sm={6} md={6}>
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
            <Grid item xs={6} sm={6} md={6}>
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
            <Grid item xs={6} sm={6} md={6}>
              <TextField
                required
                id="refPersonNumber"
                name="refPersonNumber"
                label="Reference Person Number"
                fullWidth
                type="number"
                variant="outlined"
                value={refPersonNumber}
                onChange={(event) => setRefPersonNumber(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
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
            <Grid item xs={4} sm={4} md={4}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="areaCode-label">Area Code</InputLabel>
                <Select
                  labelId="areaCode-label"
                  id="areaCode"
                  value={areaCode}
                  onChange={(event) => setAreaCode(event.target.value)}
                  label="Area Code"
                >
                  {areas.map((area) => (
                    <MenuItem key={area._id} value={area._id}>
                      {area.code}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={4} sm={4} md={4}>
              <TextField
                required
                id="areaCommission"
                name="areaCommission"
                label="Area Commission"
                fullWidth
                type="number"
                variant="outlined"
                value={areaCommission}
                onChange={(event) => setAreaCommission(event.target.value)}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <TextField
                required
                id="target"
                name="target"
                label="Target"
                fullWidth
                type="number"
                variant="outlined"
                value={target}
                onChange={(event) => setTarget(event.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
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
                    onClick={validation}
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    size="medium"
                    color="error"
                  // onClick={() => setOpenPopup(false)}
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
