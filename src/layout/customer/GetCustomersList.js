import React, { useEffect, useState } from "react";
import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import {userColumns} from "../../dataTableColumns"

import axios from "axios";

export default function GetCustomersList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getCustomersList();
  }, []);

  const getCustomersList = () => {
    axios
      .get("http://localhost:3000/customer/get_customers")
      .then(function (response) {
        console.log("response: " + JSON.stringify(response));
        setData(response.data.customers);
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
        {data.length !== 0 ? <DataTable data={data} columns={userColumns} /> : null}
      </div>
    </div>
  );
}
