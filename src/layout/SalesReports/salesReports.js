import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import {
  salesReportsColumns,
  supplierLedgerColumns,
} from "../../dataTableColumns";
import {
  GET_ALL_COMPANIES,
  GET_SUPPLIER_LEDGER,
  GET_Sales_Reports,
} from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";
import SnackBar from "../../components/alert/SnackBar";
import dayjs from "dayjs";

export default function SalesReports() {
  const [data, setData] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [supplierObject, setSupplierObject] = useState({});
  const [selectedDateRange, setSelectedDateRange] = useState([
    dayjs(), // Start date (current date)
    dayjs(), // End date (current date)
  ]);

  useEffect(() => {
    getSalesReportsDetails();
  }, []);

  const getSalesReportsDetails = () => {
    axios
      .get(GET_Sales_Reports)
      .then(function (response) {
        console.log("purchaseDetail:", response.data);
        setData(response.data); // Assuming the response directly contains the data array
      })
      .catch(function (error) {
        setOpen(true);
        setMessage(error);
        setSeverity("error");
      });
  };

  // const getSupplierLedgerList = (id) => {
  //   axios
  //     .get(GET_SUPPLIER_LEDGER + id)
  //     .then(function (response) {
  //       setData(response?.data?.data || []); // Set data to empty array if there is no data
  //     })
  //     .catch(function (error) {
  //       if (data.length === 0) {
  //         // Check if data array is empty
  //         setOpen(true);
  //         setMessage("Something went wrong");
  //         setSeverity("error");
  //       }
  //       setData([]);
  //       console.error("Error fetching supplier ledger:", error);
  //     });
  // };

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
        <ListHeader header={"Sales Reports"} />
        <Grid container item md={12} px={4} my={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container item md={12}>
              <DateRangePicker
                label="Select Date Range"
                sx={{ width: "500%" }}
                localeText={{ start: "Start Date", end: "End Date" }}
                value={selectedDateRange}
                onChange={(newValue) => {
                  setSelectedDateRange(newValue);
                  // Filter data based on the selected date range
                  const filteredData = data.filter((item) => {
                    return dayjs(item.date).isBetween(
                      newValue[0],
                      newValue[1],
                      null,
                      "[]"
                    );
                  });
                  setData(filteredData);
                }}
              />
            </Grid>
          </LocalizationProvider>
        </Grid>

        <DataTable
          data={data}
          columns={salesReportsColumns}
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
