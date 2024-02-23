import React from "react";
import "./sidebar.scss";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PointOfSaleRoundedIcon from "@mui/icons-material/PointOfSaleRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import BackpackIcon from "@mui/icons-material/Backpack";

import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Medical POS</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Main</p>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />                  
              <span>Dashboard</span>         
          </li>
          </Link>
          <p className="title">Cash Flow</p>
          <Link to="/customer/cash_flow" style={{ textDecoration: "none" }}>
            <li>
              <CurrencyExchangeRoundedIcon className="icon" />
              <span>Cash Flow</span>
            </li>
          </Link>

          <p className="title">Area</p>
          <Link to="/area/add/" style={{ textDecoration: "none" }}>
            <li>
              <PointOfSaleRoundedIcon className="icon" />
              <span>Add Area</span>
            </li>
          </Link>
          <Link to="/area" style={{ textDecoration: "none" }}>
            <li>
              <FormatListBulletedIcon className="icon" />
              <span>Area List</span>
            </li>
          </Link>

          <p className="title">Company</p>
          <Link to="/supplier/add" style={{ textDecoration: "none" }}>
            <li>
              <PermIdentityIcon className="icon" />
              <span>Add Company</span>
            </li>
          </Link>
          <Link to="/supplier" style={{ textDecoration: "none" }}>
            <li>
              <FormatListBulletedIcon className="icon" />
              <span>Company List</span>
            </li>
          </Link>

          <p className="title">Customer</p>
          <Link to="/customers/add/" style={{ textDecoration: "none" }}>
            <li>
              <PointOfSaleRoundedIcon className="icon" />
              <span>Add Customer</span>
            </li>
          </Link>
          <Link to="/customers" style={{ textDecoration: "none" }}>
            <li>
              <FormatListBulletedIcon className="icon" />
              <span>Customer List</span>
            </li>
          </Link>

          <p className="title">Salesman</p>
          <Link to="/salesman/add/" style={{ textDecoration: "none" }}>
            <li>
              <PointOfSaleRoundedIcon className="icon" />
              <span>Add Salesman</span>
            </li>
          </Link>
          <Link to="/salesman" style={{ textDecoration: "none" }}>
            <li>
              <FormatListBulletedIcon className="icon" />
              <span>Salesman List</span>
            </li>
          </Link>

          <p className="title">Product</p>
          <Link to="/product/add" style={{ textDecoration: "none" }}>
            <li>
              <BackpackIcon className="icon" />
              <span>Add Product</span>
            </li>
          </Link>
          <Link to="/product" style={{ textDecoration: "none" }}>
            <li>
              <Inventory2OutlinedIcon className="icon" />
              <span>Product List</span>
            </li>
          </Link>

          <p className="title">Expenses Catagory</p>
          <Link to="/expense/catagory/add" style={{ textDecoration: "none" }}>
            <li>
              <LocalMallRoundedIcon className="icon" />
              <span>Add Expense Catagory</span>
            </li>
          </Link>
          <Link to="/expense/catagory/list" style={{ textDecoration: "none" }}>
            <li>
              <FormatListBulletedIcon className="icon" />
              <span>Expense Catagory List</span>
            </li>
          </Link>

          <p className="title">Expenses</p>
          <Link to="/expense/add" style={{ textDecoration: "none" }}>
            <li>
              <LocalMallRoundedIcon className="icon" />
              <span>Add Expense</span>
            </li>
          </Link>
          <Link to="/expense" style={{ textDecoration: "none" }}>
            <li>
              <FormatListBulletedIcon className="icon" />
              <span>Expense List</span>
            </li>
          </Link>

          <p className="title">Purchase</p>
          <Link to="/purchase/add" style={{ textDecoration: "none" }}>
            <li>
              <ReceiptRoundedIcon className="icon" />
              <span>Add Purchase</span>
            </li>
          </Link>
          <Link to="/purchase" style={{ textDecoration: "none" }}>
            <li>
              <FormatListBulletedIcon className="icon" />
              <span>Purchase List</span>
            </li>
          </Link>

          <p className="title">Sale</p>
          <Link to="/sale/add/" style={{ textDecoration: "none" }}>
            <li>
              <PointOfSaleRoundedIcon className="icon" />
              <span>Add Sale</span>
            </li>
          </Link>
          <Link to="/sale" style={{ textDecoration: "none" }}>
            <li>
              <FormatListBulletedIcon className="icon" />
              <span>Sale List</span>
            </li>
          </Link>
          
          <p className="title">Inventory</p>
          <Link to="/inventory" style={{ textDecoration: "none" }}>
            <li>
              <FormatListBulletedIcon className="icon" />
              <span>Inventory List</span>
            </li>
          </Link>

          <p className="title">Purchase Return</p>
          <Link to="/purchase-return/add" style={{ textDecoration: "none" }}>
            <li>
              <FormatListBulletedIcon className="icon" />
              <span>Add Purchase Return</span>
            </li>
          </Link>

          <p className="title">Sale Return</p>
          <Link to="/sale-return/adds/" style={{ textDecoration: "none" }}>
            <li>
              <PointOfSaleRoundedIcon className="icon" />
              <span>Add Sale Return</span>
            </li>
          </Link>
          <Link to="/sale/sale_return/" style={{ textDecoration: "none" }}>
            <li>
              <FormatListBulletedIcon className="icon" />
              <span>Sale Return List</span>
            </li>
          </Link>

          <p className="title">Estimated Sale</p>
          <Link to="/sale/sale_estimated/" style={{ textDecoration: "none" }}>
            <li>
              <FormatListBulletedIcon className="icon" />
              <span>Estimated Sale</span>
            </li>
          </Link>
        
          {/* <Link to="/product/stock_log" style={{ textDecoration: "none" }}>
            <li>
              <BookIcon className="icon" />
              <span>Stock Log</span>
            </li>
          </Link> */}
          
          <p className="title">Ledger</p>
          <Link to="/customer/ledger" style={{ textDecoration: "none" }}>
            <li>
              <AccountBalanceRoundedIcon className="icon" />
              <span>Customer Ledger</span>
            </li>
          </Link>
          <Link to="/supplier/ledger" style={{ textDecoration: "none" }}>
            <li>
              <AccountBalanceRoundedIcon className="icon" />
              <span>Company Ledger</span>
            </li>
          </Link>
          <Link to="/salesman/ledger" style={{ textDecoration: "none" }}>
            <li>
              <AccountBalanceRoundedIcon className="icon" />
              <span>Salesman Ledger</span>
            </li>
          </Link>

          <p className="title">Reports</p>
          <Link to="/salesReports" style={{ textDecoration: "none" }}>
            <li>
              <FormatListBulletedIcon className="icon" />
              <span>Sale Report</span>
            </li>
          </Link>

          <Link to="/purchaseReposts" style={{ textDecoration: "none" }}>
            <li>
              <FormatListBulletedIcon className="icon" />
              <span>Purchase Report</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
