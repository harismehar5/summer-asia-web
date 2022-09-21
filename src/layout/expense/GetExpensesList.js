import React, { useEffect, useState } from "react";
import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import {expenseColumns} from "../../dataTableColumns"

import axios from "axios";

export default function GetExpensesList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getExpensesList();
  }, []);

  const getExpensesList = () => {
    axios
      .get("http://localhost:3000/expense/get_expenses")
      .then(function (response) {
        console.log("response: " + JSON.stringify(response));
        setData(response.data.expenses);
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
        {data.length !== 0 ? <DataTable data={data} columns={expenseColumns} /> : null}
      </div>
    </div>
  );
}
