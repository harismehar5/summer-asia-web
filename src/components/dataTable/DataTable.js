import { useState } from "react";
import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { IconButton } from "@mui/material";

const DataTable = ({ data, columns, loading, isForTransaction }) => {
  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  const [pageSize, setPageSize] = useState(10);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cell-action">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="view-button">View</div>
            </Link> */}
            <Button
              size="small"
              variant="contained"
              startIcon={<RemoveRedEyeOutlinedIcon />}
            >
              View
            </Button>
            {/* <div
              className="delete-button"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div> */}
            <Button
              size="small"
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const deleteColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cell-action">
            <IconButton aria-label="delete" size="large">
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
        );
      },
    },
  ];
  return (
    <div className="data-table">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={
          isForTransaction
            ? columns.concat(deleteColumn)
            : columns.concat(actionColumn)
        }
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10]}
        getRowId={(row) => row._id}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        loading={loading}
        checkboxSelection
        pagination
      />
    </div>
  );
};

export default DataTable;
