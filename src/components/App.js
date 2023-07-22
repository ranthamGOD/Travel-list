import { useState } from "react";
import Logo from "./logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "charger", quantity: 1, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  // Adding items to the Array and creating a new Array
  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  // Deleting items from the Array and creating a new items array

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  // updating items to the Array and creating a new items array

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items"
    );
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList
        items={items}
        onclearList={handleClearList}
        onDeleteItems={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}
