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
import { customerLedgerColumns } from "../../dataTableColumns";

import { GET_CUSTOMERS_LIST, GET_CUSTOMER_LEDGER } from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";
import SnackBar from "../../components/alert/SnackBar";

export default function GetCustomerLedger() {
  // const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [customerObject, setCustomerObject] = useState({});

  useEffect(() => {
    getCustomersList();
  }, [data]);

  const getCustomersList = () => {
    axios
      .get(GET_CUSTOMERS_LIST)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error_msg);
          setSeverity("error");
        } else {
          setCustomerList(response.data.customers);
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };
  const getCustomerLedgerList = (id) => {
    // setLoading(true);
    axios
      .get(GET_CUSTOMER_LEDGER + id)
      .then(function (response) {
        if (response.data.error) {
          //   setLoading(false);
          setData([])
        } else {
          setData(response.data.ledger);
          //   setLoading(false);
        }
      })
      .catch(function (error) {
        // setLoading(false);
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
        <ListHeader header={"Customer Ledger"} />
        <Grid container item md={12} px={4}>
          <Autocomplete
            options={customerList}
            getOptionLabel={(customer, index) => customer.name}
            disablePortal
            fullWidth
            isOptionEqualToValue={(option, value) => option._id === value._id}
            onChange={(event, newInputValue) => {
              setCustomerObject(newInputValue);
              getCustomerLedgerList(newInputValue._id)
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select Customer" />
            )}
            renderOption={(props, customer) => (
              <Box component="li" {...props} key={customer._id}>
                {customer.name}
              </Box>
            )}
          />
        </Grid>
        {data.length !== 0 ? (
          <DataTable
            data={data}
            columns={customerLedgerColumns}
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
