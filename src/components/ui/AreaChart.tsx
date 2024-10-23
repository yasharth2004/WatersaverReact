import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface DataPoint {
  name: string
  value: number
}

interface AreaChartProps {
  data: DataPoint[]
  xDataKey: string
  yDataKey: string
  fill?: string
  stroke?: string
  height?: number
}

export default function CustomAreaChart({
  data,
  xDataKey,
  yDataKey,
  fill = "#8884d8",
  stroke = "#8884d8",
  height = 300
}: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xDataKey} />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey={yDataKey} stroke={stroke} fill={fill} />
      </AreaChart>
    </ResponsiveContainer>
  )
}