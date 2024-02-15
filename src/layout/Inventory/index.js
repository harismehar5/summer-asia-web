import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { inventoryListColumns, productColumns } from "../../dataTableColumns";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";

import {
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_INVENTORY_LIST,
  GET_INVENTORY_StockIn,
  GET_INVENTORY_StockOut,
  GET_PRODUCTS_LIST,
  STOCK_IN,
  STOCK_OUT,
  UPDATE_PRODUCT_BY_ID,
} from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";
import SnackBar from "../../components/alert/SnackBar";
import Popup from "../../components/popup/Popup";

export default function GetProductStock() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [packing, setPacking] = useState("");
  const [strength, setStrength] = useState("");
  const [tradeRate, setTradeRate] = useState("");
  const [purchaseRate, setPurchaseRate] = useState("");
  const [maximumRetailPrice, setMaximumRetailPrice] = useState("");
  const [distributerPrice, setDistributerPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [id, setID] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [openEditPopup, setEditOpenPopup] = useState(false);
  const [openStockInPopup, setStockInOpenPopup] = useState(false);
  const [openStockOutPopup, setStockOutOpenPopup] = useState(false);
  const [batchCode, setBatchCode] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [stockInData, setStockInData] = useState({});
  const [ProductId, setProductId] = useState(null)

  useEffect(() => {
    getInventoryList();
  }, []);

  const actionColumn = [
    {
      field: "stock",
      headerName: "Stock",
      width: 290,
      renderCell: (params) => {
        return (
          <Stack direction={"row"} spacing={1}>
            <Button
              variant="contained"
              size="medium"
              color="success"
              onClick={() => {
                setCode(params.row.productCode.code)
                setBatchCode(params.row.batchCode)
                formatDate(params.row.expiryDate)
                setProductId(params.row.productCode._id)
                setQuantity(params.row.quantity)
                setStockInData(params.row)
                setID(params.row._id);
                
                setStockInOpenPopup(true);
              }}
            >
              Stock In
            </Button>
            <Button
              variant="contained"
              size="medium"
              color="success"
              onClick={() => {
                setCode(params.row.productCode.code)
                setBatchCode(params.row.batchCode)
                formatDate(params.row.expiryDate)
                setProductId(params.row.productCode._id)
                setQuantity(params.row.quantity)
                setStockInData(params.row)
                setID(params.row._id);
                setStockOutOpenPopup(true);
              }}
            >
              Stock Out
            </Button>
          </Stack>
        );
      },
    },
  ];
  function formatDate(date) {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
let ConvertedDate = [year, month, day].join("-");
setExpiryDate(ConvertedDate)
    return [year, month, day].join("-");
  }

  const getInventoryList = () => {
    axios
      .get(GET_INVENTORY_LIST)
      .then(function (response) {
        // if (response.data.error) {
        //   setOpen(true);
        //   setMessage(response.data.error_msg);
        //   setSeverity("error");
        // } else {
        setData(response.data.data);
        console.log("data :",response.data?.data);

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
    console.log(JSON.stringify(stock_in,null,2))
    axios
      .post(GET_INVENTORY_StockIn, stock_in)
      .then(function (response) {
        console.log("stockIn response", JSON.stringify(response,null,2));
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
    console.log(JSON.stringify(stock_out,null,2))
    axios
      .post(GET_INVENTORY_StockOut , stock_out)
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
          header={"Inventory List"}
          firstButton={true}
          firstButtonText={"Add Inventory Item"}
          // firstLink={"/product/add"}
        />
        <DataTable
          data={data}
          columns={inventoryListColumns.concat(actionColumn)}
          isForTransaction={false}
          // loading={!data.length}
        />
        <Popup
          title="Stock In"
          openPopup={openStockInPopup}
          setOpenPopup={setStockInOpenPopup}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                label={"Product Code"}
                fullWidth
                variant="outlined"
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                label="Batch Code"
                fullWidth
                variant="outlined"
                value={batchCode}
                onChange={(event) => setBatchCode(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                label="Expiry Date"
                fullWidth
                variant="outlined"
                type="date"
                value={expiryDate}
                onChange={(event) => setExpiryDate(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
        
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                required
                label="Quantity"
                fullWidth
                variant="outlined"
                type="number"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={6}>
              <Grid
                justifyContent={"flex-end"}
                container
                spacing={1}
                direction={"row"}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    size="medium"
                    color="success"
                    onClick={() => {
                      if (quantity < 0) {
                        setOpen(true);
                        setMessage("Quantity should be greater then 0");
                        setSeverity("error");
                      } else if (quantity === "") {
                        setOpen(true);
                        setMessage("Please enter quantity");
                        setSeverity("error");
                      } else {
                        stockIn();
                      }
                    }}
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    size="medium"
                    color="error"
                    onClick={() => {
                      setQuantity("");
                      setID("");
                      setStockInOpenPopup(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Popup>

        <Popup
          title="Stock Out"
          openPopup={openStockOutPopup}
          setOpenPopup={setStockOutOpenPopup}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                label="Product Code"
                fullWidth
                variant="outlined"
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                label="Batch Code"
                fullWidth
                variant="outlined"
                value={batchCode}
                onChange={(event) => setBatchCode(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                label="Expiry Date"
                fullWidth
                variant="outlined"
                type="date"
                value={expiryDate}
                onChange={(event) => setExpiryDate(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
                 
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                required
                label="Quantity"
                fullWidth
                variant="outlined"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={6}>
              <Grid
                justifyContent={"flex-end"}
                container
                spacing={1}
                direction={"row"}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    size="medium"
                    color="success"
                    onClick={() => {
                      if (quantity < 0) {
                        setOpen(true);
                        setMessage("Quantity should be greater then 0");
                        setSeverity("error");
                      } else if (quantity === "") {
                        setOpen(true);
                        setMessage("Please enter quantity");
                        setSeverity("error");
                      } else {
                        stockOut();
                      }
                    }}
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    size="medium"
                    color="error"
                    onClick={() => {
                      setQuantity("");
                      setID("");
                      setStockInOpenPopup(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Popup>
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
