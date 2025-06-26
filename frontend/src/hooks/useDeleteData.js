








//hooks/useDeleteData.js

import { useState } from "react";

const useDeleteData = (deleteFunction, setData) => {
  const [error, setError] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null); // Tambahkan state ini
  
 const [successMessage, setSuccessMessage] = useState("");

  const handleDelete = async (id) => {
    try {
      await deleteFunction(id);
      setData((prevData) => prevData.filter((item) => item.uuid !== id));
      setSuccessMessage("Data berhasil dihapus!");

      // Hapus pesan sukses setelah 2detik
setTimeout(() => setSuccessMessage(""), 2000);
    } catch (err) {
      setError(err);
    }
  };

  return { 
    itemToDelete, 
    setItemToDelete, 
    handleDelete, 
    error, 
    successMessage 
  };
};

export default useDeleteData;