import React, { useState } from "react";

export const ExpenseItem = ({ date, name, category, payment, amount }) => {
  const categoryColors = {
    food: "green",
    entertainment: "blue",
    utilities: "red",
    other: "orange",
  };

  const defaultColor = "purple";
  const categoryColor = categoryColors[category.toLowerCase()] || defaultColor;

  const expenseStyle = {
    display: "flex",
    color: categoryColor,
  };

  return (
    <div>
      <div className="expense-item">
        <div className="expense-item__field">{date}</div>
        <div className="expense-item__field">{name}</div>
        <div className="expense-item__field">{category}</div>
        <div className="expense-item__field">{payment}</div>
        <div className="expense-item__field">{amount}</div>
      </div>
    </div>
  );
};

export default ExpenseItem;
