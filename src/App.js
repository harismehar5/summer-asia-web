import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./layout/dashboard/Dashboard";

import GetCustomerList from "./layout/customer/GetCustomersList";
import AddCustomer from "./layout/customer/AddCustomer";
import EditCustomer from "./layout/customer/EditCustomer";
import GetCustomerCashIn from "./layout/customer/GetCustomerCashIn";
import GetCustomerCashOut from "./layout/customer/GetCustomerCashOut";

import GetSuppliersList from "./layout/supplier/GetSuppliersList";
import AddSupplier from "./layout/supplier/AddSupplier";
import EditSupplier from "./layout/supplier/EditSupplier";
import GetSupplierCashIn from "./layout/supplier/GetSupplierCashIn";
import GetSupplierCashOut from "./layout/supplier/GetSupplierCashOut";

import GetProductStock from "./layout/product/GetProductStock";
import AddProduct from "./layout/product/AddProduct";

import GetExpensesList from "./layout/expense/GetExpensesList";
import AddExpense from "./layout/expense/AddExpense";
import EditExpense from "./layout/expense/EditExpense";

import "./App.scss";
import AddSale from "./layout/sale/AddSale";
import GetSaleList from "./layout/sale/GetSaleList";
import AddPurchase from "./layout/purchase/AddPurchase";
import GetPurchaseList from "./layout/purchase/GetPurchaseList";
import GetCustomerCashFlow from "./layout/customer/GetCustomerCashFlow";
import GetSupplierCashFlow from "./layout/supplier/GetSupplierCashFlow";
import AddCustomerCashIn from "./layout/customer/AddCustomerCashIn";
import AddCustomerCashOut from "./layout/customer/AddCustomerCashOut";
import AddSupplierCashIn from "./layout/supplier/AddSupplierCashIn";
import AddSupplierCashOut from "./layout/supplier/AddSupplierCashOut";
import StockLog from "./layout/product/StockLog";
import GetCustomerLedger from "./layout/customer/GetCustomerLedger";
import GetSalesmenLedger from "./layout/salesmen/GetSalesmenLedger";
import GetSupplierLedger from "./layout/supplier/GetSupplierLedger";
import GetAreaList from "./layout/area/getAreaList";
import AddArea from "./layout/area/addArea";
import AddCustomers from "./layout/customers/addCustomers";
import GetCustomersList from "./layout/customers/getCustomersList";
import GetSalesmenList from "./layout/salesmen/getSalesmenList";
import AddSalesmen from "./layout/salesmen/addSalesmen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Dashboard />} />
          <Route path="customer">
            <Route index element={<GetCustomerList />} />
            <Route path="add" element={<AddCustomer />} />
            <Route path="edit/:id" element={<EditCustomer />} />
            <Route path="add_cash_in" element={<AddCustomerCashIn />} />
            <Route path="add_cash_out" element={<AddCustomerCashOut />} />
            <Route path="get_cash_in" element={<GetCustomerCashIn />} />
            <Route path="get_cash_out" element={<GetCustomerCashOut />} />
            <Route path="cash_flow" element={<GetCustomerCashFlow />} />
            <Route path="ledger" element={<GetCustomerLedger />} />
          </Route>
          <Route path="supplier">
            <Route index element={<GetSuppliersList />} />
            <Route path="add" element={<AddSupplier />} />
            <Route path="edit/:id" element={<EditSupplier />} />
            <Route path="add_cash_in" element={<AddSupplierCashIn />} />
            <Route path="add_cash_out" element={<AddSupplierCashOut />} />
            <Route path="get_cash_in" element={<GetSupplierCashIn />} />
            <Route path="get_cash_out" element={<GetSupplierCashOut />} />
            <Route path="cash_flow" element={<GetSupplierCashFlow />} />
            <Route path="ledger" element={<GetSupplierLedger />} />
          </Route>
          <Route path="expense">
            <Route index element={<GetExpensesList />} />
            <Route path="add" element={<AddExpense />} />
            <Route path="edit/:id" element={<EditExpense />} />
          </Route>
          <Route path="product">
            <Route index element={<GetProductStock />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="stock_log" element={<StockLog />} />
          </Route>
          <Route path="sale">
            <Route index element={<GetSaleList />} />
            <Route path="add" element={<AddSale />} />
          </Route>
          <Route path="purchase">
            <Route index element={<GetPurchaseList />} />
            <Route path="add" element={<AddPurchase />} />
          </Route>
          <Route path="area">
          <Route index element={<GetAreaList/>} />
            <Route path="add" element={<AddArea />} />
          </Route>
          <Route path="customers">
          <Route index element={<GetCustomersList/>} />
            <Route path="add" element={<AddCustomers />} />
          </Route>
          <Route path="salesmen">
          <Route index element={<GetSalesmenList/>} />
            <Route path="add" element={<AddSalesmen/>} />
            <Route path="ledger" element={<GetSalesmenLedger />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
