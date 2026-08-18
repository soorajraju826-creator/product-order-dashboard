import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getProduct } from "../services/apiService";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct(id)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Product not found");
        navigate("/products");
      });
  }, [id, navigate]);

  if (loading) {
    return <h2>Loading product...</h2>;
  }

  return (
    <div>
      <button onClick={() => navigate("/products")}>
        Back to Products
      </button>

      <h1>Product Details</h1>

      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          width="300"
        />
      )}

      <h2>{product.name}</h2>

      <p>
        <strong>Category:</strong> {product.category}
      </p>

      <p>
        <strong>Price:</strong> ₹{product.price}
      </p>

      <p>
        <strong>Stock:</strong>{" "}
        {product.stock === 0
          ? "Out of Stock"
          : product.stock}
      </p>

      <p>
        <strong>Rating:</strong> ⭐ {product.rating}
      </p>

      <p>
        <strong>Product ID:</strong> {product.id}
      </p>
    </div>
  );
}

export default ProductDetails;