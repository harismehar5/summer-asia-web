import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { cashColumns } from "../../dataTableColumns";
import { GET_ALL_SUPPLIER_CASH_OUT } from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";

export default function GetSupplierCashOut() {
  const [loading, setLoading] = useState(false);
  var data = [];

  useEffect(() => {
    getSupplierCashOutList();
  });

  const getSupplierCashOutList = () => {
    setLoading(true);
    axios
      .get(GET_ALL_SUPPLIER_CASH_OUT)
      .then(function (response) {
        if (response.data.error) {
          // setOpen(true);
          // setMessage(response.data.error);
          // setSeverity("error");
        } else {
          for (var i = 0; i < response.data.data.length; i++) {
            for (var k = 0; k < response.data.data[i].cash.length; k++)
              data.push(response.data.data[i].cash[k]);
          }
        }
      })
      .catch(function (error) {
        // setLoading(false);
        // setOpen(true);
        // setMessage(error);
        // setSeverity("error");
      });
  };
  return (
    <div className="list">
      <Sidebar />
      <div className="list-container">
        <Navbar />
        <ListHeader
          header={"Cash Out List"}
          firstButton={true}
          firstButtonText={"Cash Out"}
        />
        <DataTable
          data={data}
          columns={cashColumns}
          isForTransaction={false}
        />
      </div>
    </div>
  );
}
