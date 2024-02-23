import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { salesReportsColumns } from "../../dataTableColumns";
import { GET_Sales_Reports } from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";
import SnackBar from "../../components/alert/SnackBar";
import dayjs from "dayjs";

export default function SalesReports() {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
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
        // console.log("purchaseDetail:", response.data);
        setOriginalData(response.data); // Save the original data
        setData(response.data); // Set data to the original data
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
                  const filteredData = originalData.filter((item) => {
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
