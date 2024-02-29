import React, { useEffect, useRef, useState } from "react";
import {
  ButtonBase,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";

import "./styles.scss";
import DataTable from "../../components/dataTable/DataTable";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import { saleColumn } from "../../dataTableColumns";
import SnackBar from "../../components/alert/SnackBar";

import { GET_SALE_LIST } from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";
import { Link } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import { useReactToPrint } from "react-to-print";
import Popup from "../../components/popup/Popup";
import Invoice from "../../components/invoice/Invoice";

export default function GetSaleList() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [openInvoicePopup, setOpenInvoicePopup] = useState(false);
  const [isExpired, setIsExpired] = useState(true);
  const [licenseExpiryDate, setLicenseExpiryDate] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [isWarranted, setIsWarranted] = useState(false);
  const [isEstimated, setIsEstimated] = useState(true);
  // const [customerData, setCustomerData] = useState([]);
  // const [saleData, setSaleData] = useState([]);
  // const [salesmanData, setSalesmanData] = useState([]);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  function checkExpiration(dateString) {
    // Convert the given date string to a Date object
    const givenDate = new Date(dateString);

    // Get the current date
    const currentDate = new Date();

    // Compare the dates
    const Expired = currentDate > givenDate;
    // console.log("expired ", Expired);

    setIsExpired(Expired);
  }

  useEffect(() => {
    getSaleList();
  }, []);

  const getSaleDetailsList = async (id) => {
    await axios
      .get(GET_SALE_LIST + "/" + id)
      .then(function (response) {
        // console.log(JSON.stringify(response,null,2))
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error);
          setSeverity("error");
        } else {
          setLicenseExpiryDate(response.data?.customerCode.licenseExpiryDate);
          // setCustomerData(response.data?.customerCode);
          // setSaleData(response.data?.saleDetail);
          // setSalesmanData(response.data?.salesman);
          setInvoiceData(response.data);

          // checkExpiration(licenseExpiryDate)
          console.log(response.data);
          // setData(response.data.saleDetail);
          checkExpiration(response.data.customerCode.licenseExpiryDate);
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
  };

  const actionColumn = [
    {
      field: "_id",
      headerName: "ID",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: "sale_details/" + params.row._id,
                state: { list: params.row._id },
              }}
            >
              {params.row._id}
            </Link>
          </>
        );
      },
    },
    {
      field: "print",
      headerName: "Print",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cell-action">
            {/* <Box
              display={"flex"}
              justifyContent={"end"}
              mt={2}
              mr={4}
              alignItems={"end"}
            > */}
            <Button
              // onClick={() => setOpenInvoicePopup(true)}
              variant="contained"
              size="medium"
              color="success"
              onClick={() => {
                setOpenInvoicePopup(true);
                getSaleDetailsList(params.row._id);
                checkExpiration(licenseExpiryDate);
                // handlePrint();
              }}
            >
              Print
            </Button>
            {/* </Box> */}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cell-action">
            <IconButton aria-label="view" size="medium">
              <VisibilityIcon fontSize="inherit" />
            </IconButton>
          </div>
        );
      },
    },
  ];
  const getSaleList = async () => {
    await axios
      .get(GET_SALE_LIST)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error);
          setSeverity("error");
        } else {
          setData(response.data.data);
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage("error: " + error);
        setSeverity("error");
      });
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
          header={"Sale List"}
          firstButton={true}
          firstButtonText={"Add New Sale"}
          firstLink={"/sale/add/"}
        />
        <DataTable
          data={data}
          columns={saleColumn.concat(actionColumn)}
          isForTransaction={false}
        />
      </div>
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
          {/* <Grid item xs={12} sm={12}>
            <TextField
              required
              label={"Additional Sales Tax %"}
              fullWidth
              variant="outlined"
              // value={invoiceSalesTax}
              // onChange={(event) => setInvoiceSalesTax(event.target.value)}
            />
          </Grid> */}
          {/* <Grid item xs={12} sm={12}>
            <TextField
              required
              label="Discount"
              fullWidth
              variant="outlined"
              type="number"
              // value={invoiceDiscount}
              // onChange={(event) => setInvoiceDiscount(event.target.value)}
            />
          </Grid> */}
          {/* <Grid item xs={12} sm={12}>
            <TextField
              required
              label="Amount Recieved"
              fullWidth
              variant="outlined"
              // value={invoiceAmount}
              // onChange={(event) => setInvoiceAmount(event.target.value)}
            />
          </Grid> */}
          {/* <Grid
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
          </Grid> */}
          {/* <Grid item xs={12} sm={12} container direction={"row"} spacing={2}>
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
              ></Typography>
            </Typography>
          </Grid> */}
          {/* <Grid item xs={12} sm={12} container direction={"row"} spacing={2}>
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
              ></Typography>
            </Typography>
          </Grid> */}
          {/* <Grid item xs={12} sm={12} container direction={"row"} spacing={2}>
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
              ></Typography>
            </Typography>
          </Grid> */}

          <Grid
            justifyContent={"center"}
            container
            spacing={1}
            style={{ marginTop: 20 }}
            direction={"row"}
          >
            {isExpired ? (
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
                defaultValue={"Estimated"}
              >
                <Grid container direction={"row"}>
                  <FormControlLabel
                    value="Estimated"
                    control={<Radio />}
                    label="Estimated"
                    onClick={() => {
                      setIsWarranted(false);
                      setIsEstimated(true);
                    }}
                  />
                  <FormControlLabel
                    style={{ marginLeft: 20 }}
                    value="With Warranty"
                    control={<Radio />}
                    label="With Warranty"
                    onClick={() => {
                      setIsEstimated(false);
                      setIsWarranted(true);
                    }}
                  />
                  <FormControlLabel
                    value="Without Warranty"
                    style={{ marginLeft: 20 }}
                    control={<Radio />}
                    label="Without Warranty"
                    onClick={() => {
                      setIsEstimated(false);
                      setIsWarranted(false);
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
                    // validate();
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
                  onClick={() => setOpenInvoicePopup(false)}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Popup>
      <div style={{ display: "none" }}>
        <Invoice
          isExpired={isExpired}
          isWarranted={isWarranted}
          isEstimated={isEstimated}
          data={invoiceData}
          ref={componentRef}
        />
      </div>
    </div>
  );
}
