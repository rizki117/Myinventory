








import { useState, useEffect } from "react";
import { getAllProduk } from "../../services/produkService";

const useGetAllProduk = (token) => {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setError("Token tidak tersedia");
      return;
    }

    const fetchProduk = async () => {
      try {
        setLoading(true);
        const data = await getAllProduk(token);
        setProduk(data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduk();
  }, [token]);

  return { produk, loading, error };
};

export default useGetAllProduk;



 