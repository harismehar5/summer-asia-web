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
import { GET_ALL_COMPANIES, GET_All_LEDGER, } from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";
import SnackBar from "../../components/alert/SnackBar";
import Widgets from "../../components/widgets/Widgets";

export default function GetSupplierLedger() {
  const [data, setData] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [supplierObject, setSupplierObject] = useState({});
  const [amount, setAmount] = useState({
    cashInBalance: 0,
    cashOutBalance: 0,
    currentBalance: 0,
  });
  const [cashInBalance, setCashInBalance] = useState(0);
  const [cashOutBalance, setCashOutBalance] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  
  useEffect(() => {
    getSupplierList();
  }, []);

  useEffect(() => {
    updateWidgetValues();
  }, [data, amount]);

  const updateWidgetValues = () => {
    setCashInBalance(amount.cashInBalance || 0);
    setCashOutBalance(amount.cashOutBalance || 0);
    setCurrentBalance(amount.currentBalance || 0);
  };

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
