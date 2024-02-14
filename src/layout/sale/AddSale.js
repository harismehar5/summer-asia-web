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
  ADD_PURCHASE,
  GET_ALL_COMPANIES,
  GET_PRODUCTS_LIST,
  ADD_STOCK_LOG,
  ADD_QUANTITY,
  ADD_SUPPLIER_CASH_OUT,
  GET_ALL_PRODUCTS,
  GET_BATCH_LIST,
  GET_SALESMEN_LIST,
  GET_QUANTITY_AND_EXPIRY_LIST,
} from "../../utils/config";
import SnackBar from "../../components/alert/SnackBar";

export default function AddSale() {
  const [productList, setProductList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [batchList, setBatchList] = useState([]);
  const [productObject, setProductObject] = useState({
    batchCode: "",
    expiryDate: "",
    quantity: 0,
    discount: 0,
    bonus: 0,
    salesTax: 0,
    tradeRate: 0,
    netTotal: "",
    status: "",
    productCode: "",
  });
  const [data, setData] = useState([productObject]);
  const [supplierObject, setSupplierObject] = useState({});
  const [DateAndQuantityObject, setDateAndQuantityObject] = useState({});
  const [SalesManList, setSalesManList] = useState([]);

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalBags, setTotalBags] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [amount, setAmount] = useState("");
  const [submittedDate, setSubmittedDate] = useState("");
  const [code, setCode] = useState("");
  const paymentMediumList = [
    {
      id: 1,
      name: "Bank",
    },
    {
      id: 2,
      name: "Cash",
    },
    {
      id: 3,
      name: "Cheque",
    },
    {
      id: 4,
      name: "Other",
    },
  ];
  const [paymentMediumObject, setPaymentMediumObject] = useState({});
  const [SaleManObject, setSaleManObject] = useState({});
  const [ProductId, setProductId] = useState(null);
  const [BatchId, setBatchId] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const date = new Date();

  var purchaseObject = {
    total_amount: "",
    total_quantity: "",
    supplier: "",
    submit_date: "",
    order_details: "",
  };
  var cashOut = {
    amount: "",
    description: "",
    payment_medium: "",
    submit_date: "",
    cash_type: "",
  };
  var purchaseDetail = [];
  var stockLog = [];
  var productArray = [];

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}/${month}/${year}`;

  useEffect(() => {
    getStockList();
    getSupplierList();
    getSalesManList();
    calculateAmountAndBags(data);
  }, []);

  const dataEntry = (data) => {
 
    // axios
    //   .post(ADD_PURCHASE, data)
    //   .then((response) => {
    //   //  console.log("response ==",JSON.stringify(response,null,2))
    //   })
    //   .catch((error) => {
    //     setOpen(true);
    //     setMessage("error: " + error);
    //     setSeverity("error");
    //   });
  };

  const getStockList = () => {
    axios
      .get(GET_ALL_PRODUCTS)
      .then(function (response) {
        // if (response.data.error) {
        //   setOpen(true);
        //   setMessage(response.data.error_msg);
        //   setSeverity("error");
        // } else {
        setProductList(response.data.data);
        // }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };

  const getBatchList = (productCode) => {
    console.log("Product Code", productCode);
    axios
      .post(GET_BATCH_LIST, {
        productCode: productCode,
      })
      .then(function (response) {
        console.log("Response", response);
        // if (response.data.error) {
        //   setOpen(true);
        //   setMessage(response.data.error_msg);
        //   setSeverity("error");
        // } else {
        setBatchList(response.data.data);
        // }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };
  const getSupplierList = () => {
    axios
      .get(GET_ALL_COMPANIES)
      .then(function (response) {
        // if (response.data.error) {
        //   setOpen(true);
        //   setMessage(response.data.error_msg);
        //   setSeverity("error");
        // } else {
        setSupplierList(response.data.data);
        // }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };
  const addProductIntoList = () => {
    console.log("Product Object", productObject);
    // if (productObject._id !== "") {
    var obj = {};
    var array = data;
    var foundIndex = data.findIndex((item) => item._id === productObject._id);
    // if (data.length === 0) {
    obj = {
                productCode: productObject.productCode,
                quantity: productObject.quantity,
                tradeRate: productObject.tradeRate,
                expiryDate: productObject.expiryDate,
                batchCode: productObject.batchCode,
                bonus: productObject.bonus,
                discount: productObject.discount,
                salesTax:productObject.salesTax,
                netTotal: productObject.netTotal
    
    };
    array = [...array, obj];
    setData(array);
    // } else if (foundIndex === -1) {
    //   obj = {
    //     _id: productObject._id,
    //     name: productObject.name,
    //     tradeRate: productObject.tradeRate,
    //     quantity: 1,
    //     netTotal: productObject.tradeRate,
    //     status: productObject.status,
    //   };
    //   array = [...array, obj];
    //   setData(array);
    // } else {
    //   setOpen(true);
    //   setMessage("Already existed");
    //   setSeverity("error");
    // }
    // } else {
    //   setOpen(true);
    //   setMessage("Please select any product");
    //   setSeverity("error");
    // }
  };
  const getSalesManList = () => {
    axios
      .get(GET_SALESMEN_LIST)
      .then(function (response) {
        setSalesManList(response.data.data);
        // if (response.data.error) {
        //   handleSnackbar("error", response.data.error_msg);
        // } else {
        //   const formattedData = response.data.data.map((salesman) => ({
        //     ...salesman,
        //     dateOfJoin: salesman.dateOfJoin
        //       ? new Date(salesman.dateOfJoin).toISOString().split("T")[0]
        //       : null,
        //   }));
        //   setData(formattedData);
        // }
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
        // handleSnackbar("error", "Error: " + error);
      });
  };
  const getQuantityAndExpiryObject = (batchId) => {
    let payload = {
      productCode: ProductId,
      batchCode: batchId,
    };
  
    axios
    .post(GET_QUANTITY_AND_EXPIRY_LIST,payload)
    .then(function (response) {
      setDateAndQuantityObject(response.data)
      //setSalesManList(response.data.data)
      // if (response.data.error) {
      //   handleSnackbar("error", response.data.error_msg);
      // } else {
      //   const formattedData = response.data.data.map((salesman) => ({
      //     ...salesman,
      //     dateOfJoin: salesman.dateOfJoin
      //       ? new Date(salesman.dateOfJoin).toISOString().split("T")[0]
      //       : null,
      //   }));
      //   setData(formattedData);
      // }
    })
    .catch(function (error) {
      console.error("Error fetching data:", error);
      // handleSnackbar("error", "Error: " + error);
    });
  };
  const calculateAmountAndBags = (array) => {
    let sum = 0;
    var total_quantity = 0;
    array.forEach(function (item) {
      let total_amount = item.tradeRate * item.quantity;
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
    var companyCode = supplierObject._id;
    var paymentMode = paymentMediumObject.name;
    var totalAmount = 0;
    for (let i = 0; i < data.length; i++) {
      totalAmount = totalAmount + data[i].netTotal;
    }

    var purchaseObject = {
      purchaseDetail: data,
      companyCode: companyCode,
      paymentMode: paymentMode,
      saleman:SaleManObject._id,
      total: totalAmount,
    };
    console.log("Data ===", JSON.stringify(purchaseObject,null,2));

    // if (data.length === 0) {
    //   setOpen(true);
    //   setMessage("Please select any product to purchase");
    //   setSeverity("error");
    // } else if (
    //   supplierObject._id === "" ||
    //   supplierObject._id === null ||
    //   supplierObject._id === undefined
    // ) {
    //   setOpen(true);
    //   setMessage("Please select any supplier");
    //   setSeverity("error");
    // } else if (submittedDate === "") {
    //   setOpen(true);
    //   setMessage("Please select date");
    //   setSeverity("error");
    // } else {
    dataEntry(purchaseObject);
    // }
  };
  // Function to format date to "yyyy-MM-dd" format
function formatDate(date) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) 
    month = '0' + month;
  if (day.length < 2) 
    day = '0' + day;

  return [year, month, day].join('-');
}
  return (
    <div className="box">
      <SideBar />
      <div className="box-container">
        <Navbar />
        {/* <Grid container item md={12} mt={3} px={2} sx={{ height: "90vh" }}> */}
        <Grid item md={12}>
          <Grid item container md={12} mt={3} px={2}>
            <Grid item md={12} px={2} py={1}>
              <Autocomplete
                options={supplierList}
                getOptionLabel={(supplier, index) => supplier.name}
                disablePortal
                fullWidth
                isOptionEqualToValue={(option, value) =>
                  option._id === value._id
                }
                onChange={(event, newInputValue) => {
                  setSupplierObject(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Company" />
                )}
                renderOption={(props, supplier) => (
                  <Box component="li" {...props} key={supplier._id}>
                    {supplier.name}
                  </Box>
                )}
              />
            </Grid>
            <Grid item md={12} px={2} py={1}>
              <Autocomplete
                options={paymentMediumList}
                getOptionLabel={(payment, index) => payment.name}
                disablePortal
                fullWidth
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, newInputValue) => {
                  setPaymentMediumObject(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Payment Medium" />
                )}
                renderOption={(props, payment) => (
                  <Box component="li" {...props} key={payment.id}>
                    {payment.name}
                  </Box>
                )}
              />
            </Grid>
            <Grid item md={12} px={2} py={1}>
              <Autocomplete
                options={SalesManList}
                getOptionLabel={(saleMen, index) => saleMen.name}
                disablePortal
                fullWidth
                isOptionEqualToValue={(option, value) =>
                  option._id === value._id
                }
                onChange={(event, newInputValue) => {
                  setSaleManObject(newInputValue);
            
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Salesmen" />
                )}
                renderOption={(props, saleMan) => (
                  <Box component="li" {...props} key={saleMan._id}>
                    {saleMan.name}
                  </Box>
                )}
              />
            </Grid>
          </Grid>
          <Grid item md={12} mt={2} ml={4}>
            {data.map((product, index) => {
              return (
                <>
                  <Grid
                    container
                    flexDirection={"row"}
                    // justifyContent={"center"}
                    alignItems={"center"}
                    key={index}
                    mt={2}
                  >
                    <Grid item md={1.5} pr={1}>
                      <Autocomplete
                        options={productList}
                        getOptionLabel={(product, index) => product.name}
                        disablePortal
                        fullWidth
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        onChange={(event, newInputValue) => {
                          setProductId(newInputValue._id);
                          var productObject = newInputValue;
                          setData((currentData) =>
                            produce(currentData, (v) => {
                              v[index].productCode = productObject._id;
                            })
                          );
                          getBatchList(productObject._id);
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
                    <Grid item md={1.5} px={1}>
                      <Autocomplete
                        options={batchList}
                        getOptionLabel={(batch, index) => batch.batchCode}
                        disablePortal
                        fullWidth
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        onChange={(event, newInputValue) => {
                          setBatchId(newInputValue.batchCode);
                          var batchObject = newInputValue;
                          setData((currentData) =>
                            produce(currentData, (v) => {
                              v[index].productCode = batchObject.batchCode;
                            })
                          );
                          getQuantityAndExpiryObject(newInputValue.batchCode);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} label="Select Batch" />
                        )}
                        renderOption={(props, batch) => (
                          <Box component="li" {...props} key={batch._id}>
                            {batch.batchCode}
                          </Box>
                        )}
                        onKeyDown={handleKeyPress}
                      />
                    </Grid>
                    <Grid item md={1.5} px={1}>
                      <TextField
                        label={ "Select Date"}
                        type="date"
                        value={DateAndQuantityObject.expiryDate ? formatDate(DateAndQuantityObject.expiryDate) : ''}
                        // defaultValue={currentDate}
                        onChange={(e) => {
                          var expiryDate = e.target.value;
                          setData((currentData) =>
                            produce(currentData, (v) => {
                              v[index].expiryDate = expiryDate;
                            })
                          );
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={1} px={1}>
                      <TextField
                        label="Quantity"
                        variant="outlined"
                        value={DateAndQuantityObject?.quantity||product.quantity}
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
                    <Grid item md={1} px={1}>
                      <TextField
                        label="Discount"
                        variant="outlined"
                        value={product.discount}
                        onChange={(e) => {
                          var discount = e.target.value;
                          setData((currentData) =>
                            produce(currentData, (v) => {
                              v[index].discount = discount;
                            })
                          );
                        }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={1} px={1}>
                      <TextField
                        label="Bonus"
                        variant="outlined"
                        value={product.bonus}
                        onChange={(e) => {
                          var bonus = e.target.value;
                          setData((currentData) =>
                            produce(currentData, (v) => {
                              v[index].bonus = bonus;
                            })
                          );
                        }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={1} px={1}>
                      <TextField
                        label="Sales Tax"
                        variant="outlined"
                        value={product.salesTax}
                        onChange={(e) => {
                          var salesTax = e.target.value;
                          setData((currentData) =>
                            produce(currentData, (v) => {
                              v[index].salesTax = salesTax;
                            })
                          );
                        }}
                      />
                    </Grid>
                    <Grid item md={1.2} px={1}>
                      <TextField
                        label="Trade Rate"
                        variant="outlined"
                        value={product.tradeRate}
                        onChange={(e) => {
                          var tradeRate = e.target.value;
                          setData((currentData) =>
                            produce(currentData, (v) => {
                              v[index].tradeRate = tradeRate;
                            })
                          );
                        }}
                      />
                    </Grid>
                    <Grid item md={1} px={1}>
                      <TextField
                        label="Sub Total"
                        variant="outlined"
                        value={product.quantity * product.tradeRate}
                        disabled
                      />
                    </Grid>
                    <Grid item md={0.5} px={1}>
                      <IconButton
                        className="delete-icon-button"
                        onClick={() => handleRemoveFields(product._id)}
                      >
                        <DeleteOutlineOutlinedIcon />
                      </IconButton>
                    </Grid>
                    <Grid item md={0.5} px={1}>
                      <IconButton
                        className="add-icon-button"
                        onClick={addProductIntoList}
                      >
                        <AddIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </>
              );
            })}
          </Grid>
          <Box
            display={"flex"}
            justifyContent={"end"}
            mt={2}
            mr={4}
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
        {/* <Grid item md={4} sx={{ height: "90vh" }}>
            <Grid container item md={12} px={2}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                sx={{ width: "100%" }}
              // mt={2}
              >
                <Autocomplete
                  options={supplierList}
                  getOptionLabel={(supplier, index) => supplier.name}
                  disablePortal
                  fullWidth
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  onChange={(event, newInputValue) => {
                    setSupplierObject(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Supplier" />
                  )}
                  renderOption={(props, supplier) => (
                    <Box component="li" {...props} key={supplier._id}>
                      {supplier.name}
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
          </Grid> */}
        {/* </Grid> */}
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
