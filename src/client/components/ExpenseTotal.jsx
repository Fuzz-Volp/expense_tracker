import React from "react";

export const ExpenseTotal = ({ expenses }) => {
  const categoryAmounts = expenses.reduce((acc, expense) => {
    const category = expense.category.toLowerCase();
    acc[category] = (acc[category] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  const categoryColors = {
    food: "green",
    entertainment: "blue",
    utilities: "red",
    other: "orange",
  };

  const defaultColor = "purple";

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {Object.keys(categoryAmounts).map((category) => {
        const categoryColor = categoryColors[category] || defaultColor;
        return (
          <div key={category} style={{ flex: 1 }}>
            <div style={{ color: categoryColor }}>{category} Total</div>
            <div style={{ color: categoryColor }}>
              {categoryAmounts[category]}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseTotal;
