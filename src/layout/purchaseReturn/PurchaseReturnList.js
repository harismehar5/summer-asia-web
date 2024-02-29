import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Navbar from "../../components/navbar/Navbar";

import SnackBar from "../../components/alert/SnackBar";
import {
  GET_PURCHASE_RETURN_LIST,
  GET_SALE_RETURN_LIST,
} from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";
import { Link } from "react-router-dom";
import SideBar from "../../components/sidebar/SideBar";
import { purchaseReturnColumn } from "../../dataTableColumns";

export default function PurchaseReturnList() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  useEffect(() => {
    getSaleReturnDetailsList();
  }, []);

  const actionColumn = [
    {
      field: "_id",
      headerName: "Purchase Return Deatils",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: "_details/" + params.row._id,
                state: { list: params.row._id },
              }}
            >
              {params.row._id}
            </Link>
          </>
        );
      },
    },
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
  const getSaleReturnDetailsList = async () => {
    await axios
      .get(GET_PURCHASE_RETURN_LIST)
      .then(function (response) {
        console.log(response.data.data);
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error);
          setSeverity("error");
        } else {
          setData(response.data.data);
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
      <SideBar />
      <div className="list-container">
        <Navbar />
        <ListHeader
          header={"Purchase Return List"}
          firstButton={true}
          firstButtonText={"Add New Purchase Return"}
          firstLink={"/purchase-return/add"}
        />
        <DataTable
          data={data}
          columns={purchaseReturnColumn.concat(actionColumn)}
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
