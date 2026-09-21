import { useEffect, useState } from "react";

import Login from "./pages/Login";
import ProductForm from "./pages/ProductForm";
import { apiFetch } from "./services/api";


function App() {
  const [products, setProducts] = useState([]);

  // Get all products
  const getProducts = async () => {
    try {
      const response = await apiFetch("/products/");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      console.log("Products:", data);

      setProducts(data);
    } catch (error) {
      console.error("Product API Error:", error);
    }
  };


  // Load products when App starts
  useEffect(() => {
    getProducts();
  }, []);


  return (
    <div>
      {/* Login */}
      <Login />

      <hr />

      {/* Create Product */}
      <ProductForm onProductCreated={getProducts} />

      <hr />

      {/* Product List */}
      <h1>Products</h1>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
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