import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.scss";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";

import { GET_SUPPLIERS_CASH_FLOW } from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";

export default function GetSupplierCashFlow() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getSupplierCashFlowList();
  });

  const getSupplierCashFlowList = () => {
    // setLoading(true);
    axios
      .get(GET_SUPPLIERS_CASH_FLOW)
      .then(function (response) {
        // console.log(JSON.stringify(response, null, 2));
        if (response.data.error) {
          //   setLoading(false);
        } else {
          setData(response.data.cash_flow);
          //   setLoading(false);
        }
      })
      .catch(function (error) {
        // setLoading(false);
      });
  };
  return (
    <div className="list">
      <Sidebar />
      <div className="list-container">
        <Navbar />
        <ListHeader
          header={"Cash FfasfsdjfsdkjhfjdshfjkdshfjdkshfkdsList"}
          firstButton={true}
          firstButtonText={"Cash In"}
          firstLink={"/supplier/add_cash_in"}
          secondButton={true}
          secondButtonText="Cash Out"
          secondLink={"/supplier/add_cash_out"}
        />
      </div>
    </div>
  );
}
