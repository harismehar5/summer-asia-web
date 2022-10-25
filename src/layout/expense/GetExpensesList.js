import React, { useEffect, useState } from "react";
import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { expenseColumns } from "../../dataTableColumns";
import axios from "axios";

import { GET_EXPENSES_LIST } from "../../utils/config";

export default function GetExpensesList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getExpensesList();
  }, []);

  const getExpensesList = () => {
    axios
      .get(GET_EXPENSES_LIST)
      .then(function (response) {
        if (response.data.error) {
          console.log(response.data.error_msg);
        } else {
          setData(response.data.expenses);
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
          <DataTable data={data} columns={expenseColumns} pageTitle={"Expense's List"} link="/expense/add"/>
        ) : null}
      </div>
    </div>
  );
}
