import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./layout/dashboard/Dashboard";

import GetCustomersList from "./layout/customer/GetCustomersList";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Dashboard />} />
          <Route path="customer">
            <Route index element={<GetCustomersList />} />
            <Route path="add" element={<AddCustomer />} />
            <Route path="edit/:id" element={<EditCustomer />} />
            <Route path="cash_in" element={<GetCustomerCashIn />} />
            <Route path="cash_out" element={<GetCustomerCashOut />} />
          </Route>
          <Route path="supplier">
            <Route index element={<GetSuppliersList />} />
            <Route path="add" element={<AddSupplier />} />
            <Route path="edit/:id" element={<EditSupplier />} />
            <Route path="cash_in" element={<GetSupplierCashIn />} />
            <Route path="cash_out" element={<GetSupplierCashOut />} />
          </Route>
          <Route path="expense">
            <Route index element={<GetExpensesList />} />
            <Route path="add" element={<AddExpense />} />
            <Route path="edit/:id" element={<EditExpense />} />
          </Route>
          <Route path="product">
            <Route index element={<GetProductStock />} />
            <Route path="add" element={<AddProduct />} />
          </Route>
          <Route path="sale">
            <Route index element={<GetSaleList />} />
            <Route path="add" element={<AddSale />} />
          </Route>
          <Route path="purchase">
            <Route index element={<GetPurchaseList />} />
            <Route path="add" element={<AddPurchase />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
