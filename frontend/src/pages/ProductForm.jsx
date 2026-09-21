import { useState } from "react";
import { apiFetch } from "../services/api";

function ProductForm({ onProductCreated }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      price,
      description,
      stock,
    };

    try {
      const response = await apiFetch("/products/", {
        method: "POST",
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      console.log("Create response:", data);

      if (!response.ok) {
        console.error("Create product failed:", data);
        return;
      }

      console.log("Product created successfully:", data);

      // Form clear
      setName("");
      setPrice("");
      setDescription("");
      setStock("");

      // Product list refresh
      onProductCreated();

    } catch (error) {
      console.error("Create product error:", error);
    }
  };

  return (
    <div>
      <h2>Create Product</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Price</label>
          <br />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Description</label>
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Stock</label>
          <br />
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">
          Create Product
        </button>
      </form>
    </div>
  );
}

export default ProductForm;