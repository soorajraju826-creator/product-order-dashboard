import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/products" element={<Products />} />

        <Route
          path="/products/add"
          element={<AddProduct />}
        />

        <Route
          path="/products/edit/:id"
          element={<EditProduct />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route path="/orders" element={<Orders />} />

        <Route
          path="/orders/:id"
          element={<OrderDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;