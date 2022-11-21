import React, { useEffect, useState } from "react";
import axios from "axios";

import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { supplierCashFlowColumn } from "../../dataTableColumns";

import { GET_SUPPLIERS_CASH_FLOW } from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";

export default function GetSupplierCashFlow() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([])

  useEffect(() => {
    getSupplierCashFlowList();
  });

  const getSupplierCashFlowList = () => {
    // setLoading(true);
    axios
      .get(GET_SUPPLIERS_CASH_FLOW)
      .then(function (response) {
        if (response.data.error) {
          console.log(response.data.error_msg);
        //   setLoading(false);
        } else {
          setData(response.data.cash_flow)
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
          firstLink={"/supplier/add_cash_in"}
          secondButton={true}
          secondButtonText="Cash Out"
          secondLink={"/supplier/add_cash_out"}
        />
        {data.length !== 0 ? (
          <DataTable data={data} columns={supplierCashFlowColumn} loading={loading} isForTransaction={false} />
        ) : null}
      </div>
    </div>
  );
}
