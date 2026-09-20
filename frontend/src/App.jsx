import { useEffect, useState } from "react";
import Login from "./pages/Login";
import { apiFetch } from "./services/api";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
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

    getProducts();
  }, []);

  return (
    <div>
      <Login />

      <hr />

      <h1>Products</h1>

      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>Price: {product.price}</p>
          <p>Stock: {product.stock}</p>
        </div>
      ))}
    </div>
  );
}

export default App;