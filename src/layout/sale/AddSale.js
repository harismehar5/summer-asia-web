import React, { useEffect, useRef, useState } from "react";
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

import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import {
  GET_ALL_PRODUCTS,
  GET_BATCH_LIST,
  GET_salesman_LIST,
  GET_QUANTITY_AND_EXPIRY_LIST,
  ADD_SALES_SERVICES,
  GET_CUSTOMERS_LIST,
  GET_PRODUCT_TRADE_RATE,
} from "../../utils/config";
import SnackBar from "../../components/alert/SnackBar";
import { useReactToPrint } from "react-to-print";
import Popup from "../../components/popup/Popup";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";

export default function AddSale() {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
  const [batchObject, setBatchObject] = useState({});
  const [openInvoicePopup, setOpenInvoicePopup] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalBags, setTotalBags] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [SalesManList, setSalesManList] = useState([]);
  const [ProductId, setProductId] = useState(null);
  const [DateAndQuantityObject, setDateAndQuantityObject] = useState([]);
  const [SaleManObject, setSaleManObject] = useState({});
  const [invoiceSalesTax, setInvoiceSalesTax] = useState("");
  const [invoiceAmount, setInvoiceAmount] = useState(null);
  const [invoiceDiscount, setInvoiceDiscount] = useState("");
  const [IsExpired, setIsExpired] = useState(true);
  const [isWarranted, setisWarranted] = useState(false);
  const [isEstimated, setIsEstimated] = useState(false);
  const [quantityValues, setQuantityValues] = useState({});
  const [expiryDateValues, setExpiryDateValues] = useState({});
  const [tradeRateValues, setTradeRateValues] = useState({});

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

  // var purchaseObject = {
  //   total_amount: "",
  //   total_quantity: "",
  //   supplier: "",
  //   submit_date: "",
  //   order_details: "",
  // };
  // var cashOut = {
  //   amount: "",
  //   description: "",
  //   payment_medium: "",
  //   submit_date: "",
  //   cash_type: "",
  // };
  // var purchaseDetail = [];
  // var stockLog = [];
  // var productArray = [];

  useEffect(() => {
    getStockList();
    getSalesManList();
    getCustomerList();
    calculateAmountAndBags(data);
  }, []);

  const dataEntry = (data) => {
    axios
      .post(ADD_SALES_SERVICES, data)
      .then((response) => {
        console.log(JSON.stringify(response, null, 2));
        if (response.status == 200) {
          setOpen(true);
          setSeverity("success");
          setMessage(response.data.message);
        } else {
          setOpen(true);
          setMessage(response.error);
        }
      })
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

  const getBatchList = (productCode, index) => {
    axios
      .post(GET_BATCH_LIST, {
        productCode: productCode,
      })
      .then(function (response) {
        const filteredBatchList = response.data.data.filter(
          (entry) => entry.quantity !== 0 && entry.quantity !== null
        );

        const sortedBatchList = filteredBatchList.sort((a, b) => {
          if (a.status === "Short Expiry" && b.status !== "Short Expiry") {
            return -1; // a comes before b
          } else if (
            a.status !== "Short Expiry" &&
            b.status === "Short Expiry"
          ) {
            return 1; // b comes before a
          } else {
            return 0; // no change in order
          }
        });
        setBatchList(sortedBatchList);
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };

  const getTradeRate = (productCode, index) => {
    axios
      .post(GET_PRODUCT_TRADE_RATE, {
        productCode: productCode,
      })
      .then(function (response) {
        setTradeRateValues((prevValues) => ({
          ...prevValues,
          [index]: response.data.tradeRate,
        }));
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
        setSupplierList(response.data.data);
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };

  const addProductIntoList = () => {
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
      salesTax: productObject.salesTax,
      netTotal: productObject.netTotal,
    };
    array = [...array, obj];
    setData(array);
  };

  const getSalesManList = () => {
    axios
      .get(GET_salesman_LIST)
      .then(function (response) {
        setSalesManList(response.data.data);
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
      });
  };

  const getQuantityAndExpiryObject = (batchId, index) => {
    let payload = {
      productCode: ProductId,
      batchCode: batchId,
    };

    axios
      .post(GET_QUANTITY_AND_EXPIRY_LIST, payload)
      .then(function (response) {
        console.log("quatity and expiry date ", response.data);

        setData((currentData) =>
          produce(currentData, (v) => {
            v[index] = {
              ...v[index],
              expiryDate: response.data.expiryDate,
              quantity: response.data.quantity,
            };
          })
        );

        setQuantityValues((prevValues) => ({
          ...prevValues,
          [index]: response.data.quantity,
        }));

        setExpiryDateValues((prevValues) => ({
          ...prevValues,
          [index]: formatDate(response.data.expiryDate),
        }));
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
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
      saleDetail: data,
      customerCode: companyCode,
      paymentMode: paymentMode,
      salesman: SaleManObject._id,
      total: calculateTotalAmount() - invoiceDiscount,
      additionalTax: parseFloat(invoiceSalesTax),
      additionalDiscount: parseFloat(invoiceDiscount),
      receivedAmount: parseFloat(invoiceAmount),
    };

    console.log("purchase object ", JSON.stringify(purchaseObject, null, 2));
    dataEntry(purchaseObject);
  };
  // Function to format date to "yyyy-MM-dd" format
  function formatDate(date) {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  const calculateTotalAmount = () => {
    const additionalSalePercentage = invoiceSalesTax;
    var totalAmount = 0;
    for (let i = 0; i < data.length; i++) {
      totalAmount = totalAmount + data[i].netTotal;
    }
    const additionalSaleAmount = (totalAmount * additionalSalePercentage) / 100;
    const calAmount = totalAmount + additionalSaleAmount;
    return calAmount;
  };
  return (
    <div className="box">
      <SideBar />
      <div className="box-container">
        <Navbar />
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
                  const currentDate = new Date();
                  const licenseExpiryDate = new Date(
                    newInputValue?.licenseExpiryDate
                  );

                  // Check if licenseExpiryDate is a valid date
                  if (isNaN(licenseExpiryDate)) {
                    setIsExpired(true);
                    // Set to false or handle accordingly
                    return;
                  }
                  // Compare dates
                  const isExpired = licenseExpiryDate < currentDate;

                  if (isExpired) {
                    setIsExpired(true);

                    // Set to false or handle accordingly
                  } else {
                    setIsExpired(false);

                    // Set to true or handle accordingly
                  }

                  setSupplierObject(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Customer" />
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
                  if (newInputValue !== null) {
                    setPaymentMediumObject(newInputValue);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Payment Medium" />
                )}
                renderOption={(props, payment) => (
                  <Box component="li" {...props} key={payment.id || ""}>
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
                  <TextField {...params} label="Select salesman" />
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
                          if (newInputValue !== null) {
                            // setProductObject(newInputValue);
                            setProductId(newInputValue._id);

                            var productObject = newInputValue;
                            setData((currentData) =>
                              produce(currentData, (v) => {
                                v[index].productCode = productObject._id;
                              })
                            );
                            getBatchList(productObject._id, index);
                            getTradeRate(productObject._id, index);
                          }
                        }}
                        renderInput={(params) => (
                          <TextField {...params} label="Select Product" />
                        )}
                        renderOption={(props, product) => (
                          <Box
                            component="li"
                            {...props}
                            key={product._id || ""}
                          >
                            {product.name}
                          </Box>
                        )}
                        onKeyDown={handleKeyPress}
                      />
                    </Grid>
                    <Grid item md={1.5} px={1}>
                      <Autocomplete
                        options={batchList}
                        getOptionLabel={(batch) => batch.batchCode}
                        disablePortal
                        fullWidth
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        onChange={(event, newInputValue) => {
                          if (newInputValue !== null) {
                            getQuantityAndExpiryObject(
                              newInputValue.batchCode,
                              index
                            );

                            setData((currentData) =>
                              produce(currentData, (v) => {
                                v[index].batchCode = newInputValue.batchCode;
                              })
                            );
                          }
                        }}
                        renderInput={(params) => (
                          <TextField {...params} label="Select Batch" />
                        )}
                        renderOption={(props, batch) => (
                          <Box
                            component="li"
                            {...props}
                            key={batch._id || ""}
                            style={{
                              color:
                                batch.status === "Short Expiry"
                                  ? "red"
                                  : "inherit",
                              fontWeight: "600",
                            }}
                          >
                            {batch.batchCode}
                          </Box>
                        )}
                        onKeyDown={handleKeyPress}
                      />
                    </Grid>

                    <Grid item md={1.5} px={1}>
                      <TextField
                        // label="Expiry Date"
                        variant="outlined"
                        type="date"
                        value={expiryDateValues[index] || ""}
                        onChange={(e) => {
                          var expiryDate = e.target.value;
                          setData((currentData) =>
                            produce(currentData, (v) => {
                              v[index].expiryDate = expiryDate;
                            })
                          );

                          setExpiryDateValues((prevValues) => ({
                            ...prevValues,
                            [index]: expiryDate,
                          }));
                        }}
                        fullWidth
                      />
                    </Grid>

                    <Grid item md={1} px={1}>
                      <TextField
                        label="Quantity"
                        variant="outlined"
                        value={quantityValues[index] || ""}
                        onChange={(e) => {
                          var quantity = e.target.value;
                          setData((currentData) =>
                            produce(currentData, (v) => {
                              v[index].quantity = quantity;
                            })
                          );

                          setQuantityValues((prevValues) => ({
                            ...prevValues,
                            [index]: quantity,
                          }));
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
                        value={tradeRateValues[index] || ""}
                        onChange={(e) => {
                          // Assuming you want to handle trade rate changes
                          var tradeRate = e.target.value;
                          setTradeRateValues((prevValues) => ({
                            ...prevValues,
                            [index]: tradeRate,
                          }));
                        }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={1} px={1}>
                      <TextField
                        label="Sub Total"
                        variant="outlined"
                        value={quantityValues[index] * tradeRateValues[index]}
                        onChange={(e) => {
                          // var tradeRate = e.target.value;
                        }}
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
              onClick={() => setOpenInvoicePopup(true)}
              variant="contained"
              size="medium"
              color="error"
            >
              Save & Print
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
                  {calculateTotalAmount() - invoiceDiscount}
                </Typography>
              </Typography>
            </Grid>

            <Grid
              justifyContent={"center"}
              container
              spacing={1}
              style={{ marginTop: 20 }}
              direction={"row"}
            >
              {IsExpired ? (
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="Estimated"
                  name="radio-buttons-group"
                >
                  <Grid container direction={"row"}>
                    <FormControlLabel
                      value="Estimated"
                      control={<Radio />}
                      label="Estimated"
                    />
                    <FormControlLabel
                      style={{ marginLeft: 20 }}
                      value="With Warranty"
                      disabled
                      control={<Radio />}
                      label="With Warranty"
                    />
                    <FormControlLabel
                      value="Without Warranty"
                      style={{ marginLeft: 20 }}
                      disabled
                      control={<Radio />}
                      label="Without Warranty"
                    />
                  </Grid>
                </RadioGroup>
              ) : (
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  <Grid container direction={"row"}>
                    <FormControlLabel
                      value="Estimated"
                      control={<Radio />}
                      label="Estimated"
                      onClick={() => setIsEstimated(true)}
                    />
                    <FormControlLabel
                      style={{ marginLeft: 20 }}
                      value="With Warranty"
                      control={<Radio />}
                      label="With Warranty"
                      onClick={() => {
                        setisWarranted(true);
                        setIsEstimated(false);
                      }}
                    />
                    <FormControlLabel
                      value="Without Warranty"
                      style={{ marginLeft: 20 }}
                      control={<Radio />}
                      label="Without Warranty"
                      onClick={() => {
                        setisWarranted(false);
                        setIsEstimated(false);
                      }}
                    />
                  </Grid>
                </RadioGroup>
              )}
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
                      handlePrint();
                      validate();
                    }}
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" size="medium" color="error">
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Popup>

        <div style={{ display: "none" }}>
          <ComponentToPrint
            isExpired={IsExpired}
            isWarranted={isWarranted}
            isEstimated={isEstimated}
            data={data}
            ref={componentRef}
          />
        </div>
      </div>
    </div>
  );
}

const ComponentToPrint = React.forwardRef(
  ({ data, isExpired, isWarranted, isEstimated }, ref) => {
    let totalQuantity = 0;
    let totalBonus = 0;
    let totalDiscount = 0;
    let totalSalesTax = 0;
    let totalTradeRate = 0;

    data.map((item) => (totalQuantity += Number(item.quantity)));
    data.map((item) => (totalBonus += Number(item.bonus)));
    data.map((item) => (totalDiscount += Number(item.discount)));
    data.map((item) => (totalSalesTax += Number(item.salesTax)));
    data.map((item) => (totalTradeRate += Number(item.tradeRate)));

    return (
      <div ref={ref}>
        {isEstimated ? null : (
          <header class="header">
            <h1>PHARMA NET</h1>
            <p>
              Jamia Farqania Road Sarfaraz Colony Opp. SK Products Factory
              Gujranwala
            </p>
            <p>
              PH:-055-4294521-2-0300-7492093-0302-6162633 E-mail
              pharmanet@yahoo.com
            </p>
            <p>License No. = 09-341-0135-010397 D NTN = 7351343-8</p>
            <div class="flex evenly">
              <div>
                <p>M/S</p>
                <p>005 0034</p>
                <p>Azhar M/S</p>
                <p>FREED TOWN (PASROOR ROAD GRW)</p>
                <p>FREED TOWN (PASROOR ROAD GRW)</p>
              </div>
              <div>
                <p>INVOICE</p>
                <p>License No = 843/GRW</p>
                <p>NTN NO : 34101-2610040-5</p>
                <p>CNIC NO:</p>
                <p>S/TAX No:</p>
              </div>
              <div>
                <p>Inv No: 1327</p>
                <p>Inv Date: 07/02/2024</p>
                <p>Page No: 1 of 1</p>
                <p>Salesman: 1 sohail tahir</p>
                <p>Sales Type: 1 Supply Sale</p>
              </div>
            </div>
          </header>
        )}
        <div class="gap">
          <table>
            <thead>
              <tr>
                <th>QTY</th>
                <th>Name of Item</th>
                <th>Packing</th>
                <th>Batch No</th>
                <th>Rate</th>
                <th>Gross Amount</th>
                <th>Discount %</th>
                <th>Sales Tax</th>
                <th>Additional Tax</th>
                <th>Advace Tax</th>
                <th>Total Amount</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.quantity}</td>
                    <td>{item.productCode}</td>
                    <td>{item.bonus}</td>
                    <td>{item.batchCode}</td>
                    <td>{item.tradeRate}</td>
                    <td>{item.status}</td>
                    <td>{item.discount}</td>
                    <td>{item.expiryDate}</td>
                    <td>{item.salesTax}</td>
                    <td>{item.netTotal}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <table>
            <thead>
              <tr>
                <th>Total of STAR LABORATORIES</th>
                <th></th>
                <th></th>
                <th></th>
                <th>Gross</th>
                <th>4,267.00</th>
                <th>Dis.%</th>
                <th>0.90 S/Tax</th>
                <th>0.00 AdS/Tax</th>
                <th>0.00</th>
                <th>4,267.6</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>No of ltems: 4</td>
                <td></td>
                <td></td>
                <td></td>
                <td>Gross</td>
                <td>4,267.00</td>
                <td>Dis.%</td>
                <td>0.00 S/Tax</td>
                <td>0.00 AdS/Tax</td>
                <td>0.00</td>
                <td>4,267.0</td>
              </tr>
              <tr>
                <td>Total Qty: 53</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>

          <table class="last">
            <thead>
              <tr>
                <td></td>
                <td>Add Tax US 236-H @ 0.50</td>
                <td>21.34</td>
              </tr>
              <tr>
                <td>Four Thousand Two Hundred Eighty Eight</td>
                <td>Total Net Value</td>
                <td>4,288.0</td>
              </tr>
            </thead>
          </table>
        </div>

        {isWarranted ? (
          <footer style={{ padding: "2rem", fontSize: "10px" }}>
            <div
              style={{
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              <div style={{ fontWeight: "bold" }}>
                FORM 2A (SEE RULES 19 & 30) 34371 Warranty Under Seetion
                23(1)(i) orThe Drugs Act,
              </div>
              <div style={{ marginTop: "5px" }}>
                <span style={{ fontWeight: "bold" }}>I KHALID RASHEED</span>
                ,being a person resident in Pakistan,camying on business at the
                afc'esaid address under the namie of PHARMA NET,
              </div>
              <div>
                having valid license(s) as mentioned above greisstied by
                Licensing Authority. and being importers/Authorized Distr?butors
                of the Manufacturers
              </div>
              <div>
                Principals. do hereby give th warranty that the drugs here above
                described as sold by mie/specified and contain in the cash
                memo/invoicedes
              </div>
              <div>
                describing the goods referred to herein do not contravene in any
                way the provisions of scction 23 ofthe Drugs Act, 1976.
              </div>
              <div style={{ marginTop: "5px", fontWeight: "bold" }}>
                (ii) FORM-5 |see rule 6(2)(i), 6(5(b). 19 (7) and 48(1 )i)|
                Warvanty under MMedical Devices Rules.2017
              </div>
              <div style={{ marginTop: "5px" }}>
                <span style={{ fontWeight: "bold" }}>i KHALID RASHEED</span>
                ,being a person resident in Pakistan. carrying on business ut
                aforesed address under the name of PHARMA NET, holding valid
                license issued by
              </div>
              <div>
                Licensing Authority and having authority or being authorized by
                Manufacturers Principals vide ietters. co hereby give this
                warranty that the medical devices here
              </div>
              <div>
                above described as sold by me and contained in the bill of sale,
                invoice. bill of lading or other document. describing the
                medical devices referred to herein do not
              </div>
              <div>
                Contrwene ', any way the provisions of the DRAPAct, 2012 and the
                rules framed thers-under.
              </div>
              <div>
                Warranty Under Alternative Medicines & Health Products
                (Enlistment) Rules, 2014. |Sce rule 10 (3) & (5)|
              </div>
              <div>
                We,as the authorized distributors/agents and on behalf of
                thePrincipals/Manufacture's / importe:s hereby give warranty
                that the supplied
              </div>
              <div>
                alternative medicine health products mentioned herein do not
                contravene any provision of the prevailing DRAPACT and rules
                framed thereunder{" "}
                <div style={{ fontWeight: "bold" }}>KHALID RASHEED</div>
              </div>
            </div>
            <div style={{ marginTop: "20px", fontWeight: "bold" }}>
              <div dir="rtl">
                (i) کوئی دکاندار ایکسپائری اسٹاک کی رقم میں موجود بل سے منھبا
                کرنے کا مجاز نہیں ہو گا
              </div>
              <div dir="rtl">
                (ii) مال وصول کرتے وقت اچھی طرح چیک کر لیں بعد میں اسٹاک کی کمی
                بیشی کا کوئی کلیم قابل قبول نہیں ہو گا
              </div>
              <div dir="rtl">
                (iii) پر ایکسپائر مال حوالے کریں ورنہ کمپنی کی ذمہ داری نہیں ہو
                گی- Office Form کا کوہی بھی ملازم پر چی دے کر اسٹاک وصول کرنے کا
                مجاز نہیں رکھتا ہمیشہ کمپنی کے PHARMA NET
              </div>
              <div dir="rtl">
                (iv) کی قطی نہیں ہو گی PHARMA NET کا کوئی ملازم کسی دکاندار سے
                ایڈ وانس رقم وصول کرنے کا مجاز نہیں ہے اسکی ذمہ داری PHARMA NET
              </div>
              <div dir="rtl">
                (v) اسٹاک کپمنی کے بل کے مطابق وصول کرہں بعد میں کسی قسم کی کوئی
                ذمہ داری نہیں ہو گی
              </div>
              <div dir="rtl">
                (vi) ماہ کی مدت سے قبل تحریری طور پر کمپنی بذا کے علم میں نہ
                لایا جاے گا 6 کمپنی کسی بھی ایکسپائر کی تبدیلی کی قطعا ذمہ دار
                نہیں ہو گی جب تک کے کم از کم
              </div>
            </div>
          </footer>
        ) : null}
      </div>
    );
  }
);
