import { useEffect, useState } from "react";
import Login from "./pages/Login";
import API_BASE_URL from "./services/api";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("access"); //browser bata JWT nikalxa

    fetch(`${API_BASE_URL}/products/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Products:", data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("Product API Error:", error);
      });
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