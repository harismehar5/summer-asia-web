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
  ADD_PURCHASE,
  GET_ALL_COMPANIES,
  GET_PRODUCTS_LIST,
  ADD_STOCK_LOG,
  ADD_QUANTITY,
  ADD_SUPPLIER_CASH_OUT,
  GET_ALL_PRODUCTS,
  GET_BATCH_LIST,
  GET_salesman_LIST,
  GET_QUANTITY_AND_EXPIRY_LIST,
  ADD_SALE,
  ADD_SALES_SERVICES,
} from "../../utils/config";
import SnackBar from "../../components/alert/SnackBar";
import { useReactToPrint } from "react-to-print";

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

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalBags, setTotalBags] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [amount, setAmount] = useState("");
  const [submittedDate, setSubmittedDate] = useState("");
  const [code, setCode] = useState("");
  const [SalesManList, setSalesManList] = useState([]);
  const [ProductId, setProductId] = useState(null);
  const [DateAndQuantityObject, setDateAndQuantityObject] = useState([]);
  const [SaleManObject, setSaleManObject] = useState({});
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
    getSalesManList();
    getSupplierList();
    calculateAmountAndBags(data);
  }, []);

  const dataEntry = (data) => {
    axios
      .post(ADD_SALES_SERVICES, data)
      .then((response) => {
        console.log("response ==", JSON.stringify(response, null, 2));
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
      salesTax: productObject.salesTax,
      netTotal: productObject.netTotal,
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
      .get(GET_salesman_LIST)
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
  const getQuantityAndExpiryObject = (batchId, index) => {
    let payload = {
      productCode: ProductId,
      batchCode: batchId,
    };

    axios
      .post(GET_QUANTITY_AND_EXPIRY_LIST, payload)
      .then(function (response) {
        console.log(JSON.stringify(response.data, null, 2));
        setDateAndQuantityObject(response.data);
        setData((currentData) =>
          produce(currentData, (v) => {
            v[index].expiryDate = response.data.expiryDate;
          })
        );
        setData((currentData) =>
          produce(currentData, (v) => {
            v[index].quantity = response.data.quantity;
          })
        );
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
      salesman: SaleManObject._id,
      total: totalAmount,
    };

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
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
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
                          // setProductObject(newInputValue);
                          setProductId(newInputValue._id);
                          console.log(newInputValue);
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
                          getQuantityAndExpiryObject(
                            newInputValue.batchCode,
                            index
                          );

                          setData((currentData) =>
                            produce(currentData, (v) => {
                              v[index].productCode = batchObject.batchCode;
                            })
                          );
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
                        label={"Select Date"}
                        type="date"
                        value={
                          DateAndQuantityObject.expiryDate
                            ? formatDate(DateAndQuantityObject.expiryDate)
                            : ""
                        }
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
                        value={
                          DateAndQuantityObject?.quantity || product.quantity
                        }
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
              onClick={handlePrint}
              // sx={{ marginLeft: "10px" }}
              variant="contained"
              size="medium"
              color="error"
            >
              Print
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

        <div style={{ display: "none" }}>
          <ComponentToPrint data={data} ref={componentRef} />
        </div>
      </div>
    </div>
  );
}

const ComponentToPrint = React.forwardRef(({ data }, ref) => {
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
      <header class="header">
        <h1>PHARMA NET</h1>
        <p>
          Jamia Farqania Road Sarfaraz Colony Opp. SK Products Factory
          Gujranwala
        </p>
        <p>
          PH:-055-4294521-2-0300-7492093-0302-6162633 E-mail pharmanet@yahoo.com
        </p>
        <p>License No. = 09-341-0135-010397 D NTN = 7351343-8</p>
      </header>

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
            {data.map((item) => {
              return (
                <tr>
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
    </div>
  );
});
