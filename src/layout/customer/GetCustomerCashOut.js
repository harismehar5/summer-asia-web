import React, { useEffect, useState } from "react";
import axios from "axios";

import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { cashColumns } from "../../dataTableColumns";

import { GET_ALL_CUSTOMER_CASH_OUT } from "../../utils/config";
import { Button } from "@mui/material";
import ListHeader from "../../components/listHeader/ListHeader";

export default function GetCustomerCashOut() {
  const [loading, setLoading] = useState(false);
  var data = [];

  useEffect(() => {
    getCustomerCashOutList();
  });

  const getCustomerCashOutList = () => {
    setLoading(true);
    axios
      .get(GET_ALL_CUSTOMER_CASH_OUT)
      .then(function (response) {
        if (response.data.error) {
          setLoading(false);
        } else {
          for (var i = 0; i < response.data.data.length; i++) {
            for (var k = 0; k < response.data.data[i].cash.length; k++)
              data.push(response.data.data[i].cash[k]);
          }
          setLoading(false);
        }
      })
      .catch(function (error) {
        setLoading(false);
      });
  };
  return (
    <div className="list">
      <Sidebar />
      <div className="list-container">
        <Navbar />
        <ListHeader header={"Cash Out List"} firstButton={true} firstButtonText={"Cash Out"}/>
        {data.length !== 0 ? (
          <DataTable
            data={data}
            columns={cashColumns}
            loading={loading}
            isForTransaction={false}
          />
        ) : null}
      </div>
    </div>
  );
}
