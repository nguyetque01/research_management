import React, { useState, useEffect } from "react";
import axios from "axios";
import DEFAULT_BACKEND_URL from "../config";

function UserList() {
  const backendUrl = DEFAULT_BACKEND_URL;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(`${backendUrl}/api/users/`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className="user-list-container">
      <h2>Danh sách người dùng</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>Username:</strong> {user.username} | <strong>Email:</strong>{" "}
            {user.email} | <strong>Full Name:</strong> {user.first_name}{" "}
            {user.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
