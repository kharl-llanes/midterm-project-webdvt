import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTransactions from "../hooks/useTransactions";

function AddTransaction() {
  const navigate = useNavigate();

  const { addTransaction } =
    useTransactions();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const categories = [
    "Food",
    "Transportation",
    "Housing",
    "School",
    "Entertainment",
    "Shopping",
    "Salary",
    "Allowance",
    "Other",
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title =
        "Transaction title is required.";
    }

    if (!formData.amount) {
      newErrors.amount =
        "Amount is required.";
    } else if (
      Number(formData.amount) <= 0
    ) {
      newErrors.amount =
        "Amount must be greater than zero.";
    }

    if (!formData.category) {
      newErrors.category =
        "Please select a category.";
    }

    if (!formData.date) {
      newErrors.date =
        "Date is required.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    addTransaction({
      ...formData,
      amount: Number(formData.amount),
    });

    navigate("/");
  };

  return (
    <div className="page-container">
      <section className="page-header">
        <p className="eyebrow">
          NEW ENTRY
        </p>

        <h1>Add Transaction</h1>

        <p className="subtitle">
          Record a new source of income
          or expense.
        </p>
      </section>

      <form
        className="glass-card transaction-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group full-width">
          <label htmlFor="title">
            Transaction Name
          </label>

          <input
            id="title"
            name="title"
            type="text"
            placeholder="Example: Grocery shopping"
            value={formData.title}
            onChange={handleChange}
          />

          {errors.title && (
            <span className="form-error">
              {errors.title}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="amount">
            Amount
          </label>

          <div className="amount-input">
            <span>₱</span>

            <input
              id="amount"
              name="amount"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>

          {errors.amount && (
            <span className="form-error">
              {errors.amount}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="type">
            Type
          </label>

          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="expense">
              Expense
            </option>

            <option value="income">
              Income
            </option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">
            Category
          </label>

          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">
              Select category
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>

          {errors.category && (
            <span className="form-error">
              {errors.category}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="date">
            Date
          </label>

          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />

          {errors.date && (
            <span className="form-error">
              {errors.date}
            </span>
          )}
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">
            Description
            <span className="optional">
              {" "}Optional
            </span>
          </label>

          <textarea
            id="description"
            name="description"
            rows="4"
            placeholder="Add some notes about this transaction..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions full-width">
          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
          >
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTransaction;