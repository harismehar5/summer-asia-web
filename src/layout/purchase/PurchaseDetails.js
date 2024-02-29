import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import ListHeader from "../../components/listHeader/ListHeader";
import DataTable from "../../components/dataTable/DataTable";
import SnackBar from "../../components/alert/SnackBar";
import { Navigate, useParams } from "react-router-dom";
import { purchaseDetailsColumn } from "../../dataTableColumns";
import { GET_PURCHASE_LIST } from "../../utils/config";
import axios from "axios";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const PurchaseDetails = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  useEffect(() => {
    getPurchaseDetailsList();
  }, []);
  const getPurchaseDetailsList = async () => {
    await axios
      .get(GET_PURCHASE_LIST + "/" + id)
      .then(function (response) {
        console.log(JSON.stringify(response, null, 2));
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error);
          setSeverity("error");
        } else {
          // console.log("details ", response.data);
          setData(response.data.purchaseDetail);
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cell-action">
            <IconButton
              aria-label="edit"
              size="medium"
              onClick={() => editPurchaseDetails(id)}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="medium"
              onClick={() => deletePurchaseDetails(id)}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
        );
      },
    },
  ];
  // const getExpensesList = () => {
  //   axios
  //     .get(GET_PURCHASE_LIST)
  //     .then(function (response) {
  //       if (response.data.error) {
  //         setOpen(true);
  //         setMessage(response.data.error);
  //         setSeverity("error");
  //       } else {
  //         setData(response.data.data);
  //       }
  //     })
  //     .catch(function (error) {
  //       setOpen(true);
  //       setMessage("error: " + error);
  //       setSeverity("error");
  //     });
  // };
  const deletePurchaseDetails = (id) => {
    axios
      .delete(GET_PURCHASE_LIST + "/" + id)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error);
          setSeverity("error");
        } else {
          setOpen(true);
          setMessage(response.data.message);
          setSeverity("success");
          window.location.href = "/purchase"; 
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage(error);
        setSeverity("error");
      });
  };
  // const updateExpense = () => {
  //   // expense = {
  //   //   name: name,
  //   //   // amount: amount,
  //   //   // description: description,
  //   // };
  //   axios
  //     .put(GET_PURCHASE_LIST + id, expense)
  //     .then(function (response) {
  //       if (response.data.error) {
  //         setOpen(true);
  //         setMessage(response.data.error);
  //         setSeverity("error");
  //       } else {
  //         setOpen(true);
  //         setMessage(response.data.message);
  //         setSeverity("success");
  //         // setName("");
  //         // setId("");
  //         // setOpenPopup(false);
  //       }
  //     })
  //     .catch(function (error) {
  //       setOpen(true);
  //       setMessage("error: " + error);
  //       setSeverity("error");
  //     });
  // };
  // const validation = () => {
  //   if (name.length === 0) {
  //     setOpen(true);
  //     setMessage("Some fields are missing");
  //     setSeverity("error");
  //   } else {
  //     updateExpense();
  //   }
  // };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const editPurchaseDetails = (expense) => {
    // setOpenPopup(true);
    // setName(expense.name);
    // // setDescription(expense.description);
    // // setAmount(expense.amount);
    // setId(expense._id);
  };
  return (
    <div className="list">
      <SideBar />
      <div className="list-container">
        <Navbar />
        <ListHeader header={"Purchase Details"} />
        <DataTable
          data={data}
          columns={purchaseDetailsColumn.concat(actionColumn)}
          isForTransaction={false}
        />
      </div>
      <SnackBar open={open} severity={severity} message={message} />
    </div>
  );
};

export default PurchaseDetails;
