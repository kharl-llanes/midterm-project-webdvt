import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Budgetly
      </Link>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/summary">Summary</Link>
        <Link to="/add" className="add-button">
          + Add Transaction
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;