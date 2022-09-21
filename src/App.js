import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./layout/dashboard/Dashboard";
import GetCustomersList from "./layout/customer/GetCustomersList";
import AddCustomer from "./layout/customer/AddCustomer";
import EditCustomer from "./layout/customer/EditCustomer";

import GetSuppliersList from "./layout/supplier/GetSuppliersList";
import AddSupplier from "./layout/supplier/AddSupplier";
import EditSupplier from "./layout/supplier/EditSupplier";

import GetProductStock from "./layout/product/GetProductStock";

import GetExpensesList from "./layout/expense/GetExpensesList";
import AddExpense from "./layout/expense/AddExpense";
import EditExpense from "./layout/expense/EditExpense";

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
          </Route>
          <Route path="supplier">
            <Route index element={<GetSuppliersList />} />
            <Route path="add" element={<AddSupplier />} />
            <Route path="edit/:id" element={<EditSupplier />} />
          </Route>
          <Route path="expense">
            <Route index element={<GetExpensesList />} />
            <Route path="add" element={<AddExpense />} />
            <Route path="edit/:id" element={<EditExpense />} />
          </Route>
          <Route path="product">
            <Route index element={<GetProductStock />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
