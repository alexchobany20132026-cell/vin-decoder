import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Variables from "./pages/Variables";
import VariableDetails from "./pages/VariableDetails";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/variables" element={<Variables />} />
          <Route path="/variables/:id" element={<VariableDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
