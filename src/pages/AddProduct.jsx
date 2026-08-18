import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ProductForm from "../components/ProductForm";
import { addProduct } from "../services/apiService";

function AddProduct() {
  const navigate = useNavigate();

  const handleAddProduct = (product) => {
    addProduct(product)
      .then(() => {
        toast.success("Product added successfully");
        navigate("/products");
      })
      .catch(() => {
        toast.error("Failed to add product");
      });
  };

  return (
    <div>
      <ProductForm onSubmit={handleAddProduct} />
    </div>
  );
}

export default AddProduct;