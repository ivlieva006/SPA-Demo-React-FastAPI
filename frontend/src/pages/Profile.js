import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <div className="container mt-5">Загрузка...</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <h2>Профиль</h2>
      <div className="card p-3 mt-3">
        <p><strong>Имя пользователя:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <button className="btn btn-danger" onClick={logout}>
          Выйти
        </button>
      </div>
    </div>
  );
};

export default Profile;