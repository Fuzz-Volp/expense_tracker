import React from 'react'

function ExpenseItem({ date, name, category, payment, amount }) {
  const categoryColors = {
    food: 'green',
    entertainment: 'blue',
    utilities: 'red',
    other: 'orange'
  }

  const defaultColor = 'purple'
  const categoryColor = categoryColors[category.toLowerCase()] || defaultColor

  const expenseStyle = {
    display: 'flex',
    color: categoryColor
  }

  return (
    <div style={expenseStyle}>
      <div style={{ flex: 1 }}>{date}</div>
      <div style={{ flex: 1 }}>{name}</div>
      <div style={{ flex: 1 }}>{category}</div>
      <div style={{ flex: 1 }}>{payment}</div>
      <div style={{ flex: 1 }}>{amount}</div>
    </div>
  )
}

export default ExpenseItem
