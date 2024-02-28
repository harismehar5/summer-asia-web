import React, { useEffect, useState } from "react";
import { Autocomplete, IconButton } from "@mui/material";
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
import { Button } from "@mui/material";
import {
  ADD_PRODUCT,
  GET_ALL_COMPANIES,
  GET_ALL_PRODUCTS,
  STOCK_IN,
  STOCK_OUT,
} from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";
import SnackBar from "../../components/alert/SnackBar";
import Popup from "../../components/popup/Popup";
import { Box } from "@mui/system";

export default function GetProductStock() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [packing, setPacking] = useState("");
  const [strength, setStrength] = useState("");
  const [tradeRate, setTradeRate] = useState("");
  const [PurchaseRate, setPurchaseRate] = useState("");
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
  const [companyObject, setCompanyObject] = useState(null); // Change from {} to null
  const [companyList, setCompanyList] = useState([]);
  const [selectedCompanyName, setSelectedCompanyName] = useState("");

  useEffect(() => {
    getStockList();
    getSupplierList();
  }, []);

  useEffect(() => {
    if (id) {
      const selectedProduct = data.find((product) => product._id === id);
  
      if (selectedProduct) {
        setName(selectedProduct.name || "");
        setCode(selectedProduct.code || "");
        setCompanyObject(selectedProduct.companyObject || null); // Change from {} to null
        setPacking(selectedProduct.packing || "");
        setStrength(selectedProduct.strength || "");
        setTradeRate(selectedProduct.tradeRate || "");
        setPurchaseRate(selectedProduct.purchaseRate || "");
        setMaximumRetailPrice(selectedProduct.maximumRetailPrice || "");
        setDistributerPrice(selectedProduct.distributerPrice || "");
        setSelectedCompanyName(selectedProduct.companyObject?.name || "");
      }
    }
  }, [id, data]);
  
  
  useEffect(() => {
    if (companyObject && companyList) {
      const selectedCompany = companyList.find((company) => company._id === companyObject._id);
      if (selectedCompany) {
        setSelectedCompanyName(selectedCompany.name);
      }
    }
  }, [companyObject, companyList]);
  

  const getSupplierList = () => {
    axios
      .get(GET_ALL_COMPANIES)
      .then(function (response) {
        setCompanyList(response.data.data);
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
        //   setMessage(response.data.error);
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
      .delete(GET_ALL_PRODUCTS + '/' + id)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error);
          setSeverity("error");
        } else {
          setOpen(true);
          setMessage(response.data.message);
          setSeverity("success");
          // Assuming you want to refresh the product list after successful deletion
          getStockList();
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage(error);
        setSeverity("error");
      });
  };
  
  const updateProduct = () => {
    var     product = {
      code: code,
      companyCode:companyObject._id,
      name: name,
      packing: packing,
      strength: strength,
      tradeRate: tradeRate,
      purchaseRate: PurchaseRate,
      maximumRetailPrice: maximumRetailPrice,
      distributerPrice: distributerPrice,
    };
    axios
      .put(ADD_PRODUCT + '/' + id, product)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error);
          setSeverity("error");
          setEditOpenPopup(false);
        } else {
          setOpen(true);
          setMessage(response.data.message);
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
          setMessage(response.data.error);
          setSeverity("error");
          setStockInOpenPopup(false);
        } else {
          setOpen(true);
          setMessage(response.data.message);
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
          setMessage(response.data.error);
          setSeverity("error");
          setStockOutOpenPopup(false);
        } else {
          setOpen(true);
          setMessage(response.data.message);
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
            <Grid item xs={12} sm={6}>
            <Autocomplete
   getOptionSelected={(option, value) => option._id === value._id}
  options={companyList}
  getOptionLabel={(supplier) => supplier.name || ''}
  disablePortal
  fullWidth
  value={companyObject} 
  onChange={(event, newInputValue) => {
    if (newInputValue !== null) {
      setCompanyObject(newInputValue);
      setSelectedCompanyName(newInputValue.name);
    }
  }}
  renderInput={(params) => <TextField  
  required {...params} label="Select Company" />}
  renderOption={(props, supplier) => (
    <Box component="li" {...props} key={supplier._id}>
      {supplier.name}
    </Box>
  )}
/>
            </Grid>
            <Grid item xs={12} sm={6}>
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
                type="number"
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
                type="number"
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
                type="number"
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
                type="number"
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
                type="number"
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
                type="number"
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
