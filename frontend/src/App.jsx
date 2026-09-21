import { useEffect, useState } from "react";

import Login from "./pages/Login";
import ProductForm from "./pages/ProductForm";
import { apiFetch } from "./services/api";


function App() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


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

      console.log("Products:", data);

      setProducts(data);

    } catch (error) {
      console.error("Product API Error:", error);

      setError("Unable to load products.");

    } finally {
      setLoading(false);
    }
  };


  // Load products when App starts
  useEffect(() => {
    getProducts();
  }, []);


  return (
    <div>
      <Login />

      <hr />

      <ProductForm onProductCreated={getProducts} />

      <hr />

      <h1>Products</h1>


      {/* Loading State */}
      {loading && <p>Loading products...</p>}


      {/* Error State */}
      {!loading && error && (
        <p>{error}</p>
      )}


      {/* Product List */}
      {!loading && !error && products.length === 0 && (
        <p>No products found.</p>
      )}


      {!loading && !error && products.length > 0 && (
        products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>

            <p>Price: {product.price}</p>

            <p>Stock: {product.stock}</p>

            <p>Description: {product.description}</p>

            <hr />
          </div>
        ))
      )}

    </div>
  );
}


export default App;