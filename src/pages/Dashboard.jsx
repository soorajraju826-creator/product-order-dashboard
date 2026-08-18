import { useEffect, useState } from "react";
import { getProducts, getOrders } from "../services/apiService";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getProducts(), getOrders()])
      .then(([productResponse, orderResponse]) => {
        setProducts(productResponse.data);
        setOrders(orderResponse.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load dashboard data");
        setLoading(false);
      });
  }, []);

  const totalProducts = products.length;

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (total, order) => total + order.total,
    0
  );

  const outOfStock = products.filter(
    (product) => product.stock === 0
  ).length;

  const salesCount = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (salesCount[item.productId]) {
        salesCount[item.productId] += item.quantity;
      } else {
        salesCount[item.productId] = item.quantity;
      }
    });
  });

  const topProducts = products
    .map((product) => ({
      ...product,
      sales: salesCount[product.id] || 0
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  if (loading) {
    return <h2>Loading dashboard...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Products</h3>
          <h2>{totalProducts}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Orders</h3>
          <h2>{totalOrders}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Revenue</h3>
          <h2>₹{totalRevenue}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Out of Stock</h3>
          <h2>{outOfStock}</h2>
        </div>
      </div>

      <h2>Top 5 Products</h2>

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Sales</th>
          </tr>
        </thead>

        <tbody>
          {topProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>₹{product.price}</td>
              <td>{product.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Order Summary</h2>

      <div>
        {orders.map((order) => (
          <div key={order.id}>
            <p>
              Order #{order.id} - {order.customer}
            </p>

            <div
              style={{
                width: `${Math.min(order.total / 20, 500)}px`,
                height: "25px",
                backgroundColor: "steelblue",
                borderRadius: "5px"
              }}
            ></div>

            <p>₹{order.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;