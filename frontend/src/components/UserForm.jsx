import React, { useState, useEffect } from "react";
import axios from "axios";

const UserForm = ({ onSuccess, editingUser, onCancelEdit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (editingUser) {
      console.log("Editing user:", editingUser);
      setName(editingUser.name);
      setEmail(editingUser.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [editingUser]);

  const submitHandler = async () => {
    try {
      if (editingUser) {
        console.log("Updating user:", editingUser._id, { name, email });
        const response = await axios.put(
          `http://localhost:3000/api/users/${editingUser._id}`, 
          { name, email }
        );
        
      } else {
        console.log("Creating new user:", { name, email });
        await axios.post("http://localhost:3000/api/users", { name, email });
      }
      
      setName("");
      setEmail("");
      onSuccess && onSuccess();
    } catch (err) {
      console.error("Error details:", err);
      console.error("Error response:", err.response);
      console.error("Error message:", err.message);
      console.error("Error data:", err.response?.data);

    }
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
    onCancelEdit && onCancelEdit();
  };

  return (
    <div>
      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={submitHandler}>
        {editingUser ? "Update" : "Submit"}
      </button>
      {editingUser && (
        <button onClick={handleCancel}>Cancel</button>
      )}
    </div>
  );
};

export default UserForm;
