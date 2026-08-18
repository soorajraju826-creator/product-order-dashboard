import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>My Store</h2>

      <div>
        <Link to="/">Dashboard</Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/orders">
          Orders
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;