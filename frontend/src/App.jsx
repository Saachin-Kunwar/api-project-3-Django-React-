import { useEffect, useState } from "react";

import Login from "./pages/Login";
import ProductForm from "./pages/ProductForm";
import { apiFetch } from "./services/api";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Currently editing product
  const [editingProduct, setEditingProduct] = useState(null);

  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access")
  );

  // Get all products
  const getProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiFetch("/products/");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error("Product API Error:", error);

      setError("Unable to load products.");
    } finally {
      setLoading(false);
    }
  };

  // Load products only when user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      getProducts();
    } else {
      setProducts([]);
      setLoading(false);
      setError("");
    }
  }, [isLoggedIn]);

  // Edit product
  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  // Product updated
  const handleProductUpdated = async () => {
    await getProducts();

    setEditingProduct(null);
  };

  // Delete product
  const handleDelete = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await apiFetch(
        `/products/${productId}/`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        let data = {};

        try {
          data = await response.json();
        } catch {
          data = {};
        }

        console.error("Delete failed:", data);

        alert("Unable to delete product.");

        return;
      }

      console.log("Product deleted successfully.");

      // Refresh product list
      await getProducts();
    } catch (error) {
      console.error("Delete error:", error);

      alert("Something went wrong.");
    }
  };

  return (
    <div>
      {/* Login / Logout */}
      <Login
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <hr />

      {/* Protected Product Area */}
      {isLoggedIn ? (
        <>
          {/* Create / Edit Product */}
          <ProductForm
            onProductCreated={getProducts}
            editingProduct={editingProduct}
            onProductUpdated={handleProductUpdated}
          />

          <hr />

          {/* Product List */}
          <h1>Products</h1>

          {/* Loading */}
          {loading && (
            <p>Loading products...</p>
          )}

          {/* Error */}
          {!loading && error && (
            <p>{error}</p>
          )}

          {/* No Products */}
          {!loading &&
            !error &&
            products.length === 0 && (
              <p>No products found.</p>
            )}

          {/* Products */}
          {!loading &&
            !error &&
            products.length > 0 &&
            products.map((product) => (
              <div key={product.id}>
                <h2>{product.name}</h2>

                <p>
                  Price: {product.price}
                </p>

                <p>
                  Stock: {product.stock}
                </p>

                <p>
                  Description: {product.description}
                </p>

                {/* Edit */}
                <button
                  onClick={() =>
                    handleEdit(product)
                  }
                >
                  Edit
                </button>

                {/* Delete */}
                <button
                  onClick={() =>
                    handleDelete(product.id)
                  }
                >
                  Delete
                </button>

                <hr />
              </div>
            ))}
        </>
      ) : (
        /* User is not logged in */
        <p>
          Please login to access products.
        </p>
      )}
    </div>
  );
}

export default App;