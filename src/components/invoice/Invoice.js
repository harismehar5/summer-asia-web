import React, { useState } from "react";

const Invoice = React.forwardRef(
  (
    {
      data,
      saleData,
      customerData,
      salesmanData,
      isExpired,
      isWarranted,
      isEstimated,
      Adata,
    },
    ref
  ) => {
    function getFormattedDate() {
      const today = new Date();

      const day = today.getDate();
      const month = today.getMonth() + 1; // Months are zero-indexed, so add 1
      const year = today.getFullYear().toString().slice(-2); // Extract the last two digits

      // Pad single-digit day and month with leading zeros
      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = month < 10 ? `0${month}` : month;

      // Combine components into the desired format
      const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

      return formattedDate;
    }

    function formatDate(dateString) {
      // Convert the given date string to a Date object
      const date = new Date(dateString);

      // Extract day, month, and year components
      const day = date.getDate();
      const month = date.getMonth() + 1; // Months are zero-indexed, so we add 1
      const year = date.getFullYear().toString().slice(-2); // Extract the last two digits

      // Pad single-digit day and month with leading zeros
      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = month < 10 ? `0${month}` : month;

      // Combine components into the desired format
      const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

      return formattedDate;
    }
    const createdDate = data.createdAt;
    console.log("created date", createdDate);
    console.log("salesman ", salesmanData);
    console.log("sale data ", saleData);
    // const customerData = [data?.customerCode];
    // const saleData = data?.saleDetail;
    // const salemanData = [data?.salesman];

    console.log("data", data);
    console.log("adata ", Adata);
    // console.log("saledata = ", saleData);
    // console.log("customer data = ", customerData);
    // data.map((item) => (totalQuantity += Number(item.quantity)));
    // data.map((item) => (totalBonus += Number(item.bonus)));
    // data.map((item) => (totalDiscount += Number(item.discount)));
    // data.map((item) => (totalSalesTax += Number(item.salesTax)));
    // data.map((item) => (totalTradeRate += Number(item.tradeRate)));

    // console.log("data = ", data);

    return (
      <div ref={ref}>
        {isEstimated ? (
          <h1 style={{ textAlign: "center", margin: "3rem", fontSize: "4rem" }}>
            Estimate Invoice{" "}
          </h1>
        ) : (
          <header class="header ">
            <h1 style={{ margin: "20px" }}>BHC PHARMA</h1>
            <p>Opposite Medicare Hospital Gill Road, Gujranwala</p>
            <p>PH:-03338294944 E-mail ehtisham.danone@gmail.com</p>
            <p>License No. = 09-341-0132-112764 D NTN = </p>
          </header>
        )}

        <div class="flex evenly gap left">
          <div>
            <p>{customerData?.name}</p>
            <p>{customerData?.code}</p>
            <p>{customerData?.email}</p>
            <p>{customerData?.address}</p>
          </div>

          {/* {customerData?.map((item, index) => {
            return (
              <div>
                <p>{item?.name}</p>
                <p>{item?.code}</p>
                <p>{item?.email}</p>
                <p>{item?.address}</p>
              </div>
            );
          })} */}

          <div>
            <p>License No: {customerData?.license}</p>
            <p>NTN :{customerData?.ntn}</p>
            <p>License Expiry :{formatDate(customerData?.licenseExpiryDate)}</p>
            <p>Area Code :{customerData?.areaCode?.code}</p>
          </div>

          {/* {customerData?.map((item, index) => {
            return (
              <div>
                <p>License No: {item?.license}</p>
                <p>NTN :{item?.ntn}</p>
                <p>License Expiry :{formatDate(item?.licenseExpiryDate)}</p>
                <p>Area Code :{item?.areaCode?.code}</p>
              </div>
            );
          })} */}

          <div>
            <p>Inv No: 1327</p>
            <p>Salesman : {salesmanData?.name}</p>
            <p>Salesman Code :{salesmanData?.code}</p>
            {/* <p>Invoice Date : {createdDate}</p> */}
          </div>

          {/* {salesmanData?.map((item, index) => {
            return (
              <div>
                <p>Inv No: 1327</p>
                <p>Salesman : {item?.salesman?.name}</p>
                <p>Salesman Code :{item?.salesman?.code}</p>
                <p>Invoice Date : {createdDate}</p>
              </div>
            );
          })} */}
        </div>
        <div class="gap">
          <table>
            <thead>
              <tr>
                <th>Product Code</th>
                <th>Batch No</th>
                <th>Packing</th>
                <th>Strength</th>
                <th>Expiry Date</th>
                <th>QTY</th>
                <th>Dis %</th>
                <th>Bonus</th>
                <th>Sales Tax</th>
                <th>Trade Rate</th>
                <th>Total Amount</th>
              </tr>
            </thead>

            <tbody>
              {saleData?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item?.productCode?.name}</td>
                    <td>{item?.batchCode}</td>
                    <td>{item?.productCode?.packing}</td>
                    <td>{item?.productCode?.strength}</td>
                    <td>{formatDate(item?.expiryDate)}</td>
                    <td>{item?.quantity}</td>
                    <td>{item?.discount}</td>
                    <td>{item?.bonus}</td>
                    <td>{item?.salesTax}</td>
                    <td>{item?.tradeRate}</td>
                    <td>{item?.netTotal}</td>
                  </tr>
                );
              })}
            </tbody>
            {/* <tbody>
              {saleData?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item?.productCode?.name}</td>
                    <td>{item?.batchCode}</td>
                    <td>{item?.productCode?.packing}</td>
                    <td>{item?.productCode?.strength}</td>
                    <td>{formatDate(item?.expiryDate)}</td>
                    <td>{item?.quantity}</td>
                    <td>{item?.discount}</td>
                    <td>{item?.bonus}</td>
                    <td>{item?.salesTax}</td>
                    <td>{item?.tradeRate}</td>
                    <td>{item?.netTotal}</td>
                  </tr>
                );
              })}
            </tbody> */}
          </table>

          <table style={{ marginTop: "2rem" }}>
            <thead>
              <tr style={{ padding: "2rem" }}>
                <th>Additional Discount {data.additionalDiscount || "N/A"}</th>
                <th>Additional Tax {data.additionalTax || "N/A"}</th>
                <th>Payment By {data.paymentMode || "N/A"}</th>
                <th>Received Amount {data.receivedAmount || "N/A"}</th>
                <th>Total Amount {data.total || "N/A"}</th>
                <th>
                  Pending Amount {data.total - data.receivedAmount || "N/A"}
                </th>
              </tr>
            </thead>
            {/* <tbody>
              <tr>
                <td>No of ltems: 4</td>
                <td></td>
                <td></td>
                <td></td>
                <td>Gross</td>
                <td>4,267.00</td>
                <td>Dis.%</td>
                <td>0.00 S/Tax</td>
                <td>0.00 AdS/Tax</td>
                <td>0.00</td>
                <td>4,267.0</td>
              </tr>
              <tr>
                <td>Total Qty: 53</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody> */}
          </table>

          {/* <table class="last">
            <thead>
              <tr>
                <td></td>
                <td>Add Tax US 236-H @ 0.50</td>
                <td>21.34</td>
              </tr>
              <tr>
                <td>Four Thousand Two Hundred Eighty Eight</td>
                <td>Total Net Value</td>
                <td>4,288.0</td>
              </tr>
            </thead>
          </table> */}
        </div>

        {isWarranted ? (
          <footer style={{ padding: "2rem", fontSize: "10px" }}>
            <div
              style={{
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              <div style={{ fontWeight: "bold" }}>
                FORM 2A (SEE RULES 19 & 30) 34371 Warranty Under Seetion
                23(1)(i) orThe Drugs Act,
              </div>
              <div style={{ marginTop: "5px" }}>
                <span style={{ fontWeight: "bold" }}>I KHALID RASHEED</span>
                ,being a person resident in Pakistan,camying on business at the
                afc'esaid address under the namie of PHARMA NET,
              </div>
              <div>
                having valid license(s) as mentioned above greisstied by
                Licensing Authority. and being importers/Authorized Distr?butors
                of the Manufacturers
              </div>
              <div>
                Principals. do hereby give th warranty that the drugs here above
                described as sold by mie/specified and contain in the cash
                memo/invoicedes
              </div>
              <div>
                describing the goods referred to herein do not contravene in any
                way the provisions of scction 23 ofthe Drugs Act, 1976.
              </div>
              <div style={{ marginTop: "5px", fontWeight: "bold" }}>
                (ii) FORM-5 |see rule 6(2)(i), 6(5(b). 19 (7) and 48(1 )i)|
                Warvanty under MMedical Devices Rules.2017
              </div>
              <div style={{ marginTop: "5px" }}>
                <span style={{ fontWeight: "bold" }}>i KHALID RASHEED</span>
                ,being a person resident in Pakistan. carrying on business ut
                aforesed address under the name of PHARMA NET, holding valid
                license issued by
              </div>
              <div>
                Licensing Authority and having authority or being authorized by
                Manufacturers Principals vide ietters. co hereby give this
                warranty that the medical devices here
              </div>
              <div>
                above described as sold by me and contained in the bill of sale,
                invoice. bill of lading or other document. describing the
                medical devices referred to herein do not
              </div>
              <div>
                Contrwene ', any way the provisions of the DRAPAct, 2012 and the
                rules framed thers-under.
              </div>
              <div>
                Warranty Under Alternative Medicines & Health Products
                (Enlistment) Rules, 2014. |Sce rule 10 (3) & (5)|
              </div>
              <div>
                We,as the authorized distributors/agents and on behalf of
                thePrincipals/Manufacture's / importe:s hereby give warranty
                that the supplied
              </div>
              <div>
                alternative medicine health products mentioned herein do not
                contravene any provision of the prevailing DRAPACT and rules
                framed thereunder{" "}
                <div style={{ fontWeight: "bold" }}>KHALID RASHEED</div>
              </div>
            </div>
            <div style={{ marginTop: "20px", fontWeight: "bold" }}>
              <div dir="rtl">
                (i) کوئی دکاندار ایکسپائری اسٹاک کی رقم میں موجود بل سے منھبا
                کرنے کا مجاز نہیں ہو گا
              </div>
              <div dir="rtl">
                (ii) مال وصول کرتے وقت اچھی طرح چیک کر لیں بعد میں اسٹاک کی کمی
                بیشی کا کوئی کلیم قابل قبول نہیں ہو گا
              </div>
              <div dir="rtl">
                (iii) پر ایکسپائر مال حوالے کریں ورنہ کمپنی کی ذمہ داری نہیں ہو
                گی- Office Form کا کوہی بھی ملازم پر چی دے کر اسٹاک وصول کرنے کا
                مجاز نہیں رکھتا ہمیشہ کمپنی کے PHARMA NET
              </div>
              <div dir="rtl">
                (iv) کی قطی نہیں ہو گی PHARMA NET کا کوئی ملازم کسی دکاندار سے
                ایڈ وانس رقم وصول کرنے کا مجاز نہیں ہے اسکی ذمہ داری PHARMA NET
              </div>
              <div dir="rtl">
                (v) اسٹاک کپمنی کے بل کے مطابق وصول کرہں بعد میں کسی قسم کی کوئی
                ذمہ داری نہیں ہو گی
              </div>
              <div dir="rtl">
                (vi) ماہ کی مدت سے قبل تحریری طور پر کمپنی بذا کے علم میں نہ
                لایا جاے گا 6 کمپنی کسی بھی ایکسپائر کی تبدیلی کی قطعا ذمہ دار
                نہیں ہو گی جب تک کے کم از کم
              </div>
            </div>
          </footer>
        ) : null}
      </div>
    );
  }
);

export default Invoice;
