import React, { useEffect, useState } from "react";
import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { userColumns } from "../../dataTableColumns";
import axios from "axios";

import { GET_CUSTOMERS_LIST } from "../../utils/config";

export default function GetCustomersList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getCustomersList();
  }, []);

  const getCustomersList = () => {
    axios
      .get(GET_CUSTOMERS_LIST)
      .then(function (response) {
        if (response.data.error) {
          console.log(response.data.error_msg);
        } else {
          setData(response.data.customers);
        }
      })
      .catch(function (error) {
        console.log("error: " + error);
      });
  };
  return (
    <div className="list">
      <Sidebar />
      <div className="list-container">
        <Navbar />
        {data.length !== 0 ? (
          <DataTable data={data} columns={userColumns} pageTitle={"Customer's List"}/>
        ) : null}
      </div>
    </div>
  );
}
