import { Link, useNavigate } from "react-router-dom";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}
export const userColumns = [
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
  {
    field: "opening_balance",
    headerName: "Opening Balance",
    width: 230,
  },
];

export const supplierColumn = [
  {
    field: "code",
    headerName: "Code",
    width: 100,
  },
  {
    field: "name",
    headerName: "Company Name",
    width: 150,
  },
  {
    field: "person",
    headerName: "Person Name",
    width: 150,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    width: 150,
  },
  {
    field: "address",
    headerName: "Address",
    width: 230,
  },
  {
    field: "license",
    headerName: "License Number",
    width: 150,
  },
];
export const productColumns = [
  {
    field: "code",
    headerName: "Code",
    width: 100,
  },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "packing",
    headerName: "Packing",
    width: 150,
  },
  {
    field: "strength",
    headerName: "Strength",
    width: 150,
  },
  {
    field: "tradeRate",
    headerName: "Trade Rate",
    width: 150,
  },
  {
    field: "purchaseRate",
    headerName: "Purchase Rate",
    width: 150,
  },
  {
    field: "maximumRetailPrice",
    headerName: "Retail Price (Max)",
    width: 150,
  },
  {
    field: "distributerPrice",
    headerName: "Distributer Price",
    width: 150,
  },
];

export const expenseColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "createdAt",
    headerName: "Date",
    width: 230,
    renderCell: (params) => {
      return (
        <>
          <div>{formatDate(params.row.createdAt)}</div>
        </>
      );
    },
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
    renderCell: (params) => {
      return (
        <>
          <div>{formatDate(params.row.submit_date)}</div>
        </>
      );
    },
  },
];

export const saleColumn = [
  
  {
    field: "createdAt",
    headerName: "Date",
    width: 230,
    renderCell: (params) => {
      return (
        <>
          <div>{formatDate(params.row.createdAt)}</div>
        </>
      );
    },
  },
  {
    field: "customer",
    headerName: "Customer Name",
    width: 230,
    renderCell: (params) => {
      return (
        <>
          <div>{params.row.customerCode.name}</div>
        </>
      );
    },
  },
  {
    field: "customer Email",
    headerName: "Customer Email",
    width: 230,
    renderCell: (params) => {
      return (
        <>
          <div>{params.row.customerCode.email}</div>
        </>
      );
    },
  },
  {
    field: "total",
    headerName: "Total Amount",
    width: 230,
    
  },
  {
    field: "paymentMode",
    headerName: "Payment Method",
    width: 230,
  },
  
];

export const saleReturnColumn = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "createdAt",
    headerName: "Date",
    width: 230,
    renderCell: (params) => {
      return (
        <>
          <div>{formatDate(params.row.createdAt)}</div>
        </>
      );
    },
  },

  {
    field: "total",
    headerName: "Total Amount",
    width: 230,
    
  },
  {
    field: "paymentMode",
    headerName: "Payment Method",
    width: 230,
  },
  
];


export const saleDetailsColumn = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "expiryDate",
    headerName: "expiry date",
    width: 230,
    renderCell: (params) => {
      return (
        <>
          <div>{formatDate(params.row.expiryDate)}</div>
        </>
      );
    },
  },
  {
    field: "quantity",
    headerName: "Quantity",

    width: 150,
  },
  {
    field: "tradeRate",
    headerName: "Trade rate",
    width: 150,
  },
  {
    field: "bonus",
    headerName: "Bonus",
    width: 150,
  },
  {
    field: "discount",
    headerName: "Discount",
    width: 160,
  },
  {
    field: "batchCode",
    headerName: "Batch code",
    width: 160,
  },

  {
    field: "salesTax",
    headerName: "Sales Tax",
    width: 160,
  },
  {
    field: "netTotal",
    headerName: "Total amount",
    width: 160,
  },
];



export const purchaseColumn = [
  {
    field: "createdAt",
    headerName: "Date",
    width: 230,
    renderCell: (params) => {
      return (
        <>
          <div>{formatDate(params.row.createdAt)}</div>
        </>
      );
    },
  },
  {
    field: "name",
    headerName: "Supplier Name",
    renderCell: (params) => {
      return (
        <>
          <div>{params.row.companyCode.name}</div>
        </>
      );
    },
    width: 300,
  },
  {
    field: "total",
    headerName: "Total Amount",
    width: 230,
  },
];
export const purchaseDetailsColumn = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "expiryDate",
    headerName: "expiry date",
    width: 230,
    renderCell: (params) => {
      return (
        <>
          <div>{formatDate(params.row.expiryDate)}</div>
        </>
      );
    },
  },
  {
    field: "quantity",
    headerName: "Quantity",

    width: 150,
  },
  {
    field: "tradeRate",
    headerName: "Trade rate",
    width: 150,
  },
  {
    field: "bonus",
    headerName: "Bonus",
    width: 150,
  },
  {
    field: "discount",
    headerName: "Discount",
    width: 160,
  },
  {
    field: "batchCode",
    headerName: "Batch code",
    width: 160,
  },

  {
    field: "salesTax",
    headerName: "Sales Tax",
    width: 160,
  },
  {
    field: "netTotal",
    headerName: "Total amount",
    width: 160,
  },
];

export const supplierCashFlowColumn = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "submit_date",
    headerName: "Date",
    width: 230,
    renderCell: (params) => {
      return (
        <>
          <div>{formatDate(params.row.submit_date)}</div>
        </>
      );
    },
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
  { field: "purchaseId", headerName: "Purchase Id", width: 230 },
  { field: "purchaseReturnId", headerName: "Purchase return Id", width: 230 },
  { field: "saleId", headerName: "Sale Id", width: 230 },
  { field: "saleReturnId", headerName: "Purchase return Id", width: 230 },
  {
    field: "customerId",
    headerName: "Customer",
    width: 230,
    renderCell: (params) => {
      return (
        <>
          <div>{params.value && params.value.name}</div>
        </>
      );
    },
  },
  {
    field: "companyId",
    headerName: "Company",
    width: 230,
    renderCell: (params) => {
      return (
        <>
          <div>{params.value && params.value.name}</div>
        </>
      );
    },
  },
  
  { field: "debit", headerName: "Debit", width: 230 },
  { field: "credit", headerName: "Credit", width: 230 },
  { field: "balance", headerName: "Balance", width: 230 },
  {
    field: "createdAt", 
    headerName: "Date",
    width: 230,
    renderCell: (params) => {
      return (
        <>
          <div>{formatDate(params.value)}</div>
        </>
      );
    },
  },
  
];
export const stockLogColumns = [
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
  {
    field: "createdAt",
    headerName: "Date",
    renderCell: (params) => {
      return (
        <>
          <p>
            {formatDate(
              params?.row?.createdAt ? params?.row?.createdAt : "No date"
            )}
          </p>
        </>
      );
    },
    width: 160,
  },
  {
    field: "saleId",
    headerName: "Sale id",
    renderCell: (params) => {
      return (
        <>
          <p>{params?.row?.saleId ? params?.row?.saleId : "N/A"}</p>
        </>
      );
    },
    width: 230,
  },
  {
    field: "saleReturnId",
    headerName: "Sale return id",
    renderCell: (params) => {
      return (
        <>
          <p>{params?.row?.saleReturnId ? params?.row?.saleReturnId : "N/A"}</p>
        </>
      );
    },
    width: 230,
  },
  // {
  //   field: "cash_ref",
  //   headerName: "Cash Flow Ref",
  //   width: 230,
  // },
  {
    field: "debit",
    headerName: "Debit",
    width: 160,
  },
  {
    field: "credit",
    headerName: "Credit",
    renderCell: (params) => {
      return (
        <>
          <p>{params?.row?.credit ? params?.row?.credit : 0}</p>
        </>
      );
    },
    width: 160,
  },
  {
    field: "paymentMode",
    headerName: "Payment Medium",
    renderCell: (params) => {
      return (
        <>
          <p>{params?.row?.paymentMode ? params?.row?.paymentMode : "N/A"}</p>
        </>
      );
    },
    width: 230,
  },
  {
    field: "description",
    headerName: "Description",
    width: 230,
    renderCell: (params) => {
      return (
        <>
          <p>{params?.row?.description ? params?.row?.description : "N/A"}</p>
        </>
      );
    },
  },
  {
    field: "balance",
    headerName: "Balance",
    renderCell: (params) => {
      return (
        <>
          <p>{params?.row?.balance ? params?.row?.balance : 0}</p>
        </>
      );
    },
    width: 160,
  },
];

export const supplierLedgerColumns = [
  {
    field: "createdAt",
    headerName: "Date",
    renderCell: (params) => {
      return (
        <>
          <div>{formatDate(params?.row?.createdAt)}</div>
        </>
      );
    },
    width: 160,
  },
  {
    field: "purchaseId",
    headerName: "Purchase ID",
    width: 300,
  },
  {
    field: "purchaseReturnId",
    headerName: "Purchase ReturnID",
    renderCell: (params) => {
      return (
        <>
          <div>{params?.row?.purchaseReturnId || "N/A"}</div>
        </>
      );
    },
    width: 250,
  },

  {
    field: "debit",
    headerName: "Debit",
    renderCell: (params) => {
      return (
        <>
          <div>{params?.row?.debit || "N/A"}</div>
        </>
      );
    },
    width: 160,
  },
  {
    field: "credit",
    headerName: "Credit",
    renderCell: (params) => {
      return (
        <>
          <div>{params?.row?.credit || "N/A"}</div>
        </>
      );
    },
    width: 160,
  },
  {
    field: "balance",
    headerName: "Balance",
    width: 160,
  },

  
];

export const areaColumns = [
  {
    field: "createdAt",
    headerName: "Date",
    width: 230,
    renderCell: (params) => {
      return (
        <>
          <div>{formatDate(params.row.createdAt)}</div>
        </>
      );
    },
  },
  { field: "code", headerName: "Code", width: 230 },
  {
    field: "abbreviation",
    headerName: "Area",
    width: 230,
  },
  {
    field: "description",
    headerName: "Description",
    width: 230,
  },
];

export const customersColumns = [
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
    field: "gender",
    headerName: "Gender",
    width: 230,
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "code",
    headerName: "Code",
    width: 230,
  },
  {
    field: "license",
    headerName: "License",
    width: 230,
  },
  {
    field: "licenseExpiryDate",
    headerName: "License expiry date",
    width: 230,
    renderCell: (params) => {
      return (
        <>
          <div>{formatDate(params.row.licenseExpiryDate)}</div>
        </>
      );
    },
  },
  
  {
    field: "areaCode",
    headerName: "Area code",
    width: 230,
    renderCell: (params) => {
      if (params.row.areaCode && params.row.areaCode.code) {
        return <div>{params.row.areaCode.code}</div>;
      } else {
        return <div>No Area Code</div>;
      }
    },
  },
  {
    field: "bankAccount",
    headerName: "Bank Account",
    width: 230,
  },
];

export const salesmenColumns = [
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "fatherName",
    headerName: "Father name",
    width: 230,
  },
  {
    field: "address",
    headerName: "Address",
    width: 230,
  },
  {
    field: "code",
    headerName: "Code",
    width: 230,
  },
  {
    field: "qualification",
    headerName: "Qualification",
    width: 230,
  },
  {
    field: "phoneNo",
    headerName: "Phone",
    width: 230,
  },
  {
    field: "areaCode",
    headerName: "Area code",
    width: 230,
    renderCell: (params) => {
      if (params.row.areaCode && params.row.areaCode.code) {
        return <div>{params.row.areaCode.code}</div>;
      } else {
        return <div>No Area Code</div>;
      }
    },
  },
  { field: "areaCommission", headerName: "Area commission", width: 230 },
  { field: "target", headerName: "Target", width: 230 },
  {
    field: "dateOfJoin",
    headerName: "Date of join",
    width: 230,
    renderCell: (params) => {
      return (
        <>
          <div>{formatDate(params.row.createdAt)}</div>
        </>
      );
    },
  },
  { field: "refPerson", headerName: "Reference person", width: 230 },
  {
    field: "refPersonNumber",
    headerName: "reference Person number",
    width: 230,
  },
  { field: "cnic", headerName: "CNIC", width: 230 },
  {
    field: "description",
    headerName: "Description",
    width: 230,
  },
];

export const salesmanLedgerColumns = [
 
  {
    field: "saleId",
    headerName: "Sale Id",
    renderCell: (params) => {
      return (
        <>
          <p>
            {
              params?.row?.saleId ? params?.row?.saleId : "N/A"
            }
          </p>
        </>
      );
    },
    width: 230,
  },
  {
    field: "saleReturnId",
    headerName: "Sale Return Id",
    renderCell: (params) => {
      return (
        <>
          <p>
            {
              params?.row?.saleReturnId ? params?.row?.saleReturnId : "N/A"
            }
          </p>
        </>
      );
    },
    width: 230,
  },
  // {
  //   field: "cash_ref",
  //   headerName: "Cash Flow Ref",
  //   width: 230,
  // },

  {
    field: "debit",
    headerName: "Debit",
    renderCell: (params) => {
      return (
        <>
          <p>{params?.row?.debit ? params?.row?.debit : 0}</p>
        </>
      );
    },
    width: 160,
  },
  {
    field: "credit",
    headerName: "Credit",
    renderCell: (params) => {
      return (
        <>
          <p>{params?.row?.credit ? params?.row?.credit : 0}</p>
        </>
      );
    },
    width: 160,
  },
  {
    field: "paymentMode",
    headerName: "Payment Medium",
    renderCell: (params) => {
      return (
        <>
          <p>{params?.row?.paymentMode ? params?.row?.paymentMode : "N/A"}</p>
        </>
      );
    },
    width: 230,
  },
  {
    field: "description",
    headerName: "Description",
    width: 230,
    renderCell: (params) => {
      return (
        <>
          <p>{params?.row?.description ? params?.row?.description : "N/A"}</p>
        </>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "Date",
    renderCell: (params) => {
      return (
        <>
          <p>
            {formatDate(
              params?.row?.createdAt ? params?.row?.createdAt : "No date"
            )}
          </p>
        </>
      );
    },
    width: 160,
  },
  {
    field: "balance",
    headerName: "Balance",
    renderCell: (params) => {
      return (
        <>
          <p>{params?.row?.balance ? params?.row?.balance : 0}</p>
        </>
      );
    },
    width: 160,
  },
  
];