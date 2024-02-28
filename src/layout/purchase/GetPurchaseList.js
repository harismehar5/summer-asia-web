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
import { Link } from "react-router-dom";

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
      field: "_id",
      headerName: "ID",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: "purchase_details/" + params.row._id,
                state: { list: params.row._id },
              }}
            >
              {params.row._id}
            </Link>
          </>
        );
      },
    },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 250,
    //   renderCell: (params) => {
    //     return (
    //       <div className="cell-action">
    //         <IconButton aria-label="view" size="medium">
    //           <VisibilityIcon fontSize="inherit" />
    //         </IconButton>
    //       </div>
    //     );
    //   },
    // },
  ];
  const getPurchaseList = async () => {
    await axios
      .get(GET_PURCHASE_LIST)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error);
          setSeverity("error");
        } else {
          // console.log("data", JSON.stringify(response, null, 2));
          setData(response.data.data);
          // console.log(response.data.data);
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
          firstLink={"add"}
        />
        <DataTable
          data={data}
          columns={purchaseColumn.concat(actionColumn)}
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
