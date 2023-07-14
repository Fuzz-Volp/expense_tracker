import React, { useState } from "react";

import {
  ExpenseItem,
  ExpenseTotal,
  PaymentTotal,
  TotalExpenses,
  History,
  Category,
  Payment,
} from "../components";

export const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([
    "Food",
    "Entertainment",
    "Utilities",
    "Other",
  ]);
  const [paymentOptions, setPaymentOptions] = useState([
    "Personal CC",
    "Cash",
    "Other",
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [newPayment, setNewPayment] = useState("");
  const [history, setHistory] = useState([]);

  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const date = event.target.date.value;
    const name = event.target.name.value;
    const category = event.target.category.value;
    const payment = event.target.payment.value;
    const amount = event.target.amount.value;

    // Check if any required field is missing
    if (!date || !name || !amount) {
      alert("Please fill in all the required fields");
      return;
    }

    addExpense({ date, name, category, payment, amount });
    event.target.reset();
  };

  const handleCategoryInputChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleAddCategory = (event) => {
    event.preventDefault();
    if (newCategory.trim() !== "") {
      setCategoryOptions((prevOptions) => [...prevOptions, newCategory]);
      setNewCategory("");

      // Update history with the new category
      const date = new Date().toLocaleString();
      const categoryAction = `Added category: ${newCategory}`;
      setHistory((prevHistory) => [
        ...prevHistory,
        `${date} - ${categoryAction}`,
      ]);
    }
  };

  const handlePaymentInputChange = (event) => {
    setNewPayment(event.target.value);
  };

  const handleAddPayment = (event) => {
    event.preventDefault();
    if (newPayment.trim() !== "") {
      setPaymentOptions((prevOptions) => [...prevOptions, newPayment]);
      setNewPayment("");

      // Update history with the new payment
      const date = new Date().toLocaleString();
      const paymentAction = `Added payment: ${newPayment}`;
      setHistory((prevHistory) => [
        ...prevHistory,
        `${date} - ${paymentAction}`,
      ]);
    }
  };

  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const sortExpenses = (expenses) => {
    const sortedExpenses = [...expenses];

    sortedExpenses.sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });

    return sortedExpenses;
  };
  return (
    <div>
      <Category
        handleAddCategory={handleAddCategory}
        handleCategoryInputChange={handleCategoryInputChange}
        newCategory={newCategory}
      />
      <br />
      <Payment
        handleAddPayment={handleAddPayment}
        handlePaymentInputChange={handlePaymentInputChange}
        newPayment={newPayment}
      />
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
            date (Click to sort {sortOrder === "asc" ? "↑" : "↓"})
          </div>
          <div className="expense-item__field">name</div>
          <div className="expense-item__field">category</div>
          <div className="expense-item__field">payment</div>
          <div className="expense-item__field">amount</div>
        </div>
      </div>
      {sortExpenses(expenses).map((expense, index) => (
        <div key={index}>
          <ExpenseItem
            date={expense.date}
            name={expense.name}
            category={expense.category}
            payment={expense.payment}
            amount={expense.amount}
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
  );
};
