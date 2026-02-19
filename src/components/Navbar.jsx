import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Головна</Link>
      <Link to="/variables">Змінні</Link>
    </nav>
  );
};

export default Navbar;
