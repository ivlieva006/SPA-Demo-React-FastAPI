const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

export async function registerUser(username, email, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Ошибка регистрации");
  }
  return res.json();
}

export async function loginUser(email, password) {
  const formData = new URLSearchParams();
  formData.append("username", email); // FastAPI OAuth2 ждёт username=Email
  formData.append("password", password);

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData.toString(),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Ошибка входа");
  }
  return res.json();
}

export async function getCurrentUser(token) {
  const res = await fetch(`${API_URL}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Не удалось получить пользователя");
  }
  return res.json();
}

export async function getItems(token) {
  const res = await fetch(`${API_URL}/items`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Ошибка загрузки элементов");
  return res.json();
}

export async function addItem(token, title, description) {
  const res = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description }),
  });
  if (!res.ok) throw new Error("Ошибка добавления");
  return res.json();
}

export async function deleteItem(token, id) {
  const res = await fetch(`${API_URL}/items/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Ошибка удаления");
  return res.json();
}