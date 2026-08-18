import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../services/apiService";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("newest");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getOrders()
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load orders");
        setLoading(false);
      });
  }, []);

  const filteredOrders = useMemo(() => {
    let result = orders.filter((order) => {
      const matchesSearch = order.customer
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        status === "All" || order.status === status;

      return matchesSearch && matchesStatus;
    });

    if (sort === "newest") {
      result.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    }

    if (sort === "oldest") {
      result.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    }

    return result;
  }, [orders, search, status, sort]);

  const totalAmount = filteredOrders.reduce(
    (total, order) => total + order.total,
    0
  );

  if (loading) {
    return <h2>Loading orders...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Orders</h1>

      <input
        type="text"
        placeholder="Search customer..."
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />

      <select
        value={status}
        onChange={(event) => {
          setStatus(event.target.value);
        }}
      >
        <option value="All">All Status</option>
        <option value="Delivered">Delivered</option>
        <option value="Pending">Pending</option>
        <option value="Shipped">Shipped</option>
      </select>

      <select
        value={sort}
        onChange={(event) => {
          setSort(event.target.value);
        }}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>

      <h3>
        Total Order Amount: ₹{totalAmount}
      </h3>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Status</th>
            <th>Items</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const itemCount = order.items.reduce(
                (total, item) => total + item.quantity,
                0
              );

              return (
                <tr key={order.id}>
                  <td>{order.id}</td>

                  <td>{order.customer}</td>

                  <td>{order.date}</td>

                  <td>{order.status}</td>

                  <td>{itemCount}</td>

                  <td>₹{order.total}</td>

                  <td>
                    <button
                      onClick={() =>
                        navigate(`/orders/${order.id}`)
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;