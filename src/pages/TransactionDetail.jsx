import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import useTransactions from "../hooks/useTransactions";

function TransactionDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    transactions,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();

  const transaction = transactions.find(
    (item) => item.id === id
  );

  const [isEditing, setIsEditing] =
    useState(false);

  const [formData, setFormData] =
    useState(transaction || {});

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

  if (!transaction) {
    return (
      <div className="page-container">
        <div className="glass-card empty-state">
          <div className="empty-icon">
            ?
          </div>

          <h3>
            Transaction not found
          </h3>

          <p>
            This transaction may have been
            deleted or does not exist.
          </p>

          <Link
            to="/"
            className="primary-button"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (
      !formData.title?.trim() ||
      !formData.category ||
      !formData.date ||
      Number(formData.amount) <= 0
    ) {
      alert(
        "Please complete all required fields correctly."
      );

      return;
    }

    updateTransaction(id, {
      ...formData,
      amount: Number(formData.amount),
    });

    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) {
      return;
    }

    deleteTransaction(id);

    navigate("/");
  };

  const formattedAmount = Number(
    transaction.amount
  ).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="page-container">
      <div className="detail-back">
        <Link to="/">
          ← Back to Dashboard
        </Link>
      </div>

      <section className="page-header">
        <p className="eyebrow">
          TRANSACTION DETAILS
        </p>

        <h1>{transaction.title}</h1>

        <p className="subtitle">
          View or update the details
          of this transaction.
        </p>
      </section>

      {isEditing ? (
        <form
          className="glass-card transaction-form"
          onSubmit={handleSave}
        >
          <div className="form-group full-width">
            <label htmlFor="title">
              Transaction Name
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={formData.title || ""}
              onChange={handleChange}
              required
            />
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
                min="0.01"
                step="0.01"
                value={formData.amount || ""}
                onChange={handleChange}
                required
              />
            </div>
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
              required
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
          </div>

          <div className="form-group">
            <label htmlFor="date">
              Date
            </label>

            <input
              id="date"
              name="date"
              type="date"
              value={formData.date || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="4"
              value={
                formData.description || ""
              }
              onChange={handleChange}
            />
          </div>

          <div className="form-actions full-width">
            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setFormData(transaction);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="glass-card detail-card">
          <div className="detail-top">
            <div
              className={`detail-icon ${transaction.type}`}
            >
              {transaction.type === "income"
                ? "+"
                : "−"}
            </div>

            <div>
              <p className="detail-label">
                {transaction.type}
              </p>

              <h2>
                {transaction.type === "income"
                  ? "+"
                  : "-"}
                ₱{formattedAmount}
              </h2>
            </div>
          </div>

          <div className="detail-grid">
            <div>
              <p className="detail-label">
                Category
              </p>

              <strong>
                {transaction.category}
              </strong>
            </div>

            <div>
              <p className="detail-label">
                Date
              </p>

              <strong>
                {transaction.date}
              </strong>
            </div>

            <div className="detail-description">
              <p className="detail-label">
                Description
              </p>

              <p>
                {transaction.description ||
                  "No description provided."}
              </p>
            </div>
          </div>

          <div className="detail-actions">
            <button
              className="secondary-button"
              onClick={() =>
                setIsEditing(true)
              }
            >
              Edit Transaction
            </button>

            <button
              className="delete-button"
              onClick={handleDelete}
            >
              Delete Transaction
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionDetail;