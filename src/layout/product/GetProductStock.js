import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
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
  DELETE_PRODUCT,
  GET_PRODUCTS_LIST,
  UPDATE_PRODUCT_BY_ID,
} from "../../utils/config";
import ListHeader from "../../components/listHeader/ListHeader";
import SnackBar from "../../components/alert/SnackBar";
import Popup from "../../components/popup/Popup";

export default function GetProductStock() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    getStockList();
  }, [data, name]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cell-action">
            <IconButton
              aria-label="edit"
              size="medium"
              onClick={() => {
                setID(params.row._id);
                setName(params.row.name)
                setOpenPopup(true);
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
      .get(GET_PRODUCTS_LIST)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error_msg);
          setSeverity("error");
        } else {
          setData(response.data.products);
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage(error);
        setSeverity("error");
      });
  };
  const deleteProduct = (id) => {
    axios
      .delete(DELETE_PRODUCT + id)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error_msg);
          setSeverity("error");
        } else {
          setOpen(true);
          setMessage(response.data.success_msg);
          setSeverity("success");
        }
      })
      .catch(function (error) {
        setOpen(true);
        setMessage(error);
        setSeverity("error");
      });
  };
  const updateProduct = () => {
    var product = {
      name: name,
      price: 0,
      quantity: 0,
    };
    console.log("URL", UPDATE_PRODUCT_BY_ID + id)
    axios
      .patch(UPDATE_PRODUCT_BY_ID + id, product)
      .then(function (response) {
        if (response.data.error) {
          setOpen(true);
          setMessage(response.data.error_msg);
          setSeverity("error");
          setOpenPopup(false)
        } else {
          setOpen(true);
          setMessage(response.data.success_msg);
          setSeverity("success");
          setName("");
          setOpenPopup(false)
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
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                label="Name"
                fullWidth
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                required
                id="price"
                name="price"
                label="Price"
                fullWidth
                variant="outlined"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </Grid> */}
            {/* <Grid item xs={12} sm={12}>
              <TextField
                id="quantity"
                name="quantity"
                label="Quantity"
                fullWidth
                variant="outlined"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
              />
            </Grid> */}
            <Grid item xs={12} sm={6}>
              {/* <FormControlLabel
                control={
                  <Checkbox color="secondary" name="saveAddress" value="yes" />
                }
                label="Status"
              /> */}
            </Grid>
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
                <Grid item>
                  <Button
                    variant="contained"
                    size="medium"
                    color="error"
                    onClick={() => {
                      setName("");
                      setID("");
                      setOpenPopup(false);
                    }}
                  >
                    Cancel
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
