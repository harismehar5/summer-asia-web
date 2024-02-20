// export const BASE_URL = "https://summer-asia.herokuapp.com/";
export const BASE_URL = "https://medical-app-backend-v2.vercel.app/api/";

//Supplier URL
export const SUPPLIER_BASE_URL = BASE_URL + "companies/";
export const ADD_SUPPLIER = SUPPLIER_BASE_URL + "add_supplier";
export const GET_SUPPLIERS_LIST = SUPPLIER_BASE_URL + "get_suppliers";
export const GET_SUPPLIER_BY_ID = SUPPLIER_BASE_URL;
export const UPDATE_SUPPLIER_BY_ID = SUPPLIER_BASE_URL;
export const DELETE_SUPPLIER_BY_ID = SUPPLIER_BASE_URL;
export const UPDATE_SUPPLIER_STATUS_BY_ID =
  SUPPLIER_BASE_URL + "update_status/";
export const GET_SUPPLIER_CASH_IN_BY_ID =
  SUPPLIER_BASE_URL + "get_cash_in_by_id/";
export const GET_CASH_OUT_BY_ID = SUPPLIER_BASE_URL + "get_cash_out_by_id/";
export const ADD_SUPPLIER_CASH_IN = SUPPLIER_BASE_URL + "add_cash_in/";
export const ADD_SUPPLIER_CASH_OUT = SUPPLIER_BASE_URL + "add_cash_out/";
export const GET_ALL_SUPPLIER_CASH_IN =
  SUPPLIER_BASE_URL + "get_all_cash_in_supplier";
export const GET_ALL_SUPPLIER_CASH_OUT =
  SUPPLIER_BASE_URL + "get_all_cash_out_supplier";
export const GET_SUPPLIERS_CASH_FLOW =
  SUPPLIER_BASE_URL + "get_suppliers_cash_flow";
export const GET_SUPPLIER_LEDGER = BASE_URL + "cash/search?keyword=";
//Customer URL
export const CUSTOMER_BASE_URL = BASE_URL + "customer/";
export const ADD_CUSTOMER = CUSTOMER_BASE_URL + "add_customer";
// export const GET_CUSTOMERS_LIST = CUSTOMER_BASE_URL + "get_customers";
export const GET_CUSTOMER_BY_ID = CUSTOMER_BASE_URL + "";
export const UPDATE_CUSTOMER_BY_ID = CUSTOMER_BASE_URL + "";
export const DELETE_CUSTOMER_BY_ID = CUSTOMER_BASE_URL + "";
export const UPDATE_CUSTOMER_STATUS_BY_ID =
  CUSTOMER_BASE_URL + "update_status/";
export const GET_CUSTOMER_CASH_IN_BY_ID =
  CUSTOMER_BASE_URL + "get_cash_in_by_id/";
export const GET_CUSTOMER_CASH_OUT_BY_iD =
  CUSTOMER_BASE_URL + "get_cash_out_by_id/";
export const ADD_CUSTOMER_CASH_IN = CUSTOMER_BASE_URL + "add_cash_in/";
export const ADD_CUSTOMER_CASH_OUT = CUSTOMER_BASE_URL + "add_cash_out/";
export const GET_ALL_CUSTOMER_CASH_IN =
  CUSTOMER_BASE_URL + "get_all_cash_in_customer";
export const GET_ALL_CUSTOMER_CASH_OUT =
  CUSTOMER_BASE_URL + "get_all_cash_out_customer";
// export const GET_CUSTOMERS_CASH_FLOW =
//   CUSTOMER_BASE_URL + "get_customers_cash_flow";
export const GET_CUSTOMER_LEDGER = CUSTOMER_BASE_URL + "get_customer_ledger/";
//Product URL
export const PRODUCT_BASE_URL = BASE_URL + "product/";
export const GET_PRODUCTS_LIST = PRODUCT_BASE_URL + "get_products";
// export const ADD_PRODUCT = PRODUCT_BASE_URL + "add_product";
export const DELETE_PRODUCT = PRODUCT_BASE_URL;
export const UPDATE_PRODUCT_BY_ID = PRODUCT_BASE_URL;
export const GET_PRODUCT_BY_ID = PRODUCT_BASE_URL;
export const UPDATE_PRODUCT_STATUS_BY_ID = PRODUCT_BASE_URL + "update_status";
export const ADD_QUANTITY = PRODUCT_BASE_URL + "add_quantity";
export const SUBTRACT_QUANTITY = PRODUCT_BASE_URL + "subtract_quantity";
export const STOCK_IN = PRODUCT_BASE_URL + "stock_in/";
export const STOCK_OUT = PRODUCT_BASE_URL + "stock_out/";
export const COMPANY_PRODUCTS = SUPPLIER_BASE_URL + "get_products";

//Expense URL
// export const EXPENSE_BASE_URL = BASE_URL + "expense/";
export const EXPENSE_BASE_URL = BASE_URL + "expenses";
export const GET_EXPENSES_LIST = BASE_URL + "expenses";
export const ADD_EXPENSE = EXPENSE_BASE_URL + "add_expense";
export const DELETE_EXPENSE = EXPENSE_BASE_URL;
export const UPDATE_EXPENSE_BY_ID = EXPENSE_BASE_URL;
export const GET_EXPENSE_BY_ID = EXPENSE_BASE_URL;
export const UPDATE_EXPENSE_STATUS_BY_ID = EXPENSE_BASE_URL + "update_status";

//Expense Catagory
export const EXPENSE_CATAGORY_BASE_URL = BASE_URL + "expensecategories/";

//Sale URL
export const SALE_BASE_URL = BASE_URL + "sales/";
export const ADD_SALE = SALE_BASE_URL + "add_sale";
export const ESTIMATE_SALE = SALE_BASE_URL + "dummysales";
export const GET_BATCH_LIST = SALE_BASE_URL + "get_batch";
export const GET_SALE_LIST = BASE_URL + "sales";
export const ADD_SALES_SERVICES = BASE_URL + "sales";
export const GET_SALE_RETURN_LIST = BASE_URL + "salereturns";

//Purchase URL
export const PURCHASE_BASE_URL = BASE_URL + "purchases";
// export const ADD_PURCHASE = PURCHASE_BASE_URL + "add_purchase";
export const GET_PURCHASE_LIST = BASE_URL + "purchases";

//Stock URL
export const STOCK_BASE_URL = BASE_URL + "stock/";
export const ADD_STOCK_LOG = STOCK_BASE_URL + "add_stock_log";
export const GET_STOCK_LOG = STOCK_BASE_URL + "get_stock_log";

export const COMPANY_BASE_URL = BASE_URL + "";
export const GET_ALL_COMPANIES = BASE_URL + "companies";
export const ADD_COMPANY = BASE_URL + "companies";

// export const PRODUCT_BASE_URL = BASE_URL + ""
export const GET_ALL_PRODUCTS = BASE_URL + "products";
export const GET_ALL_INVENTORY = BASE_URL + "inventories";
export const ADD_PRODUCT = BASE_URL + "products";

export const ADD_PURCHASE = BASE_URL + "purchases";

//Area URL
export const GET_AREA_LIST = BASE_URL + "areas";
//CUSTOMERS URL
export const GET_CUSTOMERS_LIST = BASE_URL + "customers";
//SALESMEN URL
export const GET_SALESMEN_LIST = BASE_URL + "salesmen";
//salesman URL
export const GET_salesman_LIST = BASE_URL + "salesmen";
//PURCHASERETURN URL

//salesman URL
export const GET_SALESRETURN_LIST = BASE_URL + "salereturns";

//PURCHASERETURN URL
export const GET_PURCHASERETURN = BASE_URL + "purchasereturns";
//CUSTOMER CASH FLOW URL
export const GET_CUSTOMERS_CASH_FLOW = BASE_URL + "cash";
//CUSTOMER CASH IN URL
export const GET_CUSTOMERS_CASH_IN = BASE_URL + "cashin";
export const GET_QUANTITY_AND_EXPIRY_LIST =
  BASE_URL + "sales/getquantityandexpiry";
//CUSTOMER CASH IN URL
export const GET_CUSTOMERS_CASH_OUT = BASE_URL + "cashout";
//Inventory URL
export const GET_INVENTORY_LIST = BASE_URL + "inventories";

//Inventory StockIn URL
export const GET_INVENTORY_StockIn = BASE_URL + "inventories/stockin";

//Inventory StockOut URL
export const GET_INVENTORY_StockOut = BASE_URL + "inventories/stockout";

//Purchase Report Detail URL
export const GET_Purchase_Reports = BASE_URL + "purchases/detail";

//Sales Report Detail URL
export const GET_Sales_Reports = BASE_URL + "sales/detail";
