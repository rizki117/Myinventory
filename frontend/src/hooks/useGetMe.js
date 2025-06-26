







import { useState, useEffect } from "react";
import { getMe } from "../services/authService";

const useGetMe = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil accessToken dari localStorage
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        // Kirimkan token untuk autentikasi
        const data = await getMe(token);
        setUser(data);
        setError(null);
      } catch (err) {
        setError(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);  // Pastikan useEffect dijalankan ulang ketika token berubah

  return { user, loading, error };
};

export default useGetMe;