export const userColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 230,
  },

  {
    field: "address",
    headerName: "Address",
    width: 230,
  },
  {
    field: "opening_balance",
    headerName: "Opening Balance",
    width: 230,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <>
          {params.row.status === true ? (
            <div className={`cell-with-status active`}>{"active"}</div>
          ) : (
            <div className={`cell-with-status passive`}>{"passive"}</div>
          )}
        </>
      );
    },
  },
];

export const productColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "price",
    headerName: "Price",
    width: 230,
  },

  {
    field: "quantity",
    headerName: "Quantity",
    width: 230,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <>
          {params.row.status === true ? (
            <div className={`cell-with-status active`}>{"active"}</div>
          ) : (
            <div className={`cell-with-status passive`}>{"passive"}</div>
          )}
        </>
      );
    },
  },
];

export const expenseColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "description",
    headerName: "Description",
    width: 230,
  },

  {
    field: "amount",
    headerName: "Amount",
    width: 230,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <>
          {params.row.status === true ? (
            <div className={`cell-with-status active`}>{"active"}</div>
          ) : (
            <div className={`cell-with-status passive`}>{"passive"}</div>
          )}
        </>
      );
    },
  },
];

export const cashColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "amount",
    headerName: "Amount",
    width: 230,
  },
  {
    field: "cash_type",
    headerName: "Cash Type",
    width: 230,
  },
  {
    field: "description",
    headerName: "Description",
    width: 230,
  },
  {
    field: "payment_medium",
    headerName: "Payment Medium",
    width: 160,
  },
  {
    field: "submit_date",
    headerName: "Submit Date",
    width: 160,
  },
];

export const saleColumn = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "name",
    headerName: "Product Name",
    width: 230,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 100,
    editable: true,
  },
  {
    field: "sub_total",
    headerName: "Sub Total",
    width: 100,
  },
];

