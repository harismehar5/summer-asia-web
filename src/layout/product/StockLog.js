import React, { useEffect, useState } from "react";
import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { stockLogColumns } from "../../dataTableColumns";
import axios from "axios";

import { GET_STOCK_LOG } from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";

export default function StockLog() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getStockList();
  }, []);

  const getStockList = () => {
    axios
      .get(GET_STOCK_LOG)
      .then(function (response) {
        if (response.data.error) {
          console.log(response.data.error_msg);
        } else {
          setData(response.data.stocks);
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
        <ListHeader
          header={"Products List"}
          firstButton={true}
          firstButtonText={"Add New Product"}
        />
        <DataTable
          data={data}
          columns={stockLogColumns}
          isForTransaction={false}
        //   loading={!data.length}
        />
      </div>
    </div>
  );
}
