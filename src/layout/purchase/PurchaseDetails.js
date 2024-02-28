import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import ListHeader from "../../components/listHeader/ListHeader";
import DataTable from "../../components/dataTable/DataTable";
import SnackBar from "../../components/alert/SnackBar";
import { useParams } from "react-router-dom";
import { purchaseDetailsColumn } from "../../dataTableColumns";
import { GET_PURCHASE_LIST } from "../../utils/config";
import axios from "axios";

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
        // console.log(JSON.stringify(response, null, 2));
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
  return (
    <div className="list">
      <SideBar />
      <div className="list-container">
        <Navbar />
        <ListHeader header={"Purchase Details"} />
        <DataTable
          data={data}
          columns={purchaseDetailsColumn}
          isForTransaction={false}
        />
      </div>
      <SnackBar open={open} severity={severity} message={message} />
    </div>
  );
};

export default PurchaseDetails;
