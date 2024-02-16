import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, FormHelperText } from "@mui/material";
import { Paper } from "@material-ui/core";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import SnackBar from "../../components/alert/SnackBar";
import { GET_AREA_LIST } from "../../utils/config";

export default function AddArea() {
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [area, setArea] = useState("");
  const [areaError, setAreaError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const addArea = () => {
    const areaData = {
      code: code,
      abbreviation: area,
      description: description,
    };

    axios
      .post(GET_AREA_LIST, areaData)
      .then(function (response) {
        if (response.data.error) {
          handleSnackbar("error", response.data.error);
        } else {
          handleSnackbar("success", response.data.success);
          resetForm();
        }
      })
      .catch(function (error) {
        console.error("Error adding area:", error.response.data.error);
        handleSnackbar("error", error.response.data.error);
      });
  };

  const validation = () => {
    let isValid = true;
  
    setCodeError("");
    setAreaError("");
    setDescriptionError("");


    if (code.trim() === "") {
      setCodeError("Enter code");
      isValid = false;
    }
  

    if (area.trim() === "") {
      setAreaError("Enter area");
      isValid = false;
    }
  
    if (description.trim() === "") {
      setDescriptionError("Enter description");
      isValid = false;
    }

    if (isValid) {
      addArea();
    } else {
      handleSnackbar("error", "Enter valid values!");
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
    setCode("");
    setArea("");
    setDescription("");
  };

  return (
    <div className="box">
      <SideBar />
      <div className="box-container">
        <Navbar />
        <Paper className="form-container">
          <Typography variant="h6" gutterBottom>
            Add Area
          </Typography>
          <Grid container spacing={3}>
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
               <FormHelperText style={{ color: 'red' }}>{codeError}</FormHelperText>
            </Grid>
            <Grid item xs={4} sm={3}>
              <TextField
                required
                id="area"
                name="area"
                label="Area"
                fullWidth
                variant="outlined"
                value={area}
                onChange={(event) => setArea(event.target.value)}
              />
               <FormHelperText style={{ color: 'red' }}>{areaError}</FormHelperText>
            </Grid>
            <Grid item xs={12} sm={12   }>
              <TextField
                id="description"
                name="description"
                label="Description"
                fullWidth
                variant="outlined"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
               <FormHelperText style={{ color: 'red' }}>{descriptionError}</FormHelperText>
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
