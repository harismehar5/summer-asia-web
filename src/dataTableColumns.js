export const userColumns = [
  // { field: "_id", headerName: "ID", width: 230 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 160,
  },
  // {
  //   field: "address",
  //   headerName: "Address",
  //   width: 230,
  // },
  {
    field: "opening_balance",
    headerName: "Opening Balance",
    width: 230,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <>
  //         {params.row.status === true ? (
  //           <div className={`cell-with-status active`}>{"active"}</div>
  //         ) : (
  //           <div className={`cell-with-status passive`}>{"passive"}</div>
  //         )}
  //       </>
  //     );
  //   },
  // },
];

export const productColumns = [
  // { field: "_id", headerName: "ID", width: 230 },
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
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <>
  //         {params.row.status === true ? (
  //           <div className={`cell-with-status active`}>{"active"}</div>
  //         ) : (
  //           <div className={`cell-with-status passive`}>{"passive"}</div>
  //         )}
  //       </>
  //     );
  //   },
  // },
];

export const expenseColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "createdAt",
    headerName: "Date",
    width: 230,
  },
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
    field: "submit_date",
    headerName: "Date",
    width: 230,
  },
  {
    field: "customer",
    headerName: "Customer Name",
    width: 230,
  },
  {
    field: "total_amount",
    headerName: "Total Amount",
    width: 230,
  },
  {
    field: "total_quantity",
    headerName: "Total Bags",
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

export const purchaseColumn = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "submit_date",
    headerName: "Date",
    width: 230,
  },
  {
    field: "supplier",
    headerName: "Supplier Name",
    width: 230,
  },
  {
    field: "total_amount",
    headerName: "Total Amount",
    width: 230,
  },
  {
    field: "total_quantity",
    headerName: "Total Bags",
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

export const supplierCashFlowColumn = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "submit_date",
    headerName: "Date",
    width: 230,
  },
  {
    field: "supplier_name",
    headerName: "Supplier Name",
    width: 230,
  },
  {
    field: "cash_in_amount",
    headerName: "Cash In",
    width: 160,
  },
  {
    field: "cash_out_amount",
    headerName: "Cash Out",
    width: 160,
  },
  {
    field: "description",
    headerName: "Description",
    width: 230,
  },
  {
    field: "payment_medium",
    headerName: "Medium",
    width: 230,
  },
];

export const customerCashFlowColumn = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "submit_date",
    headerName: "Date",
    width: 230,
  },
  {
    field: "customer_name",
    headerName: "Customer Name",
    width: 230,
  },
  {
    field: "cash_in_amount",
    headerName: "Cash In",
    width: 160,
  },
  {
    field: "cash_out_amount",
    headerName: "Cash Out",
    width: 160,
  },
  {
    field: "description",
    headerName: "Description",
    width: 230,
  },
  {
    field: "payment_medium",
    headerName: "Medium",
    width: 230,
  },
];
export const stockLogColumns = [
  // { field: "_id", headerName: "ID", width: 230 },
  {
    field: "date",
    headerName: "Date",
    width: 230,
  },
  {
    field: "product",
    headerName: "Product",
    width: 230,
  },
  {
    field: "stock_type",
    headerName: "Stock Type",
    width: 230,
  },
  {
    field: "quantity",
    headerName: "quantity",
    width: 230,
  },
];

export const customerLedgerColumns = [
  // { field: "_id", headerName: "ID", width: 230 },
  {
    field: "date",
    headerName: "Date",
    width: 160,
  },
  {
    field: "sale_ref",
    headerName: "Sale Ref",
    width: 230,
  },
  {
    field: "cash_ref",
    headerName: "Cash Flow Ref",
    width: 230,
  },
  {
    field: "debit",
    headerName: "Debit",
    width: 160,
  },
  {
    field: "credit",
    headerName: "Credit",
    width: 160,
  },
  {
    field: "payment_medium",
    headerName: "Payment Medium",
    width: 230,
  },
  {
    field: "description",
    headerName: "Description",
    width: 230,
  },
  {
    field: "total_amount",
    headerName: "Balance",
    width: 160,
  },
];

export const supplierLedgerColumns = [
  // { field: "_id", headerName: "ID", width: 230 },
  {
    field: "date",
    headerName: "Date",
    width: 160,
  },
  {
    field: "purchase_ref",
    headerName: "Purchase Ref",
    width: 230,
  },
  {
    field: "cash_ref",
    headerName: "Cash Flow Ref",
    width: 230,
  },
  {
    field: "debit",
    headerName: "Debit",
    width: 160,
  },
  {
    field: "credit",
    headerName: "Credit",
    width: 160,
  },
  {
    field: "payment_medium",
    headerName: "Payment Medium",
    width: 230,
  },
  {
    field: "description",
    headerName: "Description",
    width: 230,
  },
  {
    field: "total_amount",
    headerName: "Balance",
    width: 160,
  },
];
