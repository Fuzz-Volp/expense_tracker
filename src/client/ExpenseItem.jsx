import React, { useState } from 'react'

function ExpenseItem({
  date,
  name,
  category,
  payment,
  amount,
  categoryOptions,
  paymentOptions,
  onEdit,
  onDelete
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedExpense, setEditedExpense] = useState({
    date,
    name,
    category,
    payment,
    amount
  })
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setEditedExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value
    }))
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = () => {
    // Perform the save logic or update the expense in the expenses array
    // You can use the editedExpense state to access the updated values

    // Example logic to update the expense in the expenses array
    onEdit(editedExpense)
    setIsEditing(false)
  }

  const handleCancelClick = () => {
    setIsEditing(false)
  }

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
    <div>
      {isEditing ? (
        <div>
          <form onSubmit={handleSaveClick}>
            <input
              type="date"
              name="date"
              value={editedExpense.date}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="name"
              value={editedExpense.name}
              onChange={handleInputChange}
            />
            <select
              name="category"
              value={editedExpense.category}
              onChange={handleInputChange}
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              name="payment"
              value={editedExpense.payment}
              onChange={handleInputChange}
            >
              {paymentOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>{' '}
            <input
              type="number"
              step=".01"
              name="amount"
              value={editedExpense.amount}
              onChange={handleInputChange}
            />
            <button type="submit">Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </form>
        </div>
      ) : (
        <div>
          <div className="expense-item">
            <div className="expense-item__field">{date}</div>
            <div className="expense-item__field">{name}</div>
            <div className="expense-item__field">{category}</div>
            <div className="expense-item__field">{payment}</div>
            <div className="expense-item__field">{amount}</div>
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={onDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExpenseItem
