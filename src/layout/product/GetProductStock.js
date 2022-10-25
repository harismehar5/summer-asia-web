import React, { useEffect, useState } from "react";
import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { productColumns } from "../../dataTableColumns";
import axios from "axios";

import { GET_PRODUCTS_LIST } from "../../utils/config";

export default function GetProductStock() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getStockList();
  }, []);

  const getStockList = () => {
    axios
      .get(GET_PRODUCTS_LIST)
      .then(function (response) {
        if (response.data.error) {
          console.log(response.data.error_msg);
        } else {
          setData(response.data.products);
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
          <DataTable data={data} columns={productColumns} pageTitle={"Product's List"} link="/product/add"/>
        ) : null}
      </div>
    </div>
  );
}
