import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Protected from "./utils/protectedRoute";
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
import EstimatedSale from "./layout/sale/EstimatedSale";
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
import GetSalesManLedger from "./layout/salesman/GetSalesManLedger";
import GetSupplierLedger from "./layout/supplier/GetSupplierLedger";
import GetAreaList from "./layout/area/getAreaList";
import AddArea from "./layout/area/addArea";
import AddCustomers from "./layout/customers/addCustomers";
import GetCustomersList from "./layout/customers/getCustomersList";
import GetSalesManList from "./layout/salesman/GetSalesManList";
import AddSalesMan from "./layout/salesman/AddSalesMan";
import PurchaseDetails from "./layout/purchase/PurchaseDetails";
import SalesDetails from "./layout/sale/SalesDetails";
import SalesReturn from "./layout/sale/SalesReturn";
import PurchaseReturn from "./layout/purchaseReturn/addPurchaseReturn";
import AddSalesReturn from "./layout/saleReturn/addSalesReturn";
import Inventory from "./layout/Inventory";
import SalesReports from "./layout/SalesReports/salesReports";
import PurchaseReports from "./layout/PurchaseReports/purchaseReports";
import ExpiredInventory from "./layout/Inventory/ExpiredInventory";
import AddExpenseCatagory from "./layout/expenseCatagory/AddExpenseCatagory";
import ExpenseCatagoryList from "./layout/expenseCatagory/ExpenseCatagory";
import SalesReturnDetails from "./layout/sale/SalesReturnDetails";
import PurchaseReturnList from "./layout/purchaseReturn/PurchaseReturnList";
import PurchaseReturnDetails from "./layout/purchaseReturn/PurchaseReturnDetails";
import Login from "./layout/login/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Protected Component={Dashboard} />} />
        <Route path="login" element={<Login/>} />

        <Route
          path="customer/"
        >
           <Route index element={<Protected Component={GetCustomerList} />} />
          <Route path="add" element={<Protected Component={AddCustomer} />} />
          <Route
            path="edit/:id"
            element={<Protected Component={EditCustomer} />}
          />
          <Route
            path="add_cash_in"
            element={<Protected Component={AddCustomerCashIn} />}
          />
          <Route
            path="add_cash_out"
            element={<Protected Component={AddCustomerCashOut} />}
          />
          <Route
            path="get_cash_in"
            element={<Protected Component={GetCustomerCashIn} />}
          />
          <Route
            path="get_cash_out"
            element={<Protected Component={GetCustomerCashOut} />}
          />
          <Route
            path="cash_flow"
            element={<Protected Component={GetCustomerCashFlow} />}
          />
          <Route
            path="ledger"
            element={<Protected Component={GetCustomerLedger} />}
          />
        </Route>

        <Route path="supplier/">
          <Route
            index
            element={<Protected Component={GetSuppliersList} />}
          />
          <Route path="add" element={<Protected Component={AddSupplier} />} />
          <Route
            path="edit/:id"
            element={<Protected Component={EditSupplier} />}
          />
          <Route
            path="add_cash_in"
            element={<Protected Component={AddSupplierCashIn} />}
          />
          <Route
            path="add_cash_out"
            element={<Protected Component={AddSupplierCashOut} />}
          />
          <Route
            path="get_cash_in"
            element={<Protected Component={GetSupplierCashIn} />}
          />
          <Route
            path="get_cash_out"
            element={<Protected Component={GetSupplierCashOut} />}
          />
          <Route
            path="cash_flow"
            element={<Protected Component={GetSupplierCashFlow} />}
          />
          <Route
            path="ledger"
            element={<Protected Component={GetSupplierLedger} />}
          />
        </Route>

        <Route path="expense/">
          <Route
            index
            element={<Protected Component={GetExpensesList} />}
          />
          <Route path="add" element={<Protected Component={AddExpense} />} />
          <Route
            path="edit/:id"
            element={<Protected Component={EditExpense} />}
          />
        </Route>

        <Route path="expense/catagory">
          <Route
            index
            element={<Protected Component={GetExpensesList} />}
          />
          <Route path="add" element={<Protected Component={AddExpenseCatagory} />} />
          <Route path="list" element={<Protected Component={ExpenseCatagoryList} />} />
        </Route>

        <Route path="product/">
          <Route
            index
            element={<Protected Component={GetProductStock} />}
          />
          <Route path="add" element={<Protected Component={AddProduct} />} />
          <Route path="stock_log" element={<Protected Component={StockLog} />} />
        </Route>

        <Route path="inventory/">
          <Route index element={<Protected Component={Inventory} />} />
          <Route path="expired" element={<Protected Component={ExpiredInventory} />} />
        </Route>

        <Route path="sale/">
          <Route index element={<Protected Component={GetSaleList} />} />
          <Route
            path="sale_details/:id"
            element={<Protected Component={SalesDetails} />}
          />
          <Route path="add" element={<Protected Component={AddSale} />} />

          <Route path="sale_return">
            <Route index element={<Protected Component={SalesReturn} />} />
            <Route
              path="_details/:id"
              element={<Protected Component={SalesReturnDetails} />}
            />
          </Route>
          <Route path="sale_estimated" element={<Protected Component={EstimatedSale} />} />
        </Route>

        <Route path="purchase/">
          <Route index element={<Protected Component={GetPurchaseList} />} />
          <Route path="add" element={<Protected Component={AddPurchase} />} />
          <Route
            path="purchase_details/:id"
            element={<Protected Component={PurchaseDetails} />}
          />
        </Route>

        <Route path="area/">
          <Route index element={<Protected Component={GetAreaList} />} />
          <Route path="add" element={<Protected Component={AddArea} />} />
        </Route>

        <Route path="customers/">
          <Route index element={<Protected Component={GetCustomersList} />} />
          <Route path="add" element={<Protected Component={AddCustomers} />} />
        </Route>

        <Route path="salesman/">
          <Route index element={<Protected Component={GetSalesManList} />} />
          <Route path="add" element={<Protected Component={AddSalesMan} />} />
          <Route path="ledger" element={<Protected Component={GetSalesManLedger} />} />
        </Route>

        <Route path="purchase-return/">
          {/* Add Protected Component for this route if needed */}
          <Route path="add" element={<Protected Component={PurchaseReturn} />} />
        </Route>

        <Route path="salesReports">
          <Route index element={<Protected Component={SalesReports} />} />
        </Route>

        <Route path="purchaseReposts">
          <Route index element={<Protected Component={PurchaseReports} />} />
        </Route>

        <Route path="purchase-return">
          <Route index element={<Protected Component={PurchaseReturnList} />} />
          <Route
            path="add"
            element={<Protected Component={PurchaseReturn} />}
          />
          <Route
            path="_details/:id"
            element={<Protected Component={PurchaseReturnDetails} />}
          />
        </Route>

        <Route path="sale-return">
          <Route path="adds" element={<Protected Component={AddSalesReturn} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
