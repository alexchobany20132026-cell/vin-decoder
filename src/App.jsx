import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Variables from "./pages/Variables";
import VariableDetails from "./pages/VariableDetails";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
        <Link to="/" style={{ marginRight: "10px" }}>
          Головна
        </Link>
        <Link to="/variables">Змінні</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/variables" element={<Variables />} />
        <Route path="/variables/:variableId" element={<VariableDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
