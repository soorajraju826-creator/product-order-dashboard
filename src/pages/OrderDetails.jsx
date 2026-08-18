import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getOrder,
  getProducts
} from "../services/apiService";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getOrder(id),
      getProducts()
    ])
      .then(([orderResponse, productResponse]) => {
        setOrder(orderResponse.data);
        setProducts(productResponse.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load order details");
        navigate("/orders");
      });
  }, [id, navigate]);

  if (loading) {
    return <h2>Loading order...</h2>;
  }

  return (
    <div>
      <button onClick={() => navigate("/orders")}>
        Back to Orders
      </button>

      <h1>Order Details</h1>

      <p>
        <strong>Order ID:</strong> {order.id}
      </p>

      <p>
        <strong>Customer:</strong> {order.customer}
      </p>

      <p>
        <strong>Date:</strong> {order.date}
      </p>

      <p>
        <strong>Status:</strong> {order.status}
      </p>

      <h2>Products</h2>

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {order.items.map((item) => {
            const product = products.find(
              (product) =>
                product.id === item.productId
            );

            if (!product) {
              return null;
            }

            return (
              <tr key={item.productId}>
                <td>{product.name}</td>

                <td>₹{product.price}</td>

                <td>{item.quantity}</td>

                <td>
                  ₹{product.price * item.quantity}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>Total: ₹{order.total}</h2>
    </div>
  );
}

export default OrderDetails;