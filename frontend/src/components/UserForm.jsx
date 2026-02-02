import React from "react";
import { useState } from "react";
import api from "../services/api";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submitHandler = async () => {
    try {
      await api.post("/users", { name, email });
      alert("User saved");
      setName("");
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("Error saving user");
    }
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
      <button onClick={submitHandler}>Submit</button>
    </div>
  );
};

export default UserForm;
