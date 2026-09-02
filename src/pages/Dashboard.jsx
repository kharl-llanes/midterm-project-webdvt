import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useTransactions from "../hooks/useTransactions";

function Dashboard() {
  const { transactions } = useTransactions();

  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce(
      (total, transaction) => total + Number(transaction.amount),
      0
    );

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce(
      (total, transaction) => total + Number(transaction.amount),
      0
    );

  const balance = totalIncome - totalExpenses;

  const categories = [
    ...new Set(
      transactions.map((transaction) => transaction.category)
    ),
  ];

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesType =
        typeFilter === "all" ||
        transaction.type === typeFilter;

      const matchesCategory =
        categoryFilter === "all" ||
        transaction.category === categoryFilter;

      return matchesType && matchesCategory;
    });
  }, [transactions, typeFilter, categoryFilter]);

  const formatAmount = (amount) => {
    return Number(amount).toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="page-container">

      {/* PAGE HEADER */}

      <section className="page-header">
        <div>
          <p className="eyebrow">PERSONAL FINANCE</p>

          <h1>Dashboard</h1>

          <p className="subtitle">
            Keep track of your income and expenses in one place.
          </p>
        </div>
      </section>


      {/* BALANCE CARDS */}

      <section className="balance-grid">

        <div className="glass-card balance-card">
          <p>Current Balance</p>

          <h2>
            ₱{formatAmount(balance)}
          </h2>
        </div>

        <div className="glass-card income-card">
          <p>Total Income</p>

          <h2>
            ₱{formatAmount(totalIncome)}
          </h2>
        </div>

        <div className="glass-card expense-card">
          <p>Total Expenses</p>

          <h2>
            ₱{formatAmount(totalExpenses)}
          </h2>
        </div>

      </section>


      {/* TRANSACTIONS */}

      <section className="transactions-section">

        <div className="section-heading">

          <div>
            <p className="eyebrow">ACTIVITY</p>

            <h2>Transactions</h2>
          </div>

          <Link
            to="/add"
            className="primary-button"
          >
            + Add Transaction
          </Link>

        </div>


        {/* FILTERS */}

        {transactions.length > 0 && (
          <div className="filters glass-card">

            <div className="filter-group">

              <label htmlFor="type-filter">
                Type
              </label>

              <select
                id="type-filter"
                value={typeFilter}
                onChange={(event) =>
                  setTypeFilter(event.target.value)
                }
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

            </div>


            <div className="filter-group">

              <label htmlFor="category-filter">
                Category
              </label>

              <select
                id="category-filter"
                value={categoryFilter}
                onChange={(event) =>
                  setCategoryFilter(event.target.value)
                }
              >
                <option value="all">
                  All Categories
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

          </div>
        )}


        {/* EMPTY STATE */}

        {transactions.length === 0 ? (

          <div className="glass-card empty-state">

            <div className="empty-icon">
              ₱
            </div>

            <h3>No transactions yet</h3>

            <p>
              Add your first income or expense to start
              tracking your budget.
            </p>

          </div>

        ) : filteredTransactions.length === 0 ? (

          /* NO FILTER RESULTS */

          <div className="glass-card empty-state">

            <div className="empty-icon">
              ?
            </div>

            <h3>No matching transactions</h3>

            <p>
              Try changing your filters to see other
              transactions.
            </p>

          </div>

        ) : (

          /* TRANSACTION LIST */

          <div className="transaction-list">

            {filteredTransactions.map((transaction) => (

              <Link
                to={`/transaction/${transaction.id}`}
                className="transaction-card glass-card"
                key={transaction.id}
              >

                <div className="transaction-icon">
                  {transaction.type === "income"
                    ? "+"
                    : "−"}
                </div>


                <div className="transaction-info">

                  <h3>
                    {transaction.title}
                  </h3>

                  <p>
                    {transaction.category}
                    {" • "}
                    {transaction.date}
                  </p>

                </div>


                <div
                  className={`transaction-amount ${transaction.type}`}
                >
                  {transaction.type === "income"
                    ? "+"
                    : "-"}
                  ₱{formatAmount(transaction.amount)}
                </div>

              </Link>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default Dashboard;