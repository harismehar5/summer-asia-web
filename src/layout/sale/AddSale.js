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
import { GET_PRODUCTS_LIST } from "../../utils/config";
import DataTable from "../../components/dataTable/DataTable";
import { saleColumn } from "../../dataTableColumns";

export default function AddSale() {
  const [data, setData] = useState([]);
  const [productList, setProductList] = useState([]);
  const [productObject, setProductObject] = useState({});

  useEffect(() => {
    getStockList();
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
  const addProductIntoList = () => {
    console.log(data.length);
    var obj = {};
    // for (var i = 0; i < data.length; i++) {
      obj = {
        _id: productObject._id,
        name: productObject.name,
        price: productObject.price,
        quantity: productObject.quantity,
        subTotal: productObject.price * productObject.quantity,
        status: productObject.status,
      };
      setData(obj);
    // }
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
                  onChange={(event, newInputValue) => {
                    setProductObject(newInputValue);
                    console.log("New Input Value", newInputValue);
                  }}
                  disablePortal
                  fullWidth
                  options={productList}
                  getOptionLabel={(product, index) => product.name}
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
                data={data}
                columns={saleColumn}
                isForTransaction={true}
                loading={!data.length}
              />
            </Grid>
          </Grid>
          <Grid item md={4} sx={{ height: "90vh" }}>
            <Grid container item md={12} px={2}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                sx={{ width: "100%" }}
                mt={2}
              >
                <Typography>Total Amount</Typography>
                <Typography>RS 10000/-</Typography>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                sx={{ width: "100%" }}
                mt={2}
              >
                <Typography>Total Bags</Typography>
                <Typography>10</Typography>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                sx={{ width: "100%" }}
                mt={2}
              >
                <Typography>Total Products</Typography>
                <Typography>2</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
