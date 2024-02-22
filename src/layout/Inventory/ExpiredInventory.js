import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import {
  expiredInventoryListColumns,
  inventoryListColumns,
  productColumns,
} from "../../dataTableColumns";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import {
  GET_ALL_PRODUCTS,
  GET_EXPIRED_INVENTORY,
  GET_INVENTORY_LIST,
  GET_INVENTORY_StockIn,
  GET_INVENTORY_StockOut,
} from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";
import SnackBar from "../../components/alert/SnackBar";

export default function ExpiredInventory() {
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [openStockInPopup, setStockInOpenPopup] = useState(false);
  const [openStockOutPopup, setStockOutOpenPopup] = useState(false);
  const [batchCode, setBatchCode] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [ProductId, setProductId] = useState(null);
  const [openAddInventoryPopup, setOpenAddInventoryPopup] = useState(false);
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});

  useEffect(() => {
    getInventoryList();
    fetchAllProductOptions();
  }, []);

  //   const actionColumn = [
  //     {
  //       field: "stock",
  //       headerName: "Stock",
  //       width: 290,
  //       renderCell: (params) => {
  //         return (
  //           <Stack direction={"row"} spacing={1}>
  //             <Button
  //               variant="contained"
  //               size="medium"
  //               color="success"
  //               onClick={() => {
  //                 setCode(params?.row?.productCode?.code);
  //                 setBatchCode(params?.row?.batchCode);
  //                 formatDate(params?.row?.expiryDate);
  //                 setProductId(params?.row?.productCode?._id);
  //                 setQuantity(params?.row?.quantity);
  //                 setStockInData(params?.row);
  //                 setID(params?.row?._id);

  //                 setStockInOpenPopup(true);
  //               }}
  //             >
  //               Stock AAAAAAAAAAA
  //             </Button>
  //             <Button
  //               variant="contained"
  //               size="medium"
  //               color="success"
  //               onClick={() => {
  //                 setCode(params?.row?.productCode?.code);
  //                 setBatchCode(params?.row?.batchCode);
  //                 formatDate(params?.row?.expiryDate);
  //                 setProductId(params?.row?.productCode?._id);
  //                 setQuantity(params?.row?.quantity);
  //                 setStockInData(params?.row);
  //                 setID(params?.row?._id);
  //                 setStockOutOpenPopup(true);
  //               }}
  //             >
  //               Stock Out
  //             </Button>
  //           </Stack>
  //         );
  //       },
  //     },
  //   ];
  //   function formatDate(date) {
  //     const d = new Date(date);
  //     let month = "" + (d.getMonth() + 1);
  //     let day = "" + d.getDate();
  //     const year = d.getFullYear();

  //     if (month.length < 2) month = "0" + month;
  //     if (day.length < 2) day = "0" + day;
  //     let ConvertedDate = [year, month, day].join("-");
  //     setExpiryDate(ConvertedDate);
  //     return [year, month, day].join("-");
  //   }

  const getInventoryList = () => {
    axios
      .get(GET_EXPIRED_INVENTORY)
      .then(function (response) {
        // if (response.data.error) {
        //   setOpen(true);
        //   setMessage(response.data.error_msg);
        //   setSeverity("error");
        // } else {
        setData(response.data.data);
        console.log("data :", response.data?.data);

        // }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage(error);
        setSeverity("error");
      });
  };

  const stockIn = () => {
    var stock_in = {
      productCode: ProductId,
      batchCode: batchCode,
      quantity: parseInt(quantity),
      expiryDate: expiryDate,
    };
    console.log(JSON.stringify(stock_in, null, 2));
    axios
      .post(GET_INVENTORY_StockIn, stock_in)
      .then(function (response) {
        console.log("stockIn response", JSON.stringify(response, null, 2));
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error);
          setSeverity("error");
          setStockInOpenPopup(false);
        } else {
          setOpen(true);
          setMessage(response.data.message);
          setSeverity("success");
          setQuantity("");
          setBatchCode("");
          setExpiryDate("");
          setStockInOpenPopup(false);
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage(error.toString());
        setSeverity("error");
      });
  };

  const stockOut = () => {
    var stock_out = {
      quantity: parseInt(quantity),
      productCode: ProductId,
      batchCode: batchCode,
      expiryDate: expiryDate,
    };
    console.log(JSON.stringify(stock_out, null, 2));
    axios
      .post(GET_INVENTORY_StockOut, stock_out)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error);
          setSeverity("error");
          setStockOutOpenPopup(false);
        } else {
          setOpen(true);
          setMessage(response.data.message);
          setSeverity("success");
          setQuantity("confrim");
          setStockOutOpenPopup(false);
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage(error);
        setSeverity("error");
      });
  };
  const fetchAllProductOptions = () => {
    axios
      .get(GET_ALL_PRODUCTS)
      .then((response) => {
        setProductOptions(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSave = () => {
    if (quantity < 0) {
      setOpen(true);
      setMessage("Quantity should be greater than 0");
      setSeverity("error");
    } else if (quantity === "") {
      setOpen(true);
      setMessage("Please enter quantity");
      setSeverity("error");
    } else {
      const newItem = {
        productCode: selectedProduct,
        batchCode: batchCode,
        expiryDate: expiryDate,
        quantity: parseInt(quantity),
      };

      axios
        .post(GET_INVENTORY_StockIn, newItem)
        .then(function (response) {
          if (response.data.error) {
            setOpen(true);
            setMessage(response.data.error);
            setSeverity("error");
          } else {
            setOpen(true);
            setMessage("Inventory item added successfully");
            setSeverity("success");

            setSelectedProduct(null);
            setBatchCode("");
            setExpiryDate("");
            setQuantity("");
            setOpenAddInventoryPopup(false);
          }
        })
        .catch(function (error) {
          setOpen(true);
          setMessage(error.toString());
          setSeverity("error");
        });
    }
  };

  //   <Button
  //     variant="contained"
  //     size="medium"
  //     color="success"
  //     onClick={handleSave}
  //   >
  //     Save
  //   </Button>;

  return (
    <div className="list">
      <Sidebar />
      <div className="list-container">
        <Navbar />
        <ListHeader
          header={"Expired Inventory List"}
          firstButton={true}
          firstButtonText={"Inventory List "}
          firstLink={"/inventory"}
        />

        <DataTable
          data={data}
          columns={expiredInventoryListColumns}
          isForTransaction={false}
        />

        <SnackBar
          open={open}
          severity={severity}
          message={message}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
}
