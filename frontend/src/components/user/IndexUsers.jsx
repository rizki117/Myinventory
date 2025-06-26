









import React, { useState } from "react";
import AddUser from "./AddUser";
import DataUser from "./DataUser";

const IndexUsers = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1); // trigger ulang DataUser
  };

  return (
    <>
      <AddUser onSuccess={handleSuccess} />
      <DataUser key={refreshKey} />
    </>
  );
};

export default IndexUsers;
