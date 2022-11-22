import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

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
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="view-button">View</div>
            </Link> */}
            {/* <Button
              size="small"
              variant="contained"
              startIcon={<RemoveRedEyeOutlinedIcon />}
            >
              View
            </Button> */}
            <IconButton aria-label="delete" size="medium">
              <VisibilityIcon fontSize="inherit" />
            </IconButton>
            {/* <div
              className="delete-button"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div> */}
            <IconButton aria-label="delete" size="medium">
              <EditIcon fontSize="inherit" />
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
          console.log(response.data.error_msg);
          setOpen(true);
          setMessage(response.data.error_msg);
          setSeverity("error");
        } else {
          var array = [];
          for (var i = 0; i < response.data.purchases.length; i++) {
            array.push({
              _id: response.data.purchases[i]._id,
              total_amount: response.data.purchases[i].total_amount,
              total_quantity: response.data.purchases[i].total_quantity,
              supplier: response.data.purchases[i].supplier.name,
              submit_date: response.data.purchases[i].submit_date,
              status: response.data.purchases[i].status,
              order_details: response.data.purchases[i].order_details,
              createdAt: response.data.purchases[i].createdAt,
              updatedAt: response.data.purchases[i].updatedAt,
              __v: response.data.purchases[i].__v,
            });
          }
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
