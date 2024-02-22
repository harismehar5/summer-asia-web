import React, { useEffect, useState } from 'react'
import './dashboard.scss'
import SideBar from '../../components/sidebar/SideBar'
import Navbar from '../../components/navbar/Navbar'
import Widgets from '../../components/widgets/Widgets'
import Featured from '../../components/featured/Featured'
import Charts from '../../components/charts/Charts'
import axios from 'axios'
import { GET_DASHBOARD_COUNT } from '../../utils/config'



export default function Dashboard() {

  const [data, setData] = useState([]);
  
  useEffect(() => {
    axios
      .get(GET_DASHBOARD_COUNT)
      .then((response) => {
        setData(response.data);
        console.log("data", response.data);
      })
      .catch((error) => {
        console.error("Error fetching areas:", error);
      });
  }, []);

 
  return (
    <div className='dashboard'>
      <SideBar/>
      <div className='dashboard-container'>
        <Navbar/>
        <div className='widgets'>
          <Widgets type={"area"} amount={data.areaCount}/>
          <Widgets type={"customer"}amount={data.customerCount}/>
          <Widgets type={"supplier"} amount={data.companyCount}/>
          </div>
          <div className='widgets'>
          <Widgets type={"product"} amount={data.productCount}/>
          <Widgets type={"purchase"} amount={data.purchaseCount}/>
          <Widgets type={"purchaseReturn"} amount={data.purchaseReturnCount}/>
          </div>
          <div className='widgets'>
          <Widgets type={"sale"} amount={data.saleCount}/>
          <Widgets type={"salesman"}amount={data.salesmanCount}/>
          <Widgets type={"salesReturn"}amount={data.saleReturnCount}/>
          
        </div>
        {/* <div className='charts'>
          <Featured/>
          <Charts/>
        </div> */}
      </div>
    </div>
  )
}
