import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import TransactionDetail from "./pages/TransactionDetail";
import Summary from "./pages/Summary";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddTransaction />} />
          <Route
            path="/transaction/:id"
            element={<TransactionDetail />}
          />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;