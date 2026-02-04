import React, { useState } from "react";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";

const App = () => {
  const [refresh, setRefresh] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleSuccess = () => {
    setRefresh(!refresh);
    setEditingUser(null); 
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <div>
      <h2>{editingUser ? "Edit User" : "Add User"}</h2>
      <UserForm 
        onSuccess={handleSuccess} 
        editingUser={editingUser}
        onCancelEdit={handleCancelEdit}
      />


      <h2>User List</h2>
      <UserTable 
        refresh={refresh} 
        onEdit={handleEdit}
      />
    </div>
  );
};

export default App;