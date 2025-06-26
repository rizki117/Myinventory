








import { useEffect, useState } from "react";

const useEditData = (editFunction, setData) => {
  const [itemToEdit, setItemToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleEdit = async (updatedItem) => {
    try {
      // Panggil API untuk update data
      await editFunction(updatedItem.uuid, updatedItem);

      // Update langsung data lokal tanpa menunggu response dari server
      setData((prevData) =>
        prevData.map((item) =>
          item.uuid === updatedItem.uuid ? updatedItem : item
        )
      );

      setSuccessMessage("Data berhasil diperbarui!");
      setItemToEdit(null); // Tutup modal setelah edit berhasil
      setError(null);
    } catch (err) {
      setError(err.message || "Gagal memperbarui data");
    }
  };

  // Reset successMessage setelah 3 detik
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return {
    itemToEdit,
    setItemToEdit,
    handleEdit,
    error,
    successMessage,
  };
};

export default useEditData;