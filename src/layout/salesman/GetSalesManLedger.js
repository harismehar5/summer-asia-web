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
import { salesmanLedgerColumns } from "../../dataTableColumns";

import {
  BASE_URL,
  GET_salesman_LIST,
  GET_CUSTOMER_LEDGER,
} from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";
import SnackBar from "../../components/alert/SnackBar";
import { json } from "react-router-dom";

export default function GetsalesmanLedger() {
  const [data, setData] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [customerObject, setCustomerObject] = useState({});

  const [cashInBalance, setCashInBalance] = useState(0);
  const [cashOutBalance, setCashOutBalance] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);

  useEffect(() => {
    getCustomersList();
  }, [data]);

  const getCustomersList = () => {
    axios
      .get(GET_salesman_LIST)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error_msg);
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
  // const getCustomerLedgerList = (id) => {
  //   // setLoading(true);
  //   axios
  //     .get(GET_CUSTOMER_LEDGER + id)
  //     .then(function (response) {
  //       if (response.data.error) {
  //         //   setLoading(false);
  //         setData([]);
  //       } else {
  //         setData(response.data.data);

  //         //   setLoading(false);
  //       }
  //     })
  //     .catch(function (error) {
  //       // setLoading(false);
  //     });
  // };

  const getCustomerLedgerList = (id) => {
    axios
      .get(GET_CUSTOMER_LEDGER + id)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error_msg);
          setSeverity("error");
          setData([]); // Clear data in case of error
          setCashInBalance(0);
          setCashOutBalance(0);
          setCurrentBalance(0);
        } else {
          setData(response.data.data);
          setCashInBalance(response.data.cashInBalance || 0);
          setCashOutBalance(response.data.cashOutBalance || 0);
          setCurrentBalance(response.data.currentBalance || 0);
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("Error: Data not found"); // Adjust the error message
        setSeverity("error");
        setData([]); // Clear data in case of error
        setCashInBalance(0);
        setCashOutBalance(0);
        setCurrentBalance(0);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // const BalancesSection = () => (
  //   <div className="balances-container">
  //     <h2>Balances</h2>
  //     <div className="balance-item">
  //       <span>Cash In:</span>
  //       <span>${cashInBalance}</span>
  //     </div>
  //     <div className="balance-item">
  //       <span>Cash Out:</span>
  //       <span>${cashOutBalance}</span>
  //     </div>
  //     <div className="balance-item">
  //       <span>Current Balance:</span>
  //       <span>${currentBalance}</span>
  //     </div>
  //   </div>
  // );

  return (
    <div className="list">
      <Sidebar />
      <div className="list-container">
        <Navbar />
        <ListHeader header={"Salesman Ledger"} />
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
              <TextField {...params} label={"Select Salesman"} />
            )}
            renderOption={(props, customer) => (
              <Box component="li" {...props} key={customer ? customer._id : ""}>
                {customer.name}
              </Box>
            )}
          />
        </Grid>
        {data.length !== 0 ? (
          <>
            <DataTable
              data={data}
              columns={salesmanLedgerColumns}
              // loading={loading}
              isForTransaction={false}
            />
            {/* <BalancesSection /> */}
          </>
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
