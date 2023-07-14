import React from "react";

export const Payment = (
  handleAddPayment,
  newPayment,
  handlePaymentInputChange
) => {
  return (
    <form onSubmit={handleAddPayment} className="form-row">
      <input
        type="text"
        value={newPayment}
        onChange={handlePaymentInputChange}
        placeholder="New Payment"
      />
      <button type="submit">Add Payment</button>
    </form>
  );
};
