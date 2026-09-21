import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

function ProductForm({
  onProductCreated,
  editingProduct,
  onProductUpdated,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");

  // Edit गर्दा existing data form मा राख्ने
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
      setDescription(editingProduct.description);
      setStock(editingProduct.stock);
    }
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      price,
      description,
      stock,
    };

    try {
      let response;

      if (editingProduct) {
        // UPDATE
        response = await apiFetch(
          `/products/${editingProduct.id}/`,
          {
            method: "PATCH",
            body: JSON.stringify(productData),
          }
        );
      } else {
        // CREATE
        response = await apiFetch("/products/", {
          method: "POST",
          body: JSON.stringify(productData),
        });
      }

      const data = await response.json();

      console.log("Product response:", data);

      if (!response.ok) {
        console.error("Product operation failed:", data);
        return;
      }

      setName("");
      setPrice("");
      setDescription("");
      setStock("");

      if (editingProduct) {
        console.log("Product updated:", data);
        onProductUpdated();
      } else {
        console.log("Product created:", data);
        onProductCreated();
      }
    } catch (error) {
      console.error("Product error:", error);
    }
  };

  return (
    <div>
      <h2>
        {editingProduct ? "Edit Product" : "Create Product"}
      </h2>

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
            onChange={(e) =>
              setDescription(e.target.value)
            }
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
          {editingProduct
            ? "Update Product"
            : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;