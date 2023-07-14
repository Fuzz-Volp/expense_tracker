import React from "react";

export const PaymentTotal = ({ expenses }) => {
  const paymentAmounts = expenses.reduce((acc, expense) => {
    const payment = expense.payment.toLowerCase();
    acc[payment] = (acc[payment] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {Object.keys(paymentAmounts).map((payment) => {
        return (
          <div key={payment} style={{ flex: 1 }}>
            <div>{payment} Total</div>
            <div>{paymentAmounts[payment]}</div>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentTotal;
