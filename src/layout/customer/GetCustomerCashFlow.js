import React, { useEffect, useState } from "react";
import axios from "axios";

import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { customerCashFlowColumn } from "../../dataTableColumns";
import Widgets from '../../components/widgets/Widgets'
import { GET_CUSTOMERS_CASH_FLOW } from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";
import SnackBar from "../../components/alert/SnackBar";

export default function GetCustomerCashFlow() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    getCustomerCashFlowList();
  }, []);

  const getCustomerCashFlowList = () => {
    axios
      .get(GET_CUSTOMERS_CASH_FLOW)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error);
          setSeverity("error");
        } else {
          setData(response.data.data);
          setAmount(response.data);

          // Log the API response for debugging
          console.log("data:", response.data);

          // Log the specific values you want
          // console.log("count:", response.data.count);
          // console.log("currentBalance:", response.data.currentBalance);
          // console.log("cashInBalance:", response.data.cashInBalance);
          // console.log("cashOutBalance:", response.data.cashOutBalance);
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
        <div className='dashboard'>
          <div className='dashboard-container'>
            <div className='widgets'>
              {/* <Widgets type={"count"} amount={amount.count} /> */}
              <Widgets type={"cashIn"} amount={amount.cashInBalance} />
              <Widgets type={"cashOut"} amount={amount.cashOutBalance} />
              <Widgets type={"currentBalance"} amount={amount.currentBalance} />
            </div>
          </div>
        </div>

        <ListHeader
          header={"Cash Flow List"}
          firstButton={true}
          firstButtonText={"Cash In"}
          firstLink={"/customer/add_cash_in"}
          secondButton={true}
          secondButtonText="Cash Out"
          secondLink={"/customer/add_cash_out"}
        />
        {data.length !== 0 ? (
          <DataTable
            data={data}
            columns={customerCashFlowColumn}
            isForTransaction={false}
          />
        ) : (
          <p>No data available</p>
        )}
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
