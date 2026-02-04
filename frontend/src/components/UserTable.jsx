import React, { useEffect, useState } from "react";
import axios from "axios";

const UserTable = ({ refresh, onEdit }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/users/${id}`);
      console.log('Delete response:', response);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      console.error("Error response:", err.response);
      const errorMsg = err.response?.data?.message || err.message || "Error deleting user";
      alert(errorMsg);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Error loading users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [refresh]); 

  if (loading) return <p>Loading...</p>;

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan="3">No users</td>
          </tr>
        ) : (
          users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => deleteUser(user._id)}>
                  Delete
                </button>
                <button onClick={() => onEdit(user)}>Edit</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default UserTable;