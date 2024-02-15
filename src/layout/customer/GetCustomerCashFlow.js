import React, { useEffect, useState } from "react";
import axios from "axios";

import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { customerCashFlowColumn } from "../../dataTableColumns";

import { GET_CUSTOMERS_CASH_FLOW } from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";
import SnackBar from "../../components/alert/SnackBar";

export default function GetCustomerCashFlow() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  useEffect(() => {
    getCustomerCashFlowList();
  }, []);

  const getCustomerCashFlowList = () => {
    axios
      .get(GET_CUSTOMERS_CASH_FLOW)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error_msg);
          setSeverity("error");
        } else {
          setData(response.data.cash_flow);
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
        <ListHeader
          header={"Cash Flow List"}
          firstButton={true}
          firstButtonText={"Cash In"}
          firstLink={"/customer/add_cash_in"}
          secondButton={true}
          secondButtonText="Cash Out"
          secondLink={"/customer/add_cash_out"}
        />

        <DataTable
          data={data}
          columns={customerCashFlowColumn}
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
