import { useState } from "react";

function ProductForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      category: "",
      price: "",
      stock: "",
      rating: "",
      image: ""
    }
  );

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.category.trim() ||
      formData.price === "" ||
      formData.stock === "" ||
      formData.rating === ""
    ) {
      setError("Please fill all required fields");
      return;
    }

    if (Number(formData.price) <= 0) {
      setError("Price must be greater than 0");
      return;
    }

    if (Number(formData.stock) < 0) {
      setError("Stock cannot be negative");
      return;
    }

    if (
      Number(formData.rating) < 0 ||
      Number(formData.rating) > 5
    ) {
      setError("Rating must be between 0 and 5");
      return;
    }

    setError("");

    const productData = {
      ...formData,
      name: formData.name.trim(),
      category: formData.category.trim(),
      price: Number(formData.price),
      stock: Number(formData.stock),
      rating: Number(formData.rating)
    };

    onSubmit(productData);
  };

  const handleReset = () => {
    setFormData(
      initialData || {
        name: "",
        category: "",
        price: "",
        stock: "",
        rating: "",
        image: ""
      }
    );

    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        {initialData ? "Edit Product" : "Add Product"}
      </h2>

      {error && <p>{error}</p>}

      <div>
        <label>Product Name</label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter product name"
        />
      </div>

      <div>
        <label>Category</label>

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter category"
        />
      </div>

      <div>
        <label>Price</label>

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          placeholder="Enter price"
        />
      </div>

      <div>
        <label>Stock</label>

        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          min="0"
          placeholder="Enter stock"
        />
      </div>

      <div>
        <label>Rating</label>

        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          min="0"
          max="5"
          step="0.1"
          placeholder="0 - 5"
        />
      </div>

      <div>
        <label>Image URL</label>

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Enter image URL"
        />
      </div>

      <button type="submit">
        {initialData ? "Update Product" : "Add Product"}
      </button>

      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
}

export default ProductForm;