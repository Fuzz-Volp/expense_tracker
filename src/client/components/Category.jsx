import React from "react";

export const Category = ({
  handleAddCategory,
  handleCategoryInputChange,
  newCategory,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddCategory(); // Call the handleAddCategory function here
  };

  const handleChange = (event) => {
    handleCategoryInputChange(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="form-row">
      <input
        type="text"
        value={newCategory}
        onChange={handleChange}
        placeholder="New Category"
      />
      <button type="submit">Add Category</button>
    </form>
  );
};
