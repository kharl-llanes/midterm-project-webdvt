function Dashboard() {
  return (
    <div className="page-container">
      <section className="page-header">
        <div>
          <p className="eyebrow">PERSONAL FINANCE</p>

          <h1>Dashboard</h1>

          <p className="subtitle">
            Keep track of your income and expenses in one place.
          </p>
        </div>
      </section>

      <section className="balance-grid">
        <div className="glass-card balance-card">
          <p>Current Balance</p>
          <h2>₱0.00</h2>
        </div>

        <div className="glass-card">
          <p>Total Income</p>
          <h2>₱0.00</h2>
        </div>

        <div className="glass-card">
          <p>Total Expenses</p>
          <h2>₱0.00</h2>
        </div>
      </section>

      <section className="transactions-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ACTIVITY</p>
            <h2>Recent Transactions</h2>
          </div>
        </div>

        <div className="glass-card empty-state">
          <div className="empty-icon">₱</div>

          <h3>No transactions yet</h3>

          <p>
            Add your first income or expense to start tracking your budget.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;