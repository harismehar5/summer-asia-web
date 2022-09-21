import React, { useEffect, useState } from "react";
import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import {userColumns} from "../../dataTableColumns"

import axios from "axios";

export default function GetSuppliersList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getSuppliersList();
  }, []);

  const getSuppliersList = () => {
    axios
      .get("http://localhost:3000/supplier/get_suppliers")
      .then(function (response) {
        console.log("response: " + JSON.stringify(response));
        setData(response.data.suppliers);
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
