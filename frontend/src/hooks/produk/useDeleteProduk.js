









import { useState } from "react";
import { deleteProduk } from "../services/produkService";

const useDeleteProduk = (token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const hapusProduk = async (id) => {
    setLoading(true);
    try {
      const res = await deleteProduk(id, token);
      setSuccessMsg(res.msg || "Produk berhasil dihapus");
      setError(null);
    } catch (err) {
      setError(err.message || "Gagal menghapus produk");
    } finally {
      setLoading(false);
    }
  };

  return { hapusProduk, loading, error, successMsg };
};

export default useDeleteProduk;