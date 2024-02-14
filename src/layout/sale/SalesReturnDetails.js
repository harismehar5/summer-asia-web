import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import ListHeader from "../../components/listHeader/ListHeader";
import DataTable from "../../components/dataTable/DataTable";
import SnackBar from "../../components/alert/SnackBar";
import { json, useLocation, useParams } from "react-router-dom";
import { purchaseDetailsColumn, saleDetailsColumn } from "../../dataTableColumns";
import { IconButton } from "@mui/material";
import { GET_PURCHASE_LIST, GET_SALE_LIST, GET_SALE_RETURN_LIST } from "../../utils/config";
import axios from "axios";

const SalesReturnDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  console.log("params id =",id)
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return <div className="cell-action"></div>;
      },
    },
  ];
  useEffect(() => {
    getSaleDetailsList();
  }, []);
  const getSaleDetailsList = async () => {
    await axios
      .get(GET_SALE_RETURN_LIST+"/"+id)
      .then(function (response) {
        console.log(JSON.stringify(response,null,2))
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error_msg);
          setSeverity("error");
        } else {
         
         setData(response.data.saleDetail);
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
          header={"Sales Return Details"}
          // firstButton={true}
          // firstButtonText={"Add New Purchase"}
        />
        <DataTable
          data={data}
          columns={saleDetailsColumn}
          //  loading={loading}
          isForTransaction={false}
        />
      </div>
      <SnackBar
        open={open}
        severity={severity}
        message={message}
        //  handleClose={handleClose}
      />
    </div>
  );
};

export default SalesReturnDetails;
