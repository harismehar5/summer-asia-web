import React, { useEffect, useState } from "react";
import "./styles.scss";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import axios from "axios";
import { produce } from "immer";

import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import {
  ADD_CUSTOMER_CASH_IN,
  ADD_SALE,
  ADD_STOCK_LOG,
  GET_CUSTOMERS_LIST,
  GET_PRODUCTS_LIST,
  SUBTRACT_QUANTITY,
} from "../../utils/config";
import SnackBar from "../../components/alert/SnackBar";

export default function AddSale() {
  const [data, setData] = useState([]);
  const [productList, setProductList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [productObject, setProductObject] = useState({
    _id: "",
    name: "",
    price: "",
    quantity: 0,
    sub_total: "",
    status: "",
  });
  const [customerObject, setCustomerObject] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalBags, setTotalBags] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [amount, setAmount] = useState("");
  const [submittedDate, setSubmittedDate] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const date = new Date();

  var cashIn = {
    amount: "",
    description: "",
    payment_medium: "",
    submit_date: "",
    cash_type: "",
  };
  var saleObject = {
    total_amount: "",
    total_quantity: "",
    customer: "",
    submit_date: "",
    order_details: "",
  };
  var saleDetail = [];
  var stockLog = [];
  var productArray = [];
  
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}/${month}/${year}`;

  useEffect(() => {
    getStockList();
    getCustomersList();
    calculateAmountAndBags(data);
  }, [data]);

  const dataEntry = () => {
    for (var i = 0; i < data.length; i++) {
      saleDetail.push({
        quantity: parseInt(data[i].quantity),
        amount: parseInt(data[i].price),
        product: data[i]._id,
      });
      stockLog.push({
        quantity: parseInt(data[i].quantity),
        product: data[i]._id,
        date: submittedDate,
        stock_type: "Stock Out",
      });
      productArray.push({
        quantity: parseInt(data[i].quantity),
        product: data[i]._id,
      });
    }
    saleObject = {
      total_amount: totalAmount,
      total_quantity: totalBags,
      customer: customerObject._id,
      submit_date: submittedDate,
      order_details: saleDetail,
    };
    cashIn = {
      amount: amount,
      description: "Sale",
      payment_medium: "Cash",
      submit_date: submittedDate,
      cash_type: "Cash In",
    };
    try {
      axios
        .all([
          axios.post(ADD_SALE, saleObject),
          axios.post(ADD_STOCK_LOG, { stock_log: stockLog }),
          axios.post(SUBTRACT_QUANTITY, {
            products: productArray,
          }),
          axios.patch(ADD_CUSTOMER_CASH_IN + customerObject._id, cashIn),
        ])
        .then(
          axios.spread(
            (firstResponse, secondResponse, thirdResponse, fourthResponse) => {
              if (
                !firstResponse.data.error &&
                !secondResponse.data.error &&
                !thirdResponse.data.error &&
                !fourthResponse.data.error
              ) {
                setOpen(true);
                setMessage("Data added successfully");
                setSeverity("success");
              } else {
                setOpen(true);
                setMessage("Something went wrong...!");
                setSeverity("error");
              }
            }
          )
        )
        .catch((error) => {
          setOpen(true);
          setMessage("error: " + error);
          setSeverity("error");
        });
    } catch (error) {
      setOpen(true);
      setMessage("error: " + error);
      setSeverity("error");
    }
  };
  const getStockList = () => {
    axios
      .get(GET_PRODUCTS_LIST)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error_msg);
          setSeverity("error");
        } else {
          setProductList(response.data.products);
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };
  const getCustomersList = () => {
    axios
      .get(GET_CUSTOMERS_LIST)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error_msg);
          setSeverity("error");
        } else {
          setCustomerList(response.data.customers);
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };
  const addProductIntoList = () => {
    if (productObject._id !== "") {
      var obj = {};
      var array = data;
      var foundIndex = data.findIndex((item) => item._id === productObject._id);
      if (data.length === 0) {
        obj = {
          _id: productObject._id,
          name: productObject.name,
          price: productObject.price,
          quantity: 1,
          sub_total: productObject.price,
          status: productObject.status,
        };
        array = [...array, obj];
        setData(array);
      } else if (foundIndex === -1) {
        obj = {
          _id: productObject._id,
          name: productObject.name,
          price: productObject.price,
          quantity: 1,
          sub_total: productObject.price,
          status: productObject.status,
        };
        array = [...array, obj];
        setData(array);
      } else {
        setOpen(true);
        setMessage("Already existed");
        setSeverity("error");
      }
    } else {
      setOpen(true);
      setMessage("Please select any product");
      setSeverity("error");
    }
  };

  const calculateAmountAndBags = (array) => {
    let sum = 0;
    var total_quantity = 0;
    array.forEach(function (item) {
      let total_amount = item.price * item.quantity;
      sum += total_amount;
      total_quantity += parseInt(item.quantity);
    });
    setTotalAmount(sum);
    setTotalBags(total_quantity);
    setTotalProducts(array.length);
  };

  const handleRemoveFields = (id) => {
    const arr = [...data];
    arr.splice(
      arr.findIndex((value) => value._id === id),
      1
    );
    setData(arr);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addProductIntoList();
    }
  };
  const validate = () => {
    if (data.length === 0) {
      setOpen(true);
      setMessage("Please select any product to sell");
      setSeverity("error");
    } else if (
      customerObject._id === "" ||
      customerObject._id === null ||
      customerObject._id === undefined
    ) {
      setOpen(true);
      setMessage("Please select any customer");
      setSeverity("error");
    } else if (submittedDate === "") {
      setOpen(true);
      setMessage("Please select date");
      setSeverity("error");
    } else {
      dataEntry();
    }
  };
  return (
    <div className="box">
      <SideBar />
      <div className="box-container">
        <Navbar />
        <Grid container item md={12} mt={3} px={2} sx={{ height: "90vh" }}>
          <Grid item md={8}>
            <Grid item container md={12}>
              <Grid item md={11} px={4}>
                <Autocomplete
                  options={productList}
                  getOptionLabel={(product, index) => product.name}
                  disablePortal
                  fullWidth
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(event, newInputValue) => {
                    setProductObject(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Product" />
                  )}
                  renderOption={(props, product) => (
                    <Box component="li" {...props} key={product._id}>
                      {product.name}
                    </Box>
                  )}
                  onKeyDown={handleKeyPress}
                />
              </Grid>
              <Grid item md={1}>
                <IconButton
                  // color="primary"
                  size="large"
                  onClick={addProductIntoList}
                  className="add-icon-button"
                >
                  <AddIcon fontSize="inherit" />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item md={12} mt={5} ml={4}>
              {/* <DataTable
                editMode={"row"}
                data={data}
                columns={tradingColumn}
                isForTransaction={true}
                loading={!data.length}
                experimentalFeatures={{ newEditingApi: true }}
                onCellEditCommit={handleRowEditCommit}
              /> */}
              {data.map((product, index) => {
                return (
                  <>
                    <Grid
                      container
                      flexDirection={"row"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      key={index}
                      mt={2}
                    >
                      <Grid item md={3} pr={2}>
                        <TextField
                          label="Product Name"
                          variant="outlined"
                          value={product.name}
                          disabled
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={3} px={2}>
                        <TextField
                          label="Quantity"
                          variant="outlined"
                          value={product.quantity}
                          onChange={(e) => {
                            var quantity = e.target.value;
                            setData((currentData) =>
                              produce(currentData, (v) => {
                                v[index].quantity = quantity;
                              })
                            );
                          }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={2} px={2}>
                        <TextField
                          label="Price"
                          variant="outlined"
                          value={product.price}
                          onChange={(e) => {
                            var price = e.target.value;
                            setData((currentData) =>
                              produce(currentData, (v) => {
                                v[index].price = price;
                              })
                            );
                          }}
                        />
                      </Grid>
                      <Grid item md={2} px={2}>
                        <TextField
                          label="Sub Total"
                          variant="outlined"
                          value={product.quantity * product.price}
                          disabled
                        />
                      </Grid>
                      <Grid item md={2} px={2}>
                        <IconButton
                          className="delete-icon-button"
                          onClick={() => handleRemoveFields(product._id)}
                        >
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </Grid>
          <Grid item md={4} sx={{ height: "90vh" }}>
            <Grid container item md={12} px={2}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                sx={{ width: "100%" }}
                // mt={2}
              >
                <Autocomplete
                  options={customerList}
                  getOptionLabel={(customer, index) => customer.name}
                  disablePortal
                  fullWidth
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  onChange={(event, newInputValue) => {
                    setCustomerObject(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Customer" />
                  )}
                  renderOption={(props, customer) => (
                    <Box component="li" {...props} key={customer._id}>
                      {customer.name}
                    </Box>
                  )}
                />
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                sx={{ width: "100%" }}
                mt={2}
              >
                <TextField
                  label="Select Date"
                  type="date"
                  defaultValue={currentDate}
                  onChange={(event) => {
                    setSubmittedDate(event.target.value);
                  }}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                sx={{ width: "100%" }}
                mt={2}
              >
                <TextField
                  id="amount"
                  name="amount"
                  label="Enter Amount"
                  fullWidth
                  variant="outlined"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                />
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                sx={{ width: "100%" }}
                mt={2}
              >
                <Typography>Total Amount</Typography>
                <Typography>RS {totalAmount}</Typography>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                sx={{ width: "100%" }}
                mt={2}
              >
                <Typography>Total Bags</Typography>
                <Typography>{totalBags}</Typography>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                sx={{ width: "100%" }}
                mt={2}
              >
                <Typography>Total Products</Typography>
                <Typography>{totalProducts}</Typography>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"end"}
                sx={{ width: "100%" }}
                mt={2}
                alignItems={"end"}
              >
                <Button
                  variant="contained"
                  size="medium"
                  color="success"
                  onClick={() => validate()}
                  sx={{ marginX: "10px" }}
                >
                  Save
                </Button>
                <Button
                  // sx={{ marginLeft: "10px" }}
                  variant="contained"
                  size="medium"
                  color="error"
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
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
