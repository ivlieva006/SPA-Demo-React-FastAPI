import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getItems, addItem, deleteItem } from "../services/api";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    loadItems();
  }, [token]);

  const loadItems = async () => {
    try {
      const data = await getItems(token);
      setItems(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const newItem = await addItem(token, title, description);
      setItems([...items, newItem]);
      setTitle("");
      setDescription("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    await deleteItem(token, id);
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h2>Мои элементы</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleAdd} className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-primary w-100">Добавить</button>
      </form>

      <ul className="list-group">
        {items.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{item.title}</strong>
              <div className="text-muted small">{item.description}</div>
            </div>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(item.id)}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;