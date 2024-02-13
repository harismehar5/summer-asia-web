import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Paper } from "@material-ui/core";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import SnackBar from "../../components/alert/SnackBar";
import { GET_AREA_LIST } from "../../utils/config";

export default function AddArea() {
  const [code, setCode] = useState("");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");
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
        console.error("Error adding area:", error);
        handleSnackbar("error", "Internal Server Error");
      });
  };

  const validation = () => {
    if (code.length === 0 || area.length === 0 || description.length === 0) {
      handleSnackbar("error", "Area should be greater than 0");
    } else {
      addArea();
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
