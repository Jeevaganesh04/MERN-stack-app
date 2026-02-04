import React, { useState } from "react";
import UserForm from "./UserForm";
import UserTable from "./UserTable";

const UsersPage = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <h2>Add User</h2>
      <UserForm onSuccess={() => setRefresh(!refresh)} />

      <h2>User List</h2>
      <UserTable refresh={refresh} />
    </div>
  );
};

export default UsersPage;
