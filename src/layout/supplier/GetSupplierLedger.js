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

import { GET_SUPPLIERS_LIST, GET_SUPPLIER_LEDGER } from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";
import SnackBar from "../../components/alert/SnackBar";

export default function GetSupplierLedger() {
  // const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [supplierObject, setSupplierObject] = useState({});

  useEffect(() => {
    getSupplierList();
  }, [data]);

  const getSupplierList = () => {
    axios
      .get(GET_SUPPLIERS_LIST)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error_msg);
          setSeverity("error");
        } else {
          setSupplierList(response.data.suppliers);
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage(error);
        setSeverity("error");
      });
  };
  const getSupplierLedgerList = (id) => {
    // setLoading(true);
    axios
      .get(GET_SUPPLIER_LEDGER + id)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error_msg);
          setSeverity("error");
          setData([])
        } else {
          setData(response.data.ledger);
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage(error);
        setSeverity("error");
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
            getOptionLabel={(supplier, index) => supplier.name}
            disablePortal
            fullWidth
            isOptionEqualToValue={(option, value) => option._id === value._id}
            onChange={(event, newInputValue) => {
              setSupplierObject(newInputValue);
              getSupplierLedgerList(newInputValue._id)
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
        {data.length !== 0 ? (
          <DataTable
            data={data}
            columns={supplierLedgerColumns}
            // loading={loading}
            isForTransaction={false}
          />
        ) : null}
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
