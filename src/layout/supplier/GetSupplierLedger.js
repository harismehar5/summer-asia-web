import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/material";

import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { supplierLedgerColumns } from "../../dataTableColumns";

import { GET_ALL_COMPANIES, GET_SUPPLIER_LEDGER } from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";
import SnackBar from "../../components/alert/SnackBar";

export default function GetSupplierLedger() {
  const [data, setData] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [supplierObject, setSupplierObject] = useState({});

  useEffect(() => {
    getSupplierList();
  }, []);

  const getSupplierList = () => {
    axios
      .get(GET_ALL_COMPANIES)
      .then(function (response) {
        setSupplierList(response.data.data);
      })
      .catch(function (error) {
        setOpen(true);
        setMessage(error);
        setSeverity("error");
      });
  };

  const getSupplierLedgerList = (id) => {
    axios
      .get(GET_SUPPLIER_LEDGER + id)
      .then(function (response) {
        setData(response?.data?.data || []); // Set data to empty array if there is no data
      })
      .catch(function (error) {
        if (data.length === 0) { // Check if data array is empty
          setOpen(true);
          setMessage("Something went wrong");
          setSeverity("error");
        }
        setData([]);
        console.error("Error fetching supplier ledger:", error);
      });
  };
  
  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="list-container">
        <Navbar />
        <ListHeader header={"Supplier Ledger"} />
        <Grid container item md={12} px={4}>
          <Autocomplete
            options={supplierList}
            getOptionLabel={(supplier) => supplier?.name}
            disablePortal
            fullWidth
            isOptionEqualToValue={(option, value) => option._id === value._id}
            onChange={(event, newInputValue) => {
              setSupplierObject(newInputValue);
              getSupplierLedgerList(newInputValue?._id)
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select Supplier" />
            )}
            renderOption={(props, supplier) => (
              <Box component="li" {...props} key={supplier._id}>
                {supplier.name}
              </Box>
            )}
          />
        </Grid>
        <DataTable
          data={data}
          columns={supplierLedgerColumns}
          isForTransaction={false}
        />
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
