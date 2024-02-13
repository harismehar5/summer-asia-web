import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";

import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { purchaseColumn } from "../../dataTableColumns";

import { GET_PURCHASE_LIST } from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";
import SnackBar from "../../components/alert/SnackBar";

export default function GetPurchaseList() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  useEffect(() => {
    getPurchaseList();
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
          </div>
        );
      },
    },
  ];
  const getPurchaseList = async () => {
    await axios
      .get(GET_PURCHASE_LIST)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error_msg);
          setSeverity("error");
        } else {
          var array = [];
          for (var i = 0; i < response.data.purchaseDetail.length; i++) {
            array.push({
              _id: response.data.purchaseDetail[i]._id,
              total_amount: response.data.purchaseDetail[i].total_amount,
              total_quantity: response.data.purchaseDetail[i].total_quantity,
              supplier: response.data.purchaseDetail[i].supplier.name,
              submit_date: response.data.purchaseDetail[i].submit_date,
              status: response.data.purchaseDetail[i].status,
              order_details: response.data.purchaseDetail[i].order_details,
              createdAt: response.data.purchaseDetail[i].createdAt,
              updatedAt: response.data.purchaseDetail[i].updatedAt,
              __v: response.data.purchaseDetail[i].__v,
            });
          }
          setData(array);
        }
      })
      .catch(function (error) {
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
          header={"Purchase List"}
          firstButton={true}
          firstButtonText={"Add New Purchase"}
        />
        <DataTable
          data={data}
          columns={purchaseColumn.concat(actionColumn)}
          // loading={loading}
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
