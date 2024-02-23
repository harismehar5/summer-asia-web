import React from "react";
import "./widget.scss";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CurrencyExchangeRoundedIcon from '@mui/icons-material/CurrencyExchangeRounded';
import { Link } from "react-router-dom";

export default function Widgets({ type,amount }) {
    
  let cardData;
  // let diff = 20;

  switch (type) {
    case "area":
      cardData = {
        title: "Areas",
        isMoney: false,
        linkName: "See all areas",
        icon: <PersonOutlineOutlinedIcon className="icon"/>,
        amount:amount,
        link:"/area",
      };
      break;
      case "supplier":
        cardData = {
          title: "Supplier",
          isMoney: false,
          linkName: "See all supplier",
          icon: <PersonOutlineOutlinedIcon className="icon"/>,
          amount:amount,
          link:"/supplier",
        };
        break;
    case "customer":
      cardData = {
        title: "CUSTOMERS",
        isMoney: false,
        linkName: "See all customers",
        icon: <PersonOutlineOutlinedIcon className="icon"/>,
        amount:amount,
        link:"/customers",
      };
      break;
    case "product":
      cardData = {
        title: "Products",
        isMoney: false,
        linkName: "See all products",
        icon: <PersonOutlineOutlinedIcon className="icon"/>,
        amount:amount,
        link:"/product",
      };
      break;
      case "salesman":
        cardData = {
          title: "Salesman",
          isMoney: false,
          linkName: "See all salesmen",
          icon: <PersonOutlineOutlinedIcon className="icon"/>,
          amount:amount,
          link:"/salesman",
        };
        break;
      case "purchase":
        cardData = {
          title: "Purchase",
          isMoney: false,
          linkName: "See all purchases",
          icon: <CurrencyExchangeRoundedIcon className="icon"/>,
          amount:amount,
          link:"/purchase",
        };
        break;
        case "purchaseReturn":
          cardData = {
            title: "Purchase Return",
            isMoney: false,
            // linkName: "See all purchase returns",
            icon: <CurrencyExchangeRoundedIcon className="icon"/>,
            amount:amount,
            // link:"/purchaseReturn",
          };
          break;
          case "sale":
            cardData = {
              title: "Sales",
              isMoney: false,
              linkName: "See all sales",
              icon: <CurrencyExchangeRoundedIcon className="icon"/>,
              amount:amount,
              link:"/sale",
            };
            break;
            case "salesReturn":
              cardData = {
                title: "Sales Returns",
                isMoney: false,
                linkName: "See all sale returns",
                icon: <CurrencyExchangeRoundedIcon className="icon"/>,
                amount:amount,
                link:"/sale/sale_return/",
              };
              break;
              case "cashIn":
              cardData = {
                title: "Cash In Balance",
                isMoney: false,
                // linkName: "See all cash in balance",
                icon: <CurrencyExchangeRoundedIcon className="icon"/>,
                amount:amount,
                // link:"/sale/sale_return/",
              };
              break;
              case "cashOut":
                cardData = {
                  title: "Cash Out Balance",
                  isMoney: false,
                  // linkName: "See all cash out balance",
                  icon: <CurrencyExchangeRoundedIcon className="icon"/>,
                  amount:amount,
                  // link:"/sale/sale_return/",
                };
                break;
                case "count":
                cardData = {
                  title: "Count",
                  isMoney: false,
                  // linkName: "See all cash out balance",
                  icon: <CurrencyExchangeRoundedIcon className="icon"/>,
                  amount:amount,
                  // link:"/sale/sale_return/",
                };
                break;
                case "currentBalance":
                cardData = {
                  title: "Current Balance",
                  isMoney: false,
                  // linkName: "See all current balance",
                  icon: <CurrencyExchangeRoundedIcon className="icon"/>,
                  amount:amount,
                  // link:"/sale/sale_return/",
                };
                break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{cardData.title || "NA"}</span>
        <span className="counter">{cardData.isMoney && "$"}{cardData.amount || "NA"}</span>
        <span className="link"><Link to={cardData.link}>{cardData.linkName }</Link></span>
      </div>
      <div className="right">
        <div className="percentage negative">
          {/* <KeyboardArrowUpIcon /> */}
          {/* {diff}% */}
        </div>
        {cardData.icon}
      </div>
    </div>
  );
}
