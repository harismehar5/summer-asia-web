// export const BASE_URL = "https://summer-asia.herokuapp.com/";
export const BASE_URL = "https://summer-asia-db-express.vercel.app/";

//Supplier URL
export const SUPPLIER_BASE_URL = BASE_URL + "supplier/";
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
export const GET_SUPPLIER_LEDGER = SUPPLIER_BASE_URL + "get_supplier_ledger/"
//Customer URL
export const CUSTOMER_BASE_URL = BASE_URL + "customer/";
export const ADD_CUSTOMER = CUSTOMER_BASE_URL + "add_customer";
export const GET_CUSTOMERS_LIST = CUSTOMER_BASE_URL + "get_customers";
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
export const GET_CUSTOMERS_CASH_FLOW =
  CUSTOMER_BASE_URL + "get_customers_cash_flow";
export const GET_CUSTOMER_LEDGER = CUSTOMER_BASE_URL + "get_customer_ledger/"
//Product URL
export const PRODUCT_BASE_URL = BASE_URL + "product/";
export const GET_PRODUCTS_LIST = PRODUCT_BASE_URL + "get_products";
export const ADD_PRODUCT = PRODUCT_BASE_URL + "add_product";
export const DELETE_PRODUCT = PRODUCT_BASE_URL;
export const UPDATE_PRODUCT_BY_ID = PRODUCT_BASE_URL;
export const GET_PRODUCT_BY_ID = PRODUCT_BASE_URL;
export const UPDATE_PRODUCT_STATUS_BY_ID = PRODUCT_BASE_URL + "update_status";
export const ADD_QUANTITY = PRODUCT_BASE_URL + "add_quantity"
export const SUBTRACT_QUANTITY = PRODUCT_BASE_URL + "subtract_quantity"
export const STOCK_IN = PRODUCT_BASE_URL + "stock_in/"
export const STOCK_OUT = PRODUCT_BASE_URL + "stock_out/"

//Expense URL
export const EXPENSE_BASE_URL = BASE_URL + "expense/";
export const GET_EXPENSES_LIST = EXPENSE_BASE_URL + "get_expenses";
export const ADD_EXPENSE = EXPENSE_BASE_URL + "add_expense";
export const DELETE_EXPENSE = EXPENSE_BASE_URL;
export const UPDATE_EXPENSE_BY_ID = EXPENSE_BASE_URL;
export const GET_EXPENSE_BY_ID = EXPENSE_BASE_URL;
export const UPDATE_EXPENSE_STATUS_BY_ID = EXPENSE_BASE_URL + "update_status";

//Sale URL
export const SALE_BASE_URL = BASE_URL + "sale/";
export const ADD_SALE = SALE_BASE_URL + "add_sale";
export const GET_SALE_LIST = SALE_BASE_URL + "get_sale";

//Purchase URL
export const PURCHASE_BASE_URL = BASE_URL + "purchase/";
export const ADD_PURCHASE = PURCHASE_BASE_URL + "add_purchase";
export const GET_PURCHASE_LIST = PURCHASE_BASE_URL + "get_purchase";

//Stock URL
export const STOCK_BASE_URL = BASE_URL + "stock/";
export const ADD_STOCK_LOG = STOCK_BASE_URL + "add_stock_log";
export const GET_STOCK_LOG = STOCK_BASE_URL + "get_stock_log";
