import React, { useEffect, useState } from "react";
import axios from "axios";

import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { saleColumn, userColumns } from "../../dataTableColumns";

import { GET_SALE_LIST } from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";

export default function GetSaleList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSaleList();
  }, []);

  const getSaleList = () => {
    setLoading(true);
    axios
      .get(GET_SALE_LIST)
      .then(function (response) {
        if (response.data.error) {
          console.log(response.data.error_msg);
          setLoading(false);
        } else {
          var array = [];
          for (var i = 0; i < response.data.sales.length; i++) {
            array.push({
              _id: response.data.sales[i]._id,
              total_amount: response.data.sales[i].total_amount,
              total_quantity: response.data.sales[i].total_quantity,
              submit_date: response.data.sales[i].submit_date,
              status: response.data.sales[i].status,
              order_details: response.data.sales[i].order_details,
              createdAt: response.data.sales[i].createdAt,
              updatedAt: response.data.sales[i].updatedAt,
              __v: response.data.sales[i].__v,
            });
          }
          console.log(response.data.sales[0]._id);
          setData(array);
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
        <ListHeader
          header={"Sale List"}
          firstButton={true}
          firstButtonText={"Add New Sale"}
        />
        <DataTable
          data={data}
          columns={saleColumn}
          loading={!data.length}
          isForTransaction={false}
        />
      </div>
    </div>
  );
}
