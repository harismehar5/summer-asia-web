import React, { useEffect, useState } from "react";
import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { stockLogColumns } from "../../dataTableColumns";
import axios from "axios";

import { GET_STOCK_LOG } from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";
import SnackBar from "../../components/alert/SnackBar";

export default function StockLog() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  useEffect(() => {
    getStockList();
  }, [data]);

  const getStockList = () => {
    axios
      .get(GET_STOCK_LOG)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error_msg);
          setSeverity("error");
        } else {
          setData(response.data.stocks);
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage(error);
        setSeverity("error");
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
        />
        <SnackBar
          open={open}
          severity={severity}
          message={message}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
}
