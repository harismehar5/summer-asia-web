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
import BookIcon from "@mui/icons-material/Book";
import BackpackIcon from "@mui/icons-material/Backpack";

import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Summer Asia</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Main</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
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
              <span>Purchase list</span>
            </li>
          </Link>
          <p className="title">Customer</p>
          <Link to="/customer/add" style={{ textDecoration: "none" }}>
            <li>
              <PermIdentityIcon className="icon" />
              <span>Add Customer</span>
            </li>
          </Link>
          <Link to="/customer" style={{ textDecoration: "none" }}>
            <li>
              <FormatListBulletedIcon className="icon" />
              <span>Customer list</span>
            </li>
          </Link>
          <Link to="/customer/cash_flow" style={{ textDecoration: "none" }}>
            <li>
              <CurrencyExchangeRoundedIcon className="icon" />
              <span>Cash Flow</span>
            </li>
          </Link>
          <p className="title">Supplier</p>
          <Link to="/supplier/add" style={{ textDecoration: "none" }}>
            <li>
              <PermIdentityIcon className="icon" />
              <span>Add Supplier</span>
            </li>
          </Link>
          <Link to="/supplier" style={{ textDecoration: "none" }}>
            <li>
              <FormatListBulletedIcon className="icon" />
              <span>Supplier list</span>
            </li>
          </Link>
          <Link to="/supplier/cash_flow" style={{ textDecoration: "none" }}>
            <li>
              <CurrencyExchangeRoundedIcon className="icon" />
              <span>Cash Flow</span>
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
              <span>Expense list</span>
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
              <span>Stock</span>
            </li>
          </Link>
          <Link to="/product/stock_log" style={{ textDecoration: "none" }}>
            <li>
              <BookIcon className="icon" />
              <span>Stock Log</span>
            </li>
          </Link>
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
              <span>Supplier Ledger</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
