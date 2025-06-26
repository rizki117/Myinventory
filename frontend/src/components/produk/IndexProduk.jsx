









import React, { useState } from "react";
import AddProduk from "./AddProduk";
import DataProduk from "./DataProduk";

const IndexProduk= () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1); // trigger ulang DataProduk
  };

  return (
    <>
      <AddProduk onSuccess={handleSuccess} />
      <DataProduk key={refreshKey} />
    </>
  );
};

export default IndexProduk;
