import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { saleColumn } from "../../dataTableColumns";
import SnackBar from "../../components/alert/SnackBar";

import { GET_SALE_LIST } from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";

export default function GetSaleList() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  useEffect(() => {
    getSaleList();
  }, []);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cell-action">
            <IconButton aria-label="view" size="medium">
              <VisibilityIcon fontSize="inherit" />
            </IconButton>
            {/* <IconButton aria-label="edit" size="medium">
              <EditIcon fontSize="inherit" />
            </IconButton> */}
          </div>
        );
      },
    },
  ];
  const getSaleList = async () => {
    await axios
      .get(GET_SALE_LIST)
      .then(function (response) {
        if (response.data.error) {
          console.log(response.data.error_msg);
          setOpen(true);
          setMessage(response.data.error_msg);
          setSeverity("error");
        } else {
          var array = [];
          for (var i = 0; i < response.data.sales.length; i++) {
            array.push({
              _id: response.data.sales[i]._id,
              total_amount: response.data.sales[i].total_amount,
              total_quantity: response.data.sales[i].total_quantity,
              customer: response.data.sales[i].customer.name,
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
        }
      })
      .catch(function (error) {
        console.log("error: " + error);
        setOpen(true);
        setMessage("error: " + error);
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
          header={"Sale List"}
          firstButton={true}
          firstButtonText={"Add New Sale"}
        />
        <DataTable
          data={data}
          columns={saleColumn.concat(actionColumn)}
          // loading={!data.length}
          isForTransaction={false}
        />
      </div>
      <SnackBar
        open={open}
        severity={severity}
        message={message}
        handleClose={handleClose}
      />
    </div>
  );
}
