import React, { useEffect, useState } from "react";
import axios from "axios";

import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { customerCashFlowColumn } from "../../dataTableColumns";

import { GET_CUSTOMERS_CASH_Flow } from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";

export default function GetCustomerCashFlow() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getCustomerCashFlowList();
  });

  const getCustomerCashFlowList = () => {
    // setLoading(true);
    axios
      .get(GET_CUSTOMERS_CASH_Flow)
      .then(function (response) {
        if (response.data.error) {
          console.log(response.data.error_msg);
          //   setLoading(false);
        } else {
          setData(response.data.cash_flow);
          //   setLoading(false);
        }
      })
      .catch(function (error) {
        // setLoading(false);
        console.log("error: " + error);
      });
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
        {data.length !== 0 ? (
          <DataTable
            data={data}
            columns={customerCashFlowColumn}
            loading={loading}
            isForTransaction={false}
          />
        ) : null}
      </div>
    </div>
  );
}
