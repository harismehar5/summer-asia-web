import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  Button,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
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
  const [areaCommission, setAreaCommission] = useState("");
  const [cnic, setCnic] = useState("");
  const [dateOfJoin, setDateOfJoin] = useState("");
  const [description, setDescription] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [qualification, setQualification] = useState("");
  const [refPerson, setRefPerson] = useState("");
  const [refPersonNumber, setRefPersonNumber] = useState("");
  const [target, setTarget] = useState("");

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

  const addSalesMan = () => {
    const salesManData = {
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
      .post(GET_salesman_LIST, salesManData)
      .then(function (response) {
        if (response.data.error) {
          handleSnackbar("error", response.data.error);
        } else {
          handleSnackbar("success", response.data.success);
          resetForm();
        }
      })
      .catch(function (error) {
        console.error("Error adding sales man:", error);
        handleSnackbar("error", error.response.data.error);
      });
  };

  const validation = () => {
    let isValid = true;
  
    if (name.trim() === "") {
      setNameError("Enter name");
      isValid = false;
    } else {
      setNameError("");
    }
  
    if (address.trim() === "") {
      setAddressError("Enter address");
      isValid = false;
    } else {
      setAddressError("");
    }
  
    if (areaCode.trim() === "") {
      setAreaCodeError("Select area code");
      isValid = false;
    } else {
      setAreaCodeError("");
    }
  
    if (code.trim() === "") {
      setCodeError("Enter code");
      isValid = false;
    } else {
      setCodeError("");
    }
  
    if (areaCommission.trim() === "") {
      setAreaCommissionError("Enter area commission");
      isValid = false;
    } else {
      setAreaCommissionError("");
    }
  
    if (cnic.trim() === "") {
      setCnicError("Enter CNIC");
      isValid = false;
    } else {
      setCnicError("");
    }
  
    if (dateOfJoin.trim() === "") {
      setDateOfJoinError("Select date of join");
      isValid = false;
    } else {
      setDateOfJoinError("");
    }
  
    if (description.trim() === "") {
      setDescriptionError("Enter description");
      isValid = false;
    } else {
      setDescriptionError("");
    }
  
    if (fatherName.trim() === "") {
      setFatherNameError("Enter father's name");
      isValid = false;
    } else {
      setFatherNameError("");
    }
  
    if (phoneNo.trim() === "") {
      setPhoneNoError("Enter phone number");
      isValid = false;
    } else {
      setPhoneNoError("");
    }
  
    if (qualification.trim() === "") {
      setQualificationError("Enter qualification");
      isValid = false;
    } else {
      setQualificationError("");
    }
  
    if (refPerson.trim() === "") {
      setRefPersonError("Enter reference person");
      isValid = false;
    } else {
      setRefPersonError("");
    }
  
    if (refPersonNumber.trim() === "") {
      setRefPersonNumberError("Enter reference person number");
      isValid = false;
    } else {
      setRefPersonNumberError("");
    }
  
    if (target.trim() === "") {
      setTargetError("Enter target");
      isValid = false;
    } else {
      setTargetError("");
    }
  
    if (isValid) {
      addSalesMan();
    } else {
      handleSnackbar("error", "Enter valid values in all fields!");
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
    setAreaCode("");
    setCode("");
    setAreaCommission("");
    setCnic("");
    setDateOfJoin("");
    setDescription("");
    setFatherName("");
    setPhoneNo("");
    setQualification("");
    setRefPerson("");
    setRefPersonNumber("");
    setTarget("");
  };

  // Add error states and helper text states for each field
  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [areaCodeError, setAreaCodeError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [areaCommissionError, setAreaCommissionError] = useState("");
  const [cnicError, setCnicError] = useState("");
  const [dateOfJoinError, setDateOfJoinError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [fatherNameError, setFatherNameError] = useState("");
  const [phoneNoError, setPhoneNoError] = useState("");
  const [qualificationError, setQualificationError] = useState("");
  const [refPersonError, setRefPersonError] = useState("");
  const [refPersonNumberError, setRefPersonNumberError] = useState("");
  const [targetError, setTargetError] = useState("");

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
              <FormHelperText style={{ color: 'red' }}>{codeError}</FormHelperText>
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
              <FormHelperText style={{ color: 'red' }}>{nameError}</FormHelperText>
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
              <FormHelperText style={{ color: 'red' }}>{fatherNameError}</FormHelperText>
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
              <FormHelperText style={{ color: 'red' }}>{phoneNoError}</FormHelperText>
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
              <FormHelperText style={{ color: 'red' }}>{cnicError}</FormHelperText>
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
              <FormHelperText style={{ color: 'red' }}>{qualificationError}</FormHelperText>
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
              <FormHelperText style={{ color: 'red' }}>{dateOfJoinError}</FormHelperText>
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
              <FormHelperText style={{ color: 'red' }}>{refPersonError}</FormHelperText>
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
              <FormHelperText style={{ color: 'red' }}>{refPersonNumberError}</FormHelperText>
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
              <FormHelperText style={{ color: 'red' }}>{addressError}</FormHelperText>
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
              <FormHelperText style={{ color: 'red' }}>{areaCodeError}</FormHelperText>
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
              <FormHelperText style={{ color: 'red' }}>{areaCommissionError}</FormHelperText>
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
              <FormHelperText style={{ color: 'red' }}>{targetError}</FormHelperText>
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
                    onClick={() => resetForm()}
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
