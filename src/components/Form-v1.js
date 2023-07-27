import { useState, useEffect } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Load data from Local Storage when the component mounts
    const storedData = localStorage.getItem("items");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      onAddItems(parsedData);
    }
  }, []);

  function submitHandler(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    // Update Local Storage with the new item
    const storedData = localStorage.getItem("items");
    const items = storedData ? JSON.parse(storedData) : [];
    items.push(newItem);
    localStorage.setItem("items", JSON.stringify(items));

    onAddItems(items);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={submitHandler}>
      <h3>What do you need for your trip ?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}
