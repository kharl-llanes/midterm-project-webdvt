import { useMemo } from "react";
import useTransactions from "../hooks/useTransactions";
import { useTheme } from "../context/ThemeContext";

function Summary() {
  const { transactions } =
    useTransactions();

  const { theme, toggleTheme } =
    useTheme();

  const summary = useMemo(() => {
    const totals = {};

    let totalExpenses = 0;

    transactions.forEach(
      (transaction) => {
        if (
          transaction.type !== "expense"
        ) {
          return;
        }

        const category =
          transaction.category;

        const amount = Number(
          transaction.amount
        );

        totalExpenses += amount;

        if (totals[category]) {
          totals[category] += amount;
        } else {
          totals[category] = amount;
        }
      }
    );

    const categories = Object.entries(
      totals
    )
      .map(([category, amount]) => ({
        category,
        amount,
      }))
      .sort(
        (a, b) => b.amount - a.amount
      );

    return {
      categories,
      totalExpenses,
    };
  }, [transactions]);

  const formatAmount = (amount) => {
    return Number(amount).toLocaleString(
      "en-PH",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  };

  return (
    <div className="page-container">
      <section className="page-header summary-header">
        <div>
          <p className="eyebrow">
            ANALYTICS
          </p>

          <h1>Summary</h1>

          <p className="subtitle">
            See where your money is
            being spent.
          </p>
        </div>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
        >
          {theme === "dark"
            ? "☀ Light Mode"
            : "☾ Dark Mode"}
        </button>
      </section>

      <section className="glass-card summary-total">
        <p>Total Expenses</p>

        <h2>
          ₱
          {formatAmount(
            summary.totalExpenses
          )}
        </h2>
      </section>

      <section className="summary-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              BREAKDOWN
            </p>

            <h2>
              Spending by Category
            </h2>
          </div>
        </div>

        {summary.categories.length === 0 ? (
          <div className="glass-card empty-state">
            <div className="empty-icon">
              ₱
            </div>

            <h3>
              No expense data yet
            </h3>

            <p>
              Add some expense
              transactions to see your
              spending summary.
            </p>
          </div>
        ) : (
          <div className="summary-list">
            {summary.categories.map(
              (item) => {
                const percentage =
                  summary.totalExpenses > 0
                    ? (item.amount /
                        summary.totalExpenses) *
                      100
                    : 0;

                return (
                  <div
                    className="glass-card summary-item"
                    key={item.category}
                  >
                    <div className="summary-item-top">
                      <div>
                        <p className="summary-category">
                          {item.category}
                        </p>

                        <span>
                          {percentage.toFixed(
                            1
                          )}
                          % of expenses
                        </span>
                      </div>

                      <strong>
                        ₱
                        {formatAmount(
                          item.amount
                        )}
                      </strong>
                    </div>

                    <div className="summary-progress">
                      <div
                        className="summary-progress-fill"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default Summary;