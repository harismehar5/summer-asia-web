import React, { useEffect, useState } from "react";
import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import {productColumns} from "../../dataTableColumns"

import axios from "axios";

export default function GetProductStock() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getStockList();
  }, []);

  const getStockList = () => {
    axios
      .get("http://localhost:3000/product/get_products")
      .then(function (response) {
        console.log("response: " + JSON.stringify(response));
        setData(response.data.products);
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
        {data.length !== 0 ? <DataTable data={data} columns={productColumns} /> : null}
      </div>
    </div>
  );
}
