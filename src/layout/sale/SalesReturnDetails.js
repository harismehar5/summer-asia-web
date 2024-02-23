import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import ListHeader from "../../components/listHeader/ListHeader";
import DataTable from "../../components/dataTable/DataTable";
import SnackBar from "../../components/alert/SnackBar";
import {useParams} from "react-router-dom";
import {
  saleDetailsColumn,
} from "../../dataTableColumns";
import {
  GET_SALE_RETURN_LIST,
} from "../../utils/config";
import axios from "axios";

const SalesReturnDetails = () => {
  
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  // console.log("params id =", id);

  const getSaleDetailsList = async () => {
    await axios
      .get(GET_SALE_RETURN_LIST + "/" + id)
      .then(function (response) {
        // console.log(response.data);
        // console.log("sale return", JSON.stringify(response, null, 2));

        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error_msg);
          setSeverity("error");
        } else {
          setData(response.data.saleReturnDetail);
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };
  useEffect(() => {
    getSaleDetailsList();
  }, []);
  return (
    <div className="list">
      <SideBar />
      <div className="list-container">
        <Navbar />
        <ListHeader
          header={"Sales Return Details"}
        />
        <DataTable
          data={data}
          columns={saleDetailsColumn}
          isForTransaction={false}
        />
      </div>
      <SnackBar
        open={open}
        severity={severity}
        message={message}
      />
    </div>
  );
};

export default SalesReturnDetails;
