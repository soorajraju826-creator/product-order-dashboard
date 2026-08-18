import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import ProductForm from "../components/ProductForm";
import {
  getProduct,
  updateProduct
} from "../services/apiService";

function EditProduct() {
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

  const handleUpdate = (updatedProduct) => {
    updateProduct(id, updatedProduct)
      .then(() => {
        toast.success("Product updated successfully");
        navigate("/products");
      })
      .catch(() => {
        toast.error("Failed to update product");
      });
  };

  if (loading) {
    return <h2>Loading product...</h2>;
  }

  return (
    <div>
      <ProductForm
        initialData={product}
        onSubmit={handleUpdate}
      />
    </div>
  );
}

export default EditProduct;