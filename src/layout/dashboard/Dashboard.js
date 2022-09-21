import React from 'react'
import './dashboard.scss'
import SideBar from '../../components/sidebar/SideBar'
import Navbar from '../../components/navbar/Navbar'
import Widgets from '../../components/widgets/Widgets'
import Featured from '../../components/featured/Featured'
import Charts from '../../components/charts/Charts'

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <SideBar/>
      <div className='dashboard-container'>
        <Navbar/>
        <div className='widgets'>
          <Widgets type={"customer"}/>
          <Widgets type={"supplier"}/>
          <Widgets type={"expense"}/>
          <Widgets type={"payment"}/>
        </div>
        <div className='charts'>
          <Featured/>
          <Charts/>
        </div>
      </div>
    </div>
  )
}
