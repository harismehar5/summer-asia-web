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

import {
  BASE_URL,
  GET_All_LEDGER,
  GET_CUSTOMERS_LIST,
} from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";
import SnackBar from "../../components/alert/SnackBar";
import Widgets from "../../components/widgets/Widgets";

export default function GetCustomerLedger() {
  const [data, setData] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [customerObject, setCustomerObject] = useState({});
  const [amount, setAmount] = useState({
    cashInBalance: 0,
    cashOutBalance: 0,
    currentBalance: 0,
  });
  const [cashInBalance, setCashInBalance] = useState(0);
  const [cashOutBalance, setCashOutBalance] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  
  useEffect(() => {
    getCustomersList();
  }, [data]);

  useEffect(() => {
    updateWidgetValues();
  }, [data, amount]);

  const updateWidgetValues = () => {
    setCashInBalance(amount.cashInBalance || 0);
    setCashOutBalance(amount.cashOutBalance || 0);
    setCurrentBalance(amount.currentBalance || 0);
  };

  const getCustomersList = () => {
    axios
      .get(GET_CUSTOMERS_LIST)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error);
          setSeverity("error");
        } else {
          setCustomerList(response?.data?.data);
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };

  const getCustomerLedgerList = (id) => {
    axios
      .get(GET_All_LEDGER + id)
      .then(function (response) {
        if (response.data.message === "Cash data not found") {
          setData([]);
          setAmount({
            cashInBalance: 0,
            cashOutBalance: 0,
            currentBalance: 0,
          });
          handleSnackbar("error", "Cash data not found");
        } else {
          setData(response.data.data);
          setAmount(response.data);
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status === 404) {
          setData([]);
          setAmount({
            cashInBalance: 0,
            cashOutBalance: 0,
            currentBalance: 0,
          });
          handleSnackbar("error", " Data not found");
        } else {
          handleSnackbar("error", error.message);
        }
      });
  };

  const handleSnackbar = (severity, message) => {
    setOpen(true);
    setSeverity(severity);
    setMessage(message);
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

        <div className='dashboard'>
          <div className='dashboard-container'>
            <div className='widgets'>
              <Widgets type={"cashIn"} amount={cashInBalance || ""} />
              <Widgets type={"cashOut"} amount={cashOutBalance || ""} />
              <Widgets type={"currentBalance"} amount={currentBalance || ""} />
            </div>
          </div>
        </div>
        <ListHeader header={"Customer Ledger"} />
        <Grid container item md={12} px={4}>
          <Autocomplete
            options={customerList}
            getOptionLabel={(customer) => (customer ? customer.name : "")}
            disablePortal
            fullWidth
            isOptionEqualToValue={(option, value) =>
              option && value && option._id === value._id
            }
            onChange={(event, newInputValue) => {
              if (newInputValue && newInputValue._id) {
                setCustomerObject(newInputValue);
                getCustomerLedgerList(newInputValue._id);
              }
            }}
            value={customerObject.name}
            renderInput={(params) => (
              <TextField  
  required {...params} label={"Select Customer"} />
            )}
            renderOption={(props, customer) => (
              <Box component="li" {...props} key={customer ? customer._id : ""}>
                {customer.name}
              </Box>
            )}
          />
        </Grid>

        <DataTable
          data={data}
          columns={customerLedgerColumns}
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
