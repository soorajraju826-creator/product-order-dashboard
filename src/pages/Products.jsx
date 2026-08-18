import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getProducts,
  deleteProduct
} from "../services/apiService";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [stock, setStock] = useState("All");
  const [sort, setSort] = useState("default");

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const productsPerPage = 4;

  useEffect(() => {
    getProducts()
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  const handleDelete = useCallback((id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    deleteProduct(id)
      .then(() => {
        setProducts((currentProducts) =>
          currentProducts.filter(
            (product) => product.id !== id
          )
        );

        toast.success("Product deleted successfully");
      })
      .catch(() => {
        toast.error("Failed to delete product");
      });
  }, []);

  const categories = useMemo(() => {
    const categoryList = products.map(
      (product) => product.category
    );

    return ["All", ...new Set(categoryList)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      const matchesStock =
        stock === "All" ||
        (stock === "In Stock" && product.stock > 0) ||
        (stock === "Out of Stock" && product.stock === 0);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStock
      );
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [
    products,
    search,
    category,
    stock,
    sort
  ]);

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const firstIndex =
    (currentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    firstIndex,
    firstIndex + productsPerPage
  );

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Products</h1>

      <button
        onClick={() => navigate("/products/add")}
      >
        Add Product
      </button>

      <br />
      <br />

      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setCurrentPage(1);
        }}
      />

      <select
        value={category}
        onChange={(event) => {
          setCategory(event.target.value);
          setCurrentPage(1);
        }}
      >
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={stock}
        onChange={(event) => {
          setStock(event.target.value);
          setCurrentPage(1);
        }}
      >
        <option value="All">All Stock</option>
        <option value="In Stock">In Stock</option>
        <option value="Out of Stock">
          Out of Stock
        </option>
      </select>

      <select
        value={sort}
        onChange={(event) => {
          setSort(event.target.value);
          setCurrentPage(1);
        }}
      >
        <option value="default">
          Sort by Price
        </option>
        <option value="low">
          Low to High
        </option>
        <option value="high">
          High to Low
        </option>
      </select>

      <br />
      <br />

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>

                <td>{product.category}</td>

                <td>₹{product.price}</td>

                <td>
                  {product.stock === 0
                    ? "Out of Stock"
                    : product.stock}
                </td>

                <td>⭐ {product.rating}</td>

                <td>
                  <button
                    onClick={() =>
                      navigate(
                        `/products/${product.id}`
                      )
                    }
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      navigate(
                        `/products/edit/${product.id}`
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(product.id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <br />

      <button
        disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage(currentPage - 1)
        }
      >
        Previous
      </button>

      <span>
        {" "}
        Page {currentPage} of {totalPages || 1}{" "}
      </span>

      <button
        disabled={
          currentPage === totalPages ||
          totalPages === 0
        }
        onClick={() =>
          setCurrentPage(currentPage + 1)
        }
      >
        Next
      </button>
    </div>
  );
}

export default Products;