import React, { useEffect, useState } from "react";
import axios from "axios";

import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { userColumns } from "../../dataTableColumns";

import { GET_CUSTOMERS_LIST } from "../../utils/config";
import { Button } from "@mui/material";
import ListHeader from "../../components/listHeader/ListHeader";

export default function GetCustomersList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCustomersList();
  }, []);

  const getCustomersList = () => {
    setLoading(true);
    axios
      .get(GET_CUSTOMERS_LIST)
      .then(function (response) {
        if (response.data.error) {
          console.log(response.data.error_msg);
          setLoading(false);
        } else {
          setData(response.data.customers);
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
        <ListHeader header={"Customers List"} firstButton={true} firstButtonText={"Add New Customer"}/>
        {data.length !== 0 ? (
          <DataTable data={data} columns={userColumns} loading={loading} isForTransaction={false} />
        ) : null}
      </div>
    </div>
  );
}
