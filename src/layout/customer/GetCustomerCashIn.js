import React, { useEffect, useState } from "react";
import axios from "axios";

import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { cashColumns } from "../../dataTableColumns";

import { GET_ALL_CUSTOMER_CASH_IN } from "../../utils/config";

export default function GetCustomerCashIn() {
  const [loading, setLoading] = useState(false);
  var data = [];

  useEffect(() => {
    getCustomerCashInList();
  });

  const getCustomerCashInList = () => {
    setLoading(true);
    axios
      .get(GET_ALL_CUSTOMER_CASH_IN)
      .then(function (response) {
        if (response.data.error) {
          console.log(response.data.error_msg);
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
        console.log("error: " + error);
      });
  };
  return (
    <div className="list">
      <Sidebar />
      <div className="list-container">
        <Navbar />
        {data.length !== 0 ? (
          <DataTable
            data={data}
            columns={cashColumns}
            pageTitle={"Cash In List"}
            loading={loading}
            link="/customer/cash_in"
          />
        ) : null}
      </div>
    </div>
  );
}
