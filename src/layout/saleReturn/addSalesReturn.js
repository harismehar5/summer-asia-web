import React, { useEffect, useState } from "react";
import "./styles.scss";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Button, FormHelperText, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import axios from "axios";
import { produce } from "immer";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import {
  GET_SALESRETURN_LIST,
  GET_CUSTOMERS_LIST,
  GET_ALL_PRODUCTS,
  GET_salesman_LIST,
} from "../../utils/config";
import SnackBar from "../../components/alert/SnackBar";


export default function AddSalesReturn() {
    
  const [productList, setProductList] = useState([]);
  const [customerCode, setCustomerCode] = useState([]);
  const [salesman, setsalesman] = useState([]);
  const [productObject, setProductObject] = useState({
    batchCode: "",
    expiryDate: "",
    quantity: 0,
    discount: 0,
    bonus: 0,
    salesTax: 0,
    tradeRate: 0,
    netTotal: "",
    productCode: "",
    subtotal:"",
  });
  const [data, setData] = useState([productObject]);
  const [supplierObject, setSupplierObject] = useState({});
  const [customerObject, setCustomerObject] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalBags, setTotalBags] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

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
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const date = new Date();
    // error states
    const [customerError, setCustomerError] = useState("");
    const [paymentMediumError, setPaymentMediumError] = useState("");
    const [salesmanError, setSalesmanError] = useState("");
    const [productError, setProductError] = useState("");

  useEffect(() => {
    getStockList();
    getCustomerList();
    getsalesmanList();
    calculateAmountAndBags(data);
  }, []);
//

  const dataEntry = (data) => {
    axios
      .post(GET_SALESRETURN_LIST, data)
      .then(response => {
        if (response.data.error) {
          handleSnackbar("error", response.data.error);
        } else {
          handleSnackbar("success", response.data.message);
        }
      }
      )
      .catch((error) => {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };

  const getStockList = () => {
    axios
      .get(GET_ALL_PRODUCTS)
      .then(function (response) {
        setProductList(response.data.data);
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };
  const getCustomerList = () => {
    axios
      .get(GET_CUSTOMERS_LIST)
      .then(function (response) {
        setCustomerCode(response.data.data);
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };
  const getsalesmanList = () => {
    axios
      .get(GET_salesman_LIST)
      .then(function (response) {
        // if (response.data.error) {
        //   setOpen(true);
        //   setMessage(response.data.error);
        //   setSeverity("error");
        // } else {
        setsalesman(response.data.data);
        // }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };
  const addProductIntoList = () => {
    // console.log("Product Object", productObject)
    // if (productObject._id !== "") {
    var obj = {};
    var array = data;
    var foundIndex = data.findIndex((item) => item._id === productObject._id);
    // if (data.length === 0) {
    obj = {
      tradeRate: productObject.tradeRate,
      quantity: 1,
      bonus: 0,
      discount: 0,
      salesTax: productObject.salesTax,
      tradeRate: productObject.tradeRate,
      // netTotal: productObject.tradeRate,
      netTotal: "",
      status: productObject.status,
      productCode: productObject.code
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

    setSalesmanError("");
    setPaymentMediumError("");
    setCustomerError("");
    let isValid = true;

    
    if (!customerObject._id) {
      setCustomerError("Select a company");
      isValid = false;
    }

    if (!paymentMediumObject.id) {
      setPaymentMediumError("Select a payment medium");
      isValid = false;
    }

    
    if (!supplierObject._id) {
      setSalesmanError("Select a salesman");
      isValid = false;
    }

        // Validate products
        for (let i = 0; i < data.length; i++) {
          const product = data[i];
          if (!product.productCode || !product.batchCode || !product.expiryDate || !product.quantity || !product.tradeRate || !product.salesTax) {
            setProductError("Complete all product fields");
            isValid = false;
            break;
          }
        }

    var customerCode = customerObject._id
    var salesmanCode = supplierObject._id
    var paymentMode = paymentMediumObject.name
    var totalAmount = 0
    for (let i = 0; i < data.length; i++) {
      totalAmount = totalAmount + data[i].netTotal
    }

    var purchaseObject = {
      saleReturnDetail: data,
      customerCode: customerCode,
      salesmanCode:salesmanCode,
      paymentMode: paymentMode,
      total: totalAmount
    }
    // console.log("Data", purchaseObject)
    if (isValid) {
      dataEntry(purchaseObject);
    } else {
      handleSnackbar("error", "Enter valid values!");
    }
  };

  const handleSnackbar = (severity, message) => {
    setOpen(true);
    setSeverity(severity);
    setMessage(message);
  };
  return (
    <div className="box">
      <SideBar />
      <div className="box-container">
        <Navbar />
        <Typography variant="h6" gutterBottom style={{marginLeft:"2%", marginTop:"2%"}}>Add Sale Return</Typography>
        <Grid item md={12}>
          <Grid item container md={12} mt={3} px={2}>
            <Grid item md={12} px={2} py={1}>
              <Autocomplete
                options={customerCode}
                getOptionLabel={(supplier, index) => supplier.name}
                disablePortal
                fullWidth
                isOptionEqualToValue={(option, value) =>
                  option._id === value._id
                }
                onChange={(event, newInputValue) => {
                  setCustomerObject(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField  
  required {...params} label="Select Customer" />
                )}
                renderOption={(props, supplier) => (
                  <Box component="li" {...props} key={supplier._id}>
                    {supplier.name}
                  </Box>
                )}
              />
                <FormHelperText style={{ color: "red" }}>{customerError}</FormHelperText>
            </Grid>
            <Grid item md={12} px={2} py={1}>
              <Autocomplete
                options={salesman}
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
                  <TextField  
  required {...params} label="Select Salesman" />
                )}
                renderOption={(props, supplier) => (
                  <Box component="li" {...props} key={supplier._id}>
                    {supplier.name}
                  </Box>
                )}
              />
                <FormHelperText style={{ color: "red" }}>{salesmanError}</FormHelperText>
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
                  <TextField  
  required {...params} label="Select Payment Medium" />
                )}
                renderOption={(props, payment) => (
                  <Box component="li" {...props} key={payment.id}>
                    {payment.name}
                  </Box>
                )}
              />
                <FormHelperText style={{ color: "red" }}>{paymentMediumError}</FormHelperText>
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
                          // setProductObject(newInputValue);
                          var productObject = newInputValue;
                          setData((currentData) =>
                            produce(currentData, (v) => {
                              v[index].productCode = productObject._id;
                            })
                          );
                        }}
                        renderInput={(params) => (
                          <TextField  
  required {...params} label="Select Product" />
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
                      <TextField  
  required
                        label="Batch Code"
                        variant="outlined"
                        value={product.batchCode}
                        onChange={(e) => {
                          var batchCode = e.target.value;
                          setData((currentData) =>
                            produce(currentData, (v) => {
                              v[index].batchCode = batchCode;
                            })
                          );
                        }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={1.5} px={1}>
                      <TextField  
  required
                        label="Select Date"
                        type="date"
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
  required
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
                    <Grid item md={1} px={1}>
                      <TextField  
  required
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
                    <Grid item md={1.2} px={1}>
                      <TextField  
  required
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
  required
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
  required
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
                    <Grid item md={1} px={1}>
                      <TextField  
  required
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
