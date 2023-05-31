import React from 'react'

function ExpenseItem({ date, name, category, payment, amount }) {
  // const { name, amount, date } = props;

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>{date}</div>
      <div style={{ flex: 1 }}>{name}</div>
      <div style={{ flex: 1 }}>{category}</div>
      <div style={{ flex: 1 }}>{payment}</div>
      <div style={{ flex: 1 }}>{amount}</div>
    </div>
  )
}
export default ExpenseItem
