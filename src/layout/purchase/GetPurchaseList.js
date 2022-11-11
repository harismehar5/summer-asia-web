import React, { useEffect, useState } from "react";
import axios from "axios";

import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { saleColumn } from "../../dataTableColumns";

import { GET_PURCHASE_LIST } from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";

export default function GetPurchaseList() {
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(false);
  useEffect(() => {
    getPurchaseList()
  });

  const getPurchaseList = () => {
    console.log("Hello")
    // isLoading(!loading);
    axios
      .get(GET_PURCHASE_LIST)
      .then(function (response) {
        if (response.data.error) {
          // isLoading(!loading);
          console.log(response.data.error_msg);
        } else {
          // isLoading(!loading);

          var array = [];
          for (var i = 0; i < response.data.purchases.length; i++) {
            array.push({
              _id: response.data.purchases[i]._id,
              total_amount: response.data.purchases[i].total_amount,
              total_quantity: response.data.purchases[i].total_quantity,
              submit_date: response.data.purchases[i].submit_date,
              status: response.data.purchases[i].status,
              order_details: response.data.purchases[i].order_details,
              createdAt: response.data.purchases[i].createdAt,
              updatedAt: response.data.purchases[i].updatedAt,
              __v: response.data.purchases[i].__v,
            });
          }
          console.log(response.data.purchases[0]._id);
          setData(array);
        }
      })
      .catch(function (error) {
        // isLoading(!loading);
        console.log("error: " + error);
      });
  };
  return (
    <div className="list">
      <Sidebar />
      <div className="list-container">
        <Navbar />
        <ListHeader
          header={"Purchase List"}
          firstButton={true}
          firstButtonText={"Add New Purchase"}
        />
        <DataTable
          data={data}
          columns={saleColumn}
          loading={loading}
          isForTransaction={false}
        />
      </div>
    </div>
  );
}
