import './App.css'

import React, { useState } from 'react'
import ExpenseItem from './ExpenseItem'
import ExpenseTotal from './ExpenseTotal'
import PaymentTotal from './PaymentTotal'

function App() {
  const [expenses, setExpenses] = useState([])
  const [categoryOptions, setCategoryOptions] = useState([
    'Food',
    'Entertainment',
    'Utilities',
    'Other'
  ])
  const [paymentOptions, setPaymentOptions] = useState([
    'Personal CC',
    'Cash',
    'Other'
  ])
  const [newCategory, setNewCategory] = useState('')
  const [newPayment, setNewPayment] = useState('')

  const addExpense = (expense) => {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, expense]
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const date = event.target.date.value
    const name = event.target.name.value
    const category = event.target.category.value
    const payment = event.target.payment.value
    const amount = event.target.amount.value
    addExpense({ date, name, category, payment, amount })
    event.target.reset()
  }

  const handleCategoryInputChange = (event) => {
    setNewCategory(event.target.value)
  }

  const handleAddCategory = (event) => {
    event.preventDefault()
    if (newCategory.trim() !== '') {
      setCategoryOptions((prevOptions) => [...prevOptions, newCategory])
      setNewCategory('')
    }
  }

  const handlePaymentInputChange = (event) => {
    setNewPayment(event.target.value)
  }

  const handleAddPayment = (event) => {
    event.preventDefault()
    if (newPayment.trim() !== '') {
      setPaymentOptions((prevOptions) => [...prevOptions, newPayment])
      setNewPayment('')
    }
  }

  return (
    <div>
      <form onSubmit={handleAddCategory}>
        <input
          type="text"
          value={newCategory}
          onChange={handleCategoryInputChange}
          placeholder="New Category"
        />
        <button type="submit">Add Category</button>
      </form>
      <br />
      <form onSubmit={handleAddPayment}>
        <input
          type="text"
          value={newPayment}
          onChange={handlePaymentInputChange}
          placeholder="New Payment"
        />
        <button type="submit">Add Payment</button>
      </form>
      <br />
      <form onSubmit={handleSubmit}>
        <input type="date" name="date" placeholder="Date" />
        <input type="text" name="name" placeholder="Expense Name" />
        <select name="category">
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {/* <input type="text" name="payment" placeholder="Payment" /> */}
        <select name="payment">
          {paymentOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input type="number" name="amount" placeholder="Amount" />
        <button type="submit">Add Expense</button>
      </form>

      {expenses.map((expense, index) => (
        <ExpenseItem
          key={index}
          date={expense.date}
          name={expense.name}
          category={expense.category}
          payment={expense.payment}
          amount={expense.amount}
        />
      ))}
      <br />
      <ExpenseTotal expenses={expenses} />
      <br />
      <PaymentTotal expenses={expenses} />
    </div>
  )
}

export default App
