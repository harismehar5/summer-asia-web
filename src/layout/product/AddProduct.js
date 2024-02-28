import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Paper } from "@material-ui/core";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import { Autocomplete, Button, FormHelperText } from "@mui/material";
import axios from "axios";
import { ADD_PRODUCT, GET_ALL_COMPANIES } from "../../utils/config";
import SnackBar from "../../components/alert/SnackBar";
import { Box } from "@mui/system";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [packing, setPacking] = useState("");
  const [strength, setStrength] = useState("");
  const [tradeRate, setTradeRate] = useState("");
  const [purchaseRate, setPurchaseRate] = useState("");
  const [maximumRetailPrice, setMaximumRetailPrice] = useState("");
  const [distributerPrice, setDistributerPrice] = useState("");
  const [companyList, setCompanyList] = useState("");
  const [companyObject, setCompanyObject] = useState({});
  // error states
  const [nameError, setNameError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [packingError, setPackingError] = useState("");
  const [strengthError, setStrengthError] = useState("");
  const [tradeRateError, setTradeRateError] = useState("");
  const [purchaseRateError, setPurchaseRateError] = useState("");
  const [maximumRetailPriceError, setMaximumRetailPriceError] = useState("");
  const [distributerPriceError, setDistributerPriceError] = useState("");
  const [companyError, setCompanyError] = useState("");

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  var product = {
    companyCode: "",
    code: "",
    name: "",
    packing: "",
    strength: "",
    tradeRate: "",
    purchaseRate: "",
    maximumRetailPrice: "",
    distributerPrice: "",
  };
  const addProduct = () => {
    product = {
      code: code,
      companyCode:companyObject._id,
      name: name,
      packing: packing,
      strength: strength,
      tradeRate: tradeRate,
      purchaseRate: purchaseRate,
      maximumRetailPrice: maximumRetailPrice,
      distributerPrice: distributerPrice,
    };
    axios
      .post(ADD_PRODUCT, product)
      .then(function (response) {
        // console.log(response);
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error);
          setSeverity("error");
        } else {
        setOpen(true);
        setMessage(response.data.message);
        setSeverity("success");
        setName("");
        setCode("");
        setCompanyObject("");
        setName("");
        setPacking("");
        setStrength("");
        setTradeRate("");
        setPurchaseRate("");
        setMaximumRetailPrice("");
        setDistributerPrice("");
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };
  const getSupplierList = () => {
    axios
      .get(GET_ALL_COMPANIES)
      .then(function (response) {
        // if (response.data.error) {
        //   setOpen(true);
        //   setMessage(response.data.error);
        //   setSeverity("error");
        // } else {
        setCompanyList(response.data.data);
        // }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };
  useEffect(() => {
    getSupplierList();
  }, []);
  const validation = () => {

    var companyCode = companyObject._id;

    setCompanyError("");
    setNameError("");
    setCodeError("");
    setPackingError("");
    setStrengthError("");
    setTradeRateError("");
    setPurchaseRateError("");
    setMaximumRetailPriceError("");
    setDistributerPriceError("");


    let isValid = true;

    if (companyObject === "") {
      setCompanyError("Enter Company");
      isValid = false;
    }
    if (code.trim() === "") {
      setCodeError("Enter code");
      isValid = false;
    }

    if (name.trim() === "") {
      setNameError("Enter name");
      isValid = false;
    }
    if (packing.trim() === "") {
      setPackingError("Enter packing");
      isValid = false;
    }


    if (strength.trim() === "") {
      setStrengthError("Enter strength");
      isValid = false;
    }

    if (tradeRate.trim() === "") {
      setTradeRateError("Enter trade rate");
      isValid = false;
    }

  
    if (purchaseRate.trim() === "") {
      setPurchaseRateError("Enter purchase rate");
      isValid = false;
    }

    if (maximumRetailPrice.trim() === "") {
      setMaximumRetailPriceError("Enter maximum retail price");
      isValid = false;
    }

    
    if (distributerPrice.trim() === "") {
      setDistributerPriceError("Enter distributer price");
      isValid = false;
    }


    if (isValid) {
      addProduct();
    } else {
      handleSnackbar("error", "Enter valid values!");
    }
  };


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSnackbar = (severity, message) => {
    setOpen(true);
    setSeverity(severity);
    setMessage(message);
  };
  return (
    <div className="box">
      <SideBar />
      <div className="box-container">
        <Navbar />
        <Paper className="form-container">
          <Typography variant="h6" gutterBottom>
            Add Product
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
            </Grid>
            <Grid item xs={12} sm={4}>
  <TextField  
  required
    label="Code"
    fullWidth
    variant="outlined"
    value={code}
    onChange={(event) => {
      setCode(event.target.value);
      setCodeError(""); // Clear the error message
    }}
  />
  <FormHelperText style={{ color: "red" }}>{codeError}</FormHelperText>
</Grid>

            <Grid item xs={12} sm={6} >
              <Autocomplete
                options={companyList}
                getOptionLabel={(supplier, index) => supplier.name}
                disablePortal
                fullWidth
                isOptionEqualToValue={(option, value) =>
                  option._id === value._id
                }
                onChange={(event, newInputValue) => {
                  if (newInputValue !== null) {
                    setCompanyObject(newInputValue);
                  }
                }}
                renderInput={(params) => (
                  <TextField  
  required {...params} label="Select Company" />
                )}
                renderOption={(props, supplier) => (
                  <Box component="li" {...props} key={supplier._id}>
                    {supplier.name}
                  </Box>
                )}
              />
                <FormHelperText style={{ color: "red" }}>{companyError}</FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField  
  required
                label="Name"
                fullWidth
                variant="outlined"
                value={name}
                onChange={(event) => {setName(event.target.value)
                  setNameError("");
                 } }
              />
              <FormHelperText style={{ color: "red" }}>{nameError}</FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField  
  required
                label="Packing"
                fullWidth
                variant="outlined"
                value={packing}
                onChange={(event) => {setPacking(event.target.value)
                setPackingError("");
                }}
              />
              <FormHelperText style={{ color: "red" }}>{packingError}</FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6}>
  <TextField  
  required
    label="Strength"
    fullWidth
    variant="outlined"
    value={strength}
    onChange={(event) => {
      setStrength(event.target.value);
      setStrengthError(""); 
    }}
  />
  <FormHelperText style={{ color: "red" }}>{strengthError}</FormHelperText>
</Grid>

<Grid item xs={12} sm={6}>
  <TextField  
  required

    label="Trade Rate"
    fullWidth
    type="number"
    variant="outlined"
    value={tradeRate}
    onChange={(event) => {
      setTradeRate(event.target.value);
      setTradeRateError("");
    }}
  />
  <FormHelperText style={{ color: "red" }}>{tradeRateError}</FormHelperText>
</Grid>

<Grid item xs={12} sm={6}>
  <TextField  
  required

    label="Purchase Rate"
    fullWidth
    variant="outlined"
    type="number"
    value={purchaseRate}
    onChange={(event) => {
      setPurchaseRate(event.target.value);
      setPurchaseRateError(""); 
    }}
  />
  <FormHelperText style={{ color: "red" }}>{purchaseRateError}</FormHelperText>
</Grid>

<Grid item xs={12} sm={6}>
  <TextField  
  required

    label="Retail Price (Max)"
    fullWidth
    type="number"
    variant="outlined"
    value={maximumRetailPrice}
    onChange={(event) => {
      setMaximumRetailPrice(event.target.value);
      setMaximumRetailPriceError(""); 
    }}
  />
  <FormHelperText style={{ color: "red" }}>{maximumRetailPriceError}</FormHelperText>
</Grid>

<Grid item xs={12} sm={6}>
  <TextField  
  required

    label="Distributer Price"
    fullWidth
    type="number"
    variant="outlined"
    value={distributerPrice}
    onChange={(event) => {
      setDistributerPrice(event.target.value);
      setDistributerPriceError(""); 
    }}
  />
  <FormHelperText style={{ color: "red" }}>{distributerPriceError}</FormHelperText>
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
                    onClick={() => setName("")}
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
