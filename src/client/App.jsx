import './App.css'

import React, { useState } from 'react'
import ExpenseItem from './ExpenseItem'
import ExpenseTotal from './ExpenseTotal'
import PaymentTotal from './PaymentTotal'
import TotalExpenses from './TotalExpenses'
import History from './History'

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
  const [history, setHistory] = useState([])

  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense])
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const date = event.target.date.value
    const name = event.target.name.value
    const category = event.target.category.value
    const payment = event.target.payment.value
    const amount = event.target.amount.value

    // Check if any required field is missing
    if (!date || !name || !amount) {
      alert('Please fill in all the required fields')
      return
    }

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

      // Update history with the new category
      const date = new Date().toLocaleString()
      const categoryAction = `Added category: ${newCategory}`
      setHistory((prevHistory) => [
        ...prevHistory,
        `${date} - ${categoryAction}`
      ])
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

      // Update history with the new payment
      const date = new Date().toLocaleString()
      const paymentAction = `Added payment: ${newPayment}`
      setHistory((prevHistory) => [
        ...prevHistory,
        `${date} - ${paymentAction}`
      ])
    }
  }

  const [sortOrder, setSortOrder] = useState('asc')

  const handleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'))
  }

  const sortExpenses = (expenses) => {
    const sortedExpenses = [...expenses]

    sortedExpenses.sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.date) - new Date(b.date)
      } else {
        return new Date(b.date) - new Date(a.date)
      }
    })
    return sortedExpenses
  }

  //NEW FEATURES
  const handleEditCategory = (index) => {
    const currentCategory = categoryOptions[index]

    const updatedCategory = prompt(
      'Enter the updated category name:',
      currentCategory
    )

    if (updatedCategory !== null && updatedCategory.trim() !== '') {
      setCategoryOptions((prevOptions) => {
        const updatedOptions = [...prevOptions]
        updatedOptions[index] = updatedCategory
        return updatedOptions
      })

      // Update history with the edit action
      const date = new Date().toLocaleString()
      const categoryAction = `Edited category: ${currentCategory} to ${updatedCategory}`
      setHistory((prevHistory) => [
        ...prevHistory,
        `${date} - ${categoryAction}`
      ])
    }
  }

  const handleDeleteCategory = (index) => {
    // Implement the logic to delete the category at the specified index
    // You can update the categoryOptions state array using the setCategoryOptions function
    // For example:
    const deletedCategory = categoryOptions[index]
    if (
      window.confirm(
        `Are you sure you want to delete the category "${deletedCategory}"?`
      )
    ) {
      setCategoryOptions((prevOptions) => {
        const updatedOptions = [...prevOptions]
        updatedOptions.splice(index, 1)
        return updatedOptions
      })

      // Update history with the delete action
      const date = new Date().toLocaleString()
      const categoryAction = `Deleted category: ${deletedCategory}`
      setHistory((prevHistory) => [
        ...prevHistory,
        `${date} - ${categoryAction}`
      ])
    }
  }

  const handleEditPayment = (index) => {
    const currentPayment = paymentOptions[index]

    const updatedPayment = prompt(
      'Enter the updated payment name:',
      currentPayment
    )

    if (updatedPayment !== null && updatedPayment.trim() !== '') {
      setPaymentOptions((prevOptions) => {
        const updatedOptions = [...prevOptions]
        updatedOptions[index] = updatedPayment
        return updatedOptions
      })

      // Update history with the edit action
      const date = new Date().toLocaleString()
      const paymentAction = `Edited payment: ${currentPayment} to ${updatedPayment}`
      setHistory((prevHistory) => [
        ...prevHistory,
        `${date} - ${paymentAction}`
      ])
    }
  }

  const handleDeletePayment = (index) => {
    const deletedPayment = paymentOptions[index]
    if (
      window.confirm(
        `Are you sure you want to delete the payment "${deletedPayment}"?`
      )
    ) {
      setPaymentOptions((prevOptions) => {
        const updatedOptions = [...prevOptions]
        updatedOptions.splice(index, 1)
        return updatedOptions
      })

      // Update history with the delete action
      const date = new Date().toLocaleString()
      const paymentAction = `Deleted payment: ${deletedPayment}`
      setHistory((prevHistory) => [
        ...prevHistory,
        `${date} - ${paymentAction}`
      ])
    }
  }

  // HANDLE EDIT AND DELETE EXPENSE 19TH JUNE

  const handleEditExpense = (index, editedExpense) => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = [...prevExpenses]
      updatedExpenses[index] = editedExpense
      return updatedExpenses
    })
  }

  const handleDeleteExpense = (index) => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = [...prevExpenses]
      updatedExpenses.splice(index, 1)
      return updatedExpenses
    })
  }
  // END OF NEW FEATURES

  return (
    <div>
      <div className="columns-container">
        <div className="category-column">
          {/* Category List */}
          {categoryOptions.map((categoryOptions, index) => (
            <div key={index}>
              {categoryOptions}
              <button onClick={() => handleEditCategory(index)}>Edit</button>
              <button onClick={() => handleDeleteCategory(index)}>
                Delete
              </button>
            </div>
          ))}
          <form onSubmit={handleAddCategory} className="form-row">
            <input
              type="text"
              value={newCategory}
              onChange={handleCategoryInputChange}
              placeholder="New Category"
            />
            <button type="submit">Add Category</button>
          </form>
        </div>
        <div className="payment-column">
          {/* Payment List */}
          {paymentOptions.map((paymentOptions, index) => (
            <div key={index}>
              {paymentOptions}
              <button onClick={() => handleEditPayment(index)}>Edit</button>
              <button onClick={() => handleDeletePayment(index)}>Delete</button>
            </div>
          ))}
          <form onSubmit={handleAddPayment} className="form-row">
            <input
              type="text"
              value={newPayment}
              onChange={handlePaymentInputChange}
              placeholder="New Payment"
            />
            <button type="submit">Add Payment</button>
          </form>
        </div>
      </div>
      <br />
      <form onSubmit={handleSubmit} className="form-row">
        <input
          type="date"
          name="date"
          className="form-input"
          placeholder="Date"
        />
        <input
          type="text"
          name="name"
          className="form-input"
          placeholder="Expense Name"
        />
        <select name="category" className="form-input">
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select name="payment" className="form-input">
          {paymentOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input
          type="number"
          step=".01"
          name="amount"
          className="form-input"
          placeholder="Amount"
        />
        <button type="submit" className="form-button">
          Add Expense
        </button>
      </form>
      <div>
        <div className="expense-item">
          <div className="expense-item__field" onClick={handleSortOrder}>
            date (Click to sort {sortOrder === 'asc' ? '↑' : '↓'})
          </div>
          <div className="expense-item__field">name</div>
          <div className="expense-item__field">category</div>
          <div className="expense-item__field">payment</div>
          <div className="expense-item__field">amount</div>
          <div className="expense-item__buttons"></div>
        </div>
      </div>
      {sortExpenses(expenses).map((expense, index) => (
        <div key={index} className="expense-item-row">
          <ExpenseItem
            date={expense.date}
            name={expense.name}
            category={expense.category}
            payment={expense.payment}
            amount={expense.amount}
            categoryOptions={categoryOptions}
            paymentOptions={paymentOptions}
            onEdit={(editedExpense) => handleEditExpense(index, editedExpense)}
            onDelete={() => handleDeleteExpense(index)}
          />
        </div>
      ))}
      <br />
      <ExpenseTotal expenses={expenses} />
      <br />
      <PaymentTotal expenses={expenses} />
      <br />
      <TotalExpenses expenses={expenses} />
      <br />
      <History history={history} />
    </div>
  )
}

export default App
