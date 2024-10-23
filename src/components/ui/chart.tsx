import React from 'react'

export const ChartContainer = ({ children, ...props }) => (
  <div {...props}>{children}</div>
)

export const ChartTooltip = ({ children, ...props }) => (
  <div {...props}>{children}</div>
)

export const ChartTooltipContent = ({ children, ...props }) => (
  <div {...props}>{children}</div>
)