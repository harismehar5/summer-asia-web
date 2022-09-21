import React from "react";
import "./charts.scss";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Charts() {
  const data = [
    {
      name: "January",
      total: 2400,
    },
    {
      name: "February",
      total: 2210,
    },
    {
      name: "March",
      total: 2290,
    },
    {
      name: "April",
      total: 2000,
    },
    {
      name: "May",
      total: 2181,
    },
    {
      name: "June",
      total: 2500,
    },
  ];
  return (
    <div className="chart">
      <div className="title">Last 6 months revenue</div>
      <ResponsiveContainer width={"100%"} aspect={3 / 1}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray"/>
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
