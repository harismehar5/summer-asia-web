// addPurchaseReturn

import React, { useEffect, useRef, useState } from "react";
//
import "./style.css";
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
import Popup from "../../components/popup/Popup";

import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import {
  ADD_PURCHASE,
  GET_ALL_COMPANIES,
  GET_ALL_PRODUCTS,
  COMPANY_PRODUCTS,
} from "../../utils/config";
import SnackBar from "../../components/alert/SnackBar";
import { useReactToPrint } from "react-to-print";
import { FormControlLabel, Radio } from "@material-ui/core";
import ListHeader from "../../components/listHeader/ListHeader";

export default function AddPurchase() {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [productList, setProductList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [productObject, setProductObject] = useState({
    batchCode: "",
    expiryDate: "",
    quantity: 0,
    discount: 0,
    bonus: 0,
    salesTax: 0,
    tradeRate: 0,
    netTotal: "",
    // status: "",
    productCode: "",
  });
  const [data, setData] = useState([productObject]);
  const [supplierObject, setSupplierObject] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalBags, setTotalBags] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [amount, setAmount] = useState("");
  const [submittedDate, setSubmittedDate] = useState("");
  const [code, setCode] = useState("");
  const [openInvoicePopup, setOpenInvoicePopup] = useState(false);
  const [invoiceSalesTax, setInvoiceSalesTax] = useState("");
  const [invoiceAmount, setInvoiceAmount] = useState(null);
  const [invoiceDiscount, setInvoiceDiscount] = useState("");
  const [IsExpired, setIsExpired] = useState(true);
  const [isWarranted, setisWarranted] = useState(false);
  const [isEstimated, setIsEstimated] = useState(false);
  const [subTotalValues, setSubTotalValues] = useState({});
  const [invoiceTotal, setinvoiceTotal] = useState();
  const [selectedDate, setSelectedDate] = useState("");
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

  useEffect(() => {
    getStockList();
    // getCompanyProduts();
    getSupplierList();
    calculateAmountAndBags(data);
  }, []);

  function clearForm() {
    setinvoiceTotal("");
    setInvoiceAmount("");
    setInvoiceDiscount("");
    setInvoiceSalesTax("");
    setSupplierObject({});
    setPaymentMediumObject({});
    setProductObject({});
  }

  const dataEntry = (data) => {
    axios
      .post(ADD_PURCHASE, data)
      .then((response) => {
        setOpen(true);
        clearForm();
        // setinvoiceTotal("");
        // setInvoiceAmount("");
        // setInvoiceDiscount("");
        // setInvoiceSalesTax("");
        if (response.data.error) {
          handleSnackbar("error", response.data.error);
          setSupplierObject({});
        } else {
          handleSnackbar("success", response.data.message);
          setSupplierObject({});
        }
      })
      .catch((error) => {
        setOpen(true);
        setMessage(
          "Unable to save purchase, make sure Batch Code is diffrent "
        );
        setSeverity("error");
      });
  };
  const handleSnackbar = (severity, message) => {
    setOpen(true);
    setSeverity(severity);
    setMessage(message);
  };

  const getStockList = () => {
    axios
      .get(GET_ALL_PRODUCTS)
      .then(function (response) {
        // if (response.data.error) {
        //   setOpen(true);
        //   setMessage(response.data.error);
        //   setSeverity("error");
        // } else {
        // setProductList(response.data.data);
        // }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };

  const getCompanyProduts = (id) => {
    axios
      .post(COMPANY_PRODUCTS, {
        companyCode: id,
      })
      .then((response) => {
        // Handle the response data here
        setProductList(response.data.data);
        console.log(response.data.data);
        // You can use response.data to access the data returned from the server
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("No Products found against this company ");
        setSeverity("error");
        setProductList([]);
      });
  };
  const getSupplierList = () => {
    axios
      .get(GET_ALL_COMPANIES)
      .then(function (response) {
        // if (response.data.error) {
        //   setOpen(true);
        //   setMessage(response.data.error);
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
    // console.log("Product Object", productObject);

    var obj = {};
    var array = data;
    var foundIndex = data.findIndex((item) => item._id === productObject._id);

    obj = {
      tradeRate: productObject.tradeRate,
      quantity: 1,
      bonus: 0,
      discount: 0,
      salesTax: productObject.salesTax,
      // netTotal: productObject.tradeRate,
      // netTotal: "",
      netTotal: productObject.netTotal,
      // status: productObject.status,
      productCode: productObject.code,
    };
    array = [...array, obj];
    setData(array);
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
      // total: calculateTotalAmount() - invoiceDiscount,
      total: invoiceTotal - invoiceDiscount,
      additionalTax: parseFloat(invoiceSalesTax),
      additionalDiscount: parseFloat(invoiceDiscount),
      payedAmount: parseFloat(invoiceAmount),
    };
    // console.log("Data", purchaseObject);
    dataEntry(purchaseObject);
  };

  // const calculateTotalAmount = () => {
  //   const additionalSalePercentage = invoiceSalesTax;
  //   var totalAmount = 0;
  //   for (let i = 0; i < data.length; i++) {
  //     totalAmount = totalAmount + data[i].netTotal;
  //   }
  //   const additionalSaleAmount = (totalAmount * additionalSalePercentage) / 100;
  //   const calAmount = totalAmount + additionalSaleAmount;
  //   return calAmount;
  // };
  return (
    <div className="box">
      <SideBar />
      <div className="box-container">
        <Navbar />
        <ListHeader header={"Add Purchase"} />
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
                  if (newInputValue !== null) {
                    setSupplierObject(newInputValue);
                    getCompanyProduts(newInputValue._id);
                    setSupplierObject({});
                  }
                }}
                renderInput={(params) => (
                  <TextField required {...params} label="Select Company" />
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
                  <TextField
                    required
                    {...params}
                    label="Select Payment Medium"
                  />
                )}
                renderOption={(props, payment) => (
                  <Box component="li" {...props} key={payment.id}>
                    {payment.name}
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
                    alignItems={"center"}
                    key={index}
                    mt={2}
                  >
                    <Grid item md={1.5} pr={1}>
                      <Autocomplete
                        options={productList}
                        getOptionLabel={(product) => product.name}
                        disablePortal
                        fullWidth
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        onChange={(event, newInputValue) => {
                          if (newInputValue !== null) {
                            var productObject = newInputValue;
                            setData((currentData) =>
                              produce(currentData, (v) => {
                                v[index].productCode = productObject._id;
                              })
                            );
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            required
                            {...params}
                            label="Select Product"
                          />
                        )}
                        renderOption={(props, product) => (
                          <Box
                            component="li"
                            {...props}
                            key={product._id || ""}
                          >
                            {product.name || ""}
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
                        label="Expiry Date"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => {
                          var selectedDate = new Date(e.target.value);
                          var currentDate = new Date();

                          // Check if the selected date is before the current date
                          if (selectedDate > currentDate) {
                            // Provide feedback to the user, for example:
                            setSelectedDate(e.target.value);
                            var expiryDate = e.target.value;
                            setData((currentData) =>
                              produce(currentData, (v) => {
                                v[index].expiryDate = expiryDate;
                              })
                            );
                          } else {
                            alert("Please select a future date.");
                          }
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    </Grid>

                    {/* <Grid item md={1.5} px={1}>
                      <TextField  
  required
                        label="Expiry Date"
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
                    </Grid> */}
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
                          setData((currentData) =>
                            produce(currentData, (v) => {
                              v[index].tradeRate = e.target.value;
                              v[index].netTotal =
                                product.quantity * e.target.value;
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
                        value={subTotalValues[index] || ""}
                        onChange={(e) => {
                          var subtotal = e.target.value;

                          // Update the subtotal state
                          setSubTotalValues((prevValues) => ({
                            ...prevValues,
                            [index]: subtotal,
                          }));
                        }}
                      />
                    </Grid>
                    {/* <Grid item md={1} px={1}>
                      <TextField  
  required
                        label="Sub Total"
                        variant="outlined"
                        value={product.quantity * product.tradeRate}
                        // value={}
                        disabled
                      />
                    </Grid> */}
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
            {/* ////// */}
            {/* <div style={{ display: "none" }}>
              <ComponentToPrint data={data} ref={componentRef} />
            </div> */}
            {/* ////////////////// */}

            <Button
              variant="contained"
              size="medium"
              color="success"
              onClick={() => setOpenInvoicePopup(true)}
              sx={{ marginX: "10px" }}
            >
              Save
            </Button>
          </Box>
        </Grid>

        <SnackBar
          open={open}
          severity={severity}
          message={message}
          handleClose={handleClose}
        />

        <Popup
          title="Invoice"
          openPopup={openInvoicePopup}
          setOpenPopup={setOpenInvoicePopup}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                label={"Additional Sales Tax %"}
                fullWidth
                variant="outlined"
                value={invoiceSalesTax}
                onChange={(event) => setInvoiceSalesTax(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                label="Discount"
                fullWidth
                variant="outlined"
                type="number"
                value={invoiceDiscount}
                onChange={(event) => setInvoiceDiscount(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                label="Amount Recieved"
                fullWidth
                variant="outlined"
                value={invoiceAmount}
                onChange={(event) => setInvoiceAmount(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                label="Total Amount"
                fullWidth
                variant="outlined"
                value={invoiceTotal}
                onChange={(event) => setinvoiceTotal(event.target.value)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              container
              direction={"row"}
              spacing={2}
              style={{ marginTop: "10px" }}
            >
              <Typography
                style={{
                  display: "flex",
                  marginLeft: "16px",
                  alignItems: "center",
                  color: "GrayText",
                  fontWeight: "bold",
                }}
                variant="h6"
              >
                Recieved Amount :{" "}
                <Typography
                  variant="h6"
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                    position: "absolute",
                    right: 50,
                  }}
                >
                  {invoiceAmount ? invoiceAmount : 0}
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} container direction={"row"} spacing={2}>
              <Typography
                style={{
                  display: "flex",
                  marginLeft: "16px",
                  alignItems: "center",
                  color: "GrayText",
                  fontWeight: "bold",
                }}
                variant="h6"
              >
                Discount:{" "}
                <Typography
                  variant="h6"
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                    position: "absolute",
                    right: 50,
                  }}
                >
                  {invoiceDiscount ? invoiceDiscount : 0}
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} container direction={"row"} spacing={2}>
              <Typography
                style={{
                  display: "flex",
                  marginLeft: "16px",
                  alignItems: "center",
                  color: "GrayText",
                  fontWeight: "bold",
                }}
                variant="h6"
              >
                Additional Sales Tax %:{" "}
                <Typography
                  variant="h6"
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                    position: "absolute",
                    right: 50,
                  }}
                >
                  {invoiceSalesTax ? invoiceSalesTax : 0}
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} container direction={"row"} spacing={2}>
              <Typography
                style={{
                  display: "flex",
                  marginLeft: "16px",
                  alignItems: "center",
                  color: "GrayText",
                  fontWeight: "bold",
                }}
                variant="h6"
              >
                Total Amount:{" "}
                <Typography
                  variant="h6"
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                    position: "absolute",
                    right: 50,
                  }}
                >
                  {invoiceTotal}
                </Typography>
              </Typography>
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
                      validate();
                      setOpenInvoicePopup(false);
                    }}
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => {
                      setOpenInvoicePopup(false);
                    }}
                    variant="contained"
                    size="medium"
                    color="error"
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Popup>
      </div>
    </div>
  );
}
