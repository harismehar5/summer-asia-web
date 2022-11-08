import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Paper } from "@material-ui/core";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import { Alert, Box, Button, IconButton } from "@mui/material";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { GET_CUSTOMERS_LIST, GET_PRODUCTS_LIST } from "../../utils/config";
import DataTable from "../../components/dataTable/DataTable";
import { saleColumn } from "../../dataTableColumns";

export default function AddSale() {
  const [data, setData] = useState([]);
  const [productList, setProductList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [productObject, setProductObject] = useState({});
  const [customerObject, setCustomerObject] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalBags, setTotalBags] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    getStockList();
    getCustomersList();
  }, [data]);

  const getStockList = () => {
    axios
      .get(GET_PRODUCTS_LIST)
      .then(function (response) {
        if (response.data.error) {
          console.log(response.data.error_msg);
        } else {
          setProductList(response.data.products);
        }
      })
      .catch(function (error) {
        console.log("error: " + error);
      });
  };
  const getCustomersList = () => {
    axios
      .get(GET_CUSTOMERS_LIST)
      .then(function (response) {
        if (response.data.error) {
          console.log(response.data.error_msg);
        } else {
          setCustomerList(response.data.customers);
        }
      })
      .catch(function (error) {
        console.log("error: " + error);
      });
  };
  const addProductIntoList = () => {
    var obj = {};
    var array = data;
    let sum = 0;
    var total_quantity = 0;
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

      array.forEach(function (item) {
        let total_amount = item.price * item.quantity;
        sum += total_amount;
        total_quantity += item.quantity;
      });
      setTotalAmount(sum);
      setTotalBags(total_quantity);
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
      array.forEach(function (item) {
        let total_amount = item.price * item.quantity;
        sum += total_amount;
        total_quantity += item.quantity;
      });
      setTotalAmount(sum);
      setTotalBags(total_quantity);
    } else {
      console.log("Already Existed");
    }
  };
  const onCellEditCommit = (cellData) => {
    console.log(cellData)
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
                />
              </Grid>
              <Grid item md={1}>
                <IconButton
                  color="primary"
                  size="large"
                  onClick={addProductIntoList}
                >
                  <AddIcon fontSize="inherit" />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item md={12}>
              <DataTable
                editMode={"row"}
                data={data}
                columns={saleColumn}
                isForTransaction={true}
                loading={!data.length}
                experimentalFeatures={{ newEditingApi: true }}
                onCellEditCommit={onCellEditCommit}
              />
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
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
