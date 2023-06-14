import React from 'react'

function TotalExpenses({ expenses }) {
  const totalExpense = expenses.reduce((acc, expense) => {
    return acc + parseFloat(expense.amount)
  }, 0)

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <h2>TOTAL EXPENSES</h2>
      </div>
      <div style={{ flex: 1 }}>
        <h2>{totalExpense}</h2>
      </div>
    </div>
  )
}

export default TotalExpenses
