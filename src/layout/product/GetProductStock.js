import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { productColumns } from "../../dataTableColumns";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";

import {
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
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
  const [code, setCode] = useState("")
  const [packing, setPacking] = useState("")
  const [strength, setStrength] = useState("")
  const [tradeRate, setTradeRate] = useState("")
  const [PurchaseRate, setPurchaseRate] = useState("")
  const [maximumRetailPrice, setMaximumRetailPrice] = useState("")
  const [distributerPrice, setDistributerPrice] = useState("")
  const [quantity, setQuantity] = useState("");
  const [id, setID] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [openEditPopup, setEditOpenPopup] = useState(false);
  const [openStockInPopup, setStockInOpenPopup] = useState(false);
  const [openStockOutPopup, setStockOutOpenPopup] = useState(false);

  useEffect(() => {
    getStockList();
  }, []);

  const actionColumn = [
      // {
      //   field: "stock",
      //   headerName: "Stock",
      //   width: 250,
      //   renderCell: (params) => {
      //     return (
      //       <Stack direction={"row"} spacing={1}>
      //         <Button
      //           variant="contained"
      //           size="medium"
      //           color="success"
      //           onClick={() => {
      //             setID(params.row._id);
      //             setQuantity("");
      //             setStockInOpenPopup(true);
      //           }}
      //         >
      //           Stock In
      //         </Button>
      //         <Button
      //           variant="contained"
      //           size="medium"
      //           color="success"
      //           onClick={() => {
      //             setID(params.row._id);
      //             setQuantity("");
      //             setStockOutOpenPopup(true);
      //           }}
      //         >
      //           Stock Out
      //         </Button>
      //       </Stack>
      //     );
      //   },
      // },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="cell-action">
            <IconButton
              aria-label="edit"
              size="medium"
              onClick={() => {
                setID(params.row._id);
                setName(params.row.name);
                setEditOpenPopup(true);
              }}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="medium"
              onClick={() => deleteProduct(params.row._id)}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const getStockList = () => {
    axios
      .get(GET_ALL_PRODUCTS)
      .then(function (response) {
        // if (response.data.error) {
        //   setOpen(true);
        //   setMessage(response.data.error_msg);
        //   setSeverity("error");
        // } else {
          setData(response.data.data);
        // }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage(error);
        setSeverity("error");
      });
  };
  const deleteProduct = (id) => {
    axios
      .delete(DELETE_PRODUCT + id)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error_msg);
          setSeverity("error");
        } else {
          setOpen(true);
          setMessage(response.data.success_msg);
          setSeverity("success");
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage(error);
        setSeverity("error");
      });
  };
  const updateProduct = () => {
    var product = {
      name: name,
      price: 0,
      quantity: 0,
    };
    axios
      .patch(UPDATE_PRODUCT_BY_ID + id, product)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error_msg);
          setSeverity("error");
          setEditOpenPopup(false);
        } else {
          setOpen(true);
          setMessage(response.data.success_msg);
          setSeverity("success");
          setName("");
          setEditOpenPopup(false);
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage(error);
        setSeverity("error");
      });
  };
  const stockIn = () => {
    var stock_in = {
      quantity: parseInt(quantity),
    };
    axios
      .put(STOCK_IN + id, stock_in)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error_msg);
          setSeverity("error");
          setStockInOpenPopup(false);
        } else {
          setOpen(true);
          setMessage(response.data.success_msg);
          setSeverity("success");
          setQuantity("");
          setStockInOpenPopup(false);
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage(error);
        setSeverity("error");
      });
  };
  const stockOut = () => {
    var stock_out = {
      quantity: parseInt(quantity),
    };
    axios
      .put(STOCK_OUT + id, stock_out)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error_msg);
          setSeverity("error");
          setStockOutOpenPopup(false);
        } else {
          setOpen(true);
          setMessage(response.data.success_msg);
          setSeverity("success");
          setQuantity("");
          setStockOutOpenPopup(false);
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage(error);
        setSeverity("error");
      });
  };
  const validation = () => {
    if (name.length === 0) {
      setOpen(true);
      setMessage("Name is required");
      setSeverity("error");
    } else {
      updateProduct();
    }
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
          header={"Products List"}
          firstButton={true}
          firstButtonText={"Add New Product"}
          firstLink={"/product/add"}
        />
        <DataTable
          data={data}
          columns={productColumns.concat(actionColumn)}
          isForTransaction={false}
        // loading={!data.length}
        />
        <Popup
          title="Product Form"
          openPopup={openEditPopup}
          setOpenPopup={setEditOpenPopup}
        >
            <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              {/* <TextField
                required
                label="Company Name"
                fullWidth
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
              /> */}
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                label="Code"
                fullWidth
                variant="outlined"
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                label="Name"
                fullWidth
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Packing"
                fullWidth
                variant="outlined"
                value={packing}
                onChange={(event) => setPacking(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Strength"
                fullWidth
                variant="outlined"
                value={strength}
                onChange={(event) => setStrength(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Trade Rate"
                fullWidth
                variant="outlined"
                value={tradeRate}
                onChange={(event) => setTradeRate(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Purchase Rate"
                fullWidth
                variant="outlined"
                value={PurchaseRate}
                onChange={(event) => setPurchaseRate(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Retail Price (Max)"
                fullWidth
                variant="outlined"
                value={maximumRetailPrice}
                onChange={(event) => setMaximumRetailPrice(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Distributer Price"
                fullWidth
                variant="outlined"
                value={distributerPrice}
                onChange={(event) => setDistributerPrice(event.target.value)}
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
                    onClick={() => validation()}
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    size="medium"
                    color="error"
                    onClick={() => setName("")}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Popup>
        <Popup
          title="Stock In"
          openPopup={openStockInPopup}
          setOpenPopup={setStockInOpenPopup}
        >
          <Grid container spacing={3}>
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
                      setStockOutOpenPopup(false);
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
