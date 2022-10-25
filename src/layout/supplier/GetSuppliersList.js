import React, { useEffect, useState } from "react";
import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { userColumns } from "../../dataTableColumns";
import axios from "axios";

import { GET_SUPPLIERS_LIST } from "../../utils/config";

export default function GetSuppliersList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getSuppliersList();
  }, []);

  const getSuppliersList = () => {
    axios
      .get(GET_SUPPLIERS_LIST)
      .then(function (response) {
        if (response.data.error) {
          console.log(response.data.error_msg)
        } else {
          setData(response.data.suppliers);
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
          <DataTable data={data} columns={userColumns} pageTitle={"Supplier's List"} link="/supplier/add"/>
        ) : null}
      </div>
    </div>
  );
}
